(function () {

    angular.module('app').controller('FinanceiroCtrl', FinanceiroCtrl);

    FinanceiroCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function FinanceiroCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.contentCad = 'Agências bancárias';

        vm.cadSelect = function (resolve) {
            vm.contentCad = resolve.cad;
        }

        vm.adicionar = function (resolve) {
            // abrirPopup('Financeiro/documentos/entrega-documentos/entrega-documentos-modal.html', resolve);
        };

        function abrirPopup(templateUrl, resolve) {
            ModalCad.open({
                templateUrl: templateUrl,
                controller: 'FinanceiroModalCtrl as FinanceiroModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.cadastros = [
            { descricao: 'Agências bancárias'        , sref: 'main.gerenciadorCadastros.financeiro.agencias-bancarias' },
            { descricao: 'Bancos'                    , sref: 'main.gerenciadorCadastros.financeiro.bancos'             },
            { descricao: 'Convênios'                 , sref: 'main.gerenciadorCadastros.financeiro.convenios'          },
        ]
    }

    //controller da modal
    angular.module('app').controller('FinanceiroModalCtrl', FinanceiroModalCtrl);

    FinanceiroModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function FinanceiroModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
        vm.tipo = params.tipo;
    }
})();