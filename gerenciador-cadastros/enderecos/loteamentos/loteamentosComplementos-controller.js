(function() {

	'use strict';
	
	angular.module('app')
	.service('LoteamentosService', function($rootScope) {
		$rootScope.serviceDb('loteamentos')
	})
	.filter('loteamentos', function($filter, LoteamentosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'loteamentos', selector ? selector : 'descricao')
		}
	})
	.directive('loteamentosSelect', function() {
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

		function SelectCtrl($rootScope, $scope, $filter, LoteamentosService, $q) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.loteamentos, 'id'),
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
					$(element).val() != '' ? callback( $filter('loteamentos')($(element).val(), 'object') ) : null
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
				formatResult: function(item) {
					if (item.descricao) {
						return item.id + ' - ' + item.descricao
					} else {
						return item.text
					}
				},
				formatSelection: function(item) {
					if (item.descricao) {
						return item.id + ' - ' + item.descricao
					} else {
						return item.text
					}
				},
			}
		}
	})
	.controller('LoteamentosCtrl', ['$rootScope', '$scope', 'arrecadacao.common.ModalCad', 'LoteamentosService', 'arrecModal', 'db',
		function($rootScope, $scope, ModalCad, LoteamentosService, arrecModal, db) {
			var vm = $scope;

			vm.adicionar = function(resolve) {
				arrecModal.open('cadastros/enderecos/loteamentos/modal-loteamentos.html', $rootScope, resolve, '', 'LoteamentosModalCtrl')
			};

			vm.atualizar = function () {
				db.getData('loteamentos')
			}

			vm.excluir = function(registro) {
				db.delete('loteamentos', registro)
			}

			vm.tipoAreasPublica = [
				{ id: 1, descricao: 'Área verde' },
				{ id: 2, descricao: 'Área de uso público especial' },
				{ id: 3, descricao: 'Área de uso dominial' },
			]
			
		}
	])

	.controller('LoteamentosModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'db',
		function($scope, ModalCad, db) {
			var vm = $scope;

			vm.salvar = function(registro) {
				db.push('loteamentos', registro)
			}
		}
	])
})();