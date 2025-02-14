(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplatePessoas', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/contribuintes/select-template-pessoas.directive.html',
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

    Controller.$inject = ['$scope', 'PessoasService'];
    function Controller($scope, PessoasService) {
        var vm = this;
        vm.PessoasService = PessoasService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({pessoa: item});
        }

    }
})();