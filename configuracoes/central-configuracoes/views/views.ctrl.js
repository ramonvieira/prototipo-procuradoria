(function() {
	'use strict';

	var app = angular.module('app');
	
	app.controller('app.ViewsCtrl', [
		'$scope', 'bfc.dialog.Dialog',
		function ($scope, Dialog) {

			// $scope.sortableOptionsAgrupadores = {
			// 	sort: true,
   //     			delay: 0,
   //     			handle: '.handle',
			//     ghostClass: 'ghost',
			//     forceFallback: true,
			//     animation: 50,
			// 	tolerance: 'pointer',
   //     		}

       		$scope.sortableOptionsAgrupadores = {
       			handle: '.handle',
				tolerance:"pointer",
				distance: 5,
				forceHelperSize: true,
				dropOnEmpty: true,
				forcePlaceholderSize: true,
				helper: "clone",
				opacity: 0.8,
				revert: '150',
				axis: 'y'
       		}

       		$scope.sortableOptionsCampos = {
				connectWith: '.sortable',
				containment: '.containment',
       			handle: '.handle',
				tolerance: 'pointer',
				distance: 5,
				// forceHelperSize: true,
				dropOnEmpty: true,
				// forcePlaceholderSize: true,
				// helper: "clone",
				items: "> li",
				opacity: 0.8,
				// placeholder: 'ghost',
				revert: '150',
				// axis: 'y'
       		}

			$scope.campos = [];
			$scope.agrupadores = [
				{
					titulo: '',
					campos: []
				}
			];
			$scope.campoMarcado;
			$scope.agrupadorMarcado = $scope.agrupadores[0];

			// Abre o modal "Adicionando modal exemplo"
	       	$scope.salvarFormulario = function(){
	       		Dialog.open(
		       		{
		       			templateUrl: "common/modal-exemplo/modal-exemplo-cad.html",
		       			controller: "app.ModalExemploCtrl"
		       		}
		       	)
	       	}

	       	// Funções formulário

	       	$scope.adicionarCampo = function() {
	       		$scope.agrupadorMarcado.campos.push(
	       			{
	       				nome: 'Campo ' + ($scope.agrupadorMarcado.campos.length+1),
	       				obrigatorio: 2,
	       				tipo: 1,
	       				opcoes: [{nome: ''}, {nome: ''}],
	       				dicaPreenchimento: null,
	       				maxCaracteres: 255,
	       				placeholder: null,
	       				multiplo: 2,
	       				linhasVisiveis: 1,
	       				largura: '100'
	       			}
	       		);

	       		var ultimoCampo = $scope.agrupadorMarcado.campos[$scope.agrupadorMarcado.campos.length-1];
	       		$scope.marcaCampo(ultimoCampo, $scope.agrupadorMarcado);
	       		focaNomeCampo();
	       	}

	       	$scope.adicionarAgrupador = function(){
	       		$scope.agrupadores.push(
	       			{
	       				titulo: '',
	       				campos: []
	       			}
	       		);
	       		var ultimoAgrupador = $scope.agrupadores[$scope.agrupadores.length-1];
	       		$scope.marcaAgrupador(ultimoAgrupador);
	       	}

	       	$scope.adicionarOpcao = function(campo) {
	       		campo.opcoes.push({nome: ''});
	       		focaUltimaOpcao();
	       	}

	       	$scope.removerOpcao = function(campo, opcao) {
	       		var index = campo.opcoes.indexOf(opcao);
	       		campo.opcoes.splice(index, 1);
	       	}

	       	function focaNomeCampo(){
	       		setTimeout(function(){
	       			$("#nomeCampo").select();
	       		}, 200);
	       	}

	       	function focaUltimaOpcao(){
	       		setTimeout(function(){
	       			$("#ultimaOpcao").select();
	       		}, 100);
	       	}

	       	$scope.removerCampo = function(campo) {
	       		var index = $scope.agrupadorMarcado.campos.indexOf(campo);
	       		$scope.agrupadorMarcado.campos.splice(index, 1);
	       		$scope.campoMarcado = null;
	       	}

	       	$scope.removerAgrupador = function(agrupador) {
	       		var index = $scope.agrupadores.indexOf(agrupador);
	       		$scope.agrupadores.splice(index, 1);
	       		$scope.agrupadorMarcado = null;
	       	}

	       	$scope.marcaCampo = function(campo, agrupador) {
	       		$scope.marcaAgrupador(agrupador);
   				$scope.campoMarcado = campo;
	       	}

	       	$scope.marcaAgrupador = function(agrupador) {
	       		if($scope.agrupadorMarcado != agrupador) {
	       			$scope.campoMarcado = null;
   					$scope.agrupadorMarcado = agrupador;
	       		}
	       	}

	       	$scope.copiarConfiguracaoDocumento = function() {
	       		Dialog.open(
		       		{
		       			templateUrl: "configuracoes/central-configuracoes/views/documentos-copiar.html",
		       			controller: "app.ViewsCtrl"
		       		}
		       	)
	       	}

       		// Funções box configurações

       		$scope.incrementa = function() {
       			if($scope.maximoCaracteres == null) {
       				$scope.maximoCaracteres = 0;
       				$scope.maximoCaracteres++;
       			} else {
       				$scope.maximoCaracteres++;
       			}
       		}
       			
       		$scope.decrementa = function() {
       			if($scope.maximoCaracteres == null || $scope.maximoCaracteres == 1) {
       			
       			} else {
       				$scope.maximoCaracteres--;
       			}
       		}

			$scope.tipoAlterado = function(){
				if($scope.campoMarcado.tipo == 5){
					$scope.campoMarcado.nome = 'CPF';
				}else if($scope.campoMarcado.tipo == 6){
					$scope.campoMarcado.nome = 'CNPJ';
				}else if($scope.campoMarcado.tipo == 7){
					$scope.campoMarcado.nome = 'CEP';
				}else if($scope.campoMarcado.tipo == 8){
					$scope.campoMarcado.nome = 'Telefone';
				}
			}

			$scope.incrementaLinhas = function(campo) {
				if(campo.linhasVisiveis < 5){
					campo.linhasVisiveis += 1;
				}
			}
			$scope.decrementaLinhas = function(campo) {
				if(campo.linhasVisiveis > 1){
					campo.linhasVisiveis -= 1;
				}
			}


			$scope.vincularModelo = function() {
	       		Dialog.open(
		       		{
		       			templateUrl: "configuracoes/central-configuracoes/views/documentos/vincular-modelo-cad.html",
		       			controller: "app.ViewsCtrl"
		       		}
		       	)
	       	}

	       	$scope.addQuebra = function() {
	       		Dialog.open(
		       		{
		       			templateUrl: "configuracoes/central-configuracoes/views/documentos/quebras-cad.html",
		       			controller: "app.ViewsCtrl"
		       		}
		       	)
	       	}

	       	$( function() {
				$( "#sortable4" ).sortable({
					placeholder: 'ui-card-sortable',
					revert: true,
					cursor: '-webkit-grabbing',
					forcePlaceholderSize: true
				});
				$( "#sortable4" ).disableSelection();
			} );

			var fixHelper = function(e, ui) {
				ui.children().each(function() {
					$(this).width($(this).width());
				});
				return ui;
			};

			$scope.sortableOptions = {
				helper: fixHelper,
				connectWith: ".sortable4"
			};
		}
	]);	
})();