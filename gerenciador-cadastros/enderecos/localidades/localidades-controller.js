(function () {
	angular.module('app')
	.service('LocalidadesService', function($rootScope) {
		$rootScope.serviceDb('localidades')
	})
	.filter('localidades', function($filter, LocalidadesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'localidades', selector ? selector : 'descricao')
		}
	})
	.directive('localidadesSelect', function() {
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
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, $filter, LocalidadesService, $q) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: $filter('orderBy')($rootScope.localidades, 'id'),
				placeholder: false,
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
					return item.id + ' - ' + item.descricao
				},
				formatSelection: function(item){
					return item.id + ' - ' + item.descricao
				},
			}
		}
	})
	.controller('LocalidadesCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'LocalidadesService',
		function($scope, ModalCad, LocalidadesService) {
			var vm = $scope;
			vm.adicionar = _adicionar;

			function _adicionar() {
				_abrirPopup({registro: undefined});
			}

			function _abrirPopup(resolve) {
				ModalCad.open({
					templateUrl: 'cadastros/enderecos/localidades/modal-localidades.html',
					controller: 'LocalidadesModalCtrl as LocalidadesModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])
	.controller('LocalidadesModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', 'db',
		function($scope, ModalCad, params, db) {
			var vm = $scope;

			console.log(params);
			vm.registro = params.registro ? params.registro : {}
			// vm.registro = {}
			
			vm.salvar = function(registro) {
				console.log(registro);
				registro.municipio = registro.municipio.id
				registro.distrito = registro.distrito.id
				db.push('localidades', registro)
			}

			vm.atualizar = function () {
				db.getData('localidades')
			}

			vm.excluir = function(registro) {
				db.delete('localidades', registro)
			}
		}
	])
})();