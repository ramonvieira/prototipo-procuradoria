(function() {
    'use strict';
    var app = angular.module('arrecadacao.common');
    app.directive('bthAttach', directive);

    function directive() {
        return {
            restrict: 'E',

            templateUrl: 'common/directives/bth-attach/bth-attach.html',

            scope: {
                disabled: '='
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
        'bfc.dialog.Dialog'
    ];

    function Controller($compile, $scope, $q, $element, $log, $timeout, Dialog) {
        var vm = this;

        vm.showOverlay = function(event) {
            $(event.target).parent().css('opacity', '1');
        }

        vm.hideOverlay = function(event) {
            $(event.target).parent().removeAttr('style');
        }

        vm.openImage = function(src) {
            Dialog.open({
                templateUrl: "common/directives/bth-attach/bth-attach-modal.html",
                controller: "ImageViewCtrl as vm",
                resolve: {
                    src: function() {
                        return src
                    }
                }
            });
        }

        /* Attach */

        var drag_enter = false;
        var image_types = [{
            mime: 'image/jpeg',
            icon: 'fa-image',
            class: 'bth-attach-item__thumb-image',
            extension: ['jpg', 'jpeg']
        }, {
            mime: 'image/png',
            icon: 'fa-image',
            class: 'bth-attach-item__thumb-image',
            extension: ['png']
        }];
        var allowed_types = [{
                mime: 'application/pdf',
                icon: 'fa-file-pdf-o',
                class: 'bth-attach-item__thumb-icon--pdf',
                extension: ['pdf']
            }, {
                mime: 'application/msword',
                icon: 'fa-file-word-o',
                class: 'bth-attach-item__thumb-icon--doc',
                extension: ['doc']
            }, {
                mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                icon: 'fa-file-word-o',
                class: 'bth-attach-item__thumb-icon--doc',
                extension: ['docx']
            }, {
                mime: 'text/plain',
                icon: 'fa-file-text-o',
                class: 'bth-attach-item__thumb-icon--txt',
                extension: ['txt']
            }, {
                mime: 'text/html',
                icon: 'fa-file-code-o',
                class: 'bth-attach-item__thumb-icon--html',
                extension: ['html']
            }, {
                mime: 'application/vnd.ms-excel',
                icon: 'fa-file-excel-o',
                class: 'bth-attach-item__thumb-icon--xls',
                extension: ['xls']
            }, {
                mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                icon: 'fa-file-excel-o',
                class: 'bth-attach-item__thumb-icon--xls',
                extension: ['xlsx']
            }
        ]

        allowed_types = angular.merge(allowed_types, image_types);

        vm.setDragEnter = function() {
            drag_enter = true;
        }

        vm.setDragLeave = function() {
            drag_enter = false;
        }

        vm.isDragEnter = function() {
            return drag_enter;
        }

        vm.removeFile = function(f, i) {
            f.files.splice(i, 1);
        }

        vm.isAllowed = function(file) {
            return (vm.isTypeAllowed(file.file.type) || vm.isExtensionAllowed(vm.getFileExtension(file))) &&
                vm.isSizeAllowed(file.file.size)
        }

        vm.isTypeAllowed = function(type) {
            return allowed_types.some(function(t) { return t.mime == type})
        }

        vm.isExtensionAllowed = function(ext) {
            return allowed_types.some(function(t) {
                return t.extension.some(function(e) {
                    return ext == e
                })
            })
        }

        vm.isSizeAllowed = function(size) {
            return size < 10000000
        }

        vm.getErrorMessage = function(file) {
            if (!vm.isTypeAllowed(file.file.type) ||
                !vm.isExtensionAllowed(vm.getFileExtension(file))) return "Formato inválido";
            if (!vm.isSizeAllowed(file.file.size)) return "Tamanho excedido"
        }

        vm.getIcon = function(file) {
            var ext = vm.getFileExtension(file);
            if (!vm.isAllowed(file)) return 'fa-exclamation-triangle'
            return allowed_types.filter(function(t) {
                return t.extension.some(function(e) {return e == ext})
            })[0].icon
        }

        vm.getClass = function(file) {
            if (!vm.isAllowed(file)) return 'bth-attach-item__thumb-icon--error'
            var ext = vm.getFileExtension(file);
            return allowed_types.filter(function(t) {
                return t.extension.some(function(e) {return e == ext})
            })[0].class
        }

        vm.getFileExtension = function(file) {
            if (file)
                return file.name.substr(file.name.lastIndexOf('.') + 1)
        }

        vm.getFileName = function(file) {
            if (file)
                return file.name.substr(0, file.name.lastIndexOf('.'))
        }

        vm.getFileSize = function(bytes) {
            if (bytes >= 1000000000) {
                bytes = (bytes / 1000000000).toFixed(2) + ' GB';
            } else if (bytes >= 1000000) {
                bytes = (bytes / 1000000).toFixed(2) + ' MB';
            } else if (bytes >= 1000) {
                bytes = (bytes / 1000).toFixed(2) + ' KB';
            } else if (bytes > 1) {
                bytes = bytes + ' bytes';
            } else if (bytes == 1) {
                bytes = bytes + ' byte';
            } else {
                bytes = '0 byte';
            }
            return bytes;
        }


        vm.isImage = function(file) {
            return image_types.some(function(t) {return t.mime == file.file.type })
        }

        vm.getImageURL = function(file) {

            var fileReader = new FileReader();

            fileReader.onload = function(fileLoadedEvent) {

                file.uri = fileLoadedEvent.target.result;
            };

            fileReader.readAsDataURL(file.file);


        }
    }
    app.controller('ImageViewCtrl', ImageViewCtrl);


    ImageViewCtrl.$injector = ['$scope', 'src'];

    function ImageViewCtrl($scope, src) {
        var vm = this;

        vm.Images = [{
                src: src,
                active: true
            },
            {
                src: 'https://dummyimage.com/600x400/000/fff'
            },
            {
                src: 'https://dummyimage.com/1000x400/000/fff'
            },
            {
                src: 'https://dummyimage.com/20x20/000/fff'
            },
            {
                src: 'https://dummyimage.com/1000x1000/000/fff'
            },
            {
                src: 'https://dummyimage.com/20x3000/000/fff'
            },
        ];


        vm.getImages = function() {
            return vm.Images.map(function(i, index) {
                i.id = index + 1;
                return i;
            })
        }


        vm.getCurrentImage = function() {
            return vm.getImages().filter(function(i) {
                return i.active;
            })[0]
        }

        vm.hasPreviousImage = function() {
            return Boolean(vm.getImages()[vm.getCurrentImage().id - 2])
        }

        vm.hasNextImage = function() {
            return Boolean(vm.getImages()[vm.getCurrentImage().id])
        }

        vm.goPreviousImage = function() {

            if (!vm.hasPreviousImage()) return vm.getImages()[0];

            return vm.setActiveImage(vm.getCurrentImage().id - 2);
        }


        vm.goNextImage = function() {

            if (!vm.hasNextImage()) return vm.getImages()[0];

            return vm.setActiveImage(vm.getCurrentImage().id);
        }

        vm.setActiveImage = function(index) {
            vm.Images.map(function(i) {
                i.active = false;
                return i;
            })

            vm.Images[index].active = true;
        }

        vm.watchKeyEvent = function(e) {
            if (e.keyCode == 39) vm.goNextImage();
            if (e.keyCode == 37) vm.goPreviousImage();
        }

        vm.getSource = _getSource;


        function _getSource() {
            return src;
        }

    }
})();
