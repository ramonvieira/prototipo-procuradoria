(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateNaturezasTextoJurAtos', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/naturezasTextoJurAtos/select-template-naturezas-texto-jur-atos.directive.html',
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

    Controller.$inject = ['$scope', 'NaturezasTextoJurAtosService'];
    function Controller($scope, NaturezasTextoJurAtosService) {
        var vm = this;
        vm.NaturezasTextoJurAtosService = NaturezasTextoJurAtosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({naturezaTextoJurAtos: item});
        }

    }
})();