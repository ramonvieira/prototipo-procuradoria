(function()
	{
		'use strict';
		angular.module('arrecadacao.common').directive('fileUpload',
			function() {
				return {
					restrict: 'AE',
					scope: {
						maxSize: '=?',
						fileList: '=?',
						download: '&',
						editar: '&',
						comentario: '='
					},
					controller: function($scope, $injector, $window) {
						$scope.tipoArquivo = $injector.get('ENUMS').TIPO_ARQUIVO;
						var Notification = $injector.get('bfc.Notification');
						var promiseTracker = $injector.get('promiseTracker');
						var $filter = $injector.get('$filter');
						var $timeout = $injector.get('$timeout');
						var isEdition = false;
						var files = [];
						$scope.downloadFile = function (item) {
							$scope.download({id: item.id}).then(function(data) {
								var file = new Blob([data]);
								var url = $window.URL || $window.webkitURL;
								var fileUrl = url.createObjectURL(file);
								var anchor = angular.element('<a/>');
								anchor.attr({
									href: fileUrl,
									target: '_blank',
									download: item.nomeArquivo
								})[0].click();
							});
						};

						$scope.addComment = function (index, list) {
							$scope.$emit('addComment', index, list);
						};

						$scope.fileAdded = function ($file, $event, $flow) {
							if ($file.size > ($scope.maxSize || 20480) * 1024) {
								var size = (($scope.maxSize || 20480) /1024).toFixed(2);
								Notification.publish('Tamanho do arquivo "' + $file.name + '" acima de ' + $filter('number')(size) + ' MB!', 'erro');
								return false;
							}
							var tipoArquivo = $scope.getTipoArquivo($file.name);
							if (!tipoArquivo.id) {
								Notification.publish('O tipo do arquivo "' + $file.name + '" é inválido!', 'erro');
								return false;
							}
							return true;
						};

						$scope.filesChanged = function ($files, $event, $flow) {
							$scope.$emit('filesChanged', $files);
						};

						$scope.getTipoArquivo = function (filename) {
							var file = filename.split('.');
							var type = file[file.length ? file.length -1 : 0].toUpperCase();
							var tipoArquivo = _.findWhere($scope.tipoArquivo, {id: type});
							return tipoArquivo ? tipoArquivo : {class: 'fa fa-file-o', color: 'gray5'};
						};

						$scope.remover = function (index, list, newFiles) {
							if (newFiles) {
								list.splice(index, 1);
								$scope.$emit('filesRemove', list);
							}else{
								$scope.$emit('removerArquivo', index, list[index], function(promise){$scope.setPromise(promise, index)});
							}
						};

						$scope.removeAll = function (flow) {
							flow.files = [];
						}

						$scope.$on('clear-files', function() {
							$timeout(function() {
								angular.element("#remove-all").triggerHandler('click');
							}, 100);
						});

						$scope.isEdition = function() {
							if (angular.isFunction($scope.editar)) {
								return $scope.editar();
							}
							return false;
						};

						$scope.setPromise = function(promise, index) {
							$scope.fileList[index].excluindo = promiseTracker();
							$scope.fileList[index].excluindo.addPromise(promise)
						};

					},
					templateUrl: 'common/directives/fileUpload/file-upload.html',
					transclude: true
				}
			}
		)
	}
)();
