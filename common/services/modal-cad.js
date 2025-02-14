(function() {
	'use strict';

	angular.module('arrecadacao.common').factory('arrecadacao.common.ModalCad', ['bfc.dialog.Dialog', 'bfc.Notification','$q',
		function($dialog, Notification, $q) {

			function criarConf(prop) {

				if (!prop) {
					Notification.publish('Ops! Ocorreu um erro ao abrir o cadastro. Por favor contatar a Betha Sistemas!');
					throw new Error('É obrigatório informar as propriedades');
				}

				if (!prop.templateUrl || !prop.controller) {
					Notification.publish('Ops! Ocorreu um erro ao abrir o cadastro. Por favor contatar a Betha Sistemas!');
					throw new Error('É obrigatório a informação do templateUrl e do controller');
				}

				var conf = {
					templateUrl: prop.templateUrl,
					controller: prop.controller,
					styleClass: prop.styleClass,
					resolve: {
						params: {
							registro: prop.resolve.registro,
							readOnly: prop.readOnly,
							defaultValues: undefined,
							selectSetFn: undefined,
							action: 'add'
						}
					}
				};

				if (prop.resolve) {
					_.merge(conf.resolve.params, prop.resolve);
				}

				if (prop.scope) {
					_.merge(conf, { scope: prop.scope });
				}


				if (prop.readOnly) {
					return conf;
				}

				if (!prop.registro) {
					conf.resolve.params.action = 'edit';
					if (prop.defaultValues && prop.selectElem) {
						conf.focusOnClose = false;
						_.merge(conf.resolve.params, {
							defaultValues: prop.defaultValues,
							selectSetFn: ['bfc.Select2Set',
								function(select2Set) {
									return function(data) {
										select2Set(prop.selectElem, data.id);
									};
								}
							]
						});
						return conf;
					} else if (prop.selectSetFn) {
						_.merge(conf.resolve.params, {
							selectSetFn: function() {
								return prop.selectSetFn;
							}
						});
					}
					return conf;
				}

				if (prop.registro) {
					_.merge(conf.resolve.params, {
						registro: prop.registro
					});

					if (prop.selectSetFn) {
						_.merge(conf.resolv.params, {
							selectSetFn: function() {
								return prop.selectSetFn;
							}
						});
					}
					return conf;
				}
			}

			function _open(prop) {
				var _conf = criarConf(prop);
				$dialog.open(_conf);
			}

			return {
				open: _open
			};
		}
	]);
})();