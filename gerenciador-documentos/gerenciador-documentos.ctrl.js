(function () {
	angular.module('app')
	.directive('alertaMovimentacao', function() {
		return {
			restrict: 'E',
			template: `
				<div class="alert alert-info bottom">
					As CDAs que se encontram nas situações de <strong>parcelada</strong>,
					<strong>quitada</strong><span ng-if="tipoEmissao == 'EXECUTAR'">, <strong>com petição</strong> ou <strong>executada</strong></span>
					<span ng-if="tipoEmissao == 'PROTESTAR'">ou <strong>protestada</strong></span>
					não serão {{TIPO_EMISSAO}}
				</div>
			`,
			scope: {
				ngModel   : '=' ,
				ngDisabled: '=' ,
				tipoEmissao : '@',
			},
			replace: true,
			controller: function($scope) {
				$scope.TIPO_EMISSAO = ''

				switch($scope.tipoEmissao) {
					case 'EXECUTAR':
							$scope.TIPO_EMISSAO = 'peticionadas';
							break;
					case 'PROTESTAR':
							$scope.TIPO_EMISSAO = 'protestadas';
							break;
					case 'ENVIO_TRIBUNAL':
							$scope.TIPO_EMISSAO = 'enviadas ao tribunal';
							break;
			}
			},
		}
	})
	.controller('GerenciadorDocumentosCtrl', ['$scope', 'arrecadacao.common.ModalCad', '$state', 'ENUMS',
		function($scope, ModalCad, $state, ENUMS) {
			var vm = $scope;

			vm.cancelarDocumento = function(resolve) {
				abrirPopup('gerenciador-documentos/cancelamento-documentos/alerta-cancelamento.html', resolve)
			};
			
			vm.cancelamentoDocumento = function(resolve) {
				abrirPopup('gerenciador-documentos/cancelamento-documentos/cancelamento-documentos-modal.html', resolve);
			};
			vm.anexos = function(resolve) {
				abrirPopup('gerenciador-documentos/processos/anexos-modal.html', resolve);
			};

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'GerenciadorDocumentosModalCtrl as GerenciadorDocumentosModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])
	.controller('GerenciadorDocumentosModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params',
		function($scope, ModalCad, params) {
			var vm = $scope;
		}
	])
})();