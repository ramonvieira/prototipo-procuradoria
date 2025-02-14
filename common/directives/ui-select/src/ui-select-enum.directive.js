(function () {
    'use strict';

    angular.module('ui-components').directive('uiSelectEnum', SelectEnumDirective);
    SelectEnumDirective.$inject = [];

    function SelectEnumDirective() {
        return {
            restrict: 'E',
            template: '<input type="hidden"/>',
            scope: {
                model: '=ngModel',
                ngDisabled: '=',
                multiple: '@',
                options: '=',
                allowClear: '=?',
                minimumResultsForSearch: '=?',
                formatSelection: '&',
                formatResult: '&',
                filterResult: '&',
                placeholder: "@",
                dropdownCssClass: '=?',
                dropdownAutoWidth: '=?'
            },
            compile: function () {
                return {
                    post: SelectEnumDirectivePostLink
                };
            },
            require: 'ngModel'
        };
    }

    function SelectEnumDirectivePostLink($scope, $element, $attrs, $ctrl) {

        var multiple = angular.isDefined($attrs.multiple);
        var select2Element = $element.find('input');

        select2Element
            .select2({
                query: _result,
                formatResult: _formatResult,
                formatSelection: _formatSelection,
                formatValue: _formatValue,
                minimumResultsForSearch: angular.isDefined($scope.minimumResultsForSearch) ? $scope.minimumResultsForSearch : 0,
                allowClear: $scope.allowClear !== false,
                multiple: multiple,
                placeholder: $scope.placeholder || ' ',
                dropdownCssClass: $scope.dropdownCssClass,
                dropdownAutoWidth: $scope.dropdownAutoWidth === true
            })
            .on('select2-blur', function () {
                $scope.$apply($ctrl.$setTouched());
                $element.blur();
            })
            .on('change', function () {
                $scope.$apply(function () {
                    $ctrl.$setTouched();
                    $ctrl.$setDirty();

                    var data = select2Element.select2('data');
                    var newValue = null;
                    if (multiple) {
                        newValue = _.map(data,_.property('id')) || [];
                    } else {
                        newValue =_.get(data, 'id');
                    }
                    if (!angular.equals(newValue, $scope.model)) {
                        $ctrl.$setViewValue(newValue);
                    }
                });
            });

        $scope.$watch('ngDisabled', function (value) {
            select2Element.select2('enable', !value);
        });

        $scope.$watch('model', function (value) {
            if (!value) {
                select2Element.select2('data', null);
                return;
            }

            $scope.options.then(function (data) {
                var newObjectModelValue = null;
                if (multiple) {
                    newObjectModelValue = [];
                    value.forEach(function (item) {
                        newObjectModelValue.push(data[item]);
                    });
                } else {
                    newObjectModelValue = data[value];
                }

                if (!angular.equals(newObjectModelValue, select2Element.select2('data'))) {
                    select2Element.select2('data', newObjectModelValue);
                }
            });
        });

        function _formatResult(data) {
            if (angular.isDefined($attrs.formatResult)) {
                return $scope.formatResult({data: data});
            }

            return data.description;
        }

        // O que aparece quando é selecionado um item.
        function _formatSelection(data) {
            if (angular.isDefined($attrs.formatSelection)) {
                return $scope.formatSelection({data: data});
            }

            return _formatResult(data);
        }

        function _formatValue(data) {
            return data;
        }

        function _filterResult(term, value) {
            var newValue = value;
            if (value.children && value.children.length) {
                var filteredChildren = _filterResults(term, value.children);
                if (filteredChildren && filteredChildren.length) {
                    newValue = {};
                    angular.forEach(value, function (obj, attr) {
                        this[attr] = obj;
                    }, newValue);

                    newValue.children = filteredChildren;
                    return newValue;
                }
            }

            if (angular.isDefined($attrs.filterResult)) {
                if ($scope.filterResult({term: term, value: value})) {
                    return newValue;
                }
            } else {
                if (_.deburr(_formatResult(value)).match(new RegExp(_.deburr(_.escapeRegExp(term)), 'gi'))) {
                    return newValue;
                }
            }

            return null;
        }

        function _filterResults(term, values) {
            var filteredValues = [];
            if (values && values.length) {
                values.forEach(function (value) {
                    var newValue = _filterResult(term, value);
                    if (newValue) {
                        filteredValues.push(newValue);
                    }
                });
            }

            return filteredValues;
        }

        function _result(params) {
            return $scope.options.then(function (data) {
                params.callback({results: _filterResults(params.term, data.values), more: false});
            });
        }
    }
})
();
