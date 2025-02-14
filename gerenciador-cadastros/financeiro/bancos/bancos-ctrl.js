(function() {

    angular.module('app').controller('TributosCoreBancosCtrl', TributosCoreBancosCtrl);

    TributosCoreBancosCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function TributosCoreBancosCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.adicionar = function(b) {
            abrirPopup({
                isEditing: b
            });
        };

        vm.open = function(b) {
            abrirPopup({
                isEditing: b
            });
        };

        function abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/financeiro/bancos/bancos-modal.html',
                controller: 'TributosCoreBancosModalCtrl as TributosCoreBancosModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.atos = [
           {id: 1, numero: '42/1999', tipo: 'Portaria', ementa:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias provident pariatur unde voluptate saepe, dolorem deserunt magnam minima sequi ratione sint, animi libero temporibus quas eligendi alias illum maxime iusto.', publicacao:'15/04/1999', vigorar:'15/04/1999'}
        ];

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

    //controller da modal
    angular.module('app').controller('TributosCoreBancosModalCtrl', TributosCoreBancosModalCtrl);

    TributosCoreBancosModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function TributosCoreBancosModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
       
    }

})();