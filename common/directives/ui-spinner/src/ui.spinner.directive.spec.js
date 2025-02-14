describe('ui spinner', function () {
    'use strict';

    var $compile,
        $rootScope;

    beforeEach(module('ui-spinner.directive.html', 'ui-components'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should not have default value', function () {
        var $scope = $rootScope.$new(true);

        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        expect(element.find('input').val()).toBe('');
    });

    it('should not have default value when min is 1', function () {

        var $scope = $rootScope.$new(true);

        var element = $compile('<ui-spinner ng-model="numero" min="1" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        expect(element.find('input').val()).toBe('');
    });

    it('should increment value', function () {

        var $scope = $rootScope.$new(true);
        $scope.numero = 0;

        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        element.isolateScope().increase();

        $scope.$digest();

        expect(element.find('input').val()).toBe('1');
    });

    it('should start at min value when increment from null', function () {

        var $scope = $rootScope.$new(true);
        $scope.numero = null;

        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        element.isolateScope().increase();

        $scope.$digest();

        expect(element.find('input').val()).toBe('0');
    });

    it('should decrement value', function () {

        var $scope = $rootScope.$new(true);

        $scope.numero = 1;
        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        element.isolateScope().decrease();

        $scope.$digest();

        expect(element.find('input').val()).toBe('0');
    });

    it('should start at min value when decrement from null', function () {

        var $scope = $rootScope.$new(true);
        $scope.numero = null;

        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        element.isolateScope().decrease();

        $scope.$digest();

        expect(element.find('input').val()).toBe('0');
    });
    
    it('should have placeholder', function () {

        var $scope = $rootScope.$new(true);
		$scope.placeholder='Teste de vagas';
        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1" placeholder="placeholder"></ui-spinner>')($scope);
        $scope.$digest();

        expect(element.find('input').attr('placeholder')).toBe('Teste de vagas');
    });

	it('should not have placeholder', function () {

        var $scope = $rootScope.$new(true);
        var element = $compile('<ui-spinner ng-model="numero" min="0" max="99" step="1"></ui-spinner>')($scope);
        $scope.$digest();

        expect(element.find('input').attr('placeholder')).toBe('');
    });
});