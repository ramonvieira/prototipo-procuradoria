(function() {

    'use strict';

    /**
     * columnsDescription recebe um array com as propriedades (id, descricao, type) caso for tipo enum passar a propriedade enum: ENUMNS
     * Ex: [{key: 'situacao', descricao: 'Situação', type:'enum', enum:[{value:'ATIVADO', description: 'ativo'}, {value:'DESATIVADO', description: 'desativado'}]
     * filterBy =  codição inicial do filtro
     * visibleProperties = sideButtons, groupBy, lineHeight, export, print, refresh, search
     **/
    angular.module('arrecadacao.common').directive('finder', directive); 
    
    function directive() {
        return {
            restrict: 'AE',
            templateUrl: 'common/directives/finder/finder.html',
            scope: {
                id: '@',
                tableId: '@',
                gridConfig: '=?',
                isCarregando:'=?',
                hideProperties: '=?',
                fields: '=?',
                ngFuncao: '&?',
                action: '@',
                actionLabel: '@',
                showAction: '=?',
                showMaxRecord: '=?',
                moreFilters: '=?',
                totalRegistros: '='
            },
            controller: Controller,
            controllerAs: 'vm'
        };
    }

    Controller.$inject = ['$scope', '$rootScope', '$attrs', '$injector'];

    function Controller($scope, $rootScope, $attrs, $injector) {
        var $timeout = $injector.get('$timeout');
        var Notification = $injector.get('bfc.Notification');
        var promiseTracker = $injector.get('promiseTracker');
        // var gridConfig = $injector.get('arrecadacao.common.GridConfig');
        var PesquisaAvancadaService = $injector.get('arrecadacao.common.PesquisaAvancadaService');
        var ModalCad = $injector.get('arrecadacao.common.ModalCad');
        
        var finding = false;
        var delay = $scope.filterDelay || 500;
        $scope.showMaxRecord = $scope.showMaxRecord||5;
        var lengthFilterSave = 0;

        $scope.loadingTracker = promiseTracker();
        $scope.abrirPopup = _abrirPopup;

        var columnTypes = {

            string: {
                operation: { any: 'like', none: 'not like' },
                formatter: function(value) {
                    return ("'%" + value.replace(/\'+/g,'') + "%'");
                }
            },
            number: {
                operation: { any: 'like', none: 'not like' },
                formatter: function (value) {
                    return ("'%" + value.replace(/\'+/g, '') + "%'");
                }
            },
            date: {
                operation: { any: '=', none: '!=' },
                formatter: function(value) {
                    return ("'" + value.replace(/\'+/g,'') + "'");
                }
            },
            intervalYear: {
                operation: { any: '>= ' },
                formatter: function (value, column) {
                    if (_.isEmpty(value.anoInicial) || _.isEmpty(value.anoFinal)) return undefined;
                    return value.anoInicial + ' and ' + column.id + ' <= ' + value.anoFinal;
                }
            },
            intervalDate: {
                operation: { any: '>= ', none: '< ' },
                formatter: function (value, column, tipoPesquisa) {
                    var operator;
                    var condition;                             
                    if(!_.isEmpty(column.limitInterval) && !_.isEmpty(value.dataInicial)) {
                        operator = ' >= ';
                        condition = ' and ';
                        if('none' === tipoPesquisa) {
                            operator = ' < ';
                            condition = ' or ';
                        }
                        return "'" + value.dataInicial + '\'' + condition + column.limitInterval + operator + '\'' + value.dataInicial + '\'';
                    }
                    if (angular.isUndefined(value.dataInicial) || angular.isUndefined(value.dataFinal)) return undefined;                                
                    operator = ' <=';
                    condition = ' and ';
                    if('none' === tipoPesquisa) {
                        operator = ' >';
                        condition = ' or ';
                    }
                    return "'" + value.dataInicial + '\'' + condition + column.id + operator + '\'' + value.dataFinal + '\'';
                }
            },
            intervalDateTime: {
                operation: { any: '>= ', none: '< ' },
                formatter: function (value, column, tipoPesquisa) {
                    var operator;
                    var condition;                             
                    if(!_.isEmpty(column.limitInterval) && !_.isEmpty(value.dataInicial)) {
                        operator = ' >= ';
                        condition = ' and ';
                        if('none' === tipoPesquisa) {
                            operator = ' < ';
                            condition = ' or ';
                        }
                        return "'" + value.dataInicial + '\'' + condition + column.limitInterval + operator + '\'' + value.dataInicial + '\'';
                    }
                    if (angular.isUndefined(value.dataInicial) || angular.isUndefined(value.dataFinal)) return undefined;                                
                    operator = ' <=';
                    condition = ' and ';
                    if('none' === tipoPesquisa) {
                        operator = ' >';
                        condition = ' or ';
                    }
                    return "'" + value.dataInicial + '\'' + condition + column.id + operator + '\'' + value.dataFinal + '\'';
                }
            },
            intervalDecimal: {
                operation: { any: '>= ' },
                formatter: function (value, column) {
                    if (angular.isUndefined(value.vlnicial) || angular.isUndefined(value.vlFinal)) return undefined;
                    return  value.vlInicial + ' and ' + column.id + ' <= ' + value.vlFinal ;
                }
            },
            spinner: {
                operation: { any: '=', none: '=' },
                formatter: function (value) { return value; }
            },
            enum: {
                operation: { any: 'in', none: 'not in' },
                formatter: function (value) {
                    var formattedValues = [];
                    _.forEach(value, function (entry) {
                        formattedValues.push("'" + entry.replace(/\'+/g,'') + "'")
                    });
                    if (!formattedValues.length) return undefined;
                    return ("(" + formattedValues.toString() + ")");
                }
            },
            select: {
                operation: { any: 'in', none: 'not in' },
                formatter: function (value) {
                    var formattedValues = [];
                    if (!_.isEmpty(value)) {
                        if (_.isArray(value)) {
                            _.forEach(value, function (entry) {
                                if (_.isNumber(entry)) {
                                    formattedValues.push(entry);
                                } else if (_.isObject(entry)) {
                                    formattedValues.push(entry.id);
                                } else {
                                    formattedValues.push("'" + entry.replace(/\'+/g, '') + "'");
                                }
                            });
                        } else if (_.isObject(value)) {
                            formattedValues.push(value.id);
                        }
                    } else {
                        if (!value) return undefined;
                        if (_.isNumber(value)) {
                            formattedValues.push(value);
                        } else {
                            formattedValues.push("'" + value.replace(/\'+/g, '') + "'");
                        }
                    }
                    if (!formattedValues.length) return undefined;
                    return ("(" + formattedValues.toString() + ")");
                }
            }
        };
        $scope.$on('totalRegistros', function (event, totalRegistros) {
            $scope.totalRegistros = totalRegistros;
        });
        $scope.filter = { keywords: [], others: []};
        // $scope.gridConfig = $scope.gridConfig || GridConfig.configure();
        $scope.tipoPesquisa = 'some';
        $scope.$watch(function(){
            return $scope.filter.keyword;
        }, function(newValue, oldValue) {
            // if(angular.isUndefined(newValue) || newValue === '' && $scope.gridConfig!==undefined){
            //     $scope.gridConfig.finderConditions = undefined;
            // }
        });

        $scope.lineHeight = "1";
        $scope.columnsIsVisible = [];
        $scope.columns = [];
        $scope.hasAgrupamento = $attrs.hasAgrupamento == undefined ? "true" : $attrs.hasAgrupamento;
        $scope.somentePesquisa = $attrs.somentePesquisa != undefined;

        $scope.$on('enableDelete', function (event, args) {
            $scope.deleteIsVisible = args.check;
            $scope.listagem = args.list;
            $scope.service = args.service;
        });

        $scope.$on($scope.id ? 'removerTermo-' + $scope.id : 'removerTermo', function (event, args) {
            if (args.idFinder != $scope.id){
                return;
            }
            if ($scope.filter) {
                $scope.filter.id = null;
            }
            var registro = angular.copy($scope.filter[args.list][args.index]);
            if(args.list == 'others' && registro) {
                var item = _.findWhere($scope.others, {id: registro.column});
                delete item.values;
            }
            $scope.filter[args.list].splice(args.index, 1);
            $scope.finderChanged();
        });

        $scope.$on('filter-edited', function() {
            _getFiltersSaved();
        });

        $scope.$on('filter-saved', function (event, data) {
            _getFiltersSaved();
            _setFilter(data);
        });

        $scope.$on('filter-selected', function (event, data) {
            $scope.setFilter(data);
        });

        $scope.$on($scope.id ? 'clearFilters-' + $scope.id : 'clearFilters', function() {
            _.forEach($scope.filter.others, function (entry) {
                var column = _.findWhere($scope.others, {id: entry.column});
                delete column.values;
            });
            $scope.filter = { keywords: [], others: []};
            _termosChanged();
        });

        function _abrirPopup(consulta) {
            ModalCad.open({
                templateUrl: 'common/directives/finder/ver-filtros/ver-filtros-modal.html',
                controller: 'arrecadacao.common.VerTodosFiltrosModalCtrl as vm',
                scope: $scope,
                resolve: {
                    consulta: consulta
                }
            });
        }

        function _getColumns(list) {
            $scope.columns = [];
            $scope.others = [];
            $scope.columnsIsVisible = [];
            _.forEach(list, function(value, key) {
                $scope.columns.push(value);
                if (value.showColumn) {
                    $scope.columnsIsVisible.push(true);
                }
                if (value.others) {
                    $scope.others.push(value);
                }
            });
            $scope.colunasSelect = _.pluck(_.filter($scope.columns, { filterable: true}),'id');
        }

        function _formatOthersSaved(data) {
            if (data.others && data.others.length) {
                var others = angular.copy(data.others)
                data.others = [];
                _.forEach(others, function(other) {
                    data.others.push(JSON.parse(other)); 
                });
            }
        }

        $scope.$on('columnsDescription', function (event, args) {
            if ($scope.fields) {
                return;
            }
            _getColumns(args);
        });

        $scope.$watch('fields', function(newValue) {
            if (!newValue) {
                return;
            }
            _getColumns(newValue);
        });

        function _getFiltersSaved() {
            var params = {
                filter: 'cadastro = \'' + $scope.id + '\'',
                limit: 5,
                offset: 0,
                sort: 'dhConsulta desc'
            }
            var promise = PesquisaAvancadaService.getAll(params).then(function(data) {
                $scope.filters = data.content;
                _.forEach($scope.filters, function(filter){
                    _formatOthersSaved(filter);
                })
                $scope.hasNext = data.hasNext;
            });
            $scope.loadingTracker.addPromise(promise);
            return promise;
        }

        _getFiltersSaved();

        $scope.countFilters=function(){
            return lengthFilterSave;
        }

        $scope.hasFilters = function () {
            return !_.isEmpty($scope.filters);
        };

        $scope.remove = function (registro) {
            var item = angular.copy(registro);
            PesquisaAvancadaService.remove(item).then(function () {
                _getFiltersSaved();
                if (item.id == $scope.filter.id) {
                    _setFilter({});
                }
            });
        };

        $scope.refresh = function() {
            $scope.$emit($scope.id ? 'finderChanged-' +$scope.id : 'finderChanged');
        };

        $scope.setLineHeight = function(h){
            $scope.lineHeight = h;
            $scope.$emit('lineHeight', { message : h });
        };

        function _setFilter(registro) {
            $scope.selectedEnum = {};
            $scope.filter = registro;
            _.forEach($scope.filter.others, function (entry) {
                var column = _.findWhere($scope.others, {id: entry.column});
                column.values = entry.value;
            });
            $timeout(function () {
                _termosChanged();
            }, 100);
        }

        $scope.setFilter = function (registro) {
            var item = angular.copy(registro);
            if (item.others && item.others.length) {
                var others = angular.copy(item.others)
                item.others = [];
                _.forEach(others, function(other) {
                    item.others.push(JSON.stringify(other)); 
                });
            }
            if (item.id) {
                var promise = PesquisaAvancadaService.save(item).then(function(data) {
                    _formatOthersSaved(data);
                    _getFiltersSaved();
                    _setFilter(data);
                });
                $scope.loadingTracker.addPromise(promise);
            } else {
                _setFilter(item);
            }
        };

        $scope.showColumns = function(){
            var contaChecked = 0;
            _.forEach($scope.columnsIsVisible, function (entry) {
                if (entry == true){
                    contaChecked = contaChecked +1;
                }
            });

            $scope.$emit('showColumns', { showColumns : $scope.columnsIsVisible });
        };

        $scope.isDisabled = function (item){
            if ($scope.columns.length == 1) {
                return true;
            }
            var count = _.countBy($scope.columnsIsVisible, function (value){
                return value;
            }).true;
            return count == 1 && item;
        };

        $scope.deleteSelection = function(){
            angular.forEach($scope.listagem , function (item) {
                console.log(item);
            });
            $scope.$emit('deleteSelection', {});
        };

        $scope.addKeyword = function (termo) {
            if (termo) {
                $scope.filter.keywords.push(angular.copy(termo));
                $scope.filter.keyword = '';
            }
            _termosChanged();
        };

        $scope.exportTable = function (format) {
            $('#' + $scope.tableId).tableExport(
                {
                    fileName: $scope.id,
                    htmlContent: false,
                    worksheetName: $scope.id,
                    //ignoreColumn: [$scope.columns.length, $scope.columns.length + 1, $scope.columns.length + 2, $scope.columns.length + 3, $scope.columns.length + 4, $scope.columns.length + 5, $scope.columns.length + 6, $scope.columns.length + 7, $scope.columns.length + 8, $scope.columns.length + 9, $scope.columns.length + 10, $scope.columns.length + 11],
                    type:format,
                    jspdf: {
                        orientation: 'l'
                    }
                });
        };

        $scope.setOthers = function (item, column) {
            if (!_.isEmpty(item) || _.isString(item) || _.isNumber(item)) {
                var other = _.findWhere($scope.filter.others, {column: column.id});
                if (other) {
                    other.value = angular.copy(item);
                } else {
                    var filter = {
                        column: angular.copy(column.id),
                        value: angular.copy(item)
                    };
                    $scope.filter.others.push(filter)
                }
            } else {
                var index = _.findIndex($scope.filter.others, { column: column.id});
                $scope.filter.others.splice(index, 1);
            }
        };

        $scope.showMoreFilters = function () {
            $scope.$emit($scope.id ? 'showMoreFilters-' + $scope.id : 'showMoreFilters', {tipoPesquisa: $scope.tipoPesquisa});
        };

        $scope.search = function () {
            _termosChanged();
        };

        $scope.finderChanged = function() {
            if (finding) {
                $timeout.cancel(finding);
            }
            finding = $timeout(function() {
                // if ($scope.gridConfig != undefined) {
                //     var condition = !angular.isUndefined($attrs.filterBuilder) ? $scope.filterBuilder()(_doFormatValue($scope.filter.keyword)) : undefined;
                //     if (condition == undefined) {
                //         condition = _buildDefaultFilter();
                //     }
                //     $scope.gridConfig.finderConditions = condition;
                // } else if ($scope.gridConfig != undefined) {
                //     $scope.gridConfig.finderConditions = undefined;
                // }
                // if ($scope.gridConfig != undefined){
                //     $scope.gridConfig.offset = 0;
                // }
                $scope.$emit($scope.id ? 'finderChanged-' +$scope.id : 'finderChanged');
            }, delay);
            $rootScope.$broadcast($scope.id ? 'termosChanged-' + $scope.id : 'termosChanged', $scope.filter);
        };

        function _termosChanged (){
            $scope.finderChanged();
        }

        function _doFormatValue(value, column){
            if(!angular.isUndefined($attrs.formatValue)){
                return $scope.formatValue()(value);
            }
            value = columnTypes[column.type] ? columnTypes[column.type].formatter(value, column, $scope.tipoPesquisa) : undefined;
            return value != undefined ? value : "";
        }

        function _getCondicao(type) {
            var condicao = columnTypes[type].operation.any;
            if ($scope.tipoPesquisa == 'none') {
                condicao = columnTypes[type].operation.none;
            }
            return condicao;
        }

        function _buildInterval(typeColumn, builder) {
            if('intervalYear' === typeColumn || 'intervalDate' === typeColumn || 'intervalDecimal' === typeColumn) {
                return '(' + builder + ')';
            }
            return builder;
        }

        function _getFilter(query, coluna, finderValue) {
            var builder = '';
            var column = _.findWhere($scope.columns, {id: coluna});
            if (!column.type) {
                column.type = 'string';
            }
            var op = $scope.tipoPesquisa !== 'some' || column.type == 'enum' || column.type == 'select' ? ' and ': ' or ';
            var value = _doFormatValue(finderValue, column);
            if (!value) {
                return '';
            }
            var condicao = _getCondicao(column.type);
            if (!query) {
                builder = coluna + ' ' + condicao + ' ' + value;
                return _buildInterval(column.type, builder);
            }
            builder = coluna + ' ' + condicao + ' ' + value;
            return op + _buildInterval(column.type, builder);
        }

        function _buildDefaultFilter() {
            var query = '';
            _.forEach($scope.colunasSelect, function(coluna) {
                if ($scope.filter.keywords && $scope.filter.keywords.length) {
                    _.forEach($scope.filter.keywords, function (termo) {
                        query += _getFilter(query, coluna, termo);
                    });
                }
            });
            if (query) {
                query = '(' + query + ')';
            }
            if ($scope.filter.others && $scope.filter.others.length) {
                _.forEach($scope.filter.others, function (other) {
                    query += _getFilter(query, other.column, other.value);
                });
            }
            return query;
        }
    }
    
})();
