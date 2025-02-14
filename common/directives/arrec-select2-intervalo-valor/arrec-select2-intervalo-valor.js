(function () {
	angular.module('app')
	.directive('intervaloValorSelect', function() {
		return {
			restrict: 'E',
			template: `
				<div class="select2-container">
					<label ng-if="label" for="sel_{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" id="sel_{{ID}}" bf-select2="optionsSelect" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" />
				</div>
			`,
			required: 'ngModel',
			scope: {
				ngModel              : '='  ,
				ngChange             : '='  ,
				ngRequired           : '='  ,
				ngDisabled           : '='  ,
				label                : '@?' ,
				exemploIntervalo     : '@?' ,
				multiple             : '='  ,
				placeholder          : '@?' ,
			},
			transclude: true,
			replace: true,
			controller: function($scope, $element, $filter, faixaValoresService) {
				$scope.ID = Date.now()
				var vm = $scope

				vm.valores = [1000,3000,5000];

				function setValoresDescription(valores) {
					var VALORES = []
					valores.forEach((val, index) => {
						var VALOR = $filter('currency')(val)
						var DESC =	index == 0 ? 'Até ' + VALOR : 'De ' + $filter('currency')(vm.valores[index-1] + 0.01) + ' até ' + VALOR
					
						VALORES.push({id: index, descricao: DESC})
						if(index == valores.length-1) {
							VALORES.push({id: index+1, descricao: 'Acima de ' + VALOR})
						}
					})
	
					return VALORES
				}
	
				vm.valoresDescription = setValoresDescription(vm.valores)

				function formatValor(valor) {
					valor = valor.replace(/,/ig, '.')

					var parts = valor.split(".")

					if(parts.length > 1) {
						var intPart = parts.slice(0, -1).join("")
						var decimalPart = parts.slice(-1)
						valor = intPart + '.' + decimalPart
					}

					return Number(valor)
				}

				function formatCreateSearchChoice(item) {
					var TEXT = null
					if((/\-/g.test(item))) {//Se tiver TRAÇO
						console.log('tem traço');
						
						if(/\d\-\d/g.test(item)) {
							var intervalo = item.split('-')
							console.log(intervalo);
	
							if(formatValor(intervalo[0]) < formatValor(intervalo[1]) ) {
								TEXT = 'Adicionar intervalo'
							} else {
								TEXT = 'O valor inicial deve ser menor que o final'
							}
						} else {
							TEXT = item.replace(/\-/g, '')
						}
					} else {
						TEXT = item
					}
					console.log(TEXT);
					
					return TEXT
				}

				$scope.optionsSelect = {
					multiple: $scope.multiple ? $scope.multiple : true,
					tags: vm.valoresDescription,
					// data: [],
					data: {
						results: faixaValoresService.valoresDescription(),
						text: function(item) {
							return item.descricao;
						}
					},
					tokenSeparators: [" ", ";"],
					placeholder: $scope.placeholder ? $scope.placeholder : '',
					formatNoMatches: function() {
						var exemploIntervalo = $scope.exemploIntervalo ? $scope.exemploIntervalo : '1,00-100,00'

						var MSG = 'Você pode utilizar intervalo separado por hífen. Ex.: '+ exemploIntervalo

						MSG = '<span class="text-info">'+MSG+'</span>'
						console.log(MSG);
						

						return MSG
					},
					createSearchChoice: function (item) {
						console.log(item);
						
						if(/\d+([,-]\d+?)?/.test(item)) {//Necessário caso cole letras da área de transferência
							console.log('passou');
							return {
								id: item,
								originalText: item,
								text: formatCreateSearchChoice(item)
							};
						}
					},
					formatResult: function(item) {
						return item.descricao
					},
					formatSelection: function(item) {
						console.log(item);
						if(item.descricao) { return item.descricao }
						if(item.originalText && item.originalText.split('-').length > 1) {
							var intervalo = item.originalText.split('-')
							var primeiroNumero = formatValor(intervalo[0])
							var segundoNumero = formatValor(intervalo[1])

							if(primeiroNumero == '') {
								item.originalText = $filter('currency')(segundoNumero)
							} else if(segundoNumero == '') {
								item.originalText = $filter('currency')(primeiroNumero)
							} else if(primeiroNumero > segundoNumero) {
								item.originalText = $filter('currency')(segundoNumero) + ' até ' + $filter('currency')(primeiroNumero)
							} else if(primeiroNumero < segundoNumero) {
								item.originalText = $filter('currency')(primeiroNumero) + ' até ' + $filter('currency')(segundoNumero)
							} else {
								item.originalText = $filter('currency')(primeiroNumero)
							}
						} else {
							var VAL = formatValor(item.originalText)

							if(!isNaN(VAL)) {
								item.originalText = $filter('currency')(VAL)
							}
						}
						return item.originalText
					}
				}
			},
			link: function($scope, element) {
				setTimeout(function() {
					$(element.find('input')[0])
					.on("keypress", function(e) {
						var valido = true
						if(this.value == '' && /\.|\/|\\|\,|\;/g.test(e.key)) {
							valido = false
						} else {
							if(!/\d|\-|\/|\\|\.|\,|\s|\;/g.test(e.key)) {
								valido = false
							}
						}
						return valido
					})
				}, 500)
			}
		}
	})
	.factory('selectIntervaloFactory', function($filter) {
		function _template() {
			return `
				<div class="select2-container">
					<label ng-if="label" for="sel_{{ID}}" class="{{ngRequired ? 'required' : ''}}">{{label}}</label>
					<span ng-transclude></span>
					<input type="hidden" id="sel_{{ID}}" bf-select2="selectOptions" ng-model="ngModel" class="form-control" ng-disabled="ngDisabled" placeholder="{{setPlaceholder()}}" />
				</div>
			`
		}
		function _validaIntervalo(match, intervalo){
			let startId = parseInt(match[1]);
			let endId = parseInt(match[2]);

			// Inverte os valores se o número inicial for maior que o número final
			if (startId > endId) {
				[startId, endId] = [endId, startId];
			}
			var term = startId + '-' + endId;

			// Verifica se a diferença entre os valores é maior ou igual a 1
			if (startId >= 1 && endId >= 1 && (endId - startId) >= 1 && intervalo) {
				return {
					id: term,
					originalText: term,
					text: 'Adicionar intervalo'
				};
			}
		}
		function _formatValue(item, multiple){
			item = multiple ? item : item.id
			return item
		}
		function _createSearchChoice(term, multiple, intervalo) {
			intervalo = intervalo != true ? false : true
			const match = multiple ? term.match(/^(\d+)-(\d+)$/) : false
			if(Number(term) && multiple) {
				term = term.replace(/[\+\-]/g, '')
				return {
					id: term,
					originalText: term,
					text: term.toString()
				};
			} else if (match) {
				return _validaIntervalo(match, intervalo)
			} else {
				return null; // Impede a criação de tags para outros casos
			}
		}
		function _formatInputTooShort(term, multiple, exemploIntervalo, minimumInputLength, showHelpColar, intervalo) {
			intervalo = intervalo != true ? false : true
			exemploIntervalo = exemploIntervalo ? exemploIntervalo : '1-100'
			showHelpColar    = showHelpColar != false ? true  : false
			// Calcula a quantidade de caracteres que ainda faltam
			var charactersRemaining = minimumInputLength - term.length;
		
			// Sua mensagem personalizada com a contagem de caracteres restantes
			if(charactersRemaining == 1) {
				var MSG = `<div class="tx__gray--d10">Digite ${charactersRemaining} caracter</div>`
			} else if(charactersRemaining > 1) {
				var MSG = `<div class="tx__gray--d10">Digite mais ${charactersRemaining} caracteres</div>`
			}

			if(multiple && intervalo) {
				MSG += `<small>Você pode utilizar intervalo separado por hífen. Ex.: ${exemploIntervalo}. </small>`
				showHelpColar ? MSG += `<small>Pode colar dados separados por vírgula ou ponto e vírgula</small>` : null

				MSG = `<span class="text-info">${MSG}</span>`
			}

			return MSG;
		}
		function _setNgModel(ngModel, multiple, list) {
			//Usado para quando o ngModel vem com informações já preenchidas
			if(ngModel != undefined) {
				var CADS = []

				if(_.isArray(ngModel)) {
					ngModel.forEach(cadastro => {
						cadastro = typeof cadastro == 'object' ? cadastro : $filter(list)(cadastro, 'object')
						CADS.push(cadastro)
					})
				} else if (_.isObject(ngModel) && multiple) {
					CADS.push(ngModel)
				} else if (_.isObject(ngModel) && !multiple) {
					CADS = ngModel
				} else if (_.isNumber(ngModel)) {
					CADS = $filter(list)(ngModel, 'object')
				}
				ngModel = CADS
			} else {
				ngModel = ngModel
			}

			return ngModel
		}
		function _formatIntervalo(item, formatSelection) {
			return formatSelection ? item.originalText.replace('-', ' até ') : item.text
		}
		function _editIntervalo(item, container, scope) {
			scope.funcaoEditar = function(item) {
				var novoIntervalo = prompt('Editar intervalo:', item.originalText);
				const match = novoIntervalo != null ? novoIntervalo.match(/^(\d+)-(\d+)$/) : false
				if (match) {
					// Atualiza a tag com os novos valores
					var novo = _validaIntervalo(match, true)
					item.id = novo.id
					item.originalText = novo.originalText
					scope.$apply()
				}
			}

			if (item.originalText && item.originalText.match(/^(\d+)-(\d+)$/)) {
				container.addClass('tx__blue pointer')
				container.css('textDecoration', 'underline')
				container.on('click', function(element) {
					scope.funcaoEditar(item)
				})
			}
		}
		return {
			template           : _template           ,
			formatValue        : _formatValue        ,
			createSearchChoice : _createSearchChoice ,
			formatInputTooShort: _formatInputTooShort,
			setNgModel         : _setNgModel         ,
			formatIntervalo    : _formatIntervalo    ,
			editIntervalo      : _editIntervalo      ,
		}
	})
})();