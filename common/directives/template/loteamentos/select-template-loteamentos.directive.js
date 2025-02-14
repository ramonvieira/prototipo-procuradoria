(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateLoteamentos', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/loteamentos/select-template-loteamentos.directive.html',
            scope: {
                ngModel: '=ngModel',
                ngRequired: '=?',
                onSelect: '&'
            },
            controller: Controller,
            controllerAs: 'vm',
            transclude: true
        };
    }

    Controller.$inject = ['$scope', 'LoteamentosService'];
    function Controller($scope, LoteamentosService) {
        var vm = this;
        vm.LoteamentosService = LoteamentosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({loteamento: item});
        }

    }
})();