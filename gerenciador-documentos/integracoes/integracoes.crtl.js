(function () {

	angular.module('app')
	.service('recebimentosService', function() {
		const prazo      = 20

		var tiposComunic  = [
			{ id: 1, descricao: 'Urgente'},
			{ id: 2, descricao: 'Citações'},
			{ id: 3, descricao: 'Visitas'},
			{ id: 4, descricao: 'Intimação'},
			{ id: 5, descricao: 'Pautas'}
		];
		var tiposPrazo   = [
			{ id: 1, descricao: 'Intimação'},
			{ id: 2, descricao: 'Aviso'},
			{ id: 3, descricao: 'Audiência'}
		];

		var recebimentos = [
			{ origem: 'TRIBUNAL' , numAviso: 2796, tipoComunic: tiposComunic[0] , executado: 14, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -1  , tipoPrazo: tiposPrazo[0] , receb: true  , resp: 1    , teor: 'Eu sunt proident elit ipsum proident do ea amet veniam voluptate nulla.'                                           },
			{ origem: 'TRIBUNAL' , numAviso: 8315, tipoComunic: tiposComunic[1] , executado: 10, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -1  , tipoPrazo: tiposPrazo[1] , receb: true  , resp: 1    , teor: 'Qui aute irure mollit reprehenderit dolore laborum dolore excepteur mollit anim ad.'                               },
			{ origem: 'TRIBUNAL' , numAviso: 5883, tipoComunic: tiposComunic[4] , executado: 15, processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -1  , tipoPrazo: tiposPrazo[2] , receb: true  , resp: 1    , teor: 'Enim pariatur excepteur irure exercitation officia enim aute consectetur.'                                         },
			{ origem: 'TRIBUNAL' , numAviso: 6964, tipoComunic: tiposComunic[2] , executado: 18, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -1  , tipoPrazo: tiposPrazo[0] , receb: true  , resp: 1    , teor: 'Anim qui nulla ad esse esse minim qui ut ex eiusmod exercitation.'                                                 },
			{ origem: 'TRIBUNAL' , numAviso: 5926, tipoComunic: tiposComunic[3] , executado: 13, processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -16 , tipoPrazo: tiposPrazo[1] , receb: true  , resp: 1    , teor: 'Cupidatat irure quis cillum veniam tempor id sunt fugiat fugiat in nisi.'                                          },
			{ origem: 'TRIBUNAL' , numAviso: 2565, tipoComunic: tiposComunic[0] , executado: 6 , processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -1  , tipoPrazo: tiposPrazo[2] , receb: false , resp: null , teor: 'Ullamco fugiat cupidatat est est adipisicing deserunt incididunt ad mollit magna nisi pariatur esse exercitation.' },
			{ origem: 'TRIBUNAL' , numAviso: 4458, tipoComunic: tiposComunic[0] , executado: 9 , processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -1  , tipoPrazo: tiposPrazo[0] , receb: true  , resp: 1    , teor: 'Exercitation proident in aliqua quis sit aliqua duis ea.'                                                          },
			{ origem: 'TRIBUNAL' , numAviso: 6547, tipoComunic: tiposComunic[0] , executado: 15, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -10 , tipoPrazo: tiposPrazo[1] , receb: true  , resp: null , teor: 'Anim laboris cupidatat ea cillum fugiat ad anim est deserunt.'                                                     },
			{ origem: 'TRIBUNAL' , numAviso: 1013, tipoComunic: tiposComunic[0] , executado: 7 , processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -10 , tipoPrazo: tiposPrazo[2] , receb: true  , resp: null , teor: 'Elit proident officia incididunt pariatur in.'                                                                     },
			{ origem: 'TRIBUNAL' , numAviso: 3576, tipoComunic: tiposComunic[0] , executado: 19, processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -10 , tipoPrazo: tiposPrazo[0] , receb: true  , resp: null , teor: 'Occaecat incididunt minim labore eu.'                                                                              },
			{ origem: 'TRIBUNAL' , numAviso: 7714, tipoComunic: tiposComunic[0] , executado: 9 , processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -10 , tipoPrazo: tiposPrazo[1] , receb: true  , resp: null , teor: 'Magna occaecat ad adipisicing deserunt nostrud elit esse id do ipsum quis.'                                        },
			{ origem: 'TRIBUNAL' , numAviso: 4167, tipoComunic: tiposComunic[0] , executado: 18, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -9  , tipoPrazo: tiposPrazo[2] , receb: true  , resp: null , teor: 'Laborum commodo cillum cillum officia do culpa cillum et aute tempor ipsum ad.'                                    },
			{ origem: 'TRIBUNAL' , numAviso: 6753, tipoComunic: tiposComunic[0] , executado: 13, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -8  , tipoPrazo: tiposPrazo[0] , receb: true  , resp: null , teor: 'Aliqua consectetur consequat non sint laborum incididunt.'                                                         },
			{ origem: 'TRIBUNAL' , numAviso: 2688, tipoComunic: tiposComunic[0] , executado: 12, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -7  , tipoPrazo: tiposPrazo[1] , receb: false , resp: null , teor: 'Voluptate irure aliqua excepteur cupidatat ipsum velit.'                                                           },
			{ origem: 'TRIBUNAL' , numAviso: 8126, tipoComunic: tiposComunic[0] , executado: 13, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -6  , tipoPrazo: tiposPrazo[2] , receb: false , resp: null , teor: 'Sit cillum ut reprehenderit duis proident sunt consectetur qui exercitation ipsum veniam anim aliqua non.'         },
			{ origem: 'TRIBUNAL' , numAviso: 2478, tipoComunic: tiposComunic[0] , executado: 6 , processo: '0000000-00.0000.0.00.0000', process: true , inicioPrazo: -5  , tipoPrazo: tiposPrazo[0] , receb: false , resp: null , teor: 'Adipisicing labore incididunt aliquip occaecat id do incididunt in sunt tempor et aute dolor consequat.'           },
			{ origem: 'TRIBUNAL' , numAviso: 7601, tipoComunic: tiposComunic[0] , executado: 11, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -4  , tipoPrazo: tiposPrazo[1] , receb: false , resp: null , teor: 'Culpa sit nulla anim et reprehenderit et laborum eiusmod.'                                                         },
			{ origem: 'TRIBUNAL' , numAviso: 5882, tipoComunic: tiposComunic[0] , executado: 1 , processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -3  , tipoPrazo: tiposPrazo[2] , receb: false , resp: null , teor: 'Esse eu veniam ex dolore ex laboris.'                                                                              },
			{ origem: 'TRIBUNAL' , numAviso: 1866, tipoComunic: tiposComunic[0] , executado: 11, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -2  , tipoPrazo: tiposPrazo[0] , receb: false , resp: null , teor: 'Velit ex minim minim cupidatat commodo duis.'                                                                      },
			{ origem: 'DIARIO'   , numAviso: 4107, tipoComunic: tiposComunic[0] , executado: 10, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -1  , tipoPrazo: tiposPrazo[1] , receb: false , resp: null , teor: 'Minim ipsum officia Lorem nulla ex aliquip et nostrud.'                                                            },
			{ origem: 'DIARIO'   , numAviso: 7534, tipoComunic: tiposComunic[1] , executado: 18, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -9  , tipoPrazo: tiposPrazo[2] , receb: true  , resp: 1    , teor: 'Laborum commodo cillum cillum officia do culpa cillum et aute tempor ipsum ad.'                                    },
			{ origem: 'DIARIO'   , numAviso: 6580, tipoComunic: tiposComunic[4] , executado: 13, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -8  , tipoPrazo: tiposPrazo[0] , receb: true  , resp: 1    , teor: 'Aliqua consectetur consequat non sint laborum incididunt.'                                                         },
			{ origem: 'DIARIO'   , numAviso: 1329, tipoComunic: tiposComunic[2] , executado: 12, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -7  , tipoPrazo: tiposPrazo[1] , receb: false , resp: null , teor: 'Voluptate irure aliqua excepteur cupidatat ipsum velit.'                                                           },
			{ origem: 'DIARIO'   , numAviso: 7880, tipoComunic: tiposComunic[3] , executado: 13, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -6  , tipoPrazo: tiposPrazo[2] , receb: false , resp: null , teor: 'Sit cillum ut reprehenderit duis proident sunt consectetur qui exercitation ipsum veniam anim aliqua non.'         },
			{ origem: 'DIARIO'   , numAviso: 8449, tipoComunic: tiposComunic[0] , executado: 6 , processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -5  , tipoPrazo: tiposPrazo[0] , receb: false , resp: null , teor: 'Adipisicing labore incididunt aliquip occaecat id do incididunt in sunt tempor et aute dolor consequat.'           },
			{ origem: 'DIARIO'   , numAviso: 9080, tipoComunic: tiposComunic[1] , executado: 11, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -4  , tipoPrazo: tiposPrazo[1] , receb: false , resp: null , teor: 'Culpa sit nulla anim et reprehenderit et laborum eiusmod.'                                                         },
			{ origem: 'DIARIO'   , numAviso: 6358, tipoComunic: tiposComunic[4] , executado: 1 , processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -3  , tipoPrazo: tiposPrazo[2] , receb: false , resp: null , teor: 'Esse eu veniam ex dolore ex laboris.'                                                                              },
			{ origem: 'DIARIO'   , numAviso: 7816, tipoComunic: tiposComunic[2] , executado: 11, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -2  , tipoPrazo: tiposPrazo[0] , receb: false , resp: null , teor: 'Velit ex minim minim cupidatat commodo duis.'                                                                      },
			{ origem: 'DIARIO'   , numAviso: 6367, tipoComunic: tiposComunic[3] , executado: 10, processo: '0000000-00.0000.0.00.0000', process: false, inicioPrazo: -1  , tipoPrazo: tiposPrazo[1] , receb: false , resp: null , teor: 'Minim ipsum officia Lorem nulla ex aliquip et nostrud.'                                                            }
		]

		recebimentos.forEach(documento => {
			documento.terminoPrazo = documento.inicioPrazo + prazo;
			documento.prazoDias = documento.inicioPrazo + prazo
		})

		// Tribunal
		var recebimentosTribunal = recebimentos
			.filter(doc => doc.origem == 'TRIBUNAL')

		// Diário
		var recebimentosDiario = recebimentos
			.filter(doc => doc.origem == 'DIARIO')

		return {
			recebimentos                : recebimentos                            ,

			recebimentosTribunal        : recebimentosTribunal                                                          ,
			pendenteRecebimentoTribunal : recebimentosTribunal.filter(doc => !doc.receb)                                ,
			semResponsavelTribunal      : recebimentosTribunal.filter(doc => doc.receb).filter(doc => doc.resp == null) ,
			semProcessoTribunal         : recebimentosTribunal.filter(doc => doc.receb).filter(doc => !doc.process)     ,

			recebimentosDiario          : recebimentosDiario                                                            ,
			pendenteRecebimentoDiario   : recebimentosDiario  .filter(doc => !doc.receb)                                ,
			semResponsavelDiario        : recebimentosDiario  .filter(doc => doc.receb).filter(doc => doc.resp == null) ,
			semProcessoDiario           : recebimentosDiario  .filter(doc => doc.receb).filter(doc => !doc.process)     ,
		}
	})
	.directive('listaRecebimentos', function(){
		return {
			restrict: 'E',
			template: `
				<div>
					<div class="bth-img-illustration semregistros" ng-show="!(RECEBIMENTOS | filter: (
						tipoPend == 'PENDENTERECEBIMENTO'	? {receb: false} :
						tipoPend == 'SEMRESPONSAVEL'		? null :
						tipoPend == 'SEMPROCESSO'			? {process: false} : null
						)).length">
						<div class="illustration-title">Nenhum item {{tipoPend == 'PENDENTERECEBIMENTO' ? 'Pendente de recebimento' :
							tipoPend == 'SEMRESPONSAVEL' ? 'Sem responsável' :
							tipoPend == 'SEMPROCESSO' ? 'Sem processo relacionado' :
							tipoPend == 'RECEBIDO' ? 'Recebido' : '' | lowercase}} por aqui</div>
					</div>
					<div class="row" ng-show="(RECEBIMENTOS | filter: (
						tipoPend == 'PENDENTERECEBIMENTO'	? {receb: false} :
						tipoPend == 'SEMRESPONSAVEL'		? null :
						tipoPend == 'SEMPROCESSO'			? {process: false} : null
						)).length">
						<div class="col-md-12">
							<table class="table table-unstriped table-unfixed">
								<thead>
									<tr>
										<th class="col-fit text-center" ng-if="selectable" ng-hide="tipoPend == 'SEMRESPONSAVEL'">
											<div class="bth-checkbox">
												<input id="cba{{$index}}" type="checkbox" ng-model="selectall" ng-change="selectAll()">
												<label for="cba{{$index}}">&nbsp;</label>
											</div>
										</th>
										<th width="100"><a href="">Nº aviso<br><abbr title="Tipo de comunicação">Tipo</abbr> <i class="fa fa-sort pull-right"></i></a></th>
										<th ng-if="tipoPend != 'SEMPROCESSO'"><a href="">Executado <i class="fa fa-sort pull-right"></i></a></th>
										<th width="200"><a href="">Processo <i class="fa fa-sort pull-right"></i></a></th>
										<th ng-if="tipoPend != 'PENDENTERECEBIMENTO'" width="160"><a href="">Início/Término<br>do prazo <i class="fa fa-sort-down pull-right"></i></a></th>
										<th ng-if="tipoPend != 'PENDENTERECEBIMENTO'" width="100"><a href="">Tipo<br>do prazo <i class="fa fa-sort-down pull-right"></i></a></th>
										<th ng-if="tipoPend != 'PENDENTERECEBIMENTO'"><a href="">Teor <i class="fa fa-sort pull-right"></i></a></th>
										<th ng-if="tipoPend != 'PENDENTERECEBIMENTO'" width="53"><a href="">PDF <i class="fa fa-sort pull-right"></i></a></th>
										<th ng-if="tipoPend == 'SEMRESPONSAVEL'" width="200"><span>Atribuir para</span></th>
										<th ng-if="tipoPend == 'SEMPROCESSO' && !hist"></th>
									</tr>
								</thead>
								<tbody>
									<tr ng-repeat="documento in RECEBIMENTOS | filter: 	(
																						tipoPend == 'PENDENTERECEBIMENTO'	? {receb: false} :
																						tipoPend == 'SEMRESPONSAVEL'		? null :
																						tipoPend == 'SEMPROCESSO'			? {process: false} : null
																						) | orderBy: 'prazoDias'" ng-if="documento.prazoDias > 0">
										<td class="text-center" ng-if="selectable" ng-hide="tipoPend == 'SEMRESPONSAVEL'">
											<div class="bth-checkbox">
												<input id="cb{{$index}}" type="checkbox" ng-model="documento.selected" ng-change="select()">
												<label for="cb{{$index}}">&nbsp;</label>
											</div>
										</td>
										<td class="text-center">
											{{documento.numAviso}}<br>
											<span class="info">{{documento.tipoComunic.descricao}}</span>
										</td>
										<td class="ellipsis" ng-if="tipoPend != 'SEMPROCESSO'">
											<trib-pessoas-description referente="documento.executado" badge="false" id="false" wrap="true" />
										</td>
										<td>
											<span ng-if="!documento.process">{{documento.processo}}</span>
											<a href="" ng-if="documento.process" target="_blank" class="has-icon" title="Abre o processo em uma nova aba">{{documento.processo}}</a>
										</td>
										<td class="text-center" ng-if="tipoPend != 'PENDENTERECEBIMENTO'">
											<div class="cell-wrapper">
												<span title="Data de início do prazo"><i class="fa fa-fw fa-calendar-o tx__blue"></i> {{documento.inicioPrazo | arrecDate}}<br></span>
												<span title="Data de término do prazo" ng-if="tipoPend != 'PENDENTERECEBIMENTO'"><i class="fa fa-fw fa-calendar-check-o tx__green"></i> {{documento.terminoPrazo | arrecDate}}<br></span>
											</div>
											<div class="cell-wrapper" title="Término do prazo em dias">
												<br>
												<span class="info" ng-class="	documento.prazoDias > 7 ? 'tx__gray--d10' :
																				documento.prazoDias > 5 ? 'tx__yellow' :
																				documento.prazoDias > 2 ? 'tx__orange' :
																				documento.prazoDias < 3 ? 'tx__red' : ''">
													&nbsp;({{documento.prazoDias}}
													<ng-pluralize count="{{documento.prazoDias}}"
														when="{
															'one':		'dia',
															'other':	'dias'
														}">
													</ng-pluralize>)
												</span>
											</div>
										</td>
										<td class="text-center" ng-if="tipoPend != 'PENDENTERECEBIMENTO'">
											{{documento.tipoPrazo.descricao}}
										</td>
										<td ng-if="tipoPend != 'PENDENTERECEBIMENTO'" class="ellipsis" title="{{documento.teor}}">{{documento.teor}}</td>
										<td ng-if="tipoPend != 'PENDENTERECEBIMENTO'" class="text-center">
											<div class="btn-group">
												<button type="button" class="btn btn-link btn-sm" title="Faz o download da intimação"><i class="fa fa-fw fa-file-pdf-o tx__red--d10"></i></button>
											</div>
										</td>
										<td ng-if="tipoPend == 'SEMRESPONSAVEL'">
											<select bf-select2="{}" class="form-control" ng-model="documento.resp">
												<option value="{{procurador.id}}" ng-repeat="procurador in contribuintes | limitTo: 15">{{procurador.nome}}</option>
											</select>
										</td>
										<td ng-if="tipoPend == 'SEMPROCESSO' && !hist" class="text-center col-fit" ng-controller="ExecucaoFiscalCtrl">
											<div class="btn-group">
												<button type="button" class="btn btn-add btn-default btn-xs" title="Adicionar uma nova execução fiscal" ng-click="openExecucao()">Cadastrar</button>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
					<arrec-pagination ng-if="RECEBIMENTOS.length > 0" />
				</div>
			`,
			replace: true,
			scope: {
				recebimentos : '=',
				tipoPend     : '=',
				selectable   : '=',
			},
			controller: function($scope) {
				var vm = $scope
				vm.RECEBIMENTOS = vm.recebimentos

				vm.selectable == vm.selectable != true ? false : true
			}
		}
	})
	.controller('IntegracoesCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'ENUMS', 'recebimentosService',
		function($scope, ModalCad, ENUMS, recebimentosService) {
			var vm = $scope;
			vm.documentos    = ENUMS.DOCUMENTOS;
			
			vm.recebimentos = recebimentosService.recebimentos
			

			// ------------------------------------------------------
			//Envio ao tribunal
			// ------------------------------------------------------
			{
				vm.envioTrib = function(resolve) {
					// abrirPopup('gerenciador-documentos/integracoes/envio/envio-modal.html', resolve)
					ModalCad.open({
						templateUrl: 'gerenciador-documentos/integracoes/envio/envio-modal.html',
						controller: 'IntegracoesEnvioTribunalModalCtrl as IntegracoesEnvioTribunalModalCtrl',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				};

				vm.tipoDocumentos = [
					{ tipo: 'Dívidas', itens: [
						{ id: 1 ,descricao: 'Certidão de dívida ativa (CDA)' },
					]},
					{ tipo: 'Execuções', itens: [
						{ id: 8, descricao: 'Petição inicial' },
						{ id: 9, descricao: 'Petição intermediária' },
					]},
					{ tipo: 'Protestos', itens: [
						{ id: 2 ,descricao: 'CDA protestada' },
						{ id: 3 ,descricao: 'Guia de pagamento' },
						{ id: 4, descricao: 'Solicitação de cancelamento' },
						{ id: 5, descricao: 'Solicitação de desistência' },
						{ id: 6, descricao: 'Autorização de cancelamento' },
						{ id: 7, descricao: 'Autorização de desistência' },
					]},
				]

				vm.envios            = vm.documentos.filter(doc =>  doc.envio      )
				vm.enviosPendente    = vm.documentos.filter(doc => !doc.envio      )
				vm.enviosErro        = vm.documentos.filter(doc =>  doc.erro       )
				vm.enviosErroIntegra = vm.documentos.filter(doc =>  doc.erroIntegra)
			}
			// ------------------------------------------------------
			//Recebimento do tribunal
			// ------------------------------------------------------
			{
				vm.recebimentoTrib = function(resolve) {
					abrirPopup('gerenciador-documentos/integracoes/recebimento/recebimento-modal.html', resolve)
				};

				vm.recebimentosTribunal_PENDENTERECEBIMENTO = recebimentosService.pendenteRecebimentoTribunal
				vm.recebimentosTribunal_SEMRESPONSAVEL      = recebimentosService.semResponsavelTribunal
				vm.recebimentosTribunal_SEMPROCESSO         = recebimentosService.semProcessoTribunal
			}
			// ------------------------------------------------------
			//Recebimento do diário oficial
			// ------------------------------------------------------
			{
				vm.recebimentosDiario_PENDENTERECEBIMENTO = recebimentosService.pendenteRecebimentoDiario
				vm.recebimentosDiario_SEMRESPONSAVEL      = recebimentosService.semResponsavelDiario
				vm.recebimentosDiario_SEMPROCESSO         = recebimentosService.semProcessoDiario
			}

			vm.abrirHistoricoRecebimento = function(resolve) {
				abrirPopup('gerenciador-documentos/integracoes/recebimento/historico-modal.html', resolve)
			};
			
			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'IntegracoesModalCtrl as IntegracoesModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])
	.controller('IntegracoesModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', '$timeout',
		function($scope, ModalCad, params, $timeout) {
			var vm = $scope;
			vm.RECEBIMENTOS = params.pendencias;
			vm.tipoPend = params.tipoPend;
			vm.modo = params.modo;
			vm.doctSelect = 1
			vm.sincroniza = {
				sincronizando: false,
				ultimaConsulta: -1,
				sincronizar: function() {
					this.sincronizando = true
					vm.sincroniza.ultimaConsulta = 0
					$timeout(() => {
						vm.sincroniza.sincronizando = false
					}, 1500)
				}
			}

			vm.qtdSelecionados = 0

			vm.selectAll = function() {
				if(vm.RECEBIMENTOS.every(doc => doc.selected)) {
					vm.RECEBIMENTOS.forEach(doc => doc.selected = false)
					vm.qtdSelecionados = 0
				} else {
					vm.RECEBIMENTOS.forEach(doc => doc.selected = true)
					vm.qtdSelecionados = vm.RECEBIMENTOS.length
				}
			}

			vm.select = function() {
				vm.qtdSelecionados = 0
				vm.RECEBIMENTOS.filter(doc => {
					doc.selected === true ? vm.qtdSelecionados +=1 : null
				})
			}

			vm.salvar = function() {
				
			}
			
			vm.confirmarRecebimento = function(RECEBIMENTOS) {
				console.log(RECEBIMENTOS);
				RECEBIMENTOS.forEach(doc => {
					if(doc.selected) {
						doc.receb = true
						doc.selected = false
						vm.qtdSelecionados = 0
					}
				} )
			}

			vm.atribuir = function(RECEBIMENTOS, resp) {
				console.log(RECEBIMENTOS);
				RECEBIMENTOS.forEach(doc => doc.selected ? doc.resp = resp: null )
			}
		}
	])
	.controller('IntegracoesEnvioTribunalModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', 'ENUMS',
		function($scope, ModalCad, params, ENUMS) {
			var vm = $scope;
			vm.tipoDocumentos = ENUMS.TIPODOCUMENTOS;
			vm.tipoPend = params.tipoPend;
			vm.doctSelect = vm.tipoDocumentos.find(tipo => tipo.tipo != 'Dívidas').itens[0].id

			vm.setDoc = function(id) {
				vm.doctSelect = id
			}
		}
	])
})();