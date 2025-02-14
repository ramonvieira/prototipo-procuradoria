(function() {
	'use strict';
	
	angular.module('app')
	
	.directive('bthTagList', function () {
		return {
			template: `
				<ul class="bth-tag__list">
					<li>
						<span class="bth-tag bth-tag--hover" ng-if="ngModel.filtro.filtrando">
							<i class="fa fa-search"></i>
							0900264-79.2018.8.24.0078
							<a href="" ng-click="remTagSearch({filter: option} );" class="bth-tag__close">✕</a>
						</span>
					</li>
					
					<li ng-repeat="filtro in ngModel.filtro.filtrado">
						<span class="bth-tag bth-tag--hover">
							<i class="fa fa-filter"></i> <span class="bth-tag__type">{{filtro.campo}}: </span>
							<span title="{{filtro.valor}}">
								{{filtro.valor | limitTo: 13}} <span ng-if="filtro.valor.length > 13">...</span>
							</span>
							<small class="bth-tag__more" ng-if="ngModel.filtro.filtrado.length > 1">
								e mais
								<a href="" ng-click="ngModel.filtro.openFilters()" ui-keep-open>
									{{ngModel.filtro.filtrado.length-1}}
									<ng-pluralize count="ngModel.filtro.filtrado.length-1"
										when="{
											0:		'item',
											1:		'item',
											'other':	'itens'
										}">
									</ng-pluralize>
								</a>
							</small>
							<a href="" ng-click="ngModel.filtro.remTag($index);" class="bth-tag__close">✕</a>
						</span>
						{{ngModel.filtro.filtrado.length}}
					</li>
					<li ng-if="ngModel.filtro.filtrado.length">
						<div class="btn-group">
							<button class="btn btn-link btn-xs" ng-click="ngModel.filtro.cleanFilters()" title="Limpar filtros">
								<i class="fa fa-trash-o"></i>
							</button>
						</div>
					</li>
				</ul>
			`,
			replace: true,
			restrict: 'E',
			scope: {
				ngModel: '=',
			},
			controller: function($scope) {
				console.log($scope.ngModel);
				$scope.ngModel.filtro.cleanFilters = function() {
					$scope.ngModel.filtro.campo = {}
					$scope.ngModel.filtro.filtrado = []
					$scope.ngModel.filtro.filtrando = false
				}
			}
		}
	})
})();