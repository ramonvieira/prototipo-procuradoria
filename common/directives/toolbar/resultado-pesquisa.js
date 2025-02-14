(function() 
	{

	    'use strict';

	    angular.module('arrecadacao.common').directive('resultadoPesquisa',
	    	function() {
	            return {
	            	restrict: 'EA',
	            	scope: { cadastro: '@',
	            			textobusca: '=?',
	            			exibir: '=',
	            			isCarregando: '='
	            	},
	                templateUrl: 'common/directives/toolbar/resultado-pesquisa.html'
				}
			}
		)
	}
 )();
