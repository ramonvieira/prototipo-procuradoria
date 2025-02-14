(function () {
    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplateMunicipios', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/municipios/select-template-municipios.directive.html',
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

    Controller.$inject = ['$scope', 'MunicipiosService'];
    function Controller($scope, MunicipiosService) {
        var vm = this;
        vm.MunicipiosService = MunicipiosService;
        vm.onSelect = onSelect;

        function onSelect(item) {
            $scope.onSelect({municipio: item});
        }

    }
})();