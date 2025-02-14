(function(){

	'use strict';
    
    angular.module('app')
    .factory('storage', function() {
		return {
			set: function (name, value, saveIn) {
				if(saveIn == 'SESSION') {
					window.sessionStorage.setItem(name, value)
					window.sessionStorage.setItem('lastUpdateStorage', Date.now())
				} else {
					window.localStorage.setItem(name, value)
					window.localStorage.setItem('lastUpdateStorage', Date.now())
				}
			},
			check: function (name, value) {
				var isJSON = Array.isArray(value) || typeof value == 'object'
				if (!value && !typeof value) {
					console.error('Coloque um valor padrão do "' + name + '" no segundo parâmetro do STORAGE')
					return false
				} else if (this.get(name) && this.get(name) != 'undefined') {//Se já existe faz o retorno
					if(this.get(name) == 'true') {
						return true
					} else if(this.get(name) == 'false') {
						return false
					} else if(isJSON) {
						return this.getJson(name)
					} else {
						return this.get(name)
					}
				} else {//Se não existir ele cria aqui
					if(isJSON) {
						this.setJson(name, value)
					} else {
						this.set(name, value)
					}
					return value
				}
			},
			get: function (name) {
				return window.localStorage.getItem(name)
			},
			
			setJson: function (name, value, saveIn) {
				this.set(name, angular.toJson(value), saveIn)
			},
			checkJson: function(name) {// Faz uma checagem somente para saber se existe
				var JSON_ITEM = angular.fromJson(window.localStorage.getItem(name))

				if (!JSON_ITEM) { //Se não existir o JSON
					return false
				} else {
					return true
				}
			},
			getJson: function (name, property) {
				//Passando somente o nome, retorna todo o objeto. Passando o property, retorna a propriedade
				var JSON_ITEM = angular.fromJson(window.localStorage.getItem(name))

				if (!JSON_ITEM) { //Se não existir o JSON, cria.
					this.setJson(name, {})
					console.info('JSON criado com sucesso');
				}

				if (property) {
					var item = JSON_ITEM
					item = eval('item.' + property)
					return item
				} else {
					return angular.fromJson(window.localStorage.getItem(name))
				}
			}
		}
	})
})();