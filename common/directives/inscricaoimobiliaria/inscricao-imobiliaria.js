(function() {

    'use strict';

angular.module('app')
  
.directive( 'inscricaoImobiliaria2', function(){
     return { 
               restrict: 'AEC',
               replace: true,
               scope:{
                      campo01: '=',
                      campo02: '=',
                      campo03: '=',
                      campo04: '=',
                      campo05: '=',
                      campo06: '=',
                      campo07: '=',
                      campo08: '=',
                      campo09: '=',
                      campo10: '='
               },
               controller: 'ctrlInscricao',
               templateUrl: 'common/directives/inscricaoimobiliaria/inscricao-imobiliaria.html',
               link: function($scope, element, attrs, ctrl) {}
               }
})
.controller( 'ctrlInscricao', ['$scope', 'ConfigInscrImobiliariasService', 'arrecadacao.common.GridConfig', function($scope, ConfigInscrImobiliariasService, GridConfig) {

     var vm = $scope;
     vm.listagem = {};

     /*array usado para simplificar o código*/
     var campos = ['campo01', 'campo02', 'campo03', 'campo04', 'campo05', 'campo06', 'campo07', 'campo08', 'campo09', 'campo10'];

     /*Inicialização dos campos para não setar undefined*/
     angular.forEach( campos, function(campo){
          vm[campo] = vm[campo]||'';
     });

     /**Colocado dentro de um objeto pois os campos diretamente no scope não estavam sendo bindados**/
     vm.configInscricao = {   templateUrl: 'myPopoverTemplate.html',
                              campo01: vm.campo01,
                              campo02: vm.campo02,
                              campo03: vm.campo03,
                              campo04: vm.campo04,
                              campo05: vm.campo05,
                              campo06: vm.campo06,
                              campo07: vm.campo07,
                              campo08: vm.campo08,
                              campo09: vm.campo09,
                              campo10: vm.campo10
                              };
     /**consulta para filtrar os campos da inscrição que estão ativos**/
     vm.gridConfig = GridConfig.configure({  filter : ' and situacao = \'ATIVO\'',
                                             sortedBy: 'ordem'});


     /**executada pela diretiva para setar os campos no scope atual e executar a formataçãodos campos da inscrição imobiliária**/
     vm.alterado = function( idCampo, valor ){
          var novoValor = preencher( idCampo, valor );
          vm[campos[idCampo]] = novoValor;
          vm.configInscricao[campos[idCampo]] = novoValor;
          vm.formatarInscricao();
     };

     /** formatar inscrição imobiliária do campo alterado**/
     vm.formatarInscricao = function(inscricao){
          vm.inscricaoImobiliaria='';
          angular.forEach(campos, function(campo){
               vm.inscricaoImobiliaria = vm.inscricaoImobiliaria + 
                                             (angular.isUndefined(vm.configInscricao[campo]) ? '' : 
                                             vm.configInscricao[campo]=='' ? '' : vm.configInscricao[campo] + '.');
          });
          vm.inscricaoImobiliaria=vm.inscricaoImobiliaria.substring(0,vm.inscricaoImobiliaria.lastIndexOf("."));
     };

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
          if (tamanhoCampo < campoAlterado.qtdCaracter && campoAlterado.completarCom !== null && campoAlterado.posicaoCompletar !== 'NAO_PREENCHER' && campoAlterado.posicaoCompletar !== null) {
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
    vm.formatarInscricao();
}])
.directive('popoverClose', function($timeout){
  return{
    scope: {
      excludeClass: '@'
    },
    link: function(scope, element, attrs) {
      var trigger = document.getElementsByClassName('trigger');
      
      function closeTrigger(i) {
        $timeout(function(){ 
          angular.element(trigger[0]).triggerHandler('click').removeClass('trigger'); 
        });
      }
      
      element.on('click', function(event){
        var etarget = angular.element(event.target);
        var tlength = trigger.length;
        if(!etarget.hasClass('trigger') && !etarget.hasClass(scope.excludeClass)) {
          for(var i=0; i<tlength; i++) {
            closeTrigger(i)
          }
        }
      });
    }
  };
})
.directive('popoverElem', function(){
  return{
    link: function(scope, element, attrs) {
      element.on('click', function(){
        return element.addClass('trigger');
      });
    }
  };
})
})();
