(function(){

	'use strict';

	angular.module('app')

		/*// Oauth2
		.config(['Oauth2Provider', 'TRIBUTOS', function(Oauth2Provider, TRIBUTOS){
			Oauth2Provider.setUrlLogout(TRIBUTOS.URL_APP);
			Oauth2Provider.setUrlSelecaoEntidade(TRIBUTOS.URL_APP.concat('#/selecao/entidade'));
		}])

		.config(['bfc.initializerProvider', function (initializer) {
			initializer.config({
				hints: [ 
					{ value: 'entidade', accepts: [ { key: 'entidade'} ] },
					{ value: 'modulo', accepts: [ { key: 'modulo'} ] },
				],
				state: {
					value: 'app'
				}
			});
		}])*/
		
		// Restangular
		.config(['RestangularProvider', 'TRIBUTOS', function(RestangularProvider, TRIBUTOS){
			RestangularProvider.setBaseUrl(TRIBUTOS.BASE_API_TRIBUTOS);
			RestangularProvider.setDefaultHttpFields({withCredentials: true});
		}])
    
        .factory('RestangularArrecadacao', ['Restangular', 'TRIBUTOS', function(restangular, TRIBUTOS){
            return restangular.withConfig(function(RestangularConfigurer){
                RestangularConfigurer.setBaseUrl(TRIBUTOS.BASE_API_ARRECADACAO);
            });
        }])
/*
 
		// entidade
		.factory('GLB-API',['Restangular', 'TRIBUTOS', function(restangular, TRIBUTOS){
             return restangular.withConfig(function(RestangularConfigurer){
                 RestangularConfigurer.setBaseUrl(TRIBUTOS.BASE_API_GLB);
             });
		}])

		.config(['$httpProvider', function ($httpProvider) {
			$httpProvider.interceptors.push('bfc.messages.ErrorNotificationHandler');
		}]);*/

})();
