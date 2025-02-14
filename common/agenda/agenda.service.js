var app = angular.module('app');

app.service('AgendaService', function(){
	
	// Objeto das horas
	var hours = [
		'00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'
	];
	
	var comercialHours = [
		'07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17'
	];
	
	// Objeto do mês
	var profissional_month = {
		weeks: [
			{
				days: [
					{
						pos: 'dom',
						desc: '',
						weekend: true,
						events: []
					},
					{
						pos: 'seg',
						desc: '',
						events: []
					},
					{
						pos: 'ter',
						desc: '',
						events: []
					},
					{
						pos: 'qua',
						desc: '',
						events: []
					},
					{
						pos: 'qui',
						desc: '',
						events: []
					},
					{
						pos: 'sex',
						desc: '',
						events: []
					},
					{
						pos: 'sáb',
						weekend: true,
						desc: '01',
						events: [
							{
								desc: 'Dia do trabalhador',
								class: ['tx__gray--d30', 'bg__gray'],
								range: 1
							}
						]
					}
				]
			},
			{
				days: [
					{
						pos: 'dom',
						weekend: true,
						desc: '02',
						events: []
					},
					{
						pos: 'seg',
						desc: '03',
						events: [
							{
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__gray--d30', 'bg__aqua'],
								range: 1
							},{
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__gray--d30', 'bg__aqua'],
								range: 1
							}
						]
					},
					{
						pos: 'ter',
						desc: '04',
						events: [
							{
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__gray--d30', 'bg__purple'],
								range: 1
							},{
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__white', 'bg__pink'],
								range: 1
							}
						]
					},
					{
						pos: 'qua',
						desc: '05',
						events: [
							{
								icon: 'fa fa-plane',
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__gray--d30', 'bg__yellow'],
								range: 2
							},{
								icon: 'fa fa-plane',
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__gray--d30', 'bg__green'],
								range: 1
							}
						]
					},
					{
						pos: 'qui',
						active: true,
						desc: '06',
						events: [
							{
								icon: 'fa fa-plane',
								desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
								class: ['tx__gray--d30', 'bg__yellow'],
								range: 1,
								offset: 1
							}
						]
					},
					{
						pos: 'sex',
						desc: '07',
						events: []
					},
					{
						pos: 'sáb',
						weekend: true,
						desc: '08',
						events: [
							{
								desc: 'Dia do trabalhador',
								class: ['tx__gray--d30', 'bg__gray'],
								range: 1
							}
						]
					}
				]
			},
			{
				days: [
					{
						pos: 'dom',
						weekend: true,
						desc: '09',
						events: []
					},
					{
						pos: 'seg',
						desc: '10',
						events: []
					},
					{
						pos: 'ter',
						desc: '11',
						events: []
					},
					{
						pos: 'qua',
						desc: '12',
						events: []
					},
					{
						pos: 'qui',
						desc: '13',
						events: []
					},
					{
						pos: 'sex',
						desc: '14',
						events: []
					},
					{
						pos: 'sáb',
						weekend: true,
						desc: '15',
						events: []
					}
				]
			},
			{
				days: [
					{
						pos: 'dom',
						weekend: true,
						desc: '16',
						events: []
					},
					{
						pos: 'seg',
						desc: '17',
						events: []
					},
					{
						pos: 'ter',
						desc: '18',
						events: []
					},
					{
						pos: 'qua',
						desc: '19',
						events: []
					},
					{
						pos: 'qui',
						desc: '20',
						events: []
					},
					{
						pos: 'sex',
						desc: '21',
						events: []
					},
					{
						pos: 'sáb',
						weekend: true,
						desc: '22',
						events: []
					}
				]
			},
			{
				days: [
					{
						pos: 'dom',
						weekend: true,
						desc: '23',
						events: []
					},
					{
						pos: 'seg',
						desc: '24',
						events: []
					},
					{
						pos: 'ter',
						desc: '25',
						events: []
					},
					{
						pos: 'qua',
						desc: '26',
						events: []
					},
					{
						pos: 'qui',
						desc: '27',
						events: []
					},
					{
						pos: 'sex',
						desc: '28',
						events: []
					},
					{
						pos: 'sáb',
						weekend: true,
						desc: '29',
						events: []
					}
				]
			},
			{
				days: [
					{
						pos: 'dom',
						weekend: true,
						desc: '30',
						events: []
					},
					{
						pos: 'seg',
						desc: '31',
						events: []
					},
					{
						pos: 'ter',
						desc: '',
						events: []
					},
					{
						pos: 'qua',
						desc: '',
						events: []
					},
					{
						pos: 'qui',
						desc: '',
						events: []
					},
					{
						pos: 'sex',
						desc: '',
						events: []
					},
					{
						pos: 'sáb',
						weekend: true,
						desc: '',
						events: []
					}
				]
			}
		]
	}
	// Objeto da semana
	var profissional_week = {
		days: [
			{
				past: true,
				pos: 'dom',
				desc: '02',
				events: {
					
				}
			},
			{
				past: true,
				pos: 'seg',
				desc: '03',
				events: {
					'10': [
						{
							icon: 'fa fa-calendar',
							minute: '60',
							desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
							class: ['tx__gray--d30', 'bg__blue--l30'],
							range: 1,
							end: {
								hour: 13,
								minute: 30
							}
						}
					],
					'12': [
						{
							icon: 'fa fa-',
							minute: '30',
							desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
							class: ['tx__gray--d30', 'bg__blue--l30'],
							range: 1,
							end: {
								hour: 14,
								minute: 30
							}
						}
					]
				}
			},
			{
				active: true,
				pos: 'ter',
				desc: '04',
				events: {
					'09': [
						{
							icon: 'fa fa-file-text-o',
							minute: '00',
							desc: 'Reunião com secretaria de segurança',
							class: ['tx__gray--d30', 'bg__blue--l10'],
							range: 1,
							end: {
								hour: 12,
								minute: 00
							},
							vinculos: [
								{procuradores: [8, 7]},
								{dividas:["123456","234567"]},
								{processos:["678901"]},
								{protestos:["789012"]},
								{marcadores:[1,2]}
							]
						}
					]
				}
			},
			{
				pos: 'qua',
				desc: '05',
				events: {
					'13': [
						{
							icon: 'fa fa-plane',
							minute: '00',
							desc: 'Clinico',
							class: ['tx__gray--d30', 'bg__blue--l10'],
							range: 1,
							end: {
								hour: 14,
								minute: 00
							}
						}
					],
					'14': [
						{
							icon: 'fa fa-plane',
							minute: '00',
							desc: 'Cardiologia',
							class: ['tx__gray--d30', 'bg__blue--l10'],
							range: 1,
							end: {
								hour: 17,
								minute: 00
							}
						}
					]
				}
			},
			{
				pos: 'qui',
				desc: '06',
				events: {}
			},
			{
				pos: 'sex',
				desc: '07',
				events: {}
			},
			{
				pos: 'sáb',
				desc: '08',
				events: {}
			}
		]
	}
	// Objeto com os dias da semana
	var profissional_daysWeek = {
		'dom': {
			past: true
		},
		'seg': {
			past: true
		},
		'ter': {
			id: 2,
			active: true,
			events: [{
				icon: 'fa fa-file-text-o',
				minute: '30',
				desc: '200 intimações a receber',
				class: ['tx__white', 'bg__red'],
				range: 2
			}]
		},
		'qua': {},
		'qui': {},
		'sex': {},
		'sab': {}
	}
	// Cards com scroll horizontal
	var profissional_othersCards = [
		{
			icon: 'fa fa-plane',
			minute: '30',
			desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
			class: ['tx__gray--d30', 'bg__orange'],
			range: 1,
			end: {
				hour: 5,
				minute: 45
			}
		},{
			icon: 'fa fa-plane',
			minute: '31',
			desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
			class: ['tx__gray--l30', 'bg__pink'],
			range: 1,
			end: {
				hour: 5,
				minute: 30
			}
		},{
			icon: 'fa fa-plane',
			minute: '32',
			desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
			class: ['tx__gray--d30', 'bg__aqua'],
			range: 1,
			end: {
				hour: 5,
				minute: 15
			}
		},{
			icon: 'fa fa-plane',
			minute: '33',
			desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
			class: ['tx__gray--d30', 'bg__yellow'],
			range: 1,
			end: {
				hour: 5,
				minute: 5
			}
		},{
			icon: 'fa fa-plane',
			minute: '34',
			desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
			class: ['tx__gray--d30', 'bg__purple'],
			range: 1,
			end: {
				hour: 5,
				minute: 30
			}
		},{
			icon: 'fa fa-plane',
			minute: '35',
			desc: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos',
			class: ['tx__gray--l30', 'bg__red--l20'],
			range: 1,
			end: {
				hour: 5,
				minute: 30
			}
		}
	];

	var agendas = [
		{
			agenda: '',
			eletivo: 0,
			urgencias: 0,
			cor: '#E2D0E8',
			horarios: [
				{ horario: '08:00', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: false  },
				{ horario: '08:15', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: false  },
				{ horario: '08:30', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: false  },
				{ horario: '08:45', vaga: 'Descrição do agendametno', cliente: null, reserva: false, ausente: false  },
				{ horario: '09:00', vaga: 'Descrição do agendametno', cliente: null, reserva: false, ausente: true  },
				{ horario: '09:15', vaga: 'Descrição do agendametno', cliente: null, reserva: false, ausente: false  },
			]
		},
		{
			agenda: '',
			eletivo: 0,
			urgencias: 0,
			cor: '#B8DBC1',
			horarios: [
				{ horario: '08:00', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: false  },
				{ horario: '08:15', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: false  },
				{ horario: '08:30', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: false  },
				{ horario: '08:45', vaga: 'Descrição do agendametno', cliente: `Teste`, reserva: false, ausente: true  },
			]
		}
	];
	
	var listEvents = [
		{ day: new Date(), events: [
			{ hora: '09:00 ás 10:00', title: '200 Intimações a receber'          , numProcesso: '0900264-79.2018.8.24.0078', obs: 'Observações do sistema', class: 'bth-status--info'  , ref: 'Processo'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--danger', ref: 'Processo', vinculos: [{procuradores: [8, 7]}, {dividas:["123456","234567"]},{processos:["678901"]},{protestos:["789012"]}], marcadores:[1,2]},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info'  , ref: 'Protesto'},
		]},
		{ day: new Date(), events: [
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info', ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--primary', ref: 'Administrativo'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info', ref: 'Protesto'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--warning', ref: 'Administrativo'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info', ref: 'Processo'},
		]},
		{ day: new Date(), events: [
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info', ref: 'Processo'},
			{ hora: '09:00 ás 10:00', title: 'Título do compromisso', obs: 'Descrição do compromisso', class: 'bth-status--info', ref: 'Protesto'},
		]},
	]

	this.listHours = function () {
		return hours;
	}
	this.listComercialHours = function () {
		return comercialHours;
	}
	this.listMonth = function () {
		return profissional_month;
	}
	this.listWeek = function () {
		return profissional_week;
	}
	this.listDays = function () {
		return profissional_daysWeek;
	}
	this.listOthers = function () {
		return profissional_othersCards;
	}
	this.listEvents = function () {
		return listEvents;
	}
	
	this.listEvents = function () {
		return listEvents;
	}

	this.agendas = function () {
		return agendas;
	}
	// this.listOnlyComercial = function () {
	// 	return true;
	// }
	
});