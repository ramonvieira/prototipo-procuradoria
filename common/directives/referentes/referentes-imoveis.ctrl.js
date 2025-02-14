(function () {
	angular.module('app')
	.service('ImoveisService', function($rootScope, ENUMS, db, $filter, lancamentosService) {
		$rootScope.serviceDb('imoveis')
		$rootScope.situacaoImovel = ENUMS.SITUACAO_IMOVEL

		$rootScope.imoveis.map((imovel, index) => {
			imovel.edificacoesTotal = 0
			imovel.obras = []
			imovel.debitos = []
			imovel.dividas = []
			imovel.PENDENCIAS_FINANCEIRAS = false


			if (imovel.edificacoes) {
				imovel.edificacoes.map(edificacao => {
					imovel.edificacoesTotal += parseInt(edificacao.area)
					imovel.valor.venalConstruido += edificacao.valor.venal
				})
			}
			imovel.valor.venal = imovel.valor.venalConstruido + imovel.valor.venalTerrit


			// imoveisEmObras.forEach(imov => {
			// 	if(imov.imovel == imovel.id) {
			// 		imovel.obras.push(imov.obra)
			// 	}
			// })

			imovel.proprietarios.forEach(prop => {
				if(prop.resp) {
					imovel.proprietarioPrincipal = prop
				}
			})
			
			//Verifica débitos do imóvel
			lancamentosService.debitos.forEach(debito => {
				var vinculo = $filter('vinculosCreditosTributarios')($filter('creditos')(debito.credito, 'vinculo'), 'key')
				if((vinculo == 'IMOVEIS' || vinculo == 'TRANSF_IMOVEIS') && debito.referente.ref == imovel.id) {
					imovel.debitos.push(debito)
					debito.vencido ? imovel.PENDENCIAS_FINANCEIRAS = true : null
				}
			})
			
			//Verifica dívidas do imóvel
			lancamentosService.dividas.forEach(divida => {
				var vinculo = $filter('vinculosCreditosTributarios')($filter('creditos')(divida.credito, 'vinculo'), 'key')

				if((vinculo == 'IMOVEIS' || vinculo == 'TRANSF_IMOVEIS') && divida.referente.ref == imovel.id) {
					//Do antigo proprietário
					if (!divida.referente.relativo) {
						imovel.pendenciaAntigoPropr = true
					}

					imovel.dividas.push(divida)
				}
			})

			imovel.dividas.length ? imovel.PENDENCIAS_FINANCEIRAS = true : null

			if(imovel.id == 1) {
				imovel.historico = [
					
					{ tipo: 'AVERBACAO', dataHora: '08-26-2018 11:15', user: 1, color: ''                       , icon: 'fa-flag', alteracoes: [
						{ campo: 'Averbação', processo: '123456', averbacao: 'Averbação de teste' },
					]},
					{ tipo: 'COMENTARIO', dataHora: '11-24-2023 11:07', alteracao: '08-26-2018 09:58', user: 1, color: ''  , icon: 'fa-comment', alteracoes: [
						{ campo: 'Comentário', processo: '123456', comentario: 'Comentário de teste' },
					]}
				]
			}

			//Englobamento
			if(imovel.englobado && imovel.englobado.length) {
				imovel.englobado.map(englob => {
					var ENGLOBADO = $rootScope.imoveis.find(imov => imov.id == englob)
					ENGLOBADO.imovelPrincipal = imovel.id
				})
			}
		})

	})
	.filter('imoveis', function($filter, ImoveisService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'imoveis', selector ? selector : 'id')
		}
	})
	.filter('inscricaoImobiliaria', function($sce, ImoveisService) {
		return function(input, selector) {
			var config = ['Zona','Setor','Quadra','Lote']
			var obj = ''
			input.map((item, key) => {
				obj += '<span title="'+config[key]+'">'+ item +'</span>' + (key+1 < config.length ? '.' : '')
			})
			return $sce.trustAsHtml(obj)
		}
	})
	.directive('inscricaoImobiliaria', function($sce, ImoveisService) {
		return {
			restrict: "E",
			template: '<span ng-bind-html="ContentHTML"></span>',
			replace: true,
			scope: {
				inscricao: "="
			},
			controller: function($scope, $sce) {
				var config = ['Zona','Setor','Quadra','Lote']
				
				var title = config.toString().replace(/,/ig, '-')

				var inscr = ''
				$scope.inscricao.map((item, key) => {
					inscr += item + (key+1 < config.length ? '.' : '')
				})
				var html = '<span title="'+ title +'">'+inscr+'</span>'
				$scope.ContentHTML = $sce.trustAsHtml(html)
			}
		}
	})
	.directive('imoveisComponent', function() {
		return {
			restrict: 'E',
			template:	`
					<span>
						<span ng-show="HAS_REFERENTE" ng-class="{'show' : BLOCK}">
							<span ng-class="{'badge badge-default' : BADGE}" keep-open title="{{RESUMO}}">
								<!--Com Link-->
								<a href="" ng-if="LINK" ng-click="editarImovel(imovel)">Imóvel {{imovel.id}}</a>
								<!-- Sem link-->
								<span ng-if="!LINK">Imóvel {{imovel.id}}</span>
								<!-- Situação-->
								<small>
									{{imovel.situacao == 'Inativo' && SHOW_SITUACAO ? '(DESATIVADO)' : ''}} 
									<!-- Englobamentos-->
									<a href="" ng-if="imovel.englobado.length && ENGLOBAMENTOS && englobamentosAction != 'LANCAMENTOS'" uib-popover-template="'imobiliario/imoveis/popover-imoveisComponent-englobados.html'" popover-append-to-body="true" popover-trigger="'focus'" popover-placement="bottom" popover-class="big-popover" keep-open>
										<small>({{imovel.englobado.length}} englobado{{imovel.englobado.length > 1 ? "s" : ""}})</small>
									</a> 
									<a href="" ng-if="imovel.englobado.length && ENGLOBAMENTOS && englobamentosAction == 'LANCAMENTOS'" ng-click="actionEnglobamentos()" keep-open>
										<small>({{imovel.englobado.length}} englobado{{imovel.englobado.length > 1 ? "s" : ""}})</small>
									</a> 
								</small>
							</span> 

							<!-- Proprietário-->
							{{!BADGE && PROPRIETARIO ? ' - ' : ''}} <a href="" ng-if="PROPRIETARIO" title="Proprietário responsável" ng-click="editarContribuinte(contribuinte)" keep-open>
								{{contribuinte.nome}}
							</a>
							
							<!-- + Proprietários-->
							<strong ng-if="PROPRIETARIO && imovel.proprietarios.length > 1" class="pointer popover-active tx__gray--d10" title="Proprietário(s)" data-bf-popover="'imobiliario/imoveis/popover-proprietarios.html'" data-placement="right" bf-popover-size="med-popover" keep-open>+{{imovel.proprietarios.length}} <i class="fa fa-user"></i></strong> 
							
							<!-- Inscrição imobiliária-->
							<small class="text-muted" ng-if="INSC_IMOB">(<inscricao-imobiliaria inscricao="imovel.inscImob" />)</small>
							
							<!-- Endereço-->
							<br ng-show="WRAP && ENDERECO" />
							{{ENDERECO ? (WRAP ? "" : " - ") : ""}}<endereco ng-if="ENDERECO" endereco="imovel.endereco" completo="ENDERECO_COMPLETO" condominio="imovel.endereco[7] != null ? imovel.endereco[7] : null"></endereco>
						</span>
						<span ng-show="!HAS_REFERENTE">---</span>
					</span>
			`,
			required: 'ngModel',
			replace: true,
			scope: {
				class               : '@?',
				link                : '=' ,
				inscImob            : '=' ,
				referente           : '=' ,
				endereco            : '=' ,
				proprietario        : '=' ,
				block               : '=' ,
				wrap                : '=' ,
				badge               : '=' ,
				englobamentos       : '=' ,
				englobamentosAction : '@?',
				showSituacao        : '=' ,
			},
			controller: function($rootScope, $scope, $filter, arrecModal) {
				// Necessário passar somente o ID do referente
				if($scope.referente != null) {
					$scope.imovel        = $filter('imoveis')($scope.referente, 'object')
					$scope.contribuinte  = $filter('contribuintes')($scope.imovel.proprietarios[0].proprietario, 'object')
					$scope.RESUMO = 'Imóvel ' + $scope.imovel.id + ' - ' + $scope.contribuinte.nome + ' - ' + $filter('endereco')($scope.imovel.endereco)
					
					$scope.LINK               = $scope.link             != false ? true  : false
					$scope.INSC_IMOB          = $scope.inscImob         != false ? true  : false
					$scope.PROPRIETARIO       = $scope.proprietario     != false ? true  : false
					$scope.ENDERECO           = $scope.endereco         != false ? true  : false
					$scope.BLOCK              = $scope.block            != true  ? false : true
					$scope.WRAP               = $scope.wrap             != true  ? false : true
					$scope.BADGE              = $scope.badge            != false ? true  : false
					$scope.ENGLOBAMENTOS      = $scope.englobamentos    != false ? true  : false
					$scope.SHOW_SITUACAO      = $scope.showSituacao     != false ? true  : false
				}

				
				$scope.HAS_REFERENTE          = $scope.referente == null || $scope.referente == undefined || $scope.referente == ''  ? false : true

				$scope.actionEnglobamentos = function() {
					if($scope.englobamentosAction == 'LANCAMENTOS') {
						var registro = {}
						arrecModal.open('financeiro/debitos/lancamentos-imoveis-englobados-modal.html', $scope, registro, 'lg', 'ImoveisModalCtrl')
					} else {
					}
				}

				$scope.adicionarImovel = function(resolve) {
					console.log(resolve);
					
					resolve.tipoCadastro = 'IMOVEL'
					arrecModal.open('gerenciador-cadastros/pessoas/referentes/referentes-modal.html', $scope, resolve, 'sm', 'ReferentesModalCtrl');
				};
				$scope.editarImovel = function(registro) { $scope.adicionarImovel(registro) };
				$scope.editarContribuinte = function(registro) { arrecModal.open('cadastros/pessoas/contribuintes/contribuintes-modal.html', $rootScope, registro, 'xxl', 'ContribuintesModalCtrl') };
			}
		}
	})
})();