(function() 
	{

	    'use strict';

	    angular.module('arrecadacao.common').directive('resultadoPesquisa',
	    	function() {
	            return {
	            	restrict: 'E',
	            	scope: { cadastro: '@',
	            			textobusca: '=?',
	            			exibir: '=',
	            			isCarregando: '='
	            	},
	                templateUrl: 'common/directives/finder/resultado-pesquisa.html'
				}
			}
		)
	}
 )();
