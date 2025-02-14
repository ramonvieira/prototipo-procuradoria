(function () {

	angular.module('app')
	.service('ProfissionaisService', function($rootScope, $filter) {
		$rootScope.serviceDb('profissionais')

		$rootScope.profissionais.forEach(profissional => {
			profissional.ausente = false
			if(profissional.ausencias) {
				profissional.ausencias.forEach(ausencia => {
					ausencia.dataInicial = $filter('arrecDate')(ausencia.dataInicial)
					ausencia.dataTermino = $filter('arrecDate')(ausencia.dataTermino)
	
					if(moment(new Date()).isBetween(
						$filter('arrecDate')(ausencia.dataInicial, "YYYY-MM-DD"),
						$filter('arrecDate')(ausencia.dataTermino, "YYYY-MM-DD"),
					'days', '[]')) {
						profissional.ausente = {
							dataInicial: $filter('arrecSaveDate')(ausencia.dataInicial),
							dataTermino: $filter('arrecSaveDate')(ausencia.dataTermino)
						}
					}

					if(profissional.profissional === 21) {
						ausencia.vencida = !moment(new Date()).isAfter(ausencia.dataTermino)
					}
				})
			}
		})

		var procuradores = $rootScope.profissionais.filter(prof => { return prof.funcao == 'Procurador'})
		return {
			profissionais: $rootScope.profissionais,
			procuradores: procuradores
		}
	})
	.filter('profissionais', function($filter, ProfissionaisService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'profissionais', selector ? selector : 'descricao')
		}
	})
	.directive('profissionaisSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				allowSearchParts: '=',
				placeholder: '@?',
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: function($scope, $filter, ProfissionaisService) {
				var vm = $scope
			
				vm.selectOptions = {
					allowClear: $scope.ngRequired != true ? true : false,
					multiple: vm.multiple,
					data: $filter('orderBy')(ProfissionaisService.profissionais, 'descricao'),
					placeholder: false,
					formatValue: function(item){
						item = vm.multiple ? item : item.id
						return item
					},
					initSelection: function(element, callback) {
						var id = Number($(element).val());
						if (id > 0) {
							callback( $filter('profissionais')(id, 'object') )
						}
					},
					createSearchChoice: function(term, data) {
						if (vm.allowSearchParts) {
							if ($(data).filter(
								function() {
									return this.text.localeCompare(term)===0;
								}
							).length===0) {
								return { id:term, text:term };
							}
						} else {
							return false
						}
					},
					formatResult: function(item){
						return $filter('contribuintes')(item.procurador) + ' <small class="text-muted">(' + item.funcao + ')</small>'
					},
					formatSelection: function(item){
						return $filter('contribuintes')(item.procurador) + ' <small class="text-muted">(' + item.funcao + ')</small>'
					},
				}
			}
		}
	})
	.directive('procuradoresSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				allowSearchParts: '=',
				placeholder: '@?',
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: function($scope, $filter, ProfissionaisService) {
				var vm = $scope
				var profissionais = $filter('orderBy')(ProfissionaisService.profissionais, 'descricao')
				var procuradores = profissionais.filter(prof => { return prof.funcao == 'Procurador'})
			
				vm.selectOptions = {
					allowClear: $scope.ngRequired != true ? true : false,
					multiple: vm.multiple,
					data: procuradores,
					placeholder: false,
					formatValue: function(item){
						item = vm.multiple ? item : item.id
						return item
					},
					initSelection: function(element, callback) {
						var id = Number($(element).val());
						if (id > 0) {
							callback( $filter('profissionais')(id, 'object') )
						}
					},
					createSearchChoice: function(term, data) {
						if (vm.allowSearchParts) {
							if ($(data).filter(
								function() {
									return this.text.localeCompare(term)===0;
								}
							).length===0) {
								return { id:term, text:term };
							}
						} else {
							return false
						}
					},
					formatResult: function(item){
						return $filter('contribuintes')(item.procurador)
					},
					formatSelection: function(item){
						return $filter('contribuintes')(item.procurador)
					},
				}
			}
		}
	})
	.directive('assessoresSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				allowSearchParts: '=',
				placeholder: '@?',
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: function($scope, $filter, ProfissionaisService) {
				var vm = $scope
				var profissionais = $filter('orderBy')(ProfissionaisService.profissionais, 'descricao')
				var assessores = profissionais.filter(prof => { return prof.funcao == 'Assessor'})
			
				vm.selectOptions = {
					allowClear: $scope.ngRequired != true ? true : false,
					multiple: vm.multiple,
					data: assessores,
					placeholder: false,
					formatValue: function(item){
						item = vm.multiple ? item : item.id
						return item
					},
					initSelection: function(element, callback) {
						var id = Number($(element).val());
						if (id > 0) {
							callback( $filter('profissionais')(id, 'object') )
						}
					},
					createSearchChoice: function(term, data) {
						if (vm.allowSearchParts) {
							if ($(data).filter(
								function() {
									return this.text.localeCompare(term)===0;
								}
							).length===0) {
								return { id:term, text:term };
							}
						} else {
							return false
						}
					},
					formatResult: function(item){
						return $filter('contribuintes')(item.procurador)
					},
					formatSelection: function(item){
						return $filter('contribuintes')(item.procurador)
					},
				}
			}
		}
	})
	.directive('administradoresSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="{{ngModel}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="{{ngModel}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class: '@?',
				ngModel: '=',
				ngChange: '=',
				label: '@?',
				multiple: '=',
				ngRequired: '=',
				ngDisabled: '=',
				allowSearchParts: '=',
				placeholder: '@?',
				filter: '=',
			},
			transclude: true,
			replace: true,
			controller: function($scope, $filter, ProfissionaisService) {
				var vm = $scope
				var profissionais = $filter('orderBy')(ProfissionaisService.profissionais, 'descricao')
				var administradores = profissionais.filter(prof => { return prof.funcao == 'Administrador'})
			
				vm.selectOptions = {
					allowClear: $scope.ngRequired != true ? true : false,
					multiple: vm.multiple,
					data: administradores,
					placeholder: false,
					formatValue: function(item){
						item = vm.multiple ? item : item.id
						return item
					},
					initSelection: function(element, callback) {
						var id = Number($(element).val());
						if (id > 0) {
							callback( $filter('profissionais')(id, 'object') )
						}
					},
					createSearchChoice: function(term, data) {
						if (vm.allowSearchParts) {
							if ($(data).filter(
								function() {
									return this.text.localeCompare(term)===0;
								}
							).length===0) {
								return { id:term, text:term };
							}
						} else {
							return false
						}
					},
					formatResult: function(item){
						return $filter('contribuintes')(item.procurador)
					},
					formatSelection: function(item){
						return $filter('contribuintes')(item.procurador)
					},
				}
			}
		}
	})
	.controller('ProfissionaisNovoCtrl', ['$scope', 'arrecadacao.common.ModalCad', 'arrecModal', 'ENUMS', 'GrupoProfissionaisService', 'ProfissionaisService', 'db',
		function($scope, ModalCad, arrecModal, ENUMS, GrupoProfissionaisService, ProfissionaisService, db) {
			var vm = $scope;

			vm.profissionais = ProfissionaisService.profissionais
			vm.procuradores = ProfissionaisService.procuradores;
			vm.grupos = GrupoProfissionaisService.grupos;
			vm.areas = ENUMS.AREAS;

			vm.tiposAusencia = ["Provisória", "Definitiva"]

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
			
			vm.adicionar = function(resolve) {
				arrecModal.open('gerenciador-cadastros/pessoas/profissionais-novo/profissionais-modal.html', $scope, resolve, 'lg', 'ProfissionaisNovoModalCtrl')
			};
			
			vm.adicionarMembros = function(resolve) {
				arrecModal.open('gerenciador-cadastros/pessoas/grupo-profissionais/membros-modal.html', $scope, resolve, 'lg', 'ProfissionaisNovoModalCtrl')
			};
			vm.removerProfissional = function(resolve) {
				arrecModal.open('gerenciador-cadastros/pessoas/grupo-profissionais/remover-profissional-grupo-modal.html', $scope, resolve, 'lg', 'ProfissionaisNovoModalCtrl')
			};
			
			vm.openGrupo = function(resolve) {
				arrecModal.open('gerenciador-cadastros/pessoas/profissionais-novo/grupo-modal.html', $scope, resolve, 'lg', 'GruposNovoModalCtrl')
			};

			vm.isAusente = function(procId) {
				console.log(procId);
				var proc = vm.procuradores.find(procurador => procurador.id == procId)
				var ausente
				angular.forEach(proc.ausencias, function(ausencia) {
					ausente = ausencia.ausente ? true : false
				})
				return ausente
			}

			vm.gruposDoProfissional = function(profissional) {
				var grupos = []
				angular.forEach(vm.grupos, function (grupo, grupoIndex) {
					angular.forEach(grupo.procuradores, function (procurador) {
						procurador.proc == profissional ? grupos.push(grupo) : null
					})
				})
				return grupos
			}

			vm.excluir = function(registro) {
				db.delete('profissionais', registro)
			}
		}
	])
	.controller('ProfissionaisNovoModalCtrl', ['$scope', 'arrecModal', '$modalInstance', 'ENUMS', 'db', '$filter',
		function($scope, arrecModal, $modalInstance, ENUMS, db, $filter) {
			var vm = $scope;
			vm.estados = ENUMS.ESTADOS;
			vm.isEditing = _.isEmpty($modalInstance.params.registro) ? false : true
			vm.registro = $modalInstance.params.registro
			vm.contribuintes = ENUMS.CONTRIBUINTES

			if(!vm.isEditing) {
				vm.registro = {
					advogadosResponsaveis: [{}]
				}
			}

			vm.adicionarAusencia = function(resolve) {
				resolve.newScope = true
				arrecModal.open('gerenciador-cadastros/pessoas/profissionais-novo/ausencias-modal.html', $scope, resolve, 'sm', 'ProfissionaisAusenciasNovoModalCtrl')
			};
			
			vm.salvarAusencia = function(ausencia, isEditing) {
				console.log(ausencia, isEditing);
				if (isEditing) {
					var AUSENCIA_SALVA = vm.registro.ausencias.find(aux => aux.id == ausencia.id)
					console.log(AUSENCIA_SALVA);
					AUSENCIA_SALVA = ausencia
					console.log(AUSENCIA_SALVA);
				} else {
					ausencia.id = Date.parse(new Date())
					if(!vm.registro.ausencias) { vm.registro.ausencias = [] }
					vm.registro.ausencias.push(ausencia)
				}
			};

			vm.salvar = function(registro) {
				if(registro.ausencias) {
					console.log(registro.ausencias);
					registro.ausencias.forEach(ausencia => {
						console.log(ausencia);
						ausencia.dataInicial = $filter('arrecSaveDate')(ausencia.dataInicial)
						ausencia.dataTermino = $filter('arrecSaveDate')(ausencia.dataTermino)
						console.log(ausencia);
					})
				}

				db.push('profissionais', registro)
			}
		}
	])
	.controller('ProfissionaisAusenciasNovoModalCtrl', ['$scope', 'arrecModal', '$modalInstance', '$filter',
		function($scope, arrecModal, $modalInstance, $filter) {
			var vm = $scope;
			vm.ausencia = $modalInstance.params
			vm.ausencia.dataInicial = $filter('restoreDate')(vm.ausencia.dataInicial)
			vm.ausencia.dataTermino = $filter('restoreDate')(vm.ausencia.dataTermino)
			console.log(vm.ausencia);
			vm.isEditing = vm.ausencia.id ? true : false

			vm.salvar = function(ausencia) {
				console.log(vm.isEditing, ausencia);
				console.log($modalInstance);
				$scope.$parent.salvarAusencia(ausencia, vm.isEditing)
			}
		}
	])
	.controller('GruposNovoModalCtrl', ['$scope', 'arrecModal', '$modalInstance', '$modalInstance', 'ENUMS',
		function($scope, arrecModal, $modalInstance, ENUMS) {
			var vm = $scope;
			vm.estados = ENUMS.ESTADOS;
			vm.isEditing = _.isEmpty($modalInstance.params.registro) ? false : true
			if($modalInstance.params.registro == null) {
				vm.registro = []
				vm.registro.procuradores = [{}]
			} else {
				vm.registro = angular.copy($modalInstance.params.registro)
			}

			vm.removerProfissional = function(resolve) {
				ModalCad.open({
					templateUrl: 'gerenciador-cadastros/pessoas/profissionais-novo/remover-profissional-grupo-modal.html',
					controller: 'RemoverProfGruposNovoModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
			};

			vm.salvar = function(registro) {
				angular.forEach(registro.procuradores, function(procurador, index) {
					vm.registro.procuradores[index].proc = procurador.proc.id
				})
				if(vm.isEditing) {
					vm.grupos[pos(vm.grupos, registro)] = vm.registro
				} else {
					vm.grupos.push(vm.registro)
				}
			}

			function pos(array, item, propArray, propItem) {
				return array.map(function (e) {
					return eval('e.'+ (propArray ? propArray : 'id') );
				}).indexOf(eval('item.'+ (propItem ? propItem : 'id')));
			}
		}
	])
	.controller('RemoverProfGruposNovoModalCtrl', ['$scope', 'arrecadacao.common.ModalCad', '$modalInstance', 'ENUMS',
		function($scope, ModalCad, $modalInstance, ENUMS) {
			var vm = $scope;
			vm.isEditing = _.isEmpty($modalInstance.params.registro) ? false : true
			if($modalInstance.params.registro == null) {
				vm.registro = []
				vm.registro.procuradores = [{}]
			} else {
				vm.registro = angular.copy($modalInstance.params.registro)
				vm.procurador = $modalInstance.params.procurador.proc.procurador.nome
			}
		}
	])
})();