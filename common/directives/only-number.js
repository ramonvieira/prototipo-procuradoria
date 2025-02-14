(function() {

	'use strict';

	angular.module('tributos').directive('onlyNumber', ['$compile',function($compile) {
		return {
			restrict: 'A',
			require: 'ngModel',
			scope: {
				restrict: '@?'
			},
            link: function(scope, element){
                var enabled  = scope.restrict || true;
                if(enabled){
                    element.attr('bf-restrict-number','');
                    $compile(element);
                }
            }
		};
	}]);
})();