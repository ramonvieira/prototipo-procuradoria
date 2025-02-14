(function() {

	'use strict';
	
	angular.module('app')
	.service('BairrosService', function($rootScope) {
		$rootScope.serviceDb('bairros')
	})
	.filter('bairros', function($filter, BairrosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'bairros', selector ? selector : 'descricao')
		}
	})
	.directive('bairro', function() {
		return {
			restrict: 'E',
			template:	`
				<span ng-class="{'show' : BLOCK}">
					<span title="Código" ng-class="{'badge badge-default' : BADGE}" ng-if="ID && !BAIRRO.padrao" keep-open>
						{{ID ? BAIRRO.id : null}}{{ID && !BADGE ? " - " : null}}
					</span>
					{{BAIRRO.descricao}}
					<small class="text-muted" ng-class="{'show' : WRAP}" ng-if="showMunicipio || showEstado">
						({{showMunicipio ? (BAIRRO.municipio | municipios) : null}}{{showEstado ? '-' + (BAIRRO.municipio | municipios:'estado' | estados:'sigla') : null}})
					</small>
				</span>
			`,
			required: 'bairro',
			replace: true,
			scope: {
				bairro        : '=' ,
				block         : '=' ,
				wrap          : '=' ,
				id            : '=' ,
				badge         : '=' ,
				showMunicipio : '=' ,
				showEstado    : '=' ,
			},
			controller: function($scope, $filter, EnderecosService) {
				$scope.BAIRRO = $filter('bairros')($scope.bairro, 'object')

				$scope.HAS_REFERENTE  = $scope.bairro        == null  ? false : true
				$scope.BLOCK          = $scope.block         != true  ? false : true
				$scope.WRAP           = $scope.wrap          != true  ? false : true
				$scope.ID             = $scope.id            != false ? true  : false
				$scope.BADGE          = $scope.badge         != false ? true  : false
				$scope.SHOW_MUNICIPIO = $scope.showMunicipio != false ? true  : false
				$scope.SHOW_ESTADO    = $scope.showEstado    != false ? true  : false
			}
		}
	})
	.directive('bairrosSelect', function() {
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
				class           : '@?' ,
				ngModel         : '='  ,
				ngChange        : '='  ,
				label           : '@?' ,
				multiple        : '='  ,
				ngRequired      : '='  ,
				ngDisabled      : '='  ,
				allowSearchParts: '='  ,
				placeholder     : '@?' ,
				filter          : '='  ,
				showCidade	    : '='  ,
				showEstado	    : '='  ,
			},
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, $filter, BairrosService, $q) {
			var vm = $scope

			function formataDescricao(item) {
				var DESCRICAO = ''
					if (item.descricao) {
						if (item.padrao) {
							DESCRICAO = item.descricao
						} else {
							DESCRICAO = item.id + ' - ' + item.descricao
						}
					} else {
						DESCRICAO = item.text
					}

					if(vm.showCidade || vm.showEstado) {
						const MUNICIPIO = $filter('municipios')(item.municipio, 'object') 
						DESCRICAO += ' <small class="text-muted">('
							if(vm.showCidade                 ) { DESCRICAO += MUNICIPIO.descricao                           }
							if(vm.showCidade && vm.showEstado) { DESCRICAO += '-'                                           }
							if(vm.showEstado                 ) { DESCRICAO += $filter('estados')(MUNICIPIO.estado, 'sigla') }
						DESCRICAO += ')</small>'
					}
				return DESCRICAO
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.bairros, 'descricao'),
					text: function(item) {
						return item.descricao
					}
				},
				placeholder: false,
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('bairros')($(element).val(), 'object') ) : null
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
					return formataDescricao(item)
				},
				formatSelection: function(item){
					return formataDescricao(item)
				},
			}
		}
	})
	.controller('BairrosCtrl', ['$scope', '$filter', 'bfc.Notification', 'promiseTracker', '$timeout', 'UNDO_TIMEOUT', 'ENUMS', 'db', 'BairrosService', 'arrecModal',
		function($scope, $filter, Notification, promiseTracker, $timeout, UNDO_TIMEOUT, ENUMS, db, BairrosService, arrecModal){
			var vm = $scope;
			vm.listagem = [];
		
			vm.adicionar = function (resolve) {
				arrecModal.open('cadastros/enderecos/bairros/bairros-modal.html', $scope, resolve, '', 'BairrosModalCtrl', )
			}
			
			vm.salvar = function(item) {
				item.padrao = false
				db.push('bairros', item)
			}

			vm.excluir = function(registro) {
				db.delete('bairros', registro)
			}
		}
	])
	.controller('BairrosModalCtrl', ['bfc.Focus', '$scope', 'bfc.Notification', 'promiseTracker', '$q', 'UNDO_TIMEOUT', '$modalInstance',
		function(Focus, $scope, Notification, promiseTracker, $q, UNDO_TIMEOUT, $modalInstance) {
			var vm = $scope;
		}
	])
})();