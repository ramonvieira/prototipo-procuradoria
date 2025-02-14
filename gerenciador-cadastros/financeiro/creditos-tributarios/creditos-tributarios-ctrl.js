(function() {

	angular.module('app')
	
	.service('CreditosTributariosService', function ($rootScope, IndexadoresService) {
		$rootScope.serviceDb('creditos')
		$rootScope.serviceDb('vinculosCreditosTributarios')

		return {
			creditos: $rootScope.creditos,
			vinculosCreditosTributarios: $rootScope.vinculosCreditosTributarios
		}
	})
	.filter('creditos', function($filter, CreditosTributariosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'creditos', selector ? selector : 'descricao')
		}
	})
	.filter('receitasCredito', function($filter) {
		return function(input) {
			return $filter('creditos')(input, 'object').receitas
		}
	})
	.filter('vinculosCreditosTributarios', function($filter, CreditosTributariosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'vinculosCreditosTributarios', selector ? selector : 'descricao')
		}
	})
	.filter('vinculoCredito', function($filter, CreditosTributariosService) {
		return function(input, selector) {
			return $filter('dataFilter')($filter('dataFilter')(input, 'creditos', 'vinculo'), 'vinculosCreditosTributarios', 'key')
		}
	})
	.filter('vinculosCreditosTributariosSingular', function($filter) {
		return function(input) {
			var data;
			var item = $filter('vinculosCreditosTributarios')(input)
			
			if(item == "Contribuição de melhorias") { data = "Contribuição de melhoria" }
			if(item == "Econômicos"               ) { data = "Econômico"                }
			if(item == "Imóveis"                  ) { data = "Imóvel"                   }
			if(item == "Receitas diversas"        ) { data = "Receita diversa"          }
			if(item == "Parcelamentos"            ) { data = "Parcelamento"             }
			if(item == "Transferência de imóveis" ) { data = "Transferência de imóvel"  }
			if(item == "Nota fiscal avulsa"       ) { data = "Nota avulsa"              }
			if(item == "Autos de infração"        ) { data = "Auto de infração"         }
			if(item == "Projetos"                 ) { data = "Projeto"                  }
			if(item == "Contribuintes"            ) { data = "Contribuinte"             }

			return data
		}
	})
	.directive('creditosTributariosSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				placeholder: '@?',
				multiple: '=',
				filter: '=',
				abbrTag: '='
			},
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}
		function SelectCtrl($rootScope, $scope, CreditosTributariosService, $filter) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $scope.filter != undefined ? $scope.filter : $rootScope.creditos,
					text: function(item) {
						return item.desc
					}
				},
				placeholder: vm.placeholder,
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('creditos')($(element).val(), 'object') ) : null
				},
				formatResult: function(item){
					return item.desc + ' - ' + item.descricao
				},
				formatSelection: function(item){
					return vm.abbrTag ? '<span title="'+ item.descricao +'">'+ item.desc +'</span>' : item.desc + ' - ' + item.descricao
				},
			}
		}
	})
	.directive('creditoTributario', function() {
		return {
			restrict: 'E',
			template: `
				<span><span ng-if="abbr" title="{{descricao ? '' : CREDITO.descricao}}" ng-class="{'badge' : badge}">{{CREDITO.desc}}</span><span class="hidden-xs" ng-class="{'text-muted' : abbr}" ng-if="descricao"> - {{CREDITO.descricao}}</span> <small class="text-muted" ng-if="vinculo">({{CREDITO.vinculo | vinculosCreditosTributarios}})</small></span>
			`,
			scope: {
				credito  : '=',
				abbr     : '=',
				descricao: '=',
				vinculo  : '=',
				badge    : '='
			},
			controller: function($scope, $filter) {
				$scope.abbr      = $scope.abbr      != false ? true : false
				$scope.descricao = $scope.descricao != false ? true : false
				$scope.vinculo   = $scope.vinculo   != true  ? false : true
				$scope.badge     = $scope.badge     != true  ? false : true

				if(typeof $scope.credito != 'object') {
					$scope.CREDITO = $filter('creditos')($scope.credito, 'object')
				} else {
					$scope.CREDITO = $scope.credito
				}
			}
		}
	})
	.directive('vinculosCreditosTributariosSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				placeholder: '@?',
				multiple: '=',
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, CreditosTributariosService, $filter) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: $rootScope.vinculosCreditosTributarios,
				placeholder: vm.placeholder,
				sorter: function(item) {
					return $rootScope.vinculosCreditosTributarios.sort(function(a, b) {
						return a.descricao < b.descricao ? -1 : a.descricao > b.descricao ? 1 : 0
					})
				},
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('vinculosCreditosTributarios')($(element).val(), 'object') ) : null
				},
				formatResult: function(item){
					return item.descricao
				},
				formatSelection: function(item){
					return item.descricao
				},
			}
		}
	})
	.controller('CreditosTributariosCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'arrecModal', 'CreditosTributariosService', 'ReceitasService', 'db',
		function($scope, ModalCad, arrecModal, CreditosTributariosService, ReceitasService, db) {

			var vm = $scope;

			vm.permissoesCredito = true

			vm.editarPermissoesCredito = function(resolve) {
				arrecModal.open('configuracoes/acessos/credito-modal.html', $scope, resolve, 'lg', 'GerenciadorAcessosCreditosModalCtrl')
			};

			vm.gerenciandoLeisAtos = function(b) {
				abrirGerenciadorLeisAtos({
					isEditing: b
				});
			};

			function abrirGerenciadorLeisAtos(resolve) {
				ModalCad.open({
					templateUrl: 'cadastros/financeiro/creditos-tributarios/gerenciando-leis-atos-modal.html',
					controller: 'GerenciandoLeisAtosModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.adicionarCredito = function(resolve) {
				arrecModal.open('cadastros/financeiro/creditos-tributarios/creditos-tributarios-modal.html', $scope, resolve, 'lg', 'CreditosTributariosModalCtrl')
			};
			vm.editarCredito = function(registro) { vm.adicionarCredito(registro) };

			vm.excluir = function(registro) {
				db.delete('creditos', registro)
			}

			// Estruturas listagem

			vm.lineHeight = 1;

			vm.setLineHeight = function(height) {
				vm.lineHeight = height;
			}

			vm.coluna1IsVisible = true;
			vm.coluna2IsVisible = true;
			vm.coluna3IsVisible = true;
			vm.coluna4IsVisible = true;
			vm.coluna5IsVisible = true;

			$scope.$watch("viewContentLoaded", function() {
				setTimeout(function() {

					// Evita que checkbox fecha o menu
					var options = [];
					$( '.dropdown-menu a' ).on( 'click', function( event ) {

					var $target = $( event.currentTarget ),
						val = $target.attr( 'data-value' ),
						$inp = $target.find( 'input' ),
						idx;

					if ( ( idx = options.indexOf( val ) ) > -1 ) {
						options.splice( idx, 1 );
						setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
					} else {
						options.push( val );
						setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
					}

					$( event.target ).blur();
						
					return false;
					});

					//Filtros das colunas
					$("#filtroColunas").select2('val', ['1', '2', '3', '4', '5', '6', '7', '8']);

					//Radio button em dropdown menu não fecha o menu
					$( '.dropdown-menu .bth-radio' ).on( 'click', function(e) {
						e.stopPropagation();
					});

					//Clique em dropdown menu não fecha o menu
					$( '.dropdown-menu' ).on( 'click', function(e) {
						e.stopPropagation();
					});

				}, 200);
			});
		}
	])
	.controller('CreditosTributariosModalCtrl', ['$scope', 'arrecModal', 'ReceitasService', 'CreditosTributariosService', 'db', '$filter', '$modalInstance',
		function($scope, arrecModal, ReceitasService, CreditosTributariosService, db, $filter, $modalInstance) {
			var vm = $scope;

			vm.registro = $modalInstance.params ? $modalInstance.params : {}

			if (!$scope.registro.id) {
				$scope.registro ={
					receitas: [{}],
					dividaAutomatica: 'NAO',
					dividaAutomaticaDias: 30,
					vencimentoDiv: 1,
					inscreveParc: 2
				}		
			}


			vm.step = {
				current: 1
			}

			vm.salvar = function(registro) {
				db.push('creditos', registro)
				$modalInstance.close()
			}

			vm.receitasAdicionadas = {
				imposto: null,
				multa: null,
				correcao: null,
				juros: null,
				multaNofica: null,
			}

			vm.all = false
			function checkAll(elm) {
				if(elm.imposto && elm.multa && elm.correcao && elm.juros && elm.multaNofica) {
					vm.all = true
				} else {
					vm.all = false
				}
			}
			
			vm.checkReceitas = function () {
				var requisito = []
				if(vm.registro.receitas) {
					vm.registro.receitas.forEach(receita => {
						if (receita.receita) {
							var classificacao = $filter('classificacaoReceita')(receita.receita, 'key')
	
							classificacao == 'IMPOSTO'              ? requisito.imposto     = true : false
							classificacao == 'MULTA_INFRACAO'       ? requisito.multa       = true : false
							classificacao == 'CORRECAO_NOTIFICACAO' ? requisito.correcao    = true : false
							classificacao == 'JUROS_NOTIFICACAO'    ? requisito.juros       = true : false
							classificacao == 'MULTA_NOTIFICACAO'    ? requisito.multaNofica = true : false
							checkAll(vm.receitasAdicionadas)
						}
					})
				}

				vm.receitasAdicionadas = requisito

				if (requisito.imposto && requisito.multa && requisito.correcao && requisito.juros && requisito.multaNofica) {
					vm.all = true
				} else {
					vm.all = false
				}
			}

			vm.receitaFiltroOptions = {
				data: vm.receitas,
				formatResult: function(item){
					return item.descricao + " <small class='text__gray' title='Classificação da receita'>("+vm.classificacaoReceitas[item.classificacao].descricao+")</small>"
				},
				formatSelection: function(item){
					return item.descricao
				}
			}

			vm.editarReceita = function(resolve) {
				arrecModal.open("cadastros/cadastros-auxiliares/receitas/receitas-modal.html", $scope, resolve, '', 'ReceitasModalCtrl');
			};

			$scope.$watch("viewContentLoaded", function() {
				setTimeout(function() {

					// Evita que checkbox fecha o menu
					var options = [];
					$( '.dropdown-menu a' ).on( 'click', function( event ) {

					var $target = $( event.currentTarget ),
						val = $target.attr( 'data-value' ),
						$inp = $target.find( 'input' ),
						idx;

					if ( ( idx = options.indexOf( val ) ) > -1 ) {
						options.splice( idx, 1 );
						setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
					} else {
						options.push( val );
						setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
					}

					$( event.target ).blur();
						
					return false;
					});

					//Filtros das colunas
					$("#filtroColunas").select2('val', ['1', '2', '3', '4', '5', '6']);

					//Radio button em dropdown menu não fecha o menu
					$( '.dropdown-menu .bth-radio' ).on( 'click', function(e) {
						e.stopPropagation();
					});

					//Clique em dropdown menu não fecha o menu
					$( '.dropdown-menu' ).on( 'click', function(e) {
						e.stopPropagation();
					});

				}, 200);
			});

			vm.notas = [
				{numeroSerie:'10/S1', dataEmissao:'10/08/2015', tomador: 'Ricardo Fieira Andrade', valorNota: '300,00', valorISSQN: '30,00'},
				{numeroSerie:'20/S1', dataEmissao:'22/11/2015', tomador: 'Ricardo Fieira Andrade', valorNota: '300,00', valorISSQN: '30,00'},
				{numeroSerie:'30/S1', dataEmissao:'02/03/2016', tomador: 'Ricardo Fieira Andrade', valorNota: '300,00', valorISSQN: '40,00'},
			];

			vm.setVinculo = function(vinculo) {
				vinculo != 'CONTRIBUINTES' ? vm.registro.refProtocolo = false : null
			}
		
		}
	])
	.controller('CreditosTributariosPermissoesCreditoModalCtrl', ['$scope', 'arrecModal',
		function($scope, arrecModal) {
			var vm = $scope;
			
		}
	])
	.controller('GerenciandoLeisAtosModalCtrl', ['$scope', '$rootScope', 'ReceitasService',
		function($scope, $rootScope, ReceitasService) {
			var vm = $scope;

			vm.receitas = $rootScope.receitas

			vm.tiposAcao = [
				{ id: 1, descricao:"Movimentação"},
				{ id: 2, descricao:"Estorno"},
				{ id: 3, descricao:"Ambos"},
		 	]
			vm.leisAtos = [
				{ id: 1, descricao: "Lei 1", receitasNaoInscritos: [
						{ receita: 1, tipoAcao: 1 }
					], receitasInscritos: [

						{ receita: 2, tipoAcao: 1 }
					],
					receitasExecucoes: [
						{ receita: 2, tipoAcao: 1 }
					],
				},
				{ id: 2, descricao: "Lei 2", receitasNaoInscritos: [
						{ receita: 1, tipoAcao: 1 }
					], receitasInscritos: [
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 },
						{ receita: 1, tipoAcao: 1 }
					], receitasExecucoes: [
						{ receita: 2, tipoAcao: 1 }
					],
				},
			]

			vm.leiAtoSelected = null;
			vm.setLeiAto = function(leiAto) {
				vm.leiAtoSelected = JSON.parse(leiAto)
			}
		}
	])
})();