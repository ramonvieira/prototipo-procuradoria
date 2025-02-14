(function() {
	'use strict';


	/**
	 * Declaração dos módulos e suas dependências fundamentais
	 */
	// App
	angular.module('tributos',[]);
	angular.module('tributos.common', ['tributos']);
	angular.module('arrecadacao.common', ['bfc', 'tributos.common']);

	/**
	 * Módulo da aplicação
	 */
	var app = angular.module('app', [
		'arrecadacao.common',
		'uiSwitch',
		'ui.bootstrap',
		'bthtimepicker',
		'bfc.messages',
		'partialApp',
		'flow',
		'ng-fusioncharts',
		'ui-components',
		'ui.tinymce',
		'ui.sortable',
	])

	.constant('UNDO_TIMEOUT', 8 * 1000 /* 8 segundos */)

	.constant('TRIBUTOS', {
        'BASE_API_TRIBUTOS': 'http://localhost:8080/tributos/api/',
        'BASE_API_ARRECADACAO' : 'http://localhost:8080/arrecadacao/api/',
        'URL_APP': 'http://localhost:3000/',
        'ENUM_CAMPO_INSCRICAO': 'undefined',
        'URL_GLB_TEMPLATE': 'http://dev.betha.com.br/glb/v0.1/ui'
	})

	.run(['$rootScope', '$stateParams',
		function($rootScope, $state, $stateParams){

			var vm = $rootScope;
			moment.locale('pt-br');

			$rootScope.pathDB = 'http://localhost:9004'
		
			// ------------------------------------------------------
			// Filtro
			// ------------------------------------------------------
			vm.setFilter = function(resolve) {
				if (resolve.search != true) {
					vm.filterFixed = vm.storageSet('filterFixed', null ,(resolve.fixed ? '1' : '0'));
					vm.filterFloat = (resolve.float ? '1' : '0');
				} else if(vm.storageSet('filterFixed', '0') == '0') {
					vm.filterFloat = '0';
				} else {
					console.log('Passou');
				}
			}

			// ------------------------------------------------------
			// Gravação em storage
			// ------------------------------------------------------
			$rootScope.storageSet = function(name, padrao, newValue) {
				//Com storage
				if(window.localStorage.getItem(name)){
					//Se passou valor novo
					if(newValue) {
						window.localStorage.setItem(name, newValue)
					}
					
					//Sem storage
				} else {
					window.localStorage.setItem(name, padrao);
				}
				return window.localStorage.getItem(name);
			}

			$rootScope._setVal = function(nome, valor, persist) {
				return eval("$rootScope."+nome+" = '"+valor+"'")
			}

			$rootScope.filterFixed = $rootScope.storageSet('filterFixed', '0');
			$rootScope.filterFloat = 0;

			// ------------------------------------------------------
			// Agenda
			// ------------------------------------------------------
			$rootScope.eventSelected = null;
			$rootScope.setEvent = function (resolve) {
				$rootScope.eventSelected = resolve
			}

			// ------------------------------------------------------
			// Configurações do teclado
			// ------------------------------------------------------
			$(document).keyup(function(e){
				e = e || window.event;
				var isEscape = false;
				if ("key" in e) {
					isEscape = (e.key === "Escape" || e.key === "Esc");
				} else {
					isEscape = (e.keyCode === 27);
				}
				if (isEscape) {
					$('#closeFilter').click()
				}

				if (e.target.tagName == 'BODY' || e.target.tagName == 'BUTTON' || e.target.tagName == 'A') {
					// e.keyCode == 80 ? $('#filtroAvancado').click() : null; // P
					// e.keyCode == 80 ? $('#searchInput').focus() : null; // P
				}

				if (e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA') {
					// Pesquisar
					e.keyCode == 13 ? $('#pesquisar').click() : null; // ENTER
					e.keyCode == 80 || e.keyCode == 70 ? $('#filtroAvancado').click() : null; // P || Ctrl + F
					e.keyCode == 80 ? $('#searchInput').focus() : null; // P
					// Agendar
					e.keyCode == 78 ? $('#novo').click() : null; // N
					e.keyCode == 83 ? $('#salvar').click() : null; //S
				}
			});
		
			$rootScope.randomInt = function(min, max) {
				if(!min && !max) {
					min = 500;
					max = 2000;
				}
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
	}])
	.filter('arrecEmptyText', function() {
		return function(input) {
			return input ? input : '---'
		}
	})
	.filter('arrecFormatDate', function() {
		return function(date, format) {
			var tiposEntradas = [
				"YYYY-MM-DD HH:mm:ss",
				"YYYY-MM-DD",
				"YYYY/MM/DD HH:mm:ss",
				"YYYY/MM/DD",
				"DD-MM-YYYY HH:mm:ss",
				"DD-MM-YYYY",
				"DD/MM/YYYY HH:mm:ss",
				"DD/MM/YYYY",
				"ms",
			]
			format = format ? format : "DD/MM/YYYY"

			if (date === undefined || date === '' || date === null) {
				date = '---'
			} else {
				if (!isNaN(date)) {// Se for inteiro (Ex.: 5 ou -5)
					// Somar dias
					if (/^(?!\-)\d{1,4}$/.test(date)) {
						date = moment().add(Number(date), 'd').format(format)
					}
					// Subtrair dias
					if (/^(\-)\d{1,4}$/.test(date)) {
						date = moment().subtract(Math.abs(Number(date)), 'd').format(format)
					}
					
					// Milisegundos para data
					if (/^\d{13}$/.test(date)) {
						date = moment(Number(date)).format(format)
					}
				} else {
					date = moment(date, tiposEntradas).format(format)
				}
			}
			return date
		}
	})
	.filter('arrecDate', function($filter) {
		return function(date, format) {
			return $filter('arrecFormatDate')(date, format)
		}
	})
	.filter('arrecDia', function($filter) {
		return function(date) {
			return $filter('arrecDate')(date, 'DD')
		}
	})
	.filter('arrecMes', function($filter) {
		return function(date) {
			return $filter('arrecDate')(date, "MM")
		}
	})
	.filter('arrecAno', function($filter) {
		return function(date) {
			return $filter('arrecDate')(date, "YYYY")
		}
	})
	.filter('arrecDateTime', function($filter) {
		return function(date) {
			return $filter('arrecDate')(date, 'DD/MM/YYYY HH:mm:ss')
		}
	})
	.filter('arrecTime', function($filter) {
		return function(time) {
			return $filter('arrecDate')(time, 'HH')
		}
	})
	.filter('arrecMs', function($filter) {
		return function(date) {
			date = $filter('arrecFormatDate')(date)
			return Date.parse(date)
		}
	})
	.directive('arrecDate', function(){
		return {
			restrict: 'E',
			template: `
				<span class="nowrap" ng-class="{'tx__red' : vencido && vencimento}" bf-tooltip="{{HELP}}"><i class="fa fa-fw {{vencido && vencimento ? 'fa-calendar-times-o' : 'fa-calendar tx__gray--d10'}}" ng-if="icon"></i> {{DATE}}</span>
			`,
			scope: {
				date           : '=',
				icon           : '=',
				vencimento     : '=',
				vencimentoHelp : '@?',
				filter         : '@'
			},
			controller: function($scope, $filter) {
				$scope.icon         = $scope.date == null ? false : $scope.icon
				$scope.icon         = $scope.icon != false ? true : false;
				$scope.vencido      = moment($scope.date).isBefore(moment().subtract(1, 'days'))
				$scope.vencimento   = $scope.vencimento != true ? false : true;
				$scope.filter       = $scope.filter ? $scope.filter : 'arrecDate'
				
				$scope.DATE         = $filter($scope.filter)($scope.date)

				if($scope.vencido && $scope.vencimento && $scope.vencimentoHelp != "false") {
					if($scope.vencimentoHelp != undefined) {
						$scope.HELP = $scope.vencimentoHelp
					} else {
						$scope.HELP = "Vencido"
					}
				} else {
					$scope.HELP = null
				}
			}
		}
	})
	.filter('arrecSaveDate', function($filter) {
		var tiposEntradas = [
			"YYYY-MM-DD HH:mm:ss",
			"YYYY-MM-DD",
			"YYYY/MM/DD HH:mm:ss",
			"YYYY/MM/DD",
			"DD-MM-YYYY HH:mm:ss",
			"DD-MM-YYYY",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY",
			"ms",
		]

		return function(date) {
			date = moment(date, tiposEntradas).format('YYYY/MM/DD')
			return moment().diff(date, 'days')*-1
		}
	})
	.filter('restoreDate', function($filter) {
		var tiposEntradas = [
			"YYYY-MM-DD HH:mm:ss",
			"YYYY-MM-DD",
			"YYYY/MM/DD HH:mm:ss",
			"YYYY/MM/DD",
			"DD-MM-YYYY HH:mm:ss",
			"DD-MM-YYYY",
			"DD/MM/YYYY HH:mm:ss",
			"DD/MM/YYYY",
			"ms",
		]

		return function(date) {
			return moment($filter('arrecDate')(date), tiposEntradas).format('YYYY-MM-DD')
		}
	})
	.filter('truncatedText', function() {
		return function(str, num, useWordBoundary) {
			if(str != undefined) {
				if(num === undefined) { return str }
				if(typeof num !== 'number') {
					console.error('NUM deve ser um número para o máximo de caracteres. Recebeu ("' + num + '")');
					return str
				}
	
				if(typeof num === 'number') {
					if(num < 1 || str.length <= num) { return str }
					const subString = str.slice(0, num - 1)
					
					return (useWordBoundary ? subString.slice(0, subString.lastIndexOf(" ")) : subString) + "..."
				}
			}
		}
	})
})();
