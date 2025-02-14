(function() {
	'use strict';

	var moduloApp = angular.module('app');

	moduloApp.config(['$stateProvider', '$urlRouterProvider',
		function(stateProvider, $urlRouterProvider) {

			$urlRouterProvider.otherwise('/');

			/**
			 * @description Cria um objeto com as opções do state.
			 * @example
			 * // return {
			 * // 			url: '/despesas',
			 * // 			views: {
			 * // 				'@main.ppa': {
			 * // 					templateUrl: 'ppa/despesas/despesas.programa.html',
			 * // 					controller: 'ctb.ppa.DespesasCtrl'
			 * // 				}
			 * // 			}
			 * // 		}
			 *
			 * stateUrlView('/entidade', '@main', 'common/selecao/selecao.entidade.html', 'ContextCtrl')
			 *
			 * @param  {string} urlData        Url do state: /minha-url
			 * @param  {string} viewNameData   Nome da view
			 *                                 // <div ui-view="filters"></div>
			 * @param  {string} templateData   Caminho para o arquivo HTML da view
			 * @param  {string} controllerData Controller onde a view é manipulada
			 * @return {Object}                Objeto com os valores das opções do state
			 */

			var main = {
				route: {
					abstract: true,
					views: {
						header: {
							templateUrl: 'common/header.html',
							controller: 'app.HeaderCtrl'
						},
						footer: {
							templateUrl: 'common/footer.html'
						},
						'': {
							templateUrl: 'common/main.html'
						}
					}
				}
			};

			stateProvider                          .state('main', main.route);

			stateProvider                          .state('main.integracoes'                                                                        , stateUrlView('/integracoes'                       , '@main', 'gerenciador-documentos/cacador/cacador.html'                                                                 , 'CacadorCtrl'                          ));
			stateProvider                          .state('main.visao-geral'                                                                        , stateUrlView('/'                                  , '@main', 'common/visao-geral.html'                                                                                     , 'VisaoGeralCtrl'                       ));
			stateProvider                          .state('main.fiscais'                                                                            , stateUrlView('/fiscais'                           , '@main', 'gerenciador-cadastros/fiscais/fiscais.html'                                                                  , 'FiscaisCtrl'                          ));
			stateProvider                          .state('main.formulas'                                                                           , stateUrlView('/formulas'                          , '@main', 'configuracoes/formulas/formulas.html'                                                                        , 'FormulasCtrl'                         ));
			stateProvider                          .state('main.centralConfiguracoes'                                                               , stateUrlView('/central-configuracoes'             , '@main', 'configuracoes/central-configuracoes/central-configuracoes.html'                                              , 'CentralConfiguracoesCtrl'             ));
				stateProvider                      .state('main.centralConfiguracoes.config-documentos'                                             , stateUrlView('/documentos'                        , 'child', 'configuracoes/central-configuracoes/views/documentos.html'                                                   , 'ConfigDocumentosCtrl'                 ));
				stateProvider                      .state('main.centralConfiguracoes.config-execucoes-fiscais'                                      , stateUrlView('/execucoes-fiscais'                 , 'child', 'configuracoes/central-configuracoes/views/execucoes-fiscais.html'                                            , 'app.ViewsCtrl'                        ));
				stateProvider                      .state('main.centralConfiguracoes.config-integracoes-protestos'                                  , stateUrlView('/integracoes-protestos'             , 'child', 'configuracoes/central-configuracoes/views/integracoes-protestos.html'                                        , 'app.ViewsCtrl'                        ));
				stateProvider                      .state('main.centralConfiguracoes.config-assinaturas'                                            , stateUrlView('/assinaturas'                       , 'child', 'configuracoes/central-configuracoes/views/assinaturas.html'                                                  , 'app.ViewsCtrl'                        ));

			stateProvider                          .state('main.tarefas'                                                                            , stateUrlView('/agenda'                            , '@main', 'gerenciador-tarefas/tarefas.html'                                                                            , 'TarefasCtrl'                          ));
			// stateProvider                          .state('main.agenda'                                                                             , stateUrlView('/agenda'                            , '@main', 'agenda/agenda.html'                                                                                          , 'AgendaCtrl'                           ));
			// 	stateProvider                      .state('main.agenda.compromissos'                                                                , stateUrlView('/compromissos'                      , 'child', 'agenda/compromisso/compromissos.html'                                                                        , 'AgendaCtrl'                           ));
			// 	stateProvider                      .state('main.agenda.tarefa'                                                                      , stateUrlView('/tarefa'                            , 'child', 'agenda/tarefa/tarefa.html'                                                                                   , 'AgendaCtrl'                           ));

			stateProvider                          .state('main.gerenciadorExecucoes'                                                               , stateUrlView('/gerenciador-execucoes'             , '@main', 'gerenciador-execucoes/gerenciador-execucoes.html'                                                            , 'GerenciadorExecucoesCtrl'             ));
			stateProvider                          .state('main.gerenciadorExecucoes.visaogeral-execucoes'                                          , stateUrlView('/visaogeral'                        , 'child', 'gerenciador-execucoes/visao-geral-gerenciador-execucoes.html'                                                , 'GerenciadorExecucoesCtrl'             ));
			stateProvider                          .state('main.gerenciadorExecucoes.execucoes'                                                     , stateUrlView('/execucoes'                         , 'child', 'gerenciador-execucoes/execucoes/execucao-fiscal.html'                                                        , 'ExecucaoFiscalCtrl'                   ));
			stateProvider                          .state('main.gerenciadorExecucoes.execucoesNovo'                                                 , stateUrlView('/execucoes-novo'                    , 'child', 'gerenciador-execucoes/execucoes/execucao-fiscal-FILTRO-NOVO.html'                                            , 'ExecucaoFiscalCtrl'                   ));
			stateProvider                          .state('main.gerenciadorExecucoes.contencioso'                                                   , stateUrlView('/contencioso'                       , 'child', 'gerenciador-execucoes/execucoes/execucao-fiscal.html'                                                        , 'ExecucaoFiscalCtrl'                   ));
			stateProvider                          .state('main.gerenciadorExecucoes.administrativo'                                                , stateUrlView('/administrativo'                    , 'child', 'gerenciador-execucoes/execucoes/execucao-fiscal.html'                                                        , 'ExecucaoFiscalCtrl'                   ));
			stateProvider                          .state('main.gerenciadorExecucoes.integracoes'                                                   , stateUrlView('/integracoes'                       , 'child', 'gerenciador-documentos/integracoes/painel-integracoes.html'                                                  , 'IntegracoesCtrl'                      ));
			stateProvider                          .state('main.gerenciadorExecucoes.execucao-fiscal-ficha'                                         , stateUrlView('/execucao-fiscal-ficha/:processo'   , '@main', 'gerenciador-execucoes/execucoes/execucao-fiscal-ficha.html'                                                  , 'ExecucaoFiscalCtrlCad'                ));

			stateProvider                          .state('main.gerenciadorDividas'                                                                 , stateUrlView('/gerenciador-dividas'               , '@main', 'gerenciador-dividas/gerenciador-dividas.html'                                                                , 'GerenciadorDividasCtrl'               ));
				stateProvider                      .state('main.gerenciadorDividas.visao-geral'                                                     , stateUrlView('/visao-geral'                       , 'child', 'gerenciador-dividas/visao-geral-gerenciador-dividas.html'                                                    , 'GerenciadorDividasCtrl'               ));
				// stateProvider                      .state('main.gerenciadorDividas.dividas-ativas'                                                  , stateUrlView('/dividas-ativas'                    , 'child', 'gerenciador-dividas/dividas-ativas/dividas-ativas.html'                                                      , 'dividasAtivasCtrl'                    ));
				stateProvider                      .state('main.gerenciadorDividas.dividas-ativas-NOVA'                                             , stateUrlView('/dividas-ativas-NOVA'               , 'child', 'gerenciador-dividas/dividas-ativas/dividas-ativas-NOVA.html'                                                 , 'dividasAtivasNovaCtrl'                ));
				stateProvider                      .state('main.gerenciadorDividas.dividas-ativas'                                                  , stateUrlView('/dividas-ativas'                    , 'child', 'gerenciador-dividas/dividas-ativas/dividas-ativas-FILTRO.html'                                               , 'dividasAtivasFiltroCtrl'              ));

			stateProvider                          .state('main.gerenciadorProtestos'                                                               , stateUrlView('/gerenciador-protestos'             , '@main', 'gerenciador-protestos/gerenciador-protestos.html'                                                            , 'GerenciadorProtestosCtrl'             ));
			stateProvider                          .state('main.gerenciadorProtestos.visaogeral-protestos'                                          , stateUrlView('/visaogeral'                        , 'child', 'gerenciador-protestos/visao-geral-gerenciador-protestos.html'                                                , 'GerenciadorProtestosCtrl'             ));
			stateProvider                          .state('main.gerenciadorProtestos.protestos'                                                     , stateUrlView('/protestos'                         , 'child', 'gerenciador-protestos/protestos/protesto.html'                                                               , 'ProtestoCtrl'                         ));
			stateProvider                          .state('main.gerenciadorProtestos.protestos-quitados'                                            , stateUrlView('/protestos-quitados'                , 'child', 'gerenciador-protestos/protestos/protesto.html'                                                               , 'ProtestoCtrl'                         ));
			stateProvider                          .state('main.gerenciadorProtestos.protestos-cancelados'                                          , stateUrlView('/protestos-cancelados'              , 'child', 'gerenciador-protestos/protestos/protesto.html'                                                               , 'ProtestoCtrl'                         ));
			stateProvider                          .state('main.gerenciadorProtestos.protestos-parcelados'                                          , stateUrlView('/protestos-parcelados'              , 'child', 'gerenciador-protestos/protestos/protesto.html'                                                               , 'ProtestoCtrl'                         ));
			stateProvider                          .state('main.gerenciadorProtestos.protesto-ficha'                                                , stateUrlView('/protesto-ficha'                    , '@main', 'gerenciador-protestos/protestos/protesto-ficha.html'                                                         , 'ProtestoCtrl'                         ));

			stateProvider                          .state('main.gerenciadorCadastros'                                                               , stateUrlView('/gerenciador-cadastros'             , '@main', 'gerenciador-cadastros/gerenciador-cadastros.html'                                                            , 'GerenciadorCadastrosCtrl'             ));
				stateProvider                      .state('main.gerenciadorCadastros.gerais'                                                        , stateUrlView('/gerais'                            , 'child', 'gerenciador-cadastros/gerais/gerais.html'                                                                    , 'CadGeraisCtrl'                        ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.cad-auxiliares'                                         , stateUrlView('/cad-auxiliares'                    , 'child', 'gerenciador-cadastros/cadastros-auxiliares/cadastros-auxiliares.html'                                        , 'CadastrosAuxiliaresCtrl'              ));
						stateProvider              .state('main.gerenciadorCadastros.gerais.categoriaBens'                          , stateUrlView('/categoria-bens'                    , 'child', 'gerenciador-cadastros/gerais/categoria-bens/categoria-bens.html'                               , 'CategoriaBensCtrl'                    ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.areasAssuntos'                                          , stateUrlView('/area-assunto'                      , 'child', 'gerenciador-cadastros/gerais/areas-assuntos/areas-assuntos.html'                                             , 'AreasAssuntosCtrl'                    ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.locaisTramitacao'                                       , stateUrlView('/locais-tramitacao'                 , 'child', 'gerenciador-cadastros/gerais/locais-tramitacao/locais-tramitacao.html'                                       , 'LocaisTramitacaoCtrl'                 ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.classes'                                                , stateUrlView('/classes'                           , 'child', 'gerenciador-cadastros/gerais/classes/classes.html'                                                           , 'ClassesCtrl'                          ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.motivos'                                                , stateUrlView('/motivos'                           , 'child', 'gerenciador-cadastros/gerais/motivos/motivos.html'                                                           , 'TributosCoreMotivosCtrl'              ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.modelosPeticoes'                                        , stateUrlView('/modelos-peticoes'                  , 'child', 'gerenciador-cadastros/gerais/modelos-peticoes/modelos-peticoes.html'                                         , 'ModelosPeticoesCtrl'                  ));
					stateProvider                  .state('main.gerenciadorCadastros.gerais.locaisArquivamento'                                     , stateUrlView('/locaisArquivamento'                , 'child', 'gerenciador-cadastros/locais-arquivamento/locais-arquivamento.html'                                          , ''                                     ));
				stateProvider                      .state('main.gerenciadorCadastros.pessoas'                                                       , stateUrlView('/pessoas'                           , 'child', 'gerenciador-cadastros/pessoas/pessoas.html'                                                                  , 'PessoasCtrl'                          ));
					stateProvider                  .state('main.gerenciadorCadastros.pessoas.contribuintes'                                         , stateUrlView('/contribuintes'                     , 'child', 'gerenciador-cadastros/pessoas/contribuintes/contribuintes-lista.html'                                        , 'ContribuintesCtrl'                    ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.contribuinte'                            , stateUrlView('/contribuinte'                      , 'child', 'gerenciador-cadastros/pessoas/contribuintes/contribuintes-lista.html'                                        , 'ContribuintesCtrl'                    ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica'                           , stateUrlView('/pessoa-fisica/:contribuinte'       , '@main', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/pessoa-fisica.html'                                , 'PessoaFisicaCtrl'                     ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.dados-pessoais'            , stateUrlView('/dados-pessoais'                    , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/dados-pessoais.html'                               , 'PessoaFisicaCtrl'                     ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.declaracoes'               , stateUrlView('/declaracoes'                       , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/declaracoes.html'                                  , 'InteligenciaFiscalCtrl'               ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.anexos'                    , stateUrlView('/anexos'                            , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/anexos.html'                                       , 'PessoaFisicaCtrl'                     ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.movimentacoes'             , stateUrlView('/movimentacoes'                     , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/movimentacoes.html'                                , 'PessoaFisicaCtrl'                     ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.historico'                 , stateUrlView('/historico'                         , 'child', 'gerenciador-cadastros/pessoas/contribuintes/historico/historico.html'                                        , 'PessoaFisicaCtrl'                     ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica'                         , stateUrlView('/pessoa-juridica/:contribuinte'     , '@main', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/pessoa-juridica.html'                            , 'PessoaJuridicaCtrl'                   ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.dados-gerais'            , stateUrlView('/dados-gerais'                      , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/dados-gerais.html'                               , 'PessoaJuridicaCtrl'                   ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.simples-nacional'        , stateUrlView('/simples-nacional'                  , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/simples-nacional/simples-nacional.html'          , 'PessoaJuridicaCtrl'                   ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.declaracoes'             , stateUrlView('/declaracoes'                       , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/declaracoes.html'                                , 'InteligenciaFiscalCtrl'               ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.movimentacoes'           , stateUrlView('/movimentacoes'                     , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/movimentacoes.html'                              , 'PessoaJuridicaCtrl'                   ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.anexos'                  , stateUrlView('/anexos'                            , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/anexos.html'                                     , 'PessoaJuridicaCtrl'                   ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.publicidade'             , stateUrlView('/publicidade'                       , 'child', 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/publicidades.html'                  , 'PublicidadesCtrl'                     ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.historico'               , stateUrlView('/historico'                         , 'child', 'gerenciador-cadastros/pessoas/contribuintes/historico/historico.html'                                        , 'ContribuintesCtrl'                    ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.advogados'                                             , stateUrlView('/advogados'                         , 'child', 'gerenciador-cadastros/pessoas/advogados/advogados.html'                                                      , 'AdvogadosCtrl'                        ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.cartorios'                                             , stateUrlView('/cartorios'                         , 'child', 'gerenciador-cadastros/pessoas/cartorios/cartorios.html'                                                      , 'CartoriosCtrl'                        ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.referentes'                                            , stateUrlView('/referentes'                        , 'child', 'gerenciador-cadastros/pessoas/referentes/referentes.html'                                                    , 'ReferentesCtrl'                       ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.profissionais'                                         , stateUrlView('/profissionais'                     , 'child', 'gerenciador-cadastros/pessoas/profissionais/profissionais.html'                                              , 'ProfissionaisCtrl'                    ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.grupo-profissionais'                                   , stateUrlView('/grupo-profissionais'               , 'child', 'gerenciador-cadastros/pessoas/grupo-profissionais/grupo-profissionais.html'                                  , 'GrupoProfissionaisCtrl'               ));
						stateProvider              .state('main.gerenciadorCadastros.pessoas.profissionaisNovo'                                     , stateUrlView('/profissionaisNovo'                 , 'child', 'gerenciador-cadastros/pessoas/profissionais-novo/profissionais.html'                                  , 'ProfissionaisNovoCtrl'               ));
				stateProvider                      .state('main.gerenciadorCadastros.financeiro'                                                    , stateUrlView('/financeiro'                        , 'child', 'gerenciador-cadastros/financeiro/financeiro.html'                                                            , 'FinanceiroCtrl'                       ));
					stateProvider                  .state('main.gerenciadorCadastros.financeiro.agencias-bancarias'                                 , stateUrlView('/agencias-bancarias'                , 'child', 'gerenciador-cadastros/financeiro/agenciasBancarias/agencias-bancarias.html'                                  , 'TributosCoreAgenciasBancariasCtrl'    ));
					stateProvider                  .state('main.gerenciadorCadastros.financeiro.bancos'                                             , stateUrlView('/bancos'                            , 'child', 'gerenciador-cadastros/financeiro/bancos/bancos.html'                                                         , 'TributosCoreBancosCtrl'               ));
					stateProvider                  .state('main.gerenciadorCadastros.financeiro.convenios'                                          , stateUrlView('/convenios'                         , 'child', 'gerenciador-cadastros/financeiro/convenios/convenios.html'                                                   , 'TributosCoreConveniosCtrl'            ));
					stateProvider                  .state('main.gerenciadorCadastros.enderecos'                                                     , stateUrlView('/enderecos'                         , 'child', 'gerenciador-cadastros/enderecos/enderecos.html'                                                              , 'LocalizacaoCtrl'                      ));

			stateProvider                          .state('main.gerenciadorDocumentos'                                                              , stateUrlView('/gerenciador-documentos'            , '@main', 'gerenciador-documentos/gerenciador-documentos.html'                                                          , 'GerenciadorDocumentosCtrl'            ));
				stateProvider                      .state('main.gerenciadorDocumentos.cda'                                                          , stateUrlView('/cda'                               , 'child', 'gerenciador-documentos/cda/cda.html'                                                                         , 'DocsCDACtrl'                          ));
				stateProvider                      .state('main.gerenciadorDocumentos.peticao-inicial'                                              , stateUrlView('/peticao-inicial'                   , 'child', 'gerenciador-documentos/peticoes/peticoes.html'                                                               , 'DocsPeticoesCtrl'               ));
				stateProvider                      .state('main.gerenciadorDocumentos.peticao-intermediaria'                                        , stateUrlView('/peticao-intermediaria'             , 'child', 'gerenciador-documentos/peticoes/peticoes.html'                                                               , 'DocsPeticoesCtrl'         ));

			var core = {
				route: {
					abstract: true
				}
			};

			stateProvider .state('main.core', core.route); 

			stateProvider
				.state('main.core.cadastros-core', {
					abstract: true,
					url:'/cadastros'
				});

			stateProvider .state('main.core.cadastros-core.agenciasbancarias'                                              , stateUrlView('/agenciasbancarias'          , '@main', 'gerenciador-cadastros/financeiro/agenciasBancarias/agencias-bancarias.html', ''));
			stateProvider .state('main.core.cadastros-core.bancos'                                                         , stateUrlView('/bancos'                     , '@main', 'gerenciador-cadastros/financeiro/bancos/bancos.html'                       , ''));
			stateProvider .state('main.core.cadastros-core.convenios'                                                      , stateUrlView('/convenios'                  , '@main', 'gerenciador-cadastros/financeiro/convenios/convenios.html'                 , ''));

			stateProvider
			.state('main.core.cadastros-core-pessoa-novo', {
				abstract: true,
				url: '/cadastros',
				params:{
					nome: null,
					cpfCnpj: null,
					nomeSocialFantasia: null,
					inscricaoMunicipal:null,
					inscricaoEstadual:null,
					dtaNascimento: null,
					isento: null
				}
			});

		}
	]);

	function stateUrlView(urlData, viewNameData, templateData, controllerData) {
		var obj = {};

		obj.views = {};
		obj.views[viewNameData] = {};

		obj.url = urlData;
		obj.views[viewNameData].templateUrl = templateData;

		if (controllerData) {
			obj.views[viewNameData].controller = controllerData;
		}

		return obj;
		
	}
})(angular);
