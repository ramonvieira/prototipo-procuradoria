(function () {

	angular.module('app')
	.controller('ProfissionaisCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'ENUMS', 'GrupoProfissionaisService',
		function($scope, ModalCad, ENUMS, GrupoProfissionaisService) {

			var vm = $scope;

			vm.contribuintes = ENUMS.CONTRIBUINTES;
			vm.procuradores = ENUMS.PROCURADORES;
			vm.grupos = GrupoProfissionaisService.grupos;
			vm.estados = ENUMS.ESTADOS;

			vm.tiposAusencia = ["Provisória", "Definitiva"]

			vm.adicionar = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/profissionais/profissionais-modal.html', resolve)
			};
			
			vm.grupoDeTrabalho = function(resolve) {
				ModalCad.open({
					templateUrl:'gerenciador-cadastros/pessoas/grupo-profissionais/grupo-modal-externo.html',
					controller: 'GrupoProfissionaisCtrl as GrupoProfissionaisCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			};

			vm.atribuicoesProfiss = function(resolve) {
				abrirPopup('acompanhamento/atribuicoes-modal.html', resolve)
			};

			vm.excluir = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/profissionais/remover-profissional-modal.html', resolve);
			};

			vm.pessoas = [
				{ tipo: "Processos", atribuicoes: [
						{ status: "Em tramitação", qtdExec: "8", qtdCont: "7", qtdAdm: "6", qtdProt: ""},
						{ status: "Suspensas"    , qtdExec: "8", qtdCont: "7", qtdAdm: "6", qtdProt: ""},
						{ status: "Canceladas"   , qtdExec: "8", qtdCont: "7", qtdAdm: "6", qtdProt: ""},
						{ status: "Concluídas"   , qtdExec: "8", qtdCont: "7", qtdAdm: "6", qtdProt: ""}
					]
				},
				{ tipo: "Protestos", atribuicoes: [
						{ status: "Distribuição" , qtdExec: "", qtdCont: "", qtdAdm: "", qtdProt: "5"},
						{ status: "Inconsistente", qtdExec: "", qtdCont: "", qtdAdm: "", qtdProt: "5"},
						{ status: "Concluído"    , qtdExec: "", qtdCont: "", qtdAdm: "", qtdProt: "5"},
						{ status: "Retirado"     , qtdExec: "", qtdCont: "", qtdAdm: "", qtdProt: "5"},
						{ status: "Negociação"   , qtdExec: "", qtdCont: "", qtdAdm: "", qtdProt: "5"}
					]
				}
			];

			vm.gruposDoProfissional = function(profissional) {
				var grupos = []
				angular.forEach(vm.grupos, function (grupo) {
					angular.forEach(grupo.procuradores, function (procurador) {
						procurador.proc == profissional ? grupos.push(grupo) : null
					})
				})
				return grupos
			}
			
		function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'ProfissionaisModalCtrl as ProfissionaisModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])
	.controller('ProfissionaisModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', 'ENUMS',
		function($scope, ModalCad, params, ENUMS) {

			var vm = $scope;
			vm.estados = ENUMS.ESTADOS;
			vm.registro = params.procurador

			// vm.registro.id != undefined ? vm.registro.gruposAss = [] : null
			// angular.forEach(vm.gruposDoProfissional(vm.registro.id), function (grupo) {
			// 	vm.registro.gruposAss.push(grupo.id)
			// })

			vm.adicionarAusencia = function(resolve) {
				abrirPopup('gerenciador-cadastros/pessoas/profissionais/ausencias-modal.html', resolve)
			};

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'ProfissionaisAusenciasModalCtrl as ProfissionaisAusenciasModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			}
		}
	])
	.controller('ProfissionaisAusenciasModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'params', 'ENUMS',
		function($scope, ModalCad, params, ENUMS) {

			var vm = $scope;
			vm.ausencia = params.ausencia
			vm.procuradores = ENUMS.PROCURADORES

			vm.openGrupo = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/grupo-profissionais/grupo-modal.html',
					controller: 'GrupoProfissionaisModalCtrl as GrupoProfissionaisModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			};

			vm.verificaGrupos = function() {
				console.log('entrou');
				
				angular.forEach(vm.gruposDoProfissional, function(obj, index) {
					console.log(obj);
					setTimeout(function(){
						obj.apto = true
					}, 1000);
				});
			}

			vm.salvaAusencias = function (ausencia) {
				if(!vm.registro.ausencias) { registro.ausencias = new Array }
				vm.registro.ausencias.push(ausencia)
			}
		}
	])
})();