(function() {
	'use strict';


	angular.module('app').factory('AcessoStoreService', AcessoStoreService);

	AcessoStoreService.$inject = ['$injector'];

	function AcessoStoreService($injector) {
		
		var AuthenticationContext = $injector.get('AuthenticationContext');
		var wnd = $injector.get('$window');

		var metodosPublicos = {
			setAcessoStore: _setAcessoStore,
			getAcessoStore: _getAcessoStore,
			limpaAcessoStore: _limpaAcessoStore,
			hasAcessoStore: _hasAcessoStore,
			setEntidadeAcessoStore: _setEntidadeAcessoStore,
			getEntidadeAcessoStore: _getEntidadeAcessoStore,
			hasEntidadeAcessoStore: _hasEntidadeAcessoStore
		};

		function getStorageName() {
			var usuario = AuthenticationContext.userInfo().id;
			if (usuario) {
				return 'tributos_context_' + Base64.encode(usuario);
			}
		}

		function getStore(storeName){
			return wnd.sessionStorage.getItem(storeName);			
		}

		function setStore(storeName, value){
			wnd.sessionStorage.setItem(storeName, value);			
		}

		function removeStore(storeName){
			wnd.sessionStorage.removeItem(storeName);			
		}

		function getEncodeBase64(obj) {
			if (obj) {
				return Base64.encode(angular.toJson(obj));
			}
		}

		function getDecodeBase64Json(nomeStorage) {
			var storage = getStore(nomeStorage);
			if (storage) {
				return angular.fromJson(Base64.decode(storage));
			}
		}

		//Acesso
		function _setAcessoStore(acessoNovo) {
			setStore(getStorageName(), getEncodeBase64(acessoNovo));
		}

		function _getAcessoStore() {
			return getDecodeBase64Json(getStorageName());
		}

		function _limpaAcessoStore() {
			return removeStore(getStorageName());
		}

		function _hasAcessoStore() {
			var acesso = getStore(getStorageName());
			return Boolean(acesso);
		}

		//Entidade
		function _setEntidadeAcessoStore(entidadeNova) {
			var acesso = _getAcessoStore();
			if(acesso == undefined){
				_setAcessoStore({entidade: entidadeNova});
				return;
			}

			if (acesso) {
				acesso.entidade = entidadeNova;
				_setAcessoStore(acesso);
			}
		}

		function _getEntidadeAcessoStore() {
			var acesso = _getAcessoStore();
			if (acesso) {
				return acesso.entidade;
			}
		}

		function _hasEntidadeAcessoStore() {
			var entidade = _getEntidadeAcessoStore();
			return Boolean(entidade);
		}

		return metodosPublicos;
	}
})();
