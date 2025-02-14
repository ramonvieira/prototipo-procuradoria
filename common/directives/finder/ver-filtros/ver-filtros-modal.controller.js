(function () {

    'use strict';

    angular.module('arrecadacao.common')
        .controller('arrecadacao.common.VerTodosFiltrosModalCtrl', Controller);

    Controller.$inject = ['$scope', '$rootScope', '$injector', 'params', '$modalInstance']

    function Controller($scope, $rootScope, $injector, params, $modalInstance) {
        var vm = this;
        var promiseTracker = $injector.get('promiseTracker');
        var PesquisaAvancadaService = $injector.get('arrecadacao.common.PesquisaAvancadaService');
        var parcelamentosComposicoes = angular.copy(params.registro);
        var $timeout= $injector.get('$timeout');
        var ModalCad = $injector.get('arrecadacao.common.ModalCad');
        var defaultFilter = 'cadastro = \'' + params.consulta + '\'';

        vm.editar = _editar;
        vm.excluir = _excluir;
        vm.carregar = _carregar;
        vm.searchChanged = _searchChanged;
        vm.selectFilter = _selectFilter;

        vm.registro = angular.copy(params.registro);
        vm.tracker = {
            count: promiseTracker(),
            carregandoRegistros: promiseTracker(),
            salvandoRegistro: promiseTracker()
        };
        
        vm.findParams = {
            filter: defaultFilter,
            limit: 20,
            offset: 0
        };

        $scope.$on('filter-edited', function() {
            _carregar();
        });
            
        function _formatOthersSaved(data) {
            if (data.others && data.others.length) {
                var others = angular.copy(data.others)
                data.others = [];
                _.forEach(others, function(other) {
                    data.others.push(JSON.parse(other)); 
                });
            }
        }

        function _buildFilter() {
            vm.findParams.filter = defaultFilter;
            if (vm.searchInput) {
                vm.findParams.filter += ' and descricao like \'%' + vm.searchInput + '%\'';
            }
        }

        function _excluir(registro) {
            var promise = PesquisaAvancadaService.remove(registro).then(function () {
                _carregar();
            });
            return promise;
        }

        function _editar(registro) {
            _abrirPopup({
                registro: registro,
                defaultValues: params.consulta
            });
        }

        function _selectFilter(registro) {
            $rootScope.$broadcast('filter-selected', registro);
            $modalInstance.close();
        }

        function _searchChanged() {
            if (vm.searchInput) {
                return;
            }
            _carregar();
        }

        function _abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'common/directives/finder/finder-modal.html',
                controller: 'arrecadacao.common.SalvarPesquisaModalCtrl as vm',
                scope: $scope,
                resolve: angular.extend(resolve)
            });
        }

        function _count() {
            return PesquisaAvancadaService.count(vm.findParams);
        }
        
        function _carregar() {
            _buildFilter();
            var promise = PesquisaAvancadaService.getAll(vm.findParams);
            promise.then(function(data) {
                data.totalRegistros = vm.totalRegistros;
                vm.listagem = data.content;
                _.forEach(vm.listagem, function(filter){
                    _formatOthersSaved(filter);
                })
                $scope.hasNext = data.hasNext;
            });
            vm.tracker.carregandoRegistros.addPromise(promise);
            return promise;
        } 

        $timeout(function(){
            var promise = _count().then(function(count) {
                vm.totalRegistros = count;
                _carregar();
            });
            vm.tracker.count.addPromise(promise);
        },200);
    }
})();
