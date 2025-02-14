(function () {

	angular.module('app')
	.controller('AutenticacaoModalCtrl', ['$scope', '$modalInstance',
		function($scope, $modalInstance) {
			var vm = $scope;
            
            vm.confirmar = function(resolve) {
                $scope.$parent.autenticado()
                $modalInstance.close()
			};
		}
	])
})();