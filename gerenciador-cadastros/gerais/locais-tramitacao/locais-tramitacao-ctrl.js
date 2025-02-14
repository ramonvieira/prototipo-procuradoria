(function() {

	angular.module('app').controller('LocaisTramitacaoCtrl', LocaisTramitacaoCtrl);

	LocaisTramitacaoCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

	function LocaisTramitacaoCtrl($scope, ModalCad) {

		var vm = $scope;

		vm.adicionar = function(b) {
			abrirPopup({
				isEditing: b
			});
		};

		function abrirPopup(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/gerais/locais-tramitacao/tribunais-modal.html',
				controller: 'LocaisTramitacaoCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.adicionarVaraCamara = function(i) {
			abrirPopup2({
				isCamara: i
			});
		};

		function abrirPopup2(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/gerais/locais-tramitacao/camara-modal.html',
				controller: 'CamaraVaraModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.adicionarCompetencia = function(i) {
			abrirPopupCompetencia({
				isCamara: i
			});
		};

		function abrirPopupCompetencia(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/gerais/locais-tramitacao/competencia-modal.html',
				controller: 'LocaisTramitacaoCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.adicionarComarca = function(i) {
			abrirPopupComarca({
				isCamara: i
			});
		};

		function abrirPopupComarca(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/gerais/locais-tramitacao/comarca-modal.html',
				controller: 'LocaisTramitacaoCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}



		// Estruturas listagem

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
	angular.module('app').controller('CamaraVaraModalCtrl', CamaraVaraModalCtrl);

	CamaraVaraModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function CamaraVaraModalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.isCamara = params.isCamara;
	}

})();