(function() {

    'use strict';

    angular.module('tributos.common').factory('tributos.common.FormatEnum', FormatEnumFactory);

    FormatEnumFactory.$inject = ['$q'];

    function FormatEnumFactory($q) {
        function FormatEnum() {}

        FormatEnum.prototype.format = function (ENUM) {
            _.forEach(ENUM, function(entry) {
                entry.description = entry.descricao;
            })
            var _enum = _.indexBy(ENUM, 'id');
            _enum.values = _.map(_enum, function(enumItem) {
                return enumItem;
            });
            return $q.when(_enum);
        };

        FormatEnum.prototype.formatMetadata = function (ENUM) {
            _.forEach(ENUM, function(entry) {
                entry.id = entry.key;
            });
            var _enum = _.indexBy(ENUM, 'id');
            _enum.values = _.map(_enum, function(enumItem) {
                return enumItem;
            });
            return $q.when(_enum);
        };

        return new FormatEnum;
    }
})();
