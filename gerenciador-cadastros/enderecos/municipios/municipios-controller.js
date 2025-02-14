(function(){

    'use strict';
    
    angular.module('app')
    .service('MunicipiosService', function($rootScope) {
		$rootScope.serviceDb('municipios')
	})
	.filter('municipios', function($filter, MunicipiosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'municipios', selector ? selector : 'descricao')
		}
	})
	.directive('municipio', function() {
		return {
			restrict: 'E',
			template:	`
				<span ng-class="{'show' : BLOCK}">
					<span title="Código" ng-class="{'badge badge-default' : BADGE}" ng-if="ID" keep-open>
						{{ID ? MUNICIPIO.id : null}}{{ID && !BADGE ? " - " : null}}
					</span>
					{{MUNICIPIO.descricao}}
					<small class="text-muted" ng-class="{'show' : WRAP}" ng-if="showEstado">
						({{MUNICIPIO.estado | estados:'sigla'}})
					</small>
				</span>
			`,
			required: 'municipio',
			replace: true,
			scope: {
				municipio  : '=' ,
				block      : '=' ,
				wrap       : '=' ,
				id         : '=' ,
				badge      : '=' ,
				showEstado : '=' ,
			},
			controller: function($scope, $filter, EnderecosService) {
				$scope.MUNICIPIO = $filter('municipios')($scope.municipio, 'object')

				$scope.HAS_REFERENTE = $scope.municipio     == null  ? false : true
				$scope.BLOCK         = $scope.block         != true  ? false : true
				$scope.WRAP          = $scope.wrap          != true  ? false : true
				$scope.ID            = $scope.id            != false ? true  : false
				$scope.BADGE         = $scope.badge         != false ? true  : false
				$scope.SHOW_ESTADO   = $scope.showEstado    != false ? true  : false
			}
		}
	})
	.directive('municipiosSelect', function() {
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

		function SelectCtrl($rootScope, $scope, $filter, MunicipiosService, $q) {
			var vm = $scope
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: $filter('orderBy')($rootScope.municipios, 'descricao'),
				placeholder: false,
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('municipios')($(element).val(), 'object') ) : null
				},
				formatResult: function(item){
					return item.descricao + ' (' + $filter('estados')(item.estado, 'sigla') + ')'
				},
				formatSelection: function(item){
					return item.descricao + ' (' + $filter('estados')(item.estado, 'sigla') + ')'
				},
			}
		}
	})
    .controller('TributosCoreMunicipiosCtrl', ['$rootScope', '$scope', '$filter', 'arrecadacao.common.GridConfig', 'TributosCoreMunicipiosService', 'arrecadacao.common.ModalCad', 'bfc.Notification', 'promiseTracker', '$timeout', 'UNDO_TIMEOUT',
        function($rootScope, $scope, $filter, GridConfig, TributosCoreMunicipiosService, ModalCad, Notification, promiseTracker, $timeout, UNDO_TIMEOUT){
            var vm = $scope;

            $rootScope.serviceDb('municipios')
            console.log($rootScope);
            vm.listagem = [];
            vm.gridConfig = GridConfig.configure({ sortedBy: 'descricao' });
            vm.gridConfigNacionais = GridConfig.configure({ sortedBy: 'descricao' });
        
            vm.adicionar = _adicionar;

            function _adicionar() {
                _abrirPopup({registro: undefined});
            }

            function _abrirPopup(resolve) {
                ModalCad.open({
                    templateUrl: 'gerenciador-cadastros/enderecos/municipios/municipios-modal.html',
                    controller: 'TributosCoreMunicipiosModalCtrl as vm',
                    scope: $scope,
                    resolve: angular.extend(resolve, {
                        persistRemove : false
                    })
                });
            }
        }
    ])
    
    .controller('TributosCoreMunicipiosModalCtrl', ['bfc.Focus','$scope', 'TributosCoreMunicipiosService', 'bfc.Notification', 'promiseTracker', '$q', 'UNDO_TIMEOUT', '$modalInstance', 'params',
        function(Focus, $scope, TributosCoreMunicipiosService, Notification, promiseTracker, $q, UNDO_TIMEOUT, $modalInstance, params){
            var vm = $scope;
            vm.registro =  params.registro || angular.extend({}, params.defaultValues);
            vm.editando = params.registro != undefined ? true : false;
        }
    ])
})();