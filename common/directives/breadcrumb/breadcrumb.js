(function()
{

    'use strict';

    angular.module('arrecadacao.common')
        .controller('BreadcrumbCntrl', BreadcrumbCntrl)
        .directive('arrecBreadcrumb',
            function() {
                return {
                    restrict: 'AEC',
                    replace: true,
                    controller: 'BreadcrumbCntrl',
                    templateUrl: 'common/directives/breadcrumb/breadcrumb.html',
                    scope: {
                        route: '@',
                        ngClass: '@'
                    }
                }
            }
        );

    BreadcrumbCntrl.$inject = ['$scope', '$rootScope', '$state'];

    function BreadcrumbCntrl($scope, $rootScope, $state) {
        if (!$scope.ngClass) {
            $scope.ngClass = 'col-md-4';
        }
        _.forEach($rootScope.modulo.menus, function (menu) {
            _.forEach(menu.colunas, function (coluna) {
                _.forEach(coluna.submenu, function (submenu) {
                    if (!submenu) {
                        return;
                    }
                    _.forEach(submenu.subitem, function (subitem) {
                        if ($scope.route) {
                            if (subitem.id != $scope.route) return;
                            $scope.breadcrumb = subitem.breadcrumb;
                        } else {
                            var currentState = $state.current.name.split('.');
                            if (currentState[currentState.length - 1] != subitem.route) return;
                            $scope.breadcrumb = subitem.breadcrumb;
                        }
                    });
                });
            });
        });
    }
})();
