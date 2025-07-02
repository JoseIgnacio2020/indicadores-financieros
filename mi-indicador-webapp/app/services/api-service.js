'use strict';

angular.module('indicadorApp')
  .factory('ApiService', ['$http', '$q', 'MockData', function ($http, $q, MockData) {
    var apiKey = 'e407e2e2ff335b9eff9561757c909a215902ccb0';
    var base = 'https://api.cmfchile.cl/api-sbifv3/recursos_api';
    var useMock = false; // mock = false para históricos

    // Lista estática de indicadores
    var indicadoresMeta = MockData.indicadores;

    return {
      getIndicadores: function () {
        return $q.resolve(indicadoresMeta);
      },
      getIndicadorPeriodoRange: function (codigo, anoI, mesI, anoF, mesF) {
        if (useMock) {
          return $q.resolve({ data: { [codigo.charAt(0).toUpperCase() + codigo.slice(1) + 's']: MockData[codigo] } });
        }
        return $http.get(
          base + '/' + codigo + '/periodo/' + anoI + '/' + mesI + '/' + anoF + '/' + mesF +
          '?apikey=' + apiKey + '&formato=json'
        );
      },
      /**
     * Obtiene los datos desde fechaDesde (YYYY-MM-DD) hasta fechaHasta (YYYY-MM-DD)
     * para gráficos de periodo diario.
     */
      getIndicadorDias: function (codigo, fechaDesde, fechaHasta) {
        return $http.get(
          base + '/' + codigo +
          '/periodo/' + fechaDesde + '/' + fechaHasta +
          '?apikey=' + apiKey + '&formato=json'
        );
      },
      getIndicadorAnio: function (codigo, anio) {
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
