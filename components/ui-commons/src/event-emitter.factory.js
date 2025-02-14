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