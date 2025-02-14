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
(function () {
    'use strict';

    angular.module('ui-components')
        .service('PrintService', deprecatedService)
        .service('ui.components.PrintService', service);

    deprecatedService.$inject = ['$window', '$injector'];
    function deprecatedService($window, $injector) {
        $window.console.log('[DEPRECATED] use o nome completo ui.components.PrintService');
        return $injector.invoke(service);
    }

    service.$inject = ['$window', '$timeout'];
    function service($window, $timeout) {
        return {
            print: print
        };

        function print(element) {
            if (!element) {
                $window.print();
                return;
            }

            if (_.isString(element)) {
                element = $(element);
            }

            var css = $('style, link[rel="stylesheet"]');

            var iframe = createIframe();

            iframe.onload = function () {
                addElementsToIframe(iframe, css, element);
                $timeout(function () {
                    printIframe(iframe);
                }, 200);
            };

            document.body.appendChild(iframe);
        }
    }

    function createIframe() {
        var created = document.createElement('iframe');
        //  iframe.setAttribute('sandbox', 'allow-same-origin allow-modals');

        created.style.display = 'none';
        created.style.position = 'fixed';
        created.style.bottom = '0';
        created.style.right = '0';

        return created;
    }

    function addElementsToIframe(iframe, css, element) {
        css.clone().each(function (cssIndex, el) {
            iframe.contentDocument.head.appendChild(el);
        });
        element.clone().each(function (cssIndex, el) {
            iframe.contentDocument.body.appendChild(el);
        });
    }

    function printIframe(iframe) {
        var iframeWindow = iframe.contentWindow;
        iframeWindow.focus();
        iframeWindow.print();
        document.body.removeChild(iframe);
    }

})();
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
(function () {
    'use strict';

    angular.module('ui-components')
        .factory('ui.components.EventEmitter', factory);

    function factory() {
        return EventEmitter;
    }

    EventEmitter.install = install;
    function EventEmitter() {
        install(this);
    }

    function install(self) {
        self.handlers = {};

        self.on = on;
        self.off = off;
        self.emit = emit;

        return self;

        function on(eventName, handler) {
            if (!self.handlers[eventName]) {
                self.handlers[eventName] = [];
            }
            handler.eventName = eventName;
            self.handlers[eventName].push(handler);
            return self;
        }

        function off(handler) {
            var eventName = handler.eventName;
            self.handlers[eventName] = _.without(self.handlers[eventName], handler);
            return self;
        }

        function emit() {
            var eventName = arguments[0];
            var params = _.rest(arguments);

            var eventHandlers = self.handlers[eventName] || [];

            eventHandlers.forEach(function (handler) {
                handler.apply(this, params);
            });
            return self;
        }
    }
})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVpLWtlZXAtb3Blbi5qcyIsInByaW50LnNlcnZpY2UuanMiLCJodHRwLWVycm9yLWhhbmRsZXIucHJvdmlkZXIuanMiLCJldmVudC1lbWl0dGVyLmZhY3RvcnkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InVpLWNvbW1vbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ3VpLWNvbXBvbmVudHMnKVxyXG4gICAgICAgIC5kaXJlY3RpdmUoJ3VpS2VlcE9wZW4nLCBLZWVwT3Blbik7XHJcblxyXG4gICAgZnVuY3Rpb24gS2VlcE9wZW4oKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcmVzdHJpY3Q6ICdBJyxcclxuICAgICAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgkKGUudGFyZ2V0KS5kYXRhKCdkaXNtaXNzJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxufSkoKTsiLCIoZnVuY3Rpb24gKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCd1aS1jb21wb25lbnRzJylcclxuICAgICAgICAuc2VydmljZSgnUHJpbnRTZXJ2aWNlJywgZGVwcmVjYXRlZFNlcnZpY2UpXHJcbiAgICAgICAgLnNlcnZpY2UoJ3VpLmNvbXBvbmVudHMuUHJpbnRTZXJ2aWNlJywgc2VydmljZSk7XHJcblxyXG4gICAgZGVwcmVjYXRlZFNlcnZpY2UuJGluamVjdCA9IFsnJHdpbmRvdycsICckaW5qZWN0b3InXTtcclxuICAgIGZ1bmN0aW9uIGRlcHJlY2F0ZWRTZXJ2aWNlKCR3aW5kb3csICRpbmplY3Rvcikge1xyXG4gICAgICAgICR3aW5kb3cuY29uc29sZS5sb2coJ1tERVBSRUNBVEVEXSB1c2UgbyBub21lIGNvbXBsZXRvIHVpLmNvbXBvbmVudHMuUHJpbnRTZXJ2aWNlJyk7XHJcbiAgICAgICAgcmV0dXJuICRpbmplY3Rvci5pbnZva2Uoc2VydmljZSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2VydmljZS4kaW5qZWN0ID0gWyckd2luZG93JywgJyR0aW1lb3V0J107XHJcbiAgICBmdW5jdGlvbiBzZXJ2aWNlKCR3aW5kb3csICR0aW1lb3V0KSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcHJpbnQ6IHByaW50XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gcHJpbnQoZWxlbWVudCkge1xyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQpIHtcclxuICAgICAgICAgICAgICAgICR3aW5kb3cucHJpbnQoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKF8uaXNTdHJpbmcoZWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIGVsZW1lbnQgPSAkKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2YXIgY3NzID0gJCgnc3R5bGUsIGxpbmtbcmVsPVwic3R5bGVzaGVldFwiXScpO1xyXG5cclxuICAgICAgICAgICAgdmFyIGlmcmFtZSA9IGNyZWF0ZUlmcmFtZSgpO1xyXG5cclxuICAgICAgICAgICAgaWZyYW1lLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGFkZEVsZW1lbnRzVG9JZnJhbWUoaWZyYW1lLCBjc3MsIGVsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHByaW50SWZyYW1lKGlmcmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9LCAyMDApO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpZnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVJZnJhbWUoKSB7XHJcbiAgICAgICAgdmFyIGNyZWF0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcclxuICAgICAgICAvLyAgaWZyYW1lLnNldEF0dHJpYnV0ZSgnc2FuZGJveCcsICdhbGxvdy1zYW1lLW9yaWdpbiBhbGxvdy1tb2RhbHMnKTtcclxuXHJcbiAgICAgICAgY3JlYXRlZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNyZWF0ZWQuc3R5bGUucG9zaXRpb24gPSAnZml4ZWQnO1xyXG4gICAgICAgIGNyZWF0ZWQuc3R5bGUuYm90dG9tID0gJzAnO1xyXG4gICAgICAgIGNyZWF0ZWQuc3R5bGUucmlnaHQgPSAnMCc7XHJcblxyXG4gICAgICAgIHJldHVybiBjcmVhdGVkO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZEVsZW1lbnRzVG9JZnJhbWUoaWZyYW1lLCBjc3MsIGVsZW1lbnQpIHtcclxuICAgICAgICBjc3MuY2xvbmUoKS5lYWNoKGZ1bmN0aW9uIChjc3NJbmRleCwgZWwpIHtcclxuICAgICAgICAgICAgaWZyYW1lLmNvbnRlbnREb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBlbGVtZW50LmNsb25lKCkuZWFjaChmdW5jdGlvbiAoY3NzSW5kZXgsIGVsKSB7XHJcbiAgICAgICAgICAgIGlmcmFtZS5jb250ZW50RG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcHJpbnRJZnJhbWUoaWZyYW1lKSB7XHJcbiAgICAgICAgdmFyIGlmcmFtZVdpbmRvdyA9IGlmcmFtZS5jb250ZW50V2luZG93O1xyXG4gICAgICAgIGlmcmFtZVdpbmRvdy5mb2N1cygpO1xyXG4gICAgICAgIGlmcmFtZVdpbmRvdy5wcmludCgpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcclxuICAgIH1cclxuXHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICB2YXIgREVGQVVMVF9FUlJPUl9NRVNTQUdFID0gJ0Vycm8gYW8gcmVhbGl6YXIgYSByZXF1aXNpw6fDo28sIHZlcmlmaXF1ZSBhIHN1YSBjb25leMOjbyBlIHJlY2FycmVndWUgYSBww6FnaW5hLlxcbic7XHJcblxyXG4gICAgYW5ndWxhclxyXG4gICAgICAgIC5tb2R1bGUoJ3VpLWNvbXBvbmVudHMnKVxyXG4gICAgICAgIC5wcm92aWRlcignSHR0cEVycm9yTm90aWZpY2F0aW9uSGFuZGxlcicsIERlcHJlY2F0ZWRQcm92aWRlcilcclxuICAgICAgICAucHJvdmlkZXIoJ3VpLWNvbXBvbmVudHMuSHR0cEVycm9yTm90aWZpY2F0aW9uSGFuZGxlcicsIERlcHJlY2F0ZWRQcm92aWRlcilcclxuICAgICAgICAucHJvdmlkZXIoJ3VpLmNvbXBvbmVudHMuSHR0cEVycm9yTm90aWZpY2F0aW9uSGFuZGxlcicsIFByb3ZpZGVyKTtcclxuXHJcbiAgICBEZXByZWNhdGVkUHJvdmlkZXIuJGluamVjdCA9IFtdO1xyXG4gICAgZnVuY3Rpb24gRGVwcmVjYXRlZFByb3ZpZGVyKCkge1xyXG4gICAgICAgIF8uZXh0ZW5kKHRoaXMsIG5ldyBQcm92aWRlcigpKTtcclxuICAgICAgICB2YXIgJGdldCA9IHRoaXMuJGdldDtcclxuICAgICAgICB0aGlzLiRnZXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZygnW0RFUFJFQ0FURURdIHVzZSBvIG5vbWUgY29tcGxldG8gdWkuY29tcG9uZW50cy5IdHRwRXJyb3JOb3RpZmljYXRpb25IYW5kbGVyJyk7XHJcbiAgICAgICAgICAgIHJldHVybiAkZ2V0KCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBQcm92aWRlci4kaW5qZWN0ID0gW107XHJcbiAgICBmdW5jdGlvbiBQcm92aWRlcigpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHZhciBpZ25vcmVkSHR0cEVycm9yQ29kZXMgPSBbNDAxLCA0MDMsIDQwNF07XHJcblxyXG4gICAgICAgIHNlbGYuaWdub3JlSHR0cEVycm9yQ29kZSA9IGlnbm9yZUh0dHBFcnJvckNvZGU7XHJcbiAgICAgICAgc2VsZi4kZ2V0ID0gaHR0cEVycm9ySGFuZGxlckZhY3Rvcnk7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGlnbm9yZUh0dHBFcnJvckNvZGUoaHR0cEVycm9yQ29kZSkge1xyXG4gICAgICAgICAgICBpZ25vcmVkSHR0cEVycm9yQ29kZXMgPSBodHRwRXJyb3JDb2RlO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0dHBFcnJvckhhbmRsZXJGYWN0b3J5LiRpbmplY3QgPSBbJyRxJywgJ2JmYy5Ob3RpZmljYXRpb24nXTtcclxuICAgICAgICBmdW5jdGlvbiBodHRwRXJyb3JIYW5kbGVyRmFjdG9yeSgkcSwgYmZjTm90aWZpY2F0aW9uKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgSHR0cEVycm9ySGFuZGxlcigkcSwgYmZjTm90aWZpY2F0aW9uLCBpZ25vcmVkSHR0cEVycm9yQ29kZXMpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBIdHRwRXJyb3JIYW5kbGVyKCRxLCBiZmNOb3RpZmljYXRpb24sIGlnbm9yZWRIdHRwRXJyb3JDb2Rlcykge1xyXG5cclxuICAgICAgICB0aGlzLnJlc3BvbnNlRXJyb3IgPSByZXNwb25zZUVycm9yO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiByZXNwb25zZUVycm9yKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmIChpZ25vcmVkSHR0cEVycm9yQ29kZXMuaW5kZXhPZihyZXNwb25zZS5zdGF0dXMpID09PSAtMSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBub3RpZnlNZXNzYWdlKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmZjTm90aWZpY2F0aW9uLnB1Ymxpc2goREVGQVVMVF9FUlJPUl9NRVNTQUdFICsgcmVzcG9uc2UuY29uZmlnLnVybCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuICRxLnJlamVjdChyZXNwb25zZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBub3RpZnlNZXNzYWdlKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIGlmICghXy5pc0VtcHR5KHJlc3BvbnNlLmRhdGEuZGV0YWlsKSkge1xyXG4gICAgICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHJlc3BvbnNlLmRhdGEuZGV0YWlsLCBmdW5jdGlvbiAobWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGJmY05vdGlmaWNhdGlvbi5wdWJsaXNoKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgbWVzc2FnZSA9IHJlc3BvbnNlLmRhdGEubWVzc2FnZTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmNsYXNzaWZpY2F0aW9uQ29kZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgKz0gJyAtICcgKyByZXNwb25zZS5kYXRhLmNsYXNzaWZpY2F0aW9uQ29kZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmZjTm90aWZpY2F0aW9uLnB1Ymxpc2gobWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7IiwiKGZ1bmN0aW9uICgpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgndWktY29tcG9uZW50cycpXHJcbiAgICAgICAgLmZhY3RvcnkoJ3VpLmNvbXBvbmVudHMuRXZlbnRFbWl0dGVyJywgZmFjdG9yeSk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmFjdG9yeSgpIHtcclxuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xyXG4gICAgfVxyXG5cclxuICAgIEV2ZW50RW1pdHRlci5pbnN0YWxsID0gaW5zdGFsbDtcclxuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcclxuICAgICAgICBpbnN0YWxsKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluc3RhbGwoc2VsZikge1xyXG4gICAgICAgIHNlbGYuaGFuZGxlcnMgPSB7fTtcclxuXHJcbiAgICAgICAgc2VsZi5vbiA9IG9uO1xyXG4gICAgICAgIHNlbGYub2ZmID0gb2ZmO1xyXG4gICAgICAgIHNlbGYuZW1pdCA9IGVtaXQ7XHJcblxyXG4gICAgICAgIHJldHVybiBzZWxmO1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBvbihldmVudE5hbWUsIGhhbmRsZXIpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLmhhbmRsZXJzW2V2ZW50TmFtZV0pIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhhbmRsZXIuZXZlbnROYW1lID0gZXZlbnROYW1lO1xyXG4gICAgICAgICAgICBzZWxmLmhhbmRsZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGY7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBvZmYoaGFuZGxlcikge1xyXG4gICAgICAgICAgICB2YXIgZXZlbnROYW1lID0gaGFuZGxlci5ldmVudE5hbWU7XHJcbiAgICAgICAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnROYW1lXSA9IF8ud2l0aG91dChzZWxmLmhhbmRsZXJzW2V2ZW50TmFtZV0sIGhhbmRsZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGVtaXQoKSB7XHJcbiAgICAgICAgICAgIHZhciBldmVudE5hbWUgPSBhcmd1bWVudHNbMF07XHJcbiAgICAgICAgICAgIHZhciBwYXJhbXMgPSBfLnJlc3QoYXJndW1lbnRzKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBldmVudEhhbmRsZXJzID0gc2VsZi5oYW5kbGVyc1tldmVudE5hbWVdIHx8IFtdO1xyXG5cclxuICAgICAgICAgICAgZXZlbnRIYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChoYW5kbGVyKSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIHBhcmFtcyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pKCk7Il19
