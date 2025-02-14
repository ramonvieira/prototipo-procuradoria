(function() {
	'use strict';
	
	angular.module('app')
	
	.directive('arrecObservacoes', function () {
		return {
			template: `
				<div>
					<label for="ngModel" ng-class="{'required' : ngRequired}" ng-if="label != 'false'">{{label ? label : 'Observações'}}</label>
					<textarea id="ngModel" class="form-control" placeholder="{{placeholder}}" ng-model="ngModel" ng-value="ngValue" ng-trim="false" rows="{{rows ? rows : 2}}" maxlength="{{maxLength}}" ng-focus="mostraCampo = true" ng-blur="mostraCampo = false" ng-required="ngDisabled" ng-disabled="ngDisabled"></textarea>
					<small class="u-character-countdown" ng-if="maxLength != 'false'" ng-show="mostraCampo">
						{{MSG}}
					</small>
				</div>
			`,
			replace: true,
			restrict: 'E',
			scope: {
				maxLength  : '@?',
				rows       : '=?',
				cols       : '=?',
				label      : '@?',
				class      : '@?',
				placeholder: '@?',
				ngModel    : '=' ,
				ngValue    : '=' ,
				ngRequired : '=' ,
				ngDisabled : '=' ,
			},
			link: function($scope, element, attrs) {
				$scope.msg = '';
				$scope.mostraLimite = false;

				if($scope.maxLength != undefined || $scope.maxLength != null) {
					$scope.mostraLimite = true;
					$scope.msgPrim = 'Máximo ' + $scope.maxLength + ' caracteres'
					$scope.MSG = $scope.msgPrim

					$scope.$watch("ngModel", function() {
						if($scope.ngModel != undefined) {
							var qtdDisponiveis = $scope.maxLength - $scope.ngModel.length
							
							if(qtdDisponiveis < 2) {
								$scope.MSG = qtdDisponiveis + ' caractere restante'
							}
							if(qtdDisponiveis > 1) {
								$scope.MSG = qtdDisponiveis + ' caracteres restantes'
							}
							if(qtdDisponiveis == $scope.maxLength) {
								$scope.MSG = $scope.msgPrim
							}
						}
					})
				}
			}
		}
	})
})();