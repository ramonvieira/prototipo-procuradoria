(function () {
	angular.module('app')
	.controller('AdvogadosCtrl', ['$scope', 'arrecModal',
		function($scope, arrecModal) {
			var vm = $scope;

			vm.adicionar = function(resolve) {
				arrecModal.open('gerenciador-cadastros/pessoas/advogados/advogados-modal.html', $scope, resolve, 'sm', 'AdvogadosModalCtrl');
			}
		}
	])
	.controller('AdvogadosModalCtrl', ['$scope', 'arrecModal',
		function($scope, arrecModal) {
			var vm = $scope;
		}
	])
})();