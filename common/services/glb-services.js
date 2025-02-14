(function() {

    'use strict';

    angular.module('app').service('GlbApiService', ['GLB-API', function(Restangular) {

            function GlbApiService() {};

            GlbApiService.prototype.getById = function(id) {
                return Restangular.one('entidade', id).customGET();
            }

            return new GlbApiService;

        }]);
})();
