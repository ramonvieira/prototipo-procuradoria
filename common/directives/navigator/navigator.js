(function () {

    'use strict';

    angular.module('arrecadacao.common').directive('navigator', ['$rootScope', '$timeout', 'arrecadacao.common.GridConfig',
        function ($rootScope, $timeout, GridConfig) {
            return {
                restrict: 'AE',
                templateUrl: 'common/directives/navigator/navigator.html',
                priority: 0,
                scope: {
                    id: '@',
                    gridConfig: '=?',
                    next: '&?',
                    previous: '&?',
                    numberOfResults: '&?',
                    loadingTracker: '=',
                    pageChanged: '&?',
                    class: '@?',
                    isInterna: '=',
                    hideResultSelection: '=',
                    count: '='
                },
                controller: function ($scope, $element, $attrs) {
                    $scope.gridConfig = $scope.gridConfig || GridConfig.configure();
                    $scope.isFirstPage = true;
                    $scope.isLastPage = false;
                    $scope.isLoading = false;
                    $scope.fim = 0;
                    $scope.optionsItemsPerPage = [20, 50, 100];
                    $scope.inicio = 0;
                    $scope.currentPage = Math.ceil(($scope.gridConfig.offset + 1) / $scope.gridConfig.limit);

                    $scope.$on('totalRegistros' + ($scope.isInterna ? '-' + $scope.id : ''), function (event, totalRegistros) {
                        $scope.totalRegistros = totalRegistros;
                        if ($scope.fim == 0) {
                            $scope.fim = $scope.totalRegistros > parseInt($scope.gridConfig.limit) ? $scope.inicio + parseInt($scope.gridConfig.limit) : $scope.totalRegistros;
                        }
                    });

                    $scope.getFim = function () {
                        if ($scope.gridConfig.limit * $scope.currentPage > $scope.totalRegistros) {
                            return $scope.totalRegistros;
                        }
                        return $scope.gridConfig.limit * $scope.currentPage;
                    };

                    $scope.lastReg = $scope.getFim();

                    var activeTracker = function () {
                        if ($scope.loadingTracker) {
                            var baseAddPromise = $scope.loadingTracker.addPromise;
                            $scope.loadingTracker.addPromise = function (promise) {
                                promise.then(function (data) {
                                    var maxPages = 4;
                                    $scope.isLastPage = data.hasNext == false;
                                    $scope.gridConfig.offset = data.offset;
                                    $scope.isFirstPage = $scope.gridConfig.offset == 0;
                                    $scope.currentPage = Math.ceil(($scope.gridConfig.offset + 1) / $scope.gridConfig.limit);
                                    $scope.totalRegistros = data.totalRegistros | $scope.count;
                                    var totalPages = Math.ceil($scope.totalRegistros / $scope.gridConfig.limit);
                                    $scope.totalPages = [0,0,0,0];
                                    $scope.lastReg = $scope.getFim();
                                    var page = 0;
                                    for (var index = $scope.totalPages.length - 1; index >= 0; index--) {
                                        if ($scope.currentPage >= $scope.totalPages.length) {
                                            if ($scope.currentPage == totalPages) {
                                                $scope.totalPages[index] = $scope.currentPage - page;
                                            } else {
                                                $scope.totalPages[index] = ($scope.currentPage - page) + 1;
                                            }
                                        } else {
                                            $scope.totalPages[index] = index + 1;
                                        }
                                        page++;
                                    }
                                    $scope.isLoading = false;
                                }, function () {
                                    $scope.isLoading = false;
                                });

                                baseAddPromise(promise);
                            };
                        }
                    };

                    activeTracker();

                    $scope.$watch('loadingTracker', function (newValue, oldValue) {
                        activeTracker();
                    });

                    $rootScope.$on('finderChanged', function () {
                        $scope.gridConfig.offset = 0;
                    });

                    $rootScope.$on('sortChanged', function () {
                        $scope.gridConfig.offset = 0;
                    });

                    $scope.getPaginationClass = function () {
                        if ($scope.class != undefined) {
                            var cssCls = {};
                            cssCls[$scope.class] = true;
                            return cssCls;
                        }
                        return {'pagination pull-right': true};
                    };

                    $scope.firePageChanged = angular.isUndefined($attrs.pageChanged)
                        ? function () { $scope.$emit($scope.id ? 'pageChanged-' + $scope.id : 'pageChanged'); }
                        : $scope.pageChanged;

                    $scope.next = angular.isUndefined($attrs.next)
                        ? function () {
                        if ($scope.isLastPage || $scope.isLoading) {
                            return;
                        }
                        var currentOffset = $scope.gridConfig.offset || 0;
                        $scope.isFirstPage = false;
                        $scope.gridConfig.offset = currentOffset + parseInt($scope.gridConfig.limit);
                        $scope.isLoading = true;
                        navegacao('NEXT');
                    }
                        : $scope.next;

                    $scope.setPage = angular.isUndefined($attrs.setPage)
                        ? function (page) {
                        if (page == $scope.currentPage) {
                            return;
                        }
                        var currentOffset = $scope.gridConfig.offset || 0;
                        $scope.currentPage = page;
                        $scope.isFirstPage = page == 1;
                        $scope.gridConfig.offset = ($scope.isFirstPage) ? 0 : (page - 1) * parseInt($scope.gridConfig.limit);
                        $scope.isLoading = true;
                        $scope.firePageChanged();
                        $scope.inicio = $scope.gridConfig.offset <= 0 ? 0 : $scope.gridConfig.offset;
                    } : $scope.setPage;

                    $scope.previous = angular.isUndefined($attrs.previous)
                        ? function () {
                        if ($scope.isLoading) return;

                        var currentOffset = $scope.gridConfig.offset || 0;
                        if (currentOffset > 0) {
                            $scope.gridConfig.offset = currentOffset - parseInt($scope.gridConfig.limit);
                            $scope.isLoading = true;
                        }

                        if ($scope.gridConfig.offset == 0) {
                            $scope.isFirstPage = true;
                        }
                        navegacao('PREVIOUS');

                    }
                        : $scope.previous;

                    $scope.numberOfResults = function () {
                        $scope.gridConfig.offset = 0;
                        navegacao();
                    };

                    function navegacao(tipo) {
                        var currentOffset = $scope.gridConfig.offset || 0;
                        $scope.inicio = currentOffset <= 0 ? 0 : currentOffset;
                        $scope.gridConfig.offset = $scope.inicio;
                        $scope.limit = parseInt($scope.gridConfig.limit);
                        if (tipo == 'PREVIOUS') {
                            $scope.fim = $scope.inicio + $scope.limit;
                        } else if (tipo == 'NEXT') {
                            $scope.fim = $scope.totalRegistros <= $scope.inicio + $scope.limit ? $scope.totalRegistros : $scope.inicio + $scope.limit;
                        } else {
                            $scope.fim = $scope.totalRegistros > $scope.limit ? $scope.inicio + $scope.limit : $scope.totalRegistros;
                        }
                        $scope.firePageChanged();
                    }
                }
            }
        }
    ]);
})();