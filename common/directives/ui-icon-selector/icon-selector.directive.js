(function () {
	'use strict';

	var DEFAULT_ICONS = [
		{ id: 0, ico: 'fa-clock-o'},
		{ id: 1, ico: 'fa-paper-plane'},
		{ id: 2, ico: 'fa-thumbs-up'},
		{ id: 3, ico: 'fa-thumbs-down'},
		{ id: 4, ico: 'fa-play'},
		{ id: 5, ico: 'fa-pause'},
		{ id: 6, ico: 'fa-star-half-o'},
		{ id: 7, ico: 'fa-star'},
		{ id: 8, ico: 'fa-calendar-o'},
		{ id: 8, ico: 'fa-times-circle'},
		{ id: 8, ico: 'fa-handshake-o'},
		{ id: 8, ico: 'fa-briefcase'},
		{ id: 8, ico: 'fa-bullhorn'},
		{ id: 8, ico: 'fa-calculator'},
		{ id: 8, ico: 'fa-envelope'},
		{ id: 8, ico: 'fa-exclamation-circle'},
		{ id: 8, ico: 'fa-eye'},
		{ id: 8, ico: 'fa-group'},
		{ id: 8, ico: 'fa-legal'},
		{ id: 8, ico: 'fa-map-marker'},
		{ id: 8, ico: 'fa-comments'},
		{ id: 8, ico: 'fa-balance-scale'},
		{ id: 8, ico: 'fa-lock'},
		{ id: 8, ico: 'fa-tree'},
		{ id: 8, ico: 'fa-archive'},
	];

	angular.module('app')
		.directive('uiIconSelector', directive);

	function directive() {
		return {
			restrict: 'E',
			templateUrl: 'common/directives/ui-icon-selector/icon-selector.directive.html',
			scope: {
				icons: '=?',
				cor: '=?',
				model: '=?',
				label: '@?',
				hideLabel: '=?',
				onChange: '&'
			},
			link: function(scope, elem, attr) {
				$('.ui-icon-selector', elem).click(function (event) {
					event.stopPropagation();

					$('.dropdown-toggle', elem).dropdown('toggle');
				});
				$('.ui-icon-selector .dropdown-menu').click(function (event) {
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
		var initialIcon = !_.isUndefined(_.first($scope.icons)) ? _.first($scope.icons).ico : 'fa-flag';

		$scope.$watch('model', function(newValue, oldValue) {
			if (newValue === '' || !angular.isDefined(newValue)) {
				_changeIcon(initialIcon);
			}

			if (newValue !== oldValue){
				($scope.onChange || angular.noop)();
			}
		});

		if (!angular.isDefined($scope.hideLabel)) {
			$scope.hideLabel = false;
		}

		vm.iconSelected = $scope.model || initialIcon;
		$scope.model = vm.iconSelected;
		vm.label = $scope.label || 'Cor';
		vm.listIcons = $scope.icons || DEFAULT_ICONS;

		vm.changeIcon = _changeIcon;

		function _changeIcon(newIcon) {
			$scope.model = vm.iconSelected = newIcon;
		}
	}

})();
