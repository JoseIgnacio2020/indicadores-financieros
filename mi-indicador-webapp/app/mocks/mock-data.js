'use strict';
angular.module('indicadorApp')
  .constant('MockData', {
    indicadores: [
      { codigo: 'dolar', nombre: 'Dólar Observado', unidad: 'Pesos', tipo: 'periodo' },
      { codigo: 'euro',  nombre: 'Euro',            unidad: 'Pesos', tipo: 'periodo' },
      { codigo: 'uf',    nombre: 'Unidad de Fomento',unidad: 'Pesos', tipo: 'periodo' },
      { codigo: 'ipc',   nombre: 'IPC',             unidad: 'Porcentaje', tipo: 'anio' },
      { codigo: 'utm',   nombre: 'UTM',             unidad: 'Pesos', tipo: 'anio' }
    ],

    // últimos 30 registros hábiles aproximados 
    dolar: [
      { Fecha: '2025-07-01', Valor: '933,42' },
      { Fecha: '2025-06-30', Valor: '935,74' },
      { Fecha: '2025-06-27', Valor: '930,67' },
      /* ...hasta 30 objetos en total... */
      { Fecha: '2025-06-02', Valor: '941,97' }
    ],

    euro: [
      { Fecha: '2025-07-01', Valor: '1020,58' },
      { Fecha: '2025-06-30', Valor: '1018,90' },
      /* ... */ 
      { Fecha: '2025-06-02', Valor: '1005,34' }
    ],

    uf: [
      { Fecha: '2025-07-01', Valor: '36800,13' },
      { Fecha: '2025-06-30', Valor: '36750,47' },
      /* ... */
      { Fecha: '2025-06-02', Valor: '36012,89' }
    ],

    ipc: [
      { Fecha: '2025-01-01', Valor: '0,4' },
      { Fecha: '2025-02-01', Valor: '0,3' },
      { Fecha: '2025-03-01', Valor: '0,5' },
      { Fecha: '2025-04-01', Valor: '0,2' },
      { Fecha: '2025-05-01', Valor: '0,6' },
      { Fecha: '2025-06-01', Valor: '0,4' }
    ],

    utm: [
      { Fecha: '2025-01-01', Valor: '65000,00' },
      { Fecha: '2025-02-01', Valor: '65250,50' },
      { Fecha: '2025-03-01', Valor: '65500,75' },
      { Fecha: '2025-04-01', Valor: '65800,20' },
      { Fecha: '2025-05-01', Valor: '66000,10' },
      { Fecha: '2025-06-01', Valor: '66250,60' }
    ]
  });
