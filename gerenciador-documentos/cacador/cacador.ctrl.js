(function () {

	angular.module('app').controller('CacadorCtrl', CacadorCtrl);

	CacadorCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'ENUMS'];

	function CacadorCtrl($scope, ModalCad, ENUMS) {
		var vm = $scope;
		vm.contribuintes = ENUMS.CONTRIBUINTES;

		vm.adicionar = function(resolve) {
			abrirPopup('cadastros/documentos/entrega-documentos/entrega-documentos-modal.html', resolve);
		};

		vm.documentos = [
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Pendente de recebimento' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem responsável' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
			{ descricao: 'Descricao', status: 'Sem processo relacionado' },
		]
		vm.itens = [
			{  id: 0, descricao: 'Pendente de recebimento', action: 'PENDENTERECEBIMENTO', documentos: [
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
			]},
			{  id: 1, descricao: 'Sem responsável', action: 'SEMRESPONSAVEL', documentos: [
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
			]},
			{  id: 2, descricao: 'Sem processo relacionado', action: 'SEMPROCESSO', documentos: [
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
				{ descricao: 'Descrição do subitem' },
			]},
		]

		vm.menu = vm.itens[0].action;

		vm.recebimentoTrib = function(resolve) {
			vm.tipoPend = resolve.tipoPend;
			vm.menu = resolve.menu;

			// vm._documento = _.filter(
			// 	vm.documentos, {action: resolve.menu}
			// )

			// console.log(vm._documento.documentos);
			
			// if (resolve.menu == 'PENDENTERECEBIMENTO') {
			// } else if (resolve.menu == 'SEMRESPONSAVEL') {
			// 	vm._documento = _.filter(
			// 		vm.itens, {action: resolve.menu}
			// 	)
			// }

			// vm.documentos = vm._pendentes;
		};

		function abrirPopup(templateUrl, resolve) {
			ModalCad.open({
				templateUrl: templateUrl,
				controller: 'CacadorModalCtrl as CacadorModalCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					 persistRemove: false
				})
			});
		}
	}

	//controller da modal
	angular.module('app').controller('CacadorModalCtrl', CacadorModalCtrl);

	CacadorModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function CacadorModalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.tipo = params.tipo;
	}
})();