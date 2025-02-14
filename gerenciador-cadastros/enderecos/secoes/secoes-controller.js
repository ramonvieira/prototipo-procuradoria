(function () {
	angular.module('app')
	.service('SecoesService', function($rootScope, db) {
		$rootScope.serviceDb('secoes')
	})
	.filter('secoes', function($filter, SecoesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'secoes', selector ? selector : 'secao')
		}
	})
	.directive('secoesSelect', function() {
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
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, SecoesService, $filter) {
			var vm = $scope
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre seções pelo código ou pelo nome.'
				} else {
					return vm.placeholder
				}
			}

			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.secoes, 'id'),
					text: function(item) {
						return $filter('faces')(item.face);
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('secoes')($(element).val(), 'object') ) : null
				},
				formatResult: function(item) {
					return item.secao + ' - ' + $filter('faces')(item.face)
				},
				formatSelection: function(item) {
					return item.secao + ' - ' + $filter('faces')(item.face)
				},
			}
		}
	})
	.controller('SecoesCtrl', ['$scope', 'arrecModal', 'SecoesService', 'db',
		function($scope, arrecModal, SecoesService, db) {
			var vm = $scope;

			vm.salvar = function(registro) {
				db.push('secoes', registro)
			}
			
			vm.excluir = function(registro) {
				db.delete('secoes', registro)
			}

			vm.adicionar = function(registro) {
				arrecModal.open('cadastros/enderecos/secoes/secoes-modal.html', $scope, registro, '', 'SecoesModalCtrl')
			}
		}
	])
	.controller('SecoesModalCtrl', ['$scope',
		function($scope) {
			var vm = $scope;

			vm.registro.camposAdicionais ? vm.registro.camposAdicionais = vm.registro.camposAdicionais : vm.registro.camposAdicionais = [{},{},{}]
		}
	])
})();