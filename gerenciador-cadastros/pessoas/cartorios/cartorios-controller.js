(function () {

	angular.module('app').controller('CartoriosCtrl', CartoriosCtrl);

	CartoriosCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

	function CartoriosCtrl($scope, ModalCad) {

		var vm = $scope;

		vm.adicionar = function(resolve) {
			abrirPopup('gerenciador-cadastros/pessoas/cartorios/cartorios-modal.html', resolve);
		};

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'CartoriosModalCtrl as CartoriosModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					 persistRemove: false
				})
			});
		}
	}

	//controller da modal
	angular.module('app').controller('CartoriosModalCtrl', CartoriosModalCtrl);

	CartoriosModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function CartoriosModalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.tipo = params.tipo;
	}
})();