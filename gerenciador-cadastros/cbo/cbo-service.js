(function(){

	'use strict';

	angular.module('app')
		.service('CBOService', ['RestangularArrecadacao', function(Restangular){
			
			function CBOService(){};

			CBOService.prototype.getAll = function(){
				return Restangular.all('cbo').customGET();
			}

            CBOService.prototype.findBy = function(params) {
                return Restangular.all('cbo/findBy').customPOST(params);
            }
            
            CBOService.prototype.getById = function(id){
				return Restangular.one('cbo', id).customGET();
			}
            
			return new CBOService;

		}]);

})();