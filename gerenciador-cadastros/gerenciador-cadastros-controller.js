(function() {

	angular.module('app').controller('GerenciadorCadastrosCtrl', GerenciadorCadastrosCtrl);

	GerenciadorCadastrosCtrl.$inject = ['$scope', '$state', 'arrecadacao.common.ModalCad'];

	function GerenciadorCadastrosCtrl($scope, $state, ModalCad) {

		var vm = $scope;
		
		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'modalCtrl as modalCtrl',
				scope: $scope,
				resolve: resolve
			});
		}
	}

	//controller da modal
	angular.module('app').controller('modalCtrl', modalCtrl);

	modalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function modalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.filtraDivida = params.filtraDivida;
		vm.agruparDiv = params.agruparDiv;
		vm.descricao = params.descricao;
		vm.consult = params.consult;
		vm.certidao = params.certidao;
		vm.execucao = params.execucao;
	}

})();