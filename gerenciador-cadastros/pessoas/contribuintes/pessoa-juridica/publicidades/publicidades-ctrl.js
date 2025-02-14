(function() {

    angular.module('app').controller('PublicidadesCtrl', PublicidadesCtrl);

    PublicidadesCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

    function PublicidadesCtrl($scope, ModalCad) {

        var vm = $scope;

        vm.adicionar = function(b) {
            abrirPopup({
                isEditing: b
            });
        };
        
        vm.addAverbacao = function(b) {
            adicionarAverbacao({
                isEditing: b
            });
        };

        vm.openAverbacao = function(b) {
            abrirAverbacao({
                isEditing: b
            });
        };

        vm.openAnexos = function(b) {
            abrirAnexos({
                isEditing: b
            });
        };

        vm.openMovimentacao = function(b) {
            abrirMovimentacao({
                isEditing: b
            });
        };

        function abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/publicidades-modal.html',
                controller: 'PublicidadesModalCtrl as PublicidadesModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }
        
        function adicionarAverbacao(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/averbacoes/averbacoes-modal.html',
                controller: 'PublicidadesModalCtrl as PublicidadesModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        function abrirAverbacao(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/averbacoes/averbacoes.html',
                controller: 'PublicidadesModalCtrl as PublicidadesModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        function abrirAnexos(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/anexo/anexos.html',
                controller: 'AnexoCtrl as AnexoCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        function abrirMovimentacao(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/movimentacoes/movimentacao.html',
                controller: 'PublicidadesModalCtrl as PublicidadesModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.comments=[
            {
                nome:'Ramon Vieira Viquetti',
                user:'@ramon.viquetti',
                comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut ipsum non est tincidunt gravida quis a felis. Quisque ut gravida sem, et hendrerit massa. Aliquam condimentum orci sit amet quam vestibulum efficitur.Vestibulum fringilla ultrices dolor, sit amet maximus lorem porta vitae. Ut varius interdum efficitur. Mauris ultricies est vitae sem maximus, eu rutrum eros faucibus. Aenean gravida ex sed turpis luctus, tincidunt porttitor ipsum hendrerit.',
                photo:'images/gabriela.jpg'
            },{
                nome:'Luis Eduardo Salgado Costa',
                user:'@luis.costa',
                comment: 'Nullam commodo dui non fringilla malesuada.',
                photo:'images/avatar.png'
            },{
                nome:'Ramon Vieira Viquetti',
                user:'@ramon.viquetti',
                comment: 'Nam mollis id justo a fringilla. Duis nec lobortis nibh, ut faucibus mi. Aliquam faucibus lobortis felis, nec maximus dolor tempus et. Aliquam erat volutpat.',
                photo:'images/gabriela.jpg'
            },{
                nome:'Luis Eduardo Salgado Costa',
                user:'@luis.costa',
                comment: 'Vestibulum commodo dui vitae diam finibus, ut imperdiet ante lacinia.',
                photo:'images/avatar.png'
            }
        ]

        // Estruturas listagem

        vm.lineHeight = 1;

        vm.setLineHeight = function(height) {
            vm.lineHeight = height;
        }

        vm.coluna1IsVisible = true;
        vm.coluna2IsVisible = true;
        vm.coluna3IsVisible = true;
        vm.coluna4IsVisible = true;
        vm.coluna5IsVisible = true;

        $scope.$watch("viewContentLoaded", function() {
            setTimeout(function() {

                // Evita que checkbox fecha o menu
                var options = [];
                $( '.dropdown-menu a' ).on( 'click', function( event ) {

                   var $target = $( event.currentTarget ),
                       val = $target.attr( 'data-value' ),
                       $inp = $target.find( 'input' ),
                       idx;

                   if ( ( idx = options.indexOf( val ) ) > -1 ) {
                      options.splice( idx, 1 );
                      setTimeout( function() { $inp.prop( 'checked', true ) }, 0);
                   } else {
                      options.push( val );
                      setTimeout( function() { $inp.prop( 'checked', false ) }, 0);
                   }

                   $( event.target ).blur();
                      
                   return false;
                });

                //Filtros das colunas
                $("#filtroColunas").select2('val', ['1', '2', '3', '4', '5', '6']);

                //Radio button em dropdown menu não fecha o menu
                $( '.dropdown-menu .bth-radio' ).on( 'click', function(e) {
                    e.stopPropagation();
                });

                //Clique em dropdown menu não fecha o menu
                 $( '.dropdown-menu' ).on( 'click', function(e) {
                    e.stopPropagation();
                });

            }, 200);
        });


    }

    //controller da modal
    angular.module('app').controller('PublicidadesModalCtrl', PublicidadesModalCtrl);

    PublicidadesModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

    function PublicidadesModalCtrl($scope, ModalCad, params) {

        var vm = $scope;
            vm.isOpen;

        vm.editAverbacao = function (value){
            return vm.averbacao = value;
        };

        vm.changeResponsavel = function (value){
            return vm.responsavel = value;
        }
        
        vm.comments=[
            {
                nome:'Ramon Vieira Viquetti',
                user:'@ramon.viquetti',
                comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut ipsum non est tincidunt gravida quis a felis. Quisque ut gravida sem, et hendrerit massa. Aliquam condimentum orci sit amet quam vestibulum efficitur.Vestibulum fringilla ultrices dolor, sit amet maximus lorem porta vitae. Ut varius interdum efficitur. Mauris ultricies est vitae sem maximus, eu rutrum eros faucibus. Aenean gravida ex sed turpis luctus, tincidunt porttitor ipsum hendrerit.',
                photo:'images/gabriela.jpg'
            },{
                nome:'Luis Eduardo Salgado Costa',
                user:'@luis.costa',
                comment: 'Nullam commodo dui non fringilla malesuada.',
                photo:'images/avatar.png'
            },{
                nome:'Ramon Vieira Viquetti',
                user:'@ramon.viquetti',
                comment: 'Nam mollis id justo a fringilla. Duis nec lobortis nibh, ut faucibus mi. Aliquam faucibus lobortis felis, nec maximus dolor tempus et. Aliquam erat volutpat.',
                photo:'images/gabriela.jpg'
            },{
                nome:'Luis Eduardo Salgado Costa',
                user:'@luis.costa',
                comment: 'Vestibulum commodo dui vitae diam finibus, ut imperdiet ante lacinia.',
                photo:'images/avatar.png'
            }
        ]

        vm.economicos = [{
            id: 1,
            nome: 'Ramon Vieira Viquetti',
            cpfCnpj: '000.000.000-00',
            inscricaoMunicipal:'-'
        },{
            id: 2,
            nome: 'Betha Sistemas',
            cpfCnpj: '85.838.117/0001-00',
            inscricaoMunicipal:'15184253'
        }]

        vm.responsavel = [{
            id: 1,
            nome: 'Ramon Vieira Viquetti',
            cpfCnpj: '000.000.000-00',
            inscricaoMunicipal:'-'
        },{
            id: 2,
            nome: 'Betha Sistemas',
            cpfCnpj: '85.838.117/0001-00',
            inscricaoMunicipal:'15184253'
        },{
            id: 3,
            nome: 'Luis Eduardo Salgado Costa',
            cpfCnpj: '85.838.117/0001-00',
            inscricaoMunicipal:'-'
        }]
        
        vm.userOptions = {
            data: vm.economicos,
            formatResult: _formatUser,
            formatSelection: _format,
            allowClear: true
        }

        vm.userResponsavelOptions = {
            data: vm.responsavel,
            formatResult: _formatUserResponsavel,
            formatSelection: _format,
            allowClear: true
        }


        function _format(item) {
            return item.nome
        }


        function _formatUser(item) {
            return "<div class='row bottom'>" +
                "<div class='col-md-12' style='padding-left: 21px'>" + item.nome +
                '<br><small> CPF / CNPJ : ' + item.cpfCnpj + '</small>' +' | <small> Inscrição municipal : ' + item.inscricaoMunicipal + '</small>' +
                '</div>' +
                '</div>';
        }

        function _formatUserResponsavel(item) {
            return "<div class='row bottom'>" +
                "<div class='col-md-12' style='padding-left: 21px'>" + item.nome +
                '<br><small> CPF / CNPJ : ' + item.cpfCnpj + '</small>' +
                '</div>' +
                '</div>';
        }

        vm.addEndereco = function(b) {
            abrirPopup({
                isEditing: b
            });
        };

        function abrirPopup(resolve) {
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/endereco-modal.html',
                controller: 'PublicidadesModalCtrl as PublicidadesModalCtrl',
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.openAnexo = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/anexo/anexos.html',
                controller: function($scope){},
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.openMovimentacao = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/movimentacao-modal.html',
                controller: function($scope){},
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

        vm.openMovimentacaoCad = function(resolve = {}){
            ModalCad.open({
                templateUrl: 'gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/movimentacoes/movimentacao-modal-cad.html',
                controller: function($scope){},
                scope: $scope,
                resolve: angular.extend(resolve, {
                    persistRemove: false
                })
            });
        }

    }

    angular.module('app').controller('AnexoCtrl', AnexoCtrl);
    
   AnexoCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad'];

   function AnexoCtrl($scope, ModalCad) {
       var vm = this;

       vm.showOverlay = function (event) {
           $(event.target).parent().css('opacity', '1');
       }

       vm.hideOverlay = function (event) {
           $(event.target).parent().removeAttr('style');
       }

       vm.openImage = function (src) {
           ModalCad.open({
               templateUrl: "gerenciador-cadastros/pessoas/contribuintes/pessoa-juridica/publicidades/anexo/modal-view-imagem.html",
               controller: "ImageViewCtrl as vm",
               resolve: {
                   src: src
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
       },
       {
           mime: 'image/png',
           icon: 'fa-image',
           class: 'bth-attach-item__thumb-image',
           extension: ['png']
       }
       ];
       var allowed_types = [{
           mime: 'application/pdf',
           icon: 'fa-file-pdf-o',
           class: 'bth-attach-item__thumb-icon--pdf',
           extension: ['pdf']
       },
       {
           mime: 'application/msword',
           icon: 'fa-file-word-o',
           class: 'bth-attach-item__thumb-icon--doc',
           extension: ['doc']
       },
       {
           mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
           icon: 'fa-file-word-o',
           class: 'bth-attach-item__thumb-icon--doc',
           extension: ['docx']
       },
       {
           mime: 'text/plain',
           icon: 'fa-file-text-o',
           class: 'bth-attach-item__thumb-icon--txt',
           extension: ['txt']
       },
       {
           mime: 'text/html',
           icon: 'fa-file-code-o',
           class: 'bth-attach-item__thumb-icon--html',
           extension: ['html']
       },
       {
           mime: 'application/vnd.ms-excel',
           icon: 'fa-file-excel-o',
           class: 'bth-attach-item__thumb-icon--xls',
           extension: ['xls']
       },
       {
           mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
           icon: 'fa-file-excel-o',
           class: 'bth-attach-item__thumb-icon--xls',
           extension: ['xlsx']
       },
       ...image_types
       ]

       vm.setDragEnter = function () {
           drag_enter = true;
       }

       vm.setDragLeave = function () {
           drag_enter = false;
       }

       vm.isDragEnter = function () {
           return drag_enter;
       }

       vm.removeFile = function (f, i) {
           f.files.splice(i, 1);
       }

       vm.isAllowed = function (file) {
           return (vm.isTypeAllowed(file.file.type) || vm.isExtensionAllowed(vm.getFileExtension(file))) &&
               vm.isSizeAllowed(file.file.size)
       }

       vm.isTypeAllowed = function (type) {
           return allowed_types.some(t => t.mime == type)
       }

       vm.isExtensionAllowed = function (ext) {
           return allowed_types.some(t => {
               return t.extension.some(e => {
                   return ext == e
               })
           })
       }

       vm.isSizeAllowed = function (size) {
           return size < 10000000
       }

       vm.getErrorMessage = function (file) {
           if (!vm.isTypeAllowed(file.file.type) ||
               !vm.isExtensionAllowed(vm.getFileExtension(file))) return "Formato inválido";
           if (!vm.isSizeAllowed(file.file.size)) return "Tamanho excedido"
       }

       vm.getIcon = function (file) {
           var ext = vm.getFileExtension(file);
           if (!vm.isAllowed(file)) return 'fa-exclamation-triangle'
           return allowed_types.filter(function (t) {
               return t.extension.some(e => e == ext)
           })[0].icon
       }

       vm.getClass = function (file) {
           if (!vm.isAllowed(file)) return 'bth-attach-item__thumb-icon--error'
           var ext = vm.getFileExtension(file);
           return allowed_types.filter(function (t) {
               return t.extension.some(e => e == ext)
           })[0].class
       }

       vm.getFileExtension = function (file) {
           if (file)
               return file.name.substr(file.name.lastIndexOf('.') + 1)
       }

       vm.getFileName = function (file) {
           if (file)
               return file.name.substr(0, file.name.lastIndexOf('.'))
       }

       vm.getFileSize = function (bytes) {
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


       vm.isImage = function (file) {
           return image_types.some(t => t.mime == file.file.type)
       }

       vm.getImageURL = function (file) {

           var fileReader = new FileReader();

           fileReader.onload = function (fileLoadedEvent) {

               file.uri = fileLoadedEvent.target.result;
           };

           fileReader.readAsDataURL(file.file);
       }  

   }
    
   angular.module('app').controller('ImageViewCtrl', ImageViewCtrl);
   
   ImageViewCtrl.$inject = ['$scope','params'];

   function ImageViewCtrl($scope , params) {
       var vm = this;

       vm.Images = [{
               src: params.src,
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