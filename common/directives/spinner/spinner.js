(function() {

	'use strict';

	angular.module('app').directive('spinner', [function() {
		return {
			restrict: 'E',
			require: 'ngModel',
			scope: {
				min: '@?',
				max: '@?',
				ngModel: '=',
				ngFuncao: '&?',
				name: '@?',
				spin: '@?',
				ngDisabled: '@?',
				bfRequired: '@?'
			},
			transclude: true,
			templateUrl: 'common/directives/spinner/spinner.html'
		};
	}]);
})();
