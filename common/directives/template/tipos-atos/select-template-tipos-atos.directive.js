(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateTiposAtos', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/tipos-atos/select-template-tipos-atos.directive.html',
            scope: {
                ngModel: '=ngModel',
                ngRequired: '=?',
                onSelect: '&',
                enum: '='
            },
            controller: Controller,
            controllerAs: 'vm',
            transclude: true
        };
    }

    Controller.$inject = ['$scope', 'TiposAtosService'];
    function Controller($scope, TiposAtosService) {
        var vm = this;
        vm.TiposAtosService = TiposAtosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({tipoAto: item});
        }
    }
})();