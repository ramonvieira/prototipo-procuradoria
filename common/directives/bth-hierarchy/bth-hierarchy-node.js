(function() {
    'use strict';
    var app = angular.module('app');
    app.directive('bthHierarchyNode', bthHierarchyNodeDirective);

    function bthHierarchyNodeDirective($compile) {
        return {
            restrict: 'A',

            templateUrl: 'common/directives/bth-hierarchy/bth-hierarchy-node.html',
            scope: {
                node: '=',
                level: '='
            },
            controller: bthHierarchyNodeController,
            controllerAs: 'vm'
        };
    }

    bthHierarchyNodeController.$inject = [
        '$compile',
        '$scope',
        '$rootScope',
        '$q',
        '$element',
        '$log',
        '$timeout',
        'bfc.dialog.Dialog'
    ];

    function bthHierarchyNodeController($compile, $scope, $rootScope, $q, $element, $log, $timeout, Dialog) {
        var vm = this;

        function init() {
            $scope.level++;
            if ($scope.node.children.length) {
                $element
                    .find('.bth-hierarchy__container-children')
                    .append('<div bth-hierarchy-node ' +
                        'class="bth-hierarchy-row"' +
                        'node="n"' +
                        'level="level"' +
                        'ng-repeat="n in node.children track by $index">' +
                        '</div>');

                $compile($element
                            .find('.bth-hierarchy__container-children')
                            .contents())($scope);

            }

        }

        init();
        vm.toggleChildren = function(node) {
            node.show = !node.show;
        }

        vm.toggleAllChildren = function(node) {
            $scope.$emit('toggleAllChildren', [!node.show]);
            vm.toggleChildren(node);
        }

        vm.hasChildren = function(obj) {
            return Boolean(obj.children.length)
        }

        vm.childrenIsVisible = function(node) {
            if (vm.hasChildren(node))
                return node.show ? 'fa-angle-down' : 'fa-angle-right';

        }

    }
})();
