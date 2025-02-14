(function() {

	angular.module('app')
	.controller('GerenciadorExecucoesCtrl', ['$scope', '$state', 'arrecadacao.common.ModalCad', 'ENUMS',
		function ($scope, $state, ModalCad, ENUMS) {

			var vm = $scope;
			vm.contribuintes = ENUMS.CONTRIBUINTES;
			vm.showPanelIntegra = false;

			vm.showPanel = function() {
				vm.showPanelIntegra = !vm.showPanelIntegra;
			}
			
			vm.openProtesto = function(){
				/* $state.go('main.core.cadastros-core.gerenciador-dividas'); */
			}

			vm.cancelaProtesto = function(resolve) {
				/* abrirPopup("gerenciador-protestos/protestos/modal-cancela-protesto.html", resolve); */
			};

			vm.assinar = function(resolve) {
				abrirPopup("gerenciador-dividas/dividas-ativas//modal-assinar.html", resolve);
			};

			vm.processSemMovimentoView = vm.storageSet('processSemMovimentoView', '1');
			
			vm.trocaProcessSemMovimentoView = function(resolve) {
				vm.processSemMovimentoView = vm.storageSet('processSemMovimentoView', null, resolve);
			};

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'modalCtrl as modalCtrl',
					scope: $scope,
					resolve: resolve
				});
			}

			vm.cadastros = [
				{ descricao: 'Visão geral'       , sref: 'main.gerenciadorExecucoes.visaogeral-execucoes'  , icon: 'fa-pie-chart'     },
				{ descricao: 'Execuções fiscais' , sref: 'main.gerenciadorExecucoes.execucoes'             , icon: 'fa-balance-scale' },
				{ descricao: 'Concencioso'       , sref: 'main.gerenciadorExecucoes.contencioso'           , icon: 'fa-balance-scale' },
				{ descricao: 'Administrativo'    , sref: 'main.gerenciadorExecucoes.administrativo'        , icon: 'fa-balance-scale' },
				// { descricao: 'Integrações'       , sref: 'main.gerenciadorExecucoes.integracoes'           , icon: 'fa-plug'          },
			]

			vm.primAcessoGeral = false
			
			vm.setPrimAcesso = function() {
				if(vm.primAcessoGeral) {
					vm.primAcessoEnvioTribunal = false
					vm.primAcessoRecebTrib     = false
					vm.primAcessoDiarioOfic    = false
					vm.primAcessoGeral         = false
				} else {
					vm.primAcessoEnvioTribunal = true
					vm.primAcessoRecebTrib     = true
					vm.primAcessoDiarioOfic    = true
					vm.primAcessoGeral         = true
				}

				console.log(
					vm.primAcessoEnvioTribunal,
					vm.primAcessoRecebTrib,
					vm.primAcessoDiarioOfic,
					vm.primAcessoGeral
				);
			}

			vm.semMovimentacoes = {
				chart: {
					formatnumberscale: "0",
					numberSuffix: "mil",
					paletteColors: "#EFA36C,#F3CC6B,#71C3DD,#568FD2",
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

					legendIconScale: "2",
					legendItemFontSize: "13",
				},
				categories: [{
					category: [{
						label: "6 meses"
					}, {
						label: "1 ano"
					}, {
						label: "3 anos"
					}, {
						label: "5 anos ou mais"
					}
					]
				}],
				dataset: [
					{ seriesname: "Execuções fiscais", data: [
						{ value: "420" },
						{ value: "200" },
						{ value: "180" },
						{ value: "20" }
					]},
					{ seriesname: "Contencioso", data: [
						{ value: "350" },
						{ value: "200" },
						{ value: "230" },
						{ value: "80" }
					]},
					{ seriesname: "Administrativo", data: [
						{ value: "350" },
						{ value: "200" },
						{ value: "230" },
						{ value: "80" }
					]}
				]
			}

			vm.pagamentos = {
				chart: {
					numberScaleUnit: "mil,mi",
					paletteColors: "#54A668,#3475C1,#C0C0C0",
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
					showPercentValues: "0",
					pieRadius: "75",
				},
				data: [
					{ label: "Quitadas/canceladas"  , value: "146" },
					{ label: "Parceladas/suspensas" , value: "284" },
					{ label: "Suspensas com dívidas", value: "28"  }
				]
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
		}
	])
	.controller('EmitirPeticaoInicialModalCtrl', ['$scope', 'arrecModal', '$modalInstance',
		function($scope, arrecModal, $modalInstance) {
			var vm = $scope;

			vm.options = $modalInstance.params
			vm.options.enviarTribunal = vm.options.enviarTribunal != undefined ? vm.options.enviarTribunal : true

			vm.registro = {
				assinarTodos: true
			}
		}
	])
})();