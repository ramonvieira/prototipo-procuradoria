(function() {

	angular.module('app').controller('GerenciadorProtestosCtrl', GerenciadorProtestosCtrl);

	GerenciadorProtestosCtrl.$inject = ['$scope', '$state', 'arrecadacao.common.ModalCad', '$timeout'];

	function GerenciadorProtestosCtrl($scope, $state, ModalCad, $timeout) {

		var vm = $scope;
		
		vm.openProtesto = function(){
			/* $state.go('main.core.cadastros-core.gerenciador-dividas'); */
		}

		vm.cancelaProtesto = function(resolve) {
			/* abrirPopup("gerenciador-protestos/protestos/modal-cancela-protesto.html", resolve); */
		};

		vm.assinar = function(resolve) {
			abrirPopup("gerenciador-dividas/dividas-ativas//modal-assinar.html", resolve);
		};

		vm.protSemMovimentoView = vm.storageSet('protSemMovimentoView', '1');
		
		vm.trocaProtSemMovimentoView = function(resolve) {
			vm.protSemMovimentoView = vm.storageSet('protSemMovimentoView', null, resolve);
		};

		vm.cadastros = [
			{ descricao: 'Visão geral'          , sref: 'main.gerenciadorProtestos.visaogeral-protestos' , icon: 'fa-pie-chart'     },
			{ descricao: 'Protestos'            , sref: 'main.gerenciadorProtestos.protestos'            , icon: 'fa-balance-scale' },
			{ descricao: 'Quitadas'             , sref: 'main.gerenciadorProtestos.protestos-quitados'   , icon: 'fa-check'         },
			{ descricao: 'Canceladas'           , sref: 'main.gerenciadorProtestos.protestos-cancelados' , icon: 'fa-ban'           },
			{ descricao: 'Parceladas/Suspensas' , sref: 'main.gerenciadorProtestos.protestos-parcelados' , icon: 'fa-calendar'      },
		]

		vm.setTabProt = function() {
			$timeout(() => {
				vm.tabProtActive = $state.current.url
			}, 50);
		}

		vm.setTabProt()

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'modalCtrl as modalCtrl',
				scope: $scope,
				resolve: resolve
			});
		}
		
		vm.config_meses = [
			{ label: "Jan" },
			{ label: "Fev" },
			{ label: "Mar" },
			{ label: "Abr" },
			{ label: "Mai" },
			{ label: "Jun" },
			{ label: "Jul" },
			{ label: "Ago" },
			{ label: "Set" },
			{ label: "Out" },
			{ label: "Nov" },
			{ label: "Dez" }
		];

		vm.empresasDividas = [
			{ nome: 'Laticínios LTDA',						valor: '190.119,23'},
			{ nome: 'Cerâmica Giazzi',						valor: '167.456,11'},
			{ nome: 'Construtora Itapema',					valor: '141.432,50'},
			{ nome: 'Imobiliária Iguaçu',					valor: '122.115,07'},
			{ nome: 'Padaria Germano',						valor: '106.111,23'},
			{ nome: 'Centro de Educação em Línguas',		valor: '45.567,13'},
			{ nome: 'Tapeçaria Flamengo',					valor: '40.000,12'},
			{ nome: 'Estética Eliane',						valor: '33.020,07'},
			{ nome: 'Construtora Souza',					valor: '25.110,00'},
			{ nome: 'Sapataria Alicerce',					valor: '20.890,99'},
		],

		vm.empresasProtestos = [
			{ nome: 'Imobiliária Iguaçu',					valor: '122.115,07'},
			{ nome: 'Cerâmica Giazzi',						valor: '167.456,11'},
			{ nome: 'Construtora Souza',					valor: '25.110,00'},
			{ nome: 'Sapataria Alicerce',					valor: '20.890,99'},
			{ nome: 'Construtora Itapema',					valor: '141.432,50'},
			{ nome: 'Padaria Germano',						valor: '106.111,23'},
			{ nome: 'Laticínios LTDA',						valor: '190.119,23'},
			{ nome: 'Estética Eliane',						valor: '33.020,07'},
			{ nome: 'Centro de Educação em Línguas',		valor: '45.567,13'},
			{ nome: 'Tapeçaria Flamengo',					valor: '40.000,12'},
		]

		vm.receitas = [
			{descricao: 'Descrição receita 1',				valor: '122.115,07',	quantidade: '82'},
			{descricao: 'Descrição receita 2',				valor: '167.456,11',	quantidade: '25'},
			{descricao: 'Descrição receita 3',				valor: '25.110,00',		quantidade: '59'},
			{descricao: 'Descrição receita 4',				valor: '20.890,99',		quantidade: '2'},
			{descricao: 'Descrição receita 5',				valor: '141.432,50',	quantidade: '385'},
			{descricao: 'Descrição receita 6',				valor: '106.111,23',	quantidade: '152'},
			{descricao: 'Descrição receita 7',				valor: '190.119,23',	quantidade: '4'},
			{descricao: 'Descrição receita 8',				valor: '33.020,07',		quantidade: '476'},
			{descricao: 'Descrição receita 9',				valor: '45.567,13',		quantidade: '232'},
		]

		vm.faixaValor = [
			{descricao: 'Até R$ 1.000,00',					valor: '122.115,07',	quantidade: '82'},
			{descricao: 'De R$ 1.000,01 a R$ 10.000,00',	valor: '167.456,11',	quantidade: '25'},
			{descricao: 'De R$ 10.000,01 a R$ 20.000,00',	valor: '25.110,00',		quantidade: '59'},
			{descricao: 'Acima de R$ 20.000,00',			valor: '20.890,99',		quantidade: '2'},
		]

		vm.semMovimentacoes = {
			chart: {
				formatnumberscale: "0",
				numberSuffix: "mil",
				paletteColors: "#568FD2",
				theme: "ocean",

				showvalues: "0",
				bgColor: "#FFFFFF",
				showBorder: "0",
				baseFontSize: "13",
				use3DLighting: "0",
				showShadow: "0",
				startingAngle: "0",

				showTooltip: "1",
				toolTipColor: "#222222",
				toolTipBgColor: "#FFFFFF",
				toolTipPadding: "5",
				toolTipBorderRadius: "3",
				toolTipBorderThickness: "1",
				toolTipBorderColor: "#E1E3E6",
				showToolTipShadow: "1",
				toolTipBgAlpha: "100",

				showLegend: "0",
			},
			categories: [{
				category: [
					{ label: "6 meses" },
					{ label: "1 ano" },
					{ label: "3 anos" },
					{ label: "5 anos ou mais" }
				]
			}],
			dataset: [
				{ seriesname: "Protestos", data: [
					{ value: "120" },
					{ value: "130" },
					{ value: "30" },
					{ value: "10" }
				]}
			],
		}

		vm.possibilidadPrescrAno = {
			chart: {
				formatnumberscale: "0",
				numberSuffix: "mil",
				paletteColors: "#EFBC3C,#D64038,#C0C0C0,#3475C1,#48B1D3,#54A668,#EA863E,#A46AB5,#CB528E",
				theme: "ocean",

				showvalues: "0",
				bgColor: "#FFFFFF",
				showBorder: "0",
				baseFontSize: "13",
				use3DLighting: "0",
				showShadow: "0",
				startingAngle: "0",

				showTooltip: "1",
				toolTipColor: "#222222",
				toolTipBgColor: "#FFFFFF",
				toolTipPadding: "5",
				toolTipBorderRadius: "3",
				toolTipBorderThickness: "1",
				toolTipBorderColor: "#E1E3E6",
				showToolTipShadow: "1",
				toolTipBgAlpha: "100",
			},

			categories: [{
				category: [
					{ label: "2018"},
					{ label: "2019"},
					{ label: "2020"},
					{ label: "2021"}
				]
			}],
			dataset: [
				{ seriesname: "Dívida", data: [
					{ value: "125"},
					{ value: "300"},
					{ value: "480"},
					{ value: "80"}
				]}
			]
		}

		vm.possibilidadPrescrMes = {
			chart: {
				formatnumberscale: "0",
				numberSuffix: "mil",
				paletteColors: "#EFBC3C",
				theme: "ocean",
				showLegend: "0",

				showvalues:"0",
				bgColor:"#FFFFFF",
				showBorder: "0",
				baseFontSize: "13",
				use3DLighting: "0",
				showShadow: "0",
				startingAngle: "0",

				showTooltip: "1",
				toolTipColor: "#222222",
				toolTipBgColor: "#FFFFFF",
				toolTipPadding: "5",
				toolTipBorderRadius: "3",
				toolTipBorderThickness: "1",
				toolTipBorderColor: "#E1E3E6",
				showToolTipShadow: "1",
				toolTipBgAlpha: "100",
			},

			categories: [{
				category: [
					{ label: "Jan" },
					{ label: "Fev" },
					{ label: "Mar" },
					{ label: "Abr" },
					{ label: "Mai" },
					{ label: "Jun" },
					{ label: "Jul" },
					{ label: "Ago" },
					{ label: "Set" },
					{ label: "Out" },
					{ label: "Nov" },
					{ label: "Dez" }
				]
			}],

			dataset: [{
				seriesname: "Dívida",
				data: [
					{ label: "Jan", value: "125" },
					{ label: "Fev", value: "300" },
					{ label: "Mar", value: "300" },
					{ label: "Abr", value: "480" },
					{ label: "Mai", value: "480" },
					{ label: "Jun", value: "80" },
					{ label: "Jul", value: "125" },
					{ label: "Ago", value: "300" },
					{ label: "Set", value: "300" },
					{ label: "Out", value: "480" },
					{ label: "Nov", value: "480" },
					{ label: "Dez", value: "80 "}
				]
			}]
		}
	}

	//controller da modal
	angular.module('app').controller('modalCtrl', modalCtrl);

	modalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function modalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.filtraDivida = params.filtraDivida;
		vm.agruparDiv = params.agruparDiv;
		vm.descricao = params.descricao;
		vm.consult = params.consult;
		vm.certidao = params.certidao;
		vm.execucao = params.execucao;
	}

})();