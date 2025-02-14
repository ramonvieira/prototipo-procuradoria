(function () {
    'use strict';

    var DEFAULT_ERROR_MESSAGE = 'Erro ao realizar a requisição, verifique a sua conexão e recarregue a página.\n';

    angular
        .module('ui-components')
        .provider('HttpErrorNotificationHandler', DeprecatedProvider)
        .provider('ui-components.HttpErrorNotificationHandler', DeprecatedProvider)
        .provider('ui.components.HttpErrorNotificationHandler', Provider);

    DeprecatedProvider.$inject = [];
    function DeprecatedProvider() {
        _.extend(this, new Provider());
        var $get = this.$get;
        this.$get = function () {
            window.console.log('[DEPRECATED] use o nome completo ui.components.HttpErrorNotificationHandler');
            return $get();
        };
    }

    Provider.$inject = [];
    function Provider() {
        var self = this;

        var ignoredHttpErrorCodes = [401, 403, 404];

        self.ignoreHttpErrorCode = ignoreHttpErrorCode;
        self.$get = httpErrorHandlerFactory;

        function ignoreHttpErrorCode(httpErrorCode) {
            ignoredHttpErrorCodes = httpErrorCode;
            return self;
        }

        httpErrorHandlerFactory.$inject = ['$q', 'bfc.Notification'];
        function httpErrorHandlerFactory($q, bfcNotification) {
            return new HttpErrorHandler($q, bfcNotification, ignoredHttpErrorCodes);
        }
    }

    function HttpErrorHandler($q, bfcNotification, ignoredHttpErrorCodes) {

        this.responseError = responseError;

        function responseError(response) {
            if (ignoredHttpErrorCodes.indexOf(response.status) === -1) {
                if (response.data) {
                    notifyMessage(response);
                } else {
                    bfcNotification.publish(DEFAULT_ERROR_MESSAGE + response.config.url);
                }
            }
            return $q.reject(response);
        }

        function notifyMessage(response) {
            if (!_.isEmpty(response.data.detail)) {
                angular.forEach(response.data.detail, function (message) {
                    bfcNotification.publish(message);
                });
            } else {
                var message = response.data.message;
                if (response.data.classificationCode) {
                    message += ' - ' + response.data.classificationCode;
                }
                if (message) {
                    bfcNotification.publish(message);
                }
            }
        }
    }
})();