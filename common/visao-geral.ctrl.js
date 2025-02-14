(function () {
	
	angular.module('app').controller('VisaoGeralCtrl', VisaoGeralCtrl);

	VisaoGeralCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'ENUMS'];

	function VisaoGeralCtrl($scope, ModalCad, ENUMS) {

		var vm = $scope;
		vm.contribuintes = ENUMS.CONTRIBUINTES;
		vm.grupoSelect = null;

		

		vm.listDocumentos = function(resolve) {
			abrirPopup('gerenciador-documentos/documentos-modal.html', resolve);
		};
		vm.openHistorico = function(resolve) {
			abrirPopup('historico-modal.html', resolve);
		};
		vm.openHistoricoDetalhes = function(resolve) {
			abrirPopup('historico-detalhes-modal.html', resolve);
		};
		
		//vm.semMovimentoView = vm.storageSet('semMovimentoView', null, 'aaa');
		
		vm.trocaSemMovimentoView = function(resolve) {
			vm.semMovimentoView = vm.storageSet('semMovimentoView', null, resolve);
		};

		vm.alteracoes = [
			{ campo: 'Tipo'                  , antes: 'Física'                           , depois: 'Jurídica'                 },
			{ campo: 'Nome'                  , antes: 'Matheus Philippe Martins da Cruz' , depois: 'Fernandes Fonseca Moraes' },
			{ campo: 'Rua'                   , antes: 'Rua Araranguá'                    , depois: 'Rua João Pessoa'          },
			{ campo: 'CEP'                   , antes: '88807-244'                        , depois: '88808-000'                },
			{ campo: 'Município'             , antes: 'Araranguá'                        , depois: 'Criciúma'                 },
			{ campo: 'Número'                , antes: '837'                              , depois: '134'                      },
			{ campo: 'Bairro'                , antes: 'Trindade'                         , depois: 'Centro'                   },
			{ campo: 'Inscrição imobiliária' , antes: '0001.0001.0001.0001'              , depois: '0002.0002.0002.0002'      },
		]

		vm.possibilidadePrescrAno = {
			chart: {
				'numberPrefix': 'R$',
				'paletteColors': '#48B1D3',
				'bgColor': '#ffffff',
				'showBorder': '0',
				'showCanvasBorder': '0',
				'canvasBorderAlpha': '0',
				'usePlotGradientColor': '0',
				'plotBorderAlpha': '10',
				'placevaluesInside': '1',
				'rotatevalues': '1',
				'valueFontColor': '#000000',
				'showXAxisLine': '1',
				'xAxisLineColor': '#999999',
				'divlineColor': '#999999',
				'divLineDashed': '1',
				'showAlternateHGridColor': '0',
				'subcaptionFontBold': '0',
				'subcaptionFontSize': '14',
				'axisLineAlpha': '25',
				'alignCaptionWithCanvas': '0',
				'showAlternateVGridColor': '0',
				'captionFontSize': '14',
				'toolTipColor': '#ffffff',
				'toolTipBorderThickness': '0',
				'toolTipBgColor': '#000000',
				'toolTipBgAlpha': '80',
				'toolTipBorderRadius': '2',
				'toolTipPadding': '5',
				'decimals': '2',
				'thousandSeparator': '.',
				'decimalSeparator': ',',
				'formatNumberScale': '0',
				"lineThickness": "2",
				'forceDecimals': '1',
			},
			
			dataset: [{
				data: [
					{ label: "2014", value: "1213" },
					{ label: "2015", value: "1912" },
					{ label: "2016", value: "3123" },
					{ label: "2017", value: "4365" },
					{ label: "2018", value: "5356" }
				]
			}]
		}

		vm.semMovimentacoes = {
			chart: {
				formatnumberscale: 0,
				numberSuffix: "mil",
				paletteColors: "#EFA36C,#F3CC6B,#71C3DD,#568FD2",
				theme: "ocean",

				showvalues: 0,
				bgColor: "#FFFFFF",
				showBorder: 0,
				baseFontSize: 13,
				use3DLighting: 0,
				showShadow: 0,
				startingAngle: 0,
				showBorder: 0,

				showTooltip: 1,
				toolTipColor: "#222222",
				toolTipBgColor: "#FFFFFF",
				toolTipPadding: 5,
				toolTipBorderRadius: 3,
				toolTipBorderThickness: 1,
				toolTipBorderColor: "#E1E3E6",
				showToolTipShadow: 1,
				toolTipBgAlpha: 100,

				legendIconScale: 2,
				legendItemFontSize: 13,
			},
				
			categories: [{
				category: [
					{ label: "6 meses" },
					{ label: "1 ano" },
					{ label: "3 anos" },
					{ label: "5 anos ou mais"}
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
				]},
				{ seriesname: "Protestos", data: [
					{ value: "120" },
					{ value: "130" },
					{ value: "30" },
					{ value: "10" }
				]}
			],
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

		// vm.tinymceModel = '<div class="cabecalho"><table class="mce-item-table" width="100%" style="height: 48px;" data-mce-style="height: 48px;"><tbody><tr><td style="width: 32.3641%;" data-mce-style="width: 32.3641%;"><img style="float: left;" src="http://www3.araraquara.sp.gov.br/ImageBank/FCKEditor/file/administrador/02%20BRAS%C3%83O%20Munic%C3%ADpio%20de%20Araraquara.png" alt="" width="204" height="88" data-mce-style="float: left;"></td><td style="width: 65.866%;" data-mce-style="width: 65.866%;">Qualquer descrição aqui<br></td></tr></tbody></table></div>' +
		// 				'<p>Começo</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p>  <img class="mce-pagebreak" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" data-mce-resize="false" data-mce-placeholder="">  <p>gggggggggg</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p><p>kk</p>' +
		// 				'<p>Laboris est reprehenderit minim sunt ea aliqua Lorem. Laborum est fugiat ullamco velit ex non esse officia Lorem dolor cupidatat. Laboris nulla ea ipsum esse commodo officia enim nisi sit minim voluptate ad elit. Esse quis est sint laboris. Velit id pariatur irure nostrud exercitation elit labore ex proident mollit tempor.</p>' +
		// 				'<p>Laboris est reprehenderit minim sunt ea aliqua Lorem. Laborum est fugiat ullamco velit ex non esse officia Lorem dolor cupidatat. Laboris nulla ea ipsum esse commodo officia enim nisi sit minim voluptate ad elit. Esse quis est sint laboris. Velit id pariatur irure nostrud exercitation elit labore ex proident mollit tempor.</p>' +
		// 				'<p>Laboris est reprehenderit minim sunt ea aliqua Lorem. Laborum est fugiat ullamco velit ex non esse officia Lorem dolor cupidatat. Laboris nulla ea ipsum esse commodo officia enim nisi sit minim voluptate ad elit. Esse quis est sint laboris. Velit id pariatur irure nostrud exercitation elit labore ex proident mollit tempor.</p>' +
		// 				'<div class="rodape" style="text-align: center;" data-mce-style="text-align: center;"><span style="color: rgb(128, 128, 128);" data-mce-style="color: #808080;">Prefeitura municipal de Araraquara - 48 3431-0733 - R. João Pessoa, 134 - Centro / Criciúma - SC</span></div>';
		//vm.tinymceModel = "";

		

		// tinyMCE.activeEditor.dom.addClass(tinyMCE.activeEditor.dom.select('html'), 'bbbb');
		// tinymce.classList.add('classe-exemplo');

		$("#btnPrint").click(function () {
			var printContents = $("#testePrint").prop('outerHTML');
			var originalContents = document.body.innerHTML;

			document.body.innerHTML = printContents;

			window.print();

			document.body.innerHTML = originalContents;

			/* var htmlPrint = "<table><tbody><tr><td>"+ $("#testePrint").prop('outerHTML') +"</td></tr></tbody></table>"
			console.log(htmlPrint);
			//window.open().document.write(htmlPrint)
			window.print(htmlPrint) */
		})
		

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'VisaoGeralModalCtrl as VisaoGeralModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					 persistRemove: false
				})
			});
		}
	}

	//controller da modal
	angular.module('app').controller('VisaoGeralModalCtrl', VisaoGeralModalCtrl);

	VisaoGeralModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function VisaoGeralModalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.tipo = params.tipo;
		vm.status = params.status;
		vm.profiss = params.profiss;
	}
})();