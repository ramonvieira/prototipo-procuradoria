(function()
	{

	    'use strict';

	    angular.module('arrecadacao.common').directive('resultadoPesquisa',
	    	function() {
	            return {
	            	restrict: 'AEC',
	            	scope: { cadastro: '@',
	            			textobusca: '=?',
	            			colspan: '@',
	            			exibir: '=',
	            			isCarregando: '='
	            	},
	                templateUrl: 'common/directives/resultado-pesquisa/resultado-pesquisa.html',
	                transclude: true,
					controller: function($scope, $element, $attrs) {

						$scope.$on('termosChanged', function(event, args) {
							$scope.filters = angular.copy(args);
						});

						$scope.adicionar = function () {
							$scope.$parent.adicionar();
						};
					}
				}
			}
		)
	}
 )();
