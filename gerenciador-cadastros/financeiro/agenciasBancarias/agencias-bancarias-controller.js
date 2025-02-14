(function(){

    angular.module('app').controller('TributosCoreAgenciasBancariasCtrl', TributosCoreAgenciasBancariasCtrl);

    TributosCoreAgenciasBancariasCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function TributosCoreAgenciasBancariasCtrl($scope, ModalCad){

        var vm = $scope;
        
        vm.listagem = [
            {nroBanco: 03, nome: 'Itaú', sigla: 'ITAU', cnpj: '00.000.000/0001-91'}
        ];

        vm.agencias = [
            {nroAgencia: 01, digAgencia: 'Banco do Brasil', nome: 'BSB'}
        ];

         vm.listagem = [
            {nroBanco: 03, nome: 'Itaú', sigla: 'ITAU', cnpj: '00.000.000/0001-91'}
        ];

        vm.agencias = [
            {nroAgencia: 01, digAgencia: 'Banco do Brasil', nome: 'BSB'}
        ];


        function abrirPopup(resolve){
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/financeiro/agenciasBancarias/agencias-bancarias-modal.html',
                controller: 'TributosCoreAgenciasBancariasModalCtrl as TributosCoreAgenciasBancariasModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove : false
                })
            });
        }

         vm.adicionar = function(){
            abrirPopup({ registro: undefined });
        }

    }


    angular.module('app').controller('TributosCoreAgenciasBancariasModalCtrl', TributosCoreAgenciasBancariasModalCtrl);

    TributosCoreAgenciasBancariasModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function TributosCoreAgenciasBancariasModalCtrl($scope, ModalCad){

        var vm = $scope;

    }
})();






