(function() {

		angular.module('app').controller('CentralConfiguracoesCtrl', CentralConfiguracoesCtrl);

		CentralConfiguracoesCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

		function CentralConfiguracoesCtrl($scope, ModalCad) {

			var vm = $scope;

		vm.cadastros = [
			{ id: 0 , descricao: 'Documentos'                  , sref: 'main.centralConfiguracoes.config-documentos'                    },
			{ id: 1 , descricao: 'Execuções fiscais'           , sref: 'main.centralConfiguracoes.config-execucoes-fiscais'             },
			{ id: 2 , descricao: 'Integrações de protestos'    , sref: 'main.centralConfiguracoes.config-integracoes-protestos'         },
			{ id: 3 , descricao: 'Assinaturas'                 , sref: 'main.centralConfiguracoes.config-assinaturas'                   },
	];

			var view = -1;

			vm.setView = function(i){
				view = i
			}

			/* vm.isCurrentView = function(i){
				return i.id == view.id;
			}

			vm.getCurrentView = function(key){
				return view != -1 ? view[key] : view;
			} */

			vm.linhas = [
				{id: 1, tipo: 1, referente: 'Imóveis'},
				{id: 2, tipo: 2, referente: 'Econômicos'},
			];

			vm.integracoesLancamentos = [
						{
							item: 'Crédito tributário não inscrito em dívida ativa'
						},
						{
							item: 'Crédito tributário inscrito em dívida ativa'
						},
						{
							item: 'Isenções concedidas'
						},
						{
							item: 'Imunidades'
						},
						{
							item: 'Remissões'
						},
						{
							item: 'Cancelamentos'
						}
					]

			vm.itens = [
				{id: 1, star:false},
				{id: 2, star:false},
				{id: 3, star:false}
			]

			vm.setStar = function setStar(item) {

				vm.itens.forEach(function (i) {
					i.star = false;
				});

				item.star = true;
				
			}

			vm.tipoAssinatura = 'MULTIPLA'

		}

		//controller da modal
		angular.module('app').controller('CentralConfiguracoesModalCtrl', CentralConfiguracoesModalCtrl);

		CentralConfiguracoesModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

		function CentralConfiguracoesModalCtrl($scope, ModalCad, params) {

		}

})();