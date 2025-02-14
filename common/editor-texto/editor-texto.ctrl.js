(function () {

	angular.module('app').controller('EditorTextoCtrl', EditorTextoCtrl);

	EditorTextoCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

	function EditorTextoCtrl($scope, ModalCad) {

		var vm = $scope;

		vm.editarModal = function(resolve) {
			abrirPopup('common/editor-texto/editor-modal.html', resolve);
		};

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'EditorTextoModalCtrl as EditorTextoModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					 persistRemove: false
				})
			});
		}
	}

	//controller da modal
	angular.module('app').controller('EditorTextoModalCtrl', EditorTextoModalCtrl);

	EditorTextoModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function EditorTextoModalCtrl($scope, ModalCad, params) {
		var vm = $scope;

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