(function() {

    'use strict';

    angular.module('arrecadacao.common').directive('sortable', ['arrecadacao.common.GridConfig',
        function(GridConfig) {
            return {
                restrict: 'E',
                requires: ['^tr', '^th'],
                scope: {
                    id: '@',
                    caption: '@?',
                    sortBy: '@',
                    gridConfig: '=?'
                },
                transclude: false,
                template: '<a href data-ng-click="sortChanged(sortBy)">{{ caption }}<i class="{{class}} pull-right"></i></a>',
                controller: function($scope, $rootScope) {
                    function changeIconSortClass (sort) {
                        if ($scope.gridConfig.sortedBy == sort && $scope.gridConfig.sortedInverse) {
                            return 'icon-caret-down';
                        } else if ($scope.gridConfig.sortedBy == sort && !$scope.gridConfig.sortedInverse) {
                            return 'icon-caret-up';
                        } else {
                            return 'icon-sort';
                        }
                    }
                    $scope.class = changeIconSortClass($scope.sortBy);
                    $scope.gridConfig = $scope.gridConfig || GridConfig.configure();
                    $scope.sortChanged = function(sort) {
                        if ($scope.gridConfig != undefined) {
                            if ($scope.gridConfig.sortedBy == sort) {
                                $scope.gridConfig.sortedInverse = !$scope.gridConfig.sortedInverse;
                            } else {
                                $scope.gridConfig.sortedInverse = false;
                            }
                            $scope.gridConfig.sortedBy = sort;
                            $scope.$emit($scope.id ? 'sortChanged-' + $scope.id: 'sortChanged', {
                                sortedBy: $scope.gridConfig.sortedBy,
                                sortedInverse: $scope.gridConfig.sortedInverse
                            });
                        } else {
                            $scope.$emit($scope.id ? 'sortChanged-' + $scope.id: 'sortChanged');
                        }
                        $rootScope.$broadcast('changeClass');
                    };
                    $rootScope.$on('changeClass', function(){
                        $scope.class = changeIconSortClass($scope.sortBy);
                    });
                }
            };
        }
    ]);
})();