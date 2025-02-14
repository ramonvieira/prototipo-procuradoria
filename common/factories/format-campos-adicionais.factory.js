(function () {

    'use strict';

    function FormatCamposAdicionaisFactory($q) {

        function FormatCamposAdicionaisFactory() {}

        function _formataCampoDataHora(campo) {
            campo.dhCampo = FormatCamposAdicionaisFactory.prototype.formatarCampoDataHora(campo.tipo, campo.dhCampo);
        }

        FormatCamposAdicionaisFactory.prototype.formatarCampoDataHora = function (tipo, valor) {
            if (!valor || !tipo) {
                return;
            }
            var valorRetornar = angular.copy(valor);
            if (tipo === 'HORA' && (/^([01]\d|2[0-3]):([0-5]\d)$/).test(valorRetornar.substr(0,5))) {
                valorRetornar = '1900-01-01 ' + valorRetornar;
                if (valorRetornar.length === 16) {
                    valorRetornar = valorRetornar + ':00';
                }
                return valorRetornar;
            }
            if (tipo === 'DATA' && valorRetornar.length <= 10) {
                return moment(valorRetornar).format('YYYY-MM-DD') + " 00:00:00";
            }
            if (tipo === 'DATAHORA' && valorRetornar.length <= 19) {
                return moment(valorRetornar).format('YYYY-MM-DD HH:mm:ss');
            }
            return valorRetornar;
        };

        function _getIdListaSelecao(opcoes, campo) {
            if (opcoes && opcoes.length) {
                if (opcoes[0].idCamposAdicionais.id == campo.idOpcoesCopy.id) {
                    return opcoes[0].id;
                }
            }
            return null;
        }

        function _formataCampoListaSelecao(campo) {
            if (campo.tipo == 'LISTA_SELECAO') {
                var opcoes = angular.copy(campo.informacoesComplementaresOpcoes);
                campo.informacoesComplementaresOpcoes = [];
                if (!campo.idOpcoesCopy) {
                    return;
                }
                if (campo.idOpcoesCopy.id) {
                    campo.informacoesComplementaresOpcoes.push({
                        id: _getIdListaSelecao(opcoes, campo),
                        idInformacoesComplementares: {id: !campo.idInfComplementar ? null : campo.idInfComplementar},
                        idCamposAdicionais: {id: campo.idOpcoesCopy.id}
                    });
                }
            }
        }

        function _formataCampoMultiplaSelecao(campo) {
            if (campo.tipo == 'MULTIPLA_SELECAO') {
                var opcoes = angular.copy(campo.informacoesComplementaresOpcoes);
                campo.informacoesComplementaresOpcoes = [];
                if (!campo.idOpcoesCopy || campo.idOpcoesCopy.length < 1) {
                    return;
                }
                _.forEach(campo.idOpcoesCopy, function (opcao, index) {
                    campo.informacoesComplementaresOpcoes.push({
                        id: opcoes[index] ? opcoes[index].id : null,
                        idInformacoesComplementares: {id: !campo.idInfComplementar ? null : campo.idInfComplementar},
                        idCamposAdicionais: {id: opcao.id}
                    });
                });
            }
        }

        function _isNotEmpty(campoAdicional) {
            return (campoAdicional.hrCampo != null ||
            campoAdicional.texto != null ||
            campoAdicional.vlCampo != null ||
            campoAdicional.areaTexto != null ||
            campoAdicional.idOpcoes != null ||
            campoAdicional.informacoesComplementaresOpcoes != null ||
            campoAdicional.idCamposAdicionaisFilho != null);
        }

        FormatCamposAdicionaisFactory.prototype.format = function (lista, idAgrupamento, ano, data) {
            var _camposAdicionais = angular.copy(lista);
            var _informacoesComplementares = [];
            if (lista) {
                _.forEach(_camposAdicionais, function (campoAdicional) {
                    if (ano || campoAdicional.anoBase) {
                        campoAdicional.anoBase = ano || campoAdicional.anoBase;
                    }
                    if (data || campoAdicional.dataBase) {
                        campoAdicional.dataBase = data || campoAdicional.dataBase;
                    }
                    if (idAgrupamento || campoAdicional.agrupamentos.id) {
                        campoAdicional.agrupamentos = {id: idAgrupamento || campoAdicional.agrupamentos.id};
                    }
                    _formataCampoDataHora(campoAdicional);
                    _formataCampoListaSelecao(campoAdicional);
                    _formataCampoMultiplaSelecao(campoAdicional);
                    delete campoAdicional.camposAdicionaisSelectOptions;
                    delete campoAdicional.camposAdicionaisSelectOptionsMul;
                    delete campoAdicional.idOpcoesCopy;
                    delete campoAdicional.informacoesComplementaresOpcoesCopy;
                    delete campoAdicional.informacoesComplementares;
                    if (_isNotEmpty(campoAdicional)) {
                        _informacoesComplementares.push(campoAdicional);
                    }
                });
            }
            return $q.when(_informacoesComplementares);
        };

        return new FormatCamposAdicionaisFactory();

    }

    function UtilsCamposAdicionaisFactory() {

        function UtilsCamposAdicionaisFactory(){}

        var numericFields = ['AREA_CONSTRUIDA',
                            'AREA_TERRENO',
                            'AREA_TOTAL',
                            'NUMERICO',
                            'VALOR_VENAL',
                            'VALOR_VENAL_CONSTRUIDO',
                            'VALOR_VENAL_TERRITORIAL'];

        var textFields = ['CNPJ','CPF','EMAIL','TELEFONE','TEXTO'];
        var textAreaFields = ['AREA_TEXTO'];
        var dateFields = ['DATA','DATAHORA','HORA'];
        var selectionFields = ['MULTIPLA_SELECAO', 'LISTA_SELECAO'];

        UtilsCamposAdicionaisFactory.prototype.isNumeric = function( campo ){
            return _.contains(numericFields, campo.tipo);
        };

        UtilsCamposAdicionaisFactory.prototype.isText = function(campo){
            return _.contains(textFields, campo.tipo);
        };

        UtilsCamposAdicionaisFactory.prototype.isDate = function (campo){
            return _.contains(dateFields, campo.tipo);
        };

        UtilsCamposAdicionaisFactory.prototype.isTextArea = function (campo){
            return _.contains(textAreaFields, campo.tipo);
        };

        UtilsCamposAdicionaisFactory.prototype.isSelection = function (campo){
            return _.contains(selectionFields, campo.tipo);
        };

        return new UtilsCamposAdicionaisFactory();

    }

    angular.module('tributos.common').factory('tributos.common.UtilsCamposAdicionais', UtilsCamposAdicionaisFactory);
    angular.module('tributos.common').factory('tributos.common.FormatCamposAdicionais', FormatCamposAdicionaisFactory);
    FormatCamposAdicionaisFactory.$inject = ['$q'];

})();
