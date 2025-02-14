(function() {
	angular.module('app')
	.service('ExecucaoFiscalService', function(ENUMS) {
		var execucoesFiscais = [
			{ id: 5979, numProcesso: '0900264-79.2018.8.67.2086' , ano: -1, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 1 , assunto: 'Assunto 1'    , classe: 'Classe 1'  , valorCausa: 1500000.75 , executado: 1 , exequente: 'Gabriel Lúcio Gonçalves' , procurador: 7 , situacao: 'A ajuizar'     , apensamentos: [                ], honorarios: 4658 },
			{ id: 3123, numProcesso: '0900264-79.2018.8.42.4389' , ano: -3, tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 7 , assunto: 'Assunto 8'    , classe: 'Classe 8'  , valorCausa: 80000.85   , executado: 20 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 7 , situacao: 'A ajuizar'     , apensamentos: [                ], honorarios: 735 },
			{ id: 2960, numProcesso: '0900264-79.2018.8.22.3246' , ano: -2, tribunal: 'Tribunal de Justiça de Siderópolis'    , comarca: 'Comarca de Siderópolis'  , vara: '1ª vara de Siderópolis'              , area: 2 , assunto: 'Assunto 2'    , classe: 'Classe 2'  , valorCausa: 1550000.23 , executado: 20 , exequente: 'Marcelo de Barros Bauer' , procurador: 7 , situacao: 'Cancelada'     , apensamentos: [                ], honorarios: 4262 },
			{ id: 5852, numProcesso: '0900264-79.2018.8.17.2651' , ano: -3, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 4 , assunto: 'Assunto 4'    , classe: 'Classe 4'  , valorCausa: 150000.59  , executado: 20 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 9 , situacao: 'Suspensa'      , apensamentos: [                ], honorarios: 436 },
			{ id: 3987, numProcesso: '0900264-79.2018.8.15.4622' , ano: -3, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 3 , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.75    , executado: 10 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 4 , situacao: 'Suspensa'      , apensamentos: [                ], honorarios: 3716 },
			{ id: 4065, numProcesso: '0900264-79.2018.8.51.2798' , ano: -3, tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 3 , assunto: 'Assunto 3'    , classe: 'Classe 3'  , valorCausa: 800000.19  , executado: 17 , exequente: 'Cleber Melo Vieira'      , procurador: 3 , situacao: 'Encerrada'     , apensamentos: [                ], honorarios: 1636 },
			{ id: 2040, numProcesso: '0900264-79.2018.8.89.5111' , ano: -3, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.98   , executado: 4 , exequente: 'Marcelo de Barros Bauer' , procurador: 2 , situacao: 'Encerrada'     , apensamentos: [                ], honorarios: 4992 },
			{ id: 8738, numProcesso: '0900264-79.2018.8.33.4603' , ano: -1, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.3   , executado: 10 , exequente: 'Marcelo de Barros Bauer' , procurador: 4 , situacao: 'Encerrada'     , apensamentos: [                ], honorarios: 942 },
			{ id: 3954, numProcesso: '0900264-79.2018.8.44.3187' , ano: -2, tribunal: 'Tribunal de Justiça de Santa Catarina' , comarca: 'Comarca de Criciuma'     , vara: 'Vara de Execução Fiscal de Criciúma' , area: 1 , assunto: 'Dívida Ativa' , classe: 'Classe 5'  , valorCausa: 120000.30  , executado: 18 , exequente: 'Cleber Melo Vieira'      , procurador: 7 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 4236 },
			{ id: 1595, numProcesso: '0900264-79.2018.8.67.1302' , ano: -1, tribunal: 'Tribunal de Justiça de Siderópolis'    , comarca: 'Comarca de Siderópolis'  , vara: '1ª vara de Siderópolis'              , area: 7 , assunto: 'Assunto 7'    , classe: 'Classe 7'  , valorCausa: 850000.28  , executado: 6 , exequente: 'Cleber Melo Vieira'      , procurador: 6 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 640 },
			{ id: 5165, numProcesso: '0900264-79.2018.8.46.6467' , ano:  0, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 5 , assunto: 'Assunto 10'   , classe: 'Classe 10' , valorCausa: 350.99     , executado: 7 , exequente: 'Marcelo de Barros Bauer' , procurador: 7 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 4454 },
			{ id: 9451, numProcesso: '0900264-79.2018.8.25.4351' , ano: -2, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 5 , assunto: 'Assunto 10'   , classe: 'Classe 10' , valorCausa: 350.87     , executado: 21 , exequente: 'Marcelo de Barros Bauer' , procurador: 5 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 3366 },
			{ id: 6219, numProcesso: '0900264-79.2018.8.97.5609' , ano: -2, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 2 , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.92    , executado: 24 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 6 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 1528 },
			{ id: 1684, numProcesso: '0900264-79.2018.8.61.3002' , ano: -1, tribunal: 'Tribunal de Justiça de Santa Catarina' , comarca: 'Comarca de Criciuma'     , vara: 'Vara de Execução Fiscal de Criciúma' , area: 1 , assunto: 'Dívida Ativa' , classe: 'Classe 5'  , valorCausa: 120000.53  , executado: 3 , exequente: 'Cleber Melo Vieira'      , procurador: 1 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 121 },
			{ id: 1735, numProcesso: '0900264-79.2018.8.43.1322' , ano:  0, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 4 , assunto: 'Assunto 4'    , classe: 'Classe 4'  , valorCausa: 150000.55  , executado: 10 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 8 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 4976 },
			{ id: 5407, numProcesso: '0900264-79.2018.8.66.1836' , ano: -1, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 1 , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.44    , executado: 14 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 4 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 1006 },
			{ id: 3261, numProcesso: '0900264-79.2018.8.89.9983' , ano: -3, tribunal: 'Tribunal de Justiça de Cocal do Sul'   , comarca: 'Comarca de Cocal do Sul' , vara: '1ª vara de Cocal do Sul'             , area: 3 , assunto: 'Assunto 3'    , classe: 'Classe 3'  , valorCausa: 800000.58  , executado: 22 , exequente: 'Cleber Melo Vieira'      , procurador: 10 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 588 },
			{ id: 5307, numProcesso: '0900264-79.2018.8.12.7300' , ano: -2, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.7   , executado: 1 , exequente: 'Marcelo de Barros Bauer' , procurador: 7 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 3165 },
			{ id: 1790, numProcesso: '0900264-79.2018.8.27.9919' , ano: -3, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 20000.73   , executado: 16 , exequente: 'Marcelo de Barros Bauer' , procurador: 4 , situacao: 'Em tramitação' , apensamentos: [3106, 6090, 9379], honorarios: 3548 },
			{ id: 3966, numProcesso: '0900264-79.2018.8.36.3801' , ano: -3, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 4 , assunto: 'Assunto 4'    , classe: 'Classe 4'  , valorCausa: 150000.17  , executado: 5 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 6 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 3331 },
			{ id: 5195, numProcesso: '0900264-79.2018.8.89.2369' , ano: -1, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 1 , assunto: 'Assunto 9'    , classe: 'Classe 9'  , valorCausa: 5000.43    , executado: 6 , exequente: 'Gabriel Hahn Shaeffer'   , procurador: 8 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 597 },
			{ id: 3106, numProcesso: '0900264-79.2018.8.39.8237' , ano: -2, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 3'    , classe: 'Classe 3'  , valorCausa: 563.65  , executado: 13, exequente: 'Cleber Melo Vieira'      , procurador: 10 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 4709 },
			{ id: 6090, numProcesso: '0900264-79.2018.8.31.6808' , ano: -2, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 27465.81   , executado: 13, exequente: 'Marcelo de Barros Bauer' , procurador: 6 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 1388 },
			{ id: 9379, numProcesso: '0900264-79.2018.8.38.9202' , ano: -1, tribunal: 'Tribunal de Justiça de Criciúma'       , comarca: 'Comarca de Criciúma'     , vara: '1ª vara de Criciúma'                 , area: 6 , assunto: 'Assunto 6'    , classe: 'Classe 6'  , valorCausa: 23783.16   , executado: 13, exequente: 'Marcelo de Barros Bauer' , procurador: 6 , situacao: 'Em tramitação' , apensamentos: [                ], honorarios: 1862 },
		]

		execucoesFiscais.forEach(exec => {
			exec.area = ENUMS.AREAS.find(area => { return area.id == exec.area})
			exec.area = exec.area.descricao
			
			exec.procurador = ENUMS.PROCURADORES.find(procurador => { return procurador.id == exec.procurador})
			exec.procurador = exec.procurador.procurador.nome
			
			exec.executado = ENUMS.CONTRIBUINTES.find(contribuinte => { return contribuinte.id == exec.executado})
			exec.executado = exec.executado.nome


			if(exec.apensamentos.length) {
				var APENSAMENTOS = []
				exec.apensamentos.forEach(apensamento => {
					execucoesFiscais.find(ex => {
						if(apensamento == ex.id) {
							ex.apensado = exec.id;
							ex.situacao = 'Suspensa';
							APENSAMENTOS.push(ex)

							exec.valorCausa += ex.valorCausa
							exec.honorarios += ex.honorarios
						}
					})

					exec.apensamentos = APENSAMENTOS
				})

			}
		})

		return {
			execucoesFiscais: execucoesFiscais
		}
	})
	.controller('ExecucaoFiscalCtrl', ['$scope', '$state', 'arrecModal', 'arrecadacao.common.ModalCad', 'ENUMS', 'ExecucaoFiscalService',
		function($scope, $state, arrecModal, ModalCad, ENUMS, ExecucaoFiscalService) {

			var vm = $scope;

			vm.path = $state.current.url;

			if (vm.path == '/execucoes') {
				vm.navTab = 1;
			} else if (vm.path == '/contencioso') {
				vm.navTab = 2;
			} else {
				vm.navTab = 3;
			}

			vm.filtrarPor = ''
			vm.tab = ''


		/********** Abrir execução fiscal ***************** */        
			vm.openExecucao = (resolve ={}) => {
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/execucao-fiscal-cad.html',
					controller: 'ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.openUrlEdit = function(execucao){
				$state.go('main.gerenciadorExecucoes.execucao-fiscal-ficha', {processo: execucao.id});
			}

		/********** Emitir petição intermediária ***************** */            
			vm.openEmitirPeticaoIntermediaria = (resolve ={}) => {
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/mais-opcoes/emitir-peticao.html',
					controller: 'ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.openEmitirPeticaoIntermediariaLote = (resolve ={}) => {
				
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/mais-opcoes/emitir-peticao-lote.html',
					controller: 'ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

		/********** Enviar tribunal ***************** */           
			vm.enviarTribunal = (resolve ={}) => {
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/mais-opcoes/enviar-tribunal.html',
					controller: 'ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.enviarTribunalLote = (resolve ={}) => {
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/mais-opcoes/enviar-tribunal-lote.html',
					controller: 'ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

		/********** Lista de execuções ***************** */   
			vm.execucoesFiscais = ExecucaoFiscalService.execucoesFiscais
			
			vm.movimentacoes = [
				{ tipo: 'Em tramitação' },
				{ tipo: 'Ajuizado' },
				{ tipo: 'Suspenso' },
				{ tipo: 'Cancelado' },
				{ tipo: 'Encerrado' },
				{ tipo: 'Petição emitida' },
				{ tipo: 'Enviado ao tribunal' },
				{ tipo: 'Documento anexado' },
				{ tipo: 'Nova execução' },
				{ tipo: 'Partes do processo' },
				{ tipo: 'Dados do processo' },
				{ tipo: 'Local de tramitação' },
			]

		/********** Movimentações ***************** */   
			vm.openMovimentacao = function(resolve = {}){
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/cadastros/movimentacao-cad.html',
					controller: function($scope){},
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		/********** Totalizadores ***************** */   
			vm.countExecucoes = function(index, filtrarPor) {
				var total;
				angular.forEach(vm.execucoesFiscais, function(value, key) {               
				total = vm.execucoesFiscais[index].listExecucoesFiscais.length;
				});
				return total;           
			}

			vm.sumExecucoes = function(index, filtrarPor) {
				var total=0;
				angular.forEach(vm.execucoesFiscais[index].listExecucoesFiscais, function(value, key) {     
					if (filtrarPor == vm.execucoesFiscais[index].listExecucoesFiscais[key].situacao || filtrarPor=='Todas')  {   
						total += vm.execucoesFiscais[index].listExecucoesFiscais[key].valorCausa;
					}
				});
				return total;
			}

			vm.sumExecucoesTotal = function(filtrarPor) {
				var total = 0;
				var arrayExecucoes =[];
				angular.forEach(vm.execucoesFiscais, function(value, key) {  
					arrayExecucoes = vm.execucoesFiscais[key];
					angular.forEach(arrayExecucoes.listExecucoesFiscais, function(value, key) {  
						if (filtrarPor == arrayExecucoes.listExecucoesFiscais[key].situacao || filtrarPor=='Todas')  {
							total +=  arrayExecucoes.listExecucoesFiscais[key].valorCausa; 
						}
					});
				});
				return total;
			}

			vm.verUltimasSincronizacoes = function() {
				arrecModal.open('gerenciador-execucoes/execucoes/sincronizacao/sincronizacao-modal.html', $scope, {}, 'xl', 'ProcessosRecebidosCtrl')
			}
		}
	])
	.controller('ExecucaoFiscalCtrlCad', ['$scope', '$state', '$stateParams', 'arrecadacao.common.ModalCad', '$filter', 'ENUMS', 'ExecucaoFiscalService',
		function($scope, $state, $stateParams, ModalCad, $filter, ENUMS, ExecucaoFiscalService) {
			var vm = $scope;

			vm.processo = ExecucaoFiscalService.execucoesFiscais.find(exec => {
				return $stateParams.processo == exec.id
			})

			vm.enderecoCompleto = ENUMS.ENDERECOCOMPLETO;

			vm.tinymceOptions = {
				language: 'pt_BR',
				content_style: 'html { background-color: #EBEDF0 ; }',
				min_height: 400,
				max_height: 500,
				resize: true,
				plugin_preview_height: 800,
				plugin_preview_width: 1000,
				paste_as_text: true,
				paste_data_images: true,
				nonbreaking_force_tab: true,
				elementpath: false,
				
				table_default_attributes: {
					width: '100%'
				},

				templates: [
					{title: 'Modelo Betha', description: 'Teste de modelo Betha Sistemas', url: 'modelos/betha.html'},
					{title: 'Modelo PM', description: 'Teste de modelo de uma prefeitura', url: 'modelos/pm.html'}
				],
				template_popup_height: "700",
				template_popup_width: "900",
				template_replace_values: {
					username: "Ramon Vieira Viquetti",
					phone: "(48) 9 9988-7766",
				},

				pagebreak_split_block: true,

				image_advtab: true,
				image_prepend_url: "images/",
				image_list: [
					{title: 'Obra 1', value: 'obra-1.jpg'},
					{title: 'Obra 2', value: 'obra-2.jpg'}
				],

				menubar: 'edit insert view format table',
				removed_menuitems: 'pastetext showblock help media',

				plugins: [
					"paste preview searchreplace autolink directionality visualblocks fullscreen image imagetools link template codesample charmap hr pagebreak nonbreaking table advlist lists textcolor contextmenu colorpicker textpattern"
				],
				
				toolbar:
					"undo redo | fontsizeselect bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent | link image removeformat pagebreak | preview",
				content_css: [
					"//fonts.googleapis.com/css?family=Lato:300,300i,400,400i",
					"css/sys.css",
				],
				
			}

			vm.openUrl = function(){
				$state.go('main.core.cadastros-core.execucao-fiscal-ficha');
			}
		
			// ------------------------------------------------------
			// Anexos
			// ------------------------------------------------------
			{
				vm.openAnexo = function(resolve = {}){
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/anexo/anexos.html',
						controller: function($scope){},
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
			}
			
			// ------------------------------------------------------
			// Apensamentos
			// ------------------------------------------------------
			{
				vm.openVinculoExecucaoFiscal = (resolve ={}) => {
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/selecionando-execucao-fiscal.html',
						controller: 'SelecionandoExecucoesFiscaisCtrl',
						controllerAs: 'vm',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
				vm.apensamentos = [
					{
						codigo: 1,
						numProcesso: '123567890123456790',
						valorCausa: 'R$ 50.000,00',
						situacao: 'Ativo'
					},{
						codigo: 2,
						numProcesso: '9876543210123456790',
						valorCausa: 'R$ 20.000,00',
						situacao: 'Ativo'
					}
				];
			
				vm.openObservacao = function(resolve = {}){
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/observacao-apensamento.html',
						controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
			}
			
			// ------------------------------------------------------
			// Custa
			// ------------------------------------------------------
			{
				vm.openCusta = function(resolve = {}){
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/custa.html',
						controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
			
				vm.custas=[
					{
						custa:'Custa 001', 
						valor:'1.000.000,00',
						observacao:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod'
					},{
						custa:'Custa 002', 
						valor:'50.000,00'
					}
				]
			}
		
			// ------------------------------------------------------
			// Dados da execução  
			// ------------------------------------------------------
			vm.openDadosExecucao = function(resolve = {}){
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/cadastros/dados-execucao.html',
					controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
			
			// ------------------------------------------------------
			// Dívidas
			// ------------------------------------------------------
			{
				vm.openDividas = (resolve ={}) => {
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/selecionando-dividas.html',
						controller: 'SelecionandoDividasCtrl',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
			
				vm.cols = [
					{
						name: 'inscricao',
						label: 'Inscrição',
						width: "100",
						active: true
					},            
					{
						name: 'referente',
						label: 'Referente',
						width: "",
						active: true
					},
					{
						name: 'certidao',
						label: 'Certidão',
						width: "105",
						active: true
					},
					{
						name: 'protesto',
						label: 'Protesto',
						width: "105",
						active: true
					},
					{
						name: 'vencimento',
						label: 'Vencimento',
						width: "100",
						active: true
					},
					{
						name: 'total',
						label: 'Total',
						width: "100",
						class: "text-right",
						active: true
					},
					{
						name: ';',
						label: 'Situação',
						width: "150",
						active: true
					}
				]; 
			
				vm.cda = [
					{
						credito:'ISS',
						dtEmissao: '12/12/2012',
						valor: '1.000,00',
						registrosAno: [
							{
								ano:'2016',
								registros:[
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 491.00,
										situacao: 'Aberta',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'P7S' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 400.00,
										situacao: 'Parcelada',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 386.00,
										situacao: 'Paga',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 455.00,
										situacao: 'Aberta',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									}
								]
							},{
								ano:'2017',
								registros:[
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 360.00,
										situacao: 'Aberta',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 58.00,
										situacao: 'Parcelada',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 407.00,
										situacao: 'Paga',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 363.00,
										situacao: 'Aberta',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									}
								]
							}
						]
					},
					{
						credito:'IPTU',
						dtEmissao: '12/12/2012',
						valor: '1.000,00',
						registrosAno: [
							{
								ano:'2016',
								registros:[
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 286.00,
										situacao: 'Aberta',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'RAMON' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 299.00,
										situacao: 'Parcelada',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 198.00,
										situacao: 'Paga',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 178.00,
										situacao: 'Aberta',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									}
								]
							},{
								ano:'2017',
								registros:[
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 308.00,
										situacao: 'Aberta',
										protestada: 'true',
										assinatura: null
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 337.00,
										situacao: 'Parcelada',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 266.00,
										situacao: 'Paga',
										protestada: 'true',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									},
									{
										codigo: 'IPTU',
										ref: 10010,
										ano: 2016,
										dtInscricao: '01/09/2016',
										numInscricao: 500,
										parcela: 1,
										dtVencimento: '01/09/2016',
										valor: 424.00,
										situacao: 'Aberta',
										protestada: '',
										certidao: { numero: 5835, data: -1 },
										assinatura: { data: 1, user: 1, tipo: 'NORMAL' }
									}
								]
							}
						]
					},
				];
			}
		
			// ------------------------------------------------------
			// Informações adicionais  
			// ------------------------------------------------------
			vm.openInformacoesAdicionais = function(resolve = {}){
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/cadastros/informacoes-adicionais.html',
					controller: function($scope){},
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
			
			// ------------------------------------------------------
			// Informações gerais  
			// ------------------------------------------------------
			vm.openInformacoesGerais = function(resolve = {}){
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/cadastros/informacoes-gerais.html',
					controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		
			// ------------------------------------------------------
			// Local de tramitação  
			// ------------------------------------------------------
			vm.openLocalTramitacao = function(resolve = {}){
				ModalCad.open({
					templateUrl: 'gerenciador-execucoes/execucoes/cadastros/local-tramitacao.html',
					controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		
			// ------------------------------------------------------
			// Localização
			// ------------------------------------------------------
			{
				vm.openLocalizacao = function(resolve = {}){
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/localizacao.html',
						controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}  
			
				vm.localizacoes = [{
					id: 1,
					predio: 'Desenvolvimento B',
					andar: '1°',
					sala:'Arrecadação',
					arquivo: 'Gabriela'
					},
					{
						id: 2,
						predio: 'Betha Matriz',
						andar: '1°',
						sala:'N° 4',
						arquivo: 'Contratações'
					}
				]
			
				vm.localizacaoOptions = {
					data: vm.localizacoes,
					formatResult: _formatLocalizacao,
					formatSelection: _formatShowLocalizacao,
					allowClear: true
				}
			
				function _formatShowLocalizacao(item) {
					return "<div class='row bottom'>" +
					"<div class='col-md-12 ellipsis' style='padding-left: 21px'>" + "Prédio "+item.predio +" <i class='fa fa-angle-right'></i> "
					+ "Andar "+ item.andar + " <i class='fa fa-angle-right'></i> " + "Sala "+ item.sala + " <i class='fa fa-angle-right'></i> " + "Arquivo "+ item.arquivo
					'</div>' +
					'</div>';
				}
			
				function _formatLocalizacao(item) {
					return "<div class='row bottom'>" +
						"<div class='col-md-12 ellipsis' style='padding-left: 21px'>" + "Prédio "+item.predio +" <i class='fa fa-angle-right'></i> "
						+ "Andar "+ item.andar + " <i class='fa fa-angle-right'></i> " + "Sala "+ item.sala + " <i class='fa fa-angle-right'></i> " + "Arquivo "+ item.arquivo
						'</div>' +
						'</div>';
				}
			
				$scope.localRH = [
					{
					'label': "Betha Matriz",
					'tipo': "Prédio",
					'children': [
						{
							'label': "1°",
							'tipo': "Andar",
							'children': [
								{
									'label':"N° 4",
									'tipo':"Sala",
									'children':[
										{
											'label':"Contratações",
											'tipo':"Arquivo",
											'children':[]
										}
									]
								}
							]
						}
						]
					}
				];
			}
			
			// ------------------------------------------------------
			// Movimentações 
			// ------------------------------------------------------
			{
				vm.movimentacoes = [{},{},{}];
			
				vm.openMovimentacao = function(resolve = {}){
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/movimentacao-cad.html',
						controller: function($scope){},
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
			}
			
			// ------------------------------------------------------
			// Partes
			// ------------------------------------------------------
			{
				vm.openParte = function(resolve = {}){
					ModalCad.open({
						templateUrl: 'gerenciador-execucoes/execucoes/cadastros/parte.html',
						controller: 'ExecucaoFiscalCtrlCad as ExecucaoFiscalCtrlCad',
						scope: $scope,
						resolve: angular.extend(resolve, {
							persistRemove: false
						})
					});
				}
			
				vm.partes = [
					{
						nome:'Ramon Vieira Viquetti',
						cpf:'000.000.000-00',
						tipo:'Executado'
					},{
						nome:'Gabriel Lúcio Gonçalves',
						cpf:'000.000.000-00',
						tipo:'Exequente'
					},{
						nome:'Aldo de Souza Garcia',
						cpf:'000.000.000-00',
						tipo:'Procurador',
						grupoTrabalho:'Lorem ipsum sit amet'
					},{
						nome:'Márcio Figueiredo Cardoso',
						cpf:'000.000.000-00',
						tipo:'Advogado'
					},{
						nome:'Cleber Melo Vieira',
						cpf:'000.000.000-00',
						tipo:'Advogado'
					},{
						nome:'Lucas da Rosa Motta',
						cpf:'000.000.000-00',
						tipo:'Advogado'
					}
				]
			
				vm.usuarios = [
					{
						id: 1,
						nome: 'Ramon Vieira Viquetti',
						cpf: '000.000.000-00',
						participacao:'Executado'
					},{
						id: 2,
						nome: 'Gabriel Lúcio Gonçalves',
						cpf: '000.000.000-00',
						participacao: 'Exequente'
					},{
						id: 3,
						nome: 'Aldo de Souza Garcia',
						cpf: '000.000.000-00',
						participacao: 'Procurador'
					},{
						id: 4,
						nome: 'Flávia Guaresi',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 5,
						nome: 'Marcelo Bauer',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 6,
						nome: 'Flávia Nesi',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 7,
						nome: 'Márcio Figueiredo Cardoso',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 8,
						nome: 'Cleber Melo Vieira',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 9,
						nome: 'Lucas da Rosa Motta',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 10,
						nome: 'Gabriel Hahn Shaeffer',
						cpf: '000.000.000-00',
						participacao: ''
					},{
						id: 11,
						nome: 'Raphael Molin',
						cpf: '000.000.000-00',
						participacao: ''
					}
				]
			
				vm.userOptions = {
					data: vm.usuarios,
					formatResult: _formatUser,
					formatSelection: _format,
					allowClear: true
				}
			
				function _format(item) {
					if (item.situacao == 'Inativo') {
						return item.nome + " (" + item.situacao + ")";
					}
					return item.nome
				}
			
				function _formatUser(item) {
					return "<div class='row bottom resultados-pessoa'>" +
						"<div class='col-md-12' style='padding-left: 21px'>" + item.nome +
						'<br><small> CPF : ' + item.cpf + '</small>' +
						'</div>' +
						'</div>';
				}
			}

			// ------------------------------------------------------
			// Documentação
			// ------------------------------------------------------
			{
				vm.documentos = ENUMS.DOCUMENTOS;
				vm.tipoDocumentos = ENUMS.TIPODOCUMENTOS;
				vm.documentosExecucao = vm.tipoDocumentos.find(tipo => tipo.tipo == 'Execuções')
				vm.doctSelect = vm.documentosExecucao.itens[0].id

				vm.setDoc = function(id) {
					vm.doctSelect = id
				}
			}

			// ------------------------------------------------------
			// Penhoras
			// ------------------------------------------------------
			{
				vm.situacaoPenhoras = ENUMS.SITUACAO_PENHORAS
				vm.penhoras = [
					{ id: 1, descricao: 'Motocicleta'   , categoria: 1, complemento: 'Motocicleta Honda, modelo Biz 100cc com partida elétrica. Placa XXX-9999. Veículo está quitado e possui 5 multas no total de R$1.238,43', data: -2, depositario: 1, endereco: vm.enderecoCompleto[0].descricao, valorPenhorado: 3284.56, situacoes: [
						{ data: -2, resp: 'ramon.viquetti', situacao: 'ATIVA'},
						{ data: -1, resp: 'ramon.viquetti', situacao: 'CONCLUIDA'},
					]},
					{ id: 2, descricao: 'Investimento em fundos imobiliários', categoria: null, complemento: 'Investimento em 10 fundos imobiliários com rendimento mensal avaliado em R$849,09', data: -167, depositario: 2, endereco: vm.enderecoCompleto[0].descricao, valorPenhorado: 84684.35, situacoes: [
						{ data: -3, resp: 'ramon.viquetti', situacao: 'ATIVA'},
						{ data: -1, resp: 'ramon.viquetti', situacao: 'CANCELADA'},
					]},
					{ id: 3, descricao: '500g de pedra zafira' , categoria: 8, complemento: 'Pedra zafira rara', data: -345, depositario: null, endereco: null, valorPenhorado: 35000, situacoes: [
						{ data: -1, resp: 'ramon.viquetti', situacao: 'ATIVA'},
					]},
				]

			}
		}
	])
	.controller('SelecionandoDividasCtrl', ['$scope', '$state', 'arrecadacao.common.ModalCad',
		function($scope, $state, ModalCad) {

			var vm = $scope;

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
					width: "18%",
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
			
			vm.cda = [
				{
					cda: 123,
					contribuinte: 'Gabriel Valandro',
					dtEmissao: '12/12/2012',
					valor: '1.000,00',
					registros: [
						{
							codigo: 'IPTU',
							ano: 2016,
							ref: 10010,
							receita: 'Coleta de lixo',
							situacao: {
								label: 'Aberta',
								class: 'success'
							}
						},
						{
							codigo: 'IPTU',
							ano: 2016,
							ref: 10010,
							receita: 'Coleta de lixo',
							situacao: {
								label: 'Aberta',
								class: 'success'
							}
						},
						{
							codigo: 'IPTU',
							ano: 2016,
							ref: 10010,
							receita: 'Coleta de lixo',
							situacao: {
								label: 'Aberta',
								class: 'success'
							}
						},
						{
							codigo: 'IPTU',
							ano: 2016,
							ref: 10010,
							receita: 'Coleta de lixo',
							situacao: {
								label: 'Aberta',
								class: 'success'
							}
						}
					]
				},
			];

			vm.getChecked = function(){
				return vm.cda[0].registros
						.filter((r) => {
							return r.check
						}).length
			}

			vm.setCheckAll = function(){
				vm.cda[0].registros
					.map((r) => {
						return r.check = vm.checkAll
					})
			}
		}
	])
	.controller('SelecionandoExecucoesFiscaisCtrl', ['$scope', '$state', 'arrecadacao.common.ModalCad',
		function($scope, $state, ModalCad) {

			var vm = $scope;
			
			vm.execucoes = [
				{
					codigo: 1,
					numProcesso: '123567890123456790',
					valorCausa: 'R$ 50.000,00',
					situacao: 'Ativo'
				},{
					codigo: 2,
					numProcesso: '9876543210123456790',
					valorCausa: 'R$ 20.000,00',
					situacao: 'Ativo'
				}
			];

			vm.getChecked = function(){
				return vm.execucoes
						.filter((e) => {
							return e.check
						}).length
			}

			vm.setCheckAll = function(){
				vm.execucoes
					.map((e) => {
						return e.check = vm.checkAll
					})
			}
		}
	])
	.controller('AnexoCtrl', ['$scope', 'arrecadacao.common.ModalCad',
		function($scope, ModalCad) {
			var vm = this;

			vm.showOverlay = function(event) {
				$(event.target).parent().css('opacity', '1');
			}

			vm.hideOverlay = function(event) {
				$(event.target).parent().removeAttr('style');
			}

			vm.openImage = function(src) {
				ModalCad.open({
					templateUrl: "gerenciador-execucoes/execucoes/anexo/modal-view-imagem.html",
					controller: "ImageViewCtrl as vm",
					resolve: {
						src: src
					} 
				});
			}

			/* Attach */

			var drag_enter = false;
			var image_types = [{
				mime: 'image/jpeg',
				icon: 'fa-image',
				class: 'bth-attach-item__thumb-image',
				extension: ['jpg', 'jpeg']
			},
			{
				mime: 'image/png',
				icon: 'fa-image',
				class: 'bth-attach-item__thumb-image',
				extension: ['png']
			}
			];
			var allowed_types = [{
				mime: 'application/pdf',
				icon: 'fa-file-pdf-o',
				class: 'bth-attach-item__thumb-icon--pdf',
				extension: ['pdf']
			},
			{
				mime: 'application/msword',
				icon: 'fa-file-word-o',
				class: 'bth-attach-item__thumb-icon--doc',
				extension: ['doc']
			},
			{
				mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
				icon: 'fa-file-word-o',
				class: 'bth-attach-item__thumb-icon--doc',
				extension: ['docx']
			},
			{
				mime: 'text/plain',
				icon: 'fa-file-text-o',
				class: 'bth-attach-item__thumb-icon--txt',
				extension: ['txt']
			},
			{
				mime: 'text/html',
				icon: 'fa-file-code-o',
				class: 'bth-attach-item__thumb-icon--html',
				extension: ['html']
			},
			{
				mime: 'application/vnd.ms-excel',
				icon: 'fa-file-excel-o',
				class: 'bth-attach-item__thumb-icon--xls',
				extension: ['xls']
			},
			{
				mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				icon: 'fa-file-excel-o',
				class: 'bth-attach-item__thumb-icon--xls',
				extension: ['xlsx']
			},
			...image_types
			]

			vm.setDragEnter = function() {
				drag_enter = true;
			}

			vm.setDragLeave = function() {
				drag_enter = false;
			}

			vm.isDragEnter = function() {
				return drag_enter;
			}

			vm.removeFile = function(f, i) {
				f.files.splice(i, 1);
			}

			vm.isAllowed = function(file) {
				return (vm.isTypeAllowed(file.file.type) || vm.isExtensionAllowed(vm.getFileExtension(file))) &&
					vm.isSizeAllowed(file.file.size)
			}

			vm.isTypeAllowed = function(type) {
				return allowed_types.some(t => t.mime == type)
			}

			vm.isExtensionAllowed = function(ext) {
				return allowed_types.some(t => {
					return t.extension.some(e => {
						return ext == e
					})
				})
			}

			vm.isSizeAllowed = function(size) {
				return size < 10000000
			}

			vm.getErrorMessage = function(file) {
				if (!vm.isTypeAllowed(file.file.type) ||
					!vm.isExtensionAllowed(vm.getFileExtension(file))) return "Formato inválido";
				if (!vm.isSizeAllowed(file.file.size)) return "Tamanho excedido"
			}

			vm.getIcon = function(file) {
				var ext = vm.getFileExtension(file);
				if (!vm.isAllowed(file)) return 'fa-exclamation-triangle'
				return allowed_types.filter(function(t) {
					return t.extension.some(e => e == ext)
				})[0].icon
			}

			vm.getClass = function(file) {
				if (!vm.isAllowed(file)) return 'bth-attach-item__thumb-icon--error'
				var ext = vm.getFileExtension(file);
				return allowed_types.filter(function(t) {
					return t.extension.some(e => e == ext)
				})[0].class
			}

			vm.getFileExtension = function(file) {
				if (file)
					return file.name.substr(file.name.lastIndexOf('.') + 1)
			}

			vm.getFileName = function(file) {
				if (file)
					return file.name.substr(0, file.name.lastIndexOf('.'))
			}

			vm.getFileSize = function(bytes) {
				if (bytes >= 1000000000) {
					bytes = (bytes / 1000000000).toFixed(2) + ' GB';
				} else if (bytes >= 1000000) {
					bytes = (bytes / 1000000).toFixed(2) + ' MB';
				} else if (bytes >= 1000) {
					bytes = (bytes / 1000).toFixed(2) + ' KB';
				} else if (bytes > 1) {
					bytes = bytes + ' bytes';
				} else if (bytes == 1) {
					bytes = bytes + ' byte';
				} else {
					bytes = '0 byte';
				}
				return bytes;
			}


			vm.isImage = function(file) {
				return image_types.some(t => t.mime == file.file.type)
			}

			vm.getImageURL = function(file) {

				var fileReader = new FileReader();

				fileReader.onload = function(fileLoadedEvent) {

					file.uri = fileLoadedEvent.target.result;
				};

				fileReader.readAsDataURL(file.file);
			}  

		}
	])
	.controller('ImageViewCtrl', ['$scope','params',
		function($scope , params) {
			var vm = this;

			vm.Images = [{
					src: params.src,
					active: true
				},
				{
					src: 'https://dummyimage.com/600x400/000/fff'
				},
				{
					src: 'https://dummyimage.com/1000x400/000/fff'
				},
				{
					src: 'https://dummyimage.com/20x20/000/fff'
				},
				{
					src: 'https://dummyimage.com/1000x1000/000/fff'
				},
				{
					src: 'https://dummyimage.com/20x3000/000/fff'
				},
			];


			vm.getImages = function() {
				return vm.Images.map(function(i, index) {
					i.id = index + 1;
					return i;
				})
			}


			vm.getCurrentImage = function() {
				return vm.getImages().filter(function(i) {
					return i.active;
				})[0]
			}

			vm.hasPreviousImage = function() {
				return Boolean(vm.getImages()[vm.getCurrentImage().id - 2])
			}

			vm.hasNextImage = function() {
				return Boolean(vm.getImages()[vm.getCurrentImage().id])
			}

			vm.goPreviousImage = function() {

				if (!vm.hasPreviousImage()) return vm.getImages()[0];

				return vm.setActiveImage(vm.getCurrentImage().id - 2);
			}


			vm.goNextImage = function() {

				if (!vm.hasNextImage()) return vm.getImages()[0];

				return vm.setActiveImage(vm.getCurrentImage().id);
			}

			vm.setActiveImage = function(index) {
				vm.Images.map(function(i) {
					i.active = false;
					return i;
				})

				vm.Images[index].active = true;
			}

			vm.watchKeyEvent = function(e) {
				if (e.keyCode == 39) vm.goNextImage();
				if (e.keyCode == 37) vm.goPreviousImage();
			}

			vm.getSource = _getSource;


			function _getSource() {
				return src;
			}

		}
	])
	.controller('ProcessosRecebidosCtrl', ['$scope', '$modalInstance', 'recebimentosService', 'promiseTracker' , '$timeout', '$filter',
		function($scope, $modalInstance, recebimentosService, promiseTracker, $timeout, $filter) {
			var vm = $scope;
			vm.RECEBIMENTOS = recebimentosService.recebimentos

			vm.loadingRecebimentos = promiseTracker();

			vm.historico = {
				sincronizacoes: [
					{ id: 1, dataHora: 1711307594551, por: 1, processos: recebimentosService.recebimentosTribunal.slice(0,5) },
					{ id: 2, dataHora: 1712307554551, por: 2, processos: recebimentosService.recebimentosTribunal.slice(6,10) },
					{ id: 3, dataHora: 1713307504551, por: 3, processos: recebimentosService.recebimentosTribunal.slice(11,12) },
					{ id: 4, dataHora: 1714307504551, por: 5, processos: recebimentosService.recebimentosTribunal.slice(13,15) },
					{ id: 5, dataHora: 1715307501551, por: 7, processos: recebimentosService.recebimentosTribunal.slice(15,18) },
				],
				carregando: false,
				set: function(item) {
					this.carregando = true
					vm.loadingRecebimentos.addPromise($timeout(function(){
						vm.historico.carregando = false
					}, 1000));
					vm.RECEBIMENTOS = (this.sincronizacoes.find(receb => receb.id == item)).processos
				}
			}
			
			vm.optionsSelectHistorico = {
				data: {
					results: $filter('orderBy')(vm.historico.sincronizacoes, '-dataHora'),
					text: function(item) {
						return $filter('arrecDateTime')(item.dataHora);
					}
				},
				formatNoMatches: function() {
					return ''
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( vm.historico.sincronizacoes.find(receb => receb.id == $(element).val()) ) : null
				},
				formatValue: function(item){
					return item.id
				},
				formatResult: function(item) {
					return `${$filter('arrecDateTime')(item.dataHora)} <small class="text-muted">(${item.processos.length} processo${item.processos.length == 1 ? '' : 's'}) <i class="fa fa-fw fa-user" title="Realizado por:"></i> ${$filter('usuariosSistema')(item.por)}</small>`
				},
				formatSelection: function(item) {
					return `${$filter('arrecDateTime')(item.dataHora)} <small class="text-muted">(${item.processos.length} processo${item.processos.length == 1 ? '' : 's'}) <i class="fa fa-fw fa-user" title="Realizado por:"></i> ${$filter('usuariosSistema')(item.por)}</small>`
				},
			}
			vm.registro.processosRecebidos = vm.historico.sincronizacoes[vm.historico.sincronizacoes.length-1].id

			vm.historico.set(vm.historico.sincronizacoes[vm.historico.sincronizacoes.length-1].id)

		}
	])
})();