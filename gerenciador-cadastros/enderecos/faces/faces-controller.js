(function () {
	angular.module('app')
	.service('FacesService', function($rootScope, db) {
		$rootScope.serviceDb('faces')
	})
	.filter('faces', function($filter, FacesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'faces', selector ? selector : 'descricao')
		}
	})
	.directive('facesSelect', function() {
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

		function SelectCtrl($rootScope, $scope, FacesService, $filter) {
			var vm = $scope
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre faces pelo código ou pelo nome.'
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.faces, 'id'),
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('faces')($(element).val(), 'object') ) : null
				},
				formatResult: function(item) {
					return item.descricao
				},
				formatSelection: function(item) {
					return item.descricao
				},
			}
		}
	})
	.controller('FacesCtrl', ['$scope', 'arrecModal','FacesService', 'db',
		function($scope, arrecModal, FacesService, db) {
			var vm = $scope;

			vm.salvar = function(item) {
				item.padrao = false
				db.push('faces', item)
			}

			vm.excluir = function(item) {
				db.delete('faces', item)
			}

			vm.adicionar = function(resolve) {
				arrecModal.open('cadastros/enderecos/faces/faces-modal.html', $scope, resolve, '', 'FacesModalCtrl')
			}
		}
	])

	//controller da modal
	.controller('FacesModalCtrl', ['$scope', '$modalInstance',
		function($scope, $modalInstance) {
			var vm = $scope;
		}
	])
})();