(function () {

    angular.module('app').controller('CadGeraisCtrl', CadGeraisCtrl);

    CadGeraisCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function CadGeraisCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.contentCad = 'Naturezas texto jurídico';

        vm.cadSelect = function (resolve) {
            vm.contentCad = resolve.cad;
        }

        vm.adicionar = function (resolve) {
            // abrirPopup('CadGerais/documentos/entrega-documentos/entrega-documentos-modal.html', resolve);
        };

        function abrirPopup(templateUrl, resolve) {
            ModalCad.open({
                templateUrl: templateUrl,
                controller: 'CadGeraisModalCtrl as CadGeraisModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.cadastros = [
            { descricao: 'Áreas e assuntos'     , sref: 'main.gerenciadorCadastros.gerais.areasAssuntos'    },
            { descricao: 'Locais de tramitação' , sref: 'main.gerenciadorCadastros.gerais.locaisTramitacao' },
            { descricao: 'Classes'              , sref: 'main.gerenciadorCadastros.gerais.classes'          },
            { descricao: 'Motivos'              , sref: 'main.gerenciadorCadastros.gerais.motivos'          },
            { descricao: 'Modelos de petições'  , sref: 'main.gerenciadorCadastros.gerais.modelosPeticoes'  },
            { descricao: 'Categoria de bens'    , sref: 'main.gerenciadorCadastros.gerais.categoriaBens'    },
        ]
    }

    //controller da modal
    angular.module('app').controller('CadGeraisModalCtrl', CadGeraisModalCtrl);

    CadGeraisModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function CadGeraisModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
        vm.tipo = params.tipo;
    }
})();