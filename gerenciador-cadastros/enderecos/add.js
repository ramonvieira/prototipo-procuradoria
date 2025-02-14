(function(){

    'use strict';

    angular.module('app').controller('TributosCoreAdicionarCtrl', TributosCoreAdicionarCtrl);

    TributosCoreAdicionarCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function TributosCoreAdicionarCtrl($scope, ModalCad) {

        var vm = this;
        vm.isCurrentState = $scope.$parent.$parent.$parent.$parent.vm.isCurrentState;
        vm.getCurrentState = $scope.$parent.$parent.$parent.$parent.vm.getCurrentState;
        vm.tabs =  $scope.$parent.$parent.$parent.$parent.vm.tabs;

        $scope.adicionar = _adicionar;

        function _adicionar(){
            $scope.$parent.$parent.adicionar();
        }
    }
})();