(function () {

	angular.module('app')
	.service('ContribuintesService', function($rootScope, ENUMS) {
		$rootScope.serviceDb('contribuintes')
		$rootScope.serviceDb('usuariosSistema')

		// $rootScope.economicos = []
		$rootScope.pessoasJuridicas = []

		$rootScope.contribuintes.forEach(contribuinte => {
			contribuinte.vinculos = {
				cart: null,
				contador: null,
				engenhArqu: null,
				fiscal: null,
				imobili: null
			}

			//Imóveis do contribuinte
			contribuinte.imoveis = []
			// $rootScope.imoveis.forEach(imovel => {
			// 	imovel.proprietarios.forEach(proprietario => {
			// 		proprietario.proprietario == contribuinte.id ? contribuinte.imoveis.push(imovel) : null
			// 	})
			// })

			//Econômicos do contribuinte
			contribuinte.economicos = []
			// $rootScope.economicos.forEach(economico => {
			// 	economico.propriet == contribuinte.id ? contribuinte.economicos.push(economico) : null
			// })

			//Vinculo com cartório
			// $rootScope.cartorios.forEach(cartorio => {
			// 	cartorio.contribuinte == contribuinte.id ? contribuinte.vinculos.cart = true : null
			// })
			//Vinculo com contadores
			// $rootScope.contadores.forEach(contador => {
			// 	contador.contribuinte == contribuinte.id ? contribuinte.vinculos.contador = true : null
			// })
			//TODO:Vinculo com engenheiros/arquitetos
			// $rootScope.cartorios.forEach(cartorio => {
			// 	cartorio.contribuinte == contribuinte.id ? contribuinte.vinculos.cart = true : null
			// })
			//Vinculo com fiscais
			// FiscaisService.itens.forEach(fiscal => {
			// 	fiscal.fiscal == contribuinte.id ? contribuinte.vinculos.fiscal = true : null
			// })
			//Vinculo com imobiliárias
			// $rootScope.imobiliarias.forEach(imobiliaria => {
			// 	imobiliaria.nome == contribuinte.id ? contribuinte.vinculos.imobili = true : null
			// })
			
			// Pessoas jurídicas
			if (contribuinte.tipoPessoa == 2) {
				$rootScope.pessoasJuridicas.push(contribuinte)
			}
		})

		return {
			contribuintes: $rootScope.contribuintes,
		}
	})
	.filter('contribuintes', function($filter, ContribuintesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'contribuintes', selector ? selector : 'nome')
		}
	})
	.filter('usuariosSistema', function($filter, ContribuintesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'usuariosSistema', selector ? selector : 'nome')
		}
	})
	.directive('usuariosSistemaSelect', function() {
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
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				allowSearchParts: '=',
				placeholder: '@?',
				filter: '=',
			},
			replace: true,
			transclude: true,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, ContribuintesService, $q, $filter) {
			var vm = $scope
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return ''
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.usuariosSistema, 'id'),
					text: function(item) {
						return `${item.id} ${item.nomeCompleto} ${item.nome}`
					}
				},
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('usuariosSistema')($(element).val(), 'object') ) : null
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
				formatResult: function(item){
					return item.nome + (item.adm ? "<br><small class='text-muted'>(Administrador)</small>" : '')
				},
				formatSelection: function(item){
					return item.nome + (item.adm ? " <small class='text-muted'>(Administrador)</small>" : '')
				},
			}
		}
	})
	.directive('contribuintesSelect', function() {{
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="sel_{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" id="sel_{{ID}}" bf-select2="selectOptions" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" placeholder="{{setPlaceholder()}}" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				ngModel          : '='  ,
				ngChange         : '='  ,
				ngRequired       : '='  ,
				ngDisabled       : '='  ,
				label            : '@?' ,
				multiple         : '='  ,
				placeholder      : '@?' ,
				tipoImovel       : '@?' ,
				filter           : '='  ,
				
				exemploIntervalo : '@?' ,
				showHelpColar    : '='  ,
			},
			transclude: true,
			replace: true,
			controller: function($rootScope, $scope, selectIntervaloFactory,  ContribuintesService, $filter) {
				var vm = $scope
				vm.ID = Date.now()
				var contribuintes      = vm.filter != undefined ? vm.filter : $rootScope.contribuintes
				var multiple           = $scope.multiple  != true      ? false     : true
				var minimumInputLength = 1;

				vm.setPlaceholder = function() {
					if(vm.placeholder == undefined) {
						return null
					} else if(vm.placeholder == 'true') {
						return 'Pesquise pelo código, nome ou CPF/CNPJ.'
					} else {
						return vm.placeholder
					}
				}
				
				vm.ngModel = selectIntervaloFactory.setNgModel(vm.ngModel, multiple, 'contribuintes')

				vm.selectOptions = {
					minimumInputLength: minimumInputLength,
					tokenSeparators   : [",", ";"],
					multiple          : multiple,
					allowClear        : vm.ngRequired != true ? true : false,
					data: {
						results: contribuintes,
						text: function(item) {
							return `${item.id} ${item.nome} ${item.cpfcnpj}`
						}
					},
					formatValue: function(item){
						return selectIntervaloFactory.formatValue(item, vm.multiple)
					},
					createSearchChoice: function (term) {
						return selectIntervaloFactory.createSearchChoice(term, multiple)
					},
					formatInputTooShort: function (term) {
						return selectIntervaloFactory.formatInputTooShort(term, multiple, vm.exemploIntervalo, minimumInputLength, vm.showHelpColar)
					},
					initSelection: function(element, callback) {
						
					},
					formatResult: function (item) {
						return item.originalText ? selectIntervaloFactory.formatIntervalo(item, false) : `${item.id} - ${item.nome} ${item.cpfcnpj ? `<br /><small title='CPF/CNPJ'>${$filter('bfMaskCpfCnpj')(item.cpfcnpj)}</small>` : ''}`
					},
					formatSelection: function (item) {
						return item.originalText ? selectIntervaloFactory.formatIntervalo(item, true) : `${item.id} - ${item.nome} ${item.cpfcnpj ? `(<small title='CPF/CNPJ'>${$filter('bfMaskCpfCnpj')(item.cpfcnpj)}</small>)` : ''}`
					}
				}
			}
		}
	}})
	.directive('tribPessoasDescription', function() {
		var situacao = `<small ng-if="!contribuinte.statuses[contribuinte.statuses.length-1]" title="Situação">
							{{!contribuinte.statuses[contribuinte.statuses.length-1] ? '(DESATIVADO)' : ''}}
						</small>`

		var id = `
						<span title="Código" ng-class="{'badge badge-default' : BADGE}" ng-if="ID" keep-open>
							{{ID ? contribuinte.id : null}}{{ID && !BADGE ? " - " : null}}
							` + situacao + `
						</span>
		`
		var comLink = `
						<small ng-if="!contribuinte.statuses[contribuinte.statuses.length-1] && LINK && !ID">(DESATIVADO)</small> 
						<a href="" ng-if="LINK && POPOVER" class="popResContrib big-popover" id="{{idResumo}}" data-container="body" data-toggle="popover" data-placement="bottom" keep-open> 
							{{contribuinte.nome}} 
						</a> 
						<a href="" ng-if="LINK && !POPOVER" ng-click="editarContribuinte(contribuinte)" title="{{contribuinte.id}} - {{contribuinte.nome}} ({{contribuinte.cpfcnpj | bfMaskCpfCnpj | arrecEmptyText}})" keep-open>{{contribuinte.nome}}</a>
		`
		var semLink = `
						<span ng-if="!LINK" title="{{contribuinte.id}} - {{contribuinte.nome}} ({{contribuinte.cpfcnpj | bfMaskCpfCnpj | arrecEmptyText}})">
							<small>
								{{!contribuinte.statuses[contribuinte.statuses.length-1] && !ID ? '(DESATIVADO)' : ''}} 
							</small>
							{{contribuinte.nome}}
						</span>
		`

		var cpfCnpj = `
						<br ng-show="WRAP && CPF_CNPJ && contribuinte.cpfcnpj != null" /> <small class="text-muted" title="CPF/CNPJ" ng-if="CPF_CNPJ && contribuinte.cpfcnpj != null">({{contribuinte.cpfcnpj | bfMaskCpfCnpj}})</small>
		`

		var endereco = `
						<br ng-show="WRAP && ENDERECO" /> <small>{{!WRAP && ENDERECO ? ' - ' : ''}} <endereco endereco="contribuinte.endereco" ng-if="ENDERECO"></endereco> <condominio ng-if="imovel.condominio" link="true"></condominio></small>
		`
		return {
			restrict: 'E',
			template:	`
							<span ng-show="HAS_REFERENTE" ng-class="{'show' : BLOCK}">
								`+ id +`
								`+ comLink +`
								`+ semLink +`
								`+ cpfCnpj +`
								`+ endereco +`
							</span>
						`,
			required: 'ngModel',
			replace: true,
			scope: {
				class       : '@?',
				referente   : '=' ,
				block       : '=',
				wrap        : '=',
				popover     : '=',
				endereco    : '=',
				link        : '=',
				id          : '=',
				badge       : '=',
				cpfcnpj     : '=',
			},
			controller: function($rootScope, $scope, $filter, arrecModal, EnderecosService) {
				// Necessário passar somente o ID do referente
				if ($scope.referente == undefined) {
					return false
				}
				if($scope.referente) {
					$scope.contribuinte = $filter('contribuintes')($scope.referente, 'object')
				}

				$scope.HAS_REFERENTE = $scope.referente     == null  ? false : true
				$scope.BLOCK         = $scope.block         != true  ? false : true
				$scope.WRAP          = $scope.wrap          != true  ? false : true
				$scope.POPOVER       = $scope.popover       != true  ? false : true // Temporariamente fica FALSE como padrão. Assim que arrumar trazer como TRUE
				$scope.ENDERECO      = $scope.endereco      != true  ? false : true
				$scope.LINK          = $scope.link          != false ? true  : false
				$scope.ID            = $scope.id            != false ? true  : false
				$scope.BADGE         = $scope.badge         != false ? true  : false
				$scope.CPF_CNPJ      = $scope.cpfcnpj       != false ? true  : false

				$scope.idResumo = 'rc' + Math.floor(Math.random() * 10000)

				$scope.adicionarImovel = function(resolve) {
					arrecModal.openOld('gerenciador-cadastros/pessoas/contribuintes/contribuintes-modal.html', $rootScope, resolve, 'xxl', 'ContribuintesModalCtrl');
				};
				$scope.editarContribuinte = function(registro) { arrecModal.openOld('gerenciador-cadastros/pessoas/contribuintes/contribuintes-modal.html', $rootScope, registro, 'xxl', 'ContribuintesModalCtrl') };

				var htmlImage = $scope.contribuinte.img != null ? '<div class="media-left"><img class="img-circle" src="' + $scope.contribuinte.img + '" width="40"></div>' : ''
				var cpfcnpj = $filter('bfMaskCpfCnpj')($scope.contribuinte.cpfcnpj)
				var htmlCpfcnpj = $scope.contribuinte.cpfcnpj ? '<small class="text-muted" title="CPF/CNPJ">'+ $filter('bfMaskCpfCnpj')(cpfcnpj) + '</small>' : ''
				var htmlTelefone = (angular.isArray($scope.contribuinte.telefones) && $scope.contribuinte.telefones.length) ? '<span class="badge badge-default">' + $filter('bfMaskPhone')($scope.contribuinte.telefones[0].numero) + '</span>' : ''
				var htmlVinculos = function() {
					var vinculos = ''
					var lineBreak = false

					if($scope.contribuinte.vinculos.cart       ) { vinculos += '<span class="badge badge-default">Cartório</span>'   ; lineBreak = true }
					if($scope.contribuinte.vinculos.contador   ) { vinculos += '<span class="badge badge-default">Contador</span>'   ; lineBreak = true }
					if($scope.contribuinte.vinculos.fiscal     ) { vinculos += '<span class="badge badge-default">Fiscal</span>'     ; lineBreak = true }
					if($scope.contribuinte.vinculos.imobiliaria) { vinculos += '<span class="badge badge-default">Imobiliária</span>'; lineBreak = true }
					lineBreak ? vinculos = '<hr class="mTop5 mBottom5">' + vinculos : ''
					return vinculos
				}

				const contentPopover = `
					<div class="media mBottom5">
						${htmlImage}
						<div class="media-body">
							<h5 class="media-heading">${$scope.contribuinte.nome}</h5>
							${htmlCpfcnpj}
						</div>
					</div>
					<hr class="mTop5 mBottom5">
					<div><small class="text-muted">${EnderecosService.resumido($scope.contribuinte.endereco)}</small></div>
					${htmlTelefone}
					${htmlVinculos()}
					<div class="text-right">
						<button class="btn btn-default btn-xs" id="ed${$scope.idResumo}"><i class="fa fa-fw fa-pencil"></i> Editar</button>
					</div>
				`;

				if ($scope.POPOVER) {
					setTimeout(function() {
						$("#" + $scope.idResumo).popover({
							trigger: "manual",
							html: true,
							// delay: { show: 500, hide: 300 },
							content: contentPopover,
							animation: false
						})
						  .on("mouseenter", function() {
							var _this = this;
							$(this).popover("show");
							$("#ed" + $scope.idResumo).on('click', function() { arrecModal.open('cadastros/pessoas/contribuintes/contribuintes-modal-novo.html', $rootScope, $scope.contribuinte, 'xxl', 'ContribuintesModalCtrl') } )
							$(".popover").on("mouseleave", function() {
								$(_this).popover('hide');
							});
						  }).on("mouseleave", function() {
							var _this = this;
							setTimeout(function() {
							  if (!$(".popover:hover").length) {
								$(_this).popover("hide");
							  }
							}, 300);
						  });
					}, 200)
				} else {
					//Colocar editar aqui
				}
			}
		}
	})
	.controller('ContribuintesCtrl', ['$rootScope', '$scope', 'arrecadacao.common.ModalCad', '$state', '$stateParams', 'ContribuintesService', 'ENUMS',
		function($rootScope, $scope, ModalCad, $state, $stateParams, ContribuintesService, ENUMS) {
			var vm = $scope;

			vm.contribuintes = $rootScope.contribuintes;
			vm.enderecoCompleto = ENUMS.ENDERECOCOMPLETO;
			vm.qualificacoes = ENUMS.QUALIFICACOES;
			
			vm.adicionar = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/contribuintes-modal.html', resolve);
			};
			
			vm.addEndereco = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/endereco/endereco-modal.html', resolve);
			};
			
			vm.addTelefone = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/telefone/telefone-modal.html', resolve);
			};
			
			vm.addEmail = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/email/email-modal.html', resolve);
			};

			vm.editar = function(resolve) {
				if (resolve.contribuinte.tipoPessoa == 'Física') {
					$state.go('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.dados-pessoais',{contribuinte: resolve.contribuinte.id});
				} else {
					$state.go('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.dados-gerais',{contribuinte: resolve.contribuinte.id});
				}
			};

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'ContribuintesModalCtrl as ContribuintesModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.contribuinte = _.find(
				vm.contribuintes, {codigo: Number($stateParams.contribuinte)}
			)
			
			vm.graficas = [
				{ contribuinte:'Ramon Vieira Viquetti', cpfCnpj:'16.573.858/9453-50', liberada: 'Não' },
				{ contribuinte:'Marciano Buzzanello'  , cpfCnpj:'83.429.727/1375-02', liberada: 'Sim' },
			]

			vm.openLiberacao = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/grafica/liberar-grafica.html', resolve);
			};

			vm.removerGrafica = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/grafica/remover-grafica.html', resolve);
			};
		}
	])
	.controller('ContribuintesModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params',
		function($scope, ModalCad, params) {
			var vm = $scope;
			vm.grafica = params.contribuinte;
			vm.isEditing = params.isEditing;
			vm.tipoSelecionado = params.tipoSelecionado;
			vm.contribuinteEdit = params.contribuinteEdit;
		}
	])
})();