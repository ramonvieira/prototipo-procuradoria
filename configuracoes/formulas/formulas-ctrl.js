(function() {

    angular.module('app').controller('FormulasCtrl', FormulasCtrl);

    FormulasCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function FormulasCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.$watch("viewContentLoaded", function() {
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

        vm.formulas = [
            {tipo: 'Cálculo imobiliário', detalhes: '2016 - Imposto Predial e Territorial Urbano', situacao: 'ativa', antecipacao: false},
            {tipo: 'Acréscimos', detalhes: 'Juros de financiamento', situacao: 'ativa', antecipacao: false},
            {tipo: 'Acréscimos', detalhes: 'Juros morátorios', situacao: 'inativa', antecipacao: false},
            {tipo: 'Acréscimos', detalhes: 'Juros de parcelamento', situacao: 'ativa', calculoAcrescimo: true, antecipacao: true},
            {tipo: 'Acréscimos', detalhes: 'Correção pré-fixada', situacao: 'ativa', calculoAcrescimo: false, antecipacao: true},
            {tipo: 'Acréscimos', detalhes: 'Juros de parcelamento', situacao: 'ativa', calculoAcrescimo: true, antecipacao: true, edit: true},
            {tipo: 'Requerimento da manutenção de cálculo', detalhes: 'Isenção religiosa', situacao: 'ativa', antecipacao: false},
            {tipo: 'Validação cadastral', detalhes: 'Econômicos', situacao: 'ativa', antecipacao: false},
            {tipo: 'ITBI', detalhes: 'Valores', situacao: 'ativa', antecipacao: false},
            {tipo: 'Baixa de arquivo', detalhes: 'Validação do arquivo - Validação de teste', situacao: 'ativa', antecipacao: false},
            {tipo: 'Manutenção de dívida ativa', detalhes: 'Lei 1234567 - Descrição da fórmula de cálculo', antecipacao: false},
        ];

        vm.adicionar = function(situacao) {
            abrirPopup({
              isEditing: situacao
            });
        };

        function abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'configuracoes/formulas/formulas-modal.html',
                controller: 'FormulasModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        // vm.addAnexo = function() {
        //     abrirPopupAnexo({
                
        //     });
        // };

        // function abrirPopupAnexo(resolve) {
        //     ModalCad.open({
        //         templateUrl: 'cadastros/manutencao-calculo/anexos/anexos-modal.html',
        //         controller: 'ManutencaoCalculoAnexoModalCtrl as ManutencaoCalculoAnexoModalCtrl',
        //         scope: $scope,
        //         resolve: angular.extend(resolve, {
        //             persistRemove: false
        //         })
        //     });
        // }

        // vm.addMovimentacoes = function() {
        //     abrirPopupMovimentacoes({
                
        //     });
        // };

        // function abrirPopupMovimentacoes(resolve) {
        //     ModalCad.open({
        //         templateUrl: 'cadastros/manutencao-calculo/historico/historico-movimentacoes.html',
        //         controller: 'ManutencaoCalculoMovimentacoesModalCtrl',
        //         scope: $scope,
        //         resolve: angular.extend(resolve, {
        //             persistRemove: false
        //         })
        //     });
        // }


    }

    //controller da modal
    angular.module('app').controller('FormulasModalCtrl', FormulasModalCtrl);

    FormulasModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function FormulasModalCtrl($scope, ModalCad, params) {

      var vm = $scope;

      vm.isEditing = params.isEditing;

      vm.abas = [
            {id: 0, descricao: 'Definir configurações', ativa: true, realizada: false},
            {id: 1, descricao: 'Criar script', ativa: false, realizada: false}
        ];

        vm.avancarAba = function() {
            vm.abas[0].realizada = true;
            vm.abas[0].ativa = false;
            vm.abas[1].ativa = true;
        }

        vm.voltarAba = function() {
            vm.abas[0].realizada = false;
            vm.abas[0].ativa = true;
            vm.abas[1].ativa = false;
        }
    }
})();