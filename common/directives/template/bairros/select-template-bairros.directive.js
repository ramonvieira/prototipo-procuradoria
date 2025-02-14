(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateBairros', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/bairros/select-template-bairros.directive.html',
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

    Controller.$inject = ['$scope', 'BairrosService'];
    function Controller($scope, BairrosService) {
        var vm = this;
        vm.BairrosService = BairrosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({bairro: item});
        }

    }
})();