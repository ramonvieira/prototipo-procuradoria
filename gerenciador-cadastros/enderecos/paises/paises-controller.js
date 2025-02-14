(function () {
	angular.module('app')
	.service('PaisesService', function($rootScope) {
		$rootScope.serviceDb('paises')
	})
	.filter('paises', function($filter, PaisesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'paises', selector ? selector : 'descricao')
		}
	})
	.directive('paisesSelect', function() {
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

		function SelectCtrl($rootScope, $scope, $filter, PaisesService, $q) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.paises, 'id'),
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
					$(element).val() != '' ? callback( $filter('paises')($(element).val(), 'object') ) : null
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
	.controller('PaisesCtrl', ['$scope', 'arrecadacao.common.ModalCad',
		function($scope, ModalCad) {
			var vm = $scope;
			
		}
	])
})();