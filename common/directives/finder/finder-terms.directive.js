(function() {

    angular.module('arrecadacao.common')
        .directive('finderTerms', ['$timeout', 'arrecadacao.common.ModalCad',
            function($timeout, ModalCad) {
                return {
                    restrict: 'AEC',
                    transclude: true,
                    templateUrl: 'common/directives/finder/finder-terms.html',
                    scope: {
                        id: '@',
                        fields: '=?'
                    },
                    controller: function($scope, $rootScope, $element, $attrs) {
                        $scope.columns = [];

                        $scope.remove = function (list, item, index) {
                            $scope.filters[list].splice(index, 1);
                            $rootScope.$broadcast($scope.id ? 'removerTermo-' + $scope.id : 'removerTermo', {index: index, termo: item, list: list, idFinder: $scope.id});
                        };

                        $scope.$on($scope.id ? 'termosChanged-' +$scope.id : 'termosChanged', function(event, args) {
                            $scope.filters = angular.copy(args);
                        });

                        $scope.$watch('fields', function(newValue) {
                            $scope.columns = newValue;
                        });

                        $scope.$on('columnsDescription', function (event, args) {
                            if ($scope.fields) {
                                return;
                            }
                            $scope.columns = args;
                        });

                        $scope.getObject = function (list, id) {
                            return _.findWhere(list, {id: id});
                        };

                        $scope.adicionarPopupPesquisas = function() {
                            abrirPopupPesquisas({
                                registro:  $scope.filters,
                                defaultValues: $scope.id
                            });
                        };

                        $scope.limparPesquisa = function () {
                            $rootScope.$broadcast($scope.id ? 'clearFilters-' + $scope.id : 'clearFilters');
                        };

                        function abrirPopupPesquisas(resolve) {
                            ModalCad.open({
                                templateUrl: 'common/directives/finder/finder-modal.html',
                                controller: 'arrecadacao.common.SalvarPesquisaModalCtrl as vm',
                                scope: $scope,
                                resolve: angular.extend(resolve)
                            });
                        }
                    }
                };
            }
        ]);
})();