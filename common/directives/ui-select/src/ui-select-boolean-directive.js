(function () {
    'use strict';

    angular.module('ui-components').directive('uiSelectBoolean', DirectiveDefinition);

    DirectiveDefinition.$inject = [];
    function DirectiveDefinition() {
        return {
            restrict: 'E',
            template: '<input id={{id}} ng-class="ngclass" type="hidden" placeholder=" " />',

            require: 'ngModel',

            scope: {
                id: '@?',
                model: '=ngModel',
                ngDisabled: '=',
                ngclass: '=',//usado ngclass ao invés de ngClass para que a diretiva não aplique no container
                allowClear: '=?',

                trueDescription: '@',
                falseDescription: '@',

                dropdownCssClass: '=?',
                dropdownAutoWidth: '=?'
            },

            link: postLink
        };
    }

    var defaultData = [
        {id: 'true', text: 'Sim'},
        {id: 'false', text: 'Não'}
    ];

    function postLink($scope, $element, $attrs, $ctrl) {
        var data = angular.copy(defaultData);

        var select2Element = $element.find('input');

        select2Element
            .select2({
                data: data,
                initSelection: initSelection,
                allowClear: $scope.allowClear !== false,
                dropdownCssClass: $scope.dropdownCssClass,
                dropdownAutoWidth: $scope.dropdownAutoWidth === true
            })
            .on('select2-blur', function () {
                $scope.$apply($ctrl.$setTouched());
                $element.blur();
            })
            .on('change', function (event) {
                $scope.$apply(function () {
                    $ctrl.$setTouched();
                    $ctrl.$setDirty();
                    $scope.model = toBoolean(event.val);
                });
            });

        $scope.$watch('model', function (value) {
            select2Element.select2('val', toString(value));
        });
        $scope.$watch('ngDisabled', function (value) {
            select2Element.select2('enable', !value);
        });
        $scope.$watch('trueDescription', function (value) {
            if (value) {
                data[0].text = value;
                select2Element.select2('val', toString($scope.model));
            }
        });
        $scope.$watch('falseDescription', function (value) {
            if (value) {
                data[1].text = value;
                select2Element.select2('val', toString($scope.model));
            }
        });

        function toBoolean(str) {
            if (str === 'true') {
                return true;
            }
            if (str === 'false') {
                return false;
            }
            return null;
        }

        function toString(boolean) {
            if (boolean === true) {
                return 'true';
            }
            if (boolean === false) {
                return 'false';
            }
            return null;
        }

        function initSelection(element, callback) {
            var booleanValue = toBoolean(select2Element.select2('val'));
            callback(booleanValue === null ? null : data[booleanValue ? 0 : 1]);
        }
    }
})();
