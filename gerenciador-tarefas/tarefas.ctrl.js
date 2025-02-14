(function () {

	angular.module('app').controller('TarefasCtrl', TarefasCtrl);

	TarefasCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', '$timeout', 'ENUMS', 'GrupoProfissionaisService'];

	function TarefasCtrl($scope, ModalCad, $timeout, ENUMS, GrupoProfissionaisService) {
		var vm = $scope;
		vm.procuradores = ENUMS.PROCURADORES
		vm.execucoesFiscais = ENUMS.EXECUCOES_FISCAIS
		vm.grupos = GrupoProfissionaisService.grupos;
		vm.areas = ENUMS.AREAS;
		vm.pesquisando = false;

		vm.setPesquisando = function (resolve) {
			console.log('pass');
			
			vm.pesquisando = resolve;
		}

		vm.viewTarefa = vm.storageSet('viewTarefa', 'row');
		vm.setViewTarefa = function(resolve) {
			vm.viewTarefa = vm.storageSet('viewTarefa', null , resolve.view);
		}

		vm.nav = vm.storageSet('nav', 'Situação');
		vm.setNav = function(resolve) {
			vm.nav = vm.storageSet('nav', null , resolve.view);
		}

		vm.adicionar = function(resolve) {
			abrirPopup('gerenciador-tarefas/tarefas-modal.html', resolve)
		};
		
		vm.abrirHistorico = function(resolve) {
			abrirPopup('gerenciador-tarefas/tarefas-historico-modal.html', resolve)
		};
		
		vm.abrirHistoricoDetalhes = function(resolve) {
			abrirPopup('gerenciador-tarefas/tarefas-historico-detalhes-modal.html', resolve)
		};
		
		vm.configuracoes = function(resolve) {
			abrirPopup('gerenciador-tarefas/configuracoes-modal.html', resolve)
		};
		
		vm.alteracoes = [
			{ campo: 'Tipo'                  , antes: 'Física'                           , depois: 'Jurídica'                 },
			{ campo: 'Nome'                  , antes: 'Matheus Philippe Martins da Cruz' , depois: 'Fernandes Fonseca Moraes' },
			{ campo: 'Rua'                   , antes: 'Rua Araranguá'                    , depois: 'Rua João Pessoa'          },
			{ campo: 'CEP'                   , antes: '88807-244'                        , depois: '88808-000'                },
			{ campo: 'Município'             , antes: 'Araranguá'                        , depois: 'Criciúma'                 },
			{ campo: 'Número'                , antes: '837'                              , depois: '134'                      },
			{ campo: 'Bairro'                , antes: 'Trindade'                         , depois: 'Centro'                   },
			{ campo: 'Inscrição imobiliária' , antes: '0001.0001.0001.0001'              , depois: '0002.0002.0002.0002'      },
		]

		vm.prazos = [
			{ desc: 'Sem prazo' },
			{ desc: 'Para esta semana' },
			{ desc: 'Para a próxima semana' },
			{ desc: 'Personalizar' },
		]

		var DEFAULT_COLORS = [
			{ id: 0, hex: '#1E4471', name: 'bg__blue--d20'},
			{ id: 2, hex: '#3475C1', name: 'bg__blue'},
			{ id: 2, hex: '#7FAADC', name: 'bg__blue--l20'},
			{ id: 3, hex: '#CFDFF2', name: 'bg__blue--l30'},

			{ id: 4, hex: '#237792', name: 'bg__aqua--d20'},
			{ id: 5, hex: '#48B1D3', name: 'bg__aqua'},
			{ id: 6, hex: '#9AD4E7', name: 'bg__aqua--l20'},
			{ id: 7, hex: '#ECF7FB', name: 'bg__aqua--l30'},

			{ id: 8, hex: '#8B221D', name: 'bg__red--d20'},
			{ id: 9, hex: '#D64038', name: 'bg__red'},
			{ id: 10, hex: '#E7918D', name: 'bg__red--l20'},
			{ id: 11, hex: '#F9E2E1', name: 'bg__red--l30'},

			{ id: 12, hex: '#B6860F', name: 'bg__yellow--d20'},
			{ id: 13, hex: '#EFBC3C', name: 'bg__yellow'},
			{ id: 14, hex: '#F7DC9A', name: 'bg__yellow--l20'},
			{ id: 15, hex: '#FEFDF9', name: 'bg__yellow--l30'},
	
			{ id: 16, hex: '#32623E', name: 'bg__green--d20'},
			{ id: 17, hex: '#54A668', name: 'bg__green'},
			{ id: 18, hex: '#96CAA3', name: 'bg__green--l20'},
			{ id: 19, hex: '#DAECDE', name: 'bg__green--l30'},
	
			{ id: 20, hex: '#AF5413', name: 'bg__orange--d20'},
			{ id: 21, hex: '#EA863E', name: 'bg__orange'},
			{ id: 22, hex: '#F4C09A', name: 'bg__orange--l20'},
			{ id: 23, hex: '#FEF9F6', name: 'bg__orange--l30'},
	
			{ id: 24, hex: '#6E3D7C', name: 'bg__purple--d20'},
			{ id: 25, hex: '#A46AB5', name: 'bg__purple'},
			{ id: 26, hex: '#CEAED7', name: 'bg__purple--l20'},
			{ id: 27, hex: '#F7F2F9', name: 'bg__purple--l30'},
	
			{ id: 28, hex: '#8D2A5B', name: 'bg__pink--d20'},
			{ id: 29, hex: '#CB528E', name: 'bg__pink'},
			{ id: 30, hex: '#E3A0C1', name: 'bg__pink--l20'},
			{ id: 31, hex: '#FAEFF4', name: 'bg__pink--l30'},
	
			{ id: 32, hex: '#595959', name: 'bg__gray--d20'},
			{ id: 33, hex: '#C0C0C0', name: 'bg__gray'},
			{ id: 34, hex: '#EBEDF0', name: 'bg__gray--l20'},
			{ id: 35, hex: '#F5F7FA', name: 'bg__gray--l30'},
		];

		var DEFAULT_ICONS = [
			{ id: 0, ico: 'fa-clock-o'},
			{ id: 1, ico: 'fa-paper-plane'},
			{ id: 2, ico: 'fa-thumbs-up'},
			{ id: 3, ico: 'fa-thumbs-down'},
			{ id: 4, ico: 'fa-play'},
			{ id: 5, ico: 'fa-pause'},
			{ id: 6, ico: 'fa-star-half-o'},
			{ id: 7, ico: 'fa-star'},
		];

		vm.status = [
			{ id:1, desc: 'Pendente'     , color: 'bth-status__gray'   , uso: true, padrao: true, ico: DEFAULT_ICONS[0].ico, cor: DEFAULT_COLORS[32 ].hex, uso: 2 },
			{ id:2, desc: 'Em análise'   , color: 'bth-status__yellow' , uso: true, padrao: true, ico: DEFAULT_ICONS[2].ico, cor: DEFAULT_COLORS[17 ].hex, uso: 0 },
			{ id:4, desc: 'Em andamento' , color: 'bth-status__blue'   , uso: true, padrao: true, ico: DEFAULT_ICONS[1].ico, cor: DEFAULT_COLORS[18 ].hex, uso: 5 },
			{ id:5, desc: 'Concluído'    , color: 'bth-status__green'  , uso: true, padrao: true, ico: DEFAULT_ICONS[4].ico, cor: DEFAULT_COLORS[2  ].hex, uso: 8 },
			{ id:6, desc: 'Interrompido' , color: 'bth-status__green'  , uso: true, padrao: false, ico: DEFAULT_ICONS[4].ico, cor: DEFAULT_COLORS[3  ].hex, uso: 2 },
			{ id:6, desc: 'Cancelado'    , color: 'bth-status__green'  , uso: true, padrao: false, ico: DEFAULT_ICONS[4].ico, cor: DEFAULT_COLORS[4  ].hex, uso: 0 },
		]

		vm.tipos = [
			{ desc: 'Contestação' },
			{ desc: 'Manifestação' },
			{ desc: 'Alegações Finais' },
			{ desc: 'Suspensão do Processo' },
			{ desc: 'Extinção do Processos' },
			{ desc: 'Embargos' },
		]

		vm.cadStatusOptions = {
			data: vm.status,

			formatResult: function(item){
				return "<span class='bth-status " + item.color + "'>"+item.desc+"</span>"
			},
			formatSelection: function(item){
				return "<span class='bth-status " + item.color + "'>"+item.desc+"</span>"
			},
		}

		// ------------------------------------------------------
		// Tarefas
		// ------------------------------------------------------

		vm.tarefas = [
			{ id: 1  , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa 1' , obs: ''                     , tipo: vm.tipos[1].desc, prazo: new Date(), venc:  4  , status: vm.status[0].desc, etiquetas: [1,2    ], procuradores: [2  ] },
			{ id: 2  , ordem: 1, ref: vm.execucoesFiscais[1], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[2].desc, prazo: new Date(), venc: -4  , status: vm.status[0].desc, etiquetas: [0,3    ], procuradores: [4  ] },
			{ id: 3  , ordem: 1, ref: vm.execucoesFiscais[2], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[3].desc, prazo: new Date(), venc: -1  , status: vm.status[0].desc, etiquetas: [1      ], procuradores: [5,6] },
			{ id: 4  , ordem: 1, ref: vm.execucoesFiscais[3], descricao: 'Descrição da tarefa 2' , obs: 'Observação do usuário', tipo: vm.tipos[3].desc, prazo: null      , venc:  5  , status: vm.status[0].desc, etiquetas: [2      ], procuradores: [7  ] },
			{ id: 5  , ordem: 1, ref: vm.execucoesFiscais[4], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[3].desc, prazo: new Date(), venc:  4  , status: vm.status[0].desc, etiquetas: [       ], procuradores: [8  ] },
			{ id: 6  , ordem: 1, ref: vm.execucoesFiscais[5], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[0].desc, prazo: new Date(), venc:  2  , status: vm.status[0].desc, etiquetas: [0,1,2,3], procuradores: [7  ] },
			{ id: 7  , ordem: 1, ref: vm.execucoesFiscais[6], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[0].desc, prazo: new Date(), venc:  6  , status: vm.status[0].desc, etiquetas: [1,2    ], procuradores: [   ] },
			{ id: 8  , ordem: 1, ref: vm.execucoesFiscais[7], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[0].desc, prazo: new Date(), venc:  0  , status: vm.status[0].desc, etiquetas: [0,3    ], procuradores: [8  ] },
			{ id: 9  , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa 2' , obs: 'Observação do usuário', tipo: vm.tipos[5].desc, prazo: new Date(), venc:  3  , status: vm.status[0].desc, etiquetas: [2      ], procuradores: [   ] },
			{ id: 10 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[4].desc, prazo: new Date(), venc:  11 , status: vm.status[0].desc, etiquetas: [3      ], procuradores: [8  ] },
			{ id: 11 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[4].desc, prazo: new Date(), venc:  10 , status: vm.status[0].desc, etiquetas: [2      ], procuradores: [7  ] },
			{ id: 12 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa 2' , obs: ''                     , tipo: vm.tipos[4].desc, prazo: new Date(), venc:  9  , status: vm.status[0].desc, etiquetas: [0,2    ], procuradores: [7  ] },
			{ id: 13 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa'   , obs: ''                     , tipo: vm.tipos[5].desc, prazo: new Date(), venc:  10 , status: vm.status[1].desc, etiquetas: [1      ], procuradores: [2,4] },
			{ id: 14 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa'   , obs: ''                     , tipo: vm.tipos[5].desc, prazo: new Date(), venc:  4  , status: vm.status[1].desc, etiquetas: [2      ], procuradores: [3  ] },
			{ id: 15 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa'   , obs: ''                     , tipo: vm.tipos[0].desc, prazo: new Date(), venc:  6  , status: vm.status[2].desc, etiquetas: [2,3    ], procuradores: [3  ] },
			{ id: 16 , ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa'   , obs: ''                     , tipo: vm.tipos[0].desc, prazo: new Date(), venc:  6  , status: vm.status[3].desc, etiquetas: [3      ], procuradores: [4  ] },
			// { id: 17, ordem: 1, ref: vm.execucoesFiscais[0], descricao: 'Descrição da tarefa', tipo: vm.tipos[1].desc, prazo: new Date(), venc: 5, status: vm.status[4].desc, etiquetas: [3], procuradores: [5,9] },
		]
		
		// Por status
		vm.tarefasPendentes = []
		vm.tarefasEmAnalise = []
		vm.tarefasDistribuir = []
		vm.tarefasEmAndamento = []
		vm.tarefasConcluido = []

		// Por responsável
		vm.tarefasPorResponsavel = [
			{ tarefa: vm.tarefas[1] },
			{ tarefa: vm.tarefas[2] },
			{ tarefa: vm.tarefas[3] },
			{ tarefa: vm.tarefas[4] },
			{ tarefa: vm.tarefas[5] },
		]
		
		for (let i = 0; i < vm.tarefas.length; i++) {
			if (vm.tarefas[i].status == vm.status[0].desc) { //Pendente
				vm.tarefasPendentes.push(vm.tarefas[i])
			} else if (vm.tarefas[i].status == vm.status[1].desc) { // Em análise
				vm.tarefasEmAnalise.push(vm.tarefas[i])
			} else if (vm.tarefas[i].status == vm.status[2].desc) { // Distribuir
				vm.tarefasDistribuir.push(vm.tarefas[i])
			} else if (vm.tarefas[i].status == vm.status[2].desc) { // Em andamento
				vm.tarefasEmAndamento.push(vm.tarefas[i])
			} else if (vm.tarefas[i].status == vm.status[2].desc) { // Concluído
				vm.tarefasConcluido.push(vm.tarefas[i])
			}
		}

		vm.tarefasExemplo = '[{"id":1,"descricao":"Descrição da tarefa","pendente":true,"agendado":false,"vinculos":[{"procuradores":[8,7]},{"contribuintes":[1,2]},{},{},{"protestos":["789012","901234"]}],"marcadores":[1,2]},{"id":2,"descricao":"Revisar dívidas pagas","pendente":true,"agendado":false,"vinculos":[{"procuradores":[0,1,2,3]},{"contribuintes":[1,2]},{"dividas":["123456","234567"]},{"processos":["678901"]},{"protestos":["789012"]}],"marcadores":[0,1,2,3]},{"id":3,"descricao":"Revisão de protestos com o cartório","pendente":true,"agendado":false,"vinculos":[{"procuradores":[]},{"contribuintes":[1,2]},{},{},{"protestos":["789012","890123","901234"]}],"marcadores":[]},{"id":4,"descricao":"Mais uma tarefa pendente","pendente":true,"agendado":false,"vinculos":[{"procuradores":[1,3,2]},{"contribuintes":[1,2]},{"dividas":["123456"]},{"processos":["456789","567890"]},{}],"marcadores":[0,1,2]},{"id":5,"descricao":"asdfasdfasdf","pendente":true,"agendado":false,"vinculos":[{"procuradores":[0,2,3]},{"contribuintes":[1,2]},{},{},{}],"marcadores":[1,2,3,0]},{"id":6,"descricao":"Reunir procuradores","pendente":true,"agendado":false,"vinculos":[{"procuradores":[0,1,3,10,9,8,7,6]},{"contribuintes":[1,2]},{},{"processos":["456789"]},{"protestos":["789012","890123"]}],"marcadores":[2,3,0]}]'
		vm.setTarefasExemplo = function () {
			vm.storageSet('tarefas', null, vm.tarefasExemplo);
			vm.tarefas = JSON.parse(vm.tarefasExemplo);
		}

		// vm.tarefas = JSON.parse(vm.storageSet('tarefas', null)) ? JSON.parse(vm.storageSet('tarefas', null)) : new Array;
		//vm.tarefas = JSON.parse(vm.storageSet('tarefas', null)) ? JSON.parse(vm.storageSet('tarefas', null)) : JSON.parse(vm.tarefasExemplo);

		vm.setTarefas = function(resolve) {
			console.log(resolve);
			
			if(resolve != null || !resolve.delete) {
				vm.tarefas.push(resolve)
			} else {
				for (let i = 0; i < vm.tarefas.length; i++) {
					if (vm.tarefas[i].id == resolve.idx) {
						vm.tarefas.splice(i, 1)
					}
				}
			}
			vm.tarefas = vm.storageSet('tarefas', null, JSON.stringify(vm.tarefas));
			vm.tarefas = JSON.parse(vm.storageSet('tarefas', null));
			console.log(vm.tarefas);
			
		}
		
		vm.excluiTarefas = function(resolve) {
			console.log(resolve);
			for (let i = 0; i < vm.tarefas.length; i++) {
				if (vm.tarefas[i].id == resolve.idx) {
					vm.tarefas.splice(i, 1)
				}
			}
			vm.tarefas = vm.storageSet('tarefas', null, JSON.stringify(vm.tarefas));
			vm.tarefas = JSON.parse(vm.storageSet('tarefas', null));
		}

		vm.updateTarefas = function(resolve) {
			console.log(resolve);
			
			for (let i = 0; i < vm.tarefas.length; i++) {
				if (vm.tarefas[i].id == resolve.idx) {
					vm.tarefas[i].pendente = resolve.pendente
				}
			}
			vm.tarefas = vm.storageSet('tarefas', null, JSON.stringify(vm.tarefas));
			vm.tarefas = JSON.parse(vm.storageSet('tarefas', null));
		}

		vm.mouseOver = function (resolve) {
			vm.etiquetas[resolve].destaq = true
		}

		vm.mouseOut = function (resolve) {
			vm.etiquetas[resolve].destaq = false
		}
		// ------------------------------------------------------
		// Kanban
		// ------------------------------------------------------
		/* Kanban Flow */
		vm.sortableOptionsKanbanFlow = {
			distance: 50,
			tolerance: "pointer",
			axis: 'x',
			scrollSpeed: 60,
			cursor: 'move',
			snap: true,
			revert: 100,
			forceHelperSize: true,
			forcePlaceholderSize: true,
			placeholder: 'ui-sortable-placeholder',
			opacity: .9,
			start: function (event, ui) {
				// console.log(ui);
				
				ui.placeholder.css("min-width", ui.item[0].clientWidth);
				ui.placeholder.css("margin-right", "4px");
				ui.item.toggleClass("ui-sortable-helper");
			},
			stop: function (event, ui) {
				ui.item.removeClass("ui-sortable-helper");
			}
		}

		// ------------------------------------------------------
		// Sortable
		// ------------------------------------------------------

		vm.dragging = false;
		/* Listas do kanban */
		vm.sortableOptionsLists = {
			connectWith: ".bth-kanban-lists",
			handle: '.bth-kanban-list-item__move',
			// connectWith: ".dropzone",
			distance: 20,
			tolerance: "pointer",
			scrollSpeed: 30,
			cursor: 'grabbing',
			snap: true,
			revert: 100,
			forceHelperSize: true,
			forcePlaceholderSize: true,
			placeholder: 'ui-sortable-placeholder',
			opacity: .9,
			start: function (event, ui) {
				// console.log(ui);
				$timeout(function() {
					vm.dragging = true
					console.log(vm.dragging);
				}, 200);
				
				ui.placeholder.height(ui.item.height());
				ui.item.toggleClass("ui-sortable-helper");
			},
			stop: function (event, ui) {
				$timeout(function() {
					vm.dragging = false
					console.log(vm.dragging);  
				}, 200);
				ui.item.removeClass("ui-sortable-helper");
			}
		}

		/* Tabelas */
		vm.sortableOptionsTable = {
			connectWith: ".table-sortable",
			distance: 20,
			tolerance: "pointer",
			scrollSpeed: 30,
			cursor: 'grabbing',
			snap: true,
			revert: 100,
			forceHelperSize: true,
			forcePlaceholderSize: true,
			placeholder: 'ui-sortable-placeholder-table',
			opacity: .9,
			start: function (event, ui) {
				ui.placeholder.height(ui.item.height());
				ui.placeholder.width(ui.item.width());
				ui.item.toggleClass("ui-sortable-helper");
			},
			stop: function (event, ui) {
				ui.item.removeClass("ui-sortable-helper");
			}
		}

		vm.mouseOver = function (resolve) {
			vm.etiquetas[resolve].destaq = true
		}

		vm.mouseOut = function (resolve) {
			vm.etiquetas[resolve].destaq = false
		}

		// ------------------------------------------------------
		// Etiquetas
		// ------------------------------------------------------
		vm.etiquetasSelecionados = []
		vm.editarEtiquetas = function (resolve) {
			abrirPopup('agenda/tarefa/etiquetas-modal.html', resolve)
		}

		vm.setEtiquetas = function (resolve) {
			resolve.val ? vm.etiquetasSelecionados.push(resolve.marc) : null

			if (vm.etiquetasSelecionados == null) {
				console.log('Nenhum selecionado');
				vm.etiquetasSelecionados = [resolve.marc]
			} else {
				for (let i = 0; i < vm.etiquetasSelecionados.length; i++) {
					if(resolve.marc == vm.etiquetasSelecionados[i] && !resolve.val) {
						vm.etiquetasSelecionados.splice(i, 1)
					}
				}
			}
		}

		vm.filtraEtiqueta = function(resolve) {
			if (vm.etiquetasSelecionados.length > 0) {
				for (let i = 0; i < resolve.length; i++) {
					for (let m = 0; m < vm.etiquetasSelecionados.length; m++) {
						if(resolve[i] == vm.etiquetasSelecionados[m]) {
							return true;
							break
						} else {
							return false;
							break
						}
					}
				}
			} else {
				return true
			}
		}

		vm.etiquetas = [
			{ id: 1, destaq: false, descricao: 'Urgente'   , color: '#3475C1', bColor: 'red'    },
			{ id: 2, destaq: false, descricao: 'Visita'    , color: '#D64038', bColor: 'yellow' },
			{ id: 3, destaq: false, descricao: 'Revisão'   , color: '#EFBC3C', bColor: 'green'  },
			{ id: 4, destaq: false, descricao: 'Particular', color: '#54A668', bColor: 'blue'   },
		]

		// ------------------------------------------------------
		// Configurações
		// ------------------------------------------------------

		vm.compartilhamentosDisponiveis = function() {
			var itens = new Array;
			vm.procuradores.forEach(function (element, index) {
				itens.push({id: index, descricao: element.procurador.nome, icon: 'fa-user'})
			})
			vm.grupos.forEach(function (element, index) {
				itens.push({id: index, descricao: element.descricao, icon: 'fa-users'})
			})
			return itens
		}

		vm.compartFiltroOptions = {
			data: vm.compartilhamentosDisponiveis(),
			formatResult: function(item){
				return '<i class="fa fa-fw '+ item.icon +'"></i> ' + item.descricao
			},
			formatSelection: function(item){
				return '<i class="fa fa-fw '+ item.icon +'"></i> ' + item.descricao
			},
		}

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'TarefasModalCtrl as TarefasModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					 persistRemove: false
				})
			});
		}
	}

	//controller da modal
	angular.module('app').controller('TarefasModalCtrl', TarefasModalCtrl);

	TarefasModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function TarefasModalCtrl($scope, ModalCad, params) {
		var vm = $scope;
		vm.tiposPend = params.tipoPend;
		vm.hist = params.hist;
		vm.modo = params.modo;
		vm.item = params.item;
		vm.source = params.source;
		vm.tipos = params.tipo;
		vm.isEditing = params.isEditing;
		vm.horaNotificacao = '12:00:00'
		vm.iniciarNotificacoes = 5

		vm.etiquetasSelecionados = []
		vm.procuradoresSelecionados = []
		vm.vinculosSelecionados = []
	
		vm.setEtiquetas = function (resolve) {
			console.log('Modal');
			console.log('Marcador: ' + resolve.marc + ' = ' + resolve.val);
			resolve.val ? vm.etiquetasSelecionados.push(resolve.marc) : null

			if (vm.etiquetasSelecionados == null) {
				console.log('Nenhum selecionado');
				vm.etiquetasSelecionados = [resolve.marc]
			} else {
				for (let i = 0; i < vm.etiquetasSelecionados.length; i++) {
					if(resolve.marc == vm.etiquetasSelecionados[i] && !resolve.val) {
						vm.etiquetasSelecionados.splice(i, 1)
					}
					
				}
			}
		}

		vm.cadProcessOptions = {
			data: vm.execucoesFiscais,
			placeholder: 'Pesquise pelo Nº do processo, nome ou CPF/CNPJ do executado',
			allowClear: true,

			formatResult: function(item){
				return "Nº: " + item.numProcesso +"<br> Executado: "+ item.executado.nome +" - <small class='text-muted'>CPF: "+ item.executado.cpfcnpj +"</small>"
			},
			formatSelection: function(item){
				console.log(item.procurador);
				vm.procuradoresSelecionados = []
				vm.setProcuradores({proc:item.procurador.id,val:true,padrao:true})
				return item.numProcesso +" - "+ item.executado.nome +" - <small class='text-muted'> ("+ item.executado.cpfcnpj +")</small>"
			},
		}

		vm.setProcuradores = function (resolve) {
			console.log(resolve);
			resolve.val ? vm.procuradoresSelecionados.push(resolve.proc) : null
			console.log(vm.procuradoresSelecionados);
			if (vm.procuradoresSelecionados == null) {
				vm.procuradoresSelecionados = [resolve.proc]
			} else {
				for (let i = 0; i < vm.procuradoresSelecionados.length; i++) {
					if(resolve.proc == vm.procuradoresSelecionados[i] && !resolve.val) {
						vm.procuradoresSelecionados.splice(i, 1)
					}
				}
			}
		}
		
		vm.setVinculos = function (resolve) {
			console.log(resolve);
			
			resolve.val ? vm.vinculosSelecionados.push(resolve.vinc) : null

			if (vm.vinculosSelecionados == null) {
				vm.vinculosSelecionados = [resolve.vinc]
			} else {
				for (let i = 0; i < vm.vinculosSelecionados.length; i++) {
					if(resolve.vinc == vm.vinculosSelecionados[i] && !resolve.val) {
						vm.vinculosSelecionados.splice(i, 1)
					}
				}
			}
		}
	}
})();