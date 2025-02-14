(function() 
	{

	    'use strict';

	    angular.module('arrecadacao.common').directive('camposAdicionais',
	    	function() {
	            return {
	            	restrict: 'AE',
	            	scope: {
						list: '=',
						filter: '=',
						isInfoComplModel: '@',
						ngDisabled: '='
	            	},
					controller: function($scope) {
						$scope.$watch('list', function() {
							if ($scope.list) {
								$scope.getList = function (filter) {
									if (filter){
										return _.filter($scope.list, {tipoUnidade: filter});
									}
									return $scope.list;
								}
							}
						});
					},
	                templateUrl: 'common/directives/camposAdicionais/campos-adicionais.html',
	                transclude: true
				}
			}
		)
	}
 )();
