(function() {

    angular.module('app').controller('app.AssinandoDocumentosCtrl', AssinandoDocumentosCtrl);

    AssinandoDocumentosCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function AssinandoDocumentosCtrl($scope, ModalCad) {

      var vm = $scope;

      vm.adicionar = function(b) {
          abrirPopup({
          });
      };

      function abrirPopup(resolve) {
          ModalCad.open({
              templateUrl: 'configuracoes/assinando-documentos-digitais/assinando-documentos-digitais.html',
              controller: 'AssinandoDocumentosModalCtrl',
              scope: $scope,
              resolve: angular.extend(resolve, {
                  persistRemove: false
              })
          });
      }
    }

    angular.module('app').controller('AssinandoDocumentosModalCtrl', AssinandoDocumentosModalCtrl);

    AssinandoDocumentosModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function AssinandoDocumentosModalCtrl($scope, ModalCad, params) {

        var vm = $scope;

        $scope.anulaCredito = function() {
          if ($scope.tipoLancamento == 2){
            $scope.creditos = null;
          }
        };

        $scope.openAnexo = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'cadastros/emissao-cda/aba-execucao/adicionando-anexo.html',
                controller: function($scope){},
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

    }

})();