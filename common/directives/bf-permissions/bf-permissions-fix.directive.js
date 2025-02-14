(function() {
    'use strict';

    var EVENTS_TO_DISABLE = ['click', 'dblclick', 'mousedown', 'mouseup'].join(' ');
    var MENSAGEM = 'Você não tem permissão para acessar este recurso.';

    angular.module('bfc.permissions')
        .directive('bfPermissions', directive)
        .config(['$provide', function($provide) {
            $provide.decorator('bfPermissionsDirective', ['$delegate', function($delegate) {
                _.remove($delegate, 'priority', 0);
                return $delegate;
            }]);
        }]);

    directive.$inject = ['$timeout', '$state', 'bfcState', 'bfc.$$PermissionsService'];

    function directive($timeout, $state, bfcState, PermissionsService) {
        return {
            restrict: 'A',
            priority: -1,
            require: '?ngDisabled',
            link: postLink
        };

        function postLink(scope, element, attrs, ctrl) {
            var permissionAction = hasPermission() ? permissionOk : permissionFail;

            $timeout(permissionAction);

            function hasPermission() {
                if (angular.isDefined(attrs.adminOnly)) {
                    return PermissionsService.isAdmin();
                }
                if (angular.isDefined(attrs.operation)) {
                    return !PermissionsService.isRevokedOperation(getCurrentPage(), attrs.operation);
                }
                var sref = attrs.bfcSref || attrs.bfPermissions;
                if (sref) {
                    var state = $state.get(bfcState.aliasToState(sref));
                    return PermissionsService.checkPermissionForState(state);
                }
                return false;
            }

            function permissionOk() {
                if (ctrl) {
                    ctrl.$$registerListener(scope, element, attrs);
                }
            }

            function permissionFail() {
                var failAction = shouldComponentBeHidden() ? hideComponent : disableElement;
                failAction();
            }

            function getCurrentPage() {
                var state;
                if (attrs.bfPermissions) {
                    state = $state.get(attrs.bfPermissions);
                } else if (attrs.bfcSref) {
                    state = $state.get(attrs.bfcSref);
                } else {
                    state = $state.current;
                }
                return PermissionsService.$$readPermissionRequiredForState(state);
            }

            function disableElement() {
                element
                    .off(EVENTS_TO_DISABLE)
                    .bind(EVENTS_TO_DISABLE, function(e) {
                        e.preventDefault();
                    })
                    .addClass('disabled permissions-disabled')
                    .attr({
                        disabled: 'disabled',
                        'ng-disabled': 'true',
                        title: MENSAGEM
                    })
                    .on('select2-rendered', function() {
                        element.select2('container').find('a:first').tooltip({
                            title: MENSAGEM
                        });
                        element.removeClass('disabled');
                    });
            }

            function shouldComponentBeHidden() {
                //alternativa para sabe se é possível desabilitar o elemento
                //quais elementos podem ser desabilitados?
                return element.hasClass('permissions-hide');
            }

            function hideComponent() {
                element.hide();
            }
        }
    }
})();