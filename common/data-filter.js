(function(){

	'use strict';
    
    angular.module('app')
    .filter('dataFilter', function($rootScope) {
		return function(val, listName, property) { //LIST não recebe ARRAY nem OBJECT, somente o nome da listagem
			var LIST_NAME = _.isObject(listName) ? listName : $rootScope[listName]

			//Se chegar o objeto inteiro
			val = _.isObject(val) ? val.id : val
			
			if (val != null) {
				if(val == undefined) return console.error(listName.toUpperCase() +' não contém a propriedade solicitada')
				if(!LIST_NAME)       return console.error('A listagem de ' + listName.toUpperCase() + ' não está disponível')
				
				// ------------------------------------------------------
				// Pode ser localizado por uma KEY ou por um ID
				// Se for string localiza no KEY senão localiza no ID
				// ------------------------------------------------------
				var ITEM_FILTERED = isNaN(val) ? LIST_NAME.find(item => item.key == val ) : LIST_NAME.find(item => item.id == Number(val))

				//Se nenhum item foi localizado será atribuído o primeiro da lista para não quebrar layout
				if(ITEM_FILTERED == undefined && !_.isObject(val) && !_.isObject(listName)) {
					// console.error('A listagem de ' + listName.toUpperCase() + ' não contém o ID:', val, 'solicitado. (Retornado item 1 para evitar quebras)')
					ITEM_FILTERED = $rootScope[listName][0]
				}
		
				if(property == undefined) {
					return ITEM_FILTERED.descricao // Se não foi requisitado uma propriedade específica, busca na descrição
				} else {
					if(property == 'object') { //Se foi requisitado o objeto inteiro
						return ITEM_FILTERED
					}
					if(property != 'object'){ // Se foi requisitado uma propriedade específica
						return ITEM_FILTERED[property]
					}
				}
			}
		}
	})
})();