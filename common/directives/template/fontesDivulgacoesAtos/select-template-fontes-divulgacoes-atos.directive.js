(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateFontesDivulgacoesAtos', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/fontesDivulgacoesAtos/select-template-fontes-divulgacoes-atos.directive.html',
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

    Controller.$inject = ['$scope', 'FontesDivulgacoesAtosService'];
    function Controller($scope, FontesDivulgacoesAtosService) {
        var vm = this;
        vm.FontesDivulgacoesAtosService = FontesDivulgacoesAtosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({fonteDivulgacoesAtos: item});
        }

    }
})();