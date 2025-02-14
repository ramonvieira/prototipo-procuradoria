(function() {

    'use strict';

    angular.module('arrecadacao.common').directive('toolbar', ['$timeout', 'arrecadacao.common.GridConfig',
        function($timeout, GridConfig) {
            return {
                restrict: 'AE',
                templateUrl: 'common/directives/toolbar/toolbar.html',
                scope: {
                    gridConfig: '=?',
                    filterBy: '@?',
                    filterCond: '@?',
                    filterBuilder: '&?',
                    filterOp: '@?',
                    filterDelay: '@?',
                    formatValue: '&?',
                    finderValue : '=?',
                    isCarregando :'=?',
                    hasAgrupamento: '@?'
                },
                controller: function($scope, $element, $attrs) {
                    var finding = false;
                    var delay = $scope.filterDelay || 500;

                    $scope.gridConfig = $scope.gridConfig || GridConfig.configure();
                    $scope.lineHeight = "1";
                    $scope.columnsIsVisible = [];
                    $scope.columnsDescription = [];
                    $scope.hasAgrupamento = "true";
                    //$scope.hasAgrupamento = $attrs.hasAgrupamento == undefined ? true : $attrs.hasAgrupamento;
                    
                    $scope.$watch(function(){ return $scope.finderValue; }, function(newValue, oldValue){
                        if(angular.isUndefined(newValue) || newValue === '' && $scope.gridConfig!==undefined){
                            $scope.gridConfig.finderConditions = undefined;
                        }
                    });

                    $scope.$on('columnsDescription', function (event, args) {
                        angular.forEach(args, function(value, key) {
                            $scope.columnsDescription.push(value);
                            $scope.columnsIsVisible.push(true);
                        }, $scope.columnsDescription);
                    });                    

                    $scope.refresh = function() {
                        $scope.$emit('finderChanged');
                    };                    
                    
                    $scope.setLineHeight = function(h){
                        $scope.lineHeight = h;
                        $scope.$emit('lineHeight', { message : h });
                    };

                    $scope.showColumns = function(){
                        $scope.$emit('showColumns', { showColumns : $scope.columnsIsVisible });
                    };

                    $scope.finderChanged = function() {
                        if (finding) {
                            $timeout.cancel(finding);
                        }
                        $scope.isCarregando = true;
                        finding = $timeout(function() {
                            if ($scope.gridConfig != undefined && $scope.finderValue != '') {
                                var condition = !angular.isUndefined($attrs.filterBuilder) ? $scope.filterBuilder()(doFormatValue($scope.finderValue)) : undefined;
                                if (condition == undefined) {
                                    condition = buildDefaultFilter();
                                }
                                $scope.gridConfig.finderConditions = condition;
                            } else if ($scope.gridConfig != undefined) {
                                $scope.gridConfig.finderConditions = undefined;
                            }

                            if ($scope.gridConfig != undefined){
                                $scope.gridConfig.offset = 0;
                            }
                            $scope.$emit('finderChanged');
                        }, delay);
                    };

                    function doFormatValue(value){
                        if(!angular.isUndefined($attrs.formatValue)){
                            return $scope.formatValue()(value);
                        }
                        return value != undefined ? ("'%" + value.replace(/\'+/g,'') + "%'") : "";
                    }

                    function buildDefaultFilter() {
                        var query = '';                      
                        var fields = $scope.filterBy.split(',');
                        var cond = ($scope.filterCond || '=').toLowerCase();

                        for(var i = 0; i < fields.length; i++){
                            query += fields[i] + ' ' + cond + ' ' + doFormatValue($scope.finderValue);
                            if((i+1)<fields.length){
                                query += $scope.filterOp || ' or ';
                            }
                        }

                        query = query || 'id = ' + $scope.finderValue.replace(/\D+/g, '');
                        return query;
                    }
                }
            };
        }
    ]);
})();



