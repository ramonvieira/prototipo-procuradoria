(function () {

	angular.module('app')
	.service("CategoriaBensService", function($rootScope) {
		$rootScope.serviceDb('categoriasBens')

		return {
			categorias: $rootScope.categoriasBens
		}
	})
	.filter('categoriasBens', function($filter, CategoriaBensService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'categoriasBens', selector ? selector : 'descricao')
		}
	})
	.directive('categoriasBensSelect', function() {
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
			controller: function($rootScope, $scope, $filter, CategoriaBensService, $q) {
				var vm = $scope
			
				vm.selectOptions = {
					allowClear: $scope.ngRequired != true ? true : false,
					multiple: vm.multiple,
					data: $filter('orderBy')(CategoriaBensService.categorias, 'descricao'),
					placeholder: false,
					formatValue: function(item){
						item = vm.multiple ? item : item.id
						return item
					},
					initSelection: function(element, callback) {
						console.log(element);
						var id = Number($(element).val());
						console.log(id);
						console.log($filter('categoriasBens')(id, 'object'));
						if (id > 0) {
							callback( $filter('categoriasBens')(id, 'object') )
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
	.controller('CategoriaBensCtrl', ['$scope', 'arrecModal', 'CategoriaBensService', 'db',
		function($scope, arrecModal, CategoriaBensService, db) {
			var vm = $scope;

			vm.categorias = CategoriaBensService.categorias

			vm.adicionar = function(resolve) {
				arrecModal.open("gerenciador-cadastros/gerais/categoria-bens/categoria-bens-modal.html", $scope, resolve, '', 'CategoriaBensModalCtrl');
			};

			vm.excluir = function(registro) {
				db.delete('categoriasBens', registro)
			}
		}
	])
	
	.controller('CategoriaBensModalCtrl', ['$scope', '$modalInstance', 'CategoriaBensService', '$timeout', 'db',
		function($scope, $modalInstance, CategoriaBensService, $timeout, db) {
			var vm = $scope;
			vm.descricaoExistente = false
			vm.descricaoInicial = ''

			if(vm.isEditing) {
				vm.descricaoInicial = angular.copy(vm.registro.descricao).toUpperCase()
			}

			vm.setDescricaoExistente = function(val) {
				$timeout(() => {
					vm.descricaoExistente = val
				}, 300)
			}

			$timeout(() => {
				var campoDescricao = $('#descricao')
				campoDescricao.on('keyup', function(e) {
					vm.setDescricaoExistente(CategoriaBensService.categorias.some((categoria, idx) => {
						if(campoDescricao.val().toUpperCase() == vm.descricaoInicial) {
							return false
						} else {
							if(categoria.descricao.toUpperCase() == campoDescricao.val().toUpperCase()) {
								return true
							} else {
								return false
							}
						}
					}))
				})
			}, 500)

			vm.salvar = function(registro) {
				db.push('categoriasBens', registro)
				$modalInstance.close()
			}
		}
	])
})();