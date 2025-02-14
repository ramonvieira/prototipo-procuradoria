(function () {

    'use strict';

    angular.module('arrecadacao.common')
        .controller('arrecadacao.common.SalvarPesquisaModalCtrl', Controller);

    Controller.$inject = ['$scope', '$rootScope', '$injector', 'params', '$modalInstance']

    function Controller($scope, $rootScope, $injector, params, $modalInstance) {
        var vm = this;
        var promiseTracker = $injector.get('promiseTracker');
        // var PesquisaAvancadaService = $injector.get('arrecadacao.common.PesquisaAvancadaService');
        var parcelamentosComposicoes = angular.copy(params.registro);
        
        vm.registro = angular.copy(params.registro);
        vm.tracker = {
            salvandoRegistro: promiseTracker()
        } 

        vm.salvar = _salvar;

        function _init() {
            vm.isEditando = angular.isDefined(vm.registro.id);
            vm.registro.cadastro = params.defaultValues;
            if (vm.registro.others && vm.registro.others.length) {
                vm.registro.others = [];
                _.forEach(params.registro.others, function(other) {
                    vm.registro.others.push(JSON.stringify(other));
                })
            }
        }

        _init();

        function _salvar(post) {
            var registro = angular.copy(post);
            // var promise = PesquisaAvancadaService.save(registro).then(function (data) {
            //     if (data.others && data.others.length) {
            //         var others = angular.copy(data.others)
            //         data.others = [];
            //         _.forEach(others, function(other) {
            //             data.others.push(JSON.parse(other)); 
            //         });
            //     }
            //     if (vm.isEditando) {
            //         $rootScope.$broadcast('filter-edited');
            //     } else {
            //         $rootScope.$broadcast('filter-saved', data);
            //     }
            //     $modalInstance.close();
            // });
            // vm.tracker.salvandoRegistro.addPromise(promise);
        }
    }
})();
