(function(){

    'use strict';

    angular.module('app').controller('CondominiosComplementosCtrl', CondominiosComplementosCtrl);

    CondominiosComplementosCtrl.$inject = ['arrecadacao.common.GridConfig','$scope', 'CondominiosComplementosService','CondominiosService' ,'arrecadacao.common.ModalCad', 'bfc.Notification', 'promiseTracker', '$timeout', 'UNDO_TIMEOUT'];

    function CondominiosComplementosCtrl(GridConfig, $scope, CondominiosComplementosService, CondominiosService, ModalCad, Notification, promiseTracker, $timeout, UNDO_TIMEOUT){

        var vm = $scope;
        vm.listagem = [];
        vm.gridConfig = GridConfig.configure({ sortedBy:'id' });
        vm.tracker = {};
        vm.tracker.carregandoRegistros = promiseTracker();

        $scope.$on('sortChanged', function(){ vm.carregar(); });
        $scope.$on('finderChanged', function(){ vm.carregar(); });
        $scope.$on('pageChanged', function() { vm.carregar(); });
        $scope.$on('recordSaved', function() { vm.carregar(); });
        $scope.$on('recordRemoved', function() { vm.carregar(); });

        vm.adicionar = function(){
            abrirPopup({ registro: undefined });
        }

        vm.editar = function(registro){
            CondominiosService.getById(registro.id).then(function(data){
                abrirPopup({ registro: data });    
            });
        };

        // vm.editar = function(registro){
        //     CondominiosService.getById(registro.id).then(function(data){
        //         CondominiosComplementosService.getById(registro.id).then(function(dataChild){
        //             abrirPopup({
        //                             registro: angular.extend(data, {CondominiosComplementos : dataChild})
        //                         });
        //         });
        //     });
        // }

        vm.remover = function(registro){
            registro.removido = true;
            registro.stop = $timeout(function(){
                removerRegistro(registro);
            }, UNDO_TIMEOUT);
        }

        vm.cancelarRemover = function(registro){
            delete registro.removido;
            $timeout.cancel(registro.stop);
            delete registro.stop;
        }

        vm.carregar = function(){
            var promise = carregarRegistros();
            vm.tracker.carregandoRegistros.addPromise(promise);
            return promise;
        }

        function carregarRegistros() {
            var promise = CondominiosComplementosService.findBy(vm.gridConfig.buildFilter());
            promise.then(function(data){
                vm.listagem = data.data;
            });
            return promise;
        }

        function removerRegistro(registro){
            CondominiosComplementosService.remove(registro).then(function(){
                carregarRegistros().then(function(){
                    Notification.publish('Registro removido com sucesso', 'success');
                });
            }, function(){
                vm.cancelarRemover(registro);
            });
        }

        function abrirPopup(resolve){
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/enderecos/condominios/modal-condominios.html',
                controller: 'CondominiosModalCtrl as CondominiosModalCtrl',
                scope: $scope,
                resolve: angular.copy(resolve)
            });
        }

        $timeout(function(){ vm.carregar(); }, 50);
    }


    angular.module('app').controller('CondominiosModalCtrl', CondominiosModalCtrl);

    CondominiosModalCtrl.$inject = ['arrecadacao.common.ContribuintesSelect', 'arrecadacao.common.LogradouroSelect','arrecadacao.common.BairrosSelect','$scope', 'bfc.Focus', 'CondominiosComplementosService', 'bfc.Notification', 'promiseTracker', '$q', 'UNDO_TIMEOUT', '$modalInstance', 'params','$timeout', 'ENUMS'];

    function CondominiosModalCtrl(ContribuintesSelect, LogradouroSelect, BairrosSelect, $scope, Focus, CondominiosComplementosService, Notification, promiseTracker, $q, UNDO_TIMEOUT, $modalInstance, params, $timeout, ENUMS){

        var vm = $scope;
        vm.registro =  params.registro || angular.extend({}, params.defaultValues);
        vm.editando = params.registro != undefined ? true : false;
        vm.tracker = {};
        vm.tracker.salvandoRegistro = promiseTracker();

        vm.tipoCondominios = ENUMS.TIPO_CONDOMINIO;
        vm.LogradourosSelectConfig = LogradouroSelect.select2Config();
        vm.BairrosSelectConfig = BairrosSelect.select2Config();
        vm.ContribuinteSelectConfig = ContribuintesSelect.select2Config();

        if (vm.registro.condominiosComplementos != undefined) {
            vm.camposAdicionais = vm.registro.condominiosComplementos.condominiosInformacoesAdicionais;
        }

        vm.remover = function(){
            var promise = CondominiosComplementosService.remove(vm.registro).then(function(data) {
                Notification.publish('Registro removido com sucesso', 'success');
                $scope.$emit('recordRemoved', { registro: vm.registro });
                $modalInstance.close();
            });
            vm.tracker.salvandoRegistro.addPromise(promise);
        };

        vm.salvar = function(continuarCadastro) {
            continuarCadastro = continuarCadastro || false;

            
            vm.registro.condominiosComplementos.iCondominio = vm.registro.id;

            var promiseSave = CondominiosComplementosService.save(vm.registro.condominiosComplementos).then(function(data) {
                if (params.selectSetFn!=undefined && angular.isFunction(selectSetFn.fnCad)) {
                        params.selectSetFn(data);
                }
                if(!continuarCadastro){
                    $modalInstance.close(vm.record);
                }
                else {
                    vm.registro = {};
                    $scope.form.$setPristine();
                }

                Notification.publish('Registro salvo com sucesso', 'success');
                $scope.$emit('recordSaved');
            });

            vm.tracker.salvandoRegistro.addPromise(promiseSave);
        };
    }
})();






