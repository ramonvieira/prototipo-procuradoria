(function() {

    'use strict';

    angular.module('arrecadacao.common').directive('countDown', ['$interval',
        function($interval) {
            return {
                restrict: 'E',
                scope: {
                    delay: "@?"
                },
                template: '<span>{{ counter }}</span><data-ng-transclude />',
                transclude: true,
                controller: function($scope, $element) {                    
                    $scope.counter = $scope.delay || 10;
                    var timer = $interval(function(){
                        if($scope.counter > 0){
                            $scope.counter--;
                        } 
                        if($scope.counter == 0){
                            $scope.$emit('countDownEnd');
                            $scope.cancel();
                        } 
                    }, 1000, 0);

                    $scope.cancel = function() {
                        if (angular.isDefined(timer)) {
                            $interval.cancel(timer);
                            timer = undefined;
                        }
                    }

                    $scope.$on('$destroy', $scope.cancel);
                }
            };
        }
    ]);
})();