(function() {
    'use strict';

    angular.module('ui-components')
        .directive('uiKeepOpen', KeepOpen);

    function KeepOpen() {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function(e) {
                    if ($(e.target).data('dismiss')) {
                        return;
                    }

                    e.stopPropagation();
                });
            }
        };
    }
})();