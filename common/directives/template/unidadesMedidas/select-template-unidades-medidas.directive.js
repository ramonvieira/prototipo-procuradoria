(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateUnidadesMedidas', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/unidadesMedidas/select-template-unidades-medidas.directive.html',
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

    Controller.$inject = ['$scope', 'UnidadesMedidasService'];
    function Controller($scope, UnidadesMedidasService) {
        var vm = this;
        vm.UnidadesMedidasService = UnidadesMedidasService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({unidadeMedida: item});
        }

    }
})();