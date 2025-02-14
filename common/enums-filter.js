(function() {

    'use strict';

    angular.module('app').filter('enum', ['ENUMS', '$filter', function(ENUMS, $filter){
        return function(input, name){
            var val = $filter('filter')(ENUMS[name], {id: input}, true);
            return val[0].descricao; 
        }
    }]);
})();