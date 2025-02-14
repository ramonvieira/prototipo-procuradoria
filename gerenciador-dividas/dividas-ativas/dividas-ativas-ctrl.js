(function() {

	angular.module('app')
	.service('situacaoParcelasDividasService', function($rootScope){
		$rootScope.serviceDb('situacaoParcelasDividas')

		return {
			situacaoParcelasDividas: $rootScope.situacaoParcelasDividas
		}
	})
	.filter('situacaoParcelasDividas', function($filter, situacaoParcelasDividasService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'situacaoParcelasDividas', selector ? selector : 'descricao')
		}
	})
	.directive('situacaoParcelasDividasSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="sel__{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="sel__{{ID}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				ngModel    : '=' ,
				ngRequired : '=' ,
				ngDisabled : '=' ,
				label      : '@?',
				placeholder: '@?',
				multiple   : '=' ,
			},
			transclude: true,
			compile: compile,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($scope, situacaoParcelasDividasService, $filter) {
			var vm = $scope
			vm.ID = Date.now()
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre a situação pela descrição.'
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')(situacaoParcelasDividasService.situacaoParcelasDividas, 'id'),
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.key
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('situacaoParcelasDividas')($(element).val(), 'object') ) : null
				},
				formatResult: function(item) {
					return item.descricao
				},
				formatSelection: function(item) {
					return item.descricao
				},
			}
		}

		function compile(element, attrs) {
			if (attrs.hasOwnProperty('multiple')) {
				element.find('input').attr('multiple', true)
			}
		}
	})
	.directive('situacaoParcelasDividasCda', function($sce, $filter) {
		return {
			restrict: 'E',
			template: `<span class="badge {{badge}} {{class}}" bf-tooltip="{{tooltip}}"><i ng-if="icon" class="{{icon}}"></i> {{descricao}}</span>`,
			required: 'ngModel',
			replace: false,
			scope: {
				situacao: '=',
				class: '@?',
			},
			transclude: true,
			controller: function($scope, situacaoParcelasDividasService) {
				var vm = $scope

				vm.descricao;
				vm.badge;
				vm.icon;
				vm.tooltip;

				var defineSituacao = function() {
					if (vm.situacao == 'CANCELADA' || vm.situacao == 'PAGA' || vm.situacao == 'PRESCRITA' || vm.situacao == 'REMIDA') {
						vm.badge = 'badge-success'
						vm.descricao = 'Quitada'
						vm.icon = 'fa fa-dollar'
						vm.tooltip = 'Todas as dívidas da CDA estão quitadas'
					} else if (vm.situacao == 'PARCELADA' || vm.situacao == 'SUSPENSA') {
						vm.badge = 'badge-primary'
						vm.descricao = 'Parcelada'
						vm.icon = 'fa fa-list-ol'
						vm.tooltip = 'Possui alguma dívida parcelada'
					} else {
						vm.badge = 'badge-defautl'
						vm.descricao = 'Aberta'
					}
				}()
			}
		}
	})
	.service('dividasFiltrosService', function($rootScope, db, $timeout, storage) {
		$rootScope.serviceDb('dividasFiltros')

		const filtrosConfig = [
			{ key: 'LANCAMENTO'  , descricao: 'Lançamento'  , icon: 'fa-file-o'     , active: false, showProp: true,  sub: [
				{ key: 'DATA'            , tipo: 'DATA'                , descricao: 'Data'               , emUso: false },
				{ key: 'NUMERO'          , tipo: 'NUMERO'              , descricao: 'Número'             , emUso: false },
				{ key: 'VALOR'           , tipo: 'VALOR'               , descricao: 'Valor'              , emUso: false },
				{ key: 'VENCIMENTO'      , tipo: 'DATA'                , descricao: 'Vencimento'         , emUso: false },
				{ key: 'PARCELA'         , tipo: 'NUMERO'              , descricao: 'Parcela'            , emUso: false },
				{ key: 'SITUACAO'        , tipo: 'SITUACAO_LANCAMENTO' , descricao: 'Situação'           , emUso: false },
				{ key: 'PRESCRICAO'      , tipo: 'PRESCRICAO'          , descricao: 'Prescrição'         , emUso: false },
			]},
			{ key: 'INSCRICAO'   , descricao: 'Inscrição'   , icon: 'fa-file-o'     , active: false, showProp: true,  sub: [
				{ key: 'EMITIDO'         , tipo: 'BOLEAN'              , descricao: 'Inscrita?'          , emUso: false },
				{ key: 'DATA'            , tipo: 'DATA'                , descricao: 'Data'               , emUso: false },
				{ key: 'POR'             , tipo: 'POR'                 , descricao: 'Inscrito por'       , emUso: false },
				{ key: 'NUMERO'          , tipo: 'NUMERO'              , descricao: 'Número'             , emUso: false },
				{ key: 'VALOR'           , tipo: 'VALOR'               , descricao: 'Valor'              , emUso: false },
				{ key: 'VENCIMENTO'      , tipo: 'DATA'                , descricao: 'Vencimento'         , emUso: false },
				{ key: 'NUMERO_PROCESSO' , tipo: 'NUMERO'              , descricao: 'Nº do processo'     , emUso: false },
				{ key: 'ANO'             , tipo: 'ANO'                 , descricao: 'Ano'                , emUso: false },
				{ key: 'LIVRO'           , tipo: 'NUMERO'              , descricao: 'Livro'              , emUso: false },
				{ key: 'FOLHA'           , tipo: 'NUMERO'              , descricao: 'Folha'              , emUso: false },
				{ key: 'POSICAO'         , tipo: 'NUMERO'              , descricao: 'Posição'            , emUso: false },
			]},
			{ key: 'CERTIDAO'    , descricao: 'CDA'         , icon: 'fa-file-o'     , active: false, showProp: true,  sub: [
				{ key: 'EMITIDO'        , tipo: 'BOLEAN'               , descricao: 'Emitida?'           , emUso: false },
				{ key: 'DATA_EMISSAO'   , tipo: 'DATA'                 , descricao: 'Data da emissão'    , emUso: false },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Emitido por'        , emUso: false },
				{ key: 'ANO'            , tipo: 'ANO'                  , descricao: 'Ano'                , emUso: false },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Número'             , emUso: false },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'              , emUso: false },
				{ key: 'ASSINADO'       , tipo: 'ASSINADO'             , descricao: 'Assinada?'          , emUso: false },
				{ key: 'ASSINADA_POR'   , tipo: 'POR'                  , descricao: 'Assinada por'       , emUso: false },
				{ key: 'NOTIFICADA'     , tipo: 'BOLEAN'               , descricao: 'Notificada?'        , emUso: false },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_CDA'         , descricao: 'Situação'           , emUso: false },
			]},
			{ key: 'PETICAO'     , descricao: 'Peticão'     , icon: 'fa-file-o'     , active: false, showProp: true,  sub: [
				{ key: 'PETICIONADA'    , tipo: 'BOLEAN'               , descricao: 'Peticionada?'       , emUso: false },
				{ key: 'DATA'           , tipo: 'DATA'                 , descricao: 'Data'               , emUso: false },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Peticionado por'    , emUso: false },
				{ key: 'ANO'            , tipo: 'ANO'                  , descricao: 'Ano'                , emUso: false },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Número'             , emUso: false },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'              , emUso: false },
				{ key: 'ASSINADO'       , tipo: 'ASSINADO'             , descricao: 'Assinada?'          , emUso: false },
				{ key: 'ASSINADA_POR'   , tipo: 'POR'                  , descricao: 'Assinada por'       , emUso: false },
				{ key: 'TIPO_PETICAO'   , tipo: 'TIPO_PETICAO'         , descricao: 'Tipo'               , emUso: false },
				{ key: 'ANEXO'          , tipo: 'BOLEAN'               , descricao: 'Anexo'              , emUso: false },
				{ key: 'ENVIO_TRIBUNAL' , tipo: 'BOLEAN'               , descricao: 'Enviado ao tribunal', emUso: false },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_PETICAO'     , descricao: 'Situação'           , emUso: false },
			]},
			{ key: 'PROTESTADA'  , descricao: 'Protesto'    , icon: 'fa-book'       , active: false, showProp: true,  sub: [
				{ key: 'PETICIONADA'    , tipo: 'BOLEAN'               , descricao: 'Protestada?'        , emUso: false },
				{ key: 'DATA'           , tipo: 'DATA'                 , descricao: 'Data'               , emUso: false },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Protestado por'     , emUso: false },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Número'             , emUso: false },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'              , emUso: false },
				{ key: 'NUMERO_GUIA'    , tipo: 'NUMERO'               , descricao: 'Número da guia'     , emUso: false },
				{ key: 'CARTORIO'       , tipo: 'CARTORIO'             , descricao: 'Cartório'           , emUso: false },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_PROTESTO'    , descricao: 'Situação'           , emUso: false },
			]},
			{ key: 'EXECUTADA'   , descricao: 'Execução'    , icon: 'fa-gavel'      , active: false, showProp: true,  sub: [
				{ key: 'PETICIONADA'    , tipo: 'BOLEAN'               , descricao: 'Executada?'          , emUso: false },
				{ key: 'DATA'           , tipo: 'DATA'                 , descricao: 'Data'               , emUso: false },
				{ key: 'POR'            , tipo: 'POR'                  , descricao: 'Executada por'      , emUso: false },
				{ key: 'NUMERO'         , tipo: 'NUMERO'               , descricao: 'Código'             , emUso: false },
				{ key: 'VALOR'          , tipo: 'VALOR'                , descricao: 'Valor'              , emUso: false },
				{ key: 'AREAS_ASSUNTOS' , tipo: 'AREAS_ASSUNTOS'       , descricao: 'Áreas e assuntos'   , emUso: false },
				{ key: 'LOCAIS'         , tipo: 'LOCAIS'               , descricao: 'Locais'             , emUso: false },
				{ key: 'PROCURADOR'     , tipo: 'PROCURADOR'           , descricao: 'Procurador'         , emUso: false },
				{ key: 'EXECUTADO'      , tipo: 'EXECUTADO'            , descricao: 'Executado'          , emUso: false },
				{ key: 'SITUACAO'       , tipo: 'SITUACAO_EXECUCAO'    , descricao: 'Situação'           , emUso: false },
			]},
			{ key: 'CREDITO'     , descricao: 'Crédito'     , icon: 'fa-calendar-o' , active: false, showProp: false, sub: [
				{ key: 'CREDITO'         , tipo: 'CREDITO'             , descricao: 'Crédito'            , emUso: false },
				{ key: 'VINCULO_CREDITO' , tipo: 'VINC_CREDITO'        , descricao: 'Vínculo do crédito' , emUso: false },
			]},
			{ key: 'REFERENTE'   , descricao: 'Referente'   , icon: 'fa-gavel'      , active: false, showProp: false, sub: [
				{ key: 'TIPO_REFERENTE' , tipo: 'TIPO_REFERENTE'       , descricao: 'Tipo'               , emUso: false },
				{ key: 'REFERENTE'      , tipo: 'REFERENTE'            , descricao: 'Código'             , emUso: false },
				{ key: 'CPF_CNPJ'       , tipo: 'CPF_CNPJ'             , descricao: 'CPF/CNPJ'           , emUso: false },
				{ key: 'POSSUI_CPF_CNPJ', tipo: 'BOLEAN'               , descricao: 'Possui CPF/CNPJ?'   , emUso: false },
			]},
			{ key: 'ENDERECO'    , descricao: 'Endereço'    , icon: 'fa-mark'       , active: false, showProp: true,  sub: [
				{ key: 'ENDERECO'      , tipo: 'BOLEAN'                , descricao: 'Possui endereço?'   , emUso: false },
				{ key: 'CEP'           , tipo: 'CEP'                   , descricao: 'CEP'                , emUso: false },
				{ key: 'LOGRADOURO'    , tipo: 'LOGRADOURO'            , descricao: 'Logradouro'         , emUso: false },
				{ key: 'NUMERO'        , tipo: 'NUMERO'                , descricao: 'Número'             , emUso: false },
				{ key: 'BAIRRO'        , tipo: 'BAIRRO'                , descricao: 'Bairro'             , emUso: false },
				{ key: 'LOTEAMENTO'    , tipo: 'LOTEAMENTO'            , descricao: 'Loteamento'         , emUso: false },
				{ key: 'CONDOMINIO'    , tipo: 'CONDOMINIO'            , descricao: 'Condomínio'         , emUso: false },
				{ key: 'BLOCO'         , tipo: 'NUMERO'                , descricao: 'Bloco'              , emUso: false },
				{ key: 'APARTAMENTO'   , tipo: 'NUMERO'                , descricao: 'Apartamento'        , emUso: false },
				{ key: 'COMPLEMENTO'   , tipo: 'TEXTO'                 , descricao: 'Complemento'        , emUso: false },
				{ key: 'DISTRITO'      , tipo: 'DISTRITO'              , descricao: 'Distrito'           , emUso: false },
				{ key: 'GARAGEM'       , tipo: 'NUMERO'                , descricao: 'Garagem'            , emUso: false },
				{ key: 'SALA'          , tipo: 'NUMERO'                , descricao: 'Sala'               , emUso: false },
				{ key: 'LOJA'          , tipo: 'NUMERO'                , descricao: 'Loja'               , emUso: false },
				{ key: 'SETOR'         , tipo: 'NUMERO'                , descricao: 'Setor'              , emUso: false },
				{ key: 'QUADRA'        , tipo: 'NUMERO'                , descricao: 'Quadra'             , emUso: false },
				{ key: 'LOTE'          , tipo: 'NUMERO'                , descricao: 'Lote'               , emUso: false },
				{ key: 'SECAO'         , tipo: 'SECAO'                 , descricao: 'Seção'              , emUso: false },
				{ key: 'FACES'         , tipo: 'FACES'                 , descricao: 'Faces'              , emUso: false },
			]},
		]
		
		for(const [key, value] of Object.entries(_.groupBy($rootScope.dividasFiltros, 'tab'))) {
			// value[0].active = true
			// console.log(
			// 	value
			// );
		}

		return {
			filtrosSalvos: $rootScope.dividasFiltros,
			filtrosConfig: filtrosConfig,
			compactaFiltros: function(filtros) {
				// Separa somente o que tem filtro
				filtros = angular.copy(filtros.filter(filtro => filtro.emUso))
				filtros.forEach(filtro => {
					filtro.sub = filtro.sub.filter(sub => sub.emUso )
					filtro.sub.forEach(sub => {
						// Limpa o lixo
						delete sub.$$hashKey
						delete sub.descricao
						delete sub.emUso
						delete sub.tipo
					})

					// Limpa o lixo
					// delete filtro.active
					delete filtro.descricao
					delete filtro.emUso
					delete filtro.selected
					delete filtro.showProp
					delete filtro.icon
					delete filtro.$$hashKey
					console.log('ACTIVE', filtro.active, filtro);
				})

				return filtros
			},
			restauraFiltros: function(filtroSalvo) {
				var REGISTRO = filtroSalvo
				var FILTROS_PADRAO = angular.copy(filtrosConfig)
				var FILTROS_SALVO = REGISTRO.filtros
				
				FILTROS_SALVO.forEach(n1_salvo => {
					var n1_padrao = FILTROS_PADRAO.find(padrao => padrao.key == n1_salvo.key)
					
					n1_salvo.sub.forEach(n2_salvo => {
						var n2_padrao = n1_padrao.sub.find(padrao => padrao.key == n2_salvo.key)
						n2_padrao = Object.assign(n2_padrao, n2_salvo)
						n2_padrao.emUso = true
					})
				})

				REGISTRO.filtros = FILTROS_PADRAO
				console.log('REGISTRO',REGISTRO);

				return REGISTRO
			},
			salvarFiltro: function(filtro, TAB, TEMP) {
				filtro.order   = this.filtrosSalvos  .length + 1
				filtro.tab     = TAB
				delete filtro.active
				console.log(filtro);
				filtro.filtros = this.compactaFiltros(filtro.filtros)
				
				if(filtro.temp) {
					filtro.descricao = "Filtro temporário"
					filtro.ajuda = "Filtro temporário é excluído assim que sair/atualizar a página"
					filtro.temp = true
					// storage.setJson('dividasFiltros', filtro, 'SESSION');
				} else {
				}
				
				console.log(filtro);
				db.push('dividasFiltros', filtro)
				$timeout(() => {
					this.filtrosSalvos.forEach(fil => {
						if(filtro.key == fil.key && fil.id == filtro.id) {
							fil.active = true
							filtro.active = true
						} else {
							fil.active = false
						}
					})
				}, 1000)
				return
				
			}
		}
	})
	.service('formasPagamentoService', function($rootScope) {
		var data = new Date()
		var formasPagamento = [
			{  id: 1, ano: data.getFullYear(), status: 'StatusA', creditos: [
				{ credito: 1, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 3, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 2, formPagtos: [
					{ qtdParc: 1, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 3, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 4, desconto: 5, uso: true, receitas: [{},{},{}]},
					{ qtdParc: 5, desconto: 5, uso: true, receitas: [{},{},{}]},
					{ qtdParc: 10, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 3, formPagtos: [
					{ qtdParc: 1, desconto: 10, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 8, uso: true, receitas: [{},{},{}]},
					{ qtdParc: 3, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 4, desconto: 0, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 5, desconto: 0, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 6, desconto: 0, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 7, desconto: 0, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 4, formPagtos: [
					{ qtdParc: 1, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 3, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 4, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 5, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 6, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 7, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 8, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
			]},
			{  id: 2, ano: (data.getFullYear() -1), status: 'StatusA', creditos: [
			]},
			{  id: 3, ano: (data.getFullYear() -2), status: 'StatusA', creditos: [
				{ credito: 3, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
			]},
			{  id: 4, ano: (data.getFullYear() -3), status: 'StatusA', creditos: [
				{ credito: 2, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
			]},
			{  id: 5, ano: (data.getFullYear() -4), status: 'StatusA', creditos: [
				{ credito: 1, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
			]},
			{  id: 6, ano: (data.getFullYear() -5), status: 'StatusB', creditos: [
				{ credito: 2, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 4, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
			]},
			{  id: 7, ano: (data.getFullYear() -6), status: 'StatusB', creditos: [
				{ credito: 1, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 1, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 4, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 3, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 1, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
				{ credito: 3, formPagtos: [
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
					{ qtdParc: 2, desconto: 5, uso: false, receitas: [{},{},{}]},
				]},
			]},
		]
		
		return {
			formasPagamento: formasPagamento,
			montarFormaPagamento: function(ano, credito, valor) {
				var formaPagamento = []
				formasPagamento.forEach((forma, key) => {
					if (forma.ano == ano) {
						forma.creditos.forEach(cred => {
							if(cred.credito == credito) {
								// Monta cada forma de pagamento
								cred.formPagtos.forEach(forma => {
									forma.descricao = forma.qtdParc < 2 ? 'Cota única' : 'Parcelado em ' + forma.qtdParc + 'x'
									forma.parcelas = []
									forma.desconto = forma.desconto
									forma.total = 0
	
									// Monta a parcela
									for(let i = 0; i < forma.qtdParc; i++) {
										var parc = {
											parcela: i+1,
											situacao: 'Aberta',
											vencida: false,
											relativo: true,
											dtVencimento: new Date().setMonth(new Date().getMonth() + i),
											valor: (valor - (forma.desconto / 100 * valor)) / forma.qtdParc,
										}
										forma.total += parc.valor
										forma.parcelas.push(parc)
									}
									formaPagamento.push(forma)
								})
							}
						})
					}
				})

				return formaPagamento
			}
		}
	})
	.service('lancamentosService', function(formasPagamentoService, $filter) {
		var lancamentos = [
			{
			  "id": 1,
			  "data": -3,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 10
			  },
			  "credito": 3,
			  "valor": {
				"origem": 3476,
				"total": 3476,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": -1,
				  "valor": 100,
				  "situacao": 2,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"manual": false,
					"num": 3245,
					"segVia": [
					  1,
					  2,
					  3
					]
				  },
				  "complementar": false,
				  "pagamento": {
					"dtPagamento": 30,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 92.3,
					"valorDevido": null,
					"valorDiferenca": null
				  },
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 0,
				  "valor": 102,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 0,
				  "valor": 103,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": 3,
				  "valor": 104,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": true,
				  "pagamento": null,
				  "cancelamento": null
				}
			  ]
			},
			{
			  "id": 2,
			  "data": -3,
			  "vencimento": 0,
			  "referente": {
				"tipo": "ECONOMICO",
				"ref": 1
			  },
			  "credito": 2,
			  "valor": {
				"origem": 705,
				"total": 705,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 0,
				  "valor": 121,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 1,
				  "valor": 120,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				}
			  ]
			},
			{
			  "id": 3,
			  "data": -6,
			  "vencimento": 0,
			  "referente": {
				"tipo": "CONTRIBUINTE",
				"ref": 4
			  },
			  "credito": 8,
			  "valor": {
				"origem": 3173,
				"total": 3173,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": -1,
				  "valor": 130,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 0,
				  "valor": 130,
				  "situacao": 3,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": {
					"data": "2021-10-13 11:37:29",
					"vencimento": 0,
					"resp": 1,
					"requerente": 1,
					"motivo": 1,
					"justificativa": "Texto de justificativa"
				  }
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 1,
				  "valor": 130,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": 2,
				  "valor": 130,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 5,
				  "dtVencimento": 3,
				  "valor": 130,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 6,
				  "dtVencimento": 4,
				  "valor": 130,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 7,
				  "dtVencimento": 5,
				  "valor": 130,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				}
			  ]
			},
			{
			  "id": 4,
			  "data": -1,
			  "vencimento": 0,
			  "referente": {
				"tipo": "ECONOMICO",
				"ref": 2
			  },
			  "credito": 2,
			  "valor": {
				"origem": 3180,
				"total": 3180,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": 0,
				  "valor": 140,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null
				}
			  ]
			},
			{
			  "id": 5,
			  "data": -5,
			  "vencimento": 0,
			  "referente": {
				"tipo": "CONTRIBUINTE",
				"ref": 1
			  },
			  "credito": 8,
			  "valor": {
				"origem": 3093,
				"total": 3093,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 2,
				  "valor": 150,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 1
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 3,
				  "valor": 150,
				  "situacao": 3,
				  "cancelamento": {
					"data": "2021-10-13 11:37:29",
					"vencimento": 0,
					"resp": 1,
					"requerente": 1,
					"motivo": 1,
					"justificativa": "Texto de justificativa"
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 1
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 4,
				  "valor": 150,
				  "situacao": 4,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 1
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": 5,
				  "valor": 150,
				  "situacao": 5,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 1
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 5,
				  "dtVencimento": 6,
				  "valor": 150,
				  "situacao": 6,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 1
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 6,
				  "dtVencimento": 7,
				  "valor": 150,
				  "situacao": 7,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 1
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 7,
				  "dtVencimento": 8,
				  "valor": 150,
				  "situacao": 8,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complem": false
				}
			  ]
			},
			{
			  "id": 6,
			  "data": -14,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 6
			  },
			  "credito": 5,
			  "valor": {
				"origem": 4011,
				"total": 4011,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 2,
				  "valor": 7.56,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 3,
				  "valor": 7.56,
				  "situacao": 1,
				  "cancelamento": {
					"data": "2021-10-13 11:37:29",
					"vencimento": 0,
					"resp": 1,
					"requerente": 1,
					"motivo": 1,
					"justificativa": "Texto de justificativa"
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 4,
				  "valor": 7.56,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ],
			  "externo": {
				"sis": "Livro Eletrônico",
				"link": "http://www.betha.com.br"
			  }
			},
			{
			  "id": 7,
			  "data": -5,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 7
			  },
			  "credito": 3,
			  "valor": {
				"origem": 4056,
				"total": 4056,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 2,
				  "valor": 170,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 3
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 3,
				  "valor": 170,
				  "situacao": 3,
				  "cancelamento": {
					"data": "2021-10-13 11:37:29",
					"vencimento": 0,
					"resp": 1,
					"requerente": 1,
					"motivo": 1,
					"justificativa": "Texto de justificativa"
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 3
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 4,
				  "valor": 170,
				  "situacao": 4,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 3
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": 5,
				  "valor": 170,
				  "situacao": 5,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 3
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 5,
				  "dtVencimento": 6,
				  "valor": 170,
				  "situacao": 6,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 3
				}
			  ],
			  "externo": {
				"sis": "Simples Nacional"
			  }
			},
			{
			  "id": 8,
			  "data": -6,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 21
			  },
			  "credito": 10,
			  "valor": {
				"origem": 2038,
				"total": 2038,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": -17,
				  "valor": 180,
				  "situacao": 1,
				  "inscr": {
					"numDivida": 622,
					"dataInscr": "2021-10-25",
					"notif": 3,
					"execucao": {
					  "dataExecucao": "20/11/2017",
					  "statusExecucao": 0,
					  "numero": 12341,
					  "valor": "1.654.22",
					  "certidoes": 6,
					  "assinado": false,
					  "peticoes": {
						"numero": 12341,
						"valor": 1654.22,
						"certidoes": 6,
						"assinado": false
					  }
					}
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 4
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": -16,
				  "valor": 180,
				  "situacao": 3,
				  "cancelamento": {
					"data": "2021-10-13 11:37:29",
					"vencimento": 0,
					"resp": 1,
					"requerente": 1,
					"motivo": 1,
					"justificativa": "Texto de justificativa"
				  },
				  "inscr": {
					"numDivida": 442,
					"dataInscr": "2021-10-25",
					"notif": null,
					"protesto": {
					  "dataProtesto": "2017-11-20",
					  "statusProtesto": "Ativo",
					  "numero": 12345,
					  "valor": 165422,
					  "certidoes": 5,
					  "assinado": true,
					  "notific": true,
					}
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 4
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": -15,
				  "valor": 180,
				  "situacao": 4,
				  "inscr": {
					"numDivida": 232,
					"dataInscr": "2021-10-25",
					"notif": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 4
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": -14,
				  "valor": 180,
				  "situacao": 5,
				  "inscr": {
					"numDivida": 322,
					"dataInscr": "2021-10-25",
					"notif": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 4
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 5,
				  "dtVencimento": -12,
				  "valor": 180,
				  "situacao": 6,
				  "inscr": {
					"numDivida": 321,
					"dataInscr": "2021-10-25",
					"notif": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 4
				}
			  ],
			  "externo": {
				"sis": "Fly Protocolo",
				"link": "http://www.betha.com.br"
			  }
			},
			{
			  "id": 9,
			  "data": -4,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 1
			  },
			  "credito": 2,
			  "valor": {
				"origem": 691,
				"total": 691,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 2,
				  "valor": 190,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"manual": false,
					"num": 9876,
					"segVia": [
					  1,
					  2,
					  3
					]
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 3,
				  "valor": 190,
				  "situacao": 3,
				  "cancelamento": {
					"data": "2021-10-13 11:37:29",
					"vencimento": 0,
					"resp": 1,
					"requerente": 1,
					"motivo": 1,
					"justificativa": "Texto de justificativa"
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 4,
				  "valor": 190,
				  "situacao": 4,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				}
			  ]
			},
			{
			  "id": 10,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 2
			  },
			  "credito": 2,
			  "valor": {
				"origem": 1370,
				"total": 1370,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 2,
				  "valor": 200,
				  "situacao": 2,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "pagamento": {
					"dtPagamento": 30,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 90,
					"valorDevido": null,
					"valorDiferenca": null
				  },
				  "baixa": {
					"num": null,
					"manual": true,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 3,
				  "valor": 200,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 4,
				  "valor": 200,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": 5,
				  "valor": 200,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 11,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 10
			  },
			  "credito": 11,
			  "valor": {
				"origem": 2406,
				"total": 2406,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": 2,
				  "valor": 210,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 3,
				  "valor": 210,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 4,
				  "valor": 210,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 4,
				  "dtVencimento": 5,
				  "valor": 210,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				}
			  ]
			},
			{
			  "id": 12,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "ECONOMICO",
				"ref": 6
			  },
			  "credito": 7,
			  "valor": {
				"origem": 1130,
				"total": 1130,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": -2,
				  "valor": 220,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 13,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 3
			  },
			  "credito": 9,
			  "valor": {
				"origem": 2748,
				"total": 2748,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": 0,
				  "valor": 1374,
				  "situacao": 2,
				  "pagamento": {
					"dtPagamento": 30,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 2208,
					"valorDevido": null,
					"valorDiferenca": null,
					"manutPagto": true
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": 4321,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2,
				  "beneficios": [
					{
					  "beneficio": 1,
					  "date": "2021-11-03",
					  "resp": 1
					},
					{
					  "beneficio": 2,
					  "date": "2021-11-03",
					  "resp": 1
					}
				  ]
				}
			  ]
			},
			{
			  "id": 14,
			  "data": -12,
			  "vencimento": 0,
			  "referente": {
				"tipo": "CONTRIBUINTE",
				"ref": 3
			  },
			  "credito": 4,
			  "valor": {
				"origem": 4416,
				"total": 4416,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": 0,
				  "valor": 2208,
				  "situacao": 2,
				  "pagamento": {
					"dtPagamento": 30,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 2208,
					"valorDevido": null,
					"valorDiferenca": null
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": 1234,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2,
				  "beneficios": [
					{
					  "beneficio": 1,
					  "date": "2021-11-03",
					  "resp": 1
					},
					{
					  "beneficio": 2,
					  "date": "2021-11-03",
					  "resp": 1
					}
				  ]
				},
				{
				  "tipoParc": "Integral",
				  "parcela": 2,
				  "dtVencimento": 0,
				  "valor": 2208,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2,
				  "beneficios": [
					{
					  "beneficio": 1,
					  "date": "2021-11-03",
					  "resp": 1
					},
					{
					  "beneficio": 2,
					  "date": "2021-11-03",
					  "resp": 1
					}
				  ]
				}
			  ]
			},
			{
			  "id": 15,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 8
			  },
			  "credito": 1,
			  "valor": {
				"origem": 6567,
				"total": 6567,
				"devido": null
			  }
			},
			{
			  "id": 16,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 2
			  },
			  "credito": 6,
			  "valor": {
				"origem": 181,
				"total": 181,
				"devido": null
			  },
			  "externo": {
				"sis": "Livro Eletrônico",
				"link": "http://www.betha.com.br"
			  }
			},
			{
			  "id": 17,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 7
			  },
			  "credito": 1,
			  "valor": {
				"origem": 8651,
				"total": 8651,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": -1,
				  "valor": 2883.66,
				  "situacao": 2,
				  "pagamento": {
					"dtPagamento": 30,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 2883.66,
					"valorDevido": null,
					"valorDiferenca": null,
					"compSaldo": true
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 0,
				  "valor": 2883.66,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				},
				{
				  "tipoParc": "Parcelado",
				  "parcela": 3,
				  "dtVencimento": 1,
				  "valor": 2883.66,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 18,
			  "data": -24,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 10,
				"relativo": false
			  },
			  "credito": 1,
			  "valor": {
				"origem": 2038,
				"total": 2038,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 5,
				  "dtVencimento": -24,
				  "valor": 190,
				  "situacao": 1,
				  "inscr": {
					"numDivida": 561,
					"dataInscr": "2022-04-18",
					"notif": 4,
					"execucao": {
					  "dataExecucao": "20/11/2017",
					  "statusExecucao": 1,
					  "numero": 12341,
					  "valor": "1.654.22",
					  "certidoes": 6,
					  "assinado": false,
					  "peticoes": {
						"numero": 12341,
						"valor": 1654.22,
						"certidoes": 6,
						"assinado": false
					  }
					}
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 4
				}
			  ]
			},
			{
			  "id": 19,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 4
			  },
			  "credito": 9,
			  "valor": {
				"origem": 2748,
				"total": 2748,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": 0,
				  "valor": 230,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 20,
			  "data": -3,
			  "vencimento": 0,
			  "referente": {
				"tipo": "ECONOMICO",
				"ref": 2
			  },
			  "credito": 3,
			  "valor": {
				"origem": 705,
				"total": 705,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 2,
				  "dtVencimento": 1,
				  "valor": 120,
				  "situacao": 1,
				  "inscr": {
					"numDivida": null,
					"dataInscr": "2021-10-25"
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "pagamento": null,
				  "cancelamento": null,
				  "externo": {
					"sis": "Livro Eletrônico",
					"link": "http://www.betha.com.br"
				  }
				}
			  ]
			},
			{
			  "id": 22,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "ECONOMICO",
				"ref": 9
			  },
			  "credito": 7,
			  "valor": {
				"origem": 1130,
				"total": 1130,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": -2,
				  "valor": 220,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 23,
			  "data": 0,
			  "vencimento": 0,
			  "referente": {
				"tipo": "ECONOMICO",
				"ref": 4
			  },
			  "credito": 7,
			  "valor": {
				"origem": 1130,
				"total": 1130,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": -2,
				  "valor": 220,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 24,
			  "data": 0,
			  "vencimento": 1,
			  "referente": {
				"ref": 10
			  },
			  "credito": 1,
			  "valor": {
				"origem": 392,
				"total": 392,
				"devido": null
			  },
			  "parcelas": [
				{
				  "parcela": 1,
				  "dtVencimento": 1,
				  "valor": 130.66,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				},
				{
				  "parcela": 2,
				  "dtVencimento": 1,
				  "valor": 130.66,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				},
				{
				  "parcela": 3,
				  "dtVencimento": 3,
				  "valor": 130.66,
				  "situacao": 1,
				  "pagamento": {},
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": null,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": 2
				}
			  ]
			},
			{
			  "id": 25,
			  "data": -16,
			  "vencimento": -10,
			  "referente": {
				"tipo": "IMOVEL",
				"ref": 28
			  },
			  "credito": 10,
			  "valor": {
				"origem": 2038,
				"total": 2038,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Parcelado",
				  "parcela": 1,
				  "dtVencimento": -10,
				  "valor": 654,
				  "situacao": 2,
				  "inscr": {
					"numDivida": 8953,
					"dataInscr": "2021-10-25",
					"notif": 2
				  },
				  "baixa": {
					"num": 985,
					"manual": false,
					"segVia": []
				  },
				  "pagamento": {
					"dtPagamento": -10,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 650,
					"valorDevido": null,
					"valorDiferenca": null
				  },
				  "complementar": false,
				  "notif": 4
				}
			  ]
			},
			{
			  "id": 26,
			  "data": -34,
			  "vencimento": 0,
			  "referente": {
				"ref": 3
			  },
			  "credito": 3,
			  "valor": {
				"origem": 216,
				"total": 216,
				"devido": null
			  },
			  "parcelas": [
				{
				  "tipoParc": "Integral",
				  "parcela": 1,
				  "dtVencimento": -33,
				  "valor": 108,
				  "situacao": 2,
				  "pagamento": {
					"dtPagamento": -33,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 108,
					"valorDevido": null,
					"valorDiferenca": null
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": 24,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				},
				{
				  "tipoParc": "Integral",
				  "parcela": 2,
				  "dtVencimento": -32,
				  "valor": 108,
				  "situacao": 2,
				  "pagamento": {
					"dtPagamento": -32,
					"creditado": 1,
					"convenio": 1,
					"valorPago": 108,
					"valorDevido": null,
					"valorDiferenca": null
				  },
				  "inscr": {
					"numDivida": null,
					"dataInscr": null
				  },
				  "baixa": {
					"num": 25,
					"manual": false,
					"segVia": []
				  },
				  "complementar": false,
				  "notif": null
				}
			  ]
			}
		]

		var _dividas = [
			{ numDivida: 7859, parcela: 1, situacao: 0, contrib: 'Ramon Vieira Viquetti'    , credito: 'IPTU', ano: '2017', valor: 995.86, referente: 'Imóvel 1', dataInscr: '15/11/2017', certidao: { numero: 3210, data:  0 }, erroCert: false, erroProt: false, erroExec : false, notific: null },
			{ numDivida: 3067, parcela: 1, situacao: 3, contrib: 'João da Silva Camargo'    , credito: 'IPTU', ano: '2017', valor: 710.4, referente: 'Imóvel 1', dataInscr: '15/11/2017', certidao: { numero: 3211, data:  0 }, erroCert: true , erroProt: false, erroExect: false, notific: null },
			{ numDivida: 9400, parcela: 1, situacao: 1, contrib: 'Júnior Garcia'            , credito: 'IPTU', ano: '2017', valor: 512.13, referente: 'Imóvel 1', dataInscr: '15/11/2017', certidao: { numero: 3212, data: -100 }, erroCert: false, erroProt: false, erroExec : false, notific: null },
			{ numDivida: 9041, parcela: 1, situacao: 4, contrib: 'Fausto Silva'             , credito: 'IPTU', ano: '2017', valor: 113.21, referente: 'Imóvel 1', dataInscr: '15/11/2017', certidao: { numero: 3213, data: -320 }, erroCert: false, erroProt: true , erroExec : false, notific: 1234 },
			{ numDivida: 2030, parcela: 1, situacao: 4, contrib: 'Vitor Augusto de Souza'   , credito: 'IPTU', ano: '2017', valor: 841.22, referente: 'Imóvel 1', dataInscr: '15/11/2017', certidao: { numero: 3214, data: -368 }, erroCert: false, erroProt: false, erroExec : false, notific: null },
			{ numDivida: 8365, parcela: 1, situacao: 1, contrib: 'Ricardo Darós de Oliveira', credito: 'IPTU', ano: '2017', valor: 425.16, referente: 'Imóvel 1', dataInscr: '15/11/2017', certidao: { numero: 3215, data: -710 }, erroCert: false, erroProt: false, erroExec : true , notific: null }
		];

		var debitos               = []
		var debitosTotal          = 0
		var debitosNaoNotificados = []
		var debitosNotificados    = []
		var dividas               = []
		var dividasTotal          = 0
		var dividasNaoNotificadas = []
		var dividasNotificadas    = []
		var execucoes             = []
		var protestos             = []

		lancamentos.forEach(lancamento => {
			lancamento.data = moment().add(lancamento.data, 'month').format('YYYY-MM-DD')
			lancamento.ano = lancamento.data.split('-')[0]
			lancamento.valor.devido = 0

			//---------------------------
			// Sem parcelas lançadas
			//---------------------------
			if (!lancamento.parcelas) {
				lancamento.formPagtos = formasPagamentoService.montarFormaPagamento(lancamento.ano, lancamento.credito, lancamento.valor.origem)
				lancamento.parcelas = [
					{ valor: lancamento.valor.origem, parcela: 1, dtVencimento: lancamento.vencimento, situacao: 1 }
				]
			} else {
				//---------------------------
				// Com parcelas lançadas
				//---------------------------
				lancamento.parcelas.forEach((parcela, idx) => {
					parcela.vencido      = false
					parcela.hideRef      = false
					parcela.abaixoLimite = false
					delete parcela.parcelas

					//Verifica se a parcela é relativa ao contribuinte
					if (!lancamento.referente.relativo) {
						parcela.relativo = false
					} else {
						parcela.relativo = true
					}
					
					//Verifica vencimento
					if (parcela.dtVencimento < 0) {
						parcela.vencido = true
					}
					parcela.dtVencimento = moment().add(parcela.dtVencimento, 'month').format('YYYY-MM-DD')

					if(lancamento.parcelas.length > 1 && parcela.parcela > 1) {//Mais de uma parcela
						if(parcela.situacao == lancamento.parcelas[idx-1].situacao) {//Mesma situação da anterior
							parcela.hideRef = true
						}
					}

					//Vefirica se está abaixo do limite
					if(parcela.valor < 10) {
						parcela.situacao = 8
					}

					//Verificação de pagamento
					if (!_.isEmpty(parcela.pagamento)) {//Se já tem pagamento
						if (parcela.parcela == 1) {
							// console.log(parcela);
						}
						var diferenca = Number(parcela.valor) - Number(parcela.pagamento.valorPago)
						parcela.pagamento.valorDiferenca = diferenca
						parcela.pagamento.valorDevido = diferenca
						parcela.pagamento.dtPagamento = moment().add(parcela.pagamento.dtPagamento, 'days').format('YYYY-MM-DD HH:MM')
						parcela.pagamento.creditado = moment().add(parcela.pagamento.creditado, 'days').format('YYYY-MM-DD HH:MM')
	
						//Se pagou menos (DIFERENÇA DE VALOR)
						if(diferenca > 0) {
							var novaParcela = {
								"tipoParc": "",
								"parcela": parcela.parcela,
								"dtVencimento": parcela.dtVencimento,
								"valor": diferenca,
								"situacao": 1,
								"inscr": {
									"numDivida": null,
									"dataInscr": null
								},
								"baixa": {
									"num": null,
									"manual": false,
									"segVia": []
								},
								"complementar": true,
								"complementarDiferencaPagto": true,
								"origem": parcela,
								"pagamento": null,
								"cancelamento": null
							}
	
							parcela.complementar = true
								
							lancamento.parcelas.push(novaParcela)
							// lancamento.parcelas.splice(0, 0, novaParcela)
						}
						//Se pagou mais
						if(diferenca < 0) {
	
						}
	
					} else {//Se não tem pagamento
						lancamento.valor.devido += parcela.valor
					}
	
					//Verificação de benefícios
					if (parcela.beneficios) {
						// $rootScope.beneficiosFiscais.forEach(beneficio => {
						// 	parcela.beneficio = true
						// })
					}
				})
			}

			lancamento.parcelas.forEach(parcela => {
				var parcelaNaoInscrita        = (parcela.inscr   == undefined || parcela.inscr.numDivida == null)
				var parcelaInscrita = false
				
				if (parcela.vencido && parcela.inscr.numDivida != null) {
					parcelaInscrita = true
				}
				
				parcela.valor = {
					origem: null,
					parcela: parcela.valor,
					devido: null
				}

				//---------------------------
				// Débitos
				//---------------------------
				if (parcelaNaoInscrita) {
					parcela.valor.origem = lancamento.valor.origem
					parcela.valor.devido = parcela.pagamento ? parcela.valor - parcela.pagamento.valorPago : null
					
					debitos.push(angular.copy(Object.assign(lancamento, parcela)))
	
					debitosTotal += parcela.valor.parcela	
					
					//Notificadas
					if (parcela.notif == null) {
						debitosNotificados.push(angular.copy(Object.assign(lancamento, parcela)))
					} else {
						debitosNaoNotificados.push(angular.copy(Object.assign(lancamento, parcela)))
					}
				}
				
				//---------------------------
				// Dívidas
				//---------------------------
				if(parcelaInscrita) {
					dividas.push(angular.copy(Object.assign(lancamento, parcela)))
					
					dividasTotal += parcela.valor.parcela
					
					//Notificadas
					if (parcela.inscr.notif == null) {
						dividasNaoNotificadas.push(angular.copy(Object.assign(lancamento, parcela)))
					} else {
						dividasNotificadas.push(angular.copy(Object.assign(lancamento, parcela)))
					}

					//---------------------------
					// Execucoes
					//---------------------------
					if(parcela.inscr.execucao) {
						execucoes.push(angular.copy(Object.assign(lancamento, parcela)))
					}

					//---------------------------
					// Protestos
					//---------------------------
					if(parcela.inscr.protesto) {
						protestos.push(angular.copy(Object.assign(lancamento, parcela)))
					}

					// dividas.forEach(divida => {
					// 	divida.certidao.data = $filter('arrecFormatDate')(divida.certidao.data)
					// 	divida.ano = $filter('arrecAno')(divida.certidao.data)
					// });
				}
				
				delete debitos[debitos.length-1].parcelas
			})

			lancamento.parcelas.sort(function(a, b) {
				return a.parcela - b.parcela
			})
		})

		return {
			lancamentos          : lancamentos,
			debitos              : debitos               ,
			debitosTotal         : debitosTotal          ,
			debitosNaoNotificados: debitosNaoNotificados ,
			debitosNotificados   : debitosNotificados    ,
			dividas              : _dividas               ,
			dividasTotal         : dividasTotal          ,
			dividasNaoNotificadas: dividasNaoNotificadas ,
			dividasNotificadas   : dividasNotificadas    ,
			execucoes            : execucoes             ,
			protestos            : protestos             ,
			groupByCredito       : function(lista, property) {
				var creditos = [], results = [];
	
				lista.forEach((item, index) => {
					credito = item[property]; //credito
					indexProperty = creditos.indexOf(credito);
					
					if (indexProperty < 0) { //Cria o agrupador do credito
						creditos.push(credito);
						results.push({'credito': credito, lancamentos: [lista[index]], total: item.valor.parcela})
	
					} else { //Adiciona o item no agrupador de credito
						results.filter(result => {
							if (result.credito == credito) {
								result.total += item.valor.parcela
								return result.credito
							} else {
								return false
							}
							
						})[0].lancamentos.push(item)
					}
				})
	
				return results;
			},
			groupByAno: function(lista, property) {
				var anos = [], results = [];

				// console.log(lista);
				lista.forEach((item, index) => {
					ano = item[property]; //Ano
					indexProperty = anos.indexOf(ano);
					
					if (indexProperty < 0) { //Adiciona o agrupador do ano
						anos.push(ano);
						results.push({'ano': ano, lancamentos: [lista[index]], total: item.valor.parcela})
						
					} else {//Adiciona o item no agrupador do ano
						results.filter(result => {
							if (result.ano == ano) {
								result.total += item.valor.parcela
								return result.ano
							} else {
								return false
							}
							
						})[0].lancamentos.push(item)
					}
				})

				return results;
			},
			groupByContribuinte: function(lista, property) {
				var contribuintes = [], results = [];

				lista.forEach((item, index) => {
					contribuinte = item[property]; //contribuinte
					indexProperty = contribuintes.indexOf(contribuinte);
					
					if (indexProperty < 0) { //Adiciona o agrupador do contribuinte
						contribuintes.push(contribuinte);
						results.push({'contribuinte': contribuinte, lancamentos: [lista[index]], total: item.valor.parcela})
						
					} else {//Adiciona o item no agrupador do contribuinte
						results.filter(result => {
							if (result.contribuinte == contribuinte) {
								result.total += item.valor.parcela
								return result.contribuinte
							} else {
								return false
							}
							
						})[0].lancamentos.push(item)
					}
				})

				console.log(results);
				return results;
			}
		}
	})
	.service('certidoesService', function(ContribuintesService, ENUMS, $filter, db) {
		var situacaoDividasCertidao = [
			{ id: 1, key: 'SEM_CDA'                , descricao: 'Sem certidão'           , bgBadge: '             '   , icon: 'fa-file-text-o'    , iconColor: 'tx__gray--d10'   },
			{ id: 2, key: 'CDA_EMITINDO'           , descricao: 'Emitindo certidão'      , bgBadge: '             '   , icon: 'fa-hourglass-2'    , iconColor: 'tx__gray--d10'   },
			{ id: 2, key: 'CDA_EMITIDA'            , descricao: 'Certidão emitida'       , bgBadge: 'bg__green--l40'  , icon: 'fa-file-text-o'    , iconColor: 'tx__green--d10'  },
			{ id: 1, key: 'PETICIONANDO'           , descricao: 'Peticionando'           , bgBadge: '             '   , icon: 'fa-hourglass-2'    , iconColor: 'tx__gray--d10'   },
			{ id: 3, key: 'PETICIONADA'            , descricao: 'Com petição'            , bgBadge: 'bg__orange--l30' , icon: 'fa-file-text'      , iconColor: 'tx__orange--d10' },
			{ id: 4, key: 'EXECUTADA'              , descricao: 'Executada'              , bgBadge: 'bg__orange--l20' , icon: 'fa-balance-scale'  , iconColor: 'tx__gray--d30'   },
			{ id: 5, key: 'PROTESTADA'             , descricao: 'Protestada'             , bgBadge: 'bg__blue--l30'   , icon: 'fa-check-square-o' , iconColor: 'tx__blue--d20'   },
			{ id: 6, key: 'PROTESTADA_PETICIONADA' , descricao: 'Protestada com petição' , bgBadge: ''                , icon: ''                  , iconColor: ''                },
			{ id: 7, key: 'EXECUTADA_PROTESTADA'   , descricao: 'Executada e protestada' , bgBadge: ''                , icon: ''                  , iconColor: ''                },
			{ id: 8, key: 'INCONSISTENTE'          , descricao: 'Inconsistente'          , bgBadge: 'badge-danger'    , icon: 'fa-warning'        , iconColor: ''                },
		]
		var certidoes = [
			{ contrib: 1  , valor: 961.04   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3210, data: 0    }, erroCert: false, erroProt: false, erroExec  : false, assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false                                                                                                          },
			{ contrib: 2  , valor: 889.23   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3211, data: -100 }, erroCert: true , erroProt: false, erroExect : false, assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false                                                                                                          },
			{ contrib: 3  , valor: 282.69   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'PAGA'      }, certidao: { numero: 3212, data: -259 }, erroCert: false, erroProt: false, erroExec  : false, assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: true , hashAssinaturaP7s: false, peticionada: false, protestada: true  , executada: false, dividasQuitadas: true                                                                                   },
			{ contrib: 3  , valor: 282.69   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'PRESCRITA' }, certidao: { numero: 3212, data: -259 }, erroCert: false, erroProt: false, erroExec  : false, assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: true , hashAssinaturaP7s: false, peticionada: true , protestada: false , executada: false, dividasQuitadas: true                                                                                   },
			{ contrib: 3  , valor: 282.69   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'CANCELADA' }, certidao: { numero: 3212, data: -259 }, erroCert: false, erroProt: false, erroExec  : false, assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: true , hashAssinaturaP7s: false, peticionada: true , protestada: true  , executada: false, dividasQuitadas: true                                                                                   },
			{ contrib: 3  , valor: 282.69   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'REMIDA'    }, certidao: { numero: 3212, data: -259 }, erroCert: false, erroProt: false, erroExec  : false, assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: true , hashAssinaturaP7s: false, peticionada: false, protestada: true  , executada: true, dividasQuitadas: true                                                                                    },
			{ contrib: 4  , valor: 473.16   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'PARCELADA' }, certidao: { numero: 3213, data: -345 }, erroCert: false, erroProt: true , erroExec  : false, assinatura: { data: 1, user: 1, tipo: 'P7S' } ,    assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: true, dividasParceladas: true                                                                                  },
			{ contrib: 5  , valor: 899.28   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3214, data: -451 }, erroCert: false, erroProt: false, erroExec  : false, assinatura: null     ,                             assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false                                                                                                          },
			{ contrib: 6  , valor: 258.15   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'CANCELADA' }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false, cancelamento: { data: -25, resp: 'ramon.viquetti', motivo: 1, justificativa: 'Texto de justificativa' } },
			{ contrib: 7  , valor: 17679.66 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'SUSPENSA'  }, certidao: { numero: 3216, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: true , peticionada: false, protestada: true  , executada: false                                                                                                          },
			{ contrib: 8  , valor: 14040.98 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3217, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: true , protestada: true  , executada: false                                                                                                          },
			{ contrib: 9  , valor: 48520.17 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: true , protestada: false , executada: false                                                                                                          },
			{ contrib: 10 , valor: 20418.91 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: true , protestada: true  , executada: false                                                                                                          },
			{ contrib: 11 , valor: 564.53   , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: true  , executada: true                                                                                                           },
			{ contrib: 12 , valor: 36701.51 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } , assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: true  , executada: false                                                                                                          },
			{ contrib: 13 , valor: 4914.23  , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'P7S' } ,    assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: true, inconsistente: true,                                                                                     },
			{ contrib: 14 , valor: 15295.17 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'P7S' } ,    assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false, inconsistente: false, emitindoCertidao: true,                                                           },
			{ contrib: 14 , valor: 1657.90  , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: 3215, data: -789 }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'P7S' } ,    assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false, inconsistente: false, peticionando: true,                                                               },
			{ contrib: 14 , valor: 17782.24 , referente: 'Imóvel 1', endereco: ENUMS.ENDERECOCOMPLETO[0].descricao, modelo: 1, dtmonetaria: new Date(), divida: { situacao: 'ABERTA'    }, certidao: { numero: null, data: null }, erroCert: false, erroProt: false, erroExec  : true , assinatura: { data: 1, user: 1, tipo: 'P7S' } ,    assinado: false, hashAssinaturaP7s: false, peticionada: false, protestada: false , executada: false, inconsistente: false, peticionando: false,                                                              },
		];

		certidoes.forEach(certidao => {
			certidao.certidao.data = $filter('arrecFormatDate')(certidao.certidao.data)
			certidao.ano = $filter('arrecAno')(certidao.certidao.data)

			certidao.contrib = ContribuintesService.contribuintes.find(contribuinte => certidao.contrib == contribuinte.id)
		});

		return {
			certidoes: certidoes,
			situacaoDividasCertidao: situacaoDividasCertidao,
		}
	})
	.filter('situacaoDividasCertidao', function($filter, certidoesService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, certidoesService.situacaoDividasCertidao, selector ? selector : 'descricao')
		}
	})
	.service('peticoesService', function($filter) {
		var peticoes = [
			{ contrib: 'Ramon Vieira Viquetti'     , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 471, processo: '0900322-77.2019.8.24.0036', valor: 9567.53 , certidoes: '6', certidao: { numero: 3210, data:  0 }, assinatura: null     ,                            anexos: [], documentoEnviado: false, envio: { data: null, user: null, erro: null }, notific: true  },
			{ contrib: 'João da Silva Camargo'     , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 947, processo: '0900322-77.2019.8.24.0036', valor: 3702.94 , certidoes: '6', certidao: { numero: 3210, data: -1 }, assinatura: null     ,                            anexos: [], documentoEnviado: true , envio: { data: null, user: null, erro: null }, notific: false },
			{ contrib: 'Júnior Garcia'             , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 670, processo: '0900322-77.2019.8.24.0036', valor: 1600.13 , certidoes: '6', certidao: { numero: 3210, data: -2 }, assinatura: null     ,                            anexos: [], documentoEnviado: false, envio: { data: null, user: null, erro: null }, notific: false },
			{ contrib: 'Fausto Silva'              , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 474, processo: '0900322-77.2019.8.24.0036', valor: 8836.99 , certidoes: '6', certidao: { numero: 3210, data: -3 }, assinatura: null     ,                            anexos: [], documentoEnviado: false, envio: { data: -9  , user: 1   , erro: true }, notific: false },
			{ contrib: 'Vitor Augusto de Souza'    , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 318, processo: '0900322-77.2019.8.24.0036', valor: 2207.8  , certidoes: '6', certidao: { numero: 3210, data: -4 }, assinatura: null     ,                            anexos: [], documentoEnviado: false, envio: { data: null, user: null, erro: null }, notific: false },
			{ contrib: 'Ricardo Darós de Oliveira' , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 116, processo: '0900322-77.2019.8.24.0036', valor: 8410.86 , certidoes: '6', certidao: { numero: 3210, data: -5 }, assinatura: null     ,                            anexos: [], documentoEnviado: false, envio: { data: null, user: null, erro: null }, notific: false },
			{ contrib: 'Ribamar Jr.'               , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 357, processo: '0900322-77.2019.8.24.0036', valor: 1093.34 , certidoes: '6', certidao: { numero: 3210, data: -6 }, assinatura: null     ,                            anexos: [], documentoEnviado: false, envio: { data: null, user: null, erro: null }, notific: false },
			{ contrib: 'Alexandro Dias de Jesus'   , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 964, processo: '0900322-77.2019.8.24.0036', valor: 6420.63 , certidoes: '6', certidao: { numero: 3210, data: -7 }, assinatura: { data: 1, user: 1, tipo: 'NORMAL' }, anexos: [], documentoEnviado: false, envio: { data: -9  , user: 1   , erro: null }, notific: true  },
			{ contrib: 'Rosimere Anastásio'        , dataExecucao: '20/11/2017', referente: 'Imóvel 1', statusExecucao: 'Em tramitação', numero: 206, processo: '0900322-77.2019.8.24.0036', valor: 7455.35 , certidoes: '6', certidao: { numero: 3210, data: -8 }, assinatura: { data: 1, user: 1, tipo: 'P7S' },    anexos: [], documentoEnviado: false, envio: { data: -9  , user: 1   , erro: null }, notific: false }
		];

		peticoes.forEach(peticao => {
			peticao.certidao.data = $filter('arrecFormatDate')(peticao.certidao.data)
			peticao.ano = $filter('arrecAno')(peticao.certidao.data)
		});

		return {
			peticoes: peticoes,
		}
	})
	.directive('situacaoDividasCertidaoTags', function($filter) {
		return {
			restrict: 'E',
			template: `
				<span class="badge {{class}} {{CDA_EMITINDO.bgBadge}}"            ng-if="SEM_CDA"><i class="fa fa-fw {{SEM_CDA.icon}} {{SEM_CDA.iconColor}}"></i> {{SEM_CDA.descricao}}</span>
				<span class="badge {{class}} {{CDA_EMITINDO.bgBadge}}"            ng-if="CDA_EMITINDO"><i class="fa fa-fw {{CDA_EMITINDO.icon}} {{CDA_EMITINDO.iconColor}}"></i> {{CDA_EMITINDO.descricao}}</span>
				<span class="badge {{class}} {{CDA_EMITIDA.bgBadge}}"             ng-if="CDA_EMITIDA"><i class="fa fa-fw {{CDA_EMITIDA.icon}} {{CDA_EMITIDA.iconColor}}"></i> {{CDA_EMITIDA.descricao}}</span>
				<span class="badge {{class}} {{PETICIONANDO.bgBadge}}"            ng-if="PETICIONANDO"><i class="fa fa-fw {{PETICIONANDO.icon}} {{PETICIONANDO.iconColor}}"></i> {{PETICIONANDO.descricao}}</span>
				<span class="badge {{class}} {{PETICIONADA.bgBadge}}"             ng-if="PETICIONADA && !PROTESTADA_PETICIONADA"><i class="fa fa-fw {{PETICIONADA.icon}} {{PETICIONADA.iconColor}}"></i> {{PETICIONADA.descricao}}</span>
				<span class="badge {{class}} {{EXECUTADA.bgBadge}}"               ng-if="EXECUTADA && !EXECUTADA_PROTESTADA"><i class="fa fa-fw {{EXECUTADA.icon}} {{EXECUTADA.iconColor}}"></i> {{EXECUTADA.descricao}}</span>
				<span class="badge {{class}} {{PROTESTADA.bgBadge}}"              ng-if="PROTESTADA && !PROTESTADA_PETICIONADA && !EXECUTADA_PROTESTADA"><i class="fa fa-fw {{PROTESTADA.icon}} {{PROTESTADA.iconColor}}"></i> {{PROTESTADA.descricao}}</span>
				<span class="badge {{class}} {{PROTESTADA_PETICIONADA.bgBadge}}"  ng-if="PROTESTADA_PETICIONADA"> {{PROTESTADA_PETICIONADA.descricao}}</span>
				<span class="badge {{class}} {{EXECUTADA_PROTESTADA.bgBadge}}"    ng-if="EXECUTADA_PROTESTADA"> {{EXECUTADA_PROTESTADA.descricao}}</span>
				<span class="badge {{class}} {{INCONSISTENTE.bgBadge}}"           ng-if="INCONSISTENTE" bf-tooltip="Esta CDA apresenta inconsistências no banco de dados. Por favor, entre em contato com o suporte técnico para correção."><i class="fa fa-fw {{INCONSISTENTE.icon}} {{INCONSISTENTE.iconColor}}"></i> {{INCONSISTENTE.descricao}}</span>
			`,
			replace: false,
			scope: {
				certidao: '=',
				class: '@?',
			},
			controller: function($scope) {
				var vm = $scope

				var EMITIDA = false
				
				if (vm.certidao            .inconsistente     ) { vm.INCONSISTENTE          = $filter('situacaoDividasCertidao')('INCONSISTENTE'          , 'object') }
				if(!vm.certidao.inconsistente) {
					if (!vm.certidao       .certidao.numero   ) { vm.SEM_CDA                = $filter('situacaoDividasCertidao')('SEM_CDA'                , 'object'), EMITIDA = true }
					if (vm.certidao        .emitindoCertidao  ) { vm.CDA_EMITINDO           = $filter('situacaoDividasCertidao')('CDA_EMITINDO'           , 'object'), EMITIDA = true }
					if (vm.certidao        .peticionando      ) { vm.PETICIONANDO           = $filter('situacaoDividasCertidao')('PETICIONANDO'           , 'object'), EMITIDA = true }
					if (vm.certidao        .peticionada       ) { vm.PETICIONADA            = $filter('situacaoDividasCertidao')('PETICIONADA'            , 'object'), EMITIDA = true }
					if (vm.certidao        .executada         ) { vm.EXECUTADA              = $filter('situacaoDividasCertidao')('EXECUTADA'              , 'object'), EMITIDA = true }
					if (vm.certidao        .protestada        ) { vm.PROTESTADA             = $filter('situacaoDividasCertidao')('PROTESTADA'             , 'object'), EMITIDA = true }
					if (vm.certidao        .dividasQuitadas   ) { vm.QUITADA                = $filter('situacaoDividasCertidao')('QUITADA'                , 'object'), EMITIDA = true }
					if (vm.certidao        .dividasParceladas ) { vm.PARCELADA              = $filter('situacaoDividasCertidao')('PARCELADA'              , 'object'), EMITIDA = true }
					if (vm.PROTESTADA && vm.PETICIONADA       ) { vm.PROTESTADA_PETICIONADA = $filter('situacaoDividasCertidao')('PROTESTADA_PETICIONADA' , 'object'), EMITIDA = true }
					if (vm.PROTESTADA && vm.EXECUTADA         ) { vm.EXECUTADA_PROTESTADA   = $filter('situacaoDividasCertidao')('EXECUTADA_PROTESTADA'   , 'object'), EMITIDA = true }
	
					if (!EMITIDA) {
						vm.CDA_EMITIDA = $filter('situacaoDividasCertidao')('CDA_EMITIDA', 'object')
					}
				}
			}
		}
	}
	)
	.directive('situacaoDividasCertidaoSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="sel__{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="sel__{{ID}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				ngModel    : '=' ,
				ngRequired : '=' ,
				ngDisabled : '=' ,
				label      : '@?',
				placeholder: '@?',
				multiple   : '=' ,
				filter     : '='  ,
			},
			transclude: true,
			compile: compile,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($scope, certidoesService, $filter) {
			var vm = $scope
			vm.ID = Date.now()
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre a situação pela descrição.'
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: vm.filter != undefined ? vm.filter : $filter('orderBy')(certidoesService.situacaoDividasCertidao, 'id'),
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.key
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('situacaoDividasCertidao')($(element).val(), 'object') ) : null
				},
				formatResult: function(item) {
					var ITEM_HTML = ''
					if(item.icon != '') {
						ITEM_HTML = `<span class="badge ${item.bgBadge}"><i class="fa fa-fw ${item.icon} ${item.iconColor}"></i> ${item.descricao}</span>`
					} else {
						ITEM_HTML = `<span class="badge ${item.bgBadge}">${item.descricao}</span>`
					}
					return ITEM_HTML
				},
				formatSelection: function(item) {
					var ITEM_HTML = ''
					if(item.icon != '') {
						ITEM_HTML = `<i class="fa fa-fw ${item.icon} ${item.iconColor}"></i> ${item.descricao}`
					} else {
						ITEM_HTML = item.descricao
					}
					return ITEM_HTML
				},
			}
		}

		function compile(element, attrs) {
			if (attrs.hasOwnProperty('multiple')) {
				element.find('input').attr('multiple', true)
			}
		}
	})
	.directive('situacaoPagamentoDividasCertidaoSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="sel__{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="sel__{{ID}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				ngModel    : '=' ,
				ngRequired : '=' ,
				ngDisabled : '=' ,
				label      : '@?',
				placeholder: '@?',
				multiple   : '=' ,
			},
			transclude: true,
			compile: compile,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($scope, certidoesService, $filter) {
			var vm = $scope
			vm.ID = Date.now()
		
			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre a situação pela descrição.'
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: [
						{ id: 1, descricao: 'Aberta' },
						{ id: 2, descricao: 'Quitada' },
						{ id: 3, descricao: 'Parcelada' },
					],
					text: function(item) {
						return item.descricao;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.key
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('situacaoDividasCertidao')($(element).val(), 'object') ) : null
				},
				formatResult: function(item) {
					return item.descricao
				},
				formatSelection: function(item) {
					return item.descricao
				},
			}
		}

		function compile(element, attrs) {
			if (attrs.hasOwnProperty('multiple')) {
				element.find('input').attr('multiple', true)
			}
		}
	})
	.directive('cda', function() {
			return {
				restrict: 'E',
				template: `
					<span class="badge badge-default show" ng-if="divida.certidao" bf-tooltip="{{divida.certidao.emitindoCertidao ? 'Emissão em andamento' : ''}}">
						<span ng-if="divida.certidao.emitindoCertidao">{{divida.certidao.numero}}/{{divida.certidao.data | arrecAno}} <i class="fa fa-fw fa-hourglass-2 text-muted"></i></span>
						<a ng-if="!divida.certidao.emitindoCertidao" href="" bf-popover="'gerenciador-dividas/dividas-ativas/dividas/popover-detalhes-certidao.html'" class="popover-active" data-placement="bottom" bf-popover-size="med-popover">{{divida.certidao.numero}}/{{divida.certidao.data | arrecAno}}</a>
						<i class="fa fa-fw fa-check-circle-o text-greenA7" bf-tooltip="Assinado digitalmente" ng-if="divida.assinatura != null && divida.assinatura.tipo == 'NORMAL'"></i>
						<i class="fa fa-fw fa-check-circle text-greenA7" bf-tooltip="Assinado digitalmente P7s" ng-if="divida.assinatura != null && divida.assinatura.tipo == 'P7S'"></i>
					</span>
				`,
				replace: true,
				scope: {
					divida: '='
				},
				controller: function($scope, arrecModal) {
					$scope.editarCDA = function(registro) {
						arrecModal.openOld('gerenciador-dividas/dividas-ativas/certidoes/editar-cda-modal.html', $scope, registro, 'lg', 'dividasAtivasModalCtrl')
					}
					
					$scope.abrirHistoricoCertidao = function(registro) {
						arrecModal.open('gerenciador-dividas/dividas-ativas/certidoes/historico-modal.html', $scope, registro, 'sm', 'historicoCertidaoModalCtrl')
					};
				}
			}
		}
	)
	.directive('simulaCalculo', function() {
			return {
				restrict: 'E',
				template: `
					<span>
						<small ng-if="calculando"><i class="fa fa-fw fa-spin fa-spinner"></i>{{SHOW_LABEL ? ' Calculando valor atualizado' : ''}}</small>
						<a href="" bf-popover="'gerenciador-dividas/dividas-ativas/dividas/popover-detalhes-valor.html'" class="popover-active" data-placement="left" bf-popover-size="popover-xs" ng-if="!calculando" keep-open title="{{SHOW_ICON ? '' : 'Valor atualizado com acréscimos na data de hoje'}}">
							{{item.total | currency}} <i class="fa fa-fw fa-info-circle" ng-if="SHOW_ICON" bf-tooltip="Valor atualizado com acréscimos na data de hoje"></i>
						</a>
					</span>
				`,
				replace: true,
				scope: {
					item     : '=',
					showIcon : '=',
					showLabel: '='
				},
				controller: function($scope, $timeout) {
					var vm = $scope
					vm.SHOW_ICON  = vm.showIcon != false ? true : false
					vm.SHOW_LABEL = vm.showLabel != false ? true : false

					min = Math.ceil(700);
					max = Math.floor(50000);
					vm.calculando = true

					if(vm.item.valor && !vm.item.total) {
						vm.item.total = vm.item.valor
					}

					if(vm.item.total) {
						$timeout(function() {
							vm.calculando = false
						}, Math.floor(Math.random() * (12000 - 1000)) + min)
					} else {
						vm.item.total = Math.floor(Math.random() * (max - min)) + min;

						$timeout(function() {
							vm.calculando = false
						}, Math.floor(Math.random() * (12000 - 1000)) + min)
					}
				}
			}
		}
	)
	.directive('botaoAssinar', function() {
		return {
			restrict: 'E',
			template: `
				<a href="" ng-class="CLASSES" class="{{ngDisabled ? 'link-disabled' : ''}}" ng-click="assinar({})">
					{{LABEL}}
				</a>
			`,
			scope: {
				classes    : "@?" ,
				label      : "@?" ,
				ngDisabled : "="  ,
			},
			transclude: true,
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				
				vm.assinar = function(resolve) {
					arrecModal.openOld('gerenciador-dividas/dividas-ativas/modal-assinar.html', $scope, resolve, 'lg', 'dividasAtivasModalCtrl')
				};

				vm.LABEL   = vm.label == undefined ? 'Assinar' : vm.label
				vm.CLASSES = vm.classes
			},
		}
	})
	.directive('botaoExecutar', function() {
		return {
			restrict: 'E',
			template: `
				<a href="" ng-class="CLASSES" class="{{ngDisabled ? 'link-disabled' : ''}}" ng-click="executar()">
					{{LABEL}}
				</a>
			`,
			scope: {
				classes    : "@?" ,
				label      : "@?" ,
				ngDisabled : "="  ,
				options    : "="  ,
			},
			transclude: true,
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				vm.options = vm.options != undefined ? vm.options : {}

				vm.executar = function() {
					arrecModal.open('gerenciador-execucoes/execucoes/modal-executar.html', $scope, vm.options, 'sm', 'EmitirPeticaoInicialModalCtrl')
				};

				vm.LABEL   = vm.label == undefined ? 'Executar' : vm.label
				vm.CLASSES = vm.classes

			},
		}
	})
	.directive('botaoEnviarTribunal', function() {
		return {
			restrict: 'E',
			template: `
				<a href="" ng-class="CLASSES" class="{{ngDisabled ? 'link-disabled' : ''}}" ng-click="enviarTribunal({})">
					{{LABEL}}
				</a>
			`,
			scope: {
				classes    : "@?",
				label      : "@?",
				ngDisabled : "=" ,
			},
			transclude: true,
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				
				vm.enviarTribunal = function(resolve) {
					arrecModal.open('gerenciador-execucoes/execucoes/modal-envio-tribunal.html', $scope, resolve, 'sm', 'EmitirPeticaoInicialModalCtrl')
				};

				vm.LABEL   = vm.label == undefined ? 'Enviar ao tribunal' : vm.label
				vm.CLASSES = vm.classes
			},
		}
	})
	.directive('botaoProtestar', function() {
		return {
			restrict: 'E',
			template: `
				<a href="" ng-class="CLASSES" class="{{ngDisabled ? 'link-disabled' : ''}}" ng-click="protestar({})">
					{{LABEL}}
				</a>
			`,
			scope: {
				classes    : "@?" ,
				label      : "@?" ,
				ngDisabled : "="  ,
			},
			transclude: true,
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				
				vm.protestar = function(resolve) {
					arrecModal.openOld('gerenciador-protestos/protestos/modal-protestar.html', $scope, resolve, 'lg', 'protestarModalCtrl')
				};

				vm.LABEL   = vm.label == undefined ? 'Protestar' : vm.label
				vm.CLASSES = vm.classes
			},
		}
	})
	.directive('switchEnviarTribunal', function() {
		return {
			restrict: 'E',
			template: `
				<div>
					<div class="row">
						<div class="col-md-12">
							<div class="bth-switch">
								<input id="switch_executar" type="checkbox" ng-model="ngModel.executar" ng-disabled="ngDisabled">
								<label for="switch_executar">{{LABEL}}</label>
							</div>
						</div>
					</div>
					<div class="row" ng-if="ngModel.executar && !ngDisabled">
						<div class="col-md-12">
							<label class="required">Modelo do script</label>
							<select name="" id="" bf-select2="{}" ng-model="ngModel.modeloScriptExecucao" ng-required="true">
								<option value="1">Modelo 1</option>
								<option value="2">Modelo 2</option>
								<option value="3">Modelo 3</option>
								<option value="4">Modelo 4</option>
								<option value="5">Modelo 5</option>
							</select>
						</div>
					</div>
				</div>
			`,
			scope: {
				ngModel   : '=' ,
				ngDisabled: '=' ,
				label     : '@?',
			},
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				$scope.LABEL = $scope.label == undefined ? 'Enviar ao tribunal' : $scope.label

				vm.executar = function(resolve) {
					arrecModal.open('gerenciador-execucoes/execucoes/modal-executar.html', $scope, resolve, 'sm', 'EmitirPeticaoInicialModalCtrl')
				};

			},
		}
	})
	.directive('switchEnviarCartorio', function() {
		return {
			restrict: 'E',
			template: `
				<div class="row">
					<div class="col-md-12">
						<div class="bth-switch">
							<input id="switch_protestar" type="checkbox" ng-model="ngModel.protestar" ng-disabled="ngDisabled">
							<label for="switch_protestar">{{LABEL}}</label>
						</div>
					</div>
				</div>
			`,
			scope: {
				ngModel   : '=' ,
				ngDisabled: '=' ,
				label     : '@?',
			},
			replace: true,
			controller: function($scope, arrecModal) {
				var vm = $scope
				$scope.LABEL = $scope.label == undefined ? 'Enviar ao cartório' : $scope.label

				vm.executar = function(resolve) {
					arrecModal.open('gerenciador-execucoes/execucoes/modal-executar.html', $scope, resolve, 'sm', 'EmitirPeticaoInicialModalCtrl')
				};

			},
		}
	})
	.directive('switchAssinar', function() {
		return {
			restrict: 'E',
			template: `
				<div class="row">
					<div class="col-md-12">
						<div class="bth-switch">
							<input id="switch_assinar" type="checkbox" ng-model="ngModel.assinar" ng-disabled="ngDisabled">
							<label for="switch_assinar">Assinar digitalmente</label>
						</div>
					</div>
				</div>
			`,
			scope: {
				ngModel: '=',
				ngDisabled: '=',
				label: '@?',
			},
			replace: true,
			controller: function($scope) {
				$scope.LABEL = $scope.label == undefined ? 'Assinar digitalmente' : $scope.label
			},
		}
	})
	.directive('switchEmitirPeticao', function() {
		return {
			restrict: 'E',
			template: `
				<div>
					<div class="row">
						<div class="col-md-12">
							<div class="bth-switch">
								<input id="switch_emitirPeticao" type="checkbox" ng-model="ngModel.emitirPeticao" ng-disabled="ngDisabled">
								<label for="switch_emitirPeticao">{{LABEL}}</label>
							</div>
						</div>
					</div>
					<modelo-documento-form ng-model="ngModel.documento" documento="Petição" ng-if="ngModel.emitirPeticao" />
					<switch-valor-minimo ng-model="ngModel.valorMinimo" label="Valor mínimo para petição" help="Permite que a petição seja emitida somente quando a soma dos valores atingir o valor mínimo" ng-if="ngModel.emitirPeticao" />
				</div>
			`,
			scope: {
				ngModel   : '=' ,
				ngDisabled: '=' ,
				label     : '@?',
			},
			replace: true,
			controller: function($scope) {
				$scope.LABEL = $scope.label == undefined ? 'Emitir petição' : $scope.label
			},
		}
	})
	.directive('switchValorMinimo', function() {
		return {
			restrict: 'E',
			template: `
				<div>
					<div class="row">
						<div class="col-md-12">
							<div class="bth-switch">
								<input id="switch_valorMinimoPeticao" type="checkbox" ng-model="ngModel.valorMinimoPeticao">
								<label for="switch_valorMinimoPeticao">{{label}}</label>
							</div>
							<div><small class="text-muted">{{help}}</small></div>
						</div>
					</div>
					<div class="row" ng-if="ngModel.valorMinimoPeticao">
						<div class="col-md-4">
							<div class="input-group">
								<span class="input-group-addon">R$</span>
								<input type="text" class="form-control" id="valorMinimo" ng-model="ngModel.valorMinimo" bf-number placeholder="0,00">
							</div>
						</div>
					</div>
				</div>
			`,
			scope: {
				ngModel   : '=',
				ngDisabled: '=',
				label     : '@',
				help      : '@',
			},
			replace: true,
			controller: function($scope) {
				
			},
		}
	})
	.directive('modeloDocumentoForm', function() {
		return {
			restrict: 'E',
			template: `
				<div>
					<div class="row">
						<div class="col-md-{{DATA_CORRECAO ? '9' : '12'}}">
							<label class="required">Modelo da {{documento | lowercase}}</label>
							<div class="input-group">
								<select name="" id="" bf-select2="{}" ng-model="ngModel.modelo" ng-required="true">
									<option value="1">Modelo 1</option>
									<option value="2">Modelo 2</option>
									<option value="3">Modelo 3</option>
									<option value="4">Modelo 4</option>
									<option value="5">Modelo 5</option>
								</select>
								<span class="button-group-addon">
									<button type="button" class="btn btn-default" title="{{ngModel.usarTextoDocumento ? 'Remove o' : 'Adiciona um'}} texto complementar para a certidão" ng-click="ngModel.usarTextoDocumento = !ngModel.usarTextoDocumento"><i class="fa fa-fw" ng-class="ngModel.usarTextoDocumento ? 'fa-minus' : 'fa-plus'"></i> Texto</button>
								</span>
							</div>
						</div>
						<div class="col-md-3" ng-if="DATA_CORRECAO">
							<label for="">Data da correção monetária</label>
							<div class="input-group">
								<input type="text" bf-date ng-model="ngModel.dtmonetaria" class="form-control">
							</div>
						</div>
					</div>
					<div class="row" uib-collapse="!ngModel.usarTextoDocumento">
						<div class="col-md-12">
							<label for="textoDocumento">Texto complementar da {{documento | lowercase}}</label>
							<textarea id="textoDocumento" class="form-control" ng-model="ngModel.textoDocumento" rows="3"></textarea>
						</div>
					</div>
				</div>
			`,
			scope: {
				ngModel   : '=',
				documento : '@',
				correcao  : '=',
			},
			replace: true,
			controller: function($scope) {
				$scope.ngModel = {
					dtmonetaria: moment().format('YYYY-MM-DD')
				}
				$scope.DATA_CORRECAO = $scope.correcao != true ? false : true
			},
		}
	})
	.controller('dividasAtivasCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'arrecModal', 'ENUMS', 'certidoesService', 'peticoesService', '$filter', '$timeout', 'storage', 'lancamentosService', 'db', 'promiseTracker', 'dividasFiltrosService',
		function($scope, ModalCad, arrecModal, ENUMS, certidoesService, peticoesService, $filter, $timeout, storage, lancamentosService, db, promiseTracker, dividasFiltrosService) {
			var vm = $scope;

			var today = new Date();
			vm.anoAtual = today.getFullYear()
			vm.agruparDiv = storage.check('agruparDividas', 'credito');

			var execucoes = lancamentosService.execucoes
			var protestos = lancamentosService.protestos

			vm.tiposDocumentos = [
				{ key: 'INSC_DIVIDA'    , desc: 'Inscrição em dívida', usado: false },
				{ key: 'CDA'            , desc: 'CDA'                , usado: false },
				{ key: 'PETICAO_INICIAL', desc: 'Petição inicial'    , usado: false },
				{ key: 'EXECUCAO_FISCAL', desc: 'Execução fiscal'    , usado: false },
			]

			vm.dividasObj = {
				filtro: {
					adicionar: function() {
						this.tiposDocumentos_USADOS.push({})
						if(this.tiposDocumentos_USADOS.length == vm.tiposDocumentos.length) {
							this.tiposDocumentos_USADOS[this.tiposDocumentos_USADOS.length-1].tipoDoc = this.tiposDocumentos_DISPONIVEIS[0].key
						}
					},
					adicionarUsado: function(tipoDoc) {
						vm.tiposDocumentos.find(tipo => tipo.key == tipoDoc).usado = true
						tipoDoc = this.tiposDocumentos_DISPONIVEIS.find(doc => doc.key == tipoDoc)
						const INDEX = this.tiposDocumentos_DISPONIVEIS.indexOf(tipoDoc)
						this.tiposDocumentos_DISPONIVEIS.splice(INDEX, 1)
					},
					adicionarDisponivel: function(tipoDoc) {
						vm.tiposDocumentos.find(tipo => tipo.key == tipoDoc).usado = false
						tipoDoc = this.tiposDocumentos_USADOS.find(doc => doc.tipoDoc == tipoDoc)
						const INDEX = this.tiposDocumentos_USADOS.indexOf(this.tiposDocumentos_USADOS.find(doc => doc.tipoDoc == tipoDoc.key))
						this.tiposDocumentos_DISPONIVEIS.push(tipoDoc)
						this.tiposDocumentos_USADOS.splice(INDEX, 1)
						if(!this.tiposDocumentos_USADOS.length)  {
							this.tiposDocumentos_USADOS.push({})
						}
					},
					excluir: function(tipoDoc) {
						if(this.tiposDocumentos_USADOS.length > 1) {
							this.adicionarDisponivel(tipoDoc)
						} else {
							this.tiposDocumentos_USADOS[0].tipoDoc = null
						}
					},
					verificarUso: function(tipoDoc, usar) {
						console.log(tipoDoc, usar);
	
					},
					tiposDocumentos_DISPONIVEIS: angular.copy(vm.tiposDocumentos),
					tiposDocumentos_USADOS: [
						{}
					],
					versao: 'ATUAL',
					filtrando: false,
					filtrado: [],
					filtrar: function() {
						this.filtrando = true
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
						this.filtrando = true
					},
				}

			}

			vm.filtrosSalvos = dividasFiltrosService.filtrosSalvos
		
			vm.situacaoParcelas = ENUMS.SITUACAO_PARCELAS
			vm.dividas          = lancamentosService.dividas
			vm.certidoes        = certidoesService.certidoes
			vm.peticoes         = peticoesService.peticoes

			vm.protestos = [
				{ contrib: 'Ramon Vieira Viquetti'     , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12341', valor: 9567.53 , certidoes: '5', certidao: { numero: 3210, data:  0 }, assinado: false, notific: false },
				{ contrib: 'João da Silva Camargo'     , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12342', valor: 3702.94 , certidoes: '5', certidao: { numero: 3210, data: -1 }, assinado: false, notific: false },
				{ contrib: 'Júnior Garcia'             , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12343', valor: 1600.13 , certidoes: '5', certidao: { numero: 3210, data: -2 }, assinado: false, notific: false },
				{ contrib: 'Fausto Silva'              , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12344', valor: 8836.99 , certidoes: '5', certidao: { numero: 3210, data: -3 }, assinado: false, notific: false },
				{ contrib: 'Vitor Augusto de Souza'    , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12345', valor: 2207.8  , certidoes: '5', certidao: { numero: 3210, data: -4 }, assinado: true , notific: true  },
				{ contrib: 'Ricardo Darós de Oliveira' , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12346', valor: 8410.86 , certidoes: '5', certidao: { numero: 3210, data: -5 }, assinado: false, notific: false },
				{ contrib: 'Ribamar Jr.'               , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12347', valor: 1093.34 , certidoes: '5', certidao: { numero: 3210, data: -6 }, assinado: true , notific: true  },
				{ contrib: 'Alexandro Dias de Jesus'   , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12348', valor: 6420.63 , certidoes: '5', certidao: { numero: 3210, data: -7 }, assinado: false, notific: false },
				{ contrib: 'Rosimere Anastásio'        , dataProtesto: '20/11/2017', referente: 'Imóvel 1', statusProtesto: 'Ativo', numero: '12349', valor: 7455.35 , certidoes: '5', certidao: { numero: 3210, data: -8 }, assinado: false, notific: false }
			];

			vm.protestos.forEach(certidao => {
				certidao.certidao.data = $filter('arrecFormatDate')(certidao.certidao.data)
				certidao.ano = $filter('arrecAno')(certidao.certidao.data)
			});
			
			vm.filtraDivida = 'Sem certidão';
			
			vm.setFiltrarDivida = function(filtro) {
				vm.filtraDivida = filtro;

				if(vm.agruparDiv == 'contribuinte') {
					min = Math.ceil(1);
					max = Math.floor(20);

					vm.contribuintes.forEach(contribuinte => {
						contribuinte.calculando = false
						contribuinte.groupOpen = false
						contribuinte.qtd = Math.floor(Math.random() * (max - min)) + min;
					});
				}				
			}

			vm.verContribuinte = function(resolve) {
				resolve.isEditing = true;
				resolve.tipoSelecionado = 'Pessoa física'
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/contribuintes-modal.html', resolve);
			};

			vm.emitirCertidao = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas/certidoes/modal-emitir-certidao.html", resolve);
			};
			vm.cancelarCertidao = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas/certidoes/modal-cancela-certidao.html", resolve);
			};

			vm.consultaDividas = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas/dividas/modal-consulta-dividas.html", resolve);
			};

			vm.consultaCertidoes = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas/certidoes/modal-consulta-certidao.html", resolve);
			};

			vm.protestar = function(resolve) {
				ModalCad.open({
					templateUrl: "gerenciador-protestos/protestos/modal-protestar.html",
					controller: 'protestarModalCtrl as protestarModalCtrl',
					scope: $scope,
					resolve: resolve
				});
			};
			vm.cancelaProtesto = function(resolve) {
				abrirPopup("gerenciador-protestos/protestos/modal-cancela-protesto.html", resolve);
			};
			
			vm.executar = function(resolve) {
				abrirPopup("gerenciador-execucoes/execucoes/modal-executar.html", resolve);
			};
			vm.cancelaExecucao = function(resolve) {
				abrirPopup("gerenciador-execucoes/execucoes/modal-cancela-execucao.html", resolve);
			};
			
			vm.assinar = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas//modal-assinar.html", resolve);
			};

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'dividasAtivasModalCtrl as dividasAtivasModalCtrl',
					scope: $scope,
					resolve: resolve
				});
			}

			vm.creditos = [
				{descricao: 'IPTU'},
				{descricao: 'Auto de infração'},
				{descricao: 'Contribuição de melhoria'},
				{descricao: 'ISS'},
				{descricao: 'ISSQN'},
				{descricao: 'ITBI'}
			];

			vm.valoresPadraoSistema = [1000, 10000, 20000]
			
			vm.valores = storage.check('agrupadorValor', vm.valoresPadraoSistema);

			function setValoresDescription(valores) {
				var VALORES = []
				valores.forEach((val, index) => {
					var VALOR = $filter('currency')(val)
					var DESC =	index == 0 ? 'Até ' + VALOR : 'De ' + $filter('currency')(vm.valores[index-1] + 0.01) + ' até ' + VALOR
				
					VALORES.push({descricao: DESC})
					if(index == valores.length-1) {
						VALORES.push({descricao: 'Acima de ' + VALOR})
					}
				})

				return VALORES
			}

			vm.valoresDescription = setValoresDescription(vm.valores)

			vm.anos=[];

			for (let i = 0; i < 6; i++) {
				vm.anos.push({descricao:vm.anoAtual-i})
			}

			vm.meses=[
				{descricao:'Janeiro'},
				{descricao:'Fevereiro'},
				{descricao:'Março'},
				{descricao:'Abril'},
				{descricao:'Maio'},
				{descricao:'Junho'},
				{descricao:'Julho'},
				{descricao:'Agosto'},
				{descricao:'Setembro'},
				{descricao:'Outubro'},
				{descricao:'Novembro'},
				{descricao:'Dezembro'}
			];

			vm.contribuintes = [
				{ descricao: 'Ramon Vieira Viquetti'      , qtd: 19},
				{ descricao: 'João da Silva Camargo'      , qtd: 12},
				{ descricao: 'Júnior Garcia'              , qtd: 20},
				{ descricao: 'Fausto Silva'               , qtd: 1},
				{ descricao: 'Vitor Augusto de Souza'     , qtd: 10},
				{ descricao: 'Ricardo Darós de Oliveira'  , qtd: 16},
				{ descricao: 'Ribamar Jr.'                , qtd: 13},
				{ descricao: 'Alexandro Dias de Jesus'    , qtd: 1},
				{ descricao: 'Rosimere Anastásio'         , qtd: 4}
			];
			vm.anos = [
				{ descricao: 2022},
				{ descricao: 2021},
				{ descricao: 2020},
				{ descricao: 2019},
				{ descricao: 2018},
				{ descricao: 2017},
			]
			
			vm.filtraDivida = 'Sem certidão';

			vm.loadingAgrupador = promiseTracker();
			
			vm.agruparDivPor = function(groupDiv) {
				vm.loadingAgrupador.addPromise($timeout(function(){}, 2000));

				vm.agruparDiv = groupDiv;
				storage.set('agruparDividas', groupDiv);
				if (groupDiv == 'credito') {
					vm.itens = vm.creditos;
					vm.subItens = vm.valoresDescription;
				} else if (groupDiv == 'valor') {
					vm.itens = vm.valoresDescription;
					vm.subItens = vm.creditos;
				} else if(groupDiv == 'contribuinte') {
					vm.itens = vm.contribuintes;
					vm.subItens = vm.anos;
				} else if(groupDiv == 'creditoAno') {
					vm.itens = vm.creditos;
					vm.subItens = vm.anos;
				}
			}

			vm.agruparDivPor(vm.agruparDiv)

			vm.configAgrupadorValor = function() {
				arrecModal.open('gerenciador-dividas/dividas-ativas/configurar-valores-modal.html', $scope, {valores:vm.valores}, '', 'configAgrupadorValorModalCtrl')
			}

			vm.setConfigAgrupadorValor = function(faixas) {
				vm.valores = faixas
				vm.valoresDescription = setValoresDescription(faixas)
				storage.setJson('agrupadorValor', faixas);
				vm.agruparDivPor(vm.agruparDiv)
			}
		}
	])
	.controller('dividasAtivasModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', '$modalInstance',
		function($scope, ModalCad, params, $modalInstance) {
			var vm = $scope;

			vm.registro = params.registro

			vm.cols = [
				{
					name: 'codigo',
					label: 'Cód. Dívida',
					width: "12%",
					active: true
				},
			{
					name: 'credito',
					label: 'Crédito',
					width: "auto",
					active: true
				},
				{
					name: 'referente',
					label: 'Referente',
					width: "11%",
					active: true
				},
				{
					name: 'ano',
					label: 'Ano',
					width: "7%",
					active: true
				},
				{
					name: 'numDocumento',
					label: 'Nº documento',
					width: "15%",
					active: true
				},

				{
					name: 'valor',
					label: 'Valor (R$)',
					width: "13%",
					active: true
				},
				{
					name: 'parcela',
					label: 'Parcela',
					width: "10%",
					active: true
				},
				{
					name: 'situacao',
					label: 'Situação',
					width: "14%",
					active: true
				},
			];
			
			vm.dividas = [
				{ id: 1  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 940, valor: 715, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 2  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 989, valor: 535, parcela: 2, receita: 'Coleta de lixo', check: true  },
				{ id: 3  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 958, valor: 152, parcela: 1, receita: 'Coleta de lixo', check: true  },
				{ id: 4  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 427, valor: 269, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 5  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 185, valor: 167, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 6  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 505, valor: 805, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 7  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 263, valor: 251, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 8  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 918, valor: 257, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 9  , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 314, valor: 784, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 10 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 393, valor: 912, parcela: 3, receita: 'Coleta de lixo', check: false },
				{ id: 11 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 522, valor: 878, parcela: 4, receita: 'Coleta de lixo', check: false },
				{ id: 12 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 924, valor: 64 , parcela: 8, receita: 'Coleta de lixo', check: false },
				{ id: 13 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 571, valor: 139, parcela: 9, receita: 'Coleta de lixo', check: false },
				{ id: 14 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 223, valor: 659, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 15 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 155, valor: 110, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 16 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 768, valor: 306, parcela: 1, receita: 'Coleta de lixo', check: false },
				{ id: 17 , credito: 'IPTU', ano: 2016, ref: 10010, numDoc: 157, valor: 495, parcela: 1, receita: 'Coleta de lixo', check: false },
			];

			vm.certidao = {
				alterado: false,
				dividasAdicionadasOriginal: {}
			}

			vm.verificaDividas = function() {
				vm.dividasDisponiveis = []
				vm.dividasAdicionadas = []
				
				var valorTotalDisponiveis = 0
				var valorTotalAdicionadas = 0

				vm.dividas.forEach(divida => {
					if(divida.check) {// Dívidas adicionadas
						vm.dividasAdicionadas.push(divida)
						valorTotalAdicionadas += divida.valor

					} else {// Dívidas disponíveis
						vm.dividasDisponiveis.push(divida)
						valorTotalDisponiveis += divida.valor
					}
				})

				// Dados da certidão
				vm.certidao.valorTotal = valorTotalAdicionadas
				
				// Se foi ou não alterada
				if (vm.certidao.dividasAdicionadasOriginal.valorTotal != undefined) {
					if (vm.certidao.valorTotal != vm.certidao.dividasAdicionadasOriginal.valorTotal) {
						vm.certidao.alterado = true
					} else {
						vm.certidao.alterado = false
					}
				} else {
					vm.certidao.alterado = false
				}
			}

			vm.verificaDividas()

			// Certidão Original
			vm.certidao.dividasAdicionadasOriginal.dividas    = angular.copy(vm.dividasAdicionadas )
			vm.certidao.dividasAdicionadasOriginal.valorTotal = angular.copy(vm.certidao.valorTotal)

			vm.excluirDivida = function(divida) {
				vm.dividas.forEach(div => {
					if(div.id === divida.id) {
						div.check = false
					}
				})
				vm.verificaDividas()
			}

			vm.adicionarDividas = function(dividasDisponiveis) {
				dividasDisponiveis.forEach(dividaDisponivel => {
					if (dividaDisponivel.check) {
						vm.dividas.forEach(divida => {
							if (dividaDisponivel.id === divida.id) {
								divida.check = true
							}
						})
					}
				})
				vm.verificaDividas()
			}

			vm.addDivida = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-dividas/dividas-ativas/certidoes/adicionar-divida-cda-modal.html',
					controller: 'adicionarDividasModalCtrl as adicionarDividasModalCtrl',
					scope: $scope,
					resolve: resolve
				});
			}

			vm.salvar = function() {
				$modalInstance.close()
			}
			
			vm.addEndereco = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/endereco/endereco-modal.html', 
					controller: 'PessoasModalCtrl as PessoasModalCtrl',
					scope: $scope,
					resolve: resolve
				});
			};
		}
	])
	.controller('adicionarDividasModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params',
		function($scope, ModalCad, params) {
			var vm = $scope

			vm.checkAll = false
			vm.hasDiff = false

			vm.dividasDisponiveis = $scope.$parent.dividasDisponiveis

			vm.setCheckAll = function(val){
				vm.hasDiff = val
				vm.dividasDisponiveis.map((r) => {
					return r.check = val
				})
			}
			
			vm.checkDiff = function(val){
				vm.hasDiff = false

				vm.dividasDisponiveis.map((r) => {
					r.check ? vm.hasDiff = true : null
				})
			}
		}
	])
	.controller('historicoCertidaoModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', '$modalInstance',
		function($scope, ModalCad, $modalInstance) {
			var vm = $scope
			vm.cda = $modalInstance.params.cda
			// vm.alteracoes = params.registro.alteracoes

			vm.abrirHistoricoCertidaoDetalhes = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-dividas/dividas-ativas/certidoes/historico-detalhes-modal.html',
					controller: 'historicoCertidaoDetalhesModalCtrl as historicoCertidaoDetalhesModalCtrl',
					scope: $scope,
					resolve: resolve
				});
			};

			vm.historico = [
				{ tipo:'Edição', data: 0, color: '', icon:'fa-pencil', alteracoes: [
					{ campo: 'Modelo de certidão', antes: 'Modelo 1'   , depois: 'Modelo 2'   },
					{ campo: 'Dívidas' , campos: [
						{ campo: 'Dívidas', lista: [
							{ "item": 13, "action": false },
							{ "item": 12, "action": false },
							{ "item": 87, "action": true  },
							{ "item": 22, "action": true  },
							{ "item": 56, "action": true  }
						] },
						{ campo: 'Valor total'     , antes: 5183.55     , depois: 954.80 },
					]}
				]},
				{ tipo:'Assinado digitalmente', data: -3, color: 'bth-timeline__item-green',	icon:'fa-check-circle-o'},
				{ tipo:'Edição', data: -1, color: '', icon:'fa-pencil', alteracoes: [
					{ campo: 'Modelo de certidão' , antes: 'Modelo 1'   , depois: 'Modelo 2'   },
					{ campo: 'Data da correção monetária' , antes: '01/01/2020' , depois: '01/01/2021' },
					{ campo: 'Endereço' , campos: [
						{ campo: 'Rua'       , antes: 'Rua Araranguá' , depois: 'Rua João Pessoa' },
						{ campo: 'CEP'       , antes: '88807-244'     , depois: '88808-000'       },
						{ campo: 'Município' , antes: 'Araranguá'     , depois: 'Criciúma'        },
						{ campo: 'Número'    , antes: '837'           , depois: '134'             },
						{ campo: 'Bairro'    , antes: 'Trindade'      , depois: 'Centro'          },
					]},
				]},
				{ tipo:'Edição', data: -2, color: '', icon:'fa-pencil', alteracoes: [
					{ campo: 'Modelo de certidão'             , antes: 'Modelo 2'   , depois: 'Modelo 3'           },
					{ campo: 'Data da correção monetária'     , antes: '15/06/2021' , depois: '15/09/2021'         },
					{ campo: 'Texto complementar da certidão' , antes: null         , depois: 'Texto complementar' },
					{ campo: 'Assinado digitalmente'          , antes: 'Não'        , depois: 'Sim'                },
					{ campo: 'Endereço' , campos: [
						{ campo: 'Rua'       , antes: 'Rua Araranguá' , depois: 'Rua João Pessoa' },
						{ campo: 'CEP'       , antes: '88807-244'     , depois: '88808-000'       },
						{ campo: 'Município' , antes: 'Araranguá'     , depois: 'Criciúma'        },
						{ campo: 'Número'    , antes: '837'           , depois: '134'             },
						{ campo: 'Bairro'    , antes: 'Trindade'      , depois: 'Centro'          },
					]},
					{ campo: 'Dívidas' , campos: [
						{ campo: 'Dívidas'   ,
							lista: [
								{ "item": 12 , "action": false },
								{ "item": 87 , "action": false },
								{ "item": 11 , "action": false },
								{ "item": 6  , "action": false },
								{ "item": 12 , "action": false },
								{ "item": 66 , "action": true  },
								{ "item": 53 , "action": true  },
								{ "item": 738, "action": true  },
								{ "item": 22 , "action": true  }
							],
						},
						{ campo: 'Valor total'     , antes: 684.54     , depois: 1721.30 },
					]}
				]},
				{ tipo:'Criado', data: -3, color: 'bth-timeline__item-green',	icon:'fa-plus'}
			]

			vm.historico.map(item => {
				item.data = moment().add(item.data, 'day').format('YYYY-MM-DD')
			})
		}
	])
	.controller('historicoCertidaoDetalhesModalCtrl', ['$scope', 'params',
		function($scope, params) {
			var vm = $scope
			vm.alteracoes = params.alteracoes
		}
	])
	.controller('configAgrupadorValorModalCtrl', ['$scope', 'arrecModal', '$modalInstance', 'faixaValoresService',
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
				vm.$parent.agruparDivPor(faixas)

				$modalInstance.close()
			}
		}
	])
})();