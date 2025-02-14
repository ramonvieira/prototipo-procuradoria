(function()
    {

        'use strict';

        angular.module('arrecadacao.common').controller('inscricaoCtrl', ['$scope', 'ConfigInscrImobiliariasService', 'arrecadacao.common.GridConfig', 'arrecadacao.common.FormatInscricaoImobiliaria', function($scope, ConfigInscrImobiliariasService, GridConfig, FormatInscricaoImobiliaria) {
                var gridConfig = angular.copy(GridConfig.configure({ conditions : ' situacao = \'ATIVADO\'', sortedBy: 'campo'}));

                function getConfiguracaoInscricao() {
                    ConfigInscrImobiliariasService.findBy(gridConfig.buildFilter()).then(function(data) {
                        $scope.inscricaoImobiliariaList = [];
                        $scope.configInscrImobiliarias = data.data;
                        for(var campo=1; campo<=10; campo++) {
                            var config = _.findWhere($scope.configInscrImobiliarias, {campo: campo});
                            if(config && config.situacao == 'ATIVADO') {
                                $scope.inscricaoImobiliariaList.push({
                                    campo: ($scope.inscricao ? getValor(campo, $scope.inscricao) : null),
                                    configInscricoesImobiliarias: config
                                });
                            }
                        }

                        if (!$scope.inscricaoImobiliariaList.length) {
                            $scope.inscricaoImobiliariaList.push({
                                configInscricoesImobiliarias: {
                                    descricao: 'Ainda não existe uma configuração para a inscrição imobiliária'
                                }
                            });
                            $scope.isDisabled = true;
                            $scope.required = false;
                        }
                        $scope.width = 100/ $scope.configInscrImobiliarias.length;
                        $scope.$emit('configuracaoInscricao', $scope.inscricaoImobiliariaList);
                    });
                }

                $scope.$watch('inscricao', function() {
                    getConfiguracaoInscricao();
                });

                $scope.$watch('disabled', function(value) {
                    $scope.isDisabled = value;
                });

                function setValor(campo, valor, inscricaoImobiliaria) {
                    return inscricaoImobiliaria['campo' + campo] = valor;
                }

                function getValor(campo, inscricaoImobiliaria) {
                    return inscricaoImobiliaria['campo' + campo];
                }

                function inscricaoChanged(campo, imovelInscricao){
                    if (angular.isUndefined(campo) || angular.isUndefined(imovelInscricao)) return;
                    if (!$scope.inscricao) {
                        $scope.inscricao = {};
                    }
                    setValor(campo, imovelInscricao.campo, $scope.inscricao);
                    if (!$scope.formatar) $scope.$emit('inscricaoChanged-' + $scope.id, { imovelInscricao : imovelInscricao });
                    if (!angular.isUndefined($scope.formatar) && $scope.formatar) {
                        FormatInscricaoImobiliaria.format($scope.inscricao, $scope.configInscrImobiliarias).then(function (data) {
                            $scope.inscricao.formatada = data;
                            $scope.$emit('inscricaoChanged-' + $scope.id, { imovelInscricao : imovelInscricao });
                        });
                    }
                    $scope.inscricao;
                }

                $scope.setCampoFormatado = function (imovelInscricao) {
                    if (!imovelInscricao.campo) {
                        inscricaoChanged(imovelInscricao.configInscricoesImobiliarias.campo, imovelInscricao);
                        return null;
                    }
                    var campoAlterado = imovelInscricao.configInscricoesImobiliarias;
                    var tamanhoCampo = angular.isUndefined(imovelInscricao.campo) ? 0 : imovelInscricao.campo.length;
                    var valorCampo = angular.isUndefined(imovelInscricao.campo) ? 0 : imovelInscricao.campo;
                    if (tamanhoCampo < campoAlterado.qtdCaracter && campoAlterado.completarCom !== null && campoAlterado.posicaoCompletar !== 'NAO_PREENCHER' && campoAlterado.posicaoCompletar !== null) {
                        if (campoAlterado.posicaoCompletar === 'A_ESQUERDA') {
                            imovelInscricao.campoFormatado = angular.isUndefined(campoAlterado.completarCom)?'':campoAlterado.completarCom.repeat(campoAlterado.qtdCaracter - tamanhoCampo) + '' + valorCampo;
                        } else if (campoAlterado.posicaoCompletar === 'A_DIREITA') {
                            imovelInscricao.campoFormatado = valorCampo + '';
                            imovelInscricao.campoFormatado += angular.isUndefined(campoAlterado.completarCom) ? '' : campoAlterado.completarCom.repeat(campoAlterado.qtdCaracter - tamanhoCampo);
                        }
                    } else {
                        imovelInscricao.campoFormatado = angular.copy(valorCampo);
                    }
                    imovelInscricao.campo = angular.copy(imovelInscricao.campoFormatado);
                    inscricaoChanged(campoAlterado.campo, imovelInscricao);
                    return imovelInscricao;
                };

            }])
            .directive('inscricaoImobiliaria',
                function() {
                    return {
                        restrict: 'AE',
                        scope: {
                            inscricao: '=',
                            label: '@',
                            id: '@',
                            required: '@',
                            disabled: '=?',
                            formatar: '='
                        },
                        controller: 'inscricaoCtrl',
                        templateUrl: 'common/directives/inscricaoimobiliaria/inscricao-imobiliaria.html',
                        replace: true
                    };
                }
            );
    }
)();
