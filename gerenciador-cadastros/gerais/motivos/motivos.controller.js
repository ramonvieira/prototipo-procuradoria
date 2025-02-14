(function() {
	'use strict';

	angular.module('app')
		.controller('TributosCoreMotivosCtrl', TributosCoreMotivosCtrl);

	TributosCoreMotivosCtrl.$inject = ['$scope', '$injector'];

	function TributosCoreMotivosCtrl($scope, $injector) {

		var viewModel = $scope;

		var ModalCad = $injector.get('bfc.dialog.Dialog');

		var propriedadesPublicas = {
			open: _open
		};

		_.extend(viewModel, propriedadesPublicas);

		function _open(id) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/gerais/motivos/motivos.cad.html',
				controller: function() {}
			});
		}

	}
})();