'use strict';

angular.module('indicadorApp')
  .factory('ApiService', ['$http', '$q', 'MockData', function($http, $q, MockData) {
    var apiKey = 'e407e2e2ff335b9eff9561757c909a215902ccb0';
    var base   = 'https://api.cmfchile.cl/api-sbifv3/recursos_api';
    var useMock = true; // En producción es false

    return {
      getIndicadores: function() {
        return useMock
          ? $q.resolve(MockData.indicadores)
          : $http.get(base + '/indicadores?apikey=' + apiKey + '&formato=json')
              .then(res => Object.values(res.data).map(i => ({
                codigo: i.Codigo.toLowerCase(),
                nombre: i.Nombre,
                unidad: i.UnidadMedida,
                tipo: ['dolar','euro','uf'].includes(i.Codigo.toLowerCase()) ? 'periodo' : 'anio'
              })));
      },

      getIndicadorPeriodoRange: function(codigo, anoI, mesI, anoF, mesF) {
        if (useMock) {
          return $q.resolve({ data: { [codigo.charAt(0).toUpperCase() + codigo.slice(1) + 's']: MockData[codigo] } });
        }
        return $http.get(
          base + '/' + codigo + '/periodo/' + anoI + '/' + mesI + '/' + anoF + '/' + mesF +
          '?apikey=' + apiKey + '&formato=json'
        );
      },

      getIndicadorAnio: function(codigo, anio) {
        if (useMock) {
          var key = (codigo === 'ipc' ? 'IPCs' : 'UTMs');
          return $q.resolve({ data: { [key]: MockData[codigo] } });
        }
        return $http.get(
          base + '/' + codigo + '/' + anio +
          '?apikey=' + apiKey + '&formato=json'
        );
      }
    };
  }]);
