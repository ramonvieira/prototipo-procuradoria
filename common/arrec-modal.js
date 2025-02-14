(function(){

	'use strict';
    
    angular.module('app')
    .factory('arrecModal', ['ui.components.Modal', 'arrecadacao.common.ModalCad',
		function(uiModal, ModalCad) {
			function _open(templateUrl, $scope, resolve, size, controller) {
				if(_.isEmpty(resolve)) {
					$scope.registro = new Object
					$scope.isEditing = false
				} else {
					if (resolve.newScope) {
						eval('$scope.'+resolve.newScope+'= new Object')
					} else {
						$scope.registro = angular.copy(resolve)
					}
					$scope.isEditing = true
				}

				uiModal.open({
					templateUrl: templateUrl,
					controller: controller,
					controllerAs: controller,
					size: size == '' ? '' : size,
					params: resolve,
					scope: $scope,
					resolve: resolve ? angular.extend(resolve) : null,
					autoFocus: false,
				});
				return
			}
			function _openOld(templateUrl, $scope, resolve, size, controller) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: controller,
					scope: $scope,
					resolve: angular.extend(resolve, {
						persistRemove: false
					})
				});
				return
			}
			return {
				open: _open,
				openOld: _openOld,
				dismiss: function () {
					console.log('Fechar modal');
					// console.log($scope);
					uiModal.$dismiss
				}
			}
		}
	])
})();