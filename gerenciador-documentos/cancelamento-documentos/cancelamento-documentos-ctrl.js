(function() {

    angular.module('app').controller('CancelamentoDocumentoCtrl', CancelamentoDocumentoCtrl);

    CancelamentoDocumentoCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function CancelamentoDocumentoCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.adicionar = function(b) {
            abrirPopup({
                isCancelamento: b
            });
        };

        function abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-documentos/cancelamento-documentos/cancelamento-documentos-modal.html',
                controller: 'CancelamentoDocumentoModalCtrl as CancelamentoDocumentoModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.estornar = function(b) {
            abrirEstorno({
                isEditing: b
            });
        };

        function abrirEstorno(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-documentos/cancelamento-documentos/estornar-modal.html',
                controller: 'EstornoModalCtrl as EstornoModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        $scope.verHistorico = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'gerenciador-documentos/cancelamento-documentos/modal-historico.html',
                controller: 'EstornoModalCtrl as EstornoModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }
    }

    //controller da modal
    angular.module('app').controller('CancelamentoDocumentoModalCtrl', CancelamentoDocumentoModalCtrl);

    CancelamentoDocumentoModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function CancelamentoDocumentoModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
        vm.isCancelamento = params.isCancelamento;
        $scope.openInconsistencia = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'gerenciador-documentos/cancelamento-documentos/alerta-inconsistencia.html',
                controller: 'CancelamentoDocumentoModalCtrl as CancelamentoDocumentoModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        $scope.openCancelamento = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'gerenciador-documentos/cancelamento-documentos/alerta-cancelamento.html',
                controller: 'CancelamentoDocumentoModalCtrl as CancelamentoDocumentoModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }
       
    }

    //controller da modal estorno
    angular.module('app').controller('EstornoModalCtrl', EstornoModalCtrl);

    EstornoModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function EstornoModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
       
    }

})();