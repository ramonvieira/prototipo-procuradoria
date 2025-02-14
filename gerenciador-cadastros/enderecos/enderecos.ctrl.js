(function () {

	angular.module('app')
	.service('EnderecosService', function($rootScope, ENUMS, $filter) {
		$rootScope.enderecoCompleto = ENUMS.ENDERECOCOMPLETO;
		// $rootScope.serviceDb('enderecos')

		const enderecoKeys = [
			'cep',
			'logradouro',
			'bairro',
			'numero',
			'face',
			'distrito',
			'loteamento',
			'condominio',
			'bloco',
			'apartamento',
			'garagem',
			'sala',
			'loja',
			'complemento',
			'setor',
			'quadra',
			'lote',
			'secao',
			'municipio',
			'latitude',
			'longitude',
			'usarEnderCond'
		]

		function restaurar(endereco) {
			var data = []
			var restaurado = []

			endereco.forEach((registroValue, index) => {
				if (enderecoKeys[index] == 'logradouro') {
					data = $filter('logradouros')(registroValue, 'descricao')
				} else if (enderecoKeys[index] == 'bairro') {
					data = $filter('bairros')(registroValue, 'descricao')
				} else if (enderecoKeys[index] == 'face') {
					data = $filter('faces')(registroValue, 'descricao')
				} else if (enderecoKeys[index] == 'distrito') {
					data = $filter('distritos')(registroValue, 'descricao')
				} else if (enderecoKeys[index] == 'loteamento') {
					data = $filter('loteamentos')(registroValue, 'descricao')
				} else if (enderecoKeys[index] == 'secao') {
					data = $filter('secoes')(registroValue, 'descricao')
				} else if (enderecoKeys[index] == 'municipio') {
					data = $filter('municipios')(registroValue, 'descricao')
				} else {
					data = registroValue
				}
				restaurado.push(data)
			})

			return restaurado
		}

		return {
			completo: function(endereco) {
				var data = []
				var enderecoCompleto = restaurar(endereco)

				enderecoCompleto.forEach(key => {
					if (key) {
						data.push(key)
					}
				})
				return data.join(', ')
			},
			resumido: function(endereco) {
				var data = [];
				
				if (!endereco || !endereco.length) {
					endereco = ["96203-386",30,1,"987",3,2,22,null,null,null,null,null,null,null,null,null,null,null,74,null,null]
				}
				if (angular.isArray(endereco) && endereco.length) {
					var enderecoCompleto = restaurar(endereco)
					
					endereco.forEach((key, index) => {
						if (key) {
							if (enderecoKeys[index] == 'logradouro' || enderecoKeys[index] == 'bairro' || enderecoKeys[index] == 'numero' || enderecoKeys[index] == 'municipio') {
								data.push(enderecoCompleto[index])
							}
						}
					})
					return data.join(', ')
				} else {
					console.error('Endereço não recebeu array! Recebido:', endereco);
					return 'Endereço genérico para não quebrar layout'
				}
			},
			condominio: function(endereco) {
				return endereco[7] ? endereco[7] : null
			},
			toObj: function(endereco) {
				var obj = {}

				enderecoKeys.forEach((key, index) => {
					obj[key] = endereco[index]
				})

				return obj
			},
			salvar: function(endereco) {
				var enderFinal = [];
				enderecoKeys.forEach(enderecoKey => { enderFinal.push(null)})
		
				Object.keys(endereco).forEach(registroKey => {
					enderecoKeys.forEach((enderecoKey, index) => {
						if (registroKey == enderecoKey) {
							enderFinal[index]= eval('vm.endereco.' + registroKey)
						}
					})
				})
				return enderFinal
			},
		}
	})
	.directive('endereco', function() {
		return {
			restrict: 'E',
			template:	`
				<small class="text-muted" title="{{ENDERECO}}">
					<i class="fa fa-fw fa-map-marker pointer" ng-if="MAPS" ng-click="abrirMapa(ENDERECO)" keep-open title="Abre o mapa"></i>
					{{ENDERECO}} <condominio ng-if="CONDOMINIO != null" condominio="CONDOMINIO" link="true" />
				</small>`,
			replace: true,
			scope: {
				endereco    : '=',
				completo    : '=',
				maps        : '='
			},
			controller: function($scope, arrecModal, EnderecosService) {
				if(!$scope.endereco) {
					console.error('Endereço está recebendo', $scope.endereco);
				}
				$scope.MAPS       = $scope.maps != true ? false : true
				$scope.ENDERECO   = $scope.completo ? EnderecosService.completo($scope.endereco) : EnderecosService.resumido($scope.endereco)
				$scope.CONDOMINIO = EnderecosService.condominio($scope.endereco)
				
				$scope.abrirMapa = function(endereco) {
					resolve = {
						endereco: endereco
					}
					arrecModal.open('cadastros/enderecos/endereco-mapa-modal.html', $scope, resolve, 'lg', 'EnderecoMapaModalCtrl')
				};
			}
		}
	})
	.filter('endereco', function(EnderecosService) {
		return function(input, selector) {
			return EnderecosService.resumido(input)
		}
	})

	.controller('LocalizacaoCtrl', ['$scope', 'arrecadacao.common.ModalCad', '$rootScope', 'ENUMS',
		function($scope, ModalCad, $rootScope, ENUMS) {

			var vm = $scope;

			$rootScope.$broadcast('nav-changed', {
				menu: 'Cadastros de endereços',
				title: 'Cadastros de endereços'
			})

			vm.isCurrentState = _isCurrentState;
			vm.setCurrentState = _setCurrentState;
			vm.getCurrentState = _getCurrentState;

			var path = "cadastros/enderecos/";
			
			vm.itens = [{
				name: "Faces",
				state: "faces",
				btnAdd: {
					title: "Adiciona uma nova face",
					label: {
						short: "Face",
						full: "Adicionar face"
					},
				},
				index: path + "faces/faces.html",
				active: true
			}, {
				name: "Logradouros",
				state: "logradouros",
				btnAdd: {
					title: "Adiciona um novo logradouro",
					label: {
						short: "Logradouro",
						full: "Adicionar logradouro"
					},
				},
				index: path + "logradouros/logradouros.html"
			}, {
				name: "Trecho de logradouro",
				state: "trechos-logradouros",
				btnAdd: {
					title: "Adiciona um novo trecho de logradouro",
					label: {
						short: "Trecho de logradouro",
						full: "Adicionar trecho de logradouro"
					},
				},
				index: path + "trechos-logradouros/trechos-logradouros.html"
			}, {
				name: "Loteamentos",
				state: "loteamentos",
				btnAdd: {
					title: "Adiciona um novo loteamento",
					label: {
						short: "Loteamento",
						full: "Adicionar loteamento"
					},
				},
				index: path + "loteamentos/loteamentos.html"
			}, {
				name: "Bairros",
				state: "bairros",
				btnAdd: {
					title: "Adiciona um novo bairro",
					label: {
						short: "Bairro",
						full: "Adicionar bairro"
					},
				},
				index: path + "bairros/bairros.html",
				active: true
			}, {
				name: "Distritos",
				state: "distritos",
				btnAdd: {
					title: "Adiciona um novo distrito",
					label: {
						short: "Distrito",
						full: "Adicionar distrito"
					},
				},
				index: path + "distritos/distritos.html"
			}, {
				name: "Estados",
				state: "estados",
				btnAdd: {
					title: "Adiciona um novo estado",
					label: {
						short: "Estado",
						full: "Adicionar estado"
					},
				},
				index: path + "estados/estados.html"
			}, {
				name: "Municípios",
				state: "municipio",
				btnAdd: {
					title: "Adiciona um novo município",
					label: {
						short: "Município",
						full: "Adicionar município"
					},
				},
				index: path + "municipios/municipios.html"
			}, {
				name: "Países",
				state: "paises",
				hideAdd: true,
				btnAdd: {
					title: "Adiciona um novo país",
					label: {
						short: "País",
						full: "Adicionar país"
					},
				},
				index: path + "paises/paises.html",
				isHidden: true
			}, {
				name: "Seções",
				state: "secoes",
				btnAdd: {
					title: "Adiciona uma nova seção",
					label: {
						short: "Seção",
						full: "Adicionar seção"
					},
				},
				index: path + "secoes/secoes.html"
			}, {
				name: "Localidades",
				state: "localidades",
				btnAdd: {
					title: "Adiciona uma nova localidade",
					label: {
						short: "Localidade",
						full: "Adicionar localidade"
					},
				},
				index: path + "localidades/localidades.html"
			}];

			function _isCurrentState(state) {
				return vm.itens.some(function(t) {
					return t.state == state && t.active
				})
			}

			function _setCurrentState(state) {
				vm.itens.map(function(t) {
					t.active = false;
					return t;
				})

				state.active = true;
			}

			function _getCurrentState() {
				return vm.itens.filter(function(t) {
					return t.active
				})[0];
			}


			function init() {
				vm.setCurrentState(vm.getCurrentState());
			}

			init();
		}
	])
	.controller('EnderecoMapaModalCtrl', ['$scope', '$modalInstance',
		function($scope, $modalInstance) {
			$scope.ENDERECO = $modalInstance.params.endereco
		}
	])
})();