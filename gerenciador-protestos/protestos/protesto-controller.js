(function () {

	angular.module('app').controller('ProtestoCtrl', ProtestoCtrl);

	ProtestoCtrl.$inject = ['$scope', '$state', 'arrecadacao.common.ModalCad', 'ENUMS'];

	function ProtestoCtrl($scope, $state, ModalCad, ENUMS) {

		var vm = $scope;

		vm.intervaloDocumentos = 'NAO'
		vm.exemploIntervaloAno = new Date().getFullYear()-2 + '-' + new Date().getFullYear()

		vm.protestos = [
			{ numProt: '0123', data: -4  , certidao: { numero: 8256, data: -76 }, numGuia: 2047, contribuinte: 9  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 1151 , situacao: 'Aguardando distribuição' , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
			{ numProt: '0123', data: -90 , certidao: { numero: 1258, data: -14 }, numGuia: 6469, contribuinte: 14 , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 373  , situacao: 'Distribuída'             , assinatura: null                                 },
			{ numProt: '0123', data: -7  , certidao: { numero: 8782, data: -18 }, numGuia: 5929, contribuinte: 7  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 1356 , situacao: 'Protesto'                , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
			{ numProt: '0123', data: -95 , certidao: { numero: 7631, data: -19 }, numGuia: null, contribuinte: 1  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 1419 , situacao: 'Movimentação'            , assinatura: { data: 1, user: 1, tipo: 'P7S' }    },
			{ numProt: '0123', data: -54 , certidao: { numero: 146 , data: -43 }, numGuia: null, contribuinte: 1  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 1062 , situacao: 'Protestada'              , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
			{ numProt: '0123', data: -53 , certidao: { numero: 2163, data: -71 }, numGuia: null, contribuinte: 3  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 1052 , situacao: 'Paga'                    , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
			{ numProt: '0123', data: -61 , certidao: { numero: 7971, data: -56 }, numGuia: null, contribuinte: 7  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 724  , situacao: 'Pagamento pendente'      , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
			{ numProt: '0123', data: -70 , certidao: { numero: 7801, data: -64 }, numGuia: 5256, contribuinte: 7  , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 1434 , situacao: 'Retirada'                , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
			{ numProt: '0123', data: -12 , certidao: { numero: 3689, data: -94 }, numGuia: 3838, contribuinte: 16 , cartorio: null, cpfContribuinte: '000.000.000-00', totalProtestado: 626  , situacao: 'Negociação'              , assinatura: { data: 1, user: 1, tipo: 'NORMAL' } },
		]

		vm.protestos.forEach(protesto => {
			protesto.assinado = protesto.assinatura != null ? true : false
		})

		vm.openProtesto = function () {
			$state.go('main.gerenciadorProtestos.protesto-ficha');
		}

		vm.cancelaProtesto = function (resolve) {
			abrirPopup("gerenciador-protestos/protestos/modal-cancela-protesto.html", resolve);
		};

		vm.assinar = function (resolve) {
			abrirPopup("gerenciador-dividas/dividas-ativas//modal-assinar.html", resolve);
		};

		vm.cda = [
			{
				credito: 'ISS',
				dtEmissao: '12/12/2012',
				valor: '1.000,00',
				registrosAno: [
					{
						ano: '2016',
						registros: [
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Parcelada',
								protestada: ''
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Paga',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: ''
							}
						]
					}, {
						ano: '2017',
						registros: [
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Parcelada',
								protestada: ''
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Paga',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: ''
							}
						]
					}
				]
			},
			{
				credito: 'IPTU',
				dtEmissao: '12/12/2012',
				valor: '1.000,00',
				registrosAno: [
					{
						ano: '2016',
						registros: [
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Parcelada',
								protestada: ''
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Paga',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: ''
							}
						]
					}, {
						ano: '2017',
						registros: [
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Parcelada',
								protestada: ''
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Paga',
								protestada: 'true'
							},
							{
								codigo: 'IPTU',
								ref: 10010,
								ano: 2016,
								dtInscricao: '01/09/2016',
								numInscricao: 500,
								parcela: 1,
								dtVencimento: '01/09/2016',
								valor: '500,00',
								situacao: 'Aberta',
								protestada: ''
							}
						]
					}
				]
			},
		];

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'modalCtrl as modalCtrl',
				scope: $scope,
				resolve: resolve
			});
		}

		/************** Documentação */
		{
			vm.documentos = ENUMS.DOCUMENTOS;
			vm.tipoDocumentos = ENUMS.TIPODOCUMENTOS;
			vm.documentosProtestos = vm.tipoDocumentos.find(tipo => tipo.tipo == 'Protestos')
			vm.doctSelect = vm.documentosProtestos.itens[0].id

			vm.setDoc = function (id) {
				vm.doctSelect = id
			}
		}
	}

	//controller da modal
	angular.module('app').controller('protestarModalCtrl', modalCtrl);

	modalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function modalCtrl($scope, ModalCad, params) {
		var vm = $scope;

		vm.registro = {
			assinarTodos: true,
			assinarNaoAssinados: false,
			modeloProtesto: 1
		}
	}

})();