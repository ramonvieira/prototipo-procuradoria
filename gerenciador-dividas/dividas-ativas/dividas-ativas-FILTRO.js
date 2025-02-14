(function() {

	angular.module('app')
	.service('faixaValoresService', function($rootScope, storage, $filter) {
		$rootScope.serviceDb('dividasFiltrosFILTRO')
		// ------------------------------------------------------
		// Faixa de valores
		// ------------------------------------------------------
		{
			var valoresPadraoSistema = [1000, 10000, 20000]

			var valores = storage.check('faixasValores', valoresPadraoSistema);

			function _setValoresDescription(faixas) {
				valores = storage.check('faixasValores', valoresPadraoSistema);
				faixas = !faixas ? valores : faixas
				var VALORES = []
				faixas.forEach((val, index) => {
					var VALOR = $filter('currency')(val)
					var DESC =	index == 0 ? 'Até ' + VALOR : 'De ' + $filter('currency')(faixas[index-1] + 0.01) + ' até ' + VALOR
				
					VALORES.push({id: index, descricao: DESC, valor: val})
					
					if(index == faixas.length-1) {
						VALORES.push({id: index, descricao: 'Acima de ' + VALOR, valor: val})
					}
				})

				return VALORES
			}

			function _salvarFaixas(faixas) {
				storage.setJson('faixasValores', faixas);
				_setValoresDescription(faixas)
			}
			function _checkValores() {
				return storage.check('faixasValores', valoresPadraoSistema);
			}
		}
		return {
			valores             : _checkValores         ,
			valoresPadraoSistema: valoresPadraoSistema  ,
			valoresDescription  : _setValoresDescription,
			salvarFaixas        : _salvarFaixas         ,
		}
	})
	.directive('optionsDividasAtivas', function() {
		return {
			restrict: 'E',
			template: `
				<div class="btn-group" uib-dropdown dropdown-append-to-body>
					<a href="" class="btn btn-link btn-xs dropdown-toggle" title="Outras opções" uib-dropdown-toggle keep-open>
						<i class="fa fa-fw fa-ellipsis-v"></i>
					</a>
					<ul class="dropdown-menu dropdown-menu-right" uib-dropdown-menu>
						<li><a href="">Emitir certidão</a></li>
						<li><a href="">Executar</a></li>
						<li><a href="">Protestar</a></li>
						<li><a href="">Assinar</a></li>
						<li><a href="">Visualizar certidão</a></li>
						<li><a href="">Visualizar petição</a></li>
						<li><a href="">Emitir guia</a></li>
						<li><a href="">Enviar ao tribunal</a></li>
						<li><a href="">Ajustar controle????????</a></li>
						<li><a href="" ng-click="cancelaExecucao({})">Cancelar execução</a></li>
						<li ng-if="!divida.assinado"><a href="" ng-click="assinar({})">Assinar digitalmente</a></li>
					</ul>
				</div>
			`,
			scope: {
				dividas          : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope) {
				var vm = $scope
			},
		}
	})
	.directive('dividasAtivasLista', function() {
		return {
			restrict: 'E',
			templateUrl: 'gerenciador-dividas/dividas-ativas/dividas-ativas-FILTRO-lista.html',
			scope: {
				dividas          : '=' ,
				showContribuinte : '=' ,
				showAno          : '=' ,
				showCredito      : '=' ,
				showReferente    : '=' ,
				showInscricao    : '=' ,
				showCertidao     : '=' ,
				showProtesto     : '=' ,
				showPeticao      : '=' ,
				showVencimento   : '=' ,
				showInfo         : '=' ,
				showTotal        : '=' ,
				showOptions      : '=' ,
				showPaginacao    : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope) {
				var vm = $scope
				vm.SHOW_CONTRIBUINTE = vm.showContribuinte != false ? true : false
				vm.SHOW_ANO          = vm.showAno          != false ? true : false
				vm.SHOW_CREDITO      = vm.showCredito      != false ? true : false
				vm.SHOW_REFERENTE    = vm.showReferente    != false ? true : false
				vm.SHOW_INSCRICAO    = vm.showInscricao    != false ? true : false
				vm.SHOW_CERTIDAO     = vm.showCertidao     != false ? true : false
				vm.SHOW_PROTESTO     = vm.showProtesto     != false ? true : false
				vm.SHOW_PETICAO      = vm.showPeticao      != false ? true : false
				vm.SHOW_VENCIMENTO   = vm.showVencimento   != false ? true : false
				vm.SHOW_INFO         = vm.showInfo         != false ? true : false
				vm.SHOW_TOTAL        = vm.showTotal        != false ? true : false
				vm.SHOW_OPTIONS      = vm.showOptions      != false ? true : false
				vm.SHOW_PAGINACAO    = vm.showPaginacao    != false ? true : false
			},
		}
	})
	.directive('agrupadorAno', function() {
		return {
			restrict: 'E',
			template: `
				<div class="group-list" ng-repeat="ano in anos">
					<div class="group-heading" data-ng-class="{open:group}" data-ng-click="group=!group">
						<div class="bth-checkbox">
							<input id="checkbox" type="checkbox" keep-open>
							<label for="checkbox">&nbsp;</label>
						</div>
						<div class="group-title">
							<div class="row">
								<div class="col-md-5">
									<div class="group-title-header">
										<div class="ellipsis" title="{{ano.ano}}">
											<strong ng-if="principal">{{ano.ano}}</strong>
											<span ng-if="!principal">{{ano.ano}}</span>
										</div>
									</div>
								</div>
								<div class="col-md-3 text-right">
									<span ng-if="principal">{{ano.qtdDividas}} dívida{{ano.qtdDividas > 1 ? 's' : ''}}</span>
									<small ng-if="!principal">{{ano.qtdDividas}} dívida{{ano.qtdDividas > 1 ? 's' : ''}}</small>
								</div>
								<div class="col-md-3 text-right">
									<simula-calculo item="ano" show-icon="false" />
								</div>
								<div class="col-md-1 text-right">
									<options-dividas-ativas />
								</div>
							</div>
						</div>
					</div>
					<div class="group-list-itens" uib-collapse="!group">
						<dividas-ativas-lista dividas="ano.dividas" show-credito="false" />
					</div>
				</div>
				<arrec-pagination small="principal ? false : true" show-total="false" show-paginas="false" ng-if="SHOW_PAGINACAO && anos.length > 20" />
			`,
			scope: {
				anos           : '=' ,
				showPaginacao  : '=' ,
				principal : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope) {
				var vm = $scope
				vm.SHOW_PAGINACAO = vm.showPaginacao != false ? true : false
			},
		}
	})
	.directive('agrupadorCredito', function() {
		return {
			restrict: 'E',
			template: `
				<div class="group-list" ng-repeat="credito in creditos">
					<div class="group-heading" data-ng-class="{open:group}" data-ng-click="group=!group">
						<div class="bth-checkbox">
							<input id="checkbox" type="checkbox" keep-open>
							<label for="checkbox">&nbsp;</label>
						</div>
						<div class="group-title">
							<div class="row">
								<div class="col-md-5">
									<div class="group-title-header">
										<div class="ellipsis" title="{{credito.credito | creditos}}">
											<strong ng-if="principal"><credito-tributario credito="credito.credito" /></strong>
											<span ng-if="!principal"><credito-tributario credito="credito.credito" /></span>
										</div>
									</div>
								</div>
								<div class="col-md-3 text-right">
									<span ng-if="principal">{{credito.qtdDividas}} dívida{{credito.qtdDividas > 1 ? 's' : ''}}</span>
									<small ng-if="!principal">{{credito.qtdDividas}} dívida{{credito.qtdDividas > 1 ? 's' : ''}}</small>
								</div>
								<div class="col-md-3 text-right">
									<simula-calculo item="credito" />
								</div>
								<div class="col-md-1 text-right">
									<options-dividas-ativas />
								</div>
							</div>
						</div>
					</div>
					<div class="group-list-itens" uib-collapse="!group">
						<dividas-ativas-lista dividas="credito.dividas" show-credito="false" />
					</div>
				</div>
				<arrec-pagination small="principal ? false : true" show-total="false" show-paginas="false" ng-if="SHOW_PAGINACAO && creditos.length > 20" />
			`,
			scope: {
				creditos      : '=' ,
				showPaginacao : '=' ,
				principal     : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope) {
				var vm = $scope
				vm.SHOW_PAGINACAO = vm.showPaginacao != false ? true : false
			},
		}
	})
	.directive('agrupadorContribuinte', function() {
		return {
			restrict: 'E',
			template: `
				<div class="group-list" ng-repeat="contribuinte in contribuintes">
					<div class="group-heading" data-ng-class="{open:group}" data-ng-click="group=!group">
						<div class="bth-checkbox">
							<input id="checkbox" type="checkbox" keep-open>
							<label for="checkbox">&nbsp;</label>
						</div>
						<div class="group-title">
							<div class="row">
								<div class="col-md-5">
									<div class="group-title-header">
										<div class="ellipsis" title="{{contribuinte.contribuinte | contribuintes}}">
											<strong ng-if="principal"><trib-pessoas-description referente="contribuinte.contribuinte" /></strong>
											<span ng-if="!principal"><trib-pessoas-description referente="contribuinte.contribuinte" /></span>
										</div>
									</div>
								</div>
								<div class="col-md-3 text-right">
									<span>{{contribuinte.qtdDividas}} dívida{{contribuinte.qtdDividas > 1 ? 's' : ''}}</span>
								</div>
								<div class="col-md-3 text-right">
									<simula-calculo item="contribuinte" />
								</div>
								<div class="col-md-1 text-right">
									<options-dividas-ativas />
								</div>
							</div>
						</div>
					</div>
					<div class="group-list-itens" uib-collapse="!group">
						<dividas-ativas-lista dividas="contribuinte.dividas" show-contribuinte="false" />
					</div>
				</div>
				<arrec-pagination small="principal ? false : true" show-total="false" show-paginas="false" ng-if="SHOW_PAGINACAO && contribuintes.length > 20" />
			`,
			scope: {
				contribuintes  : '=' ,
				showPaginacao  : '=' ,
				principal : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope) {
				var vm = $scope
				vm.SHOW_PAGINACAO = vm.showPaginacao != false ? true : false
			},
		}
	})
	.directive('agrupadorFaixaValor', function() {
		return {
			restrict: 'E',
			template: `
				<div class="group-list" ng-repeat="faixa in faixas">
					<div class="group-heading hover-visibility" data-ng-class="{open:group}" data-ng-click="group=!group">
						<div class="bth-checkbox">
							<input id="checkbox" type="checkbox" keep-open>
							<label for="checkbox">&nbsp;</label>
						</div>
						<div class="group-title">
							<div class="row">
								<div class="col-md-6">
									<div class="group-title-header">
										<div class="ellipsis" title="{{faixa.descricao}}">
											<strong>{{faixa.descricao}}</strong> <botao-faixa-valor class="btn btn-link btn-xs hover-visibility-child" agrupamento="agrupamento"><i class="fa fa-fw fa-pencil"></i></botao-faixa-valor>
										</div>
									</div>
								</div>
								<div class="col-md-2 text-right">
									<span>{{faixa.qtdDividas == 0 ? 'Nenhuma dívida' : faixa.qtdDividas == 1 ? '1 dívida' : faixa.qtdDividas + ' dívidas'}}</span>
								</div>
								<div class="col-md-3 text-right">
									<simula-calculo item="faixa" ng-if="faixa.qtdDividas > 0" />
								</div>
								<div class="col-md-1 text-right">
									<options-dividas-ativas />
								</div>
							</div>
						</div>
					</div>
					<div class="group-list-itens" uib-collapse="!group">
						<h4 class="text-center" ng-if="!faixa.qtdDividas">Não há dívidas nessa faixa de valores por aqui</h4>
						<dividas-ativas-lista dividas="faixa.dividas" show-credito="false" ng-if="faixa.qtdDividas" />
					</div>
				</div>
				<arrec-pagination small="principal ? false : true" show-total="false" show-paginas="false" ng-if="SHOW_PAGINACAO && faixas.length > 20" />
			`,
			scope: {
				faixas        : '=' ,
				showPaginacao : '=' ,
				principal     : '=' ,
				agrupamento   : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope, arrecModal, faixaValoresService) {
				var vm = $scope
				vm.SHOW_PAGINACAO = vm.showPaginacao != false ? true : false
			},
		}
	})
	.directive('agrupadorValorCredito', function() {
		return {
			restrict: 'E',
			template: `
				<div class="group-list" ng-repeat="faixa in faixas">
					<div class="group-heading hover-visibility" data-ng-class="{open:group}" data-ng-click="group=!group">
						<div class="bth-checkbox">
							<input id="checkbox" type="checkbox" keep-open>
							<label for="checkbox">&nbsp;</label>
						</div>
						<div class="group-title">
							<div class="row">
								<div class="col-md-6">
									<div class="group-title-header">
										<div class="ellipsis" title="{{faixa.descricao}}">
											<strong>{{faixa.descricao}}</strong> <botao-faixa-valor class="btn btn-link btn-xs hover-visibility-child" agrupamento="agrupamento"><i class="fa fa-fw fa-pencil"></i></botao-faixa-valor>
										</div>
									</div>
								</div>
								<div class="col-md-2 text-right">
									<span>{{faixa.qtdDividas == 0 ? 'Nenhuma dívida' : faixa.qtdDividas == 1 ? '1 dívida' : faixa.qtdDividas + ' dívidas'}}</span>
								</div>
								<div class="col-md-3 text-right">
									<simula-calculo item="faixa" ng-if="faixa.qtdDividas > 0" />
								</div>
								<div class="col-md-1 text-right">
									<options-dividas-ativas />
								</div>
							</div>
						</div>
					</div>
					<div class="group-list-itens" uib-collapse="!group">
					<h4 class="text-center" ng-if="!faixa.qtdDividas">Não há dívidas nessa faixa de valores por aqui</h4>
						<agrupador-credito creditos="faixa.creditos" principal="false" ng-if="faixa.qtdDividas" />
					</div>
				</div>
				<arrec-pagination small="principal ? false : true" show-total="false" show-paginas="false" ng-if="SHOW_PAGINACAO && faixas.length > 20" />
			`,
			scope: {
				faixas        : '=' ,
				showPaginacao : '=' ,
				principal     : '=' ,
				agrupamento   : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope, arrecModal, faixaValoresService) {
				var vm = $scope
				vm.SHOW_PAGINACAO = vm.showPaginacao != false ? true : false
			},
		}
	})
	.directive('agrupadorCreditoAno', function() {
		return {
			restrict: 'E',
			template: `
				<div class="group-list" ng-repeat="credito in creditos">
					<div class="group-heading" data-ng-class="{open:group}" data-ng-click="group=!group">
						<div class="bth-checkbox">
							<input id="checkbox" type="checkbox" keep-open>
							<label for="checkbox">&nbsp;</label>
						</div>
						<div class="group-title">
							<div class="row">
								<div class="col-md-5">
									<div class="group-title-header">
										<div class="ellipsis" title="{{credito.credito | creditos}}">
											<strong><credito-tributario credito="credito.credito" /></strong>
										</div>
									</div>
								</div>
								<div class="col-md-3 text-right">
									<span>{{credito.qtdDividas}} dívida{{credito.qtdDividas > 1 ? 's' : ''}}</span>
								</div>
								<div class="col-md-3 text-right">
									<simula-calculo item="credito" />
								</div>
								<div class="col-md-1 text-right">
									<options-dividas-ativas />
								</div>
							</div>
						</div>
					</div>
					<div class="group-list-itens" uib-collapse="!group">
						<agrupador-ano anos="credito.anos" />
					</div>
				</div>
				<arrec-pagination small="false" show-total="false" show-paginas="false" ng-if="SHOW_PAGINACAO && creditos.length > 20" />
			`,
			scope: {
				creditos       : '=' ,
				showPaginacao  : '=' ,
			},
			transclude: true,
			replace: false,
			controller: function ($scope) {
				var vm = $scope
				
				console.log(vm.creditos);
				vm.SHOW_PAGINACAO = vm.showPaginacao != false ? true : false
			},
		}
	})
	.directive('botaoFaixaValor', function() {
		return {
			restrict: 'E',
			template: `
				<a href="" ng-class="CLASSES" class="{{ngDisabled ? 'link-disabled' : ''}}" ng-click="configFaixaValor({})" title="Edita a faixa de valores" keep-open>
					<span ng-transclude></span> {{LABEL}}
				</a>
			`,
			scope: {
				classes     : "@?" ,
				label       : "@?" ,
				ngDisabled  : "="  ,
				agrupamento : "="  ,
			},
			transclude: true,
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				vm.configFaixaValor = function() {
					arrecModal.open('gerenciador-dividas/dividas-ativas/configurar-valores-FILTRO-modal.html', $scope, {}, '', 'configFaixaValorModalCtrl')
				}

				vm.setValor = function(faixas) {
					vm.agrupamento.setValor(faixas)
				}

				vm.LABEL   = vm.label == undefined ? '' : vm.label
				vm.CLASSES = vm.classes
			},
		}
	})
	.directive('faixaValoresSelect', function() {
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

		function SelectCtrl($scope, faixaValoresService) {
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
					results: faixaValoresService.valoresDescription(),
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
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
					return item.descricao
				},
				formatSelection: function(item) {
					return item.descricao
				},
			}
		}
	})
	.controller('dividasAtivasFiltroCtrl', ['$rootScope', '$scope', 'arrecadacao.common.ModalCad', 'arrecModal', 'ENUMS', 'certidoesService', 'peticoesService', '$filter', '$timeout', 'storage', 'lancamentosService', 'db', 'promiseTracker', 'dividasFiltrosService', 'CreditosTributariosService', 'ContribuintesService', 'faixaValoresService', 'fullFilterService',
		function($rootScope, $scope, ModalCad, arrecModal, ENUMS, certidoesService, peticoesService, $filter, $timeout, storage, lancamentosService, db, promiseTracker, dividasFiltrosService, CreditosTributariosService, ContribuintesService, faixaValoresService, fullFilterService) {
			var vm = $scope;

			var today = new Date();
			vm.anoAtual = today.getFullYear()
			vm.anos=[];

			for (let i = 0; i < 6; i++) {
				vm.anos.push({descricao:vm.anoAtual-i})
			}

			dividas = [
				{ numDivida: 2969, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 96400.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 1498, data:  0   }, certidao: { numero: 5847, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: true  , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 2969, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 96400.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 9801, data:  0   }, certidao: { numero: 5847, data: 0    , emitindoCertidao: true , assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4681, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 15519.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 8865, data:  0   }, certidao: { numero: null, data: null , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 6602, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 96400.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 5179, data:  0   }, certidao: { numero: 8231, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 3538, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 15519.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 5153, data:  0   }, certidao: { numero: 3421, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 5800, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 24857.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 1894, data:  0   }, certidao: { numero: 9250, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4592, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 79690.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 6946, data:  0   }, certidao: { numero: null, data: null , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 6388, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 86774.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 3780, data:  0   }, certidao: { numero: 1715, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 8165, data: 0    , peticionando: true, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4592, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 83628.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 6663, data:  0   }, certidao: { numero: null, data: null , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 7031, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 46053.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 2383, data:  0   }, certidao: { numero: 9060, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 6741, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 99180.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 9318, data:  0   }, certidao: { numero: 7906, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 5733, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 14789.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 8545, data:  0   }, certidao: { numero: 4683, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 5468, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 12665.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 8545, data:  0   }, certidao: { numero: 4646, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4230, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 78538.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 4426, data:  0   }, certidao: { numero: 4114, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 9775, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 56188.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 1556, data:  0   }, certidao: { numero: 4113, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 6674, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 62939.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 8169, data:  0   }, certidao: { numero: 2496, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 7177, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 26493.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 4268, data:  0   }, certidao: { numero: 8709, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 7364, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 79209.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 5633, data:  0   }, certidao: { numero: 7946, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 3294, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 71671.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 6388, data:  0   }, certidao: { numero: 5923, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 3811, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 90858.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 3439, data:  0   }, certidao: { numero: 5841, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 7323, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 60536.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 5577, data:  0   }, certidao: { numero: 6459, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4289, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 93064.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 1243, data:  0   }, certidao: { numero: 8604, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 1558, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 65032.3  , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 2619, data:  0   }, certidao: { numero: null, data: null , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 3977, parcela: 1, situacao: 0, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2017, valor: 17482.79 , referente: 17 , dataInscr: '15/11/2017', inscricao: { numero: 6503, data:  0   }, certidao: { numero: 7483, data: 0    , emitindoCertidao: false, assinatura: { assinado: true  , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: true  , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 3458, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2022, valor: 45666.44 , referente: 1  , dataInscr: '15/11/2022', inscricao: { numero: 2135, data:  0   }, certidao: { numero: 8835, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 2703, data: 0    , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 8482, data: 0    , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 7536, parcela: 1, situacao: 1, credito: 9, tipoReferente: 'IMOVEIS'       , ano: 2016, valor: 28110.9  , referente: 11 , dataInscr: '15/11/2016', inscricao: { numero: 3006, data: -100 }, certidao: { numero: 9189, data: -100 , emitindoCertidao: false, assinatura: { assinado: true  , tipo: 'P7S' } }, protesto : { numero: 4982, data: -100 , assinatura : { assinado: true  , tipo: 'P7S' } } , peticao: { numero: 5959, data: -100 , peticionando: false, assinatura: { assinado: true , tipo: 'P7S' } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 9913, parcela: 1, situacao: 4, credito: 4, tipoReferente: 'ECONOMICOS'    , ano: 2021, valor: 826.17   , referente: 14 , dataInscr: '15/11/2021', inscricao: { numero: 6120, data: -320 }, certidao: { numero: null, data: null , emitindoCertidao: false, assinatura: { assinado: null  , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: true , erroExec  : false, notific: 1234 },
				{ numDivida: 5086, parcela: 1, situacao: 4, credito: 5, tipoReferente: 'CONTRIBUINTES' , ano: 2021, valor: 343.1    , referente: 13 , dataInscr: '15/11/2021', inscricao: { numero: 2934, data: -368 }, certidao: { numero: 2593, data: -368 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 3031, data: -368 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 6706, data: -368 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 1713, parcela: 1, situacao: 1, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2021, valor: 383.1    , referente: 6  , dataInscr: '15/11/2021', inscricao: { numero: 2683, data: -710 }, certidao: { numero: 4477, data: -710 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 8980, data: -710 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 9922, data: -710 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : true , notific: null },
				{ numDivida: 2246, parcela: 1, situacao: 0, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2016, valor: 89452.38 , referente: 16 , dataInscr: '15/11/2016', inscricao: { numero: 9784, data:  0   }, certidao: { numero: 8711, data: 0    , emitindoCertidao: false, assinatura: { assinado: true  , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 1923, data: 0    , peticionando: false, assinatura: { assinado: true , tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 9367, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2019, valor: 7681.35  , referente: 10 , dataInscr: '15/11/2019', inscricao: { numero: 4526, data:  0   }, certidao: { numero: 2497, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 9157, data: 0    , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4149, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2020, valor: 9047.65  , referente: 10 , dataInscr: '15/11/2020', inscricao: { numero: 3257, data:  0   }, certidao: { numero: 7857, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 1967, data: 0    , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 5191, parcela: 1, situacao: 4, credito: 4, tipoReferente: 'ECONOMICOS'    , ano: 2016, valor: 8854.72  , referente: 17 , dataInscr: '15/11/2016', inscricao: { numero: 5713, data: -320 }, certidao: { numero: 6576, data: -320 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 2561, data: -320 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 3128, data: -320 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: true , erroExec  : false, notific: 1234 },
				{ numDivida: 4530, parcela: 1, situacao: 1, credito: 9, tipoReferente: 'IMOVEIS'       , ano: 2020, valor: 1540.36  , referente: 2  , dataInscr: '15/11/2020', inscricao: { numero: 4592, data: -100 }, certidao: { numero: 1775, data: -100 , emitindoCertidao: false, assinatura: { assinado: true  , tipo: 'P7S' } }, protesto : { numero: 7438, data: -100 , assinatura : { assinado: true  , tipo: 'P7S' } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 1513, parcela: 1, situacao: 1, credito: 9, tipoReferente: 'IMOVEIS'       , ano: 2016, valor: 1925.6   , referente: 17 , dataInscr: '15/11/2016', inscricao: { numero: 2931, data: -100 }, certidao: { numero: 5693, data: -100 , emitindoCertidao: false, assinatura: { assinado: true  , tipo: 'P7S' } }, protesto : { numero: 6699, data: -100 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 3673, data: -100 , peticionando: false, assinatura: { assinado: true , tipo: 'P7S' } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 4530, parcela: 1, situacao: 1, credito: 9, tipoReferente: 'IMOVEIS'       , ano: 2020, valor: 34077.51 , referente: 2  , dataInscr: '15/11/2020', inscricao: { numero: 5781, data: -100 }, certidao: { numero: 1775, data: -100 , emitindoCertidao: false, assinatura: { assinado: true  , tipo: 'P7S' } }, protesto : { numero: 7438, data: -100 , assinatura : { assinado: true  , tipo: 'P7S' } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 1513, parcela: 1, situacao: 1, credito: 9, tipoReferente: 'IMOVEIS'       , ano: 2016, valor: 23529.67 , referente: 17 , dataInscr: '15/11/2016', inscricao: { numero: 8518, data: -100 }, certidao: { numero: 5693, data: -100 , emitindoCertidao: false, assinatura: { assinado: true  , tipo: 'P7S' } }, protesto : { numero: 6699, data: -100 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 3673, data: -100 , peticionando: false, assinatura: { assinado: true , tipo: 'P7S' } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 6323, parcela: 1, situacao: 4, credito: 5, tipoReferente: 'ECONOMICOS'    , ano: 2021, valor: 61.71    , referente: 7  , dataInscr: '15/11/2021', inscricao: { numero: 5951, data: -368 }, certidao: { numero: 6802, data: -368 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 6224, data: -368 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 1636, data: -368 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 2736, parcela: 1, situacao: 1, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2017, valor: 96687.11 , referente: 7  , dataInscr: '15/11/2017', inscricao: { numero: 9983, data: -710 }, certidao: { numero: 5057, data: -710 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 4832, data: -710 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 7315, data: -710 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : true , notific: null },
				{ numDivida: 2836, parcela: 1, situacao: 1, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2017, valor: 20687.90 , referente: 7  , dataInscr: '15/11/2017', inscricao: { numero: 5856, data: -710 }, certidao: { numero: 5057, data: -710 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 1572, data: -710 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 6033, data: -710 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : true , notific: null },
				{ numDivida: 7367, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2022, valor: 23425.11 , referente: 4  , dataInscr: '15/11/2022', inscricao: { numero: 7645, data:  0   }, certidao: { numero: 7304, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 3977, parcela: 1, situacao: 0, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2017, valor: 6712.70  , referente: 17 , dataInscr: '15/11/2017', inscricao: { numero: 9958, data:  0   }, certidao: { numero: 7483, data: 0    , emitindoCertidao: false, assinatura: { assinado: true  , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 9851, data: 0    , peticionando: false, assinatura: { assinado: true , tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 5191, parcela: 1, situacao: 4, credito: 4, tipoReferente: 'ECONOMICOS'    , ano: 2016, valor: 90000.00 , referente: 17 , dataInscr: '15/11/2016', inscricao: { numero: 1612, data: -320 }, certidao: { numero: 6576, data: -320 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 2561, data: -320 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 3128, data: -320 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: true , erroExec  : false, notific: 1234 },
				{ numDivida: 3458, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2022, valor: 90000.01 , referente: 1  , dataInscr: '15/11/2022', inscricao: { numero: 5598, data:  0   }, certidao: { numero: 8835, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 3487, data: 0    , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 2333, data: 0    , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 9913, parcela: 1, situacao: 4, credito: 4, tipoReferente: 'ECONOMICOS'    , ano: 2021, valor: 2.8      , referente: 14 , dataInscr: '15/11/2021', inscricao: { numero: 1766, data: -320 }, certidao: { numero: null, data: null , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: null, data: null , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: true , erroExec  : false, notific: 1234 },
				{ numDivida: 5086, parcela: 1, situacao: 4, credito: 5, tipoReferente: 'CONTRIBUINTES' , ano: 2021, valor: 904.40   , referente: 13 , dataInscr: '15/11/2021', inscricao: { numero: 5717, data: -368 }, certidao: { numero: 2593, data: -368 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 3031, data: -368 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 6706, data: -368 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 1713, parcela: 1, situacao: 1, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2021, valor: 674.66   , referente: 6  , dataInscr: '15/11/2021', inscricao: { numero: 2832, data: -710 }, certidao: { numero: 4477, data: -710 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 8980, data: -710 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 9922, data: -710 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : true , notific: null },
				{ numDivida: 2836, parcela: 1, situacao: 1, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2017, valor: 4791.44  , referente: 7  , dataInscr: '15/11/2017', inscricao: { numero: 5109, data: -710 }, certidao: { numero: 5057, data: -710 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 7057, data: -710 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 2766, data: -710 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : true , notific: null },
				{ numDivida: 2246, parcela: 1, situacao: 0, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2016, valor: 80482.16 , referente: 16 , dataInscr: '15/11/2016', inscricao: { numero: 4381, data:  0   }, certidao: { numero: 8711, data: 0    , emitindoCertidao: false, assinatura: { assinado: true  , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 1923, data: 0    , peticionando: false, assinatura: { assinado: true , tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 9367, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2019, valor: 78425.33 , referente: 10 , dataInscr: '15/11/2019', inscricao: { numero: 6875, data:  0   }, certidao: { numero: 2497, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 9157, data: 0    , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 4149, parcela: 1, situacao: 3, credito: 3, tipoReferente: 'CONTRIBUINTES' , ano: 2020, valor: 50849.97 , referente: 10 , dataInscr: '15/11/2020', inscricao: { numero: 7778, data:  0   }, certidao: { numero: 7857, data: 0    , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: null, data: null , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 1967, data: 0    , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: true , erroProt: false, erroExect : false, notific: null },
				{ numDivida: 7536, parcela: 1, situacao: 1, credito: 9, tipoReferente: 'IMOVEIS'       , ano: 2016, valor: 43657.60 , referente: 11 , dataInscr: '15/11/2016', inscricao: { numero: 7833, data: -100 }, certidao: { numero: 9189, data: -100 , emitindoCertidao: false, assinatura: { assinado: true  , tipo: 'P7S' } }, protesto : { numero: 2290, data: -100 , assinatura : { assinado: true  , tipo: 'P7S' } } , peticao: { numero: 4963, data: -100 , peticionando: false, assinatura: { assinado: true , tipo: 'P7S' } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 6323, parcela: 1, situacao: 4, credito: 5, tipoReferente: 'ECONOMICOS'    , ano: 2021, valor: 170.26   , referente: 7  , dataInscr: '15/11/2021', inscricao: { numero: 7903, data: -368 }, certidao: { numero: 6802, data: -368 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 6224, data: -368 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 1636, data: -368 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : false, notific: null },
				{ numDivida: 2736, parcela: 1, situacao: 1, credito: 3, tipoReferente: 'ECONOMICOS'    , ano: 2017, valor: 19098.0  , referente: 7  , dataInscr: '15/11/2017', inscricao: { numero: 1711, data: -710 }, certidao: { numero: 5057, data: -710 , emitindoCertidao: false, assinatura: { assinado: false , tipo: null  } }, protesto : { numero: 5323, data: -710 , assinatura : { assinado: false , tipo: null  } } , peticao: { numero: 4132, data: -710 , peticionando: false, assinatura: { assinado: false, tipo: null  } } , erroCert: false, erroProt: false, erroExec  : true , notific: null },
			];

			dividas.forEach(divida => {
				divida.CERTIDAO = divida.certidao ? true : false
				divida.PROTESTADA = divida.protesto ? true : false
				divida.PETICIONADA = divida.peticao ? true : false
			})
			dividas.sort((a,b) => a.numDivida - b.numDivida)

			// ------------------------------------------------------
			// Dívidas por contribuinte
			// ------------------------------------------------------
			{
				function agruparPorContribuinte(dividas) {
					return _.chain(dividas)
						.groupBy('referente')
						.map(function(dividas, referente) {
							var val = 0;
							_.forEach(dividas, function(value, key) {
								val += dividas[key].valor;
							})
							return {
								contribuinte: referente,
								dividas: dividas,
								total: val,
								qtdDividas: dividas.length
							};
						}, 0)
						.value();
				}
				vm.dividasPorContribuinte = agruparPorContribuinte(dividas)
				// console.log('dividasPorContribuinte', vm.dividasPorContribuinte);
			}

			// ------------------------------------------------------
			// Dívidas por crédito
			// ------------------------------------------------------
			{
				function agruparPorCredito(dividas) {
					return _.chain(dividas)
						.groupBy('credito')
						.map(function(dividas, credito) {
							var val = 0;
							_.forEach(dividas, function(value, key) {
								val += dividas[key].valor;
							})
							return {
								credito: credito,
								dividas: dividas,
								total: val,
								qtdDividas: dividas.length
							};
						}, 0)
						.value();
				}
				vm.dividasPorCredito = agruparPorCredito(dividas)
				// console.log('dividasPorCredito', vm.dividasPorCredito);
			}

			// ------------------------------------------------------
			// Dívidas por ano
			// ------------------------------------------------------
			{
				function agruparPorAno(dividas) {
					return _.chain(dividas)
						.groupBy('ano')
						.map(function(dividas, ano) {
							var val = 0;
							_.forEach(dividas, function(value, key) {
								val += dividas[key].valor;
							})
							return {
								ano: ano,
								dividas: dividas,
								total: val,
								qtdDividas: dividas.length
							};
						}, 0)
					.value();
				}
				vm.dividasPorAno = agruparPorAno(dividas)
				// console.log('dividasPorAno', vm.dividasPorAno);
			}

			// ------------------------------------------------------
			// Dívidas por valor
			// ------------------------------------------------------
			{
				function agruparPorValor(dividas) {
					var FAIXAS = faixaValoresService.valoresDescription()
					FAIXAS.forEach((faixa, index) => {
						faixa.total = 0;
						faixa.dividas = dividas.filter(divida => {
							if(index == 0) {
								return divida.valor < faixa.valor
							} else if(index+1 == FAIXAS.length) {
								return divida.valor > faixa.valor
							} else {
								return divida.valor > FAIXAS[index-1].valor && divida.valor <= FAIXAS[index].valor
							}
						})

						faixa.total = faixa.dividas
							.map(divida => divida.valor)
							.reduce(function(acumulado, valor) {
								return acumulado + valor
							}, 0)
					})
					return FAIXAS
				}
				vm.dividasPorValor = agruparPorValor(dividas)
				// console.log('dividasPorValor', vm.dividasPorValor);
			}

			// ------------------------------------------------------
			// Dívidas por crédito/ano
			// ------------------------------------------------------
			{
				function agruparPorCreditoAno(dividas) {
					return angular.copy(
						vm.dividasPorCredito.map(credito => {
							credito.anos = agruparPorAno(credito.dividas)
							credito.qtdDividas = credito.dividas.length
							return credito
						})
					)
				}

				vm.dividasPorCreditoAno = agruparPorCreditoAno(vm.dividasPorCredito)
				// console.log('vm.dividasPorCreditoAno', vm.dividasPorCreditoAno);
			}
			
			// ------------------------------------------------------
			// Dívidas por valor/crédito
			// ------------------------------------------------------
			{
				function agruparPorValorCredito(dividas) {
					return angular.copy(
						vm.dividasPorValor.map(faixa => {
							faixa.creditos = agruparPorCredito(faixa.dividas)
							faixa.qtdDividas = faixa.dividas.length
							return faixa
						})
					)
				}

				vm.dividasPorValorCredito = agruparPorValorCredito(vm.dividasPorValorCredito)
				// console.log('vm.dividasPorValorCredito', vm.dividasPorValorCredito);
			}

			vm.dividasObj = {
				dividas: dividas,
				filtro: {
					filtrando: false,
					loadingFiltro: promiseTracker(),
					fecharFiltro: false,
					carregando: false,
					salvos: '',
					filtrado: [],
					adicionar: function() {
						
					},
					adicionarUsado: function(tipoDoc) {
						
					},
					adicionarDisponivel: function(tipoDoc) {
					},
					excluir: function(filtro) {
						this.limpar()
						db.delete('dividasFiltrosFILTRO', filtro)
					},
					verificarUso: function(tipoDoc, usar) {
	
					},
					compactaFiltros: function(filtro) {
						
					},
					restauraFiltros: function(filtroSalvo) {
						
					},
					salvarNovo: function(filtro, TAB, TEMP) {
						arrecModal.open('gerenciador-dividas/dividas-ativas/dividas-ativas-FILTRO-nomear-modal.html', $scope, filtro, 'xs', 'dividasAtivasNovaModalNomearFILTROCtrl')
					},
					salvarFiltro: function(filtro) {
						filtro = filtro == undefined ? this.filtroSalvoAtivo : filtro
						console.log('salvarFiltro filtro', filtro);
						console.log('filtro.id', filtro.id);
						console.log('filtro.id != undefined', filtro.id != undefined);
						var USANDO_FILTRO_SALVO = filtro.id != undefined
						console.log('USANDO_FILTRO_SALVO', USANDO_FILTRO_SALVO);
						// return
						// console.log('this.filtroSalvoAtivo', this.filtroSalvoAtivo);

						delete filtro.dadosFiltro.active

						if(USANDO_FILTRO_SALVO) {
							var FILTRO = angular.copy({id: filtro.id, dadosFiltro: filtro.dadosFiltro, campo: this.campo})
						} else {
							var FILTRO = angular.copy({dadosFiltro: filtro.dadosFiltro, campo: this.campo})
						}
						// FILTRO.campo.avancado.forEach(avanc => delete avanc.sub)
						console.log('FILTRO', FILTRO);
						db.push('dividasFiltrosFILTRO', FILTRO)
						this.set(FILTRO)
						
						this.filtroSalvoModificado = false
					},
					set: function(filtro) {
						console.log(filtro);
						this.maisFiltros = filtro.campo.avancado && filtro.campo.avancado.length
						
						this.limpar()
						this.filtrosSalvos.forEach(salvo => {
							salvo.dadosFiltro.active = salvo.dadosFiltro.descricao === filtro.dadosFiltro.descricao ? true : false
						})

						this.filtroSalvoAtivo = angular.copy(filtro)
						this.campo = {}
						this.campo = filtro.campo
					},
					renomear: function(filtro) {
						arrecModal.open('gerenciador-dividas/dividas-ativas/dividas-ativas-FILTRO-nomear-modal.html', $scope, filtro, 'xs', 'dividasAtivasNovaModalNomearFILTROCtrl')
					},
					limpar: function() {
						this.filtrando = false
						this.fecharFiltro = false
						this.campo = {}
						this.campo.avancado = {}
						this.salvos = ''
						this.carregando = true
						this.filtroSalvoAtivo = null
						this.filtroSalvoModificado = false
						this.filtrosSalvos.forEach(salvo => {
							salvo.dadosFiltro.active = false
						})

						$timeout(() => {
							this.carregando = false
						}, 200);
					},
					pesquisar: function(campos) {
						this.filtrado = []
						const keys = Object.keys(campos)
						const values = Object.values(campos)
						
						keys.forEach((key, idx) => {
							this.filtrado.push(
								{ campo: keys[idx], valor: values[idx]}
							)
						})

						this.loadingFiltro.addPromise($timeout(function(){}, 2000));

						this.filtrando = true
						this.fecharFiltro = true
						vm.check.all = false
					},
					filtrosSalvos: $rootScope.dividasFiltrosFILTRO,
					filtroSalvoAtivo: null,
					filtroSalvoModificado: false,
					filtroSalvoModificadoDescartar: function() {
						this.campo = angular.copy(this.filtroSalvoAtivo.campo)
					}
				}
			}

			vm.situacoesDividasCertidao = certidoesService.situacaoDividasCertidao.filter(situacao => situacao.key != 'INCONSISTENTE')

			// ------------------------------------------------------
			// Valida o filtro
			// ------------------------------------------------------
			{
				isValidValue = function(obj) {
					// Verifica se o campo 'value' existe no objeto
					
					if (obj == undefined || !obj.hasOwnProperty('value')) {
						return false;
					}
	
					const value = obj.value;
	
					// Verifica se 'value' é uma string válida
					if (typeof value === 'string' && value.trim() !== '') {
						return true;
					}
	
					// Verifica se 'value' é um objeto e não está vazio
					if (typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length > 0) {
						return true;
					}
	
					// Verifica se 'value' é um array e tem pelo menos um item
					if (Array.isArray(value) && value.length > 0) {
						return true;
					}
	
					// Qualquer outro caso é considerado inválido
					return false;
				}
	
				$scope.$watch('dividasObj.filtro.campo', (newValue, oldValue) => {
					// console.log(vm.dividasObj.filtro.filtroSalvoAtivo);

					if(vm.dividasObj.filtro.filtroSalvoAtivo) {
						if(angular.equals(newValue, vm.dividasObj.filtro.filtroSalvoAtivo.campo)) {
							// console.log('é igual');
							// console.log(newValue, vm.dividasObj.filtro.filtroSalvoAtivo.campo);
							vm.dividasObj.filtro.filtroSalvoModificado = false
						} else {
							// console.log('Mudou');
							// console.log(newValue, vm.dividasObj.filtro.filtroSalvoAtivo.campo);
							vm.dividasObj.filtro.filtroSalvoModificado = true
						}
					}
					
					if(newValue) {
						vm.HAS_FILTER = !Object.keys(newValue).every(campo => {
							var teste = true
							if(campo === 'avancado' && newValue[campo].length) {
								newValue[campo].forEach(avanc => {
									isValidValue(avanc.selected) ? teste = false : null
								})
							} else {
								if(newValue[campo] != null && newValue[campo].length) { teste = false }
							}
							
							return teste
						})
					}
				}, true)
			}

			// ------------------------------------------------------
			// Agrupamento
			// ------------------------------------------------------
			{
				vm.agrupamento = {
					grupos: [
						{ id: 1, key: 'NAO_AGRUPADO' , descricao: 'Não agrupado'    },
						{ id: 2, key: 'CREDITO_ANO'  , descricao: 'Crédito e ano'   },
						{ id: 3, key: 'VALOR_CREDITO', descricao: 'Valor e crédito' },
						{ id: 4, key: 'FAIXAVALOR'   , descricao: 'Valor'           },
						{ id: 5, key: 'CONTRIBUINTE' , descricao: 'Contribuinte'    },
					],
					setGrupo: function(groupDiv) {
						if(groupDiv != undefined) {
							storage.setJson('agruparDividasFILTRO', groupDiv)
						}

						this.agrupadoPor = storage.check('agruparDividasFILTRO', vm.agrupamento.grupos.find(gp => gp.key == 'CREDITO_ANO'))

						var faixasValores = faixaValoresService.valoresDescription()
						
						if (this.agrupadoPor.key == 'ANO_CREDITO') {
							vm.level1 = vm.anos;
							vm.level2 = CreditosTributariosService.creditos;
							vm.level3 = faixasValores;
						} else if (this.agrupadoPor.key == 'VALOR_CREDITO') {
							vm.level1 = faixasValores;
							vm.level2 = CreditosTributariosService.creditos;
						} else if(this.agrupadoPor.key == 'CONTRIBUINTE') {
							vm.level1 = ContribuintesService.contribuintes;
							vm.level2 = vm.anos;
						} else if(this.agrupadoPor.key == 'FAIXAVALOR') {
							vm.level1 = faixasValores;
						} else if(this.agrupadoPor.key == 'CREDITO_ANO') {
							vm.level1 = CreditosTributariosService.creditos;
							vm.level2 = vm.anos;
						} else {
							vm.level1 = ContribuintesService.contribuintes;
						}
		
						vm.DOCUMENTOS_FILTRADOS = vm.level1
					},
					setValor: function(faixa) {
						vm.dividasPorContribuinte = agruparPorContribuinte(dividas)
						vm.dividasPorCredito = agruparPorCredito(dividas)
						vm.dividasPorAno = agruparPorAno(dividas)
						vm.dividasPorValor = agruparPorValor(dividas)
						vm.dividasPorCreditoAno = agruparPorCreditoAno(vm.dividasPorCredito)
						vm.dividasPorValorCredito = agruparPorValorCredito(vm.dividasPorValorCredito)

						this.setGrupo(vm.agrupamento.agrupadoPor)
						if(this.agrupadoPor.key == 'VALOR_CREDITO' || this.agrupadoPor.key == 'FAIXAVALOR') {
							this.loadingGrupo.addPromise($timeout(function(){}, 2000));
						}
					},
					loadingGrupo: promiseTracker()
				}

				vm.agrupamento.setGrupo(vm.agrupamento.agrupadoPor)
			}

			// ------------------------------------------------------
			// Check all
			// ------------------------------------------------------
			vm.check = {
				all: false,
				qtdSelecionadas: 0,
				qtdVisivel: vm.DOCUMENTOS_FILTRADOS.length,
				qtdDisponivel: vm.DOCUMENTOS_FILTRADOS.length + 360,
				setAllVisivel: function(checkall) {
					vm.DOCUMENTOS_FILTRADOS.forEach(doc => doc.checked = checkall)
					this.qtdSelecionadas = checkall ? vm.DOCUMENTOS_FILTRADOS.length : 0
					this.all = checkall
					vm.HAS_DOC_SELECTED = this.all
				},
				setAll: function(checkall) {
					vm.DOCUMENTOS_FILTRADOS.forEach(doc => doc.checked = checkall )
					this.qtdSelecionadas = checkall ? this.qtdDisponivel : 0
					this.all = checkall
					vm.HAS_DOC_SELECTED = this.all
				},
				setItem: function() {
					vm.check.all = vm.DOCUMENTOS_FILTRADOS.every(doc => doc.checked )
					this.qtdSelecionadas = vm.DOCUMENTOS_FILTRADOS.filter(doc => doc.checked).length
					vm.HAS_DOC_SELECTED = this.qtdSelecionadas > 0
				}
			}
		}
	])
	.controller('dividasAtivasNovaModalNomearFILTROCtrl', ['$scope', 'arrecModal', '$modalInstance',
		function($scope, arrecModal, $modalInstance) {
			var vm = $scope

			vm.filtro = angular.copy($modalInstance.params)
			console.log('filtroModal', vm.filtro);
			
			if(_.isEmpty(vm.filtro)) {
				vm.filtro = {
					dadosFiltro: {}
				}
			} else {
				// vm.dadosFiltro = vm.filtro.dadosFiltro
			}
			
			vm.salvar = function() {
				console.log('filtroModal', vm.filtro);
				vm.$parent.dividasObj.filtro.salvarFiltro(vm.filtro)
				$modalInstance.close()
			}
		}
	])
	.controller('configFaixaValorModalCtrl', ['$scope', 'arrecModal', '$modalInstance', 'faixaValoresService',
		function($scope, arrecModal, $modalInstance, faixaValoresService) {
			var vm = $scope
			vm.isPadrao = null

			vm.registro.faixas = faixaValoresService.valores().map(valor => ({valor: valor}))
			
			function checkIsPadrao() {
				vm.isPadrao = JSON.stringify(
					vm.registro.faixas	.map(faixa => faixa.valor)
										.sort((a, b) => a-b)) === JSON.stringify(faixaValoresService.valoresPadraoSistema)
			}
			
			vm.excluirValores = function(index) {
				vm.registro.faixas.splice(index, 1)
				$scope.form.$setDirty()
			}

			vm.hasErrorGeral = false

			$scope.$watch('registro.faixas', function(newVal, oldVal) {
				vm.hasErrorGeral = false
				newVal.map(val => {
					val.isZero = val.valor == 0 ? true : false
					val.isZero ? vm.hasErrorGeral = true : null
					!val.valor ? vm.hasErrorGeral = true : false

					if(val.valor !== undefined) {
						val.hasError = newVal.filter(existVal => existVal.valor == val.valor).length > 1 ? true : false
					}
					if (val.hasError) {
						vm.hasErrorGeral = true
					}
				})
				checkIsPadrao()
			}, true)

			vm.restaurar = function() {
				vm.registro.faixas = faixaValoresService.valoresPadraoSistema.map(valor => ({valor: valor}))
				$scope.form.$setDirty()
			}
			vm.salvar = function(faixas) {
				faixas = faixas
					.map(faixa => faixa.valor)
					.sort((a, b) => a-b)

				faixaValoresService.salvarFaixas(faixas)
				vm.$parent.setValor(faixas)

				$modalInstance.close()
			}
		}
	])
})();