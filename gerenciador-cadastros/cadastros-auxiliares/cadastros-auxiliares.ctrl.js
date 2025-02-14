(function () {

	angular.module('app')
	.controller('CadastrosAuxiliaresCtrl', ['$scope', '$modalInstance', '$rootScope',
		function($scope, $modalInstance, $rootScope) {

			var vm = $scope;
			$rootScope.$broadcast('nav-changed', {
				menu: 'Cadastros auxiliares',
				title: 'Cadastros auxiliares'
			})

			vm.cadastros = [
				{ descricao: 'Categoria de bens penhoráveis', src:"gerenciador-cadastros/cadastros-auxiliares/categoria-bens/categoria-bens.html", ctrl: 'CategoriaBensCtrl'},
				{ descricao: 'Tipos de movimentação processual'  , src:"gerenciador-cadastros/cadastros-auxiliares/tipo-movimentacao-processual.html", ctrl: ''},
				{ descricao: 'Tipos de documento digital'        , src:"gerenciador-cadastros/cadastros-auxiliares/tipo-documento-digital.html", ctrl: ''},
				{ descricao: 'Tipos de participação'             , src:"gerenciador-cadastros/cadastros-auxiliares/tipo-participacao.html", ctrl: ''},
				{ descricao: 'Tipos de custas processuais'       , src:"gerenciador-cadastros/cadastros-auxiliares/tipo-custas-processuais.html", ctrl: ''},
				{ descricao: 'Tipos de petição intermediária'    , src:"gerenciador-cadastros/cadastros-auxiliares/tipo-peticao-intermediaria.html", ctrl: ''},
				{ descricao: 'Feriados'                          , src:"gerenciador-cadastros/cadastros-auxiliares/feriados/feriados.html", ctrl: ''},
				{ descricao: 'Tipos de tarefas'                  , src:"gerenciador-cadastros/cadastros-auxiliares/tipos-tarefas.html", ctrl: ''},
				{ descricao: 'Sistemas de protesto'              , src:"gerenciador-cadastros/cadastros-auxiliares/sistemas-protesto.html", ctrl: ''},
			]

			vm.path = vm.cadastros.find(cadastro => cadastro.descricao == $modalInstance.params.name).src

			vm.setPath = function(cad) {
				vm.path = cad.src
			}
		}
	])
	.controller('CadastrosAuxiliaresModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params',
		function($scope, ModalCad, params) {
			var vm = $scope;
			vm.tipo = params.tipo;
		}
	])
})();