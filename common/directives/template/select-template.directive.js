(function () {

    'use strict';

    angular.module('arrecadacao.common').directive('tribSelectTemplate', Directive);

    function Directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/template/select-template.directive.html',
            transclude: true,
            scope: {
                ngModel: '=ngModel',
                ngRequired: '=?',
                onSelect: '&',
                search: '=',
                inputField: '@',
                inputPlaceholder: '@',
                inputMaxlength: '@',
                enum: '=',
                restrictNumber: '=?'
            },
            controller: Controller,
            controllerAs: 'vm'
        };
    }

    Controller.$inject = ['$scope', '$element', 'promiseTracker', '$compile', '$transclude', '$filter'];
    
    function Controller($scope, $element, promiseTracker, $compile, $transclude, $filter) {
        var vm = this;
        vm.tracker = promiseTracker();
        vm.search = search;
        vm.select = select;
        vm.itemKeydown = itemKeydown;
        vm.inputKeydown = inputKeydown;
        vm.getDescricaoEnum = getDescricaoEnum;

        var inputElement = $element.find('input');

        createItemDescription();

        function search() {
            vm.items = [];

            var description = $scope.ngModel[$scope.inputField];
            if ($scope.restrictNumber) {
                description = description.replace(/[^0-9.]+/g, '');
            }
            if ($scope.ngModel.id || !description) {
                return;
            }

            vm.showAutoComplete = true;

            var promise = $scope.search(description).then(function (items) {
                vm.items = items;
                if (!items.length) {
                    vm.showAutoComplete = false;
                }
            });

            vm.tracker.addPromise(promise);
        }

        function select(item) {
            if ($scope.onSelect) {
                $scope.onSelect({item: item});
            }
            vm.showAutoComplete = false;
        }

        function inputKeydown($event) {
            switch ($event.keyCode) {
                case 40:
                    firstSuggestions($event);
                    break;
                case 38:
                    firstSuggestions($event);
                    break;
                case 9:
                    closeSuggestion($event);
                    break;
            }
        }

        function itemKeydown($event) {
            switch ($event.keyCode) {
                case 40:
                    nextSuggestion($event);
                    break;
                case 38:
                    prevSuggestion($event);
                    break;
                case 9:
                    closeSuggestion($event);
                    break;
            }
        }

        function getDescricaoEnum(value) {
            return $filter('enumDescription')(value, $scope.enum);
        }
        
        function firstSuggestions($event) {
            $event.preventDefault();
            $('.list-unstyled li:first-child').find('a').focus();
        }

        function nextSuggestion($event) {
            $event.preventDefault();
            $($event.target).parent().next().find('a').focus();
        }

        function prevSuggestion($event) {
            $event.preventDefault();
            $($event.target).parent().prev().find('a').focus();
        }

        function closeSuggestion($event) {
            //$event.preventDefault();
            vm.showAutoComplete = false;
            var inputs = $(inputElement).closest('form').find(':input');
            inputs.eq(inputs.index(inputElement) + 1).focus();
        }

        function createItemDescription() {
            var liElement = $('<li>').attr({'ng-repeat': 'item in vm.items', 'ng-keydown': 'vm.itemKeydown($event)'});
            $transclude($scope, function (elements) {
                elements.each(function (index, element) {
                    if (element.nodeName === 'ITEM-TEMPLATE') {
                        liElement.append(
                            $('<a>').attr({'href': '', 'ng-click': 'vm.select(item)'}).html($(element).html())
                        );
                    }
                });
            });
            $element.find('ul').append($compile(liElement)($scope));
        }
    }
})();