(function () {
	angular.module('app')
	.service('DistritosService', function($rootScope) {
		$rootScope.serviceDb('distritos')
	})
	.filter('distritos', function($rootScope, $filter, DistritosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'distritos', selector ? selector : 'descricao')
		}
	})
	.directive('distritosSelect', function() {
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
	
		function SelectCtrl($rootScope, $scope, $filter, DistritosService, $q) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.distritos, 'id'),
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: false,
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('distritos')($(element).val(), 'object') ) : null
				},
				formatResult: function(item){
					if (item.descricao) {
						if (item.padrao) {
							return item.descricao
						} else {
							return item.id + ' - ' + item.descricao
						}
					} else {
						return item.text
					}
				},
				formatSelection: function(item){
					if (item.descricao) {
						if (item.padrao) {
							return item.descricao
						} else {
							return item.id + ' - ' + item.descricao
						}
					} else {
						return item.text
					}
				},
			}
		}
	})
	.controller('DistritosCtrl', ['$scope', '$filter', 'arrecModal', 'bfc.Notification', 'promiseTracker', '$timeout', 'UNDO_TIMEOUT', 'ENUMS', 'db', 'DistritosService',
		function($scope, $filter, arrecModal, Notification, promiseTracker, $timeout, UNDO_TIMEOUT, ENUMS, db, DistritosService){
			var vm = $scope;
			
			vm.adicionar = function(resolve) {
				arrecModal.open('cadastros/enderecos/distritos/distritos-modal.html', $scope, resolve, '', 'DistritosModalCtrl')
			}

			vm.salvar = function(registro) {
				registro.padrao = false;
				db.push('distritos', registro)
			}

			vm.excluir = function(registro) {
				db.delete('distritos', registro)
			}
		}
	])
	.controller('DistritosModalCtrl', ['$scope',
		function($scope) {
			var vm = $scope;
		}
	])
})();