(function() {
  
angular.module('app').controller('PessoaJuridicaCtrl', PessoaJuridicaCtrl);

PessoaJuridicaCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', '$state', '$stateParams', 'ENUMS'];

function PessoaJuridicaCtrl($scope, ModalCad, $state, $stateParams, ENUMS) {

	var vm = $scope;

	vm.contribuintes = ENUMS.CONTRIBUINTES;
	vm.enderecoCompleto = ENUMS.ENDERECOCOMPLETO;
	vm.qualificacoes = ENUMS.QUALIFICACOES;

	vm.contribuinte = _.find(
		vm.contribuintes, {id: Number($stateParams.contribuinte)}
	)

	$scope.socios = [
		{
			id:1,
			nome: 'Ramon Vieira Viquetti',
			cpfCnpj: '000.000.000-00'
		},{
			id:2,
			nome: 'Betha Sistemas Ltda.',
			cpfCnpj: '85.838.117/0001-00'
		}
	]

	$scope.sociosOptions = {
		data: $scope.socios,
		formatResult: _formatSocios,
		formatSelection: _formatSociosSelection,
		allowClear: true
	}
	
	function _formatSociosSelection(item) {
		return "<div class='row bottom'>" +
			"<div class='col-md-12'>" + item.nome +
			'<small> (' + item.cpfCnpj + ')' +
			'</small> </div>' +
			'</div>';
	}
	
	function _formatSocios(item) {
		return "<div class='row bottom'>" +
			"<div class='col-md-12'>" + item.nome +
			'<br><small> CPF/CNPJ : ' + item.cpfCnpj + '</small>' +
			'</div>' +
			'</div>';
	}

	vm.alterarSituacao = function(b) {
		abrirPopupAlterarSituacao({
			pessoa: b
		});
	};

	function abrirPopupAlterarSituacao(resolve) {
		ModalCad.open({
			templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/situacao.html',
			controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
			scope: $scope,
			resolve: angular.extend(resolve, {
				persistRemove: false
			})
		});
	}   

	/*************************
	* Sócios
	*************************/
		vm.adicionarSocio = function(b) {
			abrirSocio({
				isEditing: b
			});
		};

		function abrirSocio(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/socio/socio-modal.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.socios = [
			{
				nome:'Ramon Vieira Viquetti',
				participacao:'50%'
			},{
				nome:'Camila Nart Gonçalves',
				participacao:'50%'
			}
		]

	/*************************
	* Conta Bancária
	*************************/
		vm.adicionarContaBancaria = function(b) {
			abrirContaBancaria({
				isEditing: b
			});
		};

		function abrirContaBancaria(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/conta-bancaria/conta-bancaria-modal.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
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
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.emails=[
			{
				email:'fulanodetal@gmail.com',
				descricao:'Pessoal'
			},{
				email:'fulanodetal@fulanosa.com',
				descricao:'Corporativo'
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
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.telefones=[
			{
				telefone:"(48)3435-5063",
				descricao:"---"
			},{
				telefone:"(48)3435-5064",
				descricao:"---"
			}
		]

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
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
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
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

	/*************************
	* Comentários
	*************************/

		vm.adicionarComentario= function(b) {
			abrirComentario({
				isEditing: b
			});
		};

		function abrirComentario(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/comentario/comentario.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
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
				anterior:"Empresa do Fulanoss",
				atual:'Empresa do Fulano'
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
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/campo-adicional.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
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
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/pessoa-juridica-modal.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

	/*************************
	* Movimentação Simples Nacional
	*************************/

		vm.adicionarMovimentacaoSimplesNacional= function(b) {
			abrirMovimentacaoSimplesNacional({
				isEditing: b
			});
		};

		function abrirMovimentacaoSimplesNacional(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/simples-nacional/movimentacao-simples-nacional-modal.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.movimentacaoSimples=[
			{
				optante:'Sim',
				dataInicial:'01/03/2018',
				dataEfeito:'02/03/2018',
				motivo:'Solicitação do contribuinte',
				orgao:'Municipal',
				observacoes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
		]

	/*************************
	* Movimentação MEI
	*************************/
		vm.adicionarMovimentacaoMEI= function(b) {
			abrirMovimentacaoMEI({
				isEditing: b
			});
		};

		function abrirMovimentacaoMEI(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/simples-nacional/movimentacao-mei-modal.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		}

		vm.movimentacaoMEI=[
			{
				MEI:'Sim',
				dataInicial:'01/03/2018',
				dataEfeito:'02/03/2018',
				motivo:'Solicitação do contribuinte',
				orgao:'Municipal',
				observacoes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
		]

	/*************************
	 * Eventos
	 *************************/
		vm.eventos=[
			{
				descricao:'Lorem ipsum dolor sit amet',
				dataInicial:'01/03/2018',
				dataFinal:'02/03/2020',
				dataEfeito:'02/03/2018',
				processo:'001',
				responsavel:'Fulano de Tal',
				dataOcorrencia:'05/03/2018',
				observacoes:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
			}
		]

	/*************************
	* Construtora
	*************************/

		vm.adicionarNovoConstrutoraLinkPessoa = function(b) {
			abrirPopupNovoConstrutoraLinkPessoa({
				isEditing: b
			});
		};

		function abrirPopupNovoConstrutoraLinkPessoa(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/perfil/construtora.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
				scope: $scope,
				resolve: angular.extend(resolve, {
					persistRemove: false
				})
			});
		} 

	/*************************
	* Gráfica
	*************************/
		vm.adicionarNovoGraficaLinkPessoa = function(b) {
			abrirPopupNovoGraficaLinkPessoa({
				isEditing: b
			});
		};

		function abrirPopupNovoGraficaLinkPessoa(resolve) {
			ModalCad.open({
				templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/perfil/grafica.html',
				controller: 'PessoaJuridicaCtrl as PessoaJuridicaCtrl',
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