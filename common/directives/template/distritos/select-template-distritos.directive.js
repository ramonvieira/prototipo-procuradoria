(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateDistritos', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/distritos/select-template-distritos.directive.html',
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

    Controller.$inject = ['$scope', 'DistritosService'];
    function Controller($scope, DistritosService) {
        var vm = this;
        vm.DistritosService = DistritosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({distrito: item});
        }

    }
})();