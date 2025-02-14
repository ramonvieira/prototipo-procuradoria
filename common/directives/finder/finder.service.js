/**
 * Created by andrei.smielevski on 21/12/2015.
 */
(function() {

    'use strict';

    angular.module('arrecadacao.common')
        .service('arrecadacao.common.PesquisaAvancadaService', Service); 
    
    
    Service.$inject = ['RestangularArrecadacao', '$timeout'];

    function Service(Restangular, $timeout) {

        function update(pesquisaAvancada) {
            return $timeout(function(){ return {content:''} }, 100);
        }

        function post(pesquisaAvancada) {
            return $timeout(function(){ return {content:''} }, 100);
        }

        function Service() {}

        Service.prototype.getAll = function(params) {
            return $timeout(function(){ return {content:''} }, 100);
        };

        Service.prototype.count = function(params) {
            return $timeout(function(){ return {content:''} }, 100);
        };

        Service.prototype.getById = function(id) {
            return $timeout(function(){ return {content:''} }, 100);
        };

        Service.prototype.save = function(pesquisaAvancada) {
            return pesquisaAvancada.id ? update(pesquisaAvancada) : post(pesquisaAvancada);
        };

        Service.prototype.remove = function(pesquisaAvancada) {
            return $timeout(function(){ return {content:''} }, 100);
        };

        Service.prototype.options = function(){
            return $optionsCache.getArrecadacao('pesquisaAvancada');
        };

        return new Service;
    }
})();