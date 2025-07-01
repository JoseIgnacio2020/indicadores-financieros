'use strict';

angular.module('indicadorApp')
  .factory('ApiService', ['$http', '$q', function($http, $q) {
    var apiKey = 'e407e2e2ff335b9eff9561757c909a215902ccb0';
    var base   = 'https://api.cmfchile.cl/api-sbifv3/recursos_api';

    var indicadoresMeta = [
      { codigo: 'dolar', nombre: 'Dólar Observado', unidad: 'Pesos', tipo: 'periodo' },
      { codigo: 'euro',  nombre: 'Euro',            unidad: 'Pesos', tipo: 'periodo' },
      { codigo: 'uf',    nombre: 'Unidad de Fomento', unidad: 'Pesos', tipo: 'periodo' },
      { codigo: 'ipc',   nombre: 'IPC',             unidad: 'Porcentaje', tipo: 'anio' },
      { codigo: 'utm',   nombre: 'UTM',             unidad: 'Pesos', tipo: 'anio' }
    ];

    return {
      getIndicadores: function() {
        return $q.resolve(indicadoresMeta);
      },
      getIndicadorPeriodo: function(codigo, mes, anio) {
        return $http.get(
          `${base}/${codigo}/${anio}/${mes}?apikey=${apiKey}&formato=json`
        );
      },
      getIndicadorAnio: function(codigo, anio) {
        return $http.get(
          `${base}/${codigo}/${anio}?apikey=${apiKey}&formato=json`
        );
      }
    };
  }]);
