(function () {
	'use strict';

	var DEFAULT_COLORS = [
		{ hex: '#1E4471', name: ''},
		{ hex: '#3475C1', name: ''},
		{ hex: '#7FAADC', name: ''},
		{ hex: '#CFDFF2', name: ''},

		{ hex: '#237792', name: ''},
		{ hex: '#48B1D3', name: ''},
		{ hex: '#9AD4E7', name: ''},
		{ hex: '#ECF7FB', name: ''},

		{ hex: '#8B221D', name: ''},
		{ hex: '#D64038', name: ''},
		{ hex: '#E7918D', name: ''},
		{ hex: '#F9E2E1', name: ''},

		{ hex: '#B6860F', name: ''},
		{ hex: '#EFBC3C', name: ''},
		{ hex: '#F7DC9A', name: ''},
		{ hex: '#FEFDF9', name: ''},
		
		{ hex: '#32623E', name: ''},
		{ hex: '#54A668', name: ''},
		{ hex: '#96CAA3', name: ''},
		{ hex: '#DAECDE', name: ''},
		
		{ hex: '#AF5413', name: ''},
		{ hex: '#EA863E', name: ''},
		{ hex: '#F4C09A', name: ''},
		{ hex: '#FEF9F6', name: ''},
		
		{ hex: '#6E3D7C', name: ''},
		{ hex: '#A46AB5', name: ''},
		{ hex: '#CEAED7', name: ''},
		{ hex: '#F7F2F9', name: ''},
		
		{ hex: '#8D2A5B', name: ''},
		{ hex: '#CB528E', name: ''},
		{ hex: '#E3A0C1', name: ''},
		{ hex: '#FAEFF4', name: ''},
		
		{ hex: '#595959', name: ''},
		{ hex: '#C0C0C0', name: ''},
		{ hex: '#EBEDF0', name: ''},
		{ hex: '#F5F7FA', name: ''},
	];

	angular.module('app')
		.directive('uiColorSelector', directive);

	function directive() {
		return {
			restrict: 'E',
			templateUrl: 'common/directives/ui-color-selector/color-selector.directive.html',
			scope: {
				colors: '=?',
				model: '=?',
				label: '@?',
				inputClass: '@?',
				hideLabel: '=?',
				square: '=?',
				onChange: '&'
			},
			link: function(scope, elem, attr) {
				$('.ui-color-selector', elem).click(function (event) {
					event.stopPropagation();

					$('.dropdown-toggle', elem).dropdown('toggle');
				});
				$('.ui-color-selector .dropdown-menu').click(function (event) {
					event.stopPropagation();
				});
			},
			controller: Controller,
			controllerAs: 'vm'
		};
	}

	Controller.$inject = ['$scope'];

	function Controller($scope) {
		var vm = this;
		var initialColor = !_.isUndefined(_.first($scope.colors)) ? _.first($scope.colors).hex : '#2980b9';

		$scope.$watch('model', function(newValue, oldValue) {
			if (newValue === '' || !angular.isDefined(newValue)) {
				_changeColor(initialColor);
			}

			if (newValue !== oldValue){
				($scope.onChange || angular.noop)();
			}
		});

		if (!angular.isDefined($scope.square)) {
			$scope.square = false;
		}

		if (!angular.isDefined($scope.hideLabel)) {
			$scope.hideLabel = false;
		}
		
		if (!angular.isDefined($scope.hideLabel)) {
			$scope.hideLabel = false;
		}

		vm.colorSelected = $scope.model || initialColor;
		$scope.model = vm.colorSelected;
		vm.label = $scope.label || 'Cor';
		vm.listColors = $scope.colors || DEFAULT_COLORS;

		vm.changeColor = _changeColor;

		function _changeColor(newColor) {
			$scope.model = vm.colorSelected = newColor;
		}
	}

})();
