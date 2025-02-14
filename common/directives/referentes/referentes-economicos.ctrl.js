(function () {

	angular.module('app')
	.service('EconomicosService', function($rootScope, ImoveisService, db, $filter) {
		$rootScope.serviceDb('contribuintes')//Deixar isso aqui. ContribuintesService não está sendo chamado antes
		$rootScope.serviceDb('economicos')
		$rootScope.serviceDb('situacaoEconomico')
		$rootScope.serviceDb('portesEmpresa')
		$rootScope.serviceDb('qualificacoesNaturezasJuridicas')

		$rootScope.economicos.forEach(economico => {
			economico.ECONOMICOS_ATIVOS = $rootScope.economicos.filter(eco => eco.propriet == economico.propriet && (eco.status == 'INICIO' || eco.status == 'REINICIO' || eco.status == 'REGULAR')).length
			economico.TIPO_PESSOA = $rootScope.contribuintes.find(contrib => contrib.id == economico.propriet).tipoPessoa == 1 ? 'FISICA' : 'JURIDICA'
			
			//Imóveis do econômico
			economico.imoveis = []
			$rootScope.imoveis.forEach(imovel => {
				imovel.proprietarios.forEach(proprietario => {
					proprietario.proprietario == economico.id ? economico.imoveis.push(imovel) : null
				})
			})
		})
		
		function _salvar(registro, showNotifications) {
			if (!registro.id) {
				registro.statuses = [{ situacao: registro.status }]
			}

			registro.status = $filter('situacaoEconomico')(registro.statuses[registro.statuses.length-1].situacao, 'key')
	
			if(registro.imoveis && registro.imoveis.length) {
				var IMOVEIS = []
				registro.imoveis.forEach(imovel => {
					IMOVEIS.push(imovel.id)
				})
			}
	
			if(!registro.endereco) {
				registro.endereco = ["96203-386",30,1,"987",3,2,22,null,null,null,null,null,null,null,null,null,null,null,74,null,null]
			}
			
			registro.cpfcnpj = $filter('contribuintes')(registro.propriet, 'cpfcnpj')
	
			registro.imoveis = IMOVEIS
			registro.propriet = typeof registro.propriet == 'object' ? registro.propriet.id : registro.propriet

			if(!registro.habilitarENota && (registro.emails && registro.emails.length)) {
				registro.emails.forEach(email => {
					email.validado = false;
					email.aguardandoValidacao = false;
					email.enota = false;
				})
			}

			db.push('economicos', registro, showNotifications)
		}

		function _salvarSituacao(economico, novaSituacao) {
			economico.statuses.push(novaSituacao)
			_salvar(economico)
		}
		
		function _economicosDoEconomico(economico) {
			var ID_PROPRIETARIO = _.isObject(economico.propriet) ? economico.propriet.id : economico.propriet
			return this.economicos.filter(eco => eco.propriet == ID_PROPRIETARIO && (eco.status == 'INICIO' || eco.status == 'REINICIO' || eco.status == 'REGULAR'))
		}

		return {
			economicos                     : $rootScope.economicos                     ,
			situacaoEconomico              : $rootScope.situacaoEconomico              ,
			portesEmpresa                  : $rootScope.portesEmpresa                  ,
			qualificacoesNaturezasJuridicas: $rootScope.qualificacoesNaturezasJuridicas,
			economicosDoEconomico          : _economicosDoEconomico,
			salvar                         : _salvar,
			salvarSituacao                 : _salvarSituacao
		}
	})
	.filter('economicos', function($filter, EconomicosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'economicos', selector ? selector : 'razaoFantasia')
		}
	})
	.directive('economicosComponent', function() {
		return {
			restrict: 'E',
			template:	`
						<span ng-show="HAS_REFERENTE" ng-class="{'show' : !BLOCK}">
							<span ng-class="{'badge badge-default' : BADGE}"> 
								<!--Com Link-->
								<a href="" ng-if="LINK" ng-click="editarEconomico(economico)" title="{{RESUMO}}">
									Econômico {{economico.id}}
								</a>
								<!--Sem link-->
								<span ng-if="!LINK" title="{{RESUMO}}">
									Econômico {{economico.id}}
								</span>
								<!--Situação-->
								<small ng-if="SHOW_SITUACAO && (economico.status == 'SUSPENSO' || economico.status == 'IRREGULAR' || economico.status == 'BAIXADO' || economico.status == 'CANCELADO')">
									({{economico.status | situacaoEconomico}})
								</small>
							</span> 
							<!--CPF/CNPJ-->
							<small class="text-muted" title="CPF/CNPJ" ng-if="SHOW_CPF_CNPJ">({{economico.cpfcnpj | bfMaskCpfCnpj}})</small>
			
							<!--Endereço-->
							<br ng-show="WRAP && ENDERECO" />
							<endereco ng-if="ENDERECO" endereco="economico.endereco" completo="ENDERECO_COMPLETO" maps="ENDERECO_MAPS" />
					 	</span>
						 `,
			required: 'ngModel',
			replace: true,
			scope: {
				class            : '@?',
				link             : '=',
				referente        : '=' ,
				endereco         : '=',
				enderecoCompleto : '=',
				enderecoMaps     : '=',
				block            : '=',
				wrap             : '=',
				badge            : '=',
				showCpfCnpj      : '=',
				showSituacao     : '=' ,
			},
			controller: function($rootScope, $scope, $filter, arrecModal) {
				// Necessário passar somente o ID do referente
				if($scope.referente != null) {
					$scope.economico     = $filter('economicos')($scope.referente, 'object')
				}

				$scope.RESUMO = $scope.economico.id + ' - ' + $filter('contribuintes')($scope.economico.propriet) + ' (' + $scope.economico.cpfcnpj + ')'

				$scope.HAS_REFERENTE     = $scope.referente         == null    ? false : true
				$scope.LINK              = $scope.link              == false   ? false : true
				$scope.ENDERECO          = $scope.endereco          == false   ? false : true
				$scope.ENDERECO_COMPLETO = $scope.enderecoCompleto             ? true  : false
				$scope.ENDERECO_MAPS     = $scope.enderecoMaps      != true    ? false : true
				$scope.BLOCK             = $scope.block             == true    ? false : true
				$scope.WRAP              = $scope.wrap              != true    ? false : true
				$scope.BADGE             = $scope.badge             == false   ? false : true
				$scope.SHOW_CPF_CNPJ     = $scope.showCpfCnpj       != false   ? true  : false
				$scope.SHOW_SITUACAO      = $scope.showSituacao     != false   ? true  : false

				$scope.adicionarEconomico = function(resolve) { arrecModal.open('gerenciador-cadastros/pessoas/referentes/referentes-modal.html', $scope, resolve, 'sm', 'ReferentesModalCtrl') };
				$scope.editarEconomico = function(registro) { $scope.adicionarEconomico(registro) };
			}
		}
	})
	.filter('situacaoEconomico', function($filter, EconomicosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'situacaoEconomico', selector ? selector : 'descricao')
		}
	})
})();