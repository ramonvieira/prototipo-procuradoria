(function () {
	angular.module('app')
	.filter('responsavelDoReferente', function($filter) {
		return function(credito, referente, selector) {
			selector = selector ? selector : 'id'
			var resp = null
			var vincCred = $filter('vinculoCredito')(credito, 'key')
			
			if(vincCred == 'CONTRIBUINTES') {
				resp = $filter('contribuintes')(referente, selector)
			} else if(vincCred == 'IMOVEIS') {
				var proprietarioPrincipal = $filter('imoveis')(referente, 'proprietarioPrincipal').proprietario
				resp = $filter('contribuintes')(proprietarioPrincipal, selector)
			} else if(vincCred == 'ECONOMICOS') {
				var respons = $filter('economicos')(referente, 'propriet')
				resp = $filter('contribuintes')(respons, selector)
			} else if(vincCred == 'AUTOS_INFRACAO') {
				var respons = $filter('autoInfracao')(referente, 'contribuinte')
				resp = $filter('contribuintes')(respons, selector)
			} else if(vincCred == 'RECEITAS_DIVERSAS') {
				var respons = $filter('autoInfracao')(referente, 'contribuinte')
				resp = $filter('contribuintes')(respons, selector)
			} else if(vincCred == 'CONTRIB_MELHORIA') {
				var particicipantes = []
				$filter('contribuicoesMelhorias')(referente, 'imoveisParticipantes').forEach(imovel => {
					particicipantes.push($filter('imoveis')(imovel.imovel, 'proprietarioPrincipal').proprietario)
				})
				if(selector != 'id') {
					particicipantes.forEach((part,	 idx) => {
						particicipantes[idx] = $filter('contribuintes')(part, selector)
					})
				}
				resp = particicipantes
			} else if(vincCred == 'PROJETOS') {
				var imovel = $filter('obras')(referente, 'imovel')
				var proprietarioPrincipal = imovel ? $filter('imoveis')(imovel, 'proprietarioPrincipal').proprietario : null
				resp = proprietarioPrincipal ? $filter('contribuintes')(proprietarioPrincipal, selector) : null
			} else if(vincCred == 'PARCELAMENTOS') {
				var respons = $filter('parcelamentos')(referente, 'contribuinte')
				resp = $filter('contribuintes')(respons, selector)
			} else if(vincCred == 'TRANSF_IMOVEIS') {
				var particicipantes = []
				$filter('transferencia')(referente, 'imoveisTransf').forEach(imovel => {
					particicipantes.push($filter('imoveis')(imovel.imovel, 'proprietarioPrincipal').proprietario)
				})

				if(selector != 'id') {
					particicipantes.forEach((part, idx) => {
						particicipantes[idx] = $filter('contribuintes')(part, selector)
					})
				}
				resp = particicipantes
			} else if(vincCred == 'NOTA_FISCAL_AVULSA') {
				// TODO - Criar lista de notas avulsas
				resp = $filter('contribuintes')(1, selector)
			}
			return resp
		}
	})
	.directive('referente', function() {
		return {
			restrict: 'E',
			template: `
				<span>
					<trib-pessoas-description  ng-if="vincCred == 'CONTRIBUINTES'"      badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP" id="ID" status="STATUS" referente="referente" badge="false" endereco="endereco"></trib-pessoas-description>
					<economicos-component      ng-if="vincCred == 'ECONOMICOS'"         badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP" id="ID" status="STATUS" referente="referente" badge="false" endereco="endereco"></economicos-component>
					<imoveis-component         ng-if="vincCred == 'IMOVEIS'"            badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" badge="false" endereco="endereco" proprietario="proprietario" insc-imob="inscImob" englobamentos="englobamentos" englobamentos-action="{{englobamentosAction}}" />
					<auto-de-infracao          ng-if="vincCred == 'AUTOS_INFRACAO'"     badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" vinculo="vinculo"></auto-de-infracao>
					<notificacao-iss           ng-if="vincCred == 'NOTIFICACAO_ISS'"    badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" vinculo="vinculo"></notificacao-iss>
					<receita-diversa           ng-if="vincCred == 'RECEITAS_DIVERSAS'"  badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" vinculo="vinculo"></receita-diversa>
					<contribuicao-melhoria     ng-if="vincCred == 'CONTRIB_MELHORIA'"   badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" vinculo="vinculo" />
					<obra                      ng-if="vincCred == 'PROJETOS'"           badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" vinculo="vinculo"></obra>
					<transferencia             ng-if="vincCred == 'TRANSF_IMOVEIS'"     badge="BADGE" block="BLOCK" link="LINK" wrap="WRAP"         status="STATUS" referente="referente" vinculo="vinculo"></transferencia>
					<span                      ng-if="vincCred == 'NOTA_FISCAL_AVULSA'" class="badge badge-default"><a href="" uib-popover-template="'cadastros/financeiro/notas-avulsas/notas-avulsas-detalhes-popover.html'" popover-append-to-body="true" popover-trigger="'outsideClick'" popover-popup-delay="500" popover-placement="top" popover-class="med-popover" keep-open>Nota avulsa 36/A</i></a></span>
					<span                      ng-if="vincCred == 'TX_PROTOCOLO'"       class="badge badge-default"><a href="" keep-open>Taxa 123456</a></span>
				</span>
			`,
			replace: false,
			scope: {
				credito              : '=' ,
				tipoReferente        : '=' ,
				referente            : '=' ,
				status               : '=' ,
				link                 : '=' ,
				block                : '=' ,
				wrap                 : '=' ,
				badge                : '=' ,
				id                   : '=' ,
				endereco             : '=' ,
				vinculo              : '=' ,
				//Imóveis
				proprietario         : '=' ,
				englobamentos        : '=' ,
				englobamentosAction  : '@?',
				inscImob             : '=' ,
			},
			controller: function($scope, $filter) {
				var vm = $scope
				$scope.LINK               = $scope.link         != false ? true  : false
				$scope.BLOCK              = $scope.block        != true  ? false : true
				$scope.WRAP               = $scope.wrap         != true  ? false : true
				$scope.BADGE              = $scope.badge        != false ? true  : false
				$scope.STATUS             = $scope.status       != false ? true  : false
				$scope.ID                 = $scope.id           != false ? true  : false

				function isValid(TIPO) {
					var VALIDOS = ['CONTRIBUINTES', 'ECONOMICOS', 'IMOVEIS', 'AUTOS_INFRACAO', 'NOTIFICACAO_ISS', 'RECEITAS_DIVERSAS', 'CONTRIB_MELHORIA', 'PROJETOS', 'TRANSF_IMOVEIS', 'NOTA_FISCAL_AVULSA', 'TX_PROTOCOLO']
					return VALIDOS.some(val => val == TIPO)
				}

				if (vm.credito && !vm.tipoReferente) {
					vm.vincCred = $filter('vinculoCredito')(vm.credito, 'key')
				}
				
				if (!vm.credito && vm.tipoReferente) {
					if(vm.tipoReferente == 'CONTRIBUINTE'      ) { vm.tipoReferente = 'CONTRIBUINTES'     }
					if(vm.tipoReferente == 'ECONOMICO'         ) { vm.tipoReferente = 'ECONOMICOS'        }
					if(vm.tipoReferente == 'IMOVEL'            ) { vm.tipoReferente = 'IMOVEIS'           }
					
					if(!isValid(vm.tipoReferente)) {
						console.error('tipoReferente informado não é válido. "' + vm.tipoReferente + '"')
						return
					}

					vm.vincCred = $filter('vinculosCreditosTributarios')(vm.tipoReferente, 'key')
				}
			},
		}
	})
	.directive('referentePorContribuinte', function() {
		return {
			restrict: 'E',
			template: `
				<span>
					<trib-pessoas-description ng-if="tipoReferente == 'ECONOMICOS' || tipoReferente == 'IMOVEIS'" referente="CONTRIBUINTE" badge="false" />
					<trib-pessoas-description ng-if="tipoReferente == 'CONTRIBUINTES'" referente="referente" badge="false" />
					<span ng-if="tipoReferente == 'ECONOMICOS' || tipoReferente == 'IMOVEIS'">
						<br ng-if="WRAP">
						<i class="fa fa-fw tx__gray--d20 {{WRAP ? 'fa-level-up fa-rotate-90' : 'fa-long-arrow-right'}}"></i>
						<economicos-component ng-if="tipoReferente == 'ECONOMICOS'" badge="false" link="true" wrap="WRAP" show-situacao="false" referente="referente" endereco="false" show-cpf-cnpj="false" />
						<imoveis-component    ng-if="tipoReferente == 'IMOVEIS'"    badge="false" link="true" wrap="WRAP" show-situacao="false" referente="referente" endereco="false" proprietario="false" insc-imob="false" englobamentos="false" show-situacao="false" />
					</span>
				</span>
			`,
			replace: false,
			scope: {
				tipoReferente        : '=' ,
				referente            : '=' ,
				wrap                 : '=' ,
			},
			controller: function($scope, $filter) {
				var vm = $scope

				vm.LINK   = Boolean(vm.link)
				vm.WRAP   = Boolean(vm.wrap)
				vm.BADGE  = Boolean(vm.badge)
				vm.STATUS = Boolean(vm.status)

				vm.CONTRIBUINTE = vm.tipoReferente == 'IMOVEIS' ? $filter('imoveis')(vm.referente, 'proprietarioPrincipal').proprietario : $filter('economicos')(vm.referente, 'propriet')
			},
		}
	})
	.directive('referentesSelect', function() {
		return {
			restrict: 'E',
			require: 'ngModel',
			template: `
				<span>
					<pessoas-select                 label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'CONTRIBUINTES'"      ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></pessoas-select>
					<imoveis-select                 label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'IMOVEIS'"            ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></imoveis-select>
					<economicos-select              label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'ECONOMICOS'"         ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></economicos-select>
					<autos-de-infracao-select       label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'AUTOS_INFRACAO'"     ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></autos-de-infracao-select>
					<receitas-diversas-select       label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'RECEITAS_DIVERSAS'"  ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></receitas-diversas-select>
					<contribuicoes-melhorias-select label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'CONTRIB_MELHORIA'"   ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></contribuicoes-melhorias-select>
					<obras-select                   label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'PROJETOS'"           ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></obras-select>
					<parcelamentos-select           label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'PARCELAMENTOS'"      ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE"></parcelamentos-select>
					<transferencias-select          label="{{LABEL}}" ng-if="TIPO_REFERENTE == 'TRANSF_IMOVEIS'"     ng-disabled="ngDisabled" ng-model="ngModel" multiple="MULTIPLE" />
					<span ng-if="TIPO_REFERENTE == 'NOTA_FISCAL_AVULSA'">
						<label for="selNotaAvul">{{LABEL}}</label>
						<select class="form-control" bf-select2="{multiple:MULTIPLE}" ng-model="ngModel" ng-disabled="ngDisabled">
							<option value="{{$index+1}}" ng-repeat="nota in [].constructor(5) track by $index">Nota avulsa {{$index+1}}</option>
						</select>
					</span>
				</span>
			`,
			replace: true,
			scope: {
				ngModel       : '=' ,
				ngDisabled    : '=' ,
				credito       : '=' ,
				tipoReferente : '=' ,
				label         : '@?',
				multiple      : '=' ,
			},
			controller: function($scope, $filter) {
				
				$scope.$watch('tipoReferente', function(val, old){
					$scope.MULTIPLE = $scope.multiple
					$scope.LABEL = null;
					$scope.TIPO_REFERENTE = $filter('vinculosCreditosTributarios')(val, 'key')

					if(_.isEmpty($scope.label)) {
						if($scope.TIPO_REFERENTE == 'CONTRIBUINTES'      ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Contribuinte"             } else { $scope.LABEL = "Contribuinte(s)"                   }}
						if($scope.TIPO_REFERENTE == 'IMOVEIS'            ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Imóvel"                   } else { $scope.LABEL = "Imóvel(eis)"                       }}
						if($scope.TIPO_REFERENTE == 'ECONOMICOS'         ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Econômico"                } else { $scope.LABEL = "Econômico(s)"                      }}
						if($scope.TIPO_REFERENTE == 'AUTOS_INFRACAO'     ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Auto de infração"         } else { $scope.LABEL = "Auto(s) de infração"               }}
						if($scope.TIPO_REFERENTE == 'RECEITAS_DIVERSAS'  ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Receita diversa"          } else { $scope.LABEL = "Receita(s) diversa(s)"             }}
						if($scope.TIPO_REFERENTE == 'CONTRIB_MELHORIA'   ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Contribuição de melhoria" } else { $scope.LABEL = "Contribuição(ções) de melhoria(s)" }}
						if($scope.TIPO_REFERENTE == 'PROJETOS'           ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Obra"                     } else { $scope.LABEL = "Obra(s)"                           }}
						if($scope.TIPO_REFERENTE == 'PARCELAMENTOS'      ) { if(!$scope.MULTIPLE) { $scope.LABEL = "Parcelamento"             } else { $scope.LABEL = "Parcelamento(s)"                   }}
						if($scope.TIPO_REFERENTE == 'TRANSF_IMOVEIS'     ) { if(!$scope.MULTIPLE) { $scope.LABEL = 'Transferência de imóveis' } else { $scope.LABEL = 'Transferência(s) de imóveis'       }}
						if($scope.TIPO_REFERENTE == 'NOTA_FISCAL_AVULSA' ) { if(!$scope.MULTIPLE) { $scope.LABEL = 'Nota fiscal avulsa'       } else { $scope.LABEL = 'Nota(s) fiscal(is) avulsa(s)'      }}
					} else {
						$scope.LABEL = $scope.label
					}
				});

			},
		}
	})
})();