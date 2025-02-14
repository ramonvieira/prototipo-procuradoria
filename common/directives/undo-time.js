(function() {

    'use strict';

    angular.module('arrecadacao.common').directive('undoTime', ['$interval', '$injector',
        function($interval, $injector) {
            return {
                restrict: 'E',
                template: '<data-count-down delay="{{delay}}"></data-count-down><data-ng-transclude />',
                transclude: true,
                controller: function($scope, $element) {                    
                    $scope.delay = ($injector.get('UNDO_TIMEOUT') / 1000);
                }
            };
        }
    ]);
})();