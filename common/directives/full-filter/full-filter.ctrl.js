(function () {
	angular.module('app')
	.service('fullFilterService', function() {
		var filtrosConfig = [
			{ key: 'LANCAMENTO'  , descricao: 'Lançamento'  , icon: 'fa-file-o'     , sub: [
				{ key: 'DATA'            , tipo: 'DATA'                , descricao: 'Data'                },
				{ key: 'NUMERO'          , tipo: 'NUMERO'              , descricao: 'Número'              },
				{ key: 'VALOR'           , tipo: 'VALOR'               , descricao: 'Valor'               },
				{ key: 'VENCIMENTO'      , tipo: 'DATA'                , descricao: 'Vencimento'          },
				{ key: 'PARCELA'         , tipo: 'NUMERO'              , descricao: 'Parcela'             },
				{ key: 'SITUACAO'        , tipo: 'SITUACAO_LANCAMENTO' , descricao: 'Situação'            },
				{ key: 'PRESCRICAO'      , tipo: 'BOLEAN'              , descricao: 'Prescrita?'          },
				{ key: 'PRESCREVE_EM'    , tipo: 'DATA'                , descricao: 'Prescreve em'        },
				{ key: 'PRESCRITA_EM'    , tipo: 'DATA'                , descricao: 'Prescrita em'        },
			]},
			{ key: 'INSCRICAO'   , descricao: 'Inscrição'   , icon: 'fa-file-o'     , sub: [
				{ key: 'EMITIDO'         , tipo: 'BOLEAN'              , descricao: 'Inscrita?'           },
				{ key: 'DATA'            , tipo: 'DATA'                , descricao: 'Data'                },
				{ key: 'POR'             , tipo: 'POR'                 , descricao: 'Inscrito por'        },
				{ key: 'NUMERO'          , tipo: 'NUMERO'              , descricao: 'Número'              },
				{ key: 'VALOR'           , tipo: 'VALOR'               , descricao: 'Valor'               },
				{ key: 'VENCIMENTO'      , tipo: 'DATA'                , descricao: 'Vencimento'          },
				{ key: 'NUMERO_PROCESSO' , tipo: 'NUMERO'              , descricao: 'Nº do processo'      },
				{ key: 'ANO'             , tipo: 'ANO'                 , descricao: 'Ano'                 },
				{ key: 'LIVRO'           , tipo: 'NUMERO'              , descricao: 'Livro'               },
				{ key: 'FOLHA'           , tipo: 'NUMERO'              , descricao: 'Folha'               },
				{ key: 'POSICAO'         , tipo: 'NUMERO'              , descricao: 'Posição'             },
			]},
			{ key: 'CERTIDAO'    , descricao: 'CDA'         , icon: 'fa-file-o'     , sub: [
				{ key: 'EMITIDO'        , tipo: 'BOLEAN'               , descricao: 'Emitida?'            },
				{ key: 'DATA_EMISSAO'   , tipo: 'DATA'                 , descricao: 'Data da emissão'     },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Emitido por'         },
				{ key: 'ANO'            , tipo: 'ANO'                  , descricao: 'Ano'                 },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Número'              },
				{ key: 'NUMERO_ANO'     , tipo: 'NUMERO_ANO'           , descricao: 'Número/Ano'          },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'               },
				{ key: 'ASSINADA'       , tipo: 'BOLEAN'               , descricao: 'Assinada?'           },
				{ key: 'ASSINADA_POR'   , tipo: 'POR'                  , descricao: 'Assinada por'        },
				{ key: 'NOTIFICADA'     , tipo: 'BOLEAN'               , descricao: 'Notificada?'         },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_CDA'         , descricao: 'Situação'            },
			]},
			{ key: 'PETICAO'     , descricao: 'Peticão'     , icon: 'fa-file-o'     , sub: [
				{ key: 'PETICIONADA'    , tipo: 'BOLEAN'               , descricao: 'Peticionada?'        },
				{ key: 'DATA'           , tipo: 'DATA'                 , descricao: 'Data'                },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Peticionado por'     },
				{ key: 'ANO'            , tipo: 'ANO'                  , descricao: 'Ano'                 },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Número'              },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'               },
				{ key: 'ASSINADA'       , tipo: 'BOLEAN'               , descricao: 'Assinada?'           },
				{ key: 'ASSINADA_POR'   , tipo: 'POR'                  , descricao: 'Assinada por'        },
				{ key: 'TIPO_PETICAO'   , tipo: 'TIPO_PETICAO'         , descricao: 'Tipo'                },
				{ key: 'ANEXO'          , tipo: 'BOLEAN'               , descricao: 'Anexo'               },
				{ key: 'ENVIO_TRIBUNAL' , tipo: 'BOLEAN'               , descricao: 'Enviado ao tribunal' },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_PETICAO'     , descricao: 'Situação'            },
			]},
			{ key: 'PROTESTADA'  , descricao: 'Protesto'    , icon: 'fa-book'       , sub: [
				{ key: 'PETICIONADA'    , tipo: 'BOLEAN'               , descricao: 'Protestada?'         },
				{ key: 'DATA'           , tipo: 'DATA'                 , descricao: 'Data'                },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Protestado por'      },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Número'              },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'               },
				{ key: 'NUMERO_GUIA'    , tipo: 'NUMERO'               , descricao: 'Número da guia'      },
				{ key: 'CARTORIO'       , tipo: 'CARTORIO'             , descricao: 'Cartório'            },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_PROTESTO'    , descricao: 'Situação'            },
			]},
			{ key: 'EXECUTADA'   , descricao: 'Execução'    , icon: 'fa-gavel'      , sub: [
				{ key: 'PETICIONADA'    , tipo: 'BOLEAN'               , descricao: 'Executada?'           },
				{ key: 'DATA'           , tipo: 'DATA'                 , descricao: 'Data'                },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Executada por'       },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Código'              },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'               },
				{ key: 'AREAS_ASSUNTOS' , tipo: 'AREAS_ASSUNTOS'       , descricao: 'Áreas e assuntos'    },
				{ key: 'LOCAIS'         , tipo: 'LOCAIS'               , descricao: 'Locais'              },
				{ key: 'PROCURADOR'     , tipo: 'PROCURADOR'           , descricao: 'Procurador'          },
				{ key: 'EXECUTADO'      , tipo: 'EXECUTADO'            , descricao: 'Executado'           },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_EXECUCAO'    , descricao: 'Situação'            },
			]},
			{ key: 'CREDITO'     , descricao: 'Crédito'     , icon: 'fa-calendar-o' , sub: [
				{ key: 'CREDITO'         , tipo: 'CREDITO'             , descricao: 'Crédito'             },
				{ key: 'VINCULO_CREDITO' , tipo: 'VINC_CREDITO'        , descricao: 'Vínculo do crédito'  },
			]},
			{ key: 'REFERENTE'   , descricao: 'Referente'   , icon: 'fa-gavel'      , sub: [
				{ key: 'TIPO_REFERENTE' , tipo: 'TIPO_REFERENTE'       , descricao: 'Tipo'                },
				{ key: 'REFERENTE'      , tipo: 'REFERENTE'            , descricao: 'Código'              },
				{ key: 'CPF_CNPJ'       , tipo: 'CPF_CNPJ'             , descricao: 'CPF/CNPJ'            },
				{ key: 'POSSUI_CPF_CNPJ', tipo: 'BOLEAN'               , descricao: 'Possui CPF/CNPJ?'    },
			]},
			{ key: 'ENDERECO'    , descricao: 'Endereço'    , icon: 'fa-mark'       , sub: [
				{ key: 'ENDERECO'      , tipo: 'BOLEAN'                , descricao: 'Possui endereço?'    },
				{ key: 'CEP'           , tipo: 'CEP'                   , descricao: 'CEP'                 },
				{ key: 'LOGRADOURO'    , tipo: 'LOGRADOURO'            , descricao: 'Logradouro'          },
				{ key: 'NUMERO'        , tipo: 'NUMERO'                , descricao: 'Número'              },
				{ key: 'BAIRRO'        , tipo: 'BAIRRO'                , descricao: 'Bairro'              },
				{ key: 'LOTEAMENTO'    , tipo: 'LOTEAMENTO'            , descricao: 'Loteamento'          },
				{ key: 'CONDOMINIO'    , tipo: 'CONDOMINIO'            , descricao: 'Condomínio'          },
				{ key: 'BLOCO'         , tipo: 'NUMERO'                , descricao: 'Bloco'               },
				{ key: 'APARTAMENTO'   , tipo: 'NUMERO'                , descricao: 'Apartamento'         },
				{ key: 'COMPLEMENTO'   , tipo: 'TEXTO'                 , descricao: 'Complemento'         },
				{ key: 'DISTRITO'      , tipo: 'DISTRITO'              , descricao: 'Distrito'            },
				{ key: 'GARAGEM'       , tipo: 'NUMERO'                , descricao: 'Garagem'             },
				{ key: 'SALA'          , tipo: 'NUMERO'                , descricao: 'Sala'                },
				{ key: 'LOJA'          , tipo: 'NUMERO'                , descricao: 'Loja'                },
				{ key: 'SETOR'         , tipo: 'NUMERO'                , descricao: 'Setor'               },
				{ key: 'QUADRA'        , tipo: 'NUMERO'                , descricao: 'Quadra'              },
				{ key: 'LOTE'          , tipo: 'NUMERO'                , descricao: 'Lote'                },
				{ key: 'SECAO'         , tipo: 'SECAO'                 , descricao: 'Seção'               },
				{ key: 'FACES'         , tipo: 'FACES'                 , descricao: 'Faces'               },
			]},
		]

		return {
			filtrosConfig: filtrosConfig,
			compactar: function(filtros) {
				console.clear();
				console.log(filtros);
				
				filtros.forEach(filtro => {
					// delete filtro.sub
					console.log(filtro);
				})
				
				return filtros
			},
			restaurar: function(filtros) {
				console.clear();
				console.log(filtros);
				return 'restaurado'
			},
		}
	})

	.directive('fullFilter', function() {
		return {
			transclude: true,
			scope: {
				ngModel : "=",
				source  : "@",
				resource: "=",
			},
			templateUrl: 'common/directives/full-filter/full-filter.html',
			controller: function($scope, fullFilterService, storage, $filter, $timeout, promiseTracker) {
				var vm = $scope
				var TERM = {}
				
				vm.exemploIntervaloAno = new Date().getFullYear()-2 + '-' + new Date().getFullYear()

				vm.fullFilter = {
					filtrosConfig: fullFilterService.filtrosConfig,
					setFiltrarEm: function(filtro) {
						console.log('setFiltrarEm', filtro);
						filtro.sub = filtro.filtrarEm ? vm.fullFilter.filtrosConfig.find(fil => fil.key ==  filtro.filtrarEm).sub : null
	
						var TERM_RESULTS = filtro.sub ? filtro.sub.find(sub => sub.descricao.toLowerCase().includes(TERM)) : null
						if (TERM && TERM_RESULTS) {
							filtro.subSelect = TERM_RESULTS.key
							this.setSubSelected(filtro, TERM_RESULTS.key)
						}
	
						TERM = null
					},
					setSubSelected: function(filtro, sub) {
						var FILTRAR_POR = vm.fullFilter.filtrosConfig.find(fil => fil.key ==  filtro.filtrarEm)
						filtro.selected = FILTRAR_POR.sub.find(SUB => SUB.key == sub)

						vm.ngModel = vm.fullFilter.filtros
					},
					excluir: function(index) {
						if (this.filtros.length == 1) {
							this.filtros = [{}]
							vm.ngModel = [{}]
							
						} else {
							this.filtros.splice(index, 1)
						}
					},
					
					filtros: !_.isEmpty(vm.ngModel) ? vm.ngModel : [{}],
					compactar: (filtros) => fullFilterService.compactar(filtros),
					restaurar: (filtros) => fullFilterService.restaurar(filtros),
					salvar: (filtros) => fullFilterService.restaurar(filtros)
				}

				vm.fullFilter.filtrosConfig.forEach(item => {
					item.id = item.key;
					item.subDesc = item.sub.map(sub => sub.descricao)
				})

				vm.optionsFiltrarEm = {
					allowClear: true,
					multiple: false,
					data: {
						results: vm.fullFilter.filtrosConfig,
						text: function(item) {
							return `${item.descricao} ${item.subDesc}`
						}
					},
					formatNoMatches: function() {
						return ''
					},
					formatValue: function(item, container, query){
						return item.id
					},
					formatResult: function(item, container, query){
						TERM = query.term.toLowerCase()
						return item.descricao
					},
					formatSelection: function(item, container, query) {
						return item.descricao
					},
				}

				// ------------------------------------------------------
				// Select valores
				// ------------------------------------------------------
				{
					// vm.valores = storage.check('agrupadorValor', vm.valoresPadraoSistema);
					vm.valores = [1000,3000,5000];

					vm.valoresDescription = function() {
						var VALORES = []
						vm.valores.forEach((val, index) => {
							var VALOR = $filter('currency')(val)
							var DESC =	index == 0 ? 'Até ' + VALOR : 'De ' + $filter('currency')(vm.valores[index-1] + 0.01) + ' até ' + VALOR
						
							VALORES.push({id: index, descricao: DESC})
							if(index == vm.valores.length-1) {
								VALORES.push({id: index, descricao: 'Acima de ' + VALOR})
							}
						})
		
						return VALORES
					}()
					// vm.valoresDescription = setValoresDescription(vm.valores)
					vm.valoresDescription.push({id:vm.valoresDescription.length+1, descricao:'Definir valor'})
		
					vm.optionsSelectValores = {
						allowClear: true,
						tokenSeparators: [",", " ", ";", "-"],
						tags: [],
						data: vm.valoresDescription,
						formatNoMatches: function() {
							return ''
						},
						formatValue: function(item){
							return item.descricao
						},
						formatResult: function(item) {
							return `<span class="badge">${item.descricao}</span>`
						},
						formatSelection: function(item) {
							return item.descricao
						},
					}
				}

				vm.isValidValue = function (obj) {
					// Verifica se o campo 'value' existe no objeto
					if (!obj.hasOwnProperty('value')) {
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
			}
		}
	})
})();