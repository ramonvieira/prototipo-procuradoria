(function()
	{

	    'use strict';

	    angular.module('arrecadacao.common').directive('findResult',
	    	function() {
	            return {
	            	restrict: 'AEC',
	            	scope: {
						tracker: '=',
						gridConfig: '=',
						exibir: '=',
						isCarregando: '=',
						cadastro: '@',
						notExists: '=',
						showImage: '='
	            	},
	                templateUrl: 'common/directives/resultado-pesquisa/find-result.html',
	                transclude: true,
					controller: function($scope, $injector, $timeout) {
						var focus = $injector.get('bfc.FocusCtrl');
						$scope.pesquisar = function () {
							focus.set('searchInput');
						};

						$scope.filtrar = function () {
							$timeout(function(){
								$('#filters-button').click();
							},100);
						}
					}
				}
			}
		)
	}
 )();
