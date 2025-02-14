describe('ui-select-boolean', function () {
    var $compile;
    var $rootScope;

    var elementContainer;//Um container pois o select2 adciona elementos "irmãos" ao input que são de fato o select
    var element;//Exposto para customização

    beforeEach(module('ui-components'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(function () {
        element = $('<ui-select-boolean>');
        element.attr('ng-model', 'modelo');

        elementContainer = $('<div>');
        elementContainer.append(element);
    });

    describe('Comportamento padrão', function () {
        beforeEach(function () {
            elementContainer = $compile(elementContainer)($rootScope);
            $rootScope.$digest();
        });

        it('Opção selecionada deve ser vazia caso ngModel seja undefined', function () {
            setValue(undefined);
            expect(getChoosenOption()).toBe('');
        });

        it('Opção selecionada deve ser vazia caso ngModel seja null', function () {
            setValue(null);
            expect(getChoosenOption()).toBe('');
        });

        it('Opção selecionada deve ser "Sim" caso ngModel seja true', function () {
            setValue(true);
            expect(getChoosenOption()).toBe('Sim');
        });

        it('Opção selecionada deve ser "Não" caso ngModel seja false', function () {
            setValue(false);
            expect(getChoosenOption()).toBe('Não');
        });

        it('Model deve ser null quando o valor for limpo pelo componente', function () {
            setValue(true);
            expect(getChoosenOption()).toBe('Sim');

            elementContainer.find('.select2-search-choice-close').trigger('mousedown');
            expect(getChoosenOption()).toBe('');

            expect(getChoosenOption()).toB

            expect($rootScope.modelo).toBe(null);
        });
    });

    describe('Customizando descrições', function () {

        it('Quando o valor do model for true, a opção mostrada deve ser a informada em true-description', function () {
            var valor = 'Afirmativo';

            element.attr('true-description', valor);
            elementContainer = $compile(elementContainer)($rootScope);
            $rootScope.$digest();

            setValue(true);

            expect(getChoosenOption()).toBe(valor);
        });

        it('Quando o valor do model for false, a opção mostrada deve ser a informada em false-description', function () {
            var valor = 'Negativo';

            element.attr('false-description', valor);
            elementContainer = $compile(elementContainer)($rootScope);
            $rootScope.$digest();

            setValue(false);

            expect(getChoosenOption()).toBe(valor);
        });
    });

    function getChoosenOption() {
        return elementContainer.find('.select2-chosen').text().trim();
    }

    function setValue(value) {
        $rootScope.modelo = value;
        $rootScope.$digest();
    }

});