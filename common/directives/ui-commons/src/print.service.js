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