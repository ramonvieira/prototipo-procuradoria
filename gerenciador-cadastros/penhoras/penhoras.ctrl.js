(function () {
	angular.module('app')
	.directive('penhorasLista', function() {
		return {
			restrict: 'E',
			replace: true,
			template: `
				<div>
					<div class="row">
						<div class="col-md-12">
							<button class="btn btn-sm btn-add btn-success" title="Adiciona uma nova penhora" ng-click="adicionarPenhora({})">Penhora</button>
						</div>
					</div>
					<div class="bth-empty bth-empty--records" ng-if="!penhoras.length">
						<h4>Ainda não há penhoras por aqui</h4>
					</div>
					<div class="row" ng-if="penhoras.length">
						<div class="col-md-12">
							<table class="table table-unfixed table-unbordered table-unstriped">
								<thead>
									<tr>
										<th></th>
										<th><span>Descrição/Categoria</span></th>
										<th><span>Endereço do bem</span></th>
										<th width="100"><span>Data</span></th>
										<th><span>Depositário</span></th>
										<th class="text-right"><span>Valor penhorado</span></th>
										<th width="140"><span>Situação</span></th>
										<th width="65"></th>
									</tr>
								</thead>
								<tbody>
									<tr ng-class="{'opened' : groupList}" ng-repeat-start="penhora in penhoras track by penhora.id">
										<td class="col-fit col-arrow" ng-click="groupList = !groupList">
											<div class="btn btn-link btn-sm">
												<i class="material-icons">keyboard_arrow_down</i>
											</div>
										</td>
										<td>
											{{penhora.descricao}}
											<br>
											<span class="info" title="Categoria">{{penhora.categoria | arrecEmptyText}}</span>
										</td>
										<td class="ellipsis" title="{{penhora.endereco}}">{{penhora.endereco | arrecEmptyText}}</td>
										<td>{{penhora.data | arrecDate}}</td>
										<td>
											<span ng-if="!penhora.depositario">---</span>
											<a href="" ng-controller="ContribuintesCtrl" ng-click="adicionar()" ng-if="penhora.depositario">{{contribuintes[penhora.depositario].nome}}</a><br>
										</td>
										<td class="text-right">{{penhora.valorPenhorado | currency}}</td>
										<td uib-dropdown dropdown-append-to-body>
											<button type="button" class="btn btn-default btn-xs btn-block" uib-dropdown-toggle>
												<span class="bth-status {{penhora.SITUACAO_ATUAL.situacao.color}}"></span> {{penhora.SITUACAO_ATUAL.situacao.descricao}} <span class="caret"></span>
											</button>
											<ul class="dropdown-menu" uib-dropdown-menu>
												<li ng-repeat="SIT in situacaoPenhoras" ng-if="SIT.key != penhora.SITUACAO_ATUAL.situacao.key"><a href="" ng-click="mudarSituacao(penhora, SIT)"><span class="bth-status {{SIT.color}}"></span> {{SIT.descricao}}</a></li>
											</ul>
										</td>
										<td class="text-right">
											<a href="" title="Editar" ng-click="adicionarPenhora(penhora)"><i class="fa fa-fw fa-pencil"></i></a>
											<a href="" title="Excluir" ng-click="excluir($index)"><i class="fa fa-fw fa-trash-o"></i></a>
										</td>
									</tr>
									<tr class="indentation" ng-repeat-end>
										<td colspan="8" ng-class="{'collapsed' : !groupList}">
											<div uib-collapse="!groupList" class="collapse" style="height: 0px;" aria-expanded="false" aria-hidden="true">
												<div class="row">
													<div class="col-md-12">
														<label>Complemento</label><br>
														{{penhora.complemento}}
													</div>
												</div>
											</div>
										</td>
									</tr>
								</tbody>
								<tfoot>
									<tr>
										<td colspan="6" class="text-right"><strong><strong>Total:</strong> {{totalPenhora() | currency}}</strong></td>
										<td></td>
										<td></td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
				</div>
			`,
			scope: {
				lista: '='
			},
			controller: function($scope, arrecModal, CategoriaBensService, ENUMS) {
				var vm = $scope
				vm.situacaoPenhoras = ENUMS.SITUACAO_PENHORAS
				vm.penhoras = $scope.lista

				vm.penhoras.forEach(penhora => {
					penhora.categoria = penhora.categoria ? CategoriaBensService.categorias.find(categoria => categoria.id == penhora.categoria).descricao : null
					vm.totalPenhora+= penhora.valorPenhorado

					penhora.situacoes.forEach(situacao => {
						situacao.situacao = vm.situacaoPenhoras.find(SIT => SIT.key == situacao.situacao)
					})
					penhora.SITUACAO_ATUAL = penhora.situacoes[penhora.situacoes.length-1]
				})

				vm.totalPenhora = function() {
					return vm.penhoras.length ? vm.penhoras
						.map(penhora => penhora.valorPenhorado)
						.reduce(function(acumulado, valorPenhorado) {
							return acumulado + valorPenhorado
						}) : null
				}

				vm.adicionarPenhora = function(resolve) {
					arrecModal.open('gerenciador-cadastros/penhoras/penhoras-modal.html', $scope, resolve, 'sm', 'PenhorasModalCtrl')
				}

				vm.mudarSituacao = function(penhora, situacao) {
					penhora.situacoes.push({
						resp: 'ramon.viquetti',
						situacao: situacao.key,
						data: 0,
					})
					
					penhora.SITUACAO_ATUAL = penhora.situacoes[penhora.situacoes.length-1]
					penhora.SITUACAO_ATUAL.situacao = vm.situacaoPenhoras.find(SP => SP.key == penhora.SITUACAO_ATUAL.situacao)
				}
	
				vm.excluir = function(index) {
					vm.penhoras.splice(index, 1)
					vm.totalPenhora()
				}
			}
		}
	})
	.controller('PenhorasCtrl', ['$scope', 'arrecModal', 'promiseTracker', '$timeout',
		function($scope, promiseTracker, $timeout) {
			var vm = $scope;
			

		}
	])

	.controller('PenhorasModalCtrl', ['$scope', '$modalInstance', 'promiseTracker', 'ENUMS',
		function($scope, promiseTracker, $modalInstance, ENUMS) {
			var vm = $scope;
			vm.contribuintes = ENUMS.CONTRIBUINTES;
			vm.situacaoPenhoras = ENUMS.SITUACAO_PENHORAS

			vm.salvar = function(registro) {
				registro.data = 0
				registro.situacoes = [{ data: 0, resp: 'ramon.viquetti', situacao: 'ATIVA'}]
				$scope.$parent.penhoras.push(registro)
			}
		}
	])
})();