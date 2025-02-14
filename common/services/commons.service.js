(function() {
    'use strict';

    angular.module('tributos.common')
        .service('$commons', ['$injector', function($injector) {
            return {
                $q             : $injector.get('$q'                            ),
                $timeout       : $injector.get('$timeout'                      ),
                $filter        : $injector.get('$filter'                       ),
                $window        : $injector.get('$window'                       ),
                $promiseTracker: $injector.get('promiseTracker'                ),
                $notification  : $injector.get('bfc.Notification'              ),
                $modal         : $injector.get('ui.components.Modal'           ),
                $state         : $injector.get('$state'                        ),
                $formatEnum    : $injector.get('arrecadacao.commons.FormatEnum')
            };
        }
    ]);
})();