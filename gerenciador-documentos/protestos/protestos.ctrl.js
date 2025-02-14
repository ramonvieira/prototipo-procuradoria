(function () {

    angular.module('app').controller('DocsProcessosCtrl', DocsProcessosCtrl);

    DocsProcessosCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function DocsProcessosCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.contentCad = 'Naturezas texto jurídico';

        vm.cadSelect = function (resolve) {
            vm.contentCad = resolve.cad;
        }

        function abrirPopup(templateUrl, resolve) {
            ModalCad.open({
                templateUrl: templateUrl,
                controller: 'DocsProcessosModalCtrl as DocsProcessosModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.cadastros = [
            { descricao: 'Guias de pagamento'     , caminho: 'gerenciador-cadastros/gerais/areas-assuntos/areas-assuntos.html'       },
            { descricao: 'Solicitações de cancelamento' , caminho: 'gerenciador-cadastros/gerais/locais-tramitacao/locais-tramitacao.html' },
            { descricao: 'Solicitações de desistência'              , caminho: 'gerenciador-cadastros/gerais/classes/classes.html'                     },
            { descricao: 'Autorizações de cancelamento'              , caminho: 'gerenciador-cadastros/gerais/motivos/motivos.html'                     },
            { descricao: 'Autorizações de desistência'              , caminho: 'gerenciador-cadastros/gerais/motivos/motivos.html'                     },
        ]
    }

    //controller da modal
    angular.module('app').controller('DocsProcessosModalCtrl', DocsProcessosModalCtrl);

    DocsProcessosModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function DocsProcessosModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
        vm.tipo = params.tipo;
    }
})();