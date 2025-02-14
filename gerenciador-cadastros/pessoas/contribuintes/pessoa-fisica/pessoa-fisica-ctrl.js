(function() {

angular.module('app').controller('PessoaFisicaCtrl', PessoaFisicaCtrl);
	
PessoaFisicaCtrl.$inject = ['$scope', '$rootScope', 'arrecadacao.common.ModalCad', '$state', '$stateParams', 'ENUMS'];
	
function PessoaFisicaCtrl($scope, $rootScope, ModalCad, $state, $stateParams, ENUMS) {

	var vm = $scope;

	vm.contribuintes = ENUMS.CONTRIBUINTES;
	vm.enderecoCompleto = ENUMS.ENDERECOCOMPLETO;
	
	vm.contribuinte = _.find(
		vm.contribuintes, {id: Number($stateParams.contribuinte)}
	)
	
	vm.alterarSituacao = function(b) {
		abrirPopupAlterarSituacao({
			pessoa: b
		});
	};

	function abrirPopupAlterarSituacao(resolve) {
		ModalCad.open({
			templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/situacao.html',
			controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
			scope: $scope,
			resolve: angular.extend(resolve, {
				persistRemove: false
			})
		});
	}

	/*************************
	* Endereço
	*************************/

		vm.adicionarEndereco= function(b) {
			abrirEndereco({
				isEditing: b
			});
		};

		function abrirEndereco(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/endereco/endereco-modal.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}
		
		vm.enderecos=[
			{
				endereco:"Rua Antônio Nart, 240, Alto Rio Maina - Siderópolis - SC (Brasil)"
			},{
				endereco:"Rua Rodolfo Hickel, 230, Canasvieiras - Florianópolis - SC (Brasil)"
			}
		]
	/*************************
	* Telefone
	*************************/

		vm.adicionarTelefone = function(b) {
				abrirTelefone({
					isEditing: b
				});
			};

			function abrirTelefone(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/telefone/telefone-modal.html',
					controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.telefones=[
				{
					telefone:"(48)99638-6774",
					descricao:"---"
				},{
					telefone:"(48)3435-5064",
					descricao:"---"
				}
			]


	/*************************
	* Filiação
	*************************/
		vm.adicionarFiliacao = function(b) {
			abrirFiliacao({
				isEditing: b
			});
		};

		function abrirFiliacao(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/filiacao/filiacao-modal.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.filiacao = [
			{
				nome:'Rita Maria Nart Gonçalves',
				parentesco:'Mâe'
			},{
				nome:'Nilzo Gonçalves',
				parentesco:'Pai'
			},{
				nome:'Valmira Darolt Nart',
				parentesco:'Tutor'
			}
		]
	
		/*************************
		* E-mail
		*************************/
			vm.adicionarEmail = function(b) {
				abrirEmail({
					isEditing: b
				});
			};

			function abrirEmail(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/email/email-modal.html',
					controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}

			vm.emails=[
				{
					email:'gabrielanart@gmail.com',
					descricao:'Pessoal'
				},{
					email:'gabriela.goncalves@betha.com.br',
					descricao:'Corporativo'
				}
			]

	/*************************
	* Conta bancária
	*************************/

		vm.adicionarContaBancaria = function(b) {
			abrirContaBancaria({
				isEditing: b
			});
		};

		function abrirContaBancaria(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/conta-bancaria/conta-bancaria-modal.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.contaBancaria = [
			{
				banco:'Banco do Brasil',
				agencia:'000045-4',
				conta:'101652-4'
			},{
				banco:'Banco Santander',
				agencia:'225896-4',
				conta:'135842-4'
			}
		]

	/*************************
	* Averbação
	*************************/
		vm.adicionarAverbacao= function(b) {
			abrirAverbacao({
				isEditing: b
			});
		};

		function abrirAverbacao(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/averbacao/averbacao.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

	/*************************
	* Comentário
	*************************/
		vm.adicionarComentario= function(b) {
			abrirComentario({
				isEditing: b
			});
		};

		function abrirComentario(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/comentario/comentario.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.comments=[
			{
				nome:'Ramon Vieira Viquetti',
				user:'@ramon.viquetti',
				comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut ipsum non est tincidunt gravida quis a felis. Quisque ut gravida sem, et hendrerit massa. Aliquam condimentum orci sit amet quam vestibulum efficitur.Vestibulum fringilla ultrices dolor, sit amet maximus lorem porta vitae. Ut varius interdum efficitur. Mauris ultricies est vitae sem maximus, eu rutrum eros faucibus. Aenean gravida ex sed turpis luctus, tincidunt porttitor ipsum hendrerit.',
				photo:'images/gabriela.jpg'
			},{
				nome:'Luis Eduardo Salgado Costa',
				user:'@luis.costa',
				comment: 'Nullam commodo dui non fringilla malesuada.',
				photo:'images/avatar.png'
			},{
				nome:'Ramon Vieira Viquetti',
				user:'@ramon.viquetti',
				comment: 'Nam mollis id justo a fringilla. Duis nec lobortis nibh, ut faucibus mi. Aliquam faucibus lobortis felis, nec maximus dolor tempus et. Aliquam erat volutpat.',
				photo:'images/gabriela.jpg'
			},{
				nome:'Luis Eduardo Salgado Costa',
				user:'@luis.costa',
				comment: 'Vestibulum commodo dui vitae diam finibus, ut imperdiet ante lacinia.',
				photo:'images/avatar.png'
			}
		]

	/*************************
	* Histórico
	*************************/
		vm.historico=[
			{
				dia:'Hoje',
				hora:'16:57:37 - 2018',
				usuario: '@ramon.viquetti',
				tipo:'Alteração de nome',
				anterior:"Gabriela Narti Gonçalves",
				atual:'Ramon Vieira Viquetti'
			},{
				dia:'14/03',
				hora:'16:57:37 - 2018',
				usuario: '@ramon.viquetti',
				tipo:'Alteração de nome',
				anterior:"Gabriela Narti Goncalves",
				atual:'Gabriela Narti Gonçalves'
			}
		]

	/*************************
	* Campos adicionais
	*************************/
		vm.editarCamposAdicionais= function(b) {
			abrirCamposAdicionais({
				isEditing: b
			});
		};

		function abrirCamposAdicionais(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/campo-adicional.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

	/*************************
	* Dados principais
	*************************/

		vm.editarDadosPrincipais= function(b) {
			abrirDadosPrincipais({
				isEditing: b
			});
		};

		function abrirDadosPrincipais(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-fisica/pessoa-fisica-modal.html',
				controller: 'PessoaFisicaCtrl as PessoaFisicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		$scope.$watch("viewContentLoaded", function() {
		});
	} 
	  
})();