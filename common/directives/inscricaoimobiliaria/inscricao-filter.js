(function() {

    'use strict';

angular.module('tributos')

.directive( 'filterInscricaoImobiliaria2', function(){
     return {
               restrict: 'AEC',
               replace: true,
               scope:{
                      deCampo1: '=',
                      deCampo2: '=',
                      deCampo3: '=',
                      deCampo4: '=',
                      deCampo5: '=',
                      deCampo6: '=',
                      deCampo7: '=',
                      deCampo8: '=',
                      deCampo9: '=',
                      deCampo10: '=',
                      ateCampo1: '=',
                      ateCampo2: '=',
                      ateCampo3: '=',
                      ateCampo4: '=',
                      ateCampo5: '=',
                      ateCampo6: '=',
                      ateCampo7: '=',
                      ateCampo8: '=',
                      ateCampo9: '=',
                      ateCampo10: '=',
                      ngAlterando: '&?'
               },
               controller: 'ctrlInscrFilter',
               templateUrl: 'common/directives/inscricaoimobiliaria/inscricao-filter.html',
               link: function($scope, element, attrs, ctrl) {
               }
               }
})

.controller( 'ctrlInscrFilter', ['$scope', 'ConfigInscrImobiliariasService', 'arrecadacao.common.GridConfig',
                                  function($scope, ConfigInscrImobiliariasService, GridConfig) {

     var vm = $scope;
     vm.listagem = {};
     vm.valorFormatado = '';

     /*array usado para simplificar o código*/
     var campos = ['deCampo1', 'deCampo2', 'deCampo3', 'deCampo4', 'deCampo5',
                   'deCampo6', 'deCampo7', 'deCampo8', 'deCampo9', 'deCampo10',
                   'ateCampo1', 'ateCampo2', 'ateCampo3', 'ateCampo4', 'ateCampo5',
                   'ateCampo6', 'ateCampo7', 'ateCampo8', 'ateCampo9', 'ateCampo10'];
     //Inicialização dos campos para não setar undefined
     angular.forEach( campos, function(campo){
          vm[campo] = vm[campo] || '';
     });

     /**consulta para filtrar os campos da inscrição que estão ativos**/
     vm.gridConfig = GridConfig.configure({  filter : ' and situacao = \'ATIVO\'',
                                             sortedBy: 'campo'});


        /**executa o filtro individualmente para cada campo que compõe a inscrição imobiliaria**/
        vm.executaFiltro = function(listagemCampos, de, ate, indice, ref) {
            var valorDigitado = document.getElementById('inscricao_' + ref + '_' + indice ).value;
            var ctrl=0;

            if (angular.isUndefined( valorDigitado)|| valorDigitado.trim() =='' ) {
                atualizaInscricao(indice + 1, ref, '');
                return;
            }

            indice++;

            if((vm['deCampo' + (indice)]==="0000000000") && (ref==='de')) {
                atualizaInscricao(indice,ref, valorDigitado);
                preencheComZero(indice,ref, valorDigitado);
                return;
            }

            if(ref==='ate') {
              for (var i = valorDigitado.length - 1; i >= 0; i--) {
                if(valorDigitado[i]=== vm.listagem[indice-1].completarCom) {
                   ctrl++;
                }
              }
              if(valorDigitado.length>0) {
                if(ctrl===valorDigitado.length) {
                  return;
                }
              }
            }

            if(((ref==='ate')&&(valorDigitado==="")) ||
              (((ref==='de') && ((vm['ateCampo' + indice]==="")||
                (angular.isUndefined(vm['ateCampo' + indice])))))) {
              atualizaInscricao(indice, ref, valorDigitado);
              preencheComZero(indice,ref, valorDigitado);
              return;
            }

            atualizaInscricao(indice,ref, valorDigitado);
            preencheComZero(indice,ref, valorDigitado);
            if (!angular.isUndefined(vm.$parent.ngAlterando) && angular.isFunction(vm.$parent.ngAlterando)){

              var inscricao = {
                      deCampo1:  '' ,
                      deCampo2:  '' ,
                      deCampo3:  '' ,
                      deCampo4:  '' ,
                      deCampo5:  '' ,
                      deCampo6:  '' ,
                      deCampo7:  '' ,
                      deCampo8:  '' ,
                      deCampo9:  '' ,
                      deCampo10:  '' ,
                      ateCampo1:  '' ,
                      ateCampo2:  '' ,
                      ateCampo3:  '' ,
                      ateCampo4:  '' ,
                      ateCampo5:  '' ,
                      ateCampo6:  '' ,
                      ateCampo7:  '' ,
                      ateCampo8:  '' ,
                      ateCampo9:  '' ,
                      ateCampo10:  ''
              };

              for (var i = 1; i <= 10; i++) {
                if (vm['deCampo'+i]){
                  inscricao['deCampo'+i] = vm['deCampo'+i]
                }
                if (vm['ateCampo'+i]){
                  inscricao['ateCampo'+i] = vm['ateCampo'+i]
                }
              }
              vm.$parent.ngAlterando({listagemCampos: vm.listagem, inscricao:inscricao, indice:indice});
            }
        };

     /**executada pela diretiva para setar os campos no scope atual e executar a formataçãodos campos da inscrição imobiliária**/
        function alterado( idCampo, ref, valor ) {
            var novoValor = valor==''?'':preencher( idCampo-1, valor );
            var input = document.getElementById('inscricao_' + ref + '_' + (idCampo-1) );
            input.value = novoValor;
        };

        function atualizaInscricao(index, ref, value) {
            if (ref === 'de') {
                vm['deCampo' + index] = value;
            } else {
                vm['ateCampo'+index]=value;
            }
            alterado(index, ref, value);
        };

        function preencheComZero(index, ref, valorDigitado){
            var size = 10;
            var places = size - valorDigitado.length;
            var filled = Array.apply(null, Array(size)).map(Number.prototype.valueOf,0);
            for (var i = valorDigitado.length; i >= 0; i--) {
              filled[size]=valorDigitado[i];
              size--;
            }
            filled = filled.toString().replace(/,/g, "");
            if(ref==='de'){
               vm['deCampo' + index] = filled;
            }
            if(ref==='ate'){
              vm['ateCampo' + index] = filled;
            }
        }

       /** separar o retorno **/
       function montaInscricao() {
            vm.exemploInscricao = '';
            var index = 0;
            angular.forEach(vm.listagem, function (campo) {
                 vm.exemploInscricao = vm.exemploInscricao + '0'.repeat(campo.qtdCaracter) + '.';
                 var nome = 'CAMPO_'.concat(index + 1);
                 vm.listagem[index].campo = nome;
                 index = index + 1;
            });
       }

     function getConfiguracaoInscricao() {
          var promise = ConfigInscrImobiliariasService.findBy(vm.gridConfig.buildFilter());
          promise.then(function (data) {
               vm.listagem = data.data;
               vm.camposRestantes = 10 - vm.listagem.length;
               montaInscricao();
          });
          return promise;
     }

     function preencher( campo, valorDigitado ){
          var valorRetorno = valorDigitado;
          var campoAlterado = vm.listagem[campo];
          var tamanhoCampo = angular.isUndefined(valorRetorno) ? 0 : valorRetorno.length;
          if (tamanhoCampo < campoAlterado.qtdCaracter && campoAlterado.completarCom !== null &&
              campoAlterado.posicaoCompletar !== 'NAO_PREENCHER' && campoAlterado.posicaoCompletar !== null) {
               if (campoAlterado.posicaoCompletar === 'A_ESQUERDA') {
                   valorRetorno = angular.isUndefined(campoAlterado.completarCom)?'':campoAlterado.completarCom.repeat(campoAlterado.qtdCaracter - tamanhoCampo) + '' + valorRetorno;
               } else if (campoAlterado.posicaoCompletar === 'A_DIREITA') {
                   valorRetorno =  valorRetorno + '' + angular.isUndefined(campoAlterado.completarCom)?'':campoAlterado.completarCom.repeat(campoAlterado.qtdCaracter - tamanhoCampo);
               }
          }

          return valorRetorno;

     }
     /** Carregar informações dos campos da inscrição imobiliário indicados na configuração **/
     getConfiguracaoInscricao();
}])
})();
