(function() {
	angular.module('app')
	.controller('app.HeaderCtrl', ['$scope', 'arrecModal',
		function ($scope, arrecModal) {
			// $scope.produtos = [
			// 	{ nome: 'Frotas'     , categoria: 'com' },
			// 	{ nome: 'Ferramentas', categoria: 'gen' },
			// 	{ nome: 'Tributos'   , categoria: 'arr' },
			// 	{ nome: 'Escola'     , categoria: 'edu' },
			// 	{ nome: 'Legislativo', categoria: 'lei' },
			// 	{ nome: 'Custos'     , categoria: 'mun' },
			// 	{ nome: 'Saúde'      , categoria: 'sau' }
			// ];

			// $scope.relatorios = [ 
			// 	{ name: 'Relatório de pessoas', label: 'relatorio', icon: 'file-text', pinned: true }
			// ];

			// $scope.scripts = [ 
			// 	{ name: 'Controle de gastos', label: 'controle-gastos', icon: 'code', pinned: true }
			// ];

			// $scope.consultas = [
			// 	{ name: 'Controle de gastos', label: 'controle-gastos', icon: 'code', pinned: true },
			// 	{ name: 'Controle de gastos', label: 'controle-gastos', icon: 'code', pinned: true }
			// ];

			$scope.recursos = [
				{ name: 'Tipos de movimentação processual' , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Tipos de documento digital'       , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Tipos de participação'            , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Tipos de custas processuais'      , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Tipos de petição intermediária'   , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Feriados'                         , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Tipos de tarefas'                 , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Sistemas de protesto'             , label: 'controle-gastos', icon: 'list-alt', pinned: true },
				{ name: 'Categoria de bens penhoráveis'    , label: 'controle-gastos', icon: 'list-alt', pinned: true }
			];

			$scope.cadastrosAuxiliares = function(resolve) {
				arrecModal.open('gerenciador-cadastros/cadastros-auxiliares/cadastros-auxiliares.html', $scope, resolve, 'xxl', 'CadastrosAuxiliaresCtrl')
			};
		}
	])
})();