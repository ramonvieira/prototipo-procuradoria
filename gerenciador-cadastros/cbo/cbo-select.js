(function() {

    'use strict';

    angular.module('arrecadacao.common').factory('arrecadacao.common.CBOSelect',
         ['bfc.Select2Config', 'arrecadacao.common.ModalCad', 'CBOService',

        function(Select2Config, ModalCad, CBOService) {         
            return {
                select2Config: function(options) {
                    var me = Select2Config.create(angular.extend({                       
                        minimumInputLength: 2,
                        result: function(params, callback) {             
                            var filterValue = (params.term || '').replace(/\'/g,'');              
                            var filter = {
                                            offset: params.offset,
                                            limit: 50,
                                            filter: '(descricao like \''+ filterValue + '\' or id like \''+ filterValue + '\')' + (angular.isUndefined(me.customFilter) ? '' : me.customFilter || ''),
                                            sort: 'descricao asc'
                                         };
                                                
                            var result = CBOService.findBy(filter);
                            result.then(function(data) {
                                callback({
                                    results: data.data,
                                    more: data.hasNext
                                });
                            });

                            return result;
                        },
                        formatValue: function(data) {
                            return data.id;
                        },
                        formatResult: function(data) {
                            return data.text ? data.text : data.id + ' - ' + data.descricao ;
                        },
                        formatSelection: function(data) {                        
                            return data.descricao == undefined ? '' : data.id + ' - ' + data.descricao;
                        },
                        initSelection: function(element, callback) {
                            var id = $(element).val();
                            if (id) {
                                CBOService.getById(id).then(callback);
                            }
                        }
                    }, options));

                    return me;
                }
            };
        }
    ]);
})();
