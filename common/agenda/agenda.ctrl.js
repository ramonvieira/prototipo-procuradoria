
(function() {
	'use strict';
	
	var app = angular.module('app');
	
	app.controller('AgendaCtrl', [
		'$scope',
		'AgendaService',
		'arrecadacao.common.ModalCad',
		'ENUMS',
		'$state',
		function ($scope, AgendaService, ModalCad, ENUMS, $state) {
			var vm = $scope;
			
			// Variáveis para o cálculo de posicionamento dentro das visões
			var currDate = new Date();
			var startTime = new Date(2018, currDate.getMonth(), currDate.getDate()).getTime();
			var endTime = new Date(2018, currDate.getMonth(), currDate.getDate() + 1).getTime();
			var diffTime = endTime - startTime;
			vm.now = currDate.getDate()
			vm.contrituintes = ENUMS.CONTRIBUINTES;
			vm.procuradores = ENUMS.PROCURADORES;
			vm.url = $state.current.url
			vm.viewAgenda = vm.storageSet('viewAgenda', 'semana');

			vm.setViewAgenda = function(resolve) {
				vm.viewAgenda = vm.storageSet('viewAgenda', null , resolve.view);
			}

			vm.adicionar = function(resolve) {
				abrirPopup('common/agenda/modal-add-agenda.html', resolve)
				console.log(resolve);
				// abrirPopup('agenda/tarefa/tarefa-modal.html', resolve)
			};

			vm.recebimentoTrib = function(resolve) {
				abrirPopup('gerenciador-documentos/integracoes/recebimento/recebimento-modal.html', resolve)
			};
			
			// Marcador do horário atual
			setInterval(function () {
				vm.currentTimeRelative = getTimePercent(new Date().getTime());
				vm.$apply();
			}, 1000);
			
			
			function getTimePercent(timeRelative) {
				var currentTime = timeRelative - startTime;
				return (currentTime * 100) / diffTime;
			}
			
			// Retorna a posição relativa ao topo da hora atual
			vm.getStyleCurrentTimeRelative = function() {
				return {
					'top': vm.currentTimeRelative + '%'
				};
			}
			
			// Verifica se o período é maior que uma hora
			vm.isDurationMoreThanOneHour = function(hour, event) {
				var startTime = new Date(2018, currDate.getMonth(), currDate.getDate(), hour, event.minute).getTime();
				
				if (!event.end)
				return false;
				
				var endTime = new Date(2018, currDate.getMonth(), currDate.getDate(), event.end.hour, event.end.minute).getTime();
				
				return (endTime - startTime) > 3600000
			}
			
			// Aplica o foco no elemento
			vm.setFocus = function(event, state) {
				event.isFocus = state;
			}
			
			
			// Retorna a posição do evento dentro da visualização de dia/semana
			vm.getEventStylePosition = function(hour, event, pos, limitRange, isAllDay = false, events = []) {
				
				var startTime = new Date(2018, currDate.getMonth(), currDate.getDate(), hour, event.minute).getTime();
				var topPercent = getTimePercent(startTime);
				var endTime = event.end ? new Date(2018, currDate.getMonth(), currDate.getDate(), event.end.hour, event.end.minute).getTime() : topPercent;
				var bottomPercent = getTimePercent(endTime);
				var range = event.range > limitRange ? limitRange : event.range;
				var lengthEvents = events.length;
				var out = {};
				
				var widthRange = 100 / lengthEvents;
				var paddingRange = (pos) * widthRange;
				
				out.top = isAllDay ? 0 : topPercent + '%';
				out.left = isAllDay ? 0 : pos == 0 ? 'calc(' + paddingRange + '% + 6px)' : paddingRange + '%';
				
				var bezel = pos == 0 ? 12 : 6;
				
				if (!isAllDay)
				out.width = 'calc(' + (100 - paddingRange) + '% - ' + bezel + 'px)';
				
				out.height = ((endTime - startTime) > 1800000 ? (bottomPercent - topPercent) + '%' : '23px');
				
				return out;
			}
			
			// Configuração do ui-sortable (visão lista)
			vm.configSortable = {
				connectWith: ['.bth-schedule__day', '.bth-card__container'],
				placeholder: 'bth-card--placeholder',
				revert: true,
				start: function(e, ui){
					ui.placeholder.height(ui.helper.outerHeight());
					ui.placeholder.width(ui.helper.outerWidth());
				}
			}

			$('[data-toggle="popover"]').popover({
				title:'teste'
				});   

			vm.teste = function() {
				$('.openPopover').on('mouseenter', function (e) {
					$('.openPopover').not(this).popover('destroy');
					var InstId = $(this).find("td:first-child").html();
					var InstName = $(this).find("td:first-child").next("td").html();
					if (!$(this).data("bs.popover")) {
			
						$(this).popover({
							placement: 'right',
							trigger: 'manual',
							html: true,
							title: InstName,
							content: function () {
								return $.ajax({
									url: '@Url.Action("ControllerMethod", "Controller")',
									data: { id: InstId },
									dataType: 'html'                            
								}).responseText;
							}
						});
			
					}
			
					$(this).popover('show');
				});
				
			}

			// $('.openPopover').popover({
			// 	html: true,
			// 	title: "<span class='booked'>This is booked</span>", 
			// 	content: "Meeting at "
			// })

			// ------------------------------------------------------
			// Configurações do teclado
			// ------------------------------------------------------
			$(document).keyup(function(e){
				e = e || window.event;
				var isEscape = false;
				if ("key" in e) {
					isEscape = (e.key === "Escape" || e.key === "Esc");
				} else {
					isEscape = (e.keyCode === 27);
				}
				if (isEscape) {
					$('#closeFilter').click()
				}

				// console.log(e.target.tagName);
				// console.log(e.keyCode);
				
				
				if (e.target.tagName == 'BODY' || e.target.tagName == 'BUTTON' || e.target.tagName == 'A') {
					e.keyCode == 84 ? $('#teste').click() : null; // T
					e.keyCode == 68 ? $('#dia').click() : null; // D
					e.keyCode == 83 ? $('#semana').click() : null; // S
					e.keyCode == 77 ? $('#mes').click() : null; // M
					e.keyCode == 65 ? $('#ano').click() : null; // A
					e.keyCode == 69 ? $('#eventos').click() : null; // E
				}

				if (e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA') {
					// Pesquisar
					e.keyCode == 13 ? $('#pesquisar').click() : null; // ENTER
					e.keyCode == 80 || e.keyCode == 70 ? $('#filtroAvancado').click() : null; // P || Ctrl + F
					// Agendar
					e.keyCode == 78 ? $('#novo').click() : null; // N
					e.keyCode == 83 ? $('#salvar').click() : null; //S
				}
			});

			vm.listEvents = [
				{ day: new Date(), events: [
					{ title: '200 Intimações a receber'  , prazo: 1, numProcesso: '0900264-79.2018.8.24.0078', obs: 'Observação sobre a intimação', class: 'bth-status--info'  , ref: 'Processo'},
					{ title: 'Descrição do evento', prazo: 1, obs: 'Informação complementar do evento', class: 'bth-status--danger', ref: 'Processo'},
					{ title: 'Descrição do evento', prazo: 2, obs: 'Informação complementar do evento', class: 'bth-status--info'  , ref: 'Protesto'},
				]},
				{ day: new Date(), events: [
					{ title: 'Descrição do evento', prazo: 3, obs: 'Informação complementar do evento', class: 'bth-status--info', ref: 'Protesto'},
					{ title: 'Descrição do evento', prazo: 3, obs: 'Informação complementar do evento', class: 'bth-status--primary', ref: 'Administrativo'},
					{ title: 'Descrição do evento', prazo: 3, obs: 'Informação complementar do evento', class: 'bth-status--info', ref: 'Protesto'},
					{ title: 'Descrição do evento', prazo: 4, obs: 'Informação complementar do evento', class: 'bth-status--warning', ref: 'Administrativo'},
					{ title: 'Descrição do evento', prazo: 5, obs: 'Informação complementar do evento', class: 'bth-status--info', ref: 'Processo'},
				]},
				{ day: new Date(), events: [
					{ title: 'Descrição do evento', prazo: 10, obs: 'Informação complementar do evento', class: 'bth-status--info', ref: 'Processo'},
					{ title: 'Descrição do evento', prazo: 10, obs: 'Informação complementar do evento', class: 'bth-status--info', ref: 'Protesto'},
				]},
			]

			vm.horarios = [
				'00:00', '00:15', '00:30', '00:45',
				'01:00', '01:15', '01:30', '01:45',
				'02:00', '02:15', '02:30', '02:45',
				'03:00', '03:15', '03:30', '03:45',
				'04:00', '04:15', '04:30', '04:45',
				'05:00', '05:15', '05:30', '05:45',
				'06:00', '06:15', '06:30', '06:45',
				'07:00', '07:15', '07:30', '07:45',
				'08:00', '08:15', '08:30', '08:45',
				'09:00', '09:15', '09:30', '09:45',
				'10:00', '10:15', '10:30', '10:45',
				'11:00', '11:15', '11:30', '11:45',
				'12:00', '12:15', '12:30', '12:45',
				'13:00', '13:15', '13:30', '13:45',
				'14:00', '14:15', '14:30', '14:45',
				'15:00', '15:15', '15:30', '15:45',
				'16:00', '16:15', '16:30', '16:45',
				'17:00', '17:15', '17:30', '17:45',
				'18:00', '18:15', '18:30', '18:45',
				'19:00', '19:15', '19:30', '19:45',
				'20:00', '20:15', '20:30', '20:45',
				'21:00', '21:15', '21:30', '21:45',
				'22:00', '22:15', '22:30', '22:45',
				'23:00', '23:15', '23:30', '23:45',
			]

			// ------------------------------------------------------
			// Tarefas
			// ------------------------------------------------------
			vm.tarefasExemplo = '[{"id":1,"descricao":"Descrição da tarefa","pendente":true,"agendado":false,"vinculos":[{"procuradores":[8,7]},{"contribuintes":[1,2]},{},{},{"protestos":["789012","901234"]}],"marcadores":[1,2]},{"id":2,"descricao":"Revisar dívidas pagas","pendente":true,"agendado":false,"vinculos":[{"procuradores":[0,1,2,3]},{"contribuintes":[1,2]},{"dividas":["123456","234567"]},{"processos":["678901"]},{"protestos":["789012"]}],"marcadores":[0,1,2,3]},{"id":3,"descricao":"Revisão de protestos com o cartório","pendente":true,"agendado":false,"vinculos":[{"procuradores":[]},{"contribuintes":[1,2]},{},{},{"protestos":["789012","890123","901234"]}],"marcadores":[]},{"id":4,"descricao":"Mais uma tarefa pendente","pendente":true,"agendado":false,"vinculos":[{"procuradores":[1,3,2]},{"contribuintes":[1,2]},{"dividas":["123456"]},{"processos":["456789","567890"]},{}],"marcadores":[0,1,2]},{"id":5,"descricao":"asdfasdfasdf","pendente":true,"agendado":false,"vinculos":[{"procuradores":[0,2,3]},{"contribuintes":[1,2]},{},{},{}],"marcadores":[1,2,3,0]},{"id":6,"descricao":"Reunir procuradores","pendente":true,"agendado":false,"vinculos":[{"procuradores":[0,1,3,10,9,8,7,6]},{"contribuintes":[1,2]},{},{"processos":["456789"]},{"protestos":["789012","890123"]}],"marcadores":[2,3,0]}]'
			vm.setTarefasExemplo = function () {
				vm.storageSet('tarefas', null, vm.tarefasExemplo);
				vm.tarefas = JSON.parse(vm.tarefasExemplo);
			}

			// vm.tarefas = JSON.parse(vm.storageSet('tarefas', null)) ? JSON.parse(vm.storageSet('tarefas', null)) : new Array;
			vm.tarefas = JSON.parse(vm.storageSet('tarefas', null)) ? JSON.parse(vm.storageSet('tarefas', null)) : JSON.parse(vm.tarefasExemplo);

			vm.setTarefas = function(resolve) {
				console.log(resolve);
				
				if(resolve != null || !resolve.delete) {
					vm.tarefas.push(resolve)
				} else {
					for (let i = 0; i < vm.tarefas.length; i++) {
						if (vm.tarefas[i].id == resolve.idx) {
							vm.tarefas.splice(i, 1)
						}
					}
				}
				vm.tarefas = vm.storageSet('tarefas', null, JSON.stringify(vm.tarefas));
				vm.tarefas = JSON.parse(vm.storageSet('tarefas', null));
				console.log(vm.tarefas);
				
			}
			
			vm.excluiTarefas = function(resolve) {
				console.log(resolve);
				for (let i = 0; i < vm.tarefas.length; i++) {
					if (vm.tarefas[i].id == resolve.idx) {
						vm.tarefas.splice(i, 1)
					}
				}
				vm.tarefas = vm.storageSet('tarefas', null, JSON.stringify(vm.tarefas));
				vm.tarefas = JSON.parse(vm.storageSet('tarefas', null));
			}

			vm.updateTarefas = function(resolve) {
				console.log(resolve);
				
				for (let i = 0; i < vm.tarefas.length; i++) {
					if (vm.tarefas[i].id == resolve.idx) {
						vm.tarefas[i].pendente = resolve.pendente
					}
				}
				vm.tarefas = vm.storageSet('tarefas', null, JSON.stringify(vm.tarefas));
				vm.tarefas = JSON.parse(vm.storageSet('tarefas', null));
			}

			vm.mouseOver = function (resolve) {
				vm.marcadores[resolve].destaq = true
			}

			vm.mouseOut = function (resolve) {
				vm.marcadores[resolve].destaq = false
			}

			// ------------------------------------------------------
			// Etiquetas
			// ------------------------------------------------------
			vm.marcadoresSelecionados = []
			vm.editarMarcadores = function (resolve) {
				abrirPopup('agenda/tarefa/marcadores-modal.html', resolve)
			}

			vm.setMarcadores = function (resolve) {
				resolve.val ? vm.marcadoresSelecionados.push(resolve.marc) : null

				if (vm.marcadoresSelecionados == null) {
					console.log('Nenhum selecionado');
					vm.marcadoresSelecionados = [resolve.marc]
				} else {
					for (let i = 0; i < vm.marcadoresSelecionados.length; i++) {
						if(resolve.marc == vm.marcadoresSelecionados[i] && !resolve.val) {
							vm.marcadoresSelecionados.splice(i, 1)
						}
					}
				}
			}

			vm.filtraMarcador = function(resolve) {
				if (vm.marcadoresSelecionados.length > 0) {
					for (let i = 0; i < resolve.length; i++) {
						for (let m = 0; m < vm.marcadoresSelecionados.length; m++) {
							if(resolve[i] == vm.marcadoresSelecionados[m]) {
								return true;
								break
							} else {
								return false;
								break
							}
						}
					}
				} else {
					return true
				}
			}

			vm.marcadores = [
				{ id: 1, destaq: false, descricao: 'Revisão'   , color: '#3475C1', bColor: 'red'    },
				{ id: 2, destaq: false, descricao: 'Visita'    , color: '#D64038', bColor: 'yellow' },
				{ id: 3, destaq: false, descricao: 'Compras'   , color: '#EFBC3C', bColor: 'green'  },
				{ id: 4, destaq: false, descricao: 'Particular', color: '#54A668', bColor: 'blue'   },
			]

			// ------------------------------------------------------
			// Vínculos
			// ------------------------------------------------------
			vm.vinculos = [
				{ id: 1, descricao: 'Dívida', color: '#3475C1', bColor: 'tx__red' },
				{ id: 2, descricao: 'Processos', color: '#D64038', bColor: 'tx__yellow' },
				{ id: 3, descricao: 'Protesto', color: '#EFBC3C', bColor: 'tx__green' },
			]

			/* Dragging */
			vm.dragging = false;
			vm.body = document.body;
  
			vm.draggable = {
				//connectWith: ".dropzone",
				distance: 5,
				cursor: 'move',
				axis: 'y',
				snap: true,
				revert: 100,
				forceHelperSize: true,
				placeholder: 'ui-sortable-placeholder',
				opacity: .6,
				forcePlaceholderSize: true,
				start: function (e, ui) {
					ui.placeholder.height(ui.item.height());
					vm.sorting = true;
					// $('.dropzone').hover(hoverStart, hoverEnd)
					vm.$apply(function () {
						vm.dragging = true
						document.body.classList.add("dragging")
					});
					$(".dropzone").sortable('refresh');
				},
				update: function (e, ui) {
					console.log('Update');
					
					document.querySelector('body').classList.remove('dragging')
					/* if (ui.item.sortable.droptarget[0].classList[0] == "dropzone"){
						alert(ui.item.sortable.droptarget[0].id);
						ui.item.sortable.cancel();
						console.log(ui.item[0].cells[0].innerText);
						vm.mudaStatus({solicitacao:ui.item[0].cells[0].innerText})
					}
					else {
						ui.item.sortable.cancel();
					} */
				},
				stop: function (e, ui) {
					vm.sorting = false;
					console.log('Stop');
					document.querySelector('body').classList.remove('dragging')

					if (ui.item.sortable.droptarget == undefined) {
						vm.$apply(vm.dragging = false);
						return;
					} else if (ui.item.sortable.droptarget[0].classList[0] == "dropzone") {
						// run code when item is dropped in the dropzone
						vm.$apply(
							vm.dragging = false,
						);
					} else {
						vm.$apply(
							vm.dragging = false,
						);
					}
				}
			};

			// ------------------------------------------------------
			// Agenda
			// ------------------------------------------------------
			vm.listOnlyComercial = vm.storageSet('listOnlyComercial', '1') == '1' ? true : false;
			
			// Objeto das horas
			vm.setListOnlyComercial = function(resolve) {
				vm.listOnlyComercial = vm.storageSet('listOnlyComercial', null, (resolve ? '1' : '0')) == '1' ? true : false;;
			};

			// Objeto das horas
			vm.hours = AgendaService.listHours();
			
			// Objeto das horas
			vm.comercialHours = AgendaService.listComercialHours();
			
			// Objeto do mês
			vm.month = AgendaService.listMonth();
			
			// Objeto da semana
			vm.week = AgendaService.listWeek();
			
			// Objeto com os dias da semana
			vm.daysWeek = AgendaService.listDays();
			
			// Cards com scroll horizontal
			vm.othersCards = AgendaService.listOthers();
			
			// Objeto com os eventos
			vm.events = AgendaService.listEvents();
			
			// Objeto com os eventos
			vm.agendas = AgendaService.agendas();

			function abrirPopup(templateUrl, resolve) {
				ModalCad.open({
					templateUrl: templateUrl,
					controller: 'AgendaModalCtrl as AgendaModalCtrl',
					scope: $scope,
					resolve: angular.extend(resolve, {
						 persistRemove: false
					})
				});
			}
		}
	]);
	
	//controller da modal
	angular.module('app').controller('AgendaModalCtrl', AgendaModalCtrl);

	AgendaModalCtrl.$inject = ['$scope', 'arrecadacao.common.ModalCad', 'params'];

	function AgendaModalCtrl($scope, ModalCad, params) {

		var vm = $scope;
		vm.tipoPend = params.tipoPend;
		vm.hist = params.hist;
		vm.modo = params.modo;
		vm.tipo = params.tipo;
		vm.isEditing = params.isEditing;

		vm.item = params.item;
		vm.source = params.source;
		vm.tipo = params.tipo;
		vm.isEditing = params.isEditing;

		vm.marcadoresSelecionados = []
		vm.procuradoresSelecionados = []
		vm.vinculosSelecionados = []

		vm.setMarcadores = function (resolve) {
			console.log('Modal');
			console.log('Marcador: ' + resolve.marc + ' = ' + resolve.val);
			resolve.val ? vm.marcadoresSelecionados.push(resolve.marc) : null

			if (vm.marcadoresSelecionados == null) {
				console.log('Nenhum selecionado');
				vm.marcadoresSelecionados = [resolve.marc]
			} else {
				for (let i = 0; i < vm.marcadoresSelecionados.length; i++) {
					if(resolve.marc == vm.marcadoresSelecionados[i] && !resolve.val) {
						vm.marcadoresSelecionados.splice(i, 1)
					}
					
				}
			}
		}

		vm.setProcuradores = function (resolve) {
			resolve.val ? vm.procuradoresSelecionados.push(resolve.proc) : null

			if (vm.procuradoresSelecionados == null) {
				vm.procuradoresSelecionados = [resolve.proc]
			} else {
				for (let i = 0; i < vm.procuradoresSelecionados.length; i++) {
					if(resolve.proc == vm.procuradoresSelecionados[i] && !resolve.val) {
						vm.procuradoresSelecionados.splice(i, 1)
					}
					
				}
			}
		}
		
		vm.setVinculos = function (resolve) {
			console.log(resolve);
			
			resolve.val ? vm.vinculosSelecionados.push(resolve.vinc) : null

			if (vm.vinculosSelecionados == null) {
				vm.vinculosSelecionados = [resolve.vinc]
			} else {
				for (let i = 0; i < vm.vinculosSelecionados.length; i++) {
					if(resolve.vinc == vm.vinculosSelecionados[i] && !resolve.val) {
						vm.vinculosSelecionados.splice(i, 1)
					}

				}
			}
		}
	}
})();