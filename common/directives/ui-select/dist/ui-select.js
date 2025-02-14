(function () {
    'use strict';

    angular.module('ui-components').directive('uiSelect', SelectDirective);
    SelectDirective.$inject = [];

    function SelectDirective() {
        return {
            restrict: 'E',
            template: '<input id={{id}} ng-model="ngModel" ng-disabled="ngDisabled" ng-class="ngclass" bf-select2="bfConfig" type="hidden" />',
            scope: {
                id: '@?',
                ngModel: '=',
                ngDisabled: '=',
                ngChange: '&',
                ngclass: '=', //usado ngclass ao invés de ngClass para que a diretiva não aplique no container
                descriptionField: '@',
                allowClear: '=',
                multiple: '@',
                addValue: '=',
                search: '=',
                formatSelection: '&',
                formatResult: '&',
                formatValue: '&',
                minimumResultsForSearch: '@',
                minimumInputLength: '@',
                maximumInputLength: '@',
                placeholder: '=?',
                dropdownCssClass: '=?',
                dropdownAutoWidth: '=?',
                debounceDelay: '@'
            },
            compile: function (element, tAttrs) {
                var multiple = angular.isDefined(tAttrs.multiple);
                if (multiple) {
                    element.children('input').attr('multiple', true);
                }

                return {
                    post: function ($scope, $element, $attrs, $ctrl) {
                        $scope.multiple = multiple;

                        var input = $element.children('input');

                        input
                            .on('select2-blur change', function () {
                                $scope.$apply($ctrl.$setTouched());
                            })
                            .on('change', function () {
                                $scope.$apply($ctrl.$setDirty());
                            });

                        $scope.$watch('placeholder', function (placeholder) {
                            input.attr('placeholder', placeholder || ' ');
                        });

                        $scope.$watch('ngModel', function (newValue, oldValue) {
                            if (newValue !== oldValue) {
                                ($scope.ngChange || angular.noop)();
                            }
                        });
                    }
                };
            },
            controller: SelectDirectiveController,
            controllerAs: 'vm',
            require: 'ngModel'
        };
    }

    SelectDirectiveController.$inject = ['$scope', 'bfc.Select2Config'];

    function SelectDirectiveController($scope, select2Config) {

        var config = {
            allowClear: $scope.allowClear !== false,
            // Mantem a seleção do tamado no input
            dropdownAutoWidth: $scope.dropdownAutoWidth === true,
            initSelection: _initSelection,
            formatResult: _formatResult,
            formatSelection: _formatSelection,
            formatValue: _formatValue,
            formatNewChoice: _formatNewChoice,
            result: _result
        };

        if ($scope.debounceDelay) {
            config.result = _.debounce(_result, $scope.debounceDelay);
        }

        if($scope.minimumResultsForSearch) {
            config.minimumResultsForSearch = $scope.minimumResultsForSearch;
        }

        if ($scope.minimumInputLength) {
            config.minimumInputLength = Number.parseInt($scope.minimumInputLength);
        }

        if ($scope.maximumInputLength) {
            config.maximumInputLength = Number.parseInt($scope.maximumInputLength);
        }

        if ($scope.addValue) {
            config.onAdd = _addValue;
        }

        if ($scope.dropdownCssClass) {
            config.dropdownCssClass = $scope.dropdownCssClass;
        }

        $scope.bfConfig = select2Config.create(config);

        function _addValue(value, target) {
            $scope.addValue(value).then(function (data) {

                if (!data) {
                    return data;
                }

                data = data.plain ? data.plain() : data;
                if ($scope.multiple) {
                    var value = $(target).select2('data');
                    value.push(data);
                    $scope.ngModel = value;
                } else {
                    $scope.ngModel = data;
                }
            });
            return false;
        }

        function _initSelection() {
            //function _initSelection(element, callback) {
        }

        function _formatResult(data) {
            var formattedValue = $scope.formatResult({
                data: data
            });

            if(!formattedValue) {
                formattedValue = data[$scope.descriptionField || 'descricao'];
                if(!data.added) {
                    formattedValue = _.escape(formattedValue);
                }
            }

            return formattedValue;
        }

        // O que aparece quando é selecionado um item.
        function _formatSelection(data) {
            return $scope.formatSelection({
                data: data
            }) || _formatResult(data);
        }

        function _formatNewChoice(text) {
            var choise = {};
            choise[$scope.descriptionField || 'descricao'] = text;
            return choise;
        }

        // O que é enviado para o server.
        function _formatValue(data) {
            return $scope.formatValue({
                    data: data
                }) || data;
        }

        function _result(params, callback) {
            params.term = encodeURI(params.term);
            return $scope.search(params).then(function (data) {
                callback({
                    results: data.content,
                    more: data.hasNext
                });
            });
        }
    }
})();
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
