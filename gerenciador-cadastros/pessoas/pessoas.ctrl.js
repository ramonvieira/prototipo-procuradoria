(function () {

	angular.module('app')
	.controller('PessoasCtrl', ['$scope', 'arrecadacao.common.ModalCad', '$state', '$stateParams', 'ENUMS',
		function($scope, ModalCad, $state, $stateParams, ENUMS) {
			var vm = $scope;

			vm.contribuintes = ENUMS.CONTRIBUINTES;
			vm.enderecoCompleto = ENUMS.ENDERECOCOMPLETO;
			vm.qualificacoes = ENUMS.QUALIFICACOES;
			
			vm.adicionar = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/contribuintes-modal.html', resolve);
			};
			
			vm.addEndereco = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/endereco/endereco-modal.html', resolve);
			};
			
			vm.addTelefone = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/telefone/telefone-modal.html', resolve);
			};
			
			vm.addEmail = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/email/email-modal.html', resolve);
			};

			vm.editar = function(resolve) {
				if (resolve.contribuinte.tipoPessoa == 'Física') {
					$state.go('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-fisica.dados-pessoais',{contribuinte: resolve.contribuinte.id});
				} else {
					$state.go('main.gerenciadorCadastros.pessoas.contribuintes.pessoa-juridica.dados-gerais',{contribuinte: resolve.contribuinte.id});
				}
			};

			vm.cadastros = [
				{ id: 1, descricao: 'Contribuintes'             , caminho: 'main.gerenciadorCadastros.pessoas.contribuintes.contribuinte' },
				{ id: 2, descricao: 'Cartórios'                 , caminho: 'main.gerenciadorCadastros.pessoas.cartorios'                  },
				{ id: 3, descricao: 'Referentes'                , caminho: 'main.gerenciadorCadastros.pessoas.referentes'                 },
				// { id: 4, descricao: 'Procuradores e assessores' , caminho: 'main.gerenciadorCadastros.pessoas.profissionais'              },
				// { id: 5, descricao: 'Grupos de trabalho'        , caminho: 'main.gerenciadorCadastros.pessoas.grupo-profissionais'        },
				{ id: 6, descricao: 'Profissionais/Grupos de trabalho'             , caminho: 'main.gerenciadorCadastros.pessoas.profissionaisNovo'          },
				// { id: 7, descricao: 'Advogados'                 , caminho: 'main.gerenciadorCadastros.pessoas.advogados'                  },
			]

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'PessoasModalCtrl as PessoasModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.contribuinte = _.find(
				vm.contribuintes, {codigo: Number($stateParams.contribuinte)}
			)
			
			vm.graficas = [
				{ contribuinte:'Ramon Vieira Viquetti', cpfCnpj:'16.573.858/9453-50', liberada: 'Não' },
				{ contribuinte:'Marciano Buzzanello'  , cpfCnpj:'83.429.727/1375-02', liberada: 'Sim' },
			]

			vm.openLiberacao = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/grafica/liberar-grafica.html', resolve);
			};

			vm.removerGrafica = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/contribuintes/grafica/remover-grafica.html', resolve);
			};
		}
	])
	.controller('PessoasModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params',
		function($scope, ModalCad, params) {
			var vm = $scope;
			vm.grafica = params.contribuinte;
			vm.isEditing = params.isEditing;
			vm.tipoSelecionado = params.tipoSelecionado;
			vm.contribuinteEdit = params.contribuinteEdit;

			vm.tipo = params.tipo
		}
	])
})();