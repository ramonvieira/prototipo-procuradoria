(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateLogradouros', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/logradouros/select-template-logradouros.directive.html',
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

    Controller.$inject = ['$scope', 'LogradouroService'];
    function Controller($scope, LogradourosService) {
        var vm = this;
        vm.LogradourosService = LogradourosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({logradouro: item});
        }

    }
})();