(function()
{

    'use strict';

    angular.module('arrecadacao.common')
        .controller('ScriptBuilderCntrl', ScriptBuilderCntrl)
        .directive('scriptBuilder',
            function() {
                return {
                    restrict: 'AEC',
                    transclude: true,
                    scope: {
                        id: '@',
                        registro: '='
                    },
                    controller: 'ScriptBuilderCntrl',
                    templateUrl: 'common/directives/scriptBuilder/scriptBuilder.html'
                }
            }
        );

    ScriptBuilderCntrl.$inject = ['$scope', '$rootScope', '$injector'];

    function ScriptBuilderCntrl($scope, $rootScope, $injector) {
        var ENUMS = $injector.get('ENUMS');
        var $timeout = $injector.get('$timeout');
        var $q = $injector.get('$q');
        var promiseTracker = $injector.get('promiseTracker');

        $scope.tracker = {
            carregando: promiseTracker()
        };
        $scope.operadores = ENUMS.OPERADORES;
        $scope.list = [{itens: []}];
        $scope.registro = {};
        $scope.info = { avisos: 0, erros: 0 };

        $scope.$watch('registro', function() {
            if ($scope.registro && $scope.registro.script) {
                var promise = decompileScript();
                $scope.tracker.carregando.addPromise(promise);
            }
        });

        $scope.valueChanged = function () {
            buildScript();
        };

        $scope.getEditorElement = function (campo) {
            if (campo.titulo) {
                if (campo.parametros && campo.parametros.length) {
                    return campo.titulo + ': ';
                }
                return campo.titulo;
            }
            if (campo.id == 'texto') {
                return '';
            }
            return campo.id;
        };

        function decompileScript () {
            var deferred = $q.defer();
            var script = $scope.registro.script.split(/\r\n|\r|\n/g);

            deferred.resolve(true);
            return deferred.promise;
        }

        function buildScript () {
            $timeout(function() {
                $scope.registro.script = '';
                _.forEach($scope.list, function (expression) {
                    _.forEach(expression.itens, function (keyword, index) {
                        if (keyword.id != 'texto') {
                            $scope.registro.script += (!index ? '': ' ') + (keyword.titulo ? keyword.titulo : keyword.id);
                        }
                        _.forEach(keyword.parametros, function (parameter, parameterIndex) {
                            if (!parameter.value) {
                                parameter.placeholder = 'Não definido';
                                if (!keyword.alerta) {
                                    keyword.alerta = 'Parâmetro não definido';
                                    $scope.info.avisos++;
                                }
                            } else {
                                if (keyword.alerta) {
                                    $scope.info.avisos --;
                                }
                                delete keyword.alerta;
                            }
                            if (keyword.id == 'texto') {
                                $scope.registro.script += ' ' + (parameter.value  ? parameter.value : parameter.placeholder );
                                return;
                            }
                            if (parameterIndex == 0) {
                                $scope.registro.script += ' ( ';
                            }
                            if (parameterIndex + 1 == keyword.parametros.length) {
                                $scope.registro.script += (parameter.value  ? parameter.value : parameter.placeholder )+ ' ) ';
                            } else {
                                $scope.registro.script += (parameter.value ? parameter.value :  parameter.placeholder) + ' , ';
                            }
                        });
                        if (index + 1 == expression.itens.length) {
                            $scope.registro.script += ' \n ';
                        }
                    });
                });

                if (!$scope.registro.script) {
                    $scope.info = { avisos: 0, erros: 0 };
                }
            }, 50);
        }

        $scope.addLine = function (index) {
            $scope.list.splice(index + 1, 0, {itens: []});
            buildScript();
        };

        $scope.removeItem = function (parentIndex, index) {
            if (index !== undefined) {
                $scope.list[parentIndex].itens.splice(index, 1);
            } else {
                $scope.list.splice(parentIndex, 1);
                if (!$scope.list.length) {
                    $scope.addLine(0);
                }
            }
            buildScript();
        };

        $scope.dropCallback = function(event, index, item, external, type, expressao){
            buildScript ();
            return item;
        };

        $scope.menuOptions = [
            ['Adicionar linha', function (item) {
                $scope.addLine(item.$index);
            }],
            ['Remover linha', function (item) {
                $scope.removeItem(item.$index);
            }]
        ];
    }
})();
