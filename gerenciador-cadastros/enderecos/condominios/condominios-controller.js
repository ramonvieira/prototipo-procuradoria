(function () {

	angular.module('app')
	.service('CondominiosService', function($rootScope) {
		$rootScope.serviceDb('condominios')
	})
	.filter('condominios', function($filter, CondominiosService) {
		return function(input, selector) {
			return $filter('dataFilter')(input, 'condominios', selector ? selector : 'id')
		}
	})
	.directive('condominiosSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="sel__{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" bf-select2="selectOptions" id="sel__{{ID}}" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" ng-change="ngChange" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				class      : '@?',
				ngModel    : '=' ,
				ngChange   : '=' ,
				label      : '@?',
				ngRequired : '=' ,
				ngDisabled : '=' ,
				placeholder: '@?',
				multiple   : '=' ,
			},
			transclude: true,
			compile: compile,
			replace: true,
			controller: SelectCtrl,
		}

		function SelectCtrl($rootScope, $scope, $filter, CondominiosService, ImoveisService, $q) {
			var vm = $scope
			vm.ID = Date.now()

			vm.setPlaceholder = function() {
				if(vm.placeholder == undefined) {
					return null
				} else if(vm.placeholder == 'true') {
					return 'Encontre condomínios pelo código ou pelo nome.'
				} else {
					return vm.placeholder
				}
			}
		
			vm.selectOptions = {
				allowClear: $scope.ngRequired != true ? true : false,
				multiple: vm.multiple,
				data: {
					results: $filter('orderBy')($rootScope.condominios, 'nome'),
					text: function(item) {
						return item.nome;
					}
				},
				placeholder: vm.setPlaceholder(),
				formatValue: function(item){
					item = vm.multiple ? item : item.id
					return item
				},
				initSelection: function(element, callback) {
					$(element).val() != '' ? callback( $filter('condominios')($(element).val(), 'object') ) : null
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
					if (item.nome) {
						if (item.padrao) {
							return item.nome
						} else {
							return item.id + ' - ' + item.nome
						}
					} else {
						return item.text
					}
				},
				formatSelection: function(item){
					if (item.nome) {
						if (item.padrao) {
							return item.nome
						} else {
							return item.id + ' - ' + item.nome
						}
					} else {
						return item.text
					}
				},
			}
		}

		function compile(element, attrs) {
			if (attrs.hasOwnProperty('multiple')) {
				element.find('input').attr('multiple', true)
			}
		}
	})
	.directive('condominio', function($rootScope, CondominiosService) {
		return {
			restrict: 'E',
			template:'<span><span ng-if="!link">{{item.nome}}</span>' + 
					 '<a href="" ng-if="link" ng-click="adicionarCondominio(item)" keep-open>' +
					 '	{{item.nome}}' +
					 '</a></span>',
			required: 'ngModel',
			replace: true,
			scope: {
				class     : '@?',
				link      : '@?',
				condominio: '=' ,
			},
			controller: function($rootScope, $scope, arrecModal) {
				$scope.item = $rootScope.condominios.filter(function(item) {
					if (item.id == Number($scope.condominio)) {
						return item
					}
				})[0]

				$scope.adicionarCondominio = function(resolve) { arrecModal.open('imobiliario/condominio/condominios-modal.html', $scope, resolve, 'lg', 'CondominiosModalCtrl')};
			}
		}
	})
	.controller('CondominiosCtrl', ['$scope', 'arrecadacao.common.ModalCad', '$rootScope', 'CondominiosService',
		function($scope, ModalCad, $rootScope, CondominiosService) {
			var vm = $scope;

			$rootScope.$broadcast('nav-changed', {
				menu: 'Condomínios',
				title: 'Condomínios'
			})
		}
	])
	.controller('CondominiosModalCtrl', ['$scope', 'arrecModal', 'CamposAdicionaisService', '$modalInstance', 'db',
		function($scope, arrecModal, CamposAdicionaisService, $modalInstance, db) {
			var vm = $scope;

			console.log($modalInstance.params);
			vm.registro = $modalInstance.params
			
			vm.isEditing = vm.registro.id ? true : false
			vm.registro.anoCorrente = new Date().getFullYear()

			vm.camposAdicionais = CamposAdicionaisService.campos

			vm.addEndereco = function (resolve) {
				arrecModal.open("imobiliario/endereco/endereco-imovel-cad.html", $scope, resolve, 'lg', 'LocalizacaoCtrl');
			};

			vm.salvar = function(registro) {
				console.log(registro);
				delete registro.camposAdicionaisCompartilhados
				delete registro.camposAdicionaisNormal

				db.push('condominios', registro)
			}
		}
	]);
})();

