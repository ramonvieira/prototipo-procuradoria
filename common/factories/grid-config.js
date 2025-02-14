(function() {

    'use strict';

    angular.module('arrecadacao.common').factory('arrecadacao.common.GridConfig', [function() {
        return {
            configure: function(options) {
                return angular.extend({
                    sortedBy: 'id',
                    sortedInverse: false,
                    offset: 0,
                    limit: 30,
                    defaultConditions: undefined,
                    finderConditions: undefined,
                    conditions: undefined,
                    buildFilter: function(conds, overwrite) {
                        var allConditions = this.defaultConditions;
                        var isOverWrite = overwrite || false;

                        if (!isOverWrite && this.conditions !== undefined) {
                            allConditions = (allConditions !== undefined ? ' and ' : '') + this.conditions ;
                        }
                        if (!isOverWrite && this.finderConditions !== undefined) {
                            allConditions = (allConditions !== undefined ? allConditions + ' and ' : '') + this.finderConditions ;
                        }
                        if (conds !== undefined) {
                            allConditions = (allConditions !== undefined ? allConditions + ' and ' : '') + conds ;
                        }
                        var filter = {
                            offset: this.offset,
                            limit: this.limit,
                            filter: allConditions || undefined,
                            sort: (this.sortedBy || 'id') + ' ' + (this.sortedInverse ? 'desc' : 'asc')
                        };
                        return filter;
                    }
                }, options);
            }
        };
    }]);
})();