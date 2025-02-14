(function() {

    angular.module('app').controller('TributosCoreConveniosCtrl', TributosCoreConveniosCtrl);

    TributosCoreConveniosCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function TributosCoreConveniosCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.adicionar = function(b) {
            abrirPopup({
                isEditing: b
            });
        };

        function abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/financeiro/convenios/convenios-modal.html',
                controller: 'TributosCoreConveniosModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.simular = function(b) {
            abrirPopupSimulacao({
                isEditing: b
            });
        };

        function abrirPopupSimulacao(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/financeiro/convenios/simulacao-codigo-barras/simulacao-modal.html',
                controller: 'TributosCoreSimulacaoCodigoBarras',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        // Estruturas listagem

        vm.lineHeight = 1;

        vm.setLineHeight = function(height) {
            vm.lineHeight = height;
        }

        vm.coluna1IsVisible = true;
        vm.coluna2IsVisible = true;
        vm.coluna3IsVisible = true;
        vm.coluna4IsVisible = true;
        vm.coluna5IsVisible = true;

        $scope.$watch("viewContentLoaded", function() {
            setTimeout(function() {

                // Evita que checkbox fecha o menu
                var options = [];
                $( '.dropdown-menu a' ).on( 'click', function( event ) {

                   var $target = $( event.currentTarget ),
                       val = $target.attr( 'data-value' ),
                       $inp = $target.find( 'input' ),
                       idx;

                   if ( ( idx = options.indexOf( val ) ) > -1 ) {
                      options.splice( idx, 1 );
                      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
                   } else {
                      options.push( val );
                      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
                   }

                   $( event.target ).blur();
                      
                   return false;
                });

                //Filtros das colunas
                $("#filtroColunas").select2('val', ['1', '2', '3', '4', '5', '6', '7', '8']);

                //Radio button em dropdown menu não fecha o menu
                $( '.dropdown-menu .bth-radio' ).on( 'click', function(e) {
                    e.stopPropagation();
                });

                //Clique em dropdown menu não fecha o menu
                 $( '.dropdown-menu' ).on( 'click', function(e) {
                    e.stopPropagation();
                });

            }, 200);
        });


    }

    //controller da modal
    angular.module('app').controller('TributosCoreConveniosModalCtrl', TributosCoreConveniosModalCtrl);

    TributosCoreConveniosModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function TributosCoreConveniosModalCtrl($scope, ModalCad, params) {

      var vm = $scope;

      vm.formula = function(b) {
          abrirFormula({
              isEditing: b
          });
      };

      function abrirFormula(resolve) {
          ModalCad.open({
              templateUrl: 'configuracoes/formulas/formulas-modal.html',
              controller: 'TributosCoreFormulasModalCtrl',
              scope: $scope,
              resolve: angular.extend(resolve, {
                  persistRemove: false
              })
          });
      }
      
      vm.dados = [
        {id: 1, tipo: 1, descricao: null, tamanho: '4', posInicial: '1', posFinal: '4', preencher: 1, completar: 1, posicao: 1, calcular: 2},
        {id: 2, tipo: 2, descricao: null, tamanho: '5', posInicial: '1', posFinal: '5', preencher: 1, completar: 1, posicao: 1, calcular: 2},
        {id: 3, tipo: 3, descricao: null, tamanho: '3', posInicial: '1', posFinal: '3', preencher: 1, completar: 1, posicao: 1, calcular: 2},
        {id: 4, tipo: 4, descricao: null, tamanho: '8', posInicial: '1', posFinal: '8', preencher: 1, completar: 1, posicao: 1, calcular: 2},
        {id: 5, tipo: 5, descricao: 'DACN', tamanho: '1', posInicial: '1', posFinal: '1', preencher: 1, completar: 2, posicao: null, calcular: 1},
      ];

      vm.conjuntos = [{id: 1}];

      vm.addLinha = function(c, cData1, cData2, cData3) {
          var tamanho = c.length;
          var valor = cData2;
          var operador2 = cData3;

          switch(cData1) {
              case '1':
                  var operador1 = '=';
                  break;
              case '2':
                  var operador1 = '>';
                  break;
              case '3':
                  var operador1 = '>=';
                  break;
              case '4':
                  var operador1 = '<';
                  break;
              case '5':
                  var operador1 = '<=';
                  break;
          }

          switch(cData3) {
              case '1':
                  var operador2 = 'E';
                  break;
              case '2':
                  var operador2 = 'OU';
                  break;
          }

          vm.conjuntos.push({id:tamanho+1, operador: operador1, valor: valor, operador2: operador2});
      }

      vm.removeLinha = function(c) {
          var index = vm.conjuntos.indexOf(c);
          vm.conjuntos.splice(index, 1);
      }

      vm.adicionar = function(b) {
          abrirPopup({
              isEditing: b
          });
      };

      function abrirPopup(resolve) {
          ModalCad.open({
              templateUrl: 'gerenciador-cadastros/financeiro/convenios/parametros-calculo/parametros-calculo-modal.html',
              controller: 'TributosCorConveniosParametrosCalculoModalCtrl',
              scope: $scope,
              resolve: angular.extend(resolve, {
                  persistRemove: false
              })
          });
      }

    }

    //controller da modal
    angular.module('app').controller('TributosCorConveniosParametrosCalculoModalCtrl', TributosCorConveniosParametrosCalculoModalCtrl);

    TributosCorConveniosParametrosCalculoModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function TributosCorConveniosParametrosCalculoModalCtrl($scope, ModalCad, params) {

      $scope.addFormula = function(coluna){
        $scope.draggableObjects.push(
          {
            valorFormula: true,
            nome: 'Nova fórmula',
            width: '210px'
          } 
        ); 

        $scope.formulas.push(
          {
          }
        );

        $rootScope.contFormulas = $rootScope.formulas.length;
      }

      $scope.colunas = [
        {
          nome: 'DACN1',
          tipo: 'valor',
          nomeDeFuncao: ' DACN1 '
        },
        {
          nome: 'DACN2',
          tipo: 'valor',
          nomeDeFuncao: ' DACN2 '
        },
        {
          nome: 'Somatório',
          tipo: 'valor',
          nomeDeFuncao: ' Somatório '
        },
        {
          nome: 'Resto',
          tipo: 'valor',
          nomeDeFuncao: ' Resto '
        },
        {
          nome: 'DACN3',
          tipo: 'valor',
          nomeDeFuncao: ' DACN3 '
        },
        {
          nome: 'DACN4',
          tipo: 'valor',
          nomeDeFuncao: ' DACN4 '
        },
        {
          nome: 'DACN5',
          tipo: 'valor',
          nomeDeFuncao: ' DACN5 '
        },
        {
          nome: 'DACN6',
          tipo: 'valor',
          nomeDeFuncao: ' DACN6 '
        },
        {
          nome: 'Nome',
          tipo: 'texto',
          nomeDeFuncao: ' Nome '
        },
      ];

      $scope.funcoes = [
        {
          nome: ' SE '
        },
        {
          nome: ' E '
        },
        {
          nome: ' OU '
        },
        {
          nome: ' ENTAO '
        },
        {
          nome: ' SENÃO '
        },
        {
          nome: ' SE '
        },
        {
          nome: ' E '
        },
        {
          nome: ' OU '
        },
        {
          nome: ' ENTAO '
        },
        {
          nome: ' SENÃO '
        }
      ];

      $scope.operadores = [
        {
          nome: ' + '
        },
        {
          nome: ' - '
        },
        {
          nome: ' * '
        },
        {
          nome: ' / '
        },
        {
          nome: ' ( '
        },
        {
          nome: ' ) '
        },
        {
          nome: ' ^ '
        },
        {
          nome: ' < '
        },
        {
          nome: ' > '
        },
        {
          nome: ' <= '
        },
        {
          nome: ' >= '
        },
        {
          nome: ' == '
        },
        {
          nome: ' != '
        }
      ];

      $scope.valores = [];

      $scope.addValorFormulaColuna = function(coluna) {
        $scope.valores.push(
          {
            valorFuncao: coluna.nomeDeFuncao
          }
        ) 
        setTimeout(function(){
          $('.contenteditable').focus();
        }, 100);
      }
      $scope.addValorFormulaFuncao = function(funcao) {
        $scope.valores.push(
          {
            valorFuncao: funcao.nome
          }
        )
        setTimeout(function(){
          $('.contenteditable').focus();
        }, 100);
      }
      $scope.addValorFormulaOperador = function(operador) {
        $scope.valores.push(
          {
            valorFuncao: operador.nome
          }
        )
        setTimeout(function(){
          $('.contenteditable').focus();
        }, 100);
      }
    }

    //controller da modal
    angular.module('app').controller('TributosCoreSimulacaoCodigoBarras', TributosCoreSimulacaoCodigoBarras);

    TributosCoreSimulacaoCodigoBarras.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function TributosCoreSimulacaoCodigoBarras($scope, ModalCad, params) {
    }


    //controller da modal
    angular.module('app').controller('TributosCoreFormulasModalCtrl', TributosCoreFormulasModalCtrl);

    TributosCoreFormulasModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function TributosCoreFormulasModalCtrl($scope, ModalCad, params) {
    }

})();