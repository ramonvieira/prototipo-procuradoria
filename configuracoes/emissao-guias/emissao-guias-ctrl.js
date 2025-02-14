(function() {

    angular.module('app').controller('app.EmissaoGuiasCtrl', EmissaoGuiasCtrl);

    EmissaoGuiasCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function EmissaoGuiasCtrl($scope, ModalCad) {

      var vm = $scope;

      vm.adicionar = function(b) {
          abrirPopup({
          });
      };

      function abrirPopup(resolve) {
          ModalCad.open({
              templateUrl: 'configuracoes/emissao-guias/emissao-guias-modal.html',
              controller: 'EmissaoGuiasModalCtrl',
              scope: $scope,
              resolve: angular.extend(resolve, {
                  persistRemove: false
              })
          });
      }
    }

    angular.module('app').controller('EmissaoGuiasModalCtrl', EmissaoGuiasModalCtrl);

    EmissaoGuiasModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function EmissaoGuiasModalCtrl($scope, ModalCad, params) {

        var vm = $scope;

        vm.teste = 'Olá mundo';

        $scope.anulaCredito = function() {
          if ($scope.tipoLancamento == 2){
            $scope.creditos = null;
          }
        };

    }

})();