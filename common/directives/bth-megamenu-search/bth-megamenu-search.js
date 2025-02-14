(function() {
    'use strict';
    var app = angular.module('app');
    app.directive('bthMegamenuSearch', directive);

    function directive() {
        return {
            restrict: 'E',
            templateUrl: 'common/directives/bth-megamenu-search/bth-megamenu-search.html',
            replace: true,
            scope: {
                recursos: '=',
                scripts: '=',
                relatorios: '=',
                consultas: '='
            },

            controller: Controller,
            controllerAs: 'vm'
        };
    }

    Controller.$inject = [
        '$compile',
        '$scope',
        '$q',
        '$element',
        '$log',
        '$timeout',
        'arrecModal'
        
    ];

    function Controller($compile, $scope, $q, $element, $log, $timeout,  arrecModal) {
        var vm = this;

        vm.tab = 1;
        
        vm.resetScroll = function(){
            setTimeout(function(){
                $(".megamenu-search .nano").nanoScroller({preventPageScrolling: true});
            }, 500)
        }

        vm.setTab = function(id){
            vm.tab = id
        }

		vm.open = function(resolve){
			arrecModal.open('gerenciador-cadastros/cadastros-auxiliares/cadastros-auxiliares.html', $scope, resolve, 'xxl', 'CadastrosAuxiliaresCtrl')
		}

        vm.isCurrentTab = function(id) {
            return vm.tab == id
        }

        vm.cleanSearch = function(e){
            $scope.busca.termo = null;
            vm.resetScroll();
            e.stopPropagation();
            $('.busca input').focus();
        }

    }
})();
