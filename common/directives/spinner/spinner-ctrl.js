(function() {

	'use strict';

	angular.module('app').directive('spinnerCtrl', ['$compile', function($compile) {
		return {
			restrict: 'A',
			require: 'ngModel',
			priority: 0,
			scope: {
				bfMin: '@?',
				bfMax: '@?',
				ngModel: '=',
				ngFuncao: '&?',
				spin: '@?',
				ngDisabled: '@?',
				bfRequired: '@?'
			},
			link: function(scope, element, attrs, ctrl) {
				element.attr('data-bf-min', scope.bfMin);
				element.attr('data-bf-max', scope.bfMax);
				var ctrls = angular.element('<a href="" data-ng-click="soma()" class="ui-spinner-button ui-spinner-up"><span class="icon-caret-up"></span></a><a href="" data-ng-click="sub()" class="ui-spinner-button ui-spinner-down"><span class="icon-caret-down"></span></a>');
				var el = $compile(ctrls)(scope);
				element.parent().append(ctrls);
				$compile(element);
			},

			controller: function($scope, $element, $attrs) {
				$scope.spin = $scope.spin || 1;
				$scope.bfMin = $scope.bfMin || -999999999999;
				$scope.bfMax = $scope.bfMax || 999999999999;
				$scope.ngDisabled = $scope.ngDisabled == undefined ? false : $scope.ngDisabled == 'true';
				$scope.bfRequired = $scope.bfRequired == undefined ? false : $scope.bfRequired == 'true';
				$scope.ngModel = $scope.ngModel == null ? undefined : $scope.ngModel;

				$scope.soma = function() {
					if ($scope.ngDisabled) return;

					if ($scope.ngModel == undefined){
						$scope.ngModel = parseInt( $scope.bfMin ) - parseInt($scope.spin) ||0;
					}
					$scope.ngModel = parseInt($scope.ngModel);
					if ($scope.ngModel >= $scope.bfMax) {
						return;
					}
					$scope.ngModel = $scope.ngModel + parseInt($scope.spin);
					$scope.$apply();
					($scope.$parent.ngFuncao || function() {})("", $scope.ngModel);
				};

				$scope.sub = function() {
					if ($scope.ngDisabled) return;
					$scope.ngModel = parseInt($scope.ngModel || ($scope.bfMin) || 0);
					if ($scope.ngModel <= $scope.bfMin) {
						return;
					};
					$scope.ngModel = $scope.ngModel - parseInt($scope.spin);
					$scope.$apply();
					($scope.$parent.ngFuncao || function() {})("", $scope.ngModel);
				};

			}
		};
	}]);
})();
