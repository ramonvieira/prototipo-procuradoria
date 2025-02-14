(function() {
	'use strict';
	
	var app = angular.module('app')
	
	.directive('arrecPagination', function () {
		return {
			template: `
				<div class="row hidden-print" ng-class="{'bottom': bottom}">
					<div class="col-md-6" ng-if="!small && showQuantidade">
						<form class="form-inline">
							{{ngModel.pages.intervalo}}{{showTotal ? ' de ' + ngModel.itens.length : ''}}
							<select id="itensPorPagina" class="form-control" ng-class="small ? 'input-xs' : 'input-sm'" ng-model="ngModel.pages.itensPorPagina" ng-change="ngModel.pages.definePaginacao()">
								<option value="20">20</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
							resultados por página
						</form>
					</div>

					<div class="col-md-6" ng-if="small && showQuantidade">
						{{ngModel.pages.intervalo}}{{showTotal ? ' de ' + ngModel.itens.length : ''}}
					</div>
					<div class="col-md-{{showQuantidade ? 6 : 12}}">
						<div class="pull-right">
							<button class="btn btn-default btn-sm" ng-disabled="ngModel.pages.paginaAtiva < 1" ng-class="small ? 'btn-xs' : 'btn-sm'" ng-click="ngModel.pages.setResultadosExibir(ngModel.pages.paginaAtiva-1)"><i class="fa fa-angle-left"></i> Anterior</button>
							<button class="btn btn-default btn-sm btn-pagination {{page.active ? 'active' : ''}}" ng-class="small ? 'btn-xs' : 'btn-sm'" ng-repeat="page in ngModel.pages.paginas track by $index" ng-click="ngModel.pages.setResultadosExibir($index)" ng-if="showPaginas">{{page.page+1}}</button>
							<button class="btn btn-default btn-sm" ng-disabled="ngModel.pages.paginaAtiva+1 == ngModel.pages.qtdPages" ng-class="small ? 'btn-xs' : 'btn-sm'" ng-click="ngModel.pages.setResultadosExibir(ngModel.pages.paginaAtiva+1)">Próxima <i class="fa fa-angle-right"></i></button>
						</div>
					</div>
				</div>
			`,
			replace: false,
			restrict: 'E',
			scope: {
				list           : '='  ,
				small          : '='  ,
				showQuantidade : '='  ,
				showPaginas    : '='  ,
				showTotal      : '='  ,
				bottom         : '@?' ,
				ngModel        : '='  ,
			},
			controller: function ($scope, storage) {
				var vm = $scope

				vm.showQuantidade = vm.showQuantidade != undefined ? vm.showQuantidade : true
				vm.showPaginas    = vm.showPaginas    != undefined ? vm.showPaginas    : true
				vm.showTotal      = vm.showTotal      != undefined ? vm.showTotal      : true

				if(vm.ngModel == undefined) {
					vm.ngModel = {
						itens: new Array(100).fill(),
						lista: $scope.list ? $scope.list : []
					}
				}

				vm.ngModel.pages = {
					itensPorPagina: storage.check('itensPorPagina', '100'),
					paginas: [],
					paginaExibida: [],
					paginaAtiva: 0,
					qtdPages: null,
					intervalo: '1-' + this.itensPorPagina,
					setResultadosExibir: function(page) {
						this.paginaAtiva = this.paginas[page].page
						this.paginas.forEach((r, idx) => {
							r.active = page == idx ? true : false;
							page == idx ? vm.ngModel.lista = r.itens : null
						})

						var init = (page * Number(this.itensPorPagina)+1)
						var fin = (Number(this.itensPorPagina) - (Number(this.itensPorPagina)) - this.paginas[page].itens.length)*-1
						this.intervalo =  init + '-' + (init +  fin -1)
					},
					definePaginacao: function() {
						storage.set('itensPorPagina', this.itensPorPagina)
						this.qtdPages = Number(Math.ceil(vm.ngModel.itens.length / this.itensPorPagina))
						var count = 0
						this.paginas = []
						
						for(let pag = 0; pag < Number(this.qtdPages); pag++) {
							this.paginas.push({page:pag, active: false, itens:[]})

							for (let i = 1; i <= Number(this.itensPorPagina); i++) {
								if(count < vm.ngModel.itens.length) {
									this.paginas[pag].itens.push(vm.ngModel.itens[count])
									count++
								}
							}
						}

						this.paginas[0].active = true
						this.setResultadosExibir(0)
					}
				}

				vm.ngModel.pages.definePaginacao()
			},
		}
	})
})();