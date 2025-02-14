(function () {

	angular.module('app')
	.service('referentesService', function($rootScope) {
		$rootScope.serviceDb('referentes')

		return {
			referentes: $rootScope.referentes
		}
	})
	.controller('ReferentesCtrl', ['$scope', 'arrecModal', 'referentesService',
		function($scope, arrecModal, referentesService) {
			var vm = $scope;

			vm.referentes = referentesService.referentes
	
			vm.adicionar = function(resolve) {
				arrecModal.open('gerenciador-cadastros/pessoas/referentes/referentes-modal.html', $scope, resolve, 'sm', 'ReferentesModalCtrl');
			}
		}
	])
	.controller('ReferentesModalCtrl', ['$scope', 'arrecModal', '$modalInstance',
		function($scope, arrecModal, $modalInstance) {
			var vm = $scope;
			console.log($modalInstance.params);
			
			vm.registro = $modalInstance.params
		}
	])
})();