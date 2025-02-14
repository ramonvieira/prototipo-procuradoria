(function() {

	angular.module('app')
	.controller('DocsPeticoesCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'peticoesService', '$state', '$stateParams',
		function($scope, ModalCad, peticoesService, $state, $stateParams) {
			var vm = $scope;
            vm.peticoes = peticoesService.peticoes;
            vm.selectedCount = 0;
            vm.selectAll = false;

            vm.checkAll = function() {
                vm.peticoes.forEach(function(peticao) {
                    peticao.selected = vm.selectAll;
                });
                vm.selectedCount = vm.selectAll ? vm.peticoes.length : 0;
            };

            vm.updateSelectedCount = function() {
                vm.selectedCount = vm.peticoes.filter(function(peticao) {
                    return peticao.selected;
                }).length;
            };

			vm.tipo = $state.current.url.split('-')[1]

			vm.executar = function(resolve) {
				abrirPopup("gerenciador-execucoes/execucoes/modal-executar.html", resolve);
			};

			vm.assinar = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas//modal-assinar.html", resolve);
			};

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'dividasAtivasModalCtrl as dividasAtivasModalCtrl',
					scope: $scope,
					resolve: resolve
				});
			}
		}
	])
})();