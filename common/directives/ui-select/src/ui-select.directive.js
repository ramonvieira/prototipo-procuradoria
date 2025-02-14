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