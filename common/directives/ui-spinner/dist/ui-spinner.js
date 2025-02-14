(function () {
    'use strict';

    angular.module('ui-components').directive('uiSpinner', SpinnerDirective);
    function SpinnerDirective() {
        return {
            restrict: 'E',
            templateUrl: 'ui-spinner.directive.html',
            scope: {
                ngModel: '=',
                ngDisabled: '=',
                uiMin: '=?',
                uiMax: '=?',
                step: '=?',
                placeholder: '=?',
                debounceDelay: '=?'
            },
            compile: function () {
                return {
                    post: SpinnerDirectivePostLink
                };
            },
            require: 'ngModel'
        };
    }

    function SpinnerDirectivePostLink($scope, $element, $attrs, $ctrl) {

        $scope.step = angular.isDefined($scope.step) ? $scope.step : 1;

        var inputElement = $element.find('input');

        inputElement.on('keydown', function (event) {
            if (event.keyCode === 38) {
                $scope.$apply($scope.increase);
            } else if (event.keyCode === 40) {
                $scope.$apply($scope.decrease);
            }
        });

        inputElement.on('input', function () {
            if (!inputElement.val()) {
                $scope.$apply($ctrl.$setViewValue(null));
                return;
            }
        });

        inputElement.on('blur', function () {
            $scope.$apply($ctrl.$setTouched());
            if (!inputElement.val()) {
                $scope.$apply($ctrl.$setViewValue(null));
                return;
            }
            var format = _.debounce(formatValue, $scope.debounceDelay | 0 );
            $scope.$apply(format({
                value: inputElement.val(),
                updateViewValue: true
            }));
        });

        $ctrl.$render = function () {
            if (angular.isUndefined($ctrl.$viewValue) || $ctrl.$viewValue === null) {
                inputElement.val('');
                return;
            }

            var value = String($ctrl.$viewValue);
            formatValue({
                value: value
            });
        };

        $scope.maxlength = function () {
            if (!$scope.uiMax) {
                return 9007199254740992;
            }
            return $scope.uiMax.toString().length;
        }

        $scope.increase = function () {
            formatValue({
                value: String($scope.ngModel + $scope.step),
                updateViewValue: true
            });
        };

        $scope.decrease = function () {
            formatValue({
                value: String($scope.ngModel - $scope.step),
                updateViewValue: true
            });
        };

        $scope.$watchGroup(['uiMin', 'uiMax'], function() {
            if(angular.isDefined($scope.uiMin) && angular.isDefined($scope.uiMax) && $scope.uiMin > $scope.uiMax) {
                console.warn('[ui-spinner] Valor mínimo maior que valor máximo');
            }

            onUpdateProperty();
        });

        function onUpdateProperty() {
            if (!inputElement.val()) {
                return;
            }
            formatValue({
                value: inputElement.val(),
                updateViewValue: true
            });
        }

        function formatValue(options) {
            options = options || {};
            var value = options.value || '';

            var negativo = false;
            var numerosInteiros = '';

            for (var posicaoString = 0; posicaoString < value.length; posicaoString++) {

                var char = value[posicaoString];

                if (char === '-' && !numerosInteiros.length) {
                    negativo = true;
                }

                if (char.match(/\d/)) {
                    numerosInteiros += char;
                }
            }

            var newTextValue = (negativo ? '-' : '') + numerosInteiros;
            var newValue = Number(newTextValue);

            if (newTextValue === '-') {
                newValue = null;
            } else {
                if (angular.isDefined($scope.uiMin) && newValue < $scope.uiMin) {
                    newValue = $scope.uiMin;
                } else if (angular.isDefined($scope.uiMax) && newValue > $scope.uiMax) {
                    newValue = $scope.uiMax;
                }

                newTextValue = String(newValue);
            }

            if (options.updateViewValue) {
                $ctrl.$setViewValue(newValue);
            }

            inputElement.val(newTextValue);
        }
    }
})();
angular.module("ui-components").run(["$templateCache", function($templateCache) {$templateCache.put("ui-spinner.directive.html","<div class=\"ui-spinner input-group\" style=\"margin-bottom:-4px;\">\r\n    <input class=\"form-control ui-spinner-input\" type=\"text\" ng-disabled=\"ngDisabled\" placeholder=\"{{placeholder}}\" maxlength=\"{{maxlength()}}\">\r\n    <a href=\"\" ng-click=\"!ngDisabled && increase()\" ng-disabled=\"ngDisabled\" class=\"ui-spinner-button ui-spinner-up\">\r\n        <span class=\"icon-caret-up\"></span>\r\n    </a>\r\n    <a href=\"\" ng-click=\"!ngDisabled && decrease()\" ng-disabled=\"ngDisabled\" class=\"ui-spinner-button ui-spinner-down\">\r\n        <span class=\"icon-caret-down\"></span>\r\n    </a>\r\n</div>");}]);