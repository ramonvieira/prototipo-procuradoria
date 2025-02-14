(function() {

	angular.module('app').controller('GerenciadorDividasCtrl', GerenciadorDividasCtrl);

	GerenciadorDividasCtrl.$inject = ['$scope', '$state', 'arrecadacao.common.ModalCad'];

	function GerenciadorDividasCtrl($scope, $state, ModalCad) {

		var vm = $scope;

		vm.assinar = function(resolve) {
			abrirPopup("gerenciador-dividas/dividas-ativas//modal-assinar.html", resolve);
		};

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'modalCtrl as modalCtrl',
				scope: $scope,
				resolve: resolve
			});
		}

		var config_meses = [
			{
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
			}
		];

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

		vm.creditos = [
			{ descricao: 'Descrição do crédito 1',			valor: '122.115,07',	quantidade: '82'},
			{ descricao: 'Descrição do crédito 2',			valor: '167.456,11',	quantidade: '25'},
			{ descricao: 'Descrição do crédito 3',			valor: '25.110,00',		quantidade: '59'},
			{ descricao: 'Descrição do crédito 4',			valor: '20.890,99',		quantidade: '2'},
			{ descricao: 'Descrição do crédito 5',			valor: '141.432,50',	quantidade: '385'},
			{ descricao: 'Descrição do crédito 6',			valor: '106.111,23',	quantidade: '152'},
			{ descricao: 'Descrição do crédito 7',			valor: '190.119,23',	quantidade: '4'},
			{ descricao: 'Descrição do crédito 8',			valor: '33.020,07',		quantidade: '476'},
			{ descricao: 'Descrição do crédito 9',			valor: '45.567,13',		quantidade: '232'},
		]

		vm.faixaValor = [
			{ descricao: 'Até R$ 1.000,00',					valor: '122.115,07',	quantidade: '82'},
			{ descricao: 'De R$ 1.000,01 a R$ 10.000,00',	valor: '167.456,11',	quantidade: '25'},
			{ descricao: 'De R$ 10.000,01 a R$ 20.000,00',	valor: '25.110,00',		quantidade: '59'},
			{ descricao: 'Acima de R$ 20.000,00',			valor: '20.890,99',		quantidade: '2'},
		]

		vm.dividasRecup = {
			chart: {
				numberPrefix: "R$",
				numberScaleUnit: "mil,mi",
				paletteColors: "#D64038,#C0C0C0,#3475C1,#EFBC3C,#48B1D3,#54A668,#EA863E,#A46AB5,#CB528E",

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
			data: [
				{ label: "Em dívida", value: "8168" },
				{ label: "Protestadas", value: "1288254" },
				{ label: "Executadas", value: "392485", }
			]
		}

		vm.dividasEmAberto = {
			chart: {
				numberPrefix: "R$",
				numberScaleUnit: "mil,mi",
				paletteColors: "#D64038,#C0C0C0,#3475C1,#EFBC3C,#48B1D3,#54A668,#EA863E,#A46AB5,#CB528E",
				bgColor: "#ffffff",
				showBorder: "0",
				use3DLighting: "0",
				showShadow: "0",
				showLegend: "1",
				legendBorderThickness: "0",
				legendShadow: "0",


				enableSmartLabels: "0",
				startingAngle: "310",
				showLabels: "0",
				showPercentValues: "1",


				defaultCenterLabel: "Total: $64.08K",
				centerLabel: "Total $label: $value",
				centerLabelBold: "1",

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
			data: [
				{ label: "Em dívida", value: "146533" },
				{ label: "Protestadas", value: "285704" },
				{ label: "Executadas", value: "28157", }
			]
		}

		vm.evolucaoDividaMes = {
			chart: {
				formatnumberscale: "0",
				numberSuffix: "mil",
				paletteColors: "#D64038,#C0C0C0,#3475C1,#EFBC3C,#48B1D3,#54A668,#EA863E,#A46AB5,#CB528E",
				theme: "ocean",

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
			dataset: [
				{ seriesname: "Dívida", data: [
					{ value: "15"},
					{ value: "30"},
					{ value: "40"},
					{ value: "80"},
					{ value: "100"},
					{ value: "15"},
					{ value: "30"},
					{ value: "40"},
					{ value: "80"},
					{ value: "100"},
					{ value: "100"},
					{ value: "100"},
				]},
				{ seriesname: "Protestos", data: [
					{ value: "7"},
					{ value: "10"},
					{ value: "30"},
					{ value: "60"},
					{ value: "100"},
					{ value: "7"},
					{ value: "10"},
					{ value: "30"},
					{ value: "60"},
					{ value: "100"},
					{ value: "60"},
					{ value: "100"}
				]},
				{ seriesname: "Execuções", data: [
					{ value: "1"},
					{ value: "10"},
					{ value: "30"},
					{ value: "60"},
					{ value: "90"},
					{ value: "1"},
					{ value: "10"},
					{ value: "30"},
					{ value: "60"},
					{ value: "90"},
					{ value: "60"},
					{ value: "90"},
				]
			}]
		}

		vm.evolucaoDividaAno = {
			chart: {
				formatnumberscale: "0",
				numberSuffix: "mi",
				paletteColors: "#D64038,#C0C0C0,#3475C1,#EFBC3C,#48B1D3,#54A668,#EA863E,#A46AB5,#CB528E",
				theme: "ocean",

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
					{ label: "2018"},
					{ label: "2017"},
					{ label: "2016"},
					{ label: "2015"},
					{ label: "2014"}
				]
			}],
			dataset: [
				{ seriesname: "Dívida", data: [
					{ value: "125"},
					{ value: "300"},
					{ value: "480"},
					{ value: "800"},
					{ value: "1100"}
				]},
				{ seriesname: "Protestos", data: [
					{ value: "70"},
					{ value: "150"},
					{ value: "350"},
					{ value: "600"},
					{ value: "1400"}
				]},
				{ seriesname: "Execuções", data: [
					{ value: "10"},
					{ value: "100"},
					{ value: "300"},
					{ value: "600"},
					{ value: "900"}
				]
			}]
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
	}

})();