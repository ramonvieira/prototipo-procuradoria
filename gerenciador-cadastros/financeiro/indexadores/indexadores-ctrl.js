(function () {

	angular.module('app')
	.service('IndexadoresService', function ($rootScope,  db) {
		$rootScope.serviceDb('indexadores')
		
		$rootScope.indexadores.forEach((indexador, index) => {
			indexador.movimentacoes.forEach(movi => {
				movi.data = moment().add(movi.data, 'days').format("YYYY-MM-DD")
			})
		})

		return {
			indexadores: $rootScope.indexadores
		}
	})
	.filter('indexadores', function($filter, IndexadoresService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'indexadores', selector ? selector : 'sigla')
		}
	})
	.controller('IndexadoresCtrl', ['$rootScope', '$scope', 'arrecModal', 'IndexadoresService', 'db',
		function($rootScope, $scope, arrecModal, IndexadoresService, db) {

			var vm = $scope;

			vm.adicionar = function (resolve) {
				arrecModal.open('cadastros/financeiro/indexadores/indexadores-modal.html', $scope, resolve, '', 'IndexadoresModalCtrl')
			};

			vm.excluir = function (resolve) {
				db.delete('indexadores', resolve);
			};
			
			vm.indexadores = $rootScope.indexadores

			vm.getLastMov = function(movimentacoes) {
				function compararPorData(a, b) {
					if (a.data < b.data) {
						return 1;
					}
					if (a.data > b.data) {
						return -1;
					}
					return 0;
				}
				return movimentacoes.sort(compararPorData)[0];
			}
		}
	])
	.controller('IndexadoresModalCtrl', ['$scope', '$modalInstance', 'db', 'IndexadoresService',
		function($scope, $modalInstance, db, IndexadoresService) {
			var vm = $scope;
			vm.isEditing = $modalInstance.params.id != undefined ? true : false;
			vm.registro = vm.isEditing ? $modalInstance.params : {}
			if(_.isEmpty(vm.registro.movimentacoes)) {
				vm.registro.movimentacoes = []
			}

			var mesAtual = moment()

			vm.registro.movimentacoes.forEach(movi => {
				movi.id = moment(movi.data).valueOf()
				movi.encerrado = !(moment(movi.data).isSame(mesAtual, 'month') && moment(movi.data).isSame(mesAtual, 'year'));
			})

			vm.adicionarMovimentacao = function() {
				var ID = moment().valueOf()
				vm.registro.movimentacoes.push({id: ID})

				setTimeout(function(){
					$("#data"+ID).focus()
					$('#linha'+ID).addClass('resultados')
				}, 500);
			};

			vm.excluirMovimentacao = function(movimentacao) {
				vm.registro.movimentacoes.forEach((mov, idx) => {
					if (movimentacao.id == mov.id) {
						vm.registro.movimentacoes.splice(idx, 1)
					}
				})
			};

			vm.ultimoMesencerrado = moment().add(-1, 'months').format('YYYY-MM-DD')

			vm.checkEncerramentoMensal = function(movimentacao) {
				var mesSelecionado = moment(movimentacao.data, 'YYYY-MM');
				vm.mesEncerrado = mesSelecionado.isBefore(mesAtual, 'month')
				movimentacao.erroEncerramento = vm.mesEncerrado

				var hasSomeError = vm.registro.movimentacoes.some(movi => movi.erroEncerramento)

				vm.registro.movimentacoes.forEach(movi => {
					movi.disabled = hasSomeError && !movi.erroEncerramento && !movi.encerrado ? true : false
				})
			}

			vm.salvar = function() {
				vm.copy = angular.copy(vm.registro)
				vm.copy.movimentacoes.forEach(movi => {
					movi.data = moment(movi.data).diff(moment(), 'days')
					delete movi.encerrado
					delete movi.erroEncerramento
					delete movi.disabled
				})
				db.push('indexadores', vm.copy)
			}
		}
	])
})();