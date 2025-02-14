(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateEstados', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/estados/select-template-estados.directive.html',
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

    Controller.$inject = ['$scope', 'EstadosService'];
    function Controller($scope, EstadosService) {
        var vm = this;
        vm.EstadosService = EstadosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({estado: item});
        }

    }
})();