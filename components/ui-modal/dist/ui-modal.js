(function () {

    'use strict';

    angular.module('ui-components').factory('ui.components.Modal', ModalService);

    ModalService.$inject = ['$injector'];

    function ModalService($injector) {

        var $rootScope = $injector.get('$rootScope');
        var $q = $injector.get('$q');
        var $http = $injector.get('$http');
        var $templateCache = $injector.get('$templateCache');
        var $controller = $injector.get('$controller');
        var $compile = $injector.get('$compile');
        var promiseTracker = $injector.get('promiseTracker');

        var MODAL_TEMPLATE = '<div><div class="modal-dialog" ng-class="\'modal-\'+size"><div class="modal-content" data-bf-loading="$modalTracker"></div></div></div>';

        return {
            open: open
        };

        function open(modalOptions) {

            var modalTracker = promiseTracker();
            var modalInstance = {};

            var modalScope = (modalOptions.scope || $rootScope).$new();
            modalScope.$modalInstance = modalInstance;
            modalScope.$modalTracker = modalTracker;
            modalScope.size = modalOptions.size;

            var modalElement = $compile(MODAL_TEMPLATE)(modalScope);

            //TODO:Rever props focusOnClose,styleClass não encontrei onde são usadas no bfc.Modal e aqui.
            modalElement.modal({
                focusOnClose: modalOptions.focusOnClose,
                styleClass: modalOptions.styleClass,
                autoFocus: modalOptions.autoFocus,
                backdrop: 'static'
            });

            var defered = $q.defer();

            modalInstance.result = defered.promise;
            modalInstance.tracker = modalTracker;

            modalInstance.dismiss = function (reason) {
                modalElement.modal('close');
                defered.reject(reason);
            };

            modalInstance.close = function (val) {
                modalElement.modal('close');
                defered.resolve(val);
            };

            modalScope.$close = modalInstance.close;
            modalScope.$dismiss = modalInstance.dismiss;

            modalElement.one('hide.modal', function () {
                if (!defered.promise.$$state.status) {
                    defered.reject();
                }
                modalScope.$destroy();
            });

            var promise = $q.all({
                htmlTemplate: getTemplatePromise(modalOptions),
                params: getInjectorPromise(modalOptions)
            }).then(function (data) {

                modalInstance.params = data.params;

                if (modalOptions.controller) {
                    var controllerLocals = {
                        $scope: modalScope,
                        $modalInstance: modalInstance,
                        $modalTracker: modalTracker
                    };

                    var controller = modalOptions.controller;
                    if (modalOptions.controllerAs) {
                        controller = controller + ' as ' + modalOptions.controllerAs;
                    }

                    $controller(controller, controllerLocals);
                }

                var compiledContent = $compile(data.htmlTemplate)(modalScope);
                modalElement.find('.modal-content').html(compiledContent);
            }, function(error) {
                modalInstance.dismiss();
            });

            modalTracker.addPromise(promise);
            return modalInstance;
        }

        function getTemplatePromise(modalOptions) {
            if (modalOptions.template) {
                return $q.when(modalOptions.template);
            }

            return $http.get(modalOptions.templateUrl, {
                    cache: $templateCache
                })
                .then(function (response) {
                    return response.data;
                }, function (response) {
                    throw Error('Não foi possível carregar o template informado para a modal.\n' + response.data);
                });
        }

        function getInjectorPromise(modalOptions) {
            var locals = {};
            angular.forEach(modalOptions.params, function (value, key) {
                if (angular.isFunction(value)) {
                    locals[key] = $injector.invoke(value);
                } else {
                    locals[key] = value;
                }
            });

            return $q.all(locals).then(function (data) {
                return data;
            }, function (response) {
                throw Error('Não foi possível carregar os parametros informados para a modal.\n' + response.data);
            });
        }
    }
})();