(function(){

	'use strict';

	var campoInscricao = [
		{id: 'CAMPO_1', descricao: 'Campo 1'},
		{id: 'CAMPO_2', descricao: 'Campo 2'},
		{id: 'CAMPO_3', descricao: 'Campo 3'},
		{id: 'CAMPO_4', descricao: 'Campo 4'},
		{id: 'CAMPO_5', descricao: 'Campo 5'},
		{id: 'CAMPO_6', descricao: 'Campo 6'},
		{id: 'CAMPO_7', descricao: 'Campo 7'},
		{id: 'CAMPO_8', descricao: 'Campo 8'},
		{id: 'CAMPO_9', descricao: 'Campo 9'},
		{id: 'CAMPO_10', descricao: 'Campo 10'}
	];

	var modulos = [
		{
			id: 'A',
			descricao: 'Módulo Atendimento',
			url: 'common/header/index_atendimento.html',
		},
		{
			id: 'I',
			descricao: 'Módulo Imobiliário',
			url : 'common/header/index_imobiliario.html',
			shortcuts: [
				{
					id: 'CalculosTributariosPageMapping',
					descricao: 'Cálculo',
					class: 'icone-produto fa fa-calculator',
					route: 'calculotributario'
				},
				{
					id: 'creditostributarios',
					descricao: 'Créditos tributários',
					class: 'icone-produto fa fa-money',
					route: 'creditostributarios'
				},
				{
					id: 'indexadores',
					descricao: 'Indexadores',
					class: 'icone-produto fa fa-dollar',
					route: 'indexadores'
				},
				{
					id: 'ConfiguracoesParcelasPageMapping',
					descricao: 'Parcelas',
					class: 'icone-produto fa fa-list-ol',
					route: 'parcelas'
				},
				{
					id: 'imoveis',
					descricao: 'Imóveis',
					class: 'icone-produto fa fa-home',
					route: 'imoveis'
				},
				{
					id: 'CamposAdicionaisPageMapping',
					descricao: 'Campos adicionais',
					class: 'icone-produto fa fa-plus',
					route: 'camposadicionais'
				}
			],
			menus: [
				{
					id: 'configurando',
					descricao: 'Configurando',
					style: {width: '490px'},
					colunas: [
						{
							class: 'col-md-6',
							submenu: [
								{
									id: 'lancamentos',
									descricao: 'Lançamentos',
									subitem: [
										{
											id: 'CreditosTributariosPageMapping',
											descricao: 'Créditos tributários',
											route: 'creditostributarios',
											breadcrumb: ['Configurando', 'Lançamentos', 'Créditos tributários'],
											class: 'fa fa-money'
										},
										{
											id: 'ConfiguracoesParcelasPageMapping',
											descricao: 'Parcelas',
											route: 'parcelas',
											breadcrumb: ['Configurando', 'Lançamentos', 'Parcelas'],
											class: 'fa fa-list-ol'
										}
									]
								},{
									id: 'formulas',
									descricao: 'Fórmulas',
									subitem: [
										{
											id: 'ScriptsArrecadacaoPageMapping',
											descricao: 'Fórmulas',
											route: 'formulasCalculo',
											breadcrumb: ['Configurando', 'Fórmulas', 'Fórmulas '],
											class: 'fa fa-superscript'
										}
									]
								},{
									id: 'condicoesParcelamento',
									descricao: 'Condições de parcelamento',
									subitem: [
										{
											id: 'ConfigParcelamentosCreditosPageMapping',
											descricao: 'Parcelamento de créditos',
											route: 'configParcelamentoCreditos',
											breadcrumb: ['Configurando','Condições de parcelamento', 'Parcelamento de créditos'],
											class: 'fa fa-cogs'
										}
									]
								},{
									id: 'geoprocessamento',
									descricao: 'Integração',
									subitem: [
										{
											id: 'geoprocessamento',
											descricao: 'Geoprocessamento',
											route: '',
											breadcrumb: ['Configurando','Integração', 'Geoprocessamento'],
											disabled: true
										}
									]
								}
							]
						},{
							class: 'col-md-6',
							submenu:[
								{
									id: 'tabelas',
									descricao: 'Tabelas',
									subitem: [
										{
											id: 'TabelasCalculosPageMapping',
											descricao: 'Tabelas de cálculo',
											route: 'tabelascalculos',
											breadcrumb: ['Configurando', 'Tabelas', 'Tabelas de cálculo'],
											class: 'fa fa-table'
										},
										{
											id: 'PlantasValoresPageMapping',
											descricao: 'Planta de valores',
											route: 'plantasvalores',
											breadcrumb: ['Configurando', 'Tabelas', 'Planta de valores'],
											class: 'fa fa-map'
										}
									]
								},{
									id: 'basesCadastrais',
									descricao: 'Base cadastral',
									subitem: [
										{
											id: 'CamposAdicionaisPageMapping',
											descricao: 'Campos adicionais',
											route: 'camposadicionais',
											breadcrumb: ['Configurando', 'Base cadastral', 'Campos adicionais'],
											class: 'fa fa-plus'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'administrando',
					descricao: 'Administrando',
					style: {width: '710px', left: '-30px'},
					colunas: [
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'pessoas',
									descricao: 'Pessoas',
									subitem: [
										{
											id: 'PessoasPageMapping',
											descricao: 'Contribuintes',
											route: 'contribuintes',
											breadcrumb: ['Administrando', 'Pessoas', 'Contribuintes'],
											class: 'fa fa-user-plus'
										},
										{
											id: 'ConstrutorasPageMapping',
											descricao: 'Construtoras',
											route: 'construtoras',
											breadcrumb: ['Administrando', 'Pessoas', 'Construtoras'],
											class: 'fa fa-wrench'
										},
										{
											id: 'ImobiliariasPageMapping',
											descricao: 'Imobiliárias',
											route: 'imobiliarias',
											breadcrumb: ['Administrando', 'Pessoas', 'Imobiliárias'],
											class: 'fa fa-home'
										},
										{
											id: 'EngenheirosArquitetosPageMapping',
											descricao: 'Engenheiros / Arquitetos',
											route: 'engenheirosarquitetos',
											breadcrumb: ['Administrando', 'Pessoas', 'Engenheiros/Arquitetos'],
											class: 'fa fa-graduation-cap'
										},
										{
											id: 'CartoriosPageMapping',
											descricao: 'Cartórios',
											route: 'cartorios',
											breadcrumb: ['Administrando', 'Pessoas', 'Cartórios'],
											class: 'fa fa-envelope-o'
										},
										{
											id: 'AdvogadosPageMapping',
											descricao: 'Advogados / Procuradores',
											route: 'advogados',
											breadcrumb: ['Administrando', 'Pessoas', 'Advogados/Procuradores'],
											class: 'fa fa-user-secret'
										}
									]
								},
								{
									id: 'financeiro',
									descricao: 'Financeiro',
									class: 'col-md-6',
									subitem: [
										{
											id: 'AgenciasBancariasPageMapping',
											descricao: 'Agências',
											route: 'agenciasbancarias',
											breadcrumb: ['Administrando', 'Financeiro', 'Agências'],
											class: 'fa fa-building'
										},
										{
											id: 'BancosPageMapping',
											descricao: 'Bancos',
											route: 'bancos',
											breadcrumb: ['Administrando', 'Financeiro', 'Bancos'],
											class: 'fa fa-university'
										},
										{
											id: 'IndexadoresPageMapping',
											descricao: 'Indexadores',
											route: 'indexadores',
											breadcrumb: ['Administrando', 'Financeiro', 'Indexadores'],
											class: 'fa fa-dollar'
										},
										{
											id: 'LimitesArrecadacaoPageMapping',
											descricao: 'Limites de arrecadação',
											route: 'limitesArrecadacao',
											breadcrumb: ['Administrando','Financeiro', 'Limites de arrecadação'],
											class: 'fa fa-credit-card'
										},
										{
											id: 'ConveniosPageMapping',
											descricao: 'Convênios',
											route: 'convenios',
											breadcrumb: ['Administrando','Financeiro', 'Convênios'],
											class: 'fa fa-barcode'
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'imoveis',
									descricao: 'Imóveis',
									subitem: [
										{
											id: 'ImoveisPageMapping',
											descricao: 'Imóveis',
											route: 'imoveis',
											breadcrumb: ['Administrando','Imóveis ', 'Imóveis'],
											class: 'fa fa-building-o'
										},
										{
											id: 'ImoveisEnglobadosPageMapping',
											descricao: 'Englobamento',
											route: 'imoveisEnglobados',
											click: 'openEnglobamentos',
											breadcrumb: ''
										},
										{
											id: 'DesmembramentosPageMapping',
											descricao: 'Desmembramentos',
											route: 'desmembramentos',
											breadcrumb: ['Administrando','Imóveis', 'Desmembramentos'],
											class: 'fa fa-scissors'
										},
										{
											id: 'RemembramentosPageMapping',
											descricao: 'Remembramentos',
											route: 'remembramentos',
											breadcrumb: ['Administrando','Imóveis', 'Remembramentos'],
											class: 'fa fa-clipboard'
										},
										{
											id: 'geoprocessamento',
											descricao: 'Integração geoprocessamento',
											route: '',
											breadcrumb: ['Administrando','Imóveis', 'Integração geoprocessamento'],
											disabled: true
										},
										{
											id: 'ContribuicoesMelhoriasPageMapping',
											descricao: 'Contribuições de melhoria',
											route: 'contribuicoesMelhorias',
											breadcrumb: ['Administrando','Imóveis', 'Contribuições de melhoria'],
											class: 'fa fa-chain-broken'
										}
									]
								},
								{
									id: 'taxas',
									descricao: 'Taxas',
									class: 'col-md-6',
									subitem: [
										{
											id: 'ReceitasDiversasPageMapping',
											descricao: 'Receitas diversas',
											route: 'receitasDiversas',
											breadcrumb: ['Administrando','Taxas', 'Receitas diversas'],
											class: 'fa fa-list-alt'
										}
									]
								},
								{
									id: 'manutencoesCalculos',
									descricao: 'Lançamentos',
									class: 'col-md-6',
									subitem: [
										{
											id: 'ManutencoesCalculosPageMapping',
											descricao: 'Requerimento/Manutenção de lançamento',
											route: 'manutencoesCalculos',
											breadcrumb: ['Administrando','Lançamentos', 'Requerimento/Manutenção de lançamento'],
											class: 'fa fa-wrench'
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'auxiliares',
									descricao: 'Cadastros auxiliares',
									subitem: [
										{
											id: 'NaturezasTextoJurAtosPageMapping',
											descricao: 'Naturezas de texto jurídico',
											route: 'naturezasTextoJurAtos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Naturezas de texto jurídico'],
											class: 'fa fa-gavel'
										},
										{
											id: 'FontesDivulgacoesAtosPageMapping',
											descricao: 'Fontes de divulgação',
											route: 'fontesDivulgacoesAtos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Fontes de divulgação'],
											class: 'fa fa-newspaper-o'
										},
										{
											id: 'AtosPageMapping',
											descricao: 'Atos',
											route: 'atos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Atos'],
											class: 'fa fa-asterisk'
										},
										{
											id: 'FeriadosPageMapping',
											descricao: 'Feriados',
											route: 'feriados',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Feriados'],
											class: 'fa fa-calendar'
										},
										{
											id: 'UnidadesMedidasPageMapping',
											descricao: 'Unidades de medida',
											route: 'unidadesmedida',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Unidades de medida'],
											class: 'fa fa-thermometer-half'
										},
										{
											id: 'enderecos',
											descricao: 'Endereços',
											route: 'enderecos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Endereços'],
											class: 'fa fa-location-arrow'
										},
										{
											id: 'BeneficiosFiscaisPageMapping',
											descricao: 'Benefícios fiscais',
											route: 'beneficiosFiscais',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Benefícios fiscais'],
											class: 'fa fa-id-card-o'
										},
										{
											id: 'MotivosPageMapping',
											descricao: 'Motivos',
											route: 'motivos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Motivos'],
											class: 'fa fa-comments-o'
										},
										{
											id: 'MateriaisServicosPageMapping',
											descricao: 'Materiais e serviços',
											route: 'materiaisServicos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Materiais e serviços'],
											class: 'fa fa-tasks'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'executando',
					descricao: 'Executando',
					style: {width: '820px', left: '-130px'},
					colunas: [
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'emissoes',
									descricao: 'Emissão',
									subitem: [
										{
											id: 'guias',
											descricao: 'Guias',
											route: 'guias',
											click: 'openGuias',
											breadcrumb: '',
											class: 'fa fa fa-tags'
										}, {
											id: 'documentos',
											descricao: 'Documentos',
											route: '',
											breadcrumb: '',
											disabled: true
										},{
											id: 'extratos',
											descricao: 'Extratos do contribuinte',
											route: '',
											breadcrumb: '',
											disabled: true
										}
									]
								},
								{
									id: 'movimentacao',
									descricao: 'Movimentação cadastral',
									subitem: [
										{
											id: 'transferenciasImoveis',
											descricao: 'Transferencia de imóveis',
											route: 'transferenciasImoveis',
											breadcrumb: ['Executando','Movimentação cadastral', 'Transferencia de imóveis'],
											class: 'fa fa-exchange'
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'movimentacaoFinanceira',
									descricao: 'Movimentação financeira',
									subitem: [
										{
											id: 'CalculosTributariosPageMapping',
											descricao: 'Cálculo',
											route: 'calculotributario',
											breadcrumb: ['Executando','Movimentação financeira', 'Cálculo'],
											class: 'fa fa-calculator'
										},
										{
											id: 'saldoDevedor',
											descricao: 'Controle de saldo devedor',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Controle de saldo devedor'],
											disabled: true
										},
										{
											id: 'BaixaManual',
											descricao: 'Baixa manual',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Baixa manual'],
											disabled: true
										},
										{
											id: 'BaixaAutomaticaPageMapping',
											descricao: 'Baixa/Estorno automático',
											route: 'baixaAutomatica',
											breadcrumb: ['Executando','Movimentação financeira', 'Baixa/Estorno automático'],
											class: 'fa fa-files-o'
										},
										{
											id: 'ExtornoBaixaManual',
											descricao: 'Estorno de baixa manual',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Estorno de baixa manual'],
											disabled: true
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [

								{
									id: 'manutencoes',
									descricao: 'Manutenções',
									subitem: [
										{
											id: 'ParcelamentosPageMapping',
											descricao: 'Parcelamento de créditos',
											route: 'parcelamentoCreditos',
											breadcrumb: ['Executando','Manutenções', 'Parcelamento de créditos'],
											class: 'fa fa-ticket'
										},
										{
											id: 'extornoParcelamento',
											descricao: 'Estorno de parcelamento de créditos',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Estorno de parcelamento de créditos'],
											disabled: true
										},
										{
											id: 'reativarParcelamento',
											descricao: 'Reativar parcelamento de créditos',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Reativar parcelamento de créditos'],
											disabled: true
										},
										{
											id: 'manutencaoParcelamento',
											descricao: 'Manutenção de parcelamento de crédito',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Manutenção de parcelamento de crédito'],
											disabled: true
										},
										{
											id: 'compensacao',
											descricao: 'Compensação',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Compensação'],
											disabled: true
										},
										{
											id: 'restituicao',
											descricao: 'Restituição',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Restituição'],
											disabled: true
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'M',
			descricao: 'Módulo Mobiliário',
			url : 'common/header/index_mobiliario.html',
			shortcuts: [
				{
					id: 'creditostributarios',
					descricao: 'Créditos tributários',
					class: 'icone-produto fa fa-money',
					route: 'creditostributarios'
				},
				{
					id: 'ConfiguracoesParcelasPageMapping',
					descricao: 'Parcelas',
					class: 'icone-produto fa fa-list-ol',
					route: 'parcelas'
				},
				{
					id: 'CamposAdicionaisPageMapping',
					descricao: 'Campos adicionais',
					class: 'icone-produto fa fa-plus',
					route: 'camposadicionais'
				}/*,
				{
					id: 'guias',
					descricao: 'Guias',
					class: 'icone-produto fa fa-files-o',
					click: 'openGuias',
					route: 'guias'
				},
				{
					id: 'documentos',
					descricao: 'Documentos',
					class: 'icone-produto fa fa-file-text',
					route: ''
				},
				{
					id: 'extratos',
					descricao: 'Extratos do contribuinte',
					class: 'icone-produto fa fa-list-alt',
					route: ''
				}*/
			],
			menus: [
				{
					id: 'configurando',
					descricao: 'Configurando',
					style: {width: '490px'},
					colunas: [
						{
							class: 'col-md-6',
							submenu: [
								{
									id: 'lancamentos',
									descricao: 'Lançamentos',
									subitem: [
										{
											id: 'CreditosTributariosPageMapping',
											descricao: 'Créditos tributários',
											route: 'creditostributarios',
											breadcrumb: ['Configurando', 'Lançamentos', 'Créditos tributários'],
											class: 'fa fa-money'
										},
										{
											id: 'ConfiguracoesParcelasPageMapping',
											descricao: 'Parcelas',
											route: 'parcelas',
											breadcrumb: ['Configurando', 'Lançamentos', 'Parcelas'],
											class: 'fa fa-list-ol'
										}
									]
								},{
									id: 'formulas',
									descricao: 'Fórmulas',
									subitem: [
										{
											id: 'ScriptsArrecadacaoPageMapping',
											descricao: 'Fórmulas',
											route: 'formulasCalculo',
											breadcrumb: ['Configurando', 'Fórmulas', 'Fórmulas '],
											class: 'fa fa-superscript'
										}
									]
								}
							]
						},{
							class: 'col-md-6',
							submenu:[
								{
									id: 'tabelas',
									descricao: 'Tabelas',
									subitem: [
										{
											id: 'TabelasCalculosPageMapping',
											descricao: 'Tabelas de cálculo',
											route: 'tabelascalculos',
											breadcrumb: ['Configurando', 'Tabelas', 'Tabelas de cálculo'],
											class: 'fa fa-table'
										}
									]
								},{
									id: 'basesCadastrais',
									descricao: 'Base cadastral',
									subitem: [
										{
											id: 'CamposAdicionaisPageMapping',
											descricao: 'Campos adicionais',
											route: 'camposadicionais',
											breadcrumb: ['Configurando', 'Base cadastral', 'Campos adicionais'],
											class: 'fa fa-plus'
										},{
											id: 'AtividadesEconomicasPageMapping',
											descricao: 'Atividades econômicas',
											route: 'atividadesEconomicas',
											breadcrumb: ['Configurando', 'Bases cadastrais', 'Atividades econômicas'],
											class: 'fa fa-dollar'
										},{
											id: 'HorariosFuncionamentoPageMapping',
											descricao: 'Horários de funcionamento',
											route: 'horariosFuncionamento',
											breadcrumb: ['Configurando', 'Base cadastral', 'Horários de funcionamento'],
											class: 'fa fa-clock-o'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'administrando',
					descricao: 'Administrando',
					style: {width: '710px', left: '-30px'},
					colunas: [
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'pessoas',
									descricao: 'Pessoas',
									subitem: [
										{
											id: 'PessoasPageMapping',
											descricao: 'Contribuintes',
											route: 'contribuintes',
											breadcrumb: ['Administrando', 'Pessoas', 'Contribuintes'],
											class: 'fa fa-user-plus'
										},
										{
											id: 'ConstrutorasPageMapping',
											descricao: 'Construtoras',
											route: 'construtoras',
											breadcrumb: ['Administrando', 'Pessoas', 'Construtoras'],
											class: 'fa fa-wrench'
										},
										{
											id: 'ImobiliariasPageMapping',
											descricao: 'Imobiliárias',
											route: 'imobiliarias',
											breadcrumb: ['Administrando', 'Pessoas', 'Imobiliárias'],
											class: 'fa fa-home'
										},
										{
											id: 'EngenheirosArquitetosPageMapping',
											descricao: 'Engenheiros / Arquitetos',
											route: 'engenheirosarquitetos',
											breadcrumb: ['Administrando', 'Pessoas', 'Engenheiros/Arquitetos'],
											class: 'fa fa-graduation-cap'
										},
										{
											id: 'CartoriosPageMapping',
											descricao: 'Cartórios',
											route: 'cartorios',
											breadcrumb: ['Administrando', 'Pessoas', 'Cartórios'],
											class: 'fa fa-envelope-o'
										},
										{
											id: 'ContadoresPageMapping',
											descricao: 'Contadores',
											route: 'contadores',
											breadcrumb: ['Administrando', 'Pessoas', 'Contadores'],
											class: 'fa fa-sort-numeric-asc'
										},
										{
											id: 'AdvogadosPageMapping',
											descricao: 'Advogados / Procuradores',
											route: 'advogados',
											breadcrumb: ['Administrando', 'Pessoas', 'Advogados/Procuradores'],
											class: 'fa fa-user-secret'
										}
									]
								},
								{
									id: 'manutencoesCalculos',
									descricao: 'Lançamentos',
									subitem: [
										{
											id: 'ManutencoesCalculosPageMapping',
											descricao: 'Requerimento/Manutenção de lançamento',
											route: 'manutencoesCalculos',
											breadcrumb: ['Administrando','Lançamentos', 'Requerimento/Manutenção de lançamento'],
											class: 'fa fa-wrench'
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'financeiro',
									descricao: 'Financeiro',
									class: 'col-md-6',
									subitem: [
										{
											id: 'AgenciasBancariasPageMapping',
											descricao: 'Agências',
											route: 'agenciasbancarias',
											breadcrumb: ['Administrando', 'Financeiro', 'Agências'],
											class: 'fa fa-building'
										},
										{
											id: 'BancosPageMapping',
											descricao: 'Bancos',
											route: 'bancos',
											breadcrumb: ['Administrando', 'Financeiro', 'Bancos'],
											class: 'fa fa-university'
										},
										{
											id: 'IndexadoresPageMapping',
											descricao: 'Indexadores',
											route: 'indexadores',
											breadcrumb: ['Administrando', 'Financeiro', 'Indexadores'],
											class: 'fa fa-dollar'
										},
										{
											id: 'LimitesArrecadacaoPageMapping',
											descricao: 'Limites de arrecadação',
											route: 'limitesArrecadacao',
											breadcrumb: ['Administrando','Financeiro', 'Limites de arrecadação'],
											class: 'fa fa-credit-card'
										},
										{
											id: 'ConveniosPageMapping',
											descricao: 'Convênios',
											route: 'convenios',
											breadcrumb: ['Administrando','Financeiro', 'Convênios'],
											class: 'fa fa-barcode'
										}
									]
								},
								{
									id: 'taxas',
									descricao: 'Taxas',
									class: 'col-md-6',
									subitem: [
										{
											id: 'ReceitasDiversasPageMapping',
											descricao: 'Receitas diversas',
											route: 'receitasDiversas',
											breadcrumb: ['Administrando','Taxas', 'Receitas diversas'],
											class: 'fa fa-list-alt'
										}
									]
								},
								{
									id: 'economicos',
									descricao: 'Empresas',
									subitem: [
										{
											id: 'EconomicosPageMapping',
											descricao: 'Econômicos',
											route: 'economicos',
											breadcrumb: ['Administrando','Empresas', 'Econômicos'],
											class: 'fa fa-industry'
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'auxiliares',
									descricao: 'Cadastros auxiliares',
									subitem: [
										{
											id: 'NaturezasTextoJurAtosPageMapping',
											descricao: 'Naturezas de texto jurídico',
											route: 'naturezasTextoJurAtos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Naturezas de texto jurídico'],
											class: 'fa fa-gavel'
										},
										{
											id: 'FontesDivulgacoesAtosPageMapping',
											descricao: 'Fontes de divulgação',
											route: 'fontesDivulgacoesAtos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Fontes de divulgação'],
											class: 'fa fa-newspaper-o'
										},
										{
											id: 'AtosPageMapping',
											descricao: 'Atos',
											route: 'atos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Atos'],
											class: 'fa fa-asterisk'
										},
										{
											id: 'FeriadosPageMapping',
											descricao: 'Feriados',
											route: 'feriados',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Feriados'],
											class: 'fa fa-calendar'
										},
										{
											id: 'UnidadesMedidasPageMapping',
											descricao: 'Unidades de medida',
											route: 'unidadesmedida',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Unidades de medida'],
											class: 'fa fa-thermometer-half'
										},
										{
											id: 'enderecos',
											descricao: 'Endereços',
											route: 'enderecos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Endereços'],
											class: 'fa fa-location-arrow'
										},
										{
											id: 'TiposDocumentosPageMapping',
											descricao: 'Tipos de documento',
											route: 'tiposDocumentos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Tipo de documentos'],
											class: 'fa fa-files-o'
										}, {
											id: 'MotivosPageMapping',
											descricao: 'Motivos',
											route: 'motivos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Motivos'],
											class: 'fa fa-comments-o'
										}, {
											id: 'BeneficiosFiscaisPageMapping',
											descricao: 'Benefícios fiscais',
											route: 'beneficiosFiscais',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Benefícios fiscais'],
											class: 'fa fa-id-card-o'
										},
										{
											id: 'IRRFPageMapping',
											descricao: 'Aliquotas do IRRF',
											descricaoMenu: 'Aliquotas do <abbr title="Imposto de Renda Retido na Fonte">IRRF</abbr>',
											route: 'aliquotasIRRF',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Aliquotas do <abbr title="Imposto de Renda Retido na Fonte">IRRF</abbr>'],
											class: 'fa fa-tasks'
										},
										{
											id: 'MateriaisServicosPageMapping',
											descricao: 'Materiais e serviços',
											route: 'materiaisServicos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Materiais e serviços'],
											class: 'fa fa-tasks'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'executando',
					descricao: 'Executando',
					style: {width: '780px', left: '-100px'},
					colunas: [
						{
							class: 'col-md-3',
							submenu: [
								{
									id: 'emissoes',
									descricao: 'Emissão',
									subitem: [
										{
											id: 'guias',
											descricao: 'Guias',
											route: 'guias',
											click: 'openGuias',
											breadcrumb: '',
											class: 'fa fa fa-tags'
										}, {
											id: 'documentos',
											descricao: 'Documentos',
											route: '',
											breadcrumb: '',
											disabled: true
										},{
											id: 'extratos',
											descricao: 'Extratos do contribuinte',
											breadcrumb: '',
											disabled: true
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'movimentacaoFinanceira',
									descricao: 'Movimentação financeira',
									subitem: [
										{
											id: 'CalculosTributariosPageMapping',
											descricao: 'Cálculo',
											route: 'calculotributario',
											breadcrumb: ['Executando','Movimentação financeira', 'Cálculo'],
											class: 'fa fa-calculator'
										},
										{
											id: 'DeclaracoesIssHomologadoPageMapping',
											descricao: 'Declaração de ISS Homologado',
											descricaoMenu: 'Declaração de <abbr title="Imposto sobre serviços">ISS</abbr> Homologado',
											route: 'declaracaoisshomologado',
											click: 'openDeclaracaoIssHomologado',
											breadcrumb: ['Executando','Movimentação financeira', 'Declaração de ISS Homologado'],
											class: 'fa fa-money'
										},
										{
											id: 'notas',
											descricao: 'Notas Avulsas',
											route: 'notasAvulsas',
											breadcrumb: ['Executando','Movimentação financeira', 'Notas Avulsas']
										},
										{
											id: 'BaixaManual',
											descricao: 'Baixa manual',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Baixa manual'],
											disabled: true
										},
										{
											id: 'BaixaAutomaticaPageMapping',
											descricao: 'Baixa/Estorno automático',
											route: 'baixaAutomatica',
											breadcrumb: ['Executando','Movimentação financeira', 'Baixa/Estorno automático'],
											class: 'fa fa-files-o'
										},
										{
											id: 'ExtornoBaixaManual',
											descricao: 'Estorno de baixa manual',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Estorno de baixa manual'],
											disabled: true
										}
									]
								}
							]
						},
						{
							class: 'col-md-5',
							submenu: [
								{
									id: 'manutencoes',
									descricao: 'Manutenções',
									subitem: [
										{
											id: 'parcelamentoCreditos',
											descricao: 'Parcelamento de créditos',
											route: 'parcelamentoCreditos',
											breadcrumb: ['Executando','Manutenções', 'Parcelamento de créditos'],
											class: 'fa fa-ticket'
										},
										{
											id: 'extornoParcelamento',
											descricao: 'Estorno de parcelamento de créditos',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Estorno de parcelamento de créditos'],
											disabled: true
										},
										{
											id: 'reativarParcelamento',
											descricao: 'Reativar parcelamento de créditos',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Reativar parcelamento de créditos'],
											disabled: true
										},
										{
											id: 'manutencaoParcelamento',
											descricao: 'Manutenção de parcelamento de crédito',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Manutenção de parcelamento de crédito'],
											disabled: true
										},
										{
											id: 'compensacao',
											descricao: 'Compensação',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Compensação'],
											disabled: true
										},
										{
											id: 'restituicao',
											descricao: 'Restituição',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Restituição'],
											disabled: true
										}
									]
								}
							]
						}
					]
				}
			]
		},
		{
			id: 'D',
			descricao: 'Módulo Dívida Ativa',
			url: 'common/header/index_divida_ativa.html',
			shortcuts: [
				{
					id: 'PessoasPageMapping',
					descricao: 'Contribuintes',
					class: 'icone-produto fa fa-users',
					route: 'contribuintes'
				},
				{
					id: 'InscricoesDividasPageMapping',
					descricao: 'Inscrição em dívida',
					class: 'icone-produto fa fa-book',
					route: 'inscricoesDividas'
				},
				{
					id: 'EstornoInscricaoPageMapping',
					descricao: 'Estorno de inscrição',
					class: 'icone-produto fa fa fa-reply-all',
					route: 'estornoInscricao',
				}/*,
				{
					id: 'GuiasPageMapping',
					descricao: 'Guias',
					class: 'icone-produto fa fa-files-o',
					click: 'openGuias',
					route: 'guias'
				},
				{
					id: 'documentos',
					descricao: 'Documentos',
					class: 'icone-produto fa fa-file-text',
					route: ''
				},
				{
					id: 'extratos',
					descricao: 'Extratos do contribuinte',
					class: 'icone-produto fa fa-list-alt',
					route: ''
				}*/
			],
			menus: [
				{
					id: 'configurando',
					descricao: 'Configurando',
					style: {width: '320px'},
					colunas: [
						{
							class: 'col-md-12',
							submenu: [
								{
									id: 'formulas',
									descricao: 'Fórmulas',
									subitem: [
										{
											id: 'ScriptsArrecadacaoPageMapping',
											descricao: 'Fórmulas',
											route: 'formulasCalculo',
											breadcrumb: ['Configurando', 'Fórmulas', 'Fórmulas '],
											class: 'fa fa-superscript'
										}
									]
								},
								{
									id: 'parcelamentos',
									descricao: 'Condições de parcelamentos',
									subitem: [
										{
											id: 'ConfigParcelamentosCreditosPageMapping',
											descricao: 'Parcelamento de créditos',
											route: 'configParcelamentoCreditos',
											breadcrumb: ['Configurando','Condições de parcelamento', 'Parcelamento de créditos'],
											class: 'fa fa-cogs'
										},
										{
											id: 'taxas',
											descricao: 'Taxas para parcelamento',
											route: '',
											breadcrumb: ['Configurando', 'Condições de parcelamentos', 'Taxas para parcelamento'],
											disabled: true
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'administrando',
					descricao: 'Administrando',
					style: {width: '470px', left: '-30px'},
					colunas: [
						{
							class: 'col-md-6',
							submenu: [
								{
									id: 'dividas',
									descricao: 'Dívidas',
									class: 'col-md-6',
									subitem: [
										{
											id: 'DividasPageMapping',
											descricao: 'Dívidas',
											route: '',
											breadcrumb: ['Administrando', 'Dívidas ', 'Dívidas'],
											disabled: true
										},
										{
											id: 'sitDividas',
											descricao: 'Situação das dívidas',
											route: '',
											breadcrumb: ['Administrando', 'Dívidas', 'Situação das dívidas'],
											disabled: true
										}
									]
								},
								{
									id: 'financeiro',
									descricao: 'Financeiro',
									subitem: [
										{
											id: 'AgenciasBancariasPageMapping',
											descricao: 'Agências',
											route: 'agenciasbancarias',
											breadcrumb: ['Administrando', 'Financeiro', 'Agências'],
											class: 'fa fa-building'
										},
										{
											id: 'BancosPageMapping',
											descricao: 'Bancos',
											route: 'bancos',
											breadcrumb: ['Administrando', 'Financeiro', 'Bancos'],
											class: 'fa fa-university'
										},
										{
											id: 'IndexadoresPageMapping',
											descricao: 'Indexadores',
											route: 'indexadores',
											breadcrumb: ['Administrando', 'Financeiro', 'Indexadores'],
											class: 'fa fa-dollar'
										},
										{
											id: 'LimitesArrecadacaoPageMapping',
											descricao: 'Limites de arrecadação',
											route: 'limitesArrecadacao',
											breadcrumb: ['Administrando','Financeiro', 'Limites de arrecadação'],
											class: 'fa fa-credit-card'
										},
										{
											id: 'ConveniosPageMapping',
											descricao: 'Convênios',
											route: 'convenios',
											breadcrumb: ['Administrando','Financeiro', 'Convênios'],
											class: 'fa fa-barcode'
										}
									]
								},
								{
									id: 'taxas',
									descricao: 'Taxas',
									subitem: [
										{
											id: 'ReceitasDiversasPageMapping',
											descricao: 'Receitas diversas',
											route: 'receitasDiversas',
											breadcrumb: ['Administrando', 'Taxas', 'Receitas diversas'],
											class: 'fa fa-list-alt'
										}
									]
								}
							]
						},
						{
							class: 'col-md-6',
							submenu: [
								{
									id: 'auxiliares',
									descricao: 'Cadastros auxiliares',
									subitem: [
										{
											id: 'NaturezasTextoJurAtosPageMapping',
											descricao: 'Naturezas de texto jurídico',
											route: 'naturezasTextoJurAtos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Naturezas de texto jurídico'],
											class: 'fa fa-gavel'
										},
										{
											id: 'FontesDivulgacoesAtosPageMapping',
											descricao: 'Fontes de divulgação',
											route: 'fontesDivulgacoesAtos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Fontes de divulgação'],
											class: 'fa fa-newspaper-o'
										},
										{
											id: 'AtosPageMapping',
											descricao: 'Atos',
											route: 'atos',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Atos'],
											class: 'fa fa-asterisk'
										},
										{
											id: 'FeriadosPageMapping',
											descricao: 'Feriados',
											route: 'feriados',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Feriados'],
											class: 'fa fa-calendar'
										},
										{
											id: 'UnidadesMedidasPageMapping',
											descricao: 'Unidades de medida',
											route: 'unidadesmedida',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Unidades de medida'],
											class: 'fa fa-thermometer-half'
										},
										{
											id: 'enderecos',
											descricao: 'Endereços',
											route: 'enderecos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Endereços'],
											class: 'fa fa-location-arrow'
										}, {
											id: 'MotivosPageMapping',
											descricao: 'Motivos',
											route: 'motivos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Motivos'],
											class: 'fa fa-comments-o'
										}, {
											id: 'BeneficiosFiscaisPageMapping',
											descricao: 'Benefícios fiscais',
											route: 'beneficiosFiscais',
											breadcrumb: ['Administrando', 'Cadastros auxiliares', 'Benefícios fiscais'],
											class: 'fa fa-id-card-o'
										},
										{
											id: 'MateriaisServicosPageMapping',
											descricao: 'Materiais e serviços',
											route: 'materiaisServicos',
											breadcrumb: ['Administrando','Cadastros auxiliares', 'Materiais e serviços'],
											class: 'fa fa-tasks'
										}
									]
								}
							]
						}
					]
				},
				{
					id: 'executando',
					descricao: 'Executando',
					style: {width: '840px', left: '-130px'},
					colunas: [
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'emissoes',
									descricao: 'Emissão',
									subitem: [
										{
											id: 'guias',
											descricao: 'Guias',
											route: 'guias',
											click: 'openGuias',
											breadcrumb: ['Executando','Emissão', 'Guias'],
											class: 'fa fa fa-tags'
										},
										{
											id: 'documentos',
											descricao: 'Documentos',
											route: '',
											breadcrumb: ['Executando','Emissão', 'Documentos'],
											disabled: true
										}, {
											id: 'extratos',
											descricao: 'Extratos do contribuinte',
											route: '',
											breadcrumb: ['Executando','Emissão', 'Extratos do contribuinte'],
											disabled: true
										}, {
											id: 'livrosDivida',
											descricao: 'Livros da dívida ativa',
											route: 'livrosDivida',
											click: 'openEmissaoLivrosDivida',
											breadcrumb: ['Executando','Emissão', 'Livros da dívida ativa'],
											class: 'fa fa fa-tags'
										}, {
											id: 'termoAberturaEncerramentoLivro',
											descricao: 'Termos de abertura/encerramento do livro',
											click: 'openTermosAberturaEncerramentoLivro',
											route: 'openTermosAberturaEncerramentoLivro',
											breadcrumb: ['Executando','Emissão', 'Termos de abertura/encerramento do livro'],


										}
									]
								},
								{
									id: 'movimentacaoFinanceira',
									descricao: 'Movimentação financeira',
									subitem: [
										{
											id: 'BaixaManual',
											descricao: 'Baixa manual',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Baixa manual'],
											disabled: true
										},
										{
											id: 'BaixaAutomaticaPageMapping',
											descricao: 'Baixa/Estorno automático',
											route: 'baixaAutomatica',
											breadcrumb: ['Executando','Movimentação financeira', 'Baixa/Estorno automático'],
											class: 'fa fa-files-o'
										},
										{
											id: 'ExtornoBaixaManual',
											descricao: 'Estorno de baixa manual',
											route: '',
											breadcrumb: ['Executando','Movimentação financeira', 'Estorno de baixa manual'],
											disabled: true
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'processos',
									descricao: 'Processos',
									subitem: [
										{
											id: 'InscricoesDividasPageMapping',
											descricao: 'Inscrição em dívida',
											route: 'inscricoesDividas',
											breadcrumb: ['Executando','Processos', 'Inscrição em dívida'],
											class: 'fa fa-book'
										},
										{
											id: 'EstornoInscricaoPageMapping',
											descricao: 'Estorno de inscrição',
											route: 'estornoInscricao',
											breadcrumb: ['Executando','Processos', 'Estorno de inscrição'],
											class: 'fa fa-reply-all'
										}
									]
								},
								{
									id: 'movimentacaoFinanceira',
									descricao: 'Integrações',
									subitem: [
										{
											id: 'protestoEnvio',
											descricao: 'Envio de protesto de dívida',
											route: '',
											breadcrumb: ['Executando','Integrações', 'Envio de protesto de dívida'],
											disabled: true
										},
										{
											id: 'protestoRetorno',
											descricao: 'Retorno de protesto de dívida',
											route: '',
											breadcrumb: ['Executando','Integrações', 'Retorno de protesto de divida'],
											disabled: true
										},
										{
											id: 'ExtornoBaixaManual',
											descricao: 'Envio para execução Fiscal',
											route: '',
											breadcrumb: ['Executando','Integrações', 'Envio para execução fiscal'],
											disabled: true
										}
									]
								}
							]
						},
						{
							class: 'col-md-4',
							submenu: [
								{
									id: 'manutencoes',
									descricao: 'Manutenções',
									subitem: [
										{
											id: 'ParcelamentosPageMapping',
											descricao: 'Parcelamento de créditos',
											route: 'parcelamentoCreditos',
											breadcrumb: ['Executando','Manutenções', 'Parcelamento de créditos'],
											class: 'fa fa-ticket'
										},
										{
											id: 'extornoParcelamento',
											descricao: 'Estorno de parcelamento de créditos',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Estorno de parcelamento de créditos'],
											disabled: true
										},
										{
											id: 'reativarParcelamento',
											descricao: 'Reativar parcelamento de créditos',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Reativar parcelamento de créditos'],
											disabled: true
										},
										{
											id: 'manutencaoParcelamento',
											descricao: 'Manutenção de parcelamento de crédito',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Manutenção de parcelamento de crédito'],
											disabled: true
										},
										{
											id: 'compensacao',
											descricao: 'Compensação',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Compensação'],
											disabled: true
										},
										{
											id: 'restituicao',
											descricao: 'Restituição',
											route: '',
											breadcrumb: ['Executando','Manutenções', 'Restituição'],
											disabled: true
										}
									]
								}
							]
						}
					]
				}
			]
		}
	];

	var operadoresComparacao = [
		{id: 'IGUAL', descricao: 'Igual', value: '='},
		{id: 'MAIOR', descricao: 'Maior que', value: '>'},
		{id: 'MAIOR_OU_IGUAL', descricao: 'Maior ou igual', value: '>='},
		{id: 'MENOR', descricao: 'Menor que', value: '<'},
		{id: 'MENOR_OU_IGUAL', descricao: 'Menor ou igual', value: '<='}
	];

	var operadores = [
		{id: 'texto', descricao: 'Texto', class: 'fa fa-font item-arrastavel-input', showMore: false, parametros: [ { id: 1, titulo: 'Valor', type: 'text' }]},
		{id: '+', descricao: 'Adição', showMore: false},
		{id: '-', descricao: 'Subtração', showMore: false},
		{id: '×', descricao: 'Multiplicação', showMore: false},
		{id: '÷', descricao: 'Divisão', showMore: false},
		{id: '(', descricao: 'Parêntese esquerdo', showMore: false},
		{id: ')', descricao: 'Parêntese direito', showMore: false},
		{id: '<', descricao: 'Menor', showMore: false},
		{id: '>', descricao: 'Maior', showMore: false},
		{id: '<=', descricao: 'Menor ou igual', showMore: false},
		{id: '>=', descricao: 'Maior ou igual', showMore: false},
		{id: '==', descricao: 'Igual', showMore: false},
		{id: '!=', descricao: 'Diferente', showMore: false},
		{id: '=', descricao: 'Atribuição', showMore: false},
		{id: 'E', descricao: 'E', showMore: false},
		{id: 'OU', descricao: 'Ou', showMore: false},
		{id: 'SE', descricao: 'Se', showMore: false},
		{id: 'SENÂO', descricao: 'SeNão', showMore: false},
		{id: 'FIMSE', descricao: 'FimSe', showMore: false},
		{id: 'ENTÃO', descricao: 'Então', showMore: false},
		{id: '√', descricao: 'Raiz quadrada', showMore: true},
		{id: 'ENQUANTO', descricao: 'Enquanto', showMore: true},
		{id: 'FIMENQUANTO', descricao: 'FimEnquanto', showMore: true},
		{id: 'DIV', descricao: 'Quociente', showMore: true},
		{id: 'MOD', descricao: 'Resto da divisão', showMore: true},
		{id: '//', descricao: 'Comentário', showMore: true, parametros: [ { id: 1, titulo: 'Comentário', type: 'text' }]}
	];

	var posicaoPreenchimento = [
		{id: 'A_ESQUERDA', descricao: 'À esquerda'},
		{id: 'A_DIREITA', descricao: 'À direita'},
		{id: 'NAO_PREENCHER', descricao: 'Não preencher'}
	];

	var posicaoRetirar = [
		{id: 'A_ESQUERDA', descricao: 'À esquerda'},
		{id: 'A_DIREITA', descricao: 'À direita'},
	];

	var situacao = [
		{id: 'ATIVADO', descricao: 'Ativado'},
		{id: 'DESATIVADO', descricao: 'Desativado'}
	];

	var situacaoDivida = [
		{id: 'ABERTO', descricao: 'Em aberto'},
		{id: 'CANCELADA', descricao: 'Cancelada'},
		{id: 'ESTORNADA', descricao: 'Estornada'}
	];

	var abrangenciasFeriados = [
		{id: 'MUNICIPAL', descricao: 'Municipal'},
		{id: 'ESTADUAL', descricao: 'Estadual'},
		{id: 'NACIONAL', descricao: 'Nacional'}
	];

	var tiposFeriados = [
		{id: 'FIXO', descricao: 'Fixo'},
		{id: 'VARIAVEL', descricao: 'Variável'}
	];

	var situacaoEconomico = [
		{id: 'INICIO', descricao: 'Em atividade', key: 'INICIO' },
		{id: 'REINICIO', descricao: 'Em atividade', key: 'REINICIO'},
		{id: 'BAIXADO', descricao: 'Baixado', key: 'BAIXADO'},
		{id: 'SUSPENSO', descricao: 'Suspenso', key: 'SUSPENSO'},
		{id: 'CANCELADO', descricao: 'Cancelado', key: 'CANCELADO'},
		{id: 'PROVISORIO', descricao: 'Provisório', key: 'PROVISORIO'},
		{id: 'IRREGULAR', descricao: 'Irregular', key: 'IRREGULAR'},
		{id: 'REGULAR', descricao: 'Em atividade', key: 'REGULAR'}
	];

	var situacaoProjeto = [
		{id: 'APROVADO', descricao: 'Aprovado'},
		{id: 'CANCELADO', descricao: 'Cancelado'},
		{id: 'EM_ANDAMENTO', descricao: 'Em andamento'},
		{id: 'CANCELANDO_REMEMBRAMENTO', descricao: 'Cancelando...'},
		{id: 'REMEMBRANDO_IMOVEIS', descricao: 'Remembrando...'}
	];

	var tipoArquivo = [
		{id: 'PDF', descricao: 'pdf', class: 'fa fa-file-pdf-o', color: 'red9'},
		{id: 'DOC', descricao: 'doc', class: 'fa fa-file-word-o', color: 'blueC8'},
		{id: 'DOCX', descricao: 'docx', class: 'fa fa-file-word-o', color: 'blueC8'},
		{id: 'TXT', descricao: 'txt', class: 'fa fa-file-text-o', color: 'gray10'},
		{id: 'HTML', descricao: 'html', class: 'fa fa-file-code-o', color: 'orange7'},
		{id: 'XLS', descricao: 'xls', class: 'fa fa-file-excel-o', color: 'greenA10'},
		{id: 'XLSX', descricao: 'xlsx', class: 'fa fa-file-excel-o', color: 'greenA10'},
		{id: 'JPG', descricao: 'jpg', class: 'fa fa-file-image-o', color: 'purpleA8'},
		{id: 'JPEG', descricao: 'jpeg', class: 'fa fa-file-image-o', color: 'purpleA8'},
		{id: 'PNG', descricao: 'png', class: 'fa fa-file-image-o', color: 'purpleA8'},
		{id: 'BMP', descricao: 'bmp', class: 'fa fa-file-image-o', color: 'purpleA8'},
		{id: 'GIF', descricao: 'gif', class: 'fa fa-file-image-o', color: 'purpleA8'},
		{id: 'TIFF', descricao: 'tiff', class: 'fa fa-file-image-o', color: 'purpleA8'},
		{id: 'ODT', descricao: 'odt', class: 'fa fa-file-word-o', color: 'blueC8'}
	];

	var tipoImovel = [
		{id: 'URBANO', descricao: 'Urbano'},
		{id: 'RURAL', descricao: 'Rural'}
	];

	var tipoFiltroEnglobamento = [
		{id: 'INSCRICAO_IMOBILIARIA', descricao: 'Inscrição Imobiliária'},
		{id: 'INCRA', descricao: 'INCRA'},
		{id: 'IDENTIFICADOR', descricao: 'Identificador'},
		{id: 'ENDERECO', descricao: 'Endereço'}
	];

	var tipoUnidade = [
		{id: 'PREDIAL', descricao: 'Predial'},
		{id: 'TERRITORIAL', descricao: 'Territorial'}
	];

	var conteudoCampo = [
		{id: 'SOMENTE_NUMEROS', descricao: 'Números'},
		{id: 'SOMENTE_LETRAS', descricao: 'Letras'},
		{id: 'NUMEROS_LETRAS', descricao: 'Alfanumérico'}
	];

	var completarCom = [
		{id: 'SOMENTE_NUMEROS', descricao: 'Números inteiros'},
		{id: 'SOMENTE_LETRAS', descricao: 'Letras'},
		{id: 'ESPACO', descricao: 'Espaço em branco'}
	];

	var conteudoCompletar = [
		{id: 'NUMEROS_DIREITA', descricao: 'Números à direita'},
		{id: 'NUMEROS_ESQUERDA', descricao: 'Números à esquerda'},
		{id: 'LETRAS_DIREITA', descricao: 'Letras à direita'},
		{id: 'LETRAS_ESQUERDA', descricao: 'Letras à esquerda'},
		{id: 'ESPACO', descricao: 'Espaço em branco'}
	];

	var situacaoImovel = [
		{id: 'ATIVADO', descricao: 'Ativo'},
		{id: 'DESATIVADO', descricao: 'Desativado'},
		{id: 'REMEMBRADO', descricao: 'Remembrado'},
		{id: 'DESMEMBRADO', descricao: 'Desmembrado'}
	];

	var tipoMovimentacao = [
		{id: 'SITUACAO', descricao: 'Situação', url: 'contribuinte/contribuintes-situacao-modal.html'},
		{id: 'AVERBACAO', descricao: 'Averbação', url: 'contribuinte/contribuintes-averbacao-modal.html'},
		{id: 'COMENTARIO', descricao: 'Comentário', url: 'contribuinte/contribuintes-comentario-modal.html'},
		{id: 'ANEXO', descricao: 'Anexo', url: 'contribuinte/contribuintes-anexo-modal.html'}
	];

	var tipoLancamentoParcela = [
		{id: 'TODOS', descricao: 'Todos' },
		{id: 'NORMAL', descricao: 'Normal'},
		{id: 'COMPLEMENTAR', descricao: 'Complementar'}
	];

	var situacaoContribinte = [
		{id: 'ATIVADO', descricao: 'Ativo'},
		{id: 'DESATIVADO', descricao: 'Desativado'}
	];

	var sexo = [
		{id: 'MASCULINO', descricao: 'Masculino'},
		{id: 'FEMININO', descricao: 'Feminino'}
	];

	var nacionalidade = [
		{id: 'BRASILEIRO', descricao: 'Brasileiro'},
		{id: 'NATURALIZADO', descricao: 'Naturalizado'},
		{id: 'ESTRANGEIRO', descricao: 'Estrangeiro'}
	];

	var complementoOab = [
		{id: 'PRIMEIRA_INSCRICAO', descricao: 'Primeira inscrição'},
		{id: 'SEGUNDA_INSCRICAO', descricao: 'Segunda inscrição'},
		{id: 'TERCEIRA_INSCRICAO', descricao: 'Terceira inscrição ou superior'}
	];

	var tipoMovimentacaoImoveis = [
		{id: 'SITUACAO', descricao: 'Situação', service: 'openMovimentacaoSituacao'},
		{id: 'AVERBACAO', descricao: 'Averbação', service: 'openMovimentacaoAverbacao'},
		{id: 'COMENTARIO', descricao: 'Comentário', service: 'openMovimentacaoComentario'},
		{id: 'ANEXO', descricao: 'Anexo', service: 'openMovimentacaoAnexo'},
		{id: 'OBSERVACAO', descricao: 'Observação', service: ''}
	];

	var tipoCondominio = [
		{id: 'VERTICAL', descricao: 'Vertical'},
		{id: 'HORIZONTAL', descricao: 'Horizontal'}
	];

	var tipoCalculo = [
		{id: 'GERAL', descricao: 'Geral'},
		{id: 'INDIVIDUAL', descricao: 'Individual'}
	];

	var simNao = [
		{id: 'SIM', descricao: 'Sim'},
		{id: 'NAO', descricao: 'Não'}
	];

	var tipoDias = [
		{id: 'UTEIS', descricao: 'Dias úteis'},
		{id: 'CORRIDOS', descricao: 'Dias corridos'}
	];

	var tipoDiferencaLancamento = [
		{id: 'MAIOR', descricao: 'Valor (maior)'},
		{id: 'MENOR', descricao: 'Valor (menor)'},
		{id: 'MAIOR_MENOR', descricao: 'Valor (maior/menor)'}
	];

	var formaTransf = [
		{id: 'AUTOMATICA', descricao: 'Automática'},
		{id: 'MANUAL', descricao: 'Manual'}
	];

	var grauRisco = [
		{id: 'NORMAL', descricao: 'Normal'},
		{id: 'ALTO', descricao: 'Alto'}
	];

	var formasPagto = [{id: 'INTEGRAL', descricao: 'Pagamento integral'},
		{id: 'PARCELAMENTO', descricao: 'Parcelamento'},
		{id: 'COMPETENCIA', descricao: 'Por competência'}
	];

	var intervaloVctos = [
		{id: 'MESES', descricao: 'Mês(es)'},
		{id: 'DIAS', descricao: 'Dias'}
	];

	var classificacaoAtividade = [
		{id: 'AGROPECUARIAPESCA', descricao: 'Agropecuária e Pesca', value: 'A'},
		{id: 'INDUSTRIA', descricao: 'Industria', value: 'I'},
		{id: 'MEIOAMBIENTE', descricao: 'Meio Ambiente', value: 'M'},
		{id: 'COMERCIO', descricao: 'Comércio', value: 'C'},
		{id: 'SERVICO', descricao: 'Serviço', value: 'S'}
	];

	var origemCampos = [
		{id: 'IMOVEIS', descricao: 'Imóveis', value: 'I'},
		// {id: 'TRANSFERENCIA_IMOVEIS', descricao: 'Transferência de imóveis', value: 'T'},
		{id: 'ECONOMICOS', descricao: 'Econômicos', value: 'E'}
	];

	var situacaoParcelas = [
		{ descricao: 'Aberta' },
		{ descricao: 'Paga' },
		{ descricao: 'Cancelada' },
		{ descricao: 'Parcelada' },
		{ descricao: 'Suspensa' },
		{ descricao: 'Prescrita' },
		{ descricao: 'Abaixo do limite'},
	];

	var situacaoPenhoras = [
		{ descricao: 'Concluída', key: 'CONCLUIDA', color: 'bth-status--success' },
		{ descricao: 'Cancelada', key: 'CANCELADA', color: 'bth-status--danger' },
		{ descricao: 'Ativa', key: 'ATIVA', color: 'bth-status--primary' }
	]

	var formulasValidacaoCadastral = [
		{id:'PARCELAMENTOS', descricao: 'Parcelamento de créditos'},
		{id:'TRANSFERENCIA_IMOVEIS', descricao: 'Transferência de imóveis'},
		{id:'ECONOMICOS', descricao: 'Econômicos'}
	];

	var formulasITBI = [
		{id:'TRANSFERENCIA_CREDITOS', descricao: 'Transferência de créditos'},
		{id:'VALOR_VENAL_TERRITORIAL', descricao: 'Valor venal territorial'},
		{id:'VALOR_VENAL_CONSTRUCAO', descricao: 'Valor venal construção'},
		{id:'VALOR_VENAL_BENFEITORIAS', descricao: 'Valor venal das benfeitorias'}
	];

	var formulasDivida = [
			{id:'CREDITO_INSCRITO_DIVIDA_ATIVA', descricao: 'Validar inscrição de créditos em dívida'}
	];

	var tipoFormulaCalculo = [
		{id:'ACRESCIMOS', descricao:'Acréscimos', value: 'A'},
		{id:'CALCULO_IMOBILIARIO', descricao:'Cálculo imobiliário', value: 'C'},
		{id:'DIVIDA_ATIVA', descricao:'Cálculo imobiliário', value: 'D'},
		{id:'ITBI', descricao:'Imposto sobre a Transmissão de Bens Imóveis', value: 'I'},
		{id:'REQ_MANUT_CALCULO', descricao:'Requerimento da manutenção de cálculo', value: 'R'},
		{id:'VALIDACAO_CADASTRAL', descricao:'Validação cadastral', value: 'V'}
	];

	var tipoIndexador = [
		{id:'MOEDA_DO_PAIS', descricao: 'Moeda do país'},
		{id:'INDEXADOR', descricao: 'Indexador'}
	];

	var diaSemana = [
		{id:'DOMINGO', descricao: 'Domingo', abreviatura: 'Dom', diaSemana:'DOMINGO'},
		{id:'SEGUNDA', descricao: 'Segunda-feira', abreviatura: 'Seg', diaSemana:'SEGUNDA'},
		{id:'TERCA', descricao: 'Terça-feira', abreviatura: 'Ter', diaSemana:'TERCA'},
		{id:'QUARTA', descricao: 'Quarta-feira', abreviatura: 'Qua', diaSemana:'QUARTA'},
		{id:'QUINTA', descricao: 'Quinta-feira', abreviatura: 'Qui', diaSemana:'QUINTA'},
		{id:'SEXTA', descricao: 'Sexta-feira', abreviatura: 'Sex', diaSemana:'SEXTA'},
		{id:'SABADO', descricao: 'Sábado', abreviatura: 'Sáb', diaSemana:'SABADO'}
	];

	var classificacaoReceita = [
		{id:'IMPOSTO', descricao:'Imposto'},
		{id:'TAXA', descricao:'Taxa'},
		{id:'MELHORIA', descricao:'Melhoria'},
		{id:'NAO_TRIBUTARIA', descricao:'Não tributária'},
		{id:'PARCELAMENTO', descricao:'Parcelamento'}

	];

	var tipoMovimentacaoContribMelhorias = [
		{id: 'EM_ANDAMENTO', descricao: 'Em andamento', url: 'cadastros/contribuicoesMelhorias/aba-contribuicoes-melhorias/movimentacoes/contribuicoes-melhorias-mov-situacao.html', classe:'fa fa-square text-blueA7', classeLabel:'primary', calculada: false},
		{id: 'CONCLUIDA', descricao: 'Concluída', url: 'cadastros/contribuicoesMelhorias/aba-contribuicoes-melhorias/movimentacoes/contribuicoes-melhorias-mov-situacao.html', classe:'fa fa-square text-greenA5', classeLabel:'success', calculada: false},
		{id: 'SUSPENSA', descricao: 'Suspensa', url: 'cadastros/contribuicoesMelhorias/aba-contribuicoes-melhorias/movimentacoes/contribuicoes-melhorias-mov-situacao.html', classe:'fa fa-square text-yellow5', classeLabel:'warning', calculada: false},
		{id: 'CANCELADA', descricao: 'Cancelada', url: 'cadastros/contribuicoesMelhorias/aba-contribuicoes-melhorias/movimentacoes/contribuicoes-melhorias-mov-situacao.html', classe:'fa fa-square text-red5', classeLabel:'danger', calculada: false},
		{id: 'OBSERVACAO', descricao: 'Observação', url: 'cadastros/contribuicoesMelhorias/aba-contribuicoes-melhorias/movimentacoes/contribuicoes-melhorias-mov-observacao.html', classe:'fa fa-comment-o', classeLabel:undefined, calculada: true},
		{id: 'ANEXO', descricao: 'Anexo', url: 'cadastros/contribuicoesMelhorias/aba-contribuicoes-melhorias/movimentacoes/contribuicoes-melhorias-mov-anexo.html', classe:'fa fa-paperclip', classeLabel:undefined, calculada: true}

	];

	var classificacaoTipoAto = [
		{id: 'ATA', descricao: 'Ata'},
		{id: 'ATA_POSSE', descricao: 'Ata de posse'},
		{id: 'ATO', descricao: 'Ato'},
		{id: 'ATO_ADMINISTRATIVO', descricao: 'Ato administrativo'},
		{id: 'ATO_LEGISLATIVO', descricao: 'Ato da comissão executiva do poder legislativo'},
		{id: 'ATO_CONSORCIO', descricao: 'Ato de consórcio'},
		{id: 'ATO_DELIBERATIVO', descricao: 'Ato do conselho deliberativo'},
		{id: 'ATO_FISCAL', descricao: 'Ato do conselho fiscal'},
		{id: 'COMUNICACAO_INTERNA', descricao: 'Comunicação interna'},
		{id: 'CONCESSAO_AFASTAMENTO_PARTICULAR', descricao: 'Concessão de afastamento por interesses particulares'},
		{id: 'CONSTITUICAO', descricao: 'Constituição'},
		{id: 'CONTRATO', descricao: 'Contrato'},
		{id: 'CONVENIO', descricao: 'Convênio'},
		{id: 'DECRETO', descricao: 'Decreto'},
		{id: 'DECRETO_LEGISLATIVO', descricao: 'Decreto legislativo'},
		{id: 'DECRETO_LEI', descricao: 'Decreto de lei'},
		{id: 'DELIBERACAO', descricao: 'Deliberação'},
		{id: 'DESPACHO', descricao: 'Despacho'},
		{id: 'EDITAL', descricao: 'Edital'},
		{id: 'EMENDA', descricao: 'Emenda'},
		{id: 'EMENDA_CONSTITUCIONAL', descricao: 'Emenda constitucional'},
		{id: 'EMENDA_MODIFICATIVA', descricao: 'Emenda modificativa'},
		{id: 'ESTATUTO_SOCIAL', descricao: 'Estatuto socia'},
		{id: 'IMAGEM_PUBLICACAO', descricao: 'Imagem do exemplar de publicação no órgão oficial'},
		{id: 'INSTRUCAO', descricao: 'Instrução'},
		{id: 'JUSTIFICATIVA_INTERVENCAO', descricao: 'Justificativa para cancelamento ou cadastro indevido de intervenção'},
		{id: 'LEI', descricao: 'Lei'},
		{id: 'LEI_AUTORIZATIVA', descricao: 'Lei autorizativa'},
		{id: 'LEI_COMPLEMENTAR', descricao: 'Lei complementar'},
		{id: 'LEI_CRIACAO', descricao: 'Lei de criação'},
		{id: 'LEI_MUNICIPAL', descricao: 'Lei municipal'},
		{id: 'LEI_ORDINARIA', descricao: 'Lei ordinária'},
		{id: 'LEI_ORGANICA', descricao: 'Lei orgânica'},
		{id: 'MEDICAO', descricao: 'Medição'},
		{id: 'MEDIDA_PROVISORIA', descricao: 'Medida provisória'},
		{id: 'MEMORANDO', descricao: 'Memorando'},
		{id: 'MULTIMIDIA', descricao: 'Multimídia'},
		{id: 'OFICIO', descricao: 'Ofício'},
		{id: 'ORCAMENTO', descricao: 'Orçamento'},
		{id: 'ORCAMENTO_BASE', descricao: 'Orçamento base (execução direta) ou do edital (execução indireta'},
		{id: 'PARECER', descricao: 'Parecer'},
		{id: 'PLANILHA_ADITIVO', descricao: 'Planilha orçamentária aditivo'},
		{id: 'PLANILHA_CONTRATADA', descricao: 'Planilha orçamentária contratada'},
		{id: 'PORTARIA', descricao: 'Portaria'},
		{id: 'PROCESSO', descricao: 'Processo'},
		{id: 'PROCESSO_JUDICIAL', descricao: 'Processo judicial'},
		{id: 'PROJETO', descricao: 'Projeto'},
		{id: 'REGIMENTO_INTERNO', descricao: 'Regimento interno'},
		{id: 'REGIMENTO_IMOVEL', descricao: 'Registro de imóvel'},
		{id: 'REQUERIMENTO', descricao: 'Requerimento'},
		{id: 'RESOLUCAO', descricao: 'Resolução'},
		{id: 'TERMO_MEDICAO', descricao: 'Termo de medição'},
		{id: 'TERMO_PARALISACAO', descricao: 'Termo de paralisação'},
		{id: 'TERMO_RECEBIMENTO', descricao: 'Termo de recebimento'}
	];

	var tiposMeiosComunicacoes = [
		{id: 'JORNAL_CIRCULACAO_NACIONAL', descricao: 'Jornal com circulação nacional'},
		{id: 'JORNAL_CIRCULACAO_ESTADUAL', descricao: 'Jornal com circulação estadual'},
		{id: 'JORNAL_CIRCULACAO_REGIONAL', descricao: 'Jornal com circulação regional'},
		{id: 'JORNAL_CIRCULACAO_MUNICIPAL', descricao: 'Jornal com circulação municipal'},
		{id: 'DIARIO_OFICIAL_UNIAO', descricao: 'Diário oficial da união'},
		{id: 'DIARIO_OFICIAL_ESTADO', descricao: 'Diário oficial do estado'},
		{id: 'DIARIO_OFICIAL_MUNICIPIO', descricao: 'Diário oficial do município'},
		{id: 'DIARIO_JUSTICA', descricao: 'Diário da justiça'},
		{id: 'DIARIO_ASSEMBLEIA', descricao: 'Diário da assembléia'},
		{id: 'MURAL_PUBLICO', descricao: 'Mural público'},
		{id: 'INTERNET', descricao: 'Internet'},
		{id: 'EDITORA', descricao: 'Editora'}
	];

	var tiposBeneficios = [
		{id: 'INCENTIVO', descricao: 'Incentivo', value: 'N'},
		{id: 'REMISSAO', descricao: 'Remissão', value: 'R'},
		{id: 'ISENCAO', descricao: 'Isenção', values: 'I'},
		{id: 'IMUNIDADE', descricao: 'Imunidade', values: 'M'}
	];
	
	var situacaoNota = [
		{id: 'NAO_EMITIDA', descricao: 'Não emitida', value: 'N'},
		{id: 'EMITIDA', descricao: 'Emitida', value: 'E'},
		{id: 'ANULADA', descricao: 'Anulada', values: 'A'}
	];

	var tipoContribuinte = [
		{id: 'NORMAL', descricao: 'Normal', value: 'N'},
		{id: 'CONSTRUTORA_EMPREITEIRA', descricao: 'Construtora/Empreiteira', value: 'O'},
		{id: 'SERVICO_POR_CONTA', descricao: 'Serviço declarado por conta', values: 'S'},
		{id: 'ENTIDADE_ESPECIAL', descricao: 'Entidade especial', values: 'E'},
		{id: 'CONDOMINIO', descricao: 'Condomínio', values: 'C'}
	];

	var tiposEnquadramentos = [
		{id: 'MOBILIARIO', descricao: 'Mobiliário'},
		{id: 'SAUDE', descricao: 'Saúde'}
	];

	var descricaoTransferencia = [
		{id: '1', descricao: 'Arrematação ou adjudicação em leilão'},
		{id: '2', descricao: 'Cessão de direitos sobre imóveis'},
		{id: '3', descricao: 'Compra e venda'},
		{id: '4', descricao: 'Dação em pagamento'},
		{id: '5', descricao: 'Permuta'},
		{id: '6', descricao: 'Promessa de compra e venda'},
		{id: '7', descricao: 'Remição'},
		{id: '8', descricao: 'Torna ou reposição'},
		{id: '9', descricao: 'Transferência de posse'},
		{id: '10', descricao: 'Doação'}
	];


	var tiposMotivos = [
		{id: 'CANCELAMENTO_LANCAMENTO', descricao: 'Cancelamento do lançamento'},
		{id: 'TRANSFERENCIA_IMOVEIS', descricao: 'Transferência de imóveis'},
		{id: 'ESTORNO_DIVIDA', descricao: 'Estorno da inscrição em dívida ativa'},
		{id: 'CANCELAMENTO_PARCELAMENTO', descricao: 'Cancelamento de parcelamento'}
	];

	var tiposSolicitacoesRequerimentos = [
		{id: 'CANCELAMENTO', descricao: 'Cancelamento', categoria: 'M'},
		{id: 'IMUNIDADE', descricao: 'Imunidade', categoria: 'B'},
		{id: 'INCENTIVO', descricao: 'Incentivo', categoria: 'B'},
		{id: 'ISENCAO', descricao: 'Isenção', categoria: 'B'},
		{id: 'REMISSAO', descricao: 'Remissão', categoria: 'B'},
		{id: 'REVISAO_CALCULO', descricao: 'Revisão de cálculo', categoria: 'M'},
		{id: 'REVOGACAO_BENEFICIO', descricao: 'Revogação de benefício', categoria: 'M'}
	];

	var tiposValoresRecolher = [
		{id: 'INSS', descricao: 'INSS', categoria: 'I'},
		{id: 'COFINS', descricao: 'COFINS', categoria: 'C'},
		{id: 'IRRF', descricao: 'IRRF', categoria: 'F'},
		{id: 'SEST_SENAT', descricao: 'SEST/SENAT', categoria: 'S'},
		{id: 'CSLL', descricao: 'CSLL', categoria: 'L'},
		{id: 'PIS_PASEP', descricao: 'PIS/PASEP', categoria: 'P'}
	];

	var tiposVinculoAtosReceitas = [
		{id: 'MOVIMENTACAO', descricao: 'Movimentação', value: 'M'},
		{id: 'ESTORNO', descricao: 'Estorno', value: 'E'},
		{id: 'AMBOS', descricao: 'Ambos', value: 'A'}
	];

	var situacoesRequerimentos = [
		{id: 'AGENDADO', descricao: 'Agendado'},
		{id: 'APLICADO', descricao: 'Benefício aplicado'},
		{id: 'CREDITO_NAO_GERADO', descricao: 'Crédito tributário não gerado'},
		{id: 'DEFERIDO', descricao: 'Deferido'},
		{id: 'DEFERIDO_PARCIALMENTE', descricao: 'Deferido parcialmente'},
		{id: 'EM_ANALISE', descricao: 'Em análise'},
		{id: 'INDEFERIDO', descricao: 'Indeferido'},
		{id: 'PENDENTE', descricao: 'Pendente'}
	];

	var tipoCartorio = [
		{id: 'REGISTRO_CIVIL', descricao: 'Registro civil'},
		{id: 'TABELIONATO_NOTAS', descricao: 'Tabelionato de notas'},
		{id: 'REGISTRO_IMOVEIS', descricao: 'Registro de imóveis'},
		{id: 'TABELIONATO_PROTESTO', descricao: 'Tabelionato de protesto'},
		{id: 'REGISTRO_TITULOS', descricao: 'Registro de títulos'}
	];

	var tipoCadastroAdvogado = [
		{id: 'ADVOGADO', descricao: 'Advogado'},
		{id: 'ESCRITORIO', descricao: 'Escritório'},
		{id: 'PROCURADOR', descricao: 'Procurador'}
	];

	var tiposAbrangencias = [
		{id: 'GERAL', descricao: 'Geral'},
		{id: 'INDIVIDUAL', descricao: 'Individual'}
	];

	var enderecos = [
		{id: 'BairrosPageMapping', descricao: 'Bairros', state: 'bairros' },
		{id: 'CondominiosPageMapping', descricao: 'Condomínios', state: 'condominios' },
		{id: 'DistritosPageMapping', descricao: 'Distritos', state: 'distritos' },
		{id: 'PageMapping', descricao: 'Estados', state: 'estados' },
		{id: 'FacesPageMapping', descricao: 'Faces', state: 'faces' },
		{id: 'LocalidadesPageMapping', descricao: 'Localidades', state: 'localidades' },
		{id: 'LoteamentosPageMapping', descricao: 'Loteamentos', state: 'loteamentos' },
		{id: 'MunicipiosPageMapping', descricao: 'Municípios', state: 'municipios' },
		{id: 'SecoesPageMapping', descricao: 'Seções', state: 'secoes' },
		{id: 'LogradourosPageMapping', descricao: 'Logradouros', state: 'logradouros' }
	];

	var situacaoDocumento = [
		{id:'ENTREGUE', descricao: 'Entregue'},
		{id:'DISPENSADO', descricao: 'Dispensado'},
		{id:'FALTANTE', descricao: 'faltante'}
	];

	var tipoContaBancaria = [
		{id:'CORRENTE', descricao: 'Corrente'},
		{id:'POUPANCA', descricao: 'Poupança'},
		{id:'SALARIO', descricao: 'Salário'}
	];

	var statusContaBancaria = [
		{id:'ABERTA', descricao: 'Aberta'},
		{id:'ENCERRADA', descricao: 'Encerrada'}
	];

	var situacaoManutencao = [
		{ id: 'DEFERIDO', descricao: 'Deferido'},
		{ id: 'DEFERIDO_PARCIALMENTE', descricao: 'Deferido parcialmente'},
		{ id: 'EM_ANALISE', descricao: 'Em análise'},
		{ id: 'INDEFERIDO', descricao: 'Indeferido'}
	];

	var regimeCobrancaIssQn = [  {id: 'HOMOLOGADO', key: 'HOMOLOGADO', descricao: 'Homologado'},
		{id: 'FIXO', key: 'FIXO', descricao: 'Fixo'},
		{id: 'ESTIMADO', key: 'ESTIMADO', descricao: 'Estimado'},
		{id: 'ARBITRADO', key: 'ARBITRADO', descricao: 'Arbitrado'},
		{id: 'SEM_COBRANCA', key: 'SEM_COBRANCA', descricao: 'Sem cobrança'}];

	var tipoScript = [
		{ id: 'BENEFICIO_FISCAL', descricao: 'Requerimento da manutenção de cálculo'},
		{ id: 'ACRESCIMO', descricao: 'Fórmula para cálculo de acréscimos'},
		{ id: 'GERACAO_CREDITO', descricao: 'Fórmula para cálculo'},
		{ id: 'VALIDACAO_CADASTRAL', descricao: 'Validação cadastral'},
		{ id: 'ITBI', descricao: 'ITBI (Imposto sobre a Transmissão de Bens Imóveis)'},
		{ id: 'DIVIDA_ATIVA', descricao: 'Dívida ativa'},
		{ id: 'DESCONTO_PARCELAMENTO', descricao: 'Desconto para parcelamentos'},
		{ id: 'CONVENIO_BANCARIO', descricao: 'Convênio bancário'},
		{ id: 'IMPOSTOS_FEDERAIS', descricao: 'Impostos federais'},
		{ id: 'REDUCAO_BASE_CALC_ISSQN', descricao: 'Fórmula para a redução da base de cálculo do ISSQN'}
	];

	var tipoAcrescimo = [
		{ id: 'CORRECAO', descricao: 'Correção'},
		{ id: 'JURO', descricao: 'Juros'},
		{ id: 'MULTA', descricao: 'Multa'}
	];

	var tipoCorrecao = [
		{ id: 'POS_FIXADA', descricao: 'Pós-fixada'},
		{ id: 'PRE_FIXADA', descricao: 'Pré-fixada'}
	];

	var tipoJuro = [
		{ id: 'PARCELAMENTO', descricao: 'Parcelamento'},
		{ id: 'MORATORIO', descricao: 'Moratório'}
	];

	var porteEmpresa = [
		{ id: 'NAO_CLASSIFICADA', descricao: 'Não classificada'},
		{ id: 'MICROEMPRESA', descricao: 'Microempresa'},
		{ id: 'EMPRESA_PEQUENO_PORTE', descricao: 'Empresa de pequeno porte'},
		{ id: 'EMPRESA_MEDIO_PORTE', descricao: 'Empresa de médio porte'},
		{ id: 'EMPRESA_GRANDE_PORTE', descricao: 'Empresa de grande porte'},
		{ id: 'MICROEMPREENDEDOR_INDIVIDUAL', descricao: 'Microempreendedor individual'}
	];

	var unidadeMedida = [
		{ id: 'ACAO', descricao: 'Ação'},
		{ id: 'ACELERACAO', descricao: 'Aceleração'},
		{ id: 'ACELERACAO_ANGULAR', descricao: 'Aceleração Angular'},
		{ id: 'ANGULO_PLANO', descricao: 'Ângulo Plano'},
		{ id: 'ANGULO_SOLIDO', descricao: 'Ângulo Sólido'},
		{ id: 'AREA', descricao: 'Área'},
		{ id: 'ATIVIDADE_CATALITICA', descricao: 'Atividade Catalítica'},
		{ id: 'ATIVIDADE_RADIONUCLIDEO', descricao: 'Atividade de um Radionuclídeo'},
		{ id: 'CALOR', descricao: 'Calor'},
		{ id: 'CAMPO_ELETRICO', descricao: 'Campo Elétrico'},
		{ id: 'CAMPO_MAGNETICO', descricao: 'Campo Magnético'},
		{ id: 'CAPACIDADE', descricao: 'Capacidade'},
		{ id: 'CAPACIDADE_TERMICA', descricao: 'Capacidade Térmica'},
		{ id: 'CAPACIDADE_TERMICA_ESPECIFICA', descricao: 'Capacidade Térmica Específica'},
		{ id: 'CAPACIDADE_TERMICA_MOLAR', descricao: 'Capacidade Térmica Molar'},
		{ id: 'CAPACITANCIA', descricao: 'Capacitância'},
		{ id: 'CARGA', descricao: 'Carga'},
		{ id: 'CARGA_ELETRICA', descricao: 'Carga elétrica'},
		{ id: 'COMPRIMENTO', descricao: 'Comprimento'},
		{ id: 'CONCENTRACAO_ATIVIDADE_CATALITICA', descricao: 'Concentração de Atividade Catalítica'},
		{ id: 'CONCENTRACAO_MASSICA', descricao: 'Concentração Mássica'},
		{ id: 'CONCENTRACAO_QUANTIDADE_SUBSTANCIA', descricao: 'Concentração de Quantidade de Substância'},
		{ id: 'CONDUTANCIA_ELETRICA', descricao: 'Condutância Elétrica'},
		{ id: 'CONDUTIVIDADE_ELETRICA', descricao: 'Condutividade Elétrica'},
		{ id: 'CONDUTIVIDADE_ELETROLITICA', descricao: 'Condutividade Eletrolítica'},
		{ id: 'CONDUTIVIDADE_MOLAR', descricao: 'Condutividade Molar'},
		{ id: 'CORRENTE_ELETRICA', descricao: 'Corrente Elétrica'},
		{ id: 'DENSIDADE', descricao: 'Densidade'},
		{ id: 'DENSIDADE_CARGA_ELETRICA', descricao: 'Densidade de Carga Elétrica'},
		{ id: 'DENSIDADE_CARGA_SUPERFICIAL', descricao: 'Densidade de Carga Superficial'},
		{ id: 'DENSIDADE_CORRENTE_ELETRICA', descricao: 'Densidade de Corrente Elétrica'},
		{ id: 'DENSIDADE_FLUXO_TERMICO', descricao: 'Densidade de Fluxo Térmico'},
		{ id: 'DENSIDADE_LINEAR', descricao: 'Densidade Linear'},
		{ id: 'DENSIDADE_RELATIVA', descricao: 'Densidade Relativa'},
		{ id: 'DENSIDADE_SUPERFICIAL', descricao: 'Densidade Superficial'},
		{ id: 'DIFERENCA_POTENCIAL_ELETRICO', descricao: 'Diferença de Potencial Elétrico'},
		{ id: 'DISTANCIA', descricao: 'Distância'},
		{ id: 'DOSE_ABSORVIDA', descricao: 'Dose Absorvida'},
		{ id: 'EFICACIA_LUMINOSA_ESPECTRAL', descricao: 'Eficácia Luminosa Espectral'},
		{ id: 'EMISSIVIDADE', descricao: 'Emissividade'},
		{ id: 'ENERGIA', descricao: 'Energia'},
		{ id: 'ENERGIA_INTERNA_MOLAR', descricao: 'Energia Interna Molar'},
		{ id: 'ENTROPIA_MOLAR', descricao: 'Entropia Molar'},
		{ id: 'EQUIVALENTE_DOSE', descricao: 'Equivalente de Dose'},
		{ id: 'EXCITANCIA_LUMINOSA', descricao: 'Excitância Luminosa'},
		{ id: 'EXCITANCIA_RADIANTE', descricao: 'Excitância Radiante'},
		{ id: 'EXPOSICAO', descricao: 'Exposição'},
		{ id: 'FLUXO_LUMINOSO', descricao: 'Fluxo Luminoso'},
		{ id: 'FLUXO_MAGNETICO', descricao: 'Fluxo Magnético'},
		{ id: 'FLUXO_RADIANTE', descricao: 'Fluxo Radiante'},
		{ id: 'FLUXO_TERMICO', descricao: 'Fluxo Térmico'},
		{ id: 'FORCA', descricao: 'Força'},
		{ id: 'FORCA_ELETROMOTRIZ', descricao: 'Força Eletromotriz'},
		{ id: 'FREQUENCIA', descricao: 'Frequência'},
		{ id: 'GRADIENTE_TEMPERATURA', descricao: 'Gradiente de Temperatura'},
		{ id: 'GRANDEZAS_RAZAO_LOGARITMICAS', descricao: 'Grandezas de Razão Logarítmicas'},
		{ id: 'ILUMINANCIA', descricao: 'Iluminância'},
		{ id: 'IMPULSO', descricao: 'Impulso'},
		{ id: 'IMPULSO_ANGULAR', descricao: 'Impulso Angular'},
		{ id: 'INDICE_REFRACAO', descricao: 'Índice de Refração'},
		{ id: 'INDUCAO_ELETRICA', descricao: 'Indução Elétrica'},
		{ id: 'INDUCAO_MAGNETICA', descricao: 'Indução Magnética'},
		{ id: 'INDUTANCIA', descricao: 'Indutância'},
		{ id: 'INTENSIDADE_LUMINOSA', descricao: 'Intensidade Luminosa'},
		{ id: 'INTENSIDADE_RADIANTE', descricao: 'Intensidade Radiante'},
		{ id: 'IRRADIANCIA', descricao: 'Irradiância'},
		{ id: 'LUMINANCIA', descricao: 'Luminância'},
		{ id: 'MASSA', descricao: 'Massa'},
		{ id: 'MASSA_MOLAR', descricao: 'Massa Molar'},
		{ id: 'MOMENTO_ANGULAR', descricao: 'Momento Angular'},
		{ id: 'MOMENTO_DIPOLO_ELETRICO', descricao: 'Momento de Dipolo Elétrico'},
		{ id: 'MOMENTO_FORCA_TORQUE', descricao: 'Momento de uma Força, Torque'},
		{ id: 'MOMENTO_INERCIA', descricao: 'Momento de Inércia'},
		{ id: 'NUMERO_ONDA', descricao: 'Número de Onda'},
		{ id: 'OUTRAS', descricao: 'Outras'},
		{ id: 'PERMEABILIDADE', descricao: 'Permeabilidade'},
		{ id: 'PERMISSIVIDADE', descricao: 'Permissividade'},
		{ id: 'POTENCIA', descricao: 'Potência'},
		{ id: 'POTENCIA_APARENTE', descricao: 'Potência Aparente'},
		{ id: 'POTENCIA_REATIVA', descricao: 'Potência Reativa'},
		{ id: 'PRESSAO', descricao: 'Pressão'},
		{ id: 'QUANTIDADE_MOVIMENTO', descricao: 'Quantidade de Movimento'},
		{ id: 'QUANTIDADE_SUBSTANCIA', descricao: 'Quantidade de Substância'},
		{ id: 'RADIANCIA', descricao: 'Radiância'},
		{ id: 'RELUTANCIA', descricao: 'Relutância'},
		{ id: 'RESISTENCIA_ELETRICA', descricao: 'Resistência Elétrica'},
		{ id: 'RESISTIVIDADE', descricao: 'Resistividade'},
		{ id: 'TAXA_DOSE_ABSORVIDA', descricao: 'Taxa de Dose Absorvida'},
		{ id: 'TEMPERATURA_CELSIUS', descricao: 'Temperatura Celsius'},
		{ id: 'TEMPERATURA_TERMODINAMICA', descricao: 'Temperatura Termodinâmica'},
		{ id: 'TEMPO', descricao: 'Tempo'},
		{ id: 'TENSAO', descricao: 'Tensão'},
		{ id: 'TENSAO_ELETRICA', descricao: 'Tensão Elétrica'},
		{ id: 'TRABALHO', descricao: 'Trabalho'},
		{ id: 'VAZAO_MASSICA', descricao: 'Vazão Mássica'},
		{ id: 'VAZAO_VOLUMETRICA', descricao: 'Vazão Volumétrica'},
		{ id: 'VELOCIDADE', descricao: 'Velocidade'},
		{ id: 'VELOCIDADE_ANGULAR', descricao: 'Velocidade Angular'},
		{ id: 'VISCOSIDADE_CINEMATICA', descricao: 'Viscosidade Cinemática'},
		{ id: 'VISCOSIDADE_DINAMICA', descricao: 'Viscosidade Dinâmica'},
		{ id: 'VOLUME', descricao: 'Volume'},
		{ id: 'VOLUME_ESPECIFICO', descricao: 'Volume Específico'},
		{ id: 'VOLUME_MOLAR', descricao: 'Volume Molar'}
	];

	var tipoCamposAdicionais = [
		{id: 'AREA_TERRENO' , descricao: 'Área do terreno'},
		{id: 'AREA_TOTAL' , descricao: 'Área total construída'},
		{id: 'AREA_CONSTRUIDA' , descricao: 'Área construída da unidade'},
		{id: 'VALOR_VENAL' , descricao: 'Valor venal do imóvel'},
		{id: 'VALOR_VENAL_TERRITORIAL' , descricao: 'Valor venal territorial'},
		{id: 'VALOR_VENAL_CONSTRUIDO' , descricao: 'Valor venal construído'},
		{id: 'DATA', descricao: 'Data'},
		{id: 'HORA', descricao: 'Hora'},
		{id: 'DATAHORA', descricao: 'Data/hora'},
		{id: 'TEXTO', descricao: 'Texto'},
		{id: 'NUMERICO', descricao: 'Numérico'},
		{id: 'MULTIPLA_SELECAO', descricao: 'Múltipla seleção'},
		{id: 'LISTA_SELECAO', descricao: 'Lista de seleção'},
		{id: 'AREA_TEXTO', descricao: 'Área de texto'},
		{id: 'CPF', descricao: 'CPF'},
		{id: 'CNPJ', descricao: 'CNPJ'},
		{id: 'EMAIL', descricao: 'Email'},
		{id: 'TELEFONE', descricao: 'Telefone'}
	];

	var formatoData = [
		{id: 'dd/mm/yy' , descricao: 'dd/mm/aaaa'},
		{id: 'dd/mm' , descricao: 'dd/mm'},
		{id: 'mm/yy' , descricao: 'mm/aaaa'}
	];

	var formatHora = [
		{id: 'HH:mm:ss' , descricao: 'hh:mm:ss'},
		{id: 'HH:mm' , descricao: 'hh:mm'}
	];

	var formatoLivro = [
		{id: 'ANO', descricao: 'Por ano'},
		{id: 'GLOBAL', descricao: 'Global'}
	];

	var formatoInscricao = [
		{id: 'ANO', descricao: 'Por ano'},
		{id: 'LIVRO', descricao: 'Por livro'},
		{id: 'GLOBAL', descricao: 'Global'}
	];

	var criterioFormaPagamento = [
		{id: 'MENOR_DATA_VENCIMENTO', descricao: 'Menor data de vencimento'},
		{id: 'MAIOR_DATA_VENCIMENTO', descricao: 'Maior data de vencimento'},
		{id: 'MENOR_QUANTIDADE_PARCELAS', descricao: 'Menor quantidade de parcelas vencidas'},
		{id: 'MAIOR_QUANTIDADE_PARCELAS', descricao: 'Maior quantidade de parcelas vencidas'}
	];

	var situacaoTransfImoveis = [
		{id: 'ABERTA', descricao: 'Aberta'},
		{id: 'CALCULADA', descricao: 'Calculada'},
		{id: 'CANCELADA', descricao: 'Cancelada'},
		{id: 'ENCERRADA', descricao: 'Encerrada'},
		{id: 'PENDENTE', descricao: 'Pendente'}
	];

	var tipoCobrancaTransfImoveis = [
		{id: 'IMOVEL', descricao: 'Por imóvel'},
		{id: 'SEM_COBRANCA', descricao: 'Sem cobrança'},
		{id: 'TRANSFERENCIA', descricao: 'Por transferência'},
		{id: 'VENDA', descricao: 'Por venda'}
	];

	var acaoVctoFeriado = [
		{id: 'ANTECIPA', descricao: 'Antecipa vencimento'},
		{id: 'PERMANECE', descricao: 'Mantém vencimento'},
		{id: 'PRORROGA', descricao: 'Prorroga vencimento'}
	];

	var tipoIntervaloInscricao = [
		{id: 'ANO', descricao: 'Por ano'},
		{id: 'DATA_VENCIMENTO', descricao: 'Por data de vencimento'},
		{id: 'DIAS', descricao: 'Em dias'}
	];

	var tipoVendaTransf = [
		{id: 'PARCIAL', descricao: 'Parcial'},
		{id: 'TOTAL', descricao: 'Total'}
	];

	var definicaoPagadorTransf = [
		{id: 'COMPRADOR', descricao: 'Comprador'},
		{id: 'VENDEDOR', descricao: 'Vendedor'}
	];

	var situacaoSimulacao = [
		{id:'AGUARDANDO_PROCESSAMENTO', descricao: 'Aguardando processamento'},
		{id:'EM_PROCESSAMENTO', descricao: 'Em processamento'},
		{id:'PROCESSADA', descricao: 'Processada'},
		{id:'INSCRITA', descricao: 'Inscrita'},
		{id:'CANCELADA', descricao: 'Cancelada'},
		{id: 'PROCESSAMENTO_COM_ERRO', descricao: 'Com erro'}
	];

	var situacaoDeclaracao = [
		{id: 'NAO_INICIADA', descricao: 'Não iniciada'},
		{id: 'ENCERRADA', descricao: 'Encerrada'},
		{id: 'ABERTA', descricao: 'Aberta'},
		{id: 'ENCERRADA_SEM_MOVIMENTO', descricao: 'Encerrada s/ movimento'}
	];

	var formasPagtoCalculo = [
		{id: 'USAR_CONFIGURACAO_PARCELAS', descricao: 'Usar configuração de parcelas'},
		{id: 'DEFINIR_PARCELAS', descricao: 'Definir parcelas'},
		{id: 'POR_COMPETENCIA', descricao: 'Por competência'}
	];

	var tipoParcelamento = [
		{id: 'INSCRITOS', descricao: 'Inscritos'},
		{id: 'NAO_INSCRITOS', descricao: 'Não inscritos'},
		{id: 'PARCELADOS', descricao: 'Parcelados'}
	];

	var nivelCBO = [
		{id: 'GRANDE_GRUPO', descricao: 'Grande Grupo'},
		{id: 'SUBGRUPO_PRINCIPAL', descricao: 'Subgrupo Principal'},
		{id: 'SUBGRUPO', descricao: 'Subgrupo'},
		{id: 'FAMILIA', descricao: 'Família'},
		{id: 'OCUPACAO', descricao: 'Ocupação'},
		{id: 'SINONIMO', descricao: 'Sinônimo'}
	];

	var situacaoConvenio = [
		{id: 'SIM', descricao: 'Disponível'},
		{id: 'NAO', descricao: 'Indisponível'}
	];

	var tipoPagamento = [
		{id: "SEM_PARCELA", descricao: "Guia não localizada", abreviatura: "SP"},
		{id: "NORMAL", descricao: "Pagamento sem inconsistência", abreviatura: "NO"},
		{id: "INDEVIDO", descricao: "Indevido", abreviatura: "IN"},
		{id: "PAGOS", descricao: "Parcela já paga", abreviatura: "PP"},
		{id: "PARCELADO", descricao: "Guia parcelada", abreviatura: "PA"},
		{id: "CANCELADA", descricao: "Guia cancelada", abreviatura: "CA"},
		{id: "ELIMINADA", descricao: "Guia eliminada", abreviatura: "EL"},
		{id: "SUSPENSA", descricao: "Guia suspensa", abreviatura: "SU"},
		{id: "REMIDA", descricao: "Guia remida", abreviatura: "RE"},
		{id: "ISENTO", descricao: "Guia isenta", abreviatura: "IS"}
	];

   	var contribuintes = [
		{ id: 20, img: 'images/antonio.jpg',        nome: 'Antônio Pacheco Diniz',                                          situacao: 'Ativo',       codigo: '12345', cpfcnpj: '135.539.645-02',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 1,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }], contas: [
			{ banco: 5, agencia: 999, conta: 1234, digito: 5, status: 'Aberta' },
			{ banco: 1, agencia: 999, conta: 1234, digito: 5, status: 'Encerrada' },
			{ banco: 2, agencia: 999, conta: 1234, digito: 5, status: 'Aberta' },
		]},
		{ id: 21, img: 'images/thialen.jpg',        nome: 'Thialen Dara dos Santos Freitas de Souza',                       situacao: 'Ativo',       codigo: '23456', cpfcnpj: '678.607.338-70',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 8,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: true }], contas: [
			{ banco: 4, agencia: 999, conta: 1234, digito: 5, status: 'Aberta' },
		]},
		{ id: 22, img: 'images/rafael.jpg',         nome: 'Rafael Henrique Walter',                                         situacao: 'Ativo',       codigo: '34567', cpfcnpj: '111.265.217-52',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 12,  telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }], contas: [
			{ banco: 1, agencia: 999, conta: 1234, digito: 5, status: 'Aberta' },
		]},
		{ id: 1,  img: 'images/claudionor.jpg',     nome: 'Claudionor Araújo Guimarães',                                    situacao: 'Ativo',       codigo: '19221', cpfcnpj: '746.628.378-04',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 8,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 2,  img: 'images/lilian.jpg',         nome: 'Lilian Moura Olinesi',                                           situacao: 'Ativo',       codigo: '12333', cpfcnpj: '343.772.635-87',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 0,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 3,  img: 'images/jessica.jpg',        nome: 'Jéssica Verdoro Miranda',                                        situacao: 'Ativo',       codigo: '84554', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 12,  telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 4,  img: 'images/douglas.jpg',        nome: 'Douglas Neto Beskauer',                                          situacao: 'Ativo',       codigo: '69549', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 9,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: true  }] },
		{ id: 5,  img: 'images/liandra.jpg',        nome: 'Liandra Terezinha Brito',                                        situacao: 'Ativo',       codigo: '06992', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 5,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 6,  img: 'images/matheus.jpg',        nome: 'Matheus Philippe Martins da Cruz',                               situacao: 'Ativo',       codigo: '98732', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 13,  telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 7,  img: 'images/avatar.png',         nome: 'Fernandes Fonseca Moraes',                                       situacao: 'Ativo',       codigo: '77898', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 0,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 8,  img: 'images/joao.jpg',           nome: 'João Antônio Junior',                                            situacao: 'Ativo',       codigo: '99952', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 1,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 9,  img: 'images/christine.jpg',      nome: 'Christine Costa Silva',                                          situacao: 'Ativo',       codigo: '38185', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 11,  telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: true  }] },
		{ id: 10, img: 'images/marcio.jpg',         nome: 'Marcio Azevedo Nunes',                                           situacao: 'Desativado',  codigo: '70851', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 13,  telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 11, img: 'images/oendel.jpg',         nome: 'Oendel Magalhães',                                               situacao: 'Ativo',       codigo: '98656', cpfcnpj: '123.456.789-01',     socialFantasia: '',     tipoPessoa: 'Física',   nascimento: '22/02/1990', endereco: 2,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 12, img: '',                          nome: 'Lacerda Transporte LTDA',                                        situacao: 'Ativo',       codigo: '19221', cpfcnpj: '36.310.435/0001-80', socialFantasia: 'LTL',  tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 13,  telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: true ,  cart: false  }] },
		{ id: 13, img: '',                          nome: 'Araucaria Rail Techinology LTDA',                                situacao: 'Ativo',       codigo: '12333', cpfcnpj: '74.655.246/0001-38', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 2,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 14, img: '',                          nome: 'Bently do Brasil LTDA.',                                         situacao: 'Ativo',       codigo: '84554', cpfcnpj: '19.686.471/0001‐23', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 3,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 15, img: '',                          nome: 'Laboratório Búrigo',                                             situacao: 'Ativo',       codigo: '69549', cpfcnpj: '63.025.530/0028‐24', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 4,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: true  }], economicos: [
			{ econ: 1 }, { econ: 2 }, { econ: 3 }, { econ: 4 }, { econ: 5 }
		]},
		{ id: 23, img: '' ,                         nome: 'Laboratório Rocha',                                              situacao: 'Ativo',       codigo: '63549', cpfcnpj: '63.025.530/0028‐24', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 4,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }], economicos: [
			{ econ: 12 }, { econ: 13 }, { econ: 14 }, { econ: 15 }
		]},
		{ id: 24, img: '',                          nome: 'Bradesco S/A',                                                   situacao: 'Ativo',       codigo: '77859', cpfcnpj: '63.025.530/0028‐24', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 4,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }], economicos: [
			{ econ: 16 }, { econ: 17 }, { econ: 18 }, { econ: 19 }, { econ: 20 }, { econ: 21 }
		]},
		{ id: 16, img: '' ,                         nome: 'Ferrovia Norte Sul S/A',                                         situacao: 'Desativado',  codigo: '06992', cpfcnpj: '01.637.895/0135‐44', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 5,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 17, img: '' ,                         nome: 'Fernandes Embalagens Idustrias do Amazonas LTDA',                situacao: 'Ativo',       codigo: '98732', cpfcnpj: '01.637.895/0175‐31', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 6,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 18, img: '' ,                         nome: 'Pronac Empreendimentos COM. E IND. LTDA.',                       situacao: 'Ativo',       codigo: '77898', cpfcnpj: '01.637.895/0074‐98', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 7,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 19, img: '' ,                         nome: 'Tecnowat Iluminação LTDA',                                       situacao: 'Ativo',       codigo: '99952', cpfcnpj: '53.761.607/0001‐50', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 8,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }] },
		{ id: 26, img: '' ,                         nome: 'Construtora Fontana',                                            situacao: 'Ativo',       codigo: '45488', cpfcnpj: '48.586.512/0001‐66', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 4,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }], economicos: [
			{ econ: 23 }, { econ: 24 }, { econ: 25 }
		]},
		{ id: 25, img: '' ,                         nome: 'Construtora Pavei',                                              situacao: 'Ativo',       codigo: '33249', cpfcnpj: '48.586.512/0001‐04', socialFantasia: 'FNSS', tipoPessoa: 'Jurídica', nascimento: '22/02/1990', endereco: 4,   telefone: '(48) 9 9911-0022', email: 'mail@mail.com.br', vinculos: [{adv: false , cart: false }], economicos: [
			{ econ: 23 }, { econ: 24 }, { econ: 25 }
		]},
	];

	var procuradores = [
		{ id:0 , procurador: contribuintes[1 ] , oab: '55.132', seccional: 'SC', complemento: 1, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Procurador'    , ausencias: [
			{ id: 0 , dataInicial: "2020-10-01", dataTermino: "2020-10-09", distribuicaoTarefas: 1, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 1   ,                            tipoAusencia: 0, vencida:                 true},
			{ id: 1 , dataInicial: "2020-10-10", dataTermino: "2020-10-19", distribuicaoTarefas: 0, distribuicaoProcessos: 0, grupoResponsavelTarefas: null, motivo: 0, profResponsavelProcessos: null,                            tipoAusencia: 0, vencida:                 true},
			{ id: 2 , dataInicial: "2020-10-01", dataTermino: "2020-10-09", distribuicaoTarefas: 1, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 1   ,                            tipoAusencia: 0, vencida:                 true},
			{ id: 3 , dataInicial: "2020-10-10", dataTermino: "2020-10-19", distribuicaoTarefas: 0, distribuicaoProcessos: 0, grupoResponsavelTarefas: null, motivo: 0, profResponsavelProcessos: null,                            tipoAusencia: 0, vencida:                 true},
			{ id: 4 , dataInicial: "2020-10-01", dataTermino: "2020-10-09", distribuicaoTarefas: 1, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 1   ,                            tipoAusencia: 0, vencida:                 true},
			{ id: 5 , dataInicial: "2020-10-10", dataTermino: "2020-10-19", distribuicaoTarefas: 0, distribuicaoProcessos: 0, grupoResponsavelTarefas: null, motivo: 0, profResponsavelProcessos: null,                            tipoAusencia: 0, vencida:                 true},
			{ id: 6 , dataInicial: "2020-10-01", dataTermino: "2020-10-09", distribuicaoTarefas: 1, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 1   ,                            tipoAusencia: 0, vencida:                 true},
			{ id: 7 , dataInicial: "2020-10-10", dataTermino: "2020-10-19", distribuicaoTarefas: 0, distribuicaoProcessos: 0, grupoResponsavelTarefas: null, motivo: 0, profResponsavelProcessos: null,                            tipoAusencia: 0, vencida:                 true},
			{ id: 8 , dataInicial: "2020-10-01", dataTermino: "2020-10-09", distribuicaoTarefas: 1, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 1   ,                            tipoAusencia: 0, vencida:                 true},
			{ id: 9 , dataInicial: "2020-10-10", dataTermino: "2020-10-19", distribuicaoTarefas: 0, distribuicaoProcessos: 0, grupoResponsavelTarefas: null, motivo: 0, profResponsavelProcessos: null,                            tipoAusencia: 0, vencida:                 true},
			{ id: 10, dataInicial: "2020-10-01", dataTermino: "2020-10-09", distribuicaoTarefas: 1, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 1   ,                            tipoAusencia: 0, vencida:                 true},
			{ id: 11, dataInicial: "2020-10-10", dataTermino: "2020-10-19", distribuicaoTarefas: 0, distribuicaoProcessos: 1, grupoResponsavelTarefas: null, motivo: 0, profResponsavelProcessos: null,                            tipoAusencia: 0, vencida:                 false},
			{ id: 12, dataInicial: "2020-10-11", dataTermino: "2020-10-29", distribuicaoTarefas: 2, distribuicaoProcessos: 2, grupoResponsavelTarefas: 0   , motivo: 0, profResponsavelProcessos: 3   , profResponsavelTarefas: 4, tipoAusencia: 0, vencida: false, ausente: true},
		]},
		{ id:1 , procurador: contribuintes[2 ] , oab: '4.193' , seccional: 'SC', complemento: 2, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Administrador' , ausencias: [
			{ id: 3, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:2 , procurador: contribuintes[3 ] , oab: '14.421', seccional: 'SC', complemento: 2, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Procurador'    , ausencias: [
			
		]},
		{ id:3 , procurador: contribuintes[4 ] , oab: '7.184' , seccional: 'SC', complemento: 3, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Procurador'    , ausencias: [
			{ id: 4, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:4 , procurador: contribuintes[5 ] , oab: '99.936', seccional: 'SC', complemento: 1, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Procurador'    , ausencias: [
			{ id: 5, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:5 , procurador: contribuintes[6 ] , oab: '31.122', seccional: 'SC', complemento: 3, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Assessor'      , ausencias: [
			{ id: 6, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:6 , procurador: contribuintes[7 ] , oab: '68.170', seccional: 'SC', complemento: 3, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Assessor'      , ausencias: [
			{ id: 7, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:7 , procurador: contribuintes[8 ] , oab: '88.748', seccional: 'SC', complemento: 2, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Assessor'      , ausencias: [
			{ id: 8, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:8 , procurador: contribuintes[9 ] , oab: '64.822', seccional: 'SC', complemento: 2, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Assessor'      , ausencias: [
			{ id: 9, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 0, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:9 , procurador: contribuintes[10] , oab: '1.451' , seccional: 'SC', complemento: 2, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Assessor'      , ausencias: [
			{ id: 10, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 1, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
		{ id:10, procurador: contribuintes[11] , oab: '61.198', seccional: 'SC', complemento: 1, exec: 10, cont: 9, adm: 8, prot: 7, funcao: 'Assessor'      , ausencias: [
			{ id: 11, dataInicial: "2020-10-01", dataTermino: "2020-10-26", distribuicaoTarefas: 1, distribuicaoProcessos: 1, grupoResponsaveTarefas: 1, motivo: 1, tipoAusencia: 0  }
		]},
	]
	
	var execucoesFiscais = [
		{ id: 1 , numProcesso: '6817682-18.2018.8.24.5556' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 1'             , assunto: 'Assunto 1'    , classe: 'Classe 1'  , valorCausa: 1500000.00 , executado: contribuintes[0] , exequente: 'Gabriel Lúcio Gonçalves' , procurador: procuradores[0] , situacao: 'A ajuizar'      },
		{ id: 2 , numProcesso: '6518514-59.2018.8.24.7994' , tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 'Área 8'             , assunto: 'Assunto 8'    , classe: 'Classe 8'  , valorCausa: 80000.00   , executado: contribuintes[1] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[1] , situacao: 'A ajuizar'      },
		{ id: 3 , numProcesso: '9769699-54.2018.8.24.3721' , tribunal: 'Tribunal de Justiça de Siderópolis'    , comarca: 'Comarca de Siderópolis'  , vara: '1ª vara de Siderópolis'              , area: 'Área 2'             , assunto: 'Assunto 2'    , classe: 'Classe 2'  , valorCausa: 1550000.00 , executado: contribuintes[2] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[2] , situacao: 'Cancelada'      },
		{ id: 4 , numProcesso: '1358369-52.2018.8.24.5103' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 4'             , assunto: 'Assunto 4'    , classe: 'Classe 4'  , valorCausa: 150000.00  , executado: contribuintes[3] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[3] , situacao: 'Suspensa'       },
		{ id: 5 , numProcesso: '7577076-19.2018.8.24.7390' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 9'             , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.00    , executado: contribuintes[4] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[0] , situacao: 'Suspensa'       },
		{ id: 6 , numProcesso: '2857697-99.2018.8.24.8919' , tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 'Área 3'             , assunto: 'Assunto 3'    , classe: 'Classe 3'  , valorCausa: 800000.00  , executado: contribuintes[5] , exequente: 'Cleber Melo Vieira'      , procurador: procuradores[1] , situacao: 'Encerrada'      },
		{ id: 7 , numProcesso: '5496990-56.2018.8.24.3602' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 6'             , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.00   , executado: contribuintes[6] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[1] , situacao: 'Encerrada'      },
		{ id: 8 , numProcesso: '9391721-14.2018.8.24.4679' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 6'             , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.00   , executado: contribuintes[7] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[1] , situacao: 'Encerrada'      },
		{ id: 9 , numProcesso: '3297038-59.2018.8.24.6452' , tribunal: 'Tribunal de Justiça de Santa Catarina' , comarca: 'Comarca de Criciuma'     , vara: 'Vara de Execução Fiscal de Criciúma' , area: 'Direito Tributário' , assunto: 'Dívida Ativa' , classe: 'Classe 5'  , valorCausa: 120000.00  , executado: contribuintes[0] , exequente: 'Cleber Melo Vieira'      , procurador: procuradores[2] , situacao: 'Em tramitação'  },
		{ id: 10, numProcesso: '4977475-69.2018.8.24.9305' , tribunal: 'Tribunal de Justiça de Siderópolis'    , comarca: 'Comarca de Siderópolis'  , vara: '1ª vara de Siderópolis'              , area: 'Área 7'             , assunto: 'Assunto 7'    , classe: 'Classe 7'  , valorCausa: 850000.00  , executado: contribuintes[0] , exequente: 'Cleber Melo Vieira'      , procurador: procuradores[2] , situacao: 'Em tramitação'  },
		{ id: 11, numProcesso: '4963013-13.2018.8.24.8432' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 10'            , assunto: 'Assunto 10'   , classe: 'Classe 10' , valorCausa: 350.00     , executado: contribuintes[0] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[3] , situacao: 'Em tramitação'  },
		{ id: 12, numProcesso: '6136722-29.2018.8.24.4569' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 10'            , assunto: 'Assunto 10'   , classe: 'Classe 10' , valorCausa: 350.00     , executado: contribuintes[0] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[3] , situacao: '6 meses'        },
		{ id: 13, numProcesso: '3767489-58.2018.8.24.7981' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 9'             , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.00    , executado: contribuintes[0] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[0] , situacao: '6 meses'        },
		{ id: 14, numProcesso: '2983586-14.2018.8.24.1569' , tribunal: 'Tribunal de Justiça de Santa Catarina' , comarca: 'Comarca de Criciuma'     , vara: 'Vara de Execução Fiscal de Criciúma' , area: 'Direito Tributário' , assunto: 'Dívida Ativa' , classe: 'Classe 5'  , valorCausa: 120000.00  , executado: contribuintes[0] , exequente: 'Cleber Melo Vieira'      , procurador: procuradores[2] , situacao: '6 meses'        },
		{ id: 15, numProcesso: '438220-29.2018.8.24.1770'  , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 4'             , assunto: 'Assunto 4'    , classe: 'Classe 4'  , valorCausa: 150000.00  , executado: contribuintes[0] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[3] , situacao: '1 ano'          },
		{ id: 16, numProcesso: '5678148-64.2018.8.24.4758' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 9'             , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.00    , executado: contribuintes[0] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[0] , situacao: '1 ano'          },
		{ id: 17, numProcesso: '101140-27.2018.8.24.9286'  , tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 'Área 3'             , assunto: 'Assunto 3'    , classe: 'Classe 3'  , valorCausa: 800000.00  , executado: contribuintes[0] , exequente: 'Cleber Melo Vieira'      , procurador: procuradores[1] , situacao: '1 ano'          },
		{ id: 18, numProcesso: '2364581-78.2018.8.24.7405' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 6'             , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.00   , executado: contribuintes[0] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[1] , situacao: '1 ano'          },
		{ id: 19, numProcesso: '1778028-68.2018.8.24.4575' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 6'             , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.00   , executado: contribuintes[0] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[1] , situacao: '1 ano'          },
		{ id: 20, numProcesso: '7954781-31.2018.8.24.2971' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 4'             , assunto: 'Assunto 4'    , classe: 'Classe 4'  , valorCausa: 150000.00  , executado: contribuintes[0] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[3] , situacao: '1 ano'          },
		{ id: 21, numProcesso: '348816-77.2018.8.24.2599'  , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 9'             , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.00    , executado: contribuintes[0] , exequente: 'Gabriel Hahn Shaeffer'   , procurador: procuradores[0] , situacao: '3 anos'         },
		{ id: 22, numProcesso: '8714359-51.2018.8.24.9963' , tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 'Área 3'             , assunto: 'Assunto 3'    , classe: 'Classe 3'  , valorCausa: 800000.00  , executado: contribuintes[0] , exequente: 'Cleber Melo Vieira'      , procurador: procuradores[1] , situacao: '3 anos'         },
		{ id: 23, numProcesso: '8399631-11.2018.8.24.4535' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 6'             , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.00   , executado: contribuintes[0] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[1] , situacao: '3 anos'         },
		{ id: 24, numProcesso: '3333902-77.2018.8.24.4423' , tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 'Área 6'             , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.00   , executado: contribuintes[0] , exequente: 'Marcelo de Barros Bauer' , procurador: procuradores[1] , situacao: '5 anos ou mais' },
	]

	var economicos = [
		{ id: 1 ,	razaoFantasia: 'Laboratório Búrigo'                             , codigo: '98996', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 1, propriet: 1},
		{ id: 2 ,	razaoFantasia: 'Laboratório Búrigo'                             , codigo: '45625', situacao: 'Em aberto com alvará provisório',	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 2, propriet: 1},
		{ id: 3 ,	razaoFantasia: 'Laboratório Búrigo'                             , codigo: '44462', situacao: 'Regular'                        ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 3, propriet: 1},
		{ id: 4 ,	razaoFantasia: 'Laboratório Búrigo'                             , codigo: '06556', situacao: 'Reinício'                       ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 4, propriet: 1},
		{ id: 5 ,	razaoFantasia: 'Laboratório Búrigo'                             , codigo: '80888', situacao: 'Suspensão das atividades'       ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 5, propriet: 1},
		{ id: 23,	razaoFantasia: 'Laboratório Rocha'                              , codigo: '98396', situacao: 'Irregular'                      ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 1, propriet: 2},
		{ id: 12,	razaoFantasia: 'Laboratório Rocha'                              , codigo: '58166', situacao: 'Baixa das atividades'           ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 2, propriet: 2},
		{ id: 13,	razaoFantasia: 'Laboratório Rocha'                              , codigo: '95299', situacao: 'Cancelamento das atividades'    ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 3, propriet: 2},
		{ id: 14,	razaoFantasia: 'Laboratório Rocha'                              , codigo: '22546', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 4, propriet: 2},
		{ id: 15,	razaoFantasia: 'Laboratório Rocha'                              , codigo: '58914', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 5, propriet: 2},
		{ id: 16,	razaoFantasia: 'Bradesco S/A'                                   , codigo: '45425', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 6, propriet: 3},
		{ id: 17,	razaoFantasia: 'Bradesco S/A'                                   , codigo: '44562', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 1, propriet: 3},
		{ id: 18,	razaoFantasia: 'Bradesco S/A'                                   , codigo: '06656', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 2, propriet: 3},
		{ id: 19,	razaoFantasia: 'Bradesco S/A'                                   , codigo: '15123', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 3, propriet: 3},
		{ id: 20,	razaoFantasia: 'Bradesco S/A'                                   , codigo: '99126', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 4, propriet: 3},
		{ id: 21,	razaoFantasia: 'Bradesco S/A'                                   , codigo: '12632', situacao: 'Suspensão das atividades'       ,	atividades: 2, autonomo: true , cpfcnpj: '36.310.435/0001-80', endereco: 5, propriet: 3},
		{ id: 6 ,	razaoFantasia: 'Araucaria Rail Techinology LTDA'                , codigo: '12333', situacao: 'Suspensão das atividades'       ,	atividades: 2, autonomo: true , cpfcnpj: '74.655.246/0001-38', endereco: 2, propriet: 4},
		{ id: 7 ,	razaoFantasia: 'Bently do Brasil LTDA.'                         , codigo: '84554', situacao: 'Regular'                        ,	atividades: 2, autonomo: true , cpfcnpj: '19.686.471/0001‐23', endereco: 3, propriet: 5},
		{ id: 8 ,	razaoFantasia: 'Everest Refrigeração Industria e Comercio LTDA' , codigo: '69549', situacao: 'Baixa das atividades'           ,	atividades: 2, autonomo: false, cpfcnpj: '63.025.530/0028‐24', endereco: 4, propriet: 6},
		{ id: 9 ,	razaoFantasia: 'Ferrovia Norte Sul S/A'                         , codigo: '06992', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '01.637.895/0135‐44', endereco: 5, propriet: 7},
		{ id: 10,	razaoFantasia: 'Fernandes Embalagens Idustrias do Amazonas LTDA', codigo: '98732', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '01.637.895/0175‐31', endereco: 6, propriet: 1},
		{ id: 11,	razaoFantasia: 'Pronac Empreendimentos COM. E IND. LTDA.'       , codigo: '77898', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '01.637.895/0074‐98', endereco: 7, propriet: 2},
		{ id: 22,	razaoFantasia: 'Tecnowat Iluminação LTDA'                       , codigo: '99952', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '53.761.607/0001‐50', endereco: 8, propriet: 3},
		{ id: 23,	razaoFantasia: 'Construtora Fontana'                            , codigo: '80000', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '48.586.512/0001‐66', endereco: 2, propriet: 0},
		{ id: 24,	razaoFantasia: 'Construtora Fontana'                            , codigo: '80001', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '48.586.512/0001‐66', endereco: 2, propriet: 0},
		{ id: 25,	razaoFantasia: 'Construtora Fontana'                            , codigo: '80002', situacao: 'Baixa das atividades'           ,	atividades: 2, autonomo: true , cpfcnpj: '48.586.512/0001‐66', endereco: 2, propriet: 0},
		{ id: 26,	razaoFantasia: 'Construtora Pavei'                              , codigo: '33250', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '48.586.512/0001‐04', endereco: 2, propriet: 0},
		{ id: 27,	razaoFantasia: 'Construtora Pavei'                              , codigo: '33251', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '48.586.512/0001‐05', endereco: 2, propriet: 0},
		{ id: 28,	razaoFantasia: 'Construtora Pavei'                              , codigo: '33252', situacao: 'Em atividade'                   ,	atividades: 2, autonomo: true , cpfcnpj: '48.586.512/0001‐06', endereco: 2, propriet: 0},
	];

	var enderecoCompleto = [
		{ descricao: 'Rua Braz Cardoso Fernandes, 556, Bairro Santa Luzia, Criciúma, CEP 88804-000' },
		{ descricao: 'Rua Ângelo Pedrozo 22, Bairro Ana Maria, Criciúma, CEP 88082-551' },
		{ descricao: 'Rua Boa Ventura Maçaneiro, 21, Bairro Centro, Criciúma, CEP 88807-001' },
		{ descricao: 'Rua Belo Horizonte, 50, Bairro Santo Antônio, Criciúma, CEP 88803-922' },
		{ descricao: 'Rua Joaçaba, 153, Bairro Rio Maina, Criciúma, CEP 88845-564' },
		{ descricao: 'Rua August Svant Arrhenius, 32, Bairro São Simão, Criciúma, CEP 88804-000' },
		{ descricao: 'Rua Arquimedes Cunha Lobato, 321, Bairro Cristo Redentor, Criciúma, CEP 88082-551' },
		{ descricao: 'Rua Charles Darwin, 31, Bairro Recanto Verde, Criciúma, CEP 88807-001' },
		{ descricao: 'Rua Cândido Portinari, 1903, Bairro São Marcos, Criciúma, CEP 88803-922' },
		{ descricao: 'Rua Alexandre Fleming, 842, Bairro Pinheirinho, Criciúma, CEP 88845-564' },
		{ descricao: 'Rua Machado de Assis, 20, Bairro Santa Luzia, Criciúma, CEP 88804-000' },
		{ descricao: 'Rua Joaquim Onorato Vieira, 815, Bairro Ana Maria, Criciúma, CEP 88082-551' },
		{ descricao: 'Rua Tadeu de Souza Cunha, 110, Bairro Centro, Criciúma, CEP 88803-922' },
		{ descricao: 'Rua Caren Roldão, 312, Bairro Nova Esperança, Criciúma, CEP 88845-564' },
	]

	var documentos = [
		{ numero: '71', resp: 4    , contribuinte: 11 , tipo: 0, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '24/09/2017', protocolo: '2019020613285934' , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '57', resp: 1    , contribuinte: 15 , tipo: 0, situacao: true  , assinado: false , ano: '2019', dataEmissao: '24/09/2017', protocolo: '2019020613285934' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '79', resp: 4    , contribuinte: 15 , tipo: 1, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '22/07/2019', protocolo: '2019020613288847' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '27', resp: 3    , contribuinte: 8  , tipo: 1, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '22/07/2019', protocolo: '2019020613288847' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '91', resp: 2    , contribuinte: 0  , tipo: 1, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '05', resp: 1    , contribuinte: 0  , tipo: 1, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '59', resp: 0    , contribuinte: 6  , tipo: 2, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '22/10/2019', protocolo: '2019020613281858' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '78', resp: null , contribuinte: 9  , tipo: 2, situacao: true  , assinado: false , ano: '2019', dataEmissao: '08/11/2017', protocolo: '2019020613288509' , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '74', resp: null , contribuinte: 9  , tipo: 2, situacao: true  , assinado: false , ano: '2019', dataEmissao: '20/01/2019', protocolo: '2019020613287673' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '82', resp: null , contribuinte: 2  , tipo: 2, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '08/11/2017', protocolo: '2019020613288509' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '55', resp: null , contribuinte: 9  , tipo: 2, situacao: true  , assinado: false , ano: '2019', dataEmissao: '20/01/2019', protocolo: '2019020613287673' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '37', resp: null , contribuinte: 2  , tipo: 2, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '22/10/2019', protocolo: '2019020613281858' , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '71', resp: 4    , contribuinte: 5  , tipo: 3, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '03/04/2017', protocolo: '2019020613281322' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '82', resp: 3    , contribuinte: 8  , tipo: 3, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '03/04/2017', protocolo: '2019020613281322' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '59', resp: 2    , contribuinte: 7  , tipo: 4, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '07/05/2017', protocolo: '2019020613284092' , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '27', resp: 0    , contribuinte: 13 , tipo: 4, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '30/09/2017', protocolo: ''                 , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '65', resp: 1    , contribuinte: 0  , tipo: 4, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '01/12/2017', protocolo: '2019020613282398' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '54', resp: 2    , contribuinte: 10 , tipo: 4, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '07/05/2017', protocolo: '2019020613284092' , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '63', resp: 2    , contribuinte: 3  , tipo: 4, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '30/09/2017', protocolo: ''                 , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '72', resp: 0    , contribuinte: 4  , tipo: 4, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '01/12/2017', protocolo: '2019020613282398' , erro: true , erroIntegra: false, ignorado: true , envio: true  },
		{ numero: '84', resp: 0    , contribuinte: 4  , tipo: 5, situacao: true  , assinado: false , ano: '2019', dataEmissao: '23/10/2018', protocolo: '2019020613286928' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '31', resp: 1    , contribuinte: 2  , tipo: 5, situacao: false , assinado: true  , ano: '2019', dataEmissao: '10/01/2018', protocolo: '2019020613287140' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '84', resp: 2    , contribuinte: 6  , tipo: 5, situacao: false , assinado: true  , ano: '2019', dataEmissao: '10/01/2018', protocolo: '2019020613287140' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '16', resp: 1    , contribuinte: 15 , tipo: 5, situacao: false , assinado: false , ano: '2019', dataEmissao: '23/10/2018', protocolo: '2019020613286928' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '67', resp: 0    , contribuinte: 13 , tipo: 6, situacao: false , assinado: true  , ano: '2019', dataEmissao: '12/04/2019', protocolo: '2019020613286699' , erro: false, erroIntegra: true , ignorado: false, envio: true  },
		{ numero: '50', resp: 0    , contribuinte: 9  , tipo: 6, situacao: false , assinado: true  , ano: '2019', dataEmissao: '12/04/2019', protocolo: '2019020613286699' , erro: false, erroIntegra: true , ignorado: false, envio: true  },
		{ numero: '70', resp: 1    , contribuinte: 9  , tipo: 6, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '12/04/2019', protocolo: '2019020613286699' , erro: false, erroIntegra: true , ignorado: false, envio: true  },
		{ numero: '27', resp: 3    , contribuinte: 3  , tipo: 7, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '11/04/2017', protocolo: '2019020613287185' , erro: false, erroIntegra: true , ignorado: false, envio: true  },
		{ numero: '50', resp: 2    , contribuinte: 11 , tipo: 7, situacao: false , assinado: true  , ano: '2019', dataEmissao: '29/07/2017', protocolo: ''                 , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '95', resp: 2    , contribuinte: 5  , tipo: 7, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '02/12/2018', protocolo: '2019020613284772' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '33', resp: 4    , contribuinte: 2  , tipo: 7, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '25/03/2017', protocolo: '2019020613282171' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '58', resp: 3    , contribuinte: 5  , tipo: 7, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '16/10/2018', protocolo: '2019020613280567' , erro: true , erroIntegra: false, ignorado: true , envio: true  },
		{ numero: '45', resp: 3    , contribuinte: 5  , tipo: 7, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '11/04/2017', protocolo: '2019020613287185' , erro: false, erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '75', resp: 3    , contribuinte: 16 , tipo: 7, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '02/12/2018', protocolo: '2019020613284772' , erro: false, erroIntegra: false, ignorado: false, envio: false },
		{ numero: '70', resp: 4    , contribuinte: 1  , tipo: 8, situacao: true  , assinado: false , ano: '2019', dataEmissao: '29/07/2017', protocolo: ''                 , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '95', resp: 3    , contribuinte: 1  , tipo: 8, situacao: false , assinado: true  , ano: '2019', dataEmissao: '29/07/2017', protocolo: '2019020613283851' , erro: false, erroIntegra: false, ignorado: false, envio: false },
		{ numero: '77', resp: 1    , contribuinte: 8  , tipo: 8, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '25/03/2017', protocolo: '2019020613282171' , erro: false, erroIntegra: true,  ignorado: false, envio: false },
		{ numero: '56', resp: 2    , contribuinte: 4  , tipo: 8, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '16/10/2018', protocolo: '2019020613280567' , erro: true , erroIntegra: false, ignorado: false, envio: true  },
		{ numero: '92', resp: 4    , contribuinte: 0  , tipo: 9, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: false },
		{ numero: '10', resp: 1    , contribuinte: 0  , tipo: 9, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: false },
		{ numero: '84', resp: 2    , contribuinte: 0  , tipo: 9, situacao: true  , assinado: false , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: false },
		{ numero: '16', resp: 3    , contribuinte: 0  , tipo: 9, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: false },
		{ numero: '06', resp: 0    , contribuinte: 0  , tipo: 9, situacao: true  , assinado: true  , ano: '2019', dataEmissao: '31/01/2019', protocolo: '2019020613285537' , erro: false, erroIntegra: false, ignorado: false, envio: false },
	]

	var tipoDocumentos = [
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
	];

	var grupos = [
		{ descricao: 'Grupo contencioso'      , desativado: false, automatico: true, areas: [ {area: 1}, {area: 2}, {area: 3} ],               procuradores: [{ proc: procuradores[1], perm: 0}  ,{ proc: procuradores[8], perm: 1},{ proc: procuradores[7], perm: 0},{ proc: procuradores[3] , perm: 0},{ proc: procuradores[9], perm: 0},{ proc: procuradores[10], perm: 0}] },
		{ descricao: 'Grupo execuções fiscais', desativado: true, automatico: true, areas: [ {area: 4}, {area: 5}, {area: 6}  , {area : 7} ], procuradores: [{ proc: procuradores[2], perm: 1},{ proc: procuradores[10], perm: 1}                       ] },
		{ descricao: 'Grupo não apto a receber tarefas', desativado: false, automatico: true, areas: [ {area: 4}, {area: 5}, {area: 6}  , {area : 7} ], procuradores: [{ proc: procuradores[2], perm: 1},{ proc: procuradores[10], perm: 1}                       ] },
		{ descricao: 'Grupo execuções fiscais', desativado: false, automatico: true, areas: [ {area: 4}, {area: 5}, {area: 6}  , {area : 7} ], procuradores: [{ proc: procuradores[2], perm: 1},{ proc: procuradores[10], perm: 1}                       ] },
		{ descricao: 'Grupo execuções fiscais', desativado: false, automatico: true, areas: [ {area: 4}, {area: 5}, {area: 6}  , {area : 7} ], procuradores: [{ proc: procuradores[2], perm: 1},{ proc: procuradores[10], perm: 1}                       ] },
		{ descricao: 'Grupo execuções fiscais', desativado: false, automatico: true, areas: [ {area: 4}, {area: 5}, {area: 6}  , {area : 7} ], procuradores: [{ proc: procuradores[2], perm: 1},{ proc: procuradores[10], perm: 1}                       ] },
		{ descricao: 'Grupo execuções fiscais', desativado: false, automatico: true, areas: [ {area: 4}, {area: 5}, {area: 6}  , {area : 7} ], procuradores: [{ proc: procuradores[2], perm: 1},{ proc: procuradores[10], perm: 1}                       ] },
	]

	var qualificacoes = [
		{ descricao: 'Administrador' },
		{ descricao: 'Diretor' },
		{ descricao: 'Presidente' },
		{ descricao: 'Sócio Comanditado' },
		{ descricao: 'Sócio-Administrador' },
	]

	var estados = [
		{ descricao: 'AC' },
		{ descricao: 'AL' },
		{ descricao: 'AP' },
		{ descricao: 'AM' },
		{ descricao: 'BA' },
		{ descricao: 'CE' },
		{ descricao: 'DF' },
		{ descricao: 'ES' },
		{ descricao: 'GO' },
		{ descricao: 'MA' },
		{ descricao: 'MT' },
		{ descricao: 'MS' },
		{ descricao: 'MG' },
		{ descricao: 'PA' },
		{ descricao: 'PB' },
		{ descricao: 'PR' },
		{ descricao: 'PE' },
		{ descricao: 'PI' },
		{ descricao: 'RJ' },
		{ descricao: 'RN' },
		{ descricao: 'RS' },
		{ descricao: 'RO' },
		{ descricao: 'RR' },
		{ descricao: 'SC' },
		{ descricao: 'SP' },
		{ descricao: 'SE' },
		{ descricao: 'TO' },
	]

	var areas = [
		{ id: 1, descricao: 'Direito civil' },
		{ id: 2, descricao: 'Direito do trabalho' },
		{ id: 3, descricao: 'Direito do eleitoral' },
		{ id: 4, descricao: 'Direito do eleitoral e processo eleitoral do STF' },
		{ id: 5, descricao: 'Direito do previdenciário' },
		{ id: 6, descricao: 'Direito processual penal militar' },
		{ id: 7, descricao: 'Direito da criança e do adolescente' },
	]

	angular.module('tributos').constant('ENUMS', {
		ABRANGENCIA_REQUERIMENTO: tiposAbrangencias,
		ABRANGENCIAS_FERIADOS: abrangenciasFeriados,
		ACOES_VCTO_FERIADO: acaoVctoFeriado,
		CAMPO_INSCRICAO : campoInscricao,
		CLASSIFICACAO_ATIVIDADE : classificacaoAtividade,
		CLASSIFICACAO_RECEITA: classificacaoReceita,
		CLASSIFICACAO_TIPO_ATO: classificacaoTipoAto,
		COMPLEMENTO_OAB: complementoOab,
		COMPLETAR_COM: completarCom,
		CONTEUDO_CAMPOS: conteudoCampo,
		CONTEUDO_COMPLETAR: conteudoCompletar,
		POSICAO_RETIRAR: posicaoRetirar,
		CRITERIO_FORMA_PAGTO: criterioFormaPagamento,
		DEFINICAO_PAGADOR_TRANSF: definicaoPagadorTransf,
		DESCRICAO_TRANSFERENCIA: descricaoTransferencia,
		DIA_SEMANA: diaSemana,
		ENDERECOS: enderecos,
		FORMAS_PAGTO: formasPagto,
		FORMAS_PAGTO_CALCULO: formasPagtoCalculo,
		FORMAS_TRANSF: formaTransf,
		FORMATO_DATA: formatoData,
		FORMATO_HORA: formatHora,
		FORMATO_INSCRICAO: formatoInscricao,
		FORMATO_LIVRO: formatoLivro,
		FORMULAS_DIVIDA: formulasDivida,
		FORMULAS_ITBI: formulasITBI,
		FORMULAS_VALIDACAO_CADASTRAL: formulasValidacaoCadastral,
		GRAU_RISCO: grauRisco,
		INTERVALO_VENCTOS: intervaloVctos,
		MODULOS: modulos,
		NACIONALIDADE : nacionalidade,
		NIVEL_CBO: nivelCBO,
		OPERADORES : operadores,
		OPERADORES_COMPARACAO : operadoresComparacao,
		ORIGEM_CAMPOS : origemCampos,
		PORTE_EMPRESA: porteEmpresa,
		POSICAO_PREENCHIMENTO : posicaoPreenchimento,
		REGIMECOBRANCAISSQN: regimeCobrancaIssQn,
		SEXO : sexo,
		SIM_NAO : simNao,
		SITUACAO : situacao,
		SITUACAO_CONTRIBUINTE : situacaoContribinte,
		SITUACAO_DECLARACAO: situacaoDeclaracao,
		SITUACAO_DOCUMENTO: situacaoDocumento,
		SITUACAO_DIVIDA: situacaoDivida,
		SITUACAO_ECONOMICO: situacaoEconomico,
		SITUACAO_IMOVEL : situacaoImovel,
		SITUACAO_MANUTENCAO: situacaoManutencao,
		SITUACAO_NOTA: situacaoNota,
		SITUACAO_PARCELAS: situacaoParcelas,
		SITUACAO_PENHORAS: situacaoPenhoras,
		SITUACAO_PROJETO : situacaoProjeto,
		SITUACAO_REQUERIMENTO: situacoesRequerimentos,
		SITUACAO_SIMULACAO: situacaoSimulacao,
		SITUACAO_TRANSF_IMOVEIS: situacaoTransfImoveis,
		SITUACAO_CONVENIOS: situacaoConvenio,
		STATUS_CONTA_BANCARIA: statusContaBancaria,
		TIPOS_BENEFICIOS: tiposBeneficios,
		TIPOS_ENQUADRAMENTOS: tiposEnquadramentos,
		TIPOS_FERIADOS: tiposFeriados,
		TIPOS_MEIOS_COMUNICACOES: tiposMeiosComunicacoes,
		TIPOS_MOTIVOS: tiposMotivos,
		TIPOS_SOLICITACOES_REQ: tiposSolicitacoesRequerimentos,
		TIPOS_VALORES_RECOLHER: tiposValoresRecolher,
		TIPOS_VINCULO_ATOS_RECEITAS: tiposVinculoAtosReceitas,
		TIPO_ACRESCIMO: tipoAcrescimo,
		TIPO_ARQUIVO : tipoArquivo,
		TIPO_CALCULO : tipoCalculo,
		TIPO_CAMPOS_ADICIONAIS: tipoCamposAdicionais,
		TIPO_CARTORIO: tipoCartorio,
		TIPO_CADASTRO_ADVOGADO: tipoCadastroAdvogado,
		TIPO_COBRANCA_TRANSF_IMOVEIS: tipoCobrancaTransfImoveis,
		TIPO_CONDOMINIO : tipoCondominio,
		TIPO_CONTA_BANCARIA: tipoContaBancaria,
		TIPO_CONTRIBUINTE: tipoContribuinte,
		TIPO_CORRECAO: tipoCorrecao,
		TIPO_DIAS: tipoDias,
		TIPO_DIFERENCA_LANCAMENTO: tipoDiferencaLancamento,
		TIPO_FORMULAS_CALCULO: tipoFormulaCalculo,
		TIPO_JURO: tipoJuro,
		TIPO_IMOVEL : tipoImovel,
		TIPO_FILTRO_ENGLOBAMENTO : tipoFiltroEnglobamento,
		TIPO_INDEXADOR: tipoIndexador,
		TIPO_INTERVALO_INSCRICAO: tipoIntervaloInscricao,
		TIPO_LANCAMENTO_PARCELA: tipoLancamentoParcela,
		TIPO_MOVIMENTACAO : tipoMovimentacao,
		TIPO_MOVIMENTACAO_CONTRIB_MELHORIAS: tipoMovimentacaoContribMelhorias,
		TIPO_MOVIMENTACAO_IMOVEIS : tipoMovimentacaoImoveis,
		TIPO_SCRIPT: tipoScript,
		TIPO_UNIDADE : tipoUnidade,
		TIPO_VENDA_TRANSF: tipoVendaTransf,
		TIPO_PARCELAMENTO: tipoParcelamento,
		UNIDADE_MEDIDA: unidadeMedida,
		TIPO_PAGAMENTO: tipoPagamento,
		CONTRIBUINTES: contribuintes,
		ECONOMICOS: economicos,
		ENDERECOCOMPLETO: enderecoCompleto,
		QUALIFICACOES: qualificacoes,
		DOCUMENTOS: documentos,
		TIPODOCUMENTOS: tipoDocumentos,
		PROCURADORES: procuradores,
		ESTADOS: estados,
		EXECUCOES_FISCAIS: execucoesFiscais,
		GRUPOS: grupos,
		AREAS: areas,
	});

	angular.module('tributos').filter('enumFormasPgto', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.FORMAS_PAGTO, function(forma){
				if (forma.id === valor){retorno = forma.descricao;}
			});
			return retorno;
		};
	}]);

	angular.module('tributos').filter('enumIntervaloVctos', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.INTERVALO_VENCTOS, function(forma){
				if (forma.id === valor) {retorno = forma.descricao;}
			});
			return retorno;
		};
	}]);

	angular.module('tributos').filter('enumSituacaoParcelas', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.SITUACAO_PARCELAS, function(situacao){
				if (situacao.id === valor) {retorno = situacao.descricao;}
			});
			return retorno;
		};
	}]);

	angular.module('tributos').filter('enumSituacaoRequerimento', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.SITUACAO_REQUERIMENTO, function(situacao){
				if (situacao.id === valor) {retorno = situacao.descricao;}
			});
			return retorno;
		};
	}]);

	angular.module('tributos').filter('enumSituacaoEconomico', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.SITUACAO_ECONOMICO, function(situacao){
				if (situacao.id === valor) {retorno = situacao.descricao;}
			});
			return retorno;
		};
	}]);

	angular.module('tributos').filter('tipoPagamentoAbreviado', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.TIPO_PAGAMENTO, function(tipoPagamento){
				if (tipoPagamento.id === valor) {retorno = tipoPagamento.abreviatura;}
			});
			return retorno;
		};
	}]);

	angular.module('tributos').filter('tipoPagamento', ['ENUMS', function(Enums){
		return function(valor, upperCase){
			var retorno = null;
			angular.forEach(Enums.TIPO_PAGAMENTO, function(tipoPagamento){
				if (tipoPagamento.id === valor) {retorno = tipoPagamento.descricao;}
			});
			return retorno;
		};
	}]);



})();
