(function()
	{

	    'use strict';

	    angular.module('arrecadacao.common').directive('gridActions',
	    	function() {
	            return {
	            	restrict: 'AEC',
	            	scope: {
						onEdit: '&?'
	            	},
	                templateUrl: 'common/directives/grid-actions/grid-actions.html',
	                transclude: true,
					controller: function($scope, $injector) {
						var PermissionsService = $injector.get('bfc.$$PermissionsService');
						var $state = $injector.get('$state');
						$scope.isRevokedOperation = function (operation) {
							return PermissionsService.isRevokedOperation($state.current.id, operation);
						}
					}
				}
			}
		)
	}
 )();
