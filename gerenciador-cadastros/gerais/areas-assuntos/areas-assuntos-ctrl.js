(function() {

		angular.module('app').controller('AreasAssuntosCtrl', AreasAssuntosCtrl);

		AreasAssuntosCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

		function AreasAssuntosCtrl($scope, ModalCad) {

			var vm = $scope;

			vm.adicionar = function(b) {
				abrirPopup({
					isEditing: b
				});
			};

			function abrirPopup(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/gerais/areas-assuntos/areas-modal.html',
					controller: 'AreasModalCtrl as AreasModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
							persistRemove: false
					})
				});
			}

			vm.adicionarAssunto = function(b) {
				abrirPopupAssunto({
					isEditing: b
				});
			};

			function abrirPopupAssunto(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/gerais/areas-assuntos/assunto-modal.html',
					controller: 'AssuntoModalCtrl as AssuntoModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
							persistRemove: false
					})
				});
			}

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
		angular.module('app').controller('AreasModalCtrl', AreasModalCtrl);

		AreasModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

		function AreasModalCtrl($scope, ModalCad, params) {

			var vm = $scope;
			vm.isEditing = params.isEditing;
		}

		angular.module('app').controller('AssuntoModalCtrl', AssuntoModalCtrl);

		AssuntoModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

		function AssuntoModalCtrl($scope, ModalCad, params) {

			var vm = $scope;
			vm.isEditing = params.isEditing;
		}

})();