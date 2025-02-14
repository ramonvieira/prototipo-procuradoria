(function() {
    
        angular.module('app').controller('LocaisArquivamentoCtrl', LocaisArquivamentoCtrl);
    
        LocaisArquivamentoCtrl.$inject = ['$scope', 'bfc.dialog.Dialog'];
    
        function LocaisArquivamentoCtrl($scope, ModalCad) {
    
            var vm = $scope;
    
            vm.open = function(edit) {
                ModalCad.open({
                    templateUrl: 'gerenciador-cadastros/locais-arquivamento/locais-arquivamento-cad.html',
                    controller: function($scope){
                        $scope.edit = edit;
                    }
                });
            };
    
    
            // Estruturas listagem
    
            vm.lineHeight = 1;
    
            vm.setLineHeight = function(height) {
                vm.lineHeight = height;
            }
    
            vm.coluna1IsVisible = true;    

            $scope.localGabriela =
            [
                {
                'label': "Desenvolvimento B",
                'tipo': "Prédio",
                'children': [
                    {
                        'label': "Fábrica da Arrecadação",
                        'tipo': "Sala",
                        'children': [
                            {
                                'label':"Nº de patrimônio 45789",
                                'tipo':"Mesa",
                                'children':[]
                            }
                        ]
                    }
                    ]
                }
            ];

            $scope.localRH =
            [
                {
                'label': "Betha Matriz",
                'tipo': "Prédio",
                'children': [
                    {
                        'label': "1°",
                        'tipo': "Andar",
                        'children': [
                            {
                                'label':"N° 4",
                                'tipo':"Sala",
                                'children':[
                                    {
                                        'label':"Contratações",
                                        'tipo':"Arquivo",
                                        'children':[]
                                    }
                                ]
                            }
                        ]
                    }
                    ]
                }
            ];
            
        }

        angular.module('app').controller('LocaisArquivamentoCadCtrl', LocaisArquivamentoCadCtrl);
        
        LocaisArquivamentoCadCtrl.$inject = ['$scope', '$state', 'arrecadacao.common.ModalCad'];
        
        function LocaisArquivamentoCadCtrl($scope, $state, ModalCad) {
    
            var vm = $scope;
    
            vm.localizacao = [{}]
        }
    
    
    
    })();