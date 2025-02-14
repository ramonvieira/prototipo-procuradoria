/**
 * Created by andrei.smielevski on 21/12/2015.
 */
(function() {
    'use strict';

    angular.module('arrecadacao.common')
        .directive('keepOpen', keepOpen);

    function keepOpen() {
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
