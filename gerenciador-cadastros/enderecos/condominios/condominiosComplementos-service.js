(function() {

    'use strict';

    angular.module('app').service('CondominiosComplementosService', ['RestangularArrecadacao', function(Restangular) {

            function update(condominiosComplementos) {
                return Restangular.one('condominiosComplementos', condominiosComplementos.id).customPUT(condominiosComplementos);
            }

            function post(condominiosComplementos) {
                return Restangular.all('condominiosComplementos').customPOST(condominiosComplementos);
            }

            function CondominiosComplementosService() {};

            CondominiosComplementosService.prototype.getAll = function() {
                return Restangular.all('condominiosComplementos').customGET();
            }

            CondominiosComplementosService.prototype.findBy = function(findParams) {
                return Restangular.all('condominiosComplementos/findBy').customPOST(findParams);
            }

            CondominiosComplementosService.prototype.getById = function(id) {
                return Restangular.one('condominiosComplementos/findById', id).customGET();
            }

            CondominiosComplementosService.prototype.save = function(condominiosComplementos) {
                return condominiosComplementos.id ? update(condominiosComplementos) : post(condominiosComplementos);
            }

            CondominiosComplementosService.prototype.remove = function(condominiosComplementos) {
                return Restangular.one('condominiosComplementos', condominiosComplementos.id).customDELETE();
            }

            return new CondominiosComplementosService;

        }]);
})();
