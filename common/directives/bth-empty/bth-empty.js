(function () {
    angular.module('app')
    .directive('bthEmpty', function(){
		return {
			restrict: 'E',
			template: `
				<div class="bth-empty {{ICON}}">
					<h4>{{title}}</h4>
				</div>
			`,
			scope: {
				emptyLabel     : '@?',
				emptyLabelFull : '@?',
				icon           : '@?',
			},
			controller: function($scope, $filter) {
				var prefix = 'Ainda não há ';
				var sufix = ' por aqui';
				$scope.title;

				$scope.ICON = $scope.icon ? $scope.icon : 'bth-empty--records'

				if(!_.isEmpty($scope.emptyLabelFull)) {
					$scope.title = $scope.emptyLabelFull
				} else {
					if($scope.emptyLabel != 'false') {
						if(!_.isEmpty($scope.emptyLabel)) {
							$scope.title = prefix + $scope.emptyLabel.toLowerCase() + sufix
						} else {
							$scope.title = prefix + 'registros' + sufix
						}
					}
				}
			}
		}
	})
})();