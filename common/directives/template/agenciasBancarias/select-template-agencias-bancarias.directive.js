(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateAgenciasBancarias', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/agenciasBancarias/select-template-agencias-bancarias.directive.html',
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

    Controller.$inject = ['$scope', 'AgenciasBancariasService'];
    function Controller($scope, AgenciasBancariasService) {
        var vm = this;
        vm.AgenciasBancariasService = AgenciasBancariasService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({agenciaBancaria: item});
        }

    }
})();