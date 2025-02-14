angular.module('arrecadacao.common')
.directive("clickToEdit", ['$timeout', 'bfc.FocusCtrl', function($timeout, FocusCtrl) {
	var editorTemplate =
	'<form name="inlineEditForm"><div class="">' +
		'<div ng-hide="view.editorEnabled">' +
			'{{value}} ' +
			'<span class="btn-group btn-group-xs pull-right" role="group">' +
				'<a ng-click="enableEditor(index)" class="btn btn-xs btn-default" role="button" title="Editar">' +
					'<i class="icon-pencil"></i>' +
				'</a>' +
				'<a ng-click="remove()" class="btn btn-xs btn-default" title="Deletar campo" role="button" aria-label="Remove">' +
					'<i class="icon-trash"></i>' +
				'</a>' +
			'</span>' +
		'</div>' +


		'<div ng-show="view.editorEnabled">' +
			'<div class="row mBottom0">' +
				'<div class="col-md-9">' +
					'<input id="viewValue-{{index}}" ng-model="view.editableValue" class="form-control" ng-keyup="onEnter($event)" maxlength="{{maxlength}}" bf-required="true">' +
				'</div>' +
				'<div class="col-md-2 pull-right">' +
					'<span class="btn-group btn-group-xs pull-right" role="group">' +
						'<a ng-click="save(index)" class="btn btn-default" role="button" title="Salvar alteração" ng-disabled="inlineEditForm.$invalid"><i class="icon-save"></i></a>' +
						'<a ng-click="disableEditor()" class="btn btn-default" role="button" title="Cancelar alteração"><i class="icon-remove"></i></a>' +
					'</span>' +
				'</div>'+
			'</div>'+
		'</div>' +
	'</div></form>';

	return {
		restrict: "A",
		replace: true,
		template: editorTemplate,
		scope: {
			value: "=clickToEdit",
			remove: "&?",
			maxlength: '@',
			index: "=",
			sortableOptions: "=",
			editing: "="
		},
		controller: function($scope) {
			// Desabilitar ui-sortable quando houver input de edição
			$scope.$watch('view.editorEnabled', function(val) {
				$scope.sortableOptions.disabled = $scope.editing.length > 0;
			});

			$scope.view = {
				editableValue: $scope.value,
				editorEnabled: false
			};

			$scope.onEnter = function(event) {
				if (event.keyCode == 13) {
					$scope.save();
				}
			};

			$scope.enableEditor = function(index) {
				$timeout(function() {
					$scope.editing.push(index);
					$scope.view.editorEnabled = true;
					$scope.view.editableValue = $scope.value;
					FocusCtrl.set('viewValue-' + index);
				}, 100);
			};

			$scope.disableEditor = function(index) {
				$timeout(function() {
					$scope.view.editorEnabled = false;
					$scope.editing.splice($scope.editing.indexOf(index, 1));
				}, 100);
			};

			$scope.save = function(index) {
				if ($scope.view.editableValue && $scope.view.editableValue.trim().length > 0) {
					$scope.value = $scope.view.editableValue;
					$scope.disableEditor(index);	
				}
			};
		}
	};
}]);