(function () {
	angular.module('app')
	.directive("arrecDepara", function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				alteracoes: '=',
				filter: '=',
				arrow: '=',
			},
			template: `
				<div>
					<h4 class="text-center" ng-if="!(alteracoes | filter: SEARCH).length">Nenhum resultado para sua pesquisa</h4>
					<table class="table table-unstriped table-unfixed" ng-if="(alteracoes | filter: SEARCH).length">
						<tbody>
							<tr ng-repeat-start="alteracao in alteracoes | filter: SEARCH track by $index" ng-init="ITEM_SUBGROUP = (alteracao.campos || alteracao.secoes) ? true : false">
								<td ng-show="HAS_SUBGROUP" class="col-fit" ng-class="{'col-arrow': ITEM_SUBGROUP}" ng-click="gp = !gp">
									<button class="btn btn-link btn-sm" ng-if="ITEM_SUBGROUP">
										<i class="material-icons">keyboard_arrow_down</i>
									</button>
								</td>
								<td class="text-right" width="200">{{alteracao.campo}}:</t>
								<td><arrec-depara-item arrow="arrow" item="alteracao" ng-if="!ITEM_SUBGROUP"></depara-item></td>
							</tr>
							<tr class="indentation" ng-repeat-end ng-if="ITEM_SUBGROUP">
								<td colspan="5" ng-class="{'collapsed' : !gp}">
									<div uib-collapse="!gp" aria-expanded="true" aria-hidden="false">
										<div ng-if="alteracao.campos">
											<table class="table table-unfixed table-unstriped table-hover">
												<tbody>
													<tr ng-repeat="item in alteracao.campos">
														<td class="text-right" width="200">
															{{item.campo}}:
															<div ng-if="item.campoTip"><small class="text-muted">({{item.campoTip}})</small></div>
														</td>
														<td><arrec-depara-item arrow="arrow" item="item"></depara-item></td>
													</tr>
												</tbody>
											</table>
										</div>
										<div ng-if="alteracao.secoes" ng-repeat="secao in alteracao.secoes | filter: SEARCH">
											<table class="table table-unfixed table-unstriped table-hover">
												<caption>{{secao.secao}}</caption>
												<tbody>
													<tr ng-repeat="item in secao.campos | filter: SEARCH">
														<td class="text-right" width="200">
															{{item.campo}}:
															<div ng-if="item.campoTip"><small class="text-muted">({{item.campoTip}})</small></div>
														</td>
														<td><arrec-depara-item arrow="arrow" item="item"></depara-item></td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			`,
			controller: function($scope) {
				$scope.$watch('filter', function(val, old){
					$scope.SEARCH = val
				});
				$scope.$watch('alteracoes', function(val, old){
					$scope.HAS_SUBGROUP = false
					$scope.alteracoes.forEach(alteracao => {
						if(alteracao.secoes || alteracao.campos) {
							$scope.HAS_SUBGROUP = true;
						}
					});
				});
			}
		}
	})
	.directive("arrecDeparaItem", function() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				item: '=',
				arrow: '='
			},
			template: `
				<span>
					<span ng-if="(item.antes == null || item.depois == null)" ng-hide="item.lista">
						<span class="badge bg__green--l20 tx__green--d30" ng-if="item.antes == null"><i class="fa fa-fw fa-plus"></i> Adicionado</span>
						<span class="badge bg__red--l40 tx__red--d20" ng-if="item.depois == null"><i class="fa fa-fw fa-minus"></i> Removido</span>
					</span>
					<span ng-if="(item.antes != null && item.depois != null)" ng-hide="item.lista">
						<span class="badge {{item.antes ? 'bg__red--l40 tx__red--d10' : 'bg__gray--l10'}}"><i class="fa fa-fw fa-minus" ng-if="item.antes"></i> {{item.antes ? item.antes : "---"}}</span>
							<i class="fa fa-fw fa-arrow-right tx__gray--l10" ng-if="arrow"></i>
						<span class="badge {{item.depois ? 'bg__green--l20 tx__green--d30' : 'bg__gray--l10'}}"><i class="fa fa-fw fa-plus" ng-if="item.depois"></i> {{item.depois ? item.depois : '---'}}</span>
					</span>
				
					<span class="badge badge--inline bg__{{it.action ? 'green--l20' : 'red--l40'}} tx__{{it.action ? 'green--d30' : 'red--d20'}}" ng-if="item.lista" ng-repeat="it in item.lista"><i class="fa fa-fw fa-{{it.action ? 'plus' : 'minus'}}"></i> {{it.item}}</span>
				</span>
			`,
			controller: function($scope) {
				$scope.arrow = $scope.arrow != false ? true : false
			}
		}
	})
})();