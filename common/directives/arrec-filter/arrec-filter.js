(function() {
	'use strict';
	
	angular.module('app')
	.factory('filtroFactory', function($rootScope, promiseTracker, $timeout) {
		function resetTags(filtro) {
			filtro.avancado.campo = {}
			filtro.avancado.tags = []
			filtro.rapido.tags = []
		}
		
		function _initLista(lista) {
			return lista
		}

		return {
			initFilter: function() {
				var filtro = {
					filtrado: [],
					carregandoResultados: promiseTracker(),
					carregarResultados: function() {
						filtro.carregandoResultados.addPromise($timeout(function(){
						}, $rootScope.randomInt()))
					},
					avancado: {
						tags: [],
						pesquisar: function() {
							console.log('pesquisar');
							console.log(filtro);
							this.tags = []
		
							if(!_.isEmpty(filtro.avancado.campo)) {
								const keys = Object.keys(filtro.avancado.campo)
								const values = Object.values(filtro.avancado.campo)
			
								keys.forEach((key, idx) => {
									var VALORES = []
									var CAMPO = filtro.avancado.campo[key]
									if (typeof CAMPO == 'object') {
										CAMPO.forEach((val, idx) => {
											VALORES.push(val.id)
										})
									} else {
										VALORES = CAMPO !== '' ? [CAMPO] : []
									}
									if(VALORES.length) {
										this.tags.push(
											{ campo: key, valor: VALORES, target: 'dropdown' }
										)
									}
								})
			
								filtro.carregarResultados()
							}
						},
						togglePesquisaAvancada: function(e) {
							e.preventDefault();
							e.stopPropagation();
							this.isopen = !this.isopen;
						},
						remTag: function(index) {
							filtro.avancado.tags.splice(index, 1)
		
							if (!filtro.avancado.tags.length) {
								resetTags(filtro)
							}
		
							filtro.carregarResultados()
						}
					},
					rapido: {
						pesquisa: null,
						tags: [],
						pesquisar: function() {
							if(this.pesquisa) {
								if(filtro.rapido.tags.every(tag => tag !== this.pesquisa)) {
									filtro.rapido.tags.push(this.pesquisa)
								}
								this.pesquisa = null
							}
						},
						remTag: function(index) {
							this.tags.splice(index, 1)
						},
						pesquisaKeyPress: function(e) {
							if(e.key == 'Enter') {
								e.preventDefault()
								this.pesquisar()
							}
						}
					},
					cleanTags:  function() {
						filtro.carregarResultados()
						resetTags(filtro)
					}
				}

				return filtro
			},
			initLista: function(lista) {
				return _initLista(lista)
			},
		}
	})
	.directive('pesquisaInline', function () {
		return {
			template: `
				<div class="input-group">
					<input id="searchInput" type="text" placeholder="Pesquisar" class="form-control input-sm search-field" data-toggle="dropdown" ng-keypress="ngModel.filtro.rapido.pesquisaKeyPress($event)" ng-model="ngModel.filtro.rapido.pesquisa">

					<!-- Pesquisa avançada -->
					<div class="input-group-btn" uib-dropdown dropdown-append-to-body auto-close="outsideClick" is-open="ngModel.filtro.avancado.isopen" keep-open>
						<button type="button" class="btn btn-default btn-sm" title="Pesquisar" id="pesquisar" ng-click="ngModel.filtro.rapido.pesquisar()"><i class="fa fa-search"></i></button>
						<button type="button" class="btn btn-default btn-sm dropdown-toggle" uib-dropdown-toggle title="Pesquisa avançada"><i class="fa fa-filter"></i> <span class="badge badge-primary" ng-if="ngModel.filtro.avancado.tags.length">{{ngModel.filtro.avancado.tags.length}}</span></span> <span class="caret"></span></button>

						<ul class="dropdown-menu dropdown-pesquisas-avancada dropdown-menu-right" uib-dropdown-menu>
							<li class="dropdown-header">
							<button type="button" class="close" data-dismiss="dropdown" title="Fechar" ng-click="ngModel.filtro.togglePesquisaAvancada($event)"><span aria-hidden="true">&times;</span></button>
								<h1>Pesquisa avançada</h1>
							</li>
							<li class="dropdown-header">Pesquisar na(s) coluna(s)</li>
							<li>
								<select id="filtroColunas" bf-select2="{}" ng-model="ngModel.filtro.rapido.colunasSelect" multiple="true" ng-init="ngModel.filtro.rapido.colunasSelect = ['1']">
									<option value="1">Código</option>
								</select>
							</li>
							<li class="dropdown-header">Utilizando como critério</li>
							<li>
								<div class="bth-radio bth-radio-inline">
									<input id="rdAlguns" type="radio" value="1" name="bthRadioCriterio" ng-model="ngModel.filtro.rapido.tipoPesquisa">
									<label for="rdAlguns">Alguns dos termos digitados</label>
								</div>
								<div class="bth-radio bth-radio-inline">
									<input id="rdTodos" type="radio" value="2" name="bthRadioCriterio" ng-model="ngModel.filtro.rapido.tipoPesquisa">
									<label for="rdTodos">Todos os termos digitados</label>
								</div>
								<div class="bth-radio bth-radio-inline">
									<input id="rdNenhum" type="radio" value="3" name="bthRadioCriterio" ng-model="ngModel.filtro.rapido.tipoPesquisa">
									<label for="rdNenhum">Nenhum dos termos digitados</label>
								</div>
							</li>
							<li class="divider"></li>
							<li class="dropdown-header">
								<h1>Outras opções</h1>
							</li>
							<li>
								<ng-transclude />
							</li>
							<li class="dropdown-footer pull-right">
								<button class="btn btn-primary" ng-click="ngModel.filtro.avancado.pesquisar()" uib-dropdown-toggle><i class="fa fa-search"></i> Pesquisar</button>
							</li>
						</ul>
					</div>
				</div>
			`,
			replace: false,
			transclude: true,
			restrict: 'E',
			scope: {
				ngModel: '=',
			},
			controller: function($rootScope, $scope) {
				var vm = $scope

				console.log(vm.ngModel);
				vm.$watch('ngModel.filtro', (newValue, oldValue) => {
					if (!angular.equals(newValue.filtrarPor, oldValue.filtrarPor)) {
						newValue.carregarResultados()
					}
					if (!angular.equals(newValue.rapido.tags, oldValue.rapido.tags)) {
						newValue.carregarResultados()
					}

					if (!angular.equals(newValue.avancado.tags, oldValue.avancado.tags)) {
						// newValue.carregarResultados()
					}
				}, true)
			}
		}
	})
})();