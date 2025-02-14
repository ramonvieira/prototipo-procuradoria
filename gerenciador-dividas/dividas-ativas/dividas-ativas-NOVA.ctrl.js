(function() {
	angular.module('app')
	.controller('dividasAtivasNovaCtrl', ['$scope', 'arrecModal', 'storage', '$filter', 'dividasFiltrosService', 'db', 'promiseTracker', '$timeout',
		function($scope, arrecModal, storage, $filter, dividasFiltrosService, db, promiseTracker, $timeout) {
			var vm = $scope

			vm.loadingDividas = promiseTracker();
			
			vm.pesquisarEm = dividasFiltrosService.filtrosConfig

			vm.creditos = [
				{id: 1, descricao: 'IPTU'},
				{id: 2, descricao: 'Auto de infração'},
				{id: 3, descricao: 'Contribuição de melhoria'},
				{id: 4, descricao: 'ISS'},
				{id: 5, descricao: 'ISSQN'},
				{id: 6, descricao: 'ITBI'}
			];

			vm.meses=[
				{descricao:'Janeiro'},
				{descricao:'Fevereiro'},
				{descricao:'Março'},
				{descricao:'Abril'},
				{descricao:'Maio'},
				{descricao:'Junho'},
				{descricao:'Julho'},
				{descricao:'Agosto'},
				{descricao:'Setembro'},
				{descricao:'Outubro'},
				{descricao:'Novembro'},
				{descricao:'Dezembro'}
			];

			// ------------------------------------------------------
			// VALOR
			// ------------------------------------------------------
			{
				vm.valor = {
					valores: storage.check('agrupadorValor', [1000, 10000, 20000]),
					valoresDescription: function() {
						var VALORES = []
						this.valores.forEach((val, index) => {
							var VALOR = $filter('currency')(val)
							var DESC =	index == 0 ? 'Até ' + VALOR : 'De ' + $filter('currency')(this.valores[index-1] + 0.01) + ' até ' + VALOR
						
							VALORES.push({descricao: DESC})
							if(index == this.valores.length-1) {
								VALORES.push({descricao: 'Acima de ' + VALOR})
							}
						})
		
						return VALORES
					},
					definir: function(index) {//SEM USO POR ENQUANTO
						console.log(index, this.valores[index]);
						
						if(index == 0) {
							vm.filtros.valor.variaDe = 0
							vm.filtros.valor.variaAte = this.valores[index]
						} else {
							vm.filtros.valor.variaDe = this.valores[index-1] + 0.01
							vm.filtros.valor.variaAte = this.valores[index]
						}
					},
					configAgrupador: function() {
						arrecModal.open('gerenciador-dividas/dividas-ativas/configurar-valores-modal.html', $scope, {valores:this.valores}, '', 'configAgrupadorValorModalCtrl')
					},
					setConfigAgrupador: function(faixas) {
						this.valores = faixas
						this.valoresDescription = this.valoresDescription(faixas)
						storage.setJson('agrupadorValor', faixas);
						vm.agrupador.set(vm.agruparDiv)
					}
				}

				vm.itens = vm.valor.valoresDescription();

				vm.setConfigAgrupadorValor = function(faixas) { return vm.valor.setConfigAgrupador(faixas)}//Temporário
			}

			// ------------------------------------------------------
			// AGRUPADOR
			// ------------------------------------------------------
			{
				vm.agrupador = {
					agrupadoPor: storage.check('agruparDividas', 'credito'),
					agrupadores: [
						{ id: 1, nome: 'Contribuintes por ano'     , padrao: true, informacoes: [
							{ agrupador: 'ANO'          , showQtd: 'SIM', showValor: 'SIM', order: 1, ordenacao: 'CRESCENTE'},
							{ agrupador: 'CONTRIBUINTE' , showQtd: 'SIM', showValor: 'SIM', order: 2, ordenacao: 'CRESCENTE'},
						]},
						{ id: 2, nome: 'Contribuintes por crédito' , padrao: true, informacoes: [
							{ agrupador: 'CREDITO'      , showQtd: 'SIM', showValor: 'SIM', order: 1, ordenacao: 'CRESCENTE'},
							{ agrupador: 'CONTRIBUINTE' , showQtd: 'SIM', showValor: 'SIM', order: 2, ordenacao: 'CRESCENTE'},
						]},
						{ id: 3, nome: 'Créditos por ano'          , padrao: true, informacoes: [
							{ agrupador: 'CREDITO' , showQtd: 'SIM', showValor: 'SIM', order: 1, ordenacao: 'CRESCENTE'},
							{ agrupador: 'ANO'     , showQtd: 'SIM', showValor: 'SIM', order: 2, ordenacao: 'CRESCENTE'},
						]},
						{ id: 4, nome: 'Valor'                     , padrao: true, informacoes: [
							{ agrupador: 'VALOR', showQtd: 'SIM', showValor: 'SIM', order: 1 , ordenacao: 'CRESCENTE'},
						]},
						{ id: 5, nome: 'Valor por contribuinte'    , padrao: true, informacoes: [
							{ agrupador: 'CONTRIBUINTE' , showQtd: 'SIM', showValor: 'SIM', order: 1, ordenacao: 'CRESCENTE'},
							{ agrupador: 'VALOR'        , showQtd: 'SIM', showValor: 'SIM', order: 2, ordenacao: 'CRESCENTE'},
						]},
					],
					set: function(groupDiv) {
						vm.loadingDividas.addPromise($timeout(function(){}, 2000));
		
						vm.agrupador.agrupadoPor = groupDiv;
						storage.set('agruparDividas', groupDiv);
						if (groupDiv == 'credito') {
							vm.itens = vm.creditos;
							vm.subItens = vm.valor.valoresDescription();
						} else if (groupDiv == 'valor') {
							console.log(vm.valor.valoresDescription());
							vm.itens = vm.valor.valoresDescription();
							vm.subItens = vm.creditos;
						} else if(groupDiv == 'contribuinte') {
							vm.itens = vm.contribuintes;
							vm.subItens = vm.anos;
						} else if(groupDiv == 'creditoAno') {
							vm.itens = vm.creditos;
							vm.subItens = vm.anos;
						}
					}
				}
	
				vm.agrupador.set(vm.agrupador.agrupadoPor)
			}

			// ------------------------------------------------------
			// TABS
			// ------------------------------------------------------
			{
				vm.tabs = {
					tabsDividas: [
						{ key: 'SEM_CDA'       , descricao: 'Sem CDA'       , icon: 'fa-file-o'         , colorIcon: 'fa-inverse'   , colorBg: 'tx__gray--d10'   , },
						{ key: 'EMITIDA'       , descricao: 'Com CDA'       , icon: 'fa-file-text-o'    , colorIcon: 'fa-inverse'   , colorBg: 'tx__green'       , },
						{ key: 'CDA_CANCELADA' , descricao: 'CDA Cancelada' , icon: 'fa-file-text-o'    , colorIcon: 'tx__red--d10' , colorBg: 'tx__red--l20'    , },
						{ key: 'PETICIONADA'   , descricao: 'Peticionada'   , icon: 'fa-file-text'      , colorIcon: 'fa-inverse'   , colorBg: 'tx__orange--d10' , },
						{ key: 'PROTESTADA'    , descricao: 'Protestada'    , icon: 'fa-check-square-o' , colorIcon: 'fa-inverse'   , colorBg: 'tx__blue--d10'   , },
						{ key: 'EXECUTADA'     , descricao: 'Executada'     , icon: 'fa-balance-scale'  , colorIcon: 'fa-inverse'   , colorBg: ''                , },
					],
					selecionada: 'SEM_CDA',
					set: function(tab) {
						vm.tabs.selecionada = tab.key;
						vm.filtros.set(vm.tabs.selecionada)
		
						if(vm.agrupador.agrupadoPor == 'contribuinte') {
							min = Math.ceil(1);
							max = Math.floor(20);
		
							vm.contribuintes.forEach(contribuinte => {
								contribuinte.calculando = false
								contribuinte.groupOpen = false
								contribuinte.qtd = Math.floor(Math.random() * (max - min)) + min;
							});
						}
					}
				}
			}
			
			// ------------------------------------------------------
			// FILTROS
			// ------------------------------------------------------
			{
				vm.filtros = {
					filtrando: true,
					salvos: dividasFiltrosService.filtrosSalvos,
					set: function(filtro) {
						// console.clear();
						// console.log('filtro',filtro);
						// var FILTROS_ABA_SELECIONADA = typeof filtro == 'object' ? this.salvos.filter(salvo => salvo.tab == filtro.tab ) : this.salvos.filter(salvo => salvo.tab == vm.tabs.selecionada)
						var FILTROS_ABA_SELECIONADA = this.salvos.filter(salvo => salvo.tab == vm.tabs.selecionada)
						var HAS_TEMP = FILTROS_ABA_SELECIONADA.some(salvo => salvo.temp == true)
						FILTROS_ABA_SELECIONADA.forEach(filtro => filtro.active = false)
						// console.log('FILTROS_ABA_SELECIONADA',FILTROS_ABA_SELECIONADA);
						// console.log('HISTORICO_ABA_SELECIONADA',this.historySelected.filter(history => history.tab == vm.tabs.selecionada));
						
						if (typeof filtro == 'object') {//Seleciona o filtro ativo e desativa todos os outros
							filtro.active = true
							this.historySelected.push(filtro)
						} else {//Seleciona o próximo filtro passível
							console.log('HAS_TEMP',HAS_TEMP);
							if (HAS_TEMP) {
								(FILTROS_ABA_SELECIONADA.find(filtro => filtro.temp)).active = true
								console.log(FILTROS_ABA_SELECIONADA.find(filtro => filtro.temp))
							} else {
								FILTROS_ABA_SELECIONADA[0].active = true
							}
						}
					},
					excluir: function(filtro) {
						db.delete('dividasFiltros', filtro)
						
						//Exclui do histórico
						this.historySelected = this.historySelected.filter(history => history.id != filtro.id)
						this.selectLast()
					},
					adicionar: function(filtro) {
						arrecModal.open('gerenciador-dividas/dividas-ativas/dividas-ativas-NOVA-filtro-modal.html', $scope, filtro, 'lg', 'dividasAtivasNovaModalCtrl')
					},
					editar: function(filtro) {
						filtro.filtro = angular.copy(dividasFiltrosService.filtrosSalvos.find(fil => fil.id == filtro.filtro.id))
						this.adicionar(filtro)
					},
					historySelected: [],
					selectLast: function() {
						var FILTROS_ABA_SELECIONADA = this.salvos.filter(salvo => salvo.tab == vm.tabs.selecionada)
						var HISTORICO_ABA_SELECIONADA = this.historySelected.filter(history => history.tab == vm.tabs.selecionada)
						if(HISTORICO_ABA_SELECIONADA.length == 1) {
							this.set(HISTORICO_ABA_SELECIONADA[0])
						} else if(HISTORICO_ABA_SELECIONADA.length > 1) {
							this.set(HISTORICO_ABA_SELECIONADA[HISTORICO_ABA_SELECIONADA.length-1])
						} else if(HISTORICO_ABA_SELECIONADA.length == 0) {
							FILTROS_ABA_SELECIONADA[0].active = true
						} else {
							FILTROS_ABA_SELECIONADA[0].active = true
						}
					},
					salvarPesquisar: function(registro) {
						this.renomear(registro)
					},
					salvar: function(filtro) {
						console.log(filtro);
						dividasFiltrosService.salvarFiltro(filtro, vm.tabs.selecionada)
					},
					pesquisar: function(filtro) {
						console.log(filtro);
					},
					renomear: function(filtro) {
						console.log('renomear');
						arrecModal.open('gerenciador-dividas/dividas-ativas/dividas-ativas-NOVA-nomear-modal.html', $scope, filtro, 'xs', 'dividasAtivasNovaModalNomearCtrl')
					}
				}
	
				vm.filtros.set(vm.tabs.selecionada)

				$('#editFiltros').on('click', (e) => {
					var newFiltros = e.currentTarget.parentElement.parentElement
					$(newFiltros).toggleClass('newFiltros--editing')
				})

				$( "#sortableTeste" ).sortable({
					appendTo: document.body,
					// axis: 'x',
					// handle: ".handle",
					// helper: "clone",
					forceHelperSize: true,
					// forcePlaceholderSize: true,
					revert: true,
					// delay: 300,
					cursor: 'move',
					// items: "> .btn-group",
					items: "> .btn-group",
					// items: "> .btn-group:not(:last-child())",
					placeholder: "highlight",
					stop: function (event, ui) {
						// console.log(event);
						// console.log(ui);
					}
				});

				vm.salvar = function(nome) {
					vm.filtros.salvar()
					$modalInstance.close()
				}
				
			}
		}
	])
	.controller('dividasAtivasNovaModalCtrl', ['$scope', 'arrecModal', '$modalInstance', 'storage', '$filter', 'db', 'dividasFiltrosService',
		function($scope, arrecModal, $modalInstance, storage, $filter, db, dividasFiltrosService) {
			var vm = $scope

			console.log($modalInstance.params);
			var ACTION = $modalInstance.params.action ? $modalInstance.params.action : undefined
			
			vm.kkkk = function(filtro) {
				console.log(filtro);
				filtro.temp = !filtro.descricao ? true : false
				$scope.$parent.filtros.pesquisar(filtro);
				$modalInstance.close()
			}

			vm.valor.padraoSistema = [1000, 10000, 20000]
			
			vm.valores = storage.check('agrupadorValor', vm.valor.padraoSistema);
			function setValoresDescription(valores) {
				var VALORES = []
				valores.forEach((val, index) => {
					var VALOR = $filter('currency')(val)
					var DESC =	index == 0 ? 'Até ' + VALOR : 'De ' + $filter('currency')(vm.valores[index-1] + 0.01) + ' até ' + VALOR
				
					VALORES.push({id: index, descricao: DESC})
					if(index == valores.length-1) {
						VALORES.push({id: index, descricao: 'Acima de ' + VALOR})
					}
				})

				return VALORES
			}
			vm.valoresDescription = setValoresDescription(vm.valores)
			vm.valoresDescription.push({id:vm.valoresDescription.length+1, descricao:'Definir valor'})

			vm.optionsSelectValores = {
				allowClear: true,
				tokenSeparators: [",", " ", ";", "-"],
				tags: [],
				data: vm.valoresDescription,
				formatNoMatches: function() {
					return ''
				},
				formatValue: function(item){
					return item.descricao
				},
				formatResult: function(item) {
					return `<span class="badge">${item.descricao}</span>`
				},
				formatSelection: function(item) {
					return item.descricao
				},
			}

			if(ACTION == 'EDIT') {
				vm.isEditing = true
				vm.registro = dividasFiltrosService.restauraFiltros($modalInstance.params.filtro)
				// console.log(vm.registro);
			} else if(ACTION == 'TEMP') {
				var temporario = dividasFiltrosService.filtrosSalvos.find(filtro => filtro.tab == vm.tabs.selecionada && filtro.descricao == 'Filtro temporário')
				console.error(temporario);
				vm.registro = {}
				if(temporario != undefined) {
					console.log('Existia temporário');
					vm.isEditing = true
					vm.registro = dividasFiltrosService.restauraFiltros(temporario)
				} else {
					console.log('Não existia temporário');
					vm.isEditing = false
					vm.registro = { filtros: dividasFiltrosService.filtrosConfig}
				}
				// console.log(vm.registro);
			} else {
				vm.isEditing = false
				vm.registro = { filtros: dividasFiltrosService.filtrosConfig}
				vm.isCreating = true
				console.log(vm.registro);
			}

			// vm.registro = { filtros: angular.copy(dividasFiltrosService.filtrosConfig)}

			var configVisibleFilter = [
				{ key: 'SEM_CDA'     ,filters: ['LANCAMENTO']},
				{ key: 'EMITIDA'     ,filters: ['LANCAMENTO', 'INSCRICAO', 'CERTIDAO', 'PROTESTADA']},
				{ key: 'PETICIONADA' ,filters: ['LANCAMENTO', 'INSCRICAO', 'CERTIDAO', 'PETICAO']},
				{ key: 'PROTESTADA'  ,filters: ['LANCAMENTO', 'INSCRICAO', 'CERTIDAO', 'PETICAO', 'PROTESTADA', 'EXECUTADA']},
				{ key: 'EXECUTADA'   ,filters: ['LANCAMENTO', 'INSCRICAO', 'CERTIDAO', 'PETICAO', 'PROTESTADA', 'EXECUTADA']},
			]
			vm.isVisibleFilter = function(filtro) {
				if(filtro.key == 'CREDITO' || filtro.key == 'REFERENTE' || filtro.key == 'ENDERECO') {
					return true
				} else {
					return configVisibleFilter.find(conf => conf.key == vm.tabs.selecionada).filters.some(filt => filt == filtro.key)
				}
			}

			vm.hasFilter = function(filtro) {
				var has = filtro.sub.some(sub => sub.emUso)
				filtro.emUso = has
				return has
			}

			vm.excluirAplicado = function(filtro, index) {
				console.group()
				console.log(filtro);
				var FILTRO_APLICADO = filtro.aplicados[index]
				console.log(FILTRO_APLICADO);
				var FILTRO_CORRESPONDENTE = filtro.sub.find(sub => sub.key == FILTRO_APLICADO.key)
				console.log(FILTRO_CORRESPONDENTE);
				console.log(filtro.aplicados.some(aplicado => aplicado.key == FILTRO_CORRESPONDENTE.key));
				
				filtro.aplicados.splice(index, 1)
				FILTRO_CORRESPONDENTE.emUso = filtro.aplicados.some(aplicado => aplicado.key == FILTRO_CORRESPONDENTE.key)
				
				console.groupEnd()
				// sub.emUso = filtro.aplicados.some(aplicado => aplicado.tipo == sub.tipo)
			}

			
		}
	])
	.controller('dividasAtivasNovaModalNomearCtrl', ['$scope', 'arrecModal', '$modalInstance',
		function($scope, arrecModal, $modalInstance) {
			var vm = $scope

			vm.filtro = $modalInstance.params

			vm.salvar = function() {
				$scope.$parent.filtros.salvar(vm.filtro)
			}
		}
	])
})();
