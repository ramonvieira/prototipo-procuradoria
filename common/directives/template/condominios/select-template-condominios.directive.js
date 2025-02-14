(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateCondominios', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/condominios/select-template-condominios.directive.html',
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

    Controller.$inject = ['$scope', 'CondominiosService'];
    function Controller($scope, CondominiosService) {
        var vm = this;
        vm.CondominiosService = CondominiosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({condominio: item});
        }

    }
})();