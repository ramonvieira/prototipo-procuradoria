var partialApp = angular.module("partialApp", []);

partialApp.directive('partialReadonly', function () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            elem.on('keypress, keydown', function (event) {
                var readOnlyLength = attrs["partialReadonly"].length;
                if ((event.which != 37 && (event.which != 39) && (event.which != 9) && (event.which != 35)) && ((elem[0].selectionStart < readOnlyLength) || ((elem[0].selectionStart == readOnlyLength) && (event.which == 8)))) {
                    event.preventDefault();
                }
            });
            $(window).load(function () {
                elem[0].value = attrs["partialReadonly"];
            });
        }
    };
});