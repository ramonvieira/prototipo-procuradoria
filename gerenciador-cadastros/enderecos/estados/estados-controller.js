(function() {

	'use strict';
	
	angular.module('app')
	.service('EstadosService', function($rootScope) {
		$rootScope.serviceDb('estados')
	})
	.filter('estados', function($filter, EstadosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'estados', selector ? selector : 'descricao')
		}
	})
	.directive('estadosSelect', function() {
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
			replace: true,
			scope: {
				class      : '@?',
				ngModel    : '=' ,
				ngChange   : '=' ,
				label      : '@?',
				multiple   : '=' ,
				ngRequired : '=' ,
				ngDisabled : '=' ,
				placeholder: '@?',
				filter     : '=' ,
				descricao  : '=' ,
			},
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, $filter, EstadosService, $q) {
			var vm = $scope
			$scope.descricao = $scope.descricao != false ? true : false
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.estados, 'id'),
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
					$(element).val() != '' ? callback( $filter('estados')($(element).val(), 'object') ) : null
				},
				formatResult: function(item){
					return !$scope.descricao ? item.sigla : item.descricao + ' (' + item.sigla + ')'
				},
				formatSelection: function(item){
					return !$scope.descricao ? item.sigla : item.descricao + ' (' + item.sigla + ')'
				},
			}
		}
	})
	.controller('EstadosCtrl', ['$scope', '$filter', 'arrecModal', 'bfc.Notification', 'promiseTracker', '$timeout', 'UNDO_TIMEOUT', 'db', 'EstadosService',
		function($scope, $filter, arrecModal, Notification, promiseTracker, $timeout, UNDO_TIMEOUT, db, EstadosService){
			var vm = $scope;
			vm.listagem = [];

			vm.adicionar = function(resolve) {
				arrecModal.open('cadastros/enderecos/estados/estados-modal.html', $scope, resolve, '', 'EstadosModalCtrl')
			}

			vm.salvar = function(registro) {
				registro.padrao = true;
				db.push('estados', registro)
			}
			
			vm.excluir = function(registro) {
				db.delete('estados', registro)
			}
		}
	])
	.controller('EstadosModalCtrl', ['bfc.Focus', '$scope', 'bfc.Notification', 'promiseTracker',
		function(Focus, $scope, Notification, promiseTracker){
			var vm = $scope;
		}
	])
})();