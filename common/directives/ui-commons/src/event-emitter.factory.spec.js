describe("Event Emitter", function () {

    var TEST_EVENT = 'testEvent';

    beforeEach(module('ui-components'));

    describe("standalone", function () {
        var eventEmitter;
        beforeEach(inject(['ui.components.EventEmitter', function (EventEmitter) {
            eventEmitter = new EventEmitter();
        }]));

        it("should register a event callback", function (done) {
            eventEmitter.on(TEST_EVENT, done);
            eventEmitter.emit(TEST_EVENT);
        }, 500);

        it("should register a event callback and only call it in registered event", function () {
            eventEmitter.on(TEST_EVENT, failCallback);
            eventEmitter.emit('ASIDHUAHSUDHAS');

            function failCallback() {
                fail('trigger by the wrong event');
            }
        });

        it("should pass the emit parans to callbacks", function () {
            eventEmitter.on(TEST_EVENT, paramCallback);
            eventEmitter.emit(TEST_EVENT, 'a', 123);

            function paramCallback(param1, param2) {
                expect(param1).toBe('a');
                expect(param2).toBe(123);
            }
        });

        it("should unscribe a callback", function () {
            callback.calls = 0;

            eventEmitter.on(TEST_EVENT, callback);
            eventEmitter.emit(TEST_EVENT);
            expect(callback.calls).toBe(1);

            eventEmitter.off(callback);
            eventEmitter.emit(TEST_EVENT);
            expect(callback.calls).toBe(1);

            function callback() {
                callback.calls++;
            }
        });
    });

    describe("extending", function () {
        var EventEmitter;
        beforeEach(inject(['ui.components.EventEmitter', function (_EventEmitter_) {
            EventEmitter = _EventEmitter_;
        }]));

        it("should install event emitter in a object", function () {
            var service = {a: angular.noop};

            EventEmitter.install(service);

            expect(service.a).toBeDefined();
            expect(service.on).toBeDefined();
            expect(service.off).toBeDefined();
            expect(service.emit).toBeDefined();
        });

        it("should install event emitter in a object and emit events", function () {
            var service = {a: angular.noop};

            EventEmitter.install(service);

            callback.calls = 0;

            service.on(TEST_EVENT, callback);
            service.emit(TEST_EVENT);
            expect(callback.calls).toBe(1);

            service.off(callback);
            service.emit(TEST_EVENT);
            expect(callback.calls).toBe(1);

            function callback() {
                callback.calls++;
            }
        });
    });
});