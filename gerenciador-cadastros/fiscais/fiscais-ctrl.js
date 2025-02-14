(function() {

    angular.module('app').controller('FiscaisCtrl', FiscaisCtrl);

    FiscaisCtrl.$inject = ['$scope', 'bfc.dialog.Dialog'];

    function FiscaisCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.open = function(edit, status) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/fiscais/fiscais-modal.html',
                controller: ['$scope', 'bfc.dialog.Dialog', function($scope, ModalCad){
                    $scope.edit = edit;

                    $scope.status = status;

                    function formatResult(state) {
                            if (!state.id) return state.text; // optgroup
                            return "<div class='row resultados-pessoa'><div class='col-md-1'><div class='thumb " + state.pic + "' style='display: inline-block'></div></div><div class='col-md-11'>" + state.nome 
                                  + '<br><small>CPF: ' + state.cpf + ' | DATA DE NASCIMENTO: ' + state.dt + ' | RG: ' + state.rg + '</small></div></div>';
                        }

                    function formatSelection(state) {
                        if (!state.id) return state.text;
                        return (state.status)? state.nome + " <small class='text-muted'>(Desativado)</small>": state.nome;
                    }

                    $scope.configSelect = {
                      data: {
                        results: [
                          {id: 1, pic: 'ezeq', text: 'Ezequiel dos Santos Garcia 02145745854 3355884', nome: 'Ezequiel dos Santos Garcia', cpf: '021.457.458-51', dt: '01/01/1950', rg: '3355884'},
                          {id: 2, pic: '', text: 'Ezequiel dos Santos Garcia 04563251254', nome: 'Ezequiel dos Santos Garcia', cpf: '045.632.512-54', dt: '01/01/1962', rg: '2355884'},
                          {id: 3, pic: 'marc', text: 'Marcelo de Souza Medeiros 123456789', nome: 'Marcelo de Souza Medeiros', cpf: '123.456.789-25', dt: '01/01/1975', rg: '1155884'},
                          {id: 4, pic: 'aldo', text: 'Aldo Garcia 012415685745', nome: 'Aldo Garcia', cpf: '012.415.685-74', dt: '01/01/1970', rg: '6455884'},
                          {id: 5, pic: '', text: 'Marcelo Bitencourt 41254254252', nome: 'Marcelo Bitencourt', cpf: '412.542.542-52', dt: '04/08/1982', rg: '541257'},
                        ]
                      },
                        formatResult: formatResult,
                        formatSelection: formatSelection,
                        minimumInputLength: 3,
                        placeholder: 'Encontre pessoas pelos documentos: CPF, RG, PIS, CNH, etc., ou ainda pelo nome.',
                    }

                    $scope.contribuinte = {
                      telefones: [
                        {
                          descricao: 'Comercial',
                          tipo: '0',
                          numero: '(48) 8820-3030',
                          observacoes: ''
                        },{
                          descricao: 'Celular',
                          tipo: '1',
                          numero: '(48) 8820-3030',
                          observacoes: ''
                        }
                      ]
                    }

                    $scope.addTelefone = function () { 
                      ModalCad.open({
                        templateUrl: 'gerenciador-cadastros/fiscais/telefone.cad.html?uniq' + new Date(),
                        controller: 'TelefoneCadCtrl',
                        resolve : {
                          telefones: function(){
                            return $scope.contribuinte.telefones;
                          }
                        }
                      });
                    };
                }]
            });
        };


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
                $("#filtroColunas").select2('val', ['1', '2', '3', '4', '5', '6']);

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



    angular.module('app').controller('TelefoneCadCtrl', TelefoneCadCtrl);

    TelefoneCadCtrl.$inject = ['$scope', 'bfc.dialog.Dialog', 'telefones'];

    function TelefoneCadCtrl($scope, ModalCad, telefones) {

      $scope.telefones = telefones;

      $scope.getMascaraTelefone = function(){
            if($scope.telefone && $scope.telefone.numero.length <= 10)
              return '(00) 0000-00000';
            return '(00) 00000-0000';
          }

        $scope.save = function(){
          $scope.telefones.push($scope.telefone);
          $scope.telefone = {
          descricao: '',
          tipo: '',
          numero: '',
          observacoes: ''
        };
        $('#descricao').focus();
        }

        $scope.removeTelefone = function (obj){
          $scope.telefones = _.reject($scope.telefones, obj);
          
          if (_.isEqual($scope.telefone, obj)) {
            $scope.telefone = {
              descricao: '',
              tipo: '',
              numero: '',
              observacoes: ''
            };
          }

          $('#descricao').focus();
        }

        $scope.editTelefone = function (obj){
          $scope.telefone = obj;
          $('#descricao').focus();
        }
    }


})();