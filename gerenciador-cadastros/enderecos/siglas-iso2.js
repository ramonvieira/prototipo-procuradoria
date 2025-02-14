(function() {
    'use strict';

    var moduloCommon = angular.module('app');

    moduloCommon.factory('app.ConfigServidoresService', ['$q', 'Restangular',
        function($q, Restangular) {
        }
    ]);

    moduloCommon.factory('arrecadacao.common.TributosCoreSiglasIsoService', ['Restangular', '$q', '$filter',
        function(Restangular, $q, $filter) {
            var allSiglasIso = [
                {id: 1, siglasIso: "AF"},
                {id: 2, siglasIso: "ZA"},
                {id: 3, siglasIso: "AX"},
                {id: 4, siglasIso: "AL"},
                {id: 5, siglasIso: "DE"},
                {id: 6, siglasIso: "AO"},
                {id: 7, siglasIso: "AI"},
                {id: 8, siglasIso: "AQ"},
                {id: 9, siglasIso: "AG"},
                {id: 10, siglasIso: "AN"}
            ];

            return {
                get: function(id) {
                    return $filter('filter')(allSiglasIso, {id: String(id)})[0];
                },
                getList: function() {
                    return $filter('orderBy')(allSiglasIso, '+siglasIso');
                },
                save: function(data) {
                    allSiglasIso.push(data);
                },
                remove: function(id) {

                }
            };
        }
    ]);
    moduloCommon.factory('arrecadacao.common.TributosCoreSiglaIsoSelect', ['$q',
        '$rootScope',
        '$filter',
        'arrecadacao.common.TributosCoreSiglasIsoService',
        'bfc.Select2Config',
        'bfc.dialog.Dialog',
        function($q,
            $rootScope,
            $filter,
            TributosCoreSiglasIsoService,
            Select2Config,
            Dialog
        ) {
            return {
                select2Config: function(options) {
                    return Select2Config.create(angular.extend({
                        onAdd: function(val, target) {
                            Dialog.open({templateUrl: 'gerenciador-cadastros/enderecos/siglasIsos/modal-siglasIsos.html'})
                            return false;
                        },
                        result: function(params, callback) {
                            var result,
                                configId;

                            result = $q.defer().resolve(callback({
                                results: TributosCoreSiglasIsoService.getList(),
                                more: false
                            }));
                            return result;
                        },
                        formatValue: function(data) {
                            return data.id;
                        },
                        formatResult: function(data) {
                            return data.siglasIso;
                        },
                        formatSelection: function(data) {
                            return data.siglasIso;
                        },
                        query: function (query) {
                            var term = query.term;
                            var termLabel = term;
                            if (term.length > 30) {
                                termLabel = term.substr(0, 30) + '...';
                            }
                            var text = termLabel + ' ainda não existe. <span style="color:#FFF;text-decoration:underline">Adicionar</span>';

                            if (term === '') {
                                text = 'Adicionar uma nova opção';
                            }
                            var results = $filter('filter')(TributosCoreSiglasIsoService.getList(),{siglasIso: query.term});
                            if(results.length === 0){
                                results.push({id: term, added: true, siglasIso: text});
                                this.formatNewChoice(text, term);
                            }
                            query.callback( {results: results } );
                        },
                        initSelection: function(element, callback) {

                        }

                    }, options));
                }
            };
        }
    ]);

    moduloCommon.controller('TributosCoreSiglaIsoCadCtrl', ['$scope', '$rootScope', '$q',
        'optionsCad',
        'arrecadacao.common.TributosCoreSiglasIsoService',
        function ($scope, $rootScope, current, optionsCad, TributosCoreSiglasIsoService) {
            $scope.windowTitle = "Adicionando siglasIso";
            $scope.siglasIso = {
                id: TributosCoreSiglasIsoService.getList().length + 1,
                siglasIso: optionsCad.siglasIso,
                tipo: ''
            }
            $scope.save = function(){
                TributosCoreSiglasIsoService.save($scope.siglasIso);
                $rootScope.siglasIso = TributosCoreSiglasIsoService.getList();
                $rootScope.funcionario.siglasIso = $scope.siglasIso.id;
            }
        }
    ]);

})();