(function () {

	angular.module('app')
	.service('GrupoProfissionaisService', function($rootScope) {
		$rootScope.serviceDb('grupoProfissionais')

		return {
			grupos: $rootScope.grupoProfissionais
		}
	})
	.filter('grupoProfissionais', function($filter, GrupoProfissionaisService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'grupoProfissionais', selector ? selector : 'descricao')
		}
	})
	.directive('grupoProfissionaisSelect', function() {
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
				allowSearchParts: '=',
				placeholder: '@?',
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: function($scope, $filter, GrupoProfissionaisService) {
				var vm = $scope
			
				vm.selectOptions = {
					allowClear: $scope.ngRequired != true ? true : false,
					multiple: vm.multiple,
					data: $filter('orderBy')(GrupoProfissionaisService.grupos, 'descricao'),
					placeholder: false,
					formatValue: function(item){
						item = vm.multiple ? item : item.id
						return item
					},
					initSelection: function(element, callback) {
						var id = Number($(element).val());
						if (id > 0) {
							callback( $filter('grupoProfissionais')(id, 'object') )
						}
					},
					createSearchChoice: function(term, data) {
						if (vm.allowSearchParts) {
							if ($(data).filter(
								function() {
									return this.text.localeCompare(term)===0;
								}
							).length===0) {
								return { id:term, text:term };
							}
						} else {
							return false
						}
					},
					formatResult: function(item){
						return item.descricao
					},
					formatSelection: function(item){
						return item.descricao
					},
				}
			}
		}
	})
	.controller('GrupoProfissionaisCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'ENUMS', 'GrupoProfissionaisService', 'db',
		function($scope, ModalCad, ENUMS, GrupoProfissionaisService, db ) {

			var vm = $scope;

			vm.procuradores = ENUMS.PROCURADORES;
			vm.contribuintes = ENUMS.CONTRIBUINTES;
			vm.grupos = GrupoProfissionaisService.grupos;
			vm.areas = ENUMS.AREAS;
			vm.tiposAusencia = ["Provisória", "Definitiva"]

			vm.openGrupo = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/grupo-profissionais/grupo-modal.html', resolve);
			};
			vm.adicionarMembros = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/grupo-profissionais/membros-modal.html', resolve);
			};
			vm.removerProfissional = function(resolve) {
				console.log(resolve);
				abrirPopup('gerenciador-cadastros/pessoas/grupo-profissionais/remover-profissional-grupo-modal.html', resolve);
			};

			vm.excluir = function(registro) {
				db.delete('grupoProfissionais', registro)
			}

			vm.adicionarAusencia = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/profissionais/ausencias-modal.html',
					controller: 'ProfissionaisAusenciasModalCtrl as ProfissionaisAusenciasModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			};

			vm.editarProfissional = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/profissionais/profissionais-modal.html',
					controller: 'ProfissionaisModalCtrl as ProfissionaisModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			};

			vm.trocaGrupo = function(resolve) {
				vm.grupoSelect = resolve.grupo;
				var scroll = $(document).scrollTop();

				if (scroll > 0) {
					$('html').animate({ 
						scrollTop: 0
					}, (scroll/2));
				}
			}
			
			vm.isAusente = function(procId) {
				var proc = vm.procuradores.find(procurador => procurador.id == procId)
				var ausente
				angular.forEach(proc.ausencias, function(ausencia) {
					ausente = ausencia.ausente ? true : false
				})
				return ausente
			}

			function pos(array, item, propArray, propItem) {
				return array.map(function (e) {
					return eval('e.'+ (propArray ? propArray : 'id') );
				}).indexOf(eval('item.'+ (propItem ? propItem : 'id')));
			}

			function abrirPopup(templateUrl, resolve) {
				console.log(resolve);
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'GrupoProfissionaisModalCtrl as GrupoProfissionaisModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])
	.controller('GrupoProfissionaisModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', 'db',
		function($scope, ModalCad, params, db) {
			var vm = $scope;
			vm.registro = angular.copy(params.registro)
			vm.procuradoresAll = angular.copy(vm.procuradores)
			vm.isEditing = vm.registro && vm.registro.id ? true : false
			vm.profissional = params.profissional

			if (vm.isEditing) {
				vm.registro.procuradores.forEach(procurador => {
					var PROCURADOR = vm.procuradoresAll.find(proc => proc.id == procurador.proc)
					PROCURADOR.selected = true
					PROCURADOR.distribProcessos = procurador.distribProcessos
					PROCURADOR.distribTarefas = procurador.distribTarefas
				})
			}


			vm.salvar = function(registro) {
				registro.procuradores = vm.procuradoresAll
					.filter(procurador => procurador.selected)
					.map(procurador => {
						console.log(procurador);
						return {
							proc            : procurador.id              ,
							distribProcessos: procurador.distribProcessos,
							distribTarefas  : procurador.distribTarefas
						}
					})

				db.push('grupoProfissionais', registro)
			}
		}
	])
})();