(function() {

	angular.module('app')
	.controller('DocsCDACtrl', ['$rootScope', '$scope', 'arrecadacao.common.ModalCad', 'certidoesService', '$timeout',
		function($rootScope, $scope, ModalCad, certidoesService, $timeout) {
			var vm = $scope;
            vm.certidoes        = certidoesService.certidoes

			vm.certidoes.forEach(certidao => {
				// certidao.buscandoSituacao = true
				$timeout(() => {
					// certidao.buscandoSituacao = false
				}, $rootScope.randomInt(2000, 10000))
			})

			vm.situacoesDividasCertidao = certidoesService.situacaoDividasCertidao.filter(situacao => situacao.key != 'SEM_EMITIDA')
		}
	])
})();
