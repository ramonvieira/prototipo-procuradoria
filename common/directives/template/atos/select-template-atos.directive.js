(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateAtos', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/atos/select-template-atos.directive.html',
            scope: {
                ngModel: '=ngModel',
                ngRequired: '=?',
                onSelect: '&',
                restrictNumber: '=?'
            },
            controller: Controller,
            controllerAs: 'vm',
            transclude: true
        };
    }

    Controller.$inject = ['$scope', 'AtosService'];
    function Controller($scope, AtosService) {
        var vm = this;
        vm.AtosService = AtosService;
        vm.onSelect = onSelect;
        function onSelect(item) {
            $scope.onSelect({ato: item});
        }

    }
})();