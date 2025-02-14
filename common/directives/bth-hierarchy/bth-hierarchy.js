(function() {
    'use strict';
    var app = angular.module('app');
    app.directive('bthHierarchy', bthHierarchyDirective);

    function bthHierarchyDirective($compile) {
        return {
            restrict: 'E',

            templateUrl: 'common/directives/bth-hierarchy/bth-hierarchy.html',
            scope: {
                nodes: '='
            },
            controller: bthHierarchyController,
            controllerAs: 'vm'
        };
    }

    bthHierarchyController.$inject = [
        '$compile',
        '$scope',
        '$rootScope',
        '$q',
        '$element'
    ];

    function bthHierarchyController($compile, $scope, $rootScope, $q, $element) {
        var vm = this;
        $scope.level = 0;

        $scope.$on('toggleAllChildren', function (event, args){
            $scope.nodes = changeState($scope.nodes, args[0]);
        })

        function changeState(nodes, state){
            return nodes.map(function(m) {
                m.show = state;
                m.children = changeState(m.children, state);
                return m;
            })
        }
    }

    
})();
