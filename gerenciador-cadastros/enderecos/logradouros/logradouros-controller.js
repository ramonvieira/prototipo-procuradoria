(function () {
	angular.module('app')
	.service('LogradourosService', function($rootScope) {
		$rootScope.serviceDb('logradouros')
		$rootScope.serviceDb('tiposLogradouro')
	})
	.filter('logradouros', function($filter, LogradourosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'logradouros', selector ? selector : 'descricao')
		}
	})
	.filter('tiposLogradouro', function($filter, LogradourosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'tiposLogradouro', selector ? selector : 'descricao')
		}
	})
	.directive('logradouro', function() {
		return {
			restrict: 'E',
			template:	`
				<span ng-class="{'show' : BLOCK}">
					<span title="Código" ng-class="{'badge badge-default' : BADGE}" ng-if="ID" keep-open>
						{{ID ? LOGRADOURO.id : null}}{{ID && !BADGE ? " - " : null}}
					</span>
					{{LOGRADOURO.descricao}}
					<small class="text-muted" ng-class="{'show' : WRAP}" ng-if="showMunicipio || showEstado">
						({{showMunicipio ? (LOGRADOURO.municipio | municipios) : null}}{{showEstado ? '-' + (LOGRADOURO.municipio | municipios:'estado' | estados:'sigla') : null}})
					</small>
				</span>
			`,
			required: 'logradouro',
			replace: true,
			scope: {
				logradouro    : '=' ,
				block         : '=' ,
				wrap          : '=' ,
				id            : '=' ,
				badge         : '=' ,
				showMunicipio : '=' ,
				showEstado    : '=' ,
			},
			controller: function($scope, $filter, EnderecosService) {
				$scope.LOGRADOURO = $filter('logradouros')($scope.logradouro, 'object')

				$scope.HAS_REFERENTE  = $scope.logradouro    == null  ? false : true
				$scope.BLOCK          = $scope.block         != true  ? false : true
				$scope.WRAP           = $scope.wrap          != true  ? false : true
				$scope.ID             = $scope.id            != false ? true  : false
				$scope.BADGE          = $scope.badge         != false ? true  : false
				$scope.SHOW_MUNICIPIO = $scope.showMunicipio != false ? true  : false
				$scope.SHOW_ESTADO    = $scope.showEstado    != false ? true  : false
			}
		}
	})
	.directive('logradourosSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				ngModel         : '=' ,
				ngChange        : '=' ,
				label           : '@?',
				multiple        : '=' ,
				ngRequired      : '=' ,
				ngDisabled      : '=' ,
				allowSearchParts: '=' ,
				placeholder     : '@?',
				filter          : '=' ,
			},
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, LogradourosService, $filter) {
			var vm = $scope
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre logradouros pelo código ou pelo nome.'
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.logradouros, 'id'),
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('logradouros')($(element).val(), 'object') ) : null
				},
				createSearchChoice: function(term, data) {
					if (vm.allowSearchParts) {
						if ($(data).filter(
							function() {
								return this.text.localeCompare(term)===0;
							}
						).length===0) {
							return { id:term, text:term };
						}
					} else {
						return false
					}
				},
				formatResult: function(item) {
					return item.id + ' - ' + item.descricao + ' <small class="text-muted">(' + $filter('municipios')(item.municipio) + '-' + $filter('estados')($filter('municipios')(item.municipio, 'estado'), 'sigla') + ')</small>'
				},
				formatSelection: function(item) {
					return item.id + ' - ' + item.descricao + ' <small class="text-muted">(' + $filter('municipios')(item.municipio) + '-' + $filter('estados')($filter('municipios')(item.municipio, 'estado'), 'sigla') + ')</small>'
				},
			}
		}
	})
	.controller('LogradourosCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'db', 'LogradourosService', 'arrecModal',
		function($scope, ModalCad, db, LogradourosService, arrecModal) {
			var vm = $scope;
			
			vm.salvar = function(item) {
				item.padrao = false
				db.push('logradouros', item)
			}

			vm.excluir = function(item) {
				db.delete('logradouros', item)
			}

			vm.adicionar = function(resolve) {
				abrirPopup('cadastros/enderecos/logradouros/logradouros-modal.html', resolve);
			}

			// vm.adicionar({})
			
			vm.columns = [{
				descricao: "Tipo",
				showColumn: true
			}, {
				descricao: "Descrição",
				showColumn: true
			}, {
				descricao: "Bairros cortados pelo logradouro",
				showColumn: true
			}, {
				descricao: "Municípios",
				showColumn: true
			}]
			
			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'LogradourosModalCtrl as LogradourosModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])

	//controller da modal
	.controller('LogradourosModalCtrl', ['$rootScope', '$scope', 'arrecadacao.common.ModalCad', 'params', '$filter', 'bfc.Notification',
		function($rootScope, $scope, ModalCad, params, $filter, Notification) {
			var vm = $scope;

			if(_.isEmpty(params.registro)) {
				vm.registro = new Object
				vm.isEditing = false
				vm.registro.leis = [{}]
			} else {
				vm.registro = angular.copy(params.registro)
				vm.isEditing = true
				vm.registro.leis = vm.registro.leis ? vm.registro.leis : []
			}

			function initTabActive() {
				if(params.tab) {
					return params.tab
				} else if(!vm.isEditing) {
					return 'GEOLOCALIZACAO'
				} else {
					return 'DADOS_GERAIS'
				}
			}
			vm.tabActive = initTabActive()
			
			vm.setTabActive = function(tab) {
				vm.tabActive = tab
			}

			function removeAcentos(str) {
				return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
			}

			function pesquisaSemAcento(stringOriginal, termoPesquisa) {
				const stringSemAcento = removeAcentos(stringOriginal.toLowerCase());
				const termoPesquisaSemAcento = removeAcentos(termoPesquisa.toLowerCase());
				
				return stringSemAcento.includes(termoPesquisaSemAcento);
			}
			
			vm.usarEndereco = function() {
				vm.registro.descricao = vm.registro.geo.rua;
				vm.registro.cep       = vm.registro.geo.cep;
				var MUNICIPIO = $rootScope.municipios.find((municipio) => pesquisaSemAcento(municipio.descricao, vm.registro.geo.municipio))

				MUNICIPIO === undefined ? Notification.publish('O município não foi encontrado no sistema. Informe manualmente', 'error') : vm.registro.municipio = MUNICIPIO.id
			}

			$scope.$watchGroup(['registro.tipo', 'registro.descricao', 'registro.municipio'], function(newValues, oldValues) {
				newValues.every((val) => val !== undefined) && !vm.isEditing ? vm.registro.mostrarMapa() : null
			})
		}
	])
})();