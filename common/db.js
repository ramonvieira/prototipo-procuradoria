(function(){

	'use strict';
	
	angular.module('app')
	.run(['$rootScope', function($rootScope) {
		// ------------------------------------------------------
		// Banco de dados (O que for gravado com protótipo local,
		// será fixo no GIT quando comitado)
		// ------------------------------------------------------
		$rootScope.dataJson = null
		$.getJSON("db.json", function(data){
			// console.log('Iniciando db.json');
			$rootScope.dataJson = data
		}).fail(function(){
			console.error("Não foi possível carregar as informações do db.json");
		});
		
		$rootScope.serviceDb = function(el) {
			eval('$rootScope.'+ el + ' = $rootScope.dataJson.' + el)
		}
	}])

	.factory('db', ['$rootScope', '$http', '$q', 'bfc.Notification', function ($rootScope, $http, $q, Notification) {
		//https://www.peterbe.com/plog/promises-with-$http

		function _path(dataName) {
			return $rootScope.pathDB + '/' + dataName
		}

		// ------------------------------------------------------
		// Carregar
		// ------------------------------------------------------
		function _getData() { // Recebe automaticamente (arguments) a URL ao chamar ele
			var dataName = arguments[0]
			$http.get(_path(dataName))
			.then(function(response){
				eval('$rootScope.'+ (dataName) + ' = response.data')
				Notification.publish('Atualizado com sucesso', 'success');
			})
		};

		// ------------------------------------------------------
		// Verifica se é uma EDIÇÃO ou uma ADIÇÃO
		// ------------------------------------------------------
		function _push(dataName, registro) {
			registro.id != null ? _save(dataName, registro) : _add(dataName, registro)
		}
		
		// ------------------------------------------------------
		// EDIÇÃO de um registro existente
		// ------------------------------------------------------
		function _save(dataName, registro) {
			var path = _path(dataName)
			$http.put((path + '/' + registro.id), registro)
				.success(function (data) {
					_getData(dataName)
				})
				.error(function(data) {
					Notification.publish('Erro ao gravar o cadastro', 'error');
				})
			return
		};

		// ------------------------------------------------------
		// ADIÇÃO de novo registro
		// ------------------------------------------------------
		function _add(dataName, registro) {
			var path = _path(dataName)
			var lista = eval('$rootScope.' + dataName)
			lista == undefined ? console.error('A listagem: ' + dataName.toUpperCase() + ' não foi iniciada') : null

			// Se o item não tiver ID
			console.log(registro);
			
			function isJson(str) {
				try {
					JSON.parse(str);
				} catch (e) {
					return false;
				}
				return true;
			}

			registro = isJson(registro) ? JSON.parse(registro) : registro;

			if (_.isEmpty(registro.id)) {
				var LISTA = angular.copy(lista)
				if (LISTA.length) {
					registro.id = LISTA.sort(function(a, b) { return a.id - b.id })[LISTA.length-1].id + 1
				} else {
					registro.id = 1
				}
			}

			lista.push(registro)

			$http.post(path, registro)
				.success(function (data) {
					Notification.publish('Cadastro realizado com sucesso', 'success');
				})
				.error(function (data) {
					Notification.publish('Erro ao adicionar o cadastro. Verificar se lista tem ID', 'danger');
				})
				return
		};
		
		// ------------------------------------------------------
		// Excluir - Exclui do banco e logo após do storage
		// ------------------------------------------------------
		function _delete(dataName, registro) {
			var path = _path(dataName)
			var lista = eval('$rootScope.' + dataName)

			var pos = lista.findIndex(function(item) {
				return item.id === registro.id
			})
			if (registro.id == null, registro.id == undefined) { console.error('O Item a ser excluído não possui ID')}

			lista.splice(pos, 1)

			$http.delete(path+'/'+registro.id)
				.success(function (data) {
					Notification.publish('Excluído com sucesso', 'success');
				})
				.error(function (data) {
					Notification.publish('Ooops. ', 'danger');
				})
			return
		}

		// ------------------------------------------------------
		// Adicionar uma nova lista de itens para o json
		// ------------------------------------------------------
		// Para adicionar chame o código: db.addList('nomeListagem', lista_json)
		// Se os itens não tiverem ID, será automaticamente adicionado
		function _addList(dataName, list) {
			eval('$rootScope.' + dataName + ' = []')

			list.forEach((item, index) => {
				setTimeout(function() {
					_add(dataName, JSON.stringify(item))
				}, index * 900)
			})
		};

		// ------------------------------------------------------
		// Adicionar mais informações para uma lista
		// ------------------------------------------------------
		// DATA é o array ou objeto que será adicionado
		// DATA_NAME é a lista que receberá a informação
		// PROPERTY. Quando a propriedade já existe na listagem, recebe DATA. Se não existir, é criado e recebe DATA.
		function addPropertyList(data, dataName, property, save) {
			function getRandomInt(min, max) {
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor(Math.random() * (max - min)) + min;
			}
	
			var list = eval('$rootScope.'+dataName)

			list.forEach((item, index) => {
				if (property) {
					if (item[property] == undefined) {//Se não existir a propriedade
						if (Array.isArray(data)) {
							eval('item.'+property+ '= new Array')
							item[property] = data
						} else {
							eval('item.'+property+ '= new Object')
							Object.assign(item[property], data)
						}
						console.log(item);
					} else {
						if (Array.isArray(data)) {
							item[property] = [].concat(item[property], data)
						} else {
							item[property].push(data)
						}
					}
				} else {
					Object.assign(item, data)
				}
	
				if (save) {
					setTimeout(function() {
						console.log('salvar');
						_save(dataName, item)
					}, index * 600)
				}
			})
		}

		// addPropertyList(varlor, $rootScope.imoveis)

		return {
			getData        : _getData       ,
			push           : _push           ,
			save           : _save           ,
			add            : _add            ,
			delete         : _delete         ,
			addList        : _addList       ,
			addPropertyList: addPropertyList
		};
	}])
})();