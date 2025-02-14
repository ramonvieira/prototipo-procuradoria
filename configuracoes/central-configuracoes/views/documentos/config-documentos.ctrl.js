(function () {
    angular.module('app')
    .controller('ConfigDocumentosCtrl', ['$scope', 'arrecadacao.common.ModalCad',
        function($scope, ModalCad) {
            var vm = $scope;

            vm.naturezas = [
                { descricao: 'Petição intermediária'                               , numInicial: 1  },
                { descricao: 'Certidão de dívida ativa'                            , numInicial: 44 },
                { descricao: 'Carta para autorização de cancelamento de protestos' , numInicial: 1  },
                { descricao: 'Carta para solicitação de cancelamento de protestos' , numInicial: 1  },
                { descricao: 'Bairros'                                             , numInicial: 1  },
                { descricao: 'Petição inicial'                                     , numInicial: 1  },
                { descricao: 'Guia de pagamento'                                   , numInicial: 1  },
                { descricao: 'Carta para autorização de desistência de protestos'  , numInicial: 1  },
                { descricao: 'Carta para solicitação de desistência de protestos'  , numInicial: 1  },
            ]

            
        }
    ])
})();