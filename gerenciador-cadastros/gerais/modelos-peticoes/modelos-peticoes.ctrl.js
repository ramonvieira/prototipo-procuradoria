(function () {

	angular.module('app').controller('ModelosPeticoesCtrl', ModelosPeticoesCtrl);

	ModelosPeticoesCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

	function ModelosPeticoesCtrl($scope, ModalCad) {

		var vm = $scope;

		vm.adicionar = function(resolve) {
			abrirPopup('gerenciador-cadastros/gerais/modelos-peticoes/modelos-peticoes-modal.html', resolve);
		};

		vm.peticoes = [
			{ area: 'Cível'          , descricao: 'Contrarrazões de Apelação em Ação de Fornecimento de Medicamentos'        , natureza: 'Natureza' },
			{ area: 'Penal'          , descricao: 'Habeas Corpus com pedido de Liminar'                                      , natureza: 'Natureza' },
			{ area: 'Penal'          , descricao: 'HC Prisão Preventiva'                                                     , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação de Prestação de Contas'                                              , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Minuta de Divórcio Administrativo (Via Cartório)'                         , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação Confessionária'                                                      , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação de Divórcio Consensual'                                              , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Divórcio (Via Cartório)'                                                  , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação de Divórcio Consensual Judicial'                                     , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação Demarcatória'                                                        , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Alvará Judicial'                                                          , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação Monitória'                                                           , natureza: 'Natureza' },
			{ area: 'Penal'          , descricao: 'Pedido de Restituição de Dinheiro'                                        , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Arrolamento'                                                              , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação de Busca e Apreensão com Pedido de Liminar'                          , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação de Retificação de Registro Civil'                                    , natureza: 'Natureza' },
			{ area: 'Cível'          , descricao: 'Ação de Cobrança de Honorários Advocatícios, por Enriquecimento sem Causa', natureza: 'Natureza' },
			{ area: 'Cível/Família'  , descricao: 'Ação de Interdição'                                                       , natureza: 'Natureza' },
			{ area: 'Administrativa' , descricao: 'Mandado de Segurança com Pedido de Liminar'                               , natureza: 'Natureza' },
			{ area: 'Cível/Sucessões', descricao: 'Ação de Sonegados'                                                        , natureza: 'Natureza' },
			{ area: 'Empresarial'    , descricao: 'Inicial de Recuperação Judicial'                                          , natureza: 'Natureza' },
		]

		vm.select = function(resolve) {
			vm.elm = resolve.elm;
			$(vm.elm).select();
		}

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'ModelosPeticoesModalCtrl as ModelosPeticoesModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					 persistRemove: false
				})
			});
		}
	}

	//controller da modal
	angular.module('app').controller('ModelosPeticoesModalCtrl', ModelosPeticoesModalCtrl);

	ModelosPeticoesModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function ModelosPeticoesModalCtrl($scope, ModalCad, params) {
		var vm = $scope;
		vm.copia = params.copia
		vm.modelo = params._modelo
		vm.isEditing = params.isEditing


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
	}
})();