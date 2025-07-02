'use strict';

angular.module('indicadorApp')
  .controller('ListValuesController', ['$scope', '$routeParams', 'ApiService',
    function($scope, $routeParams, ApiService) {
      var codigo = $routeParams.codigo;
      $scope.codigo = codigo;
      var hoy = new Date();
      // fecha hoy en cadena YYYY-MM-DD
      var hoyStr = hoy.toISOString().split('T')[0];

      // rango calendario de 30 días atrás
      var fechaIni = new Date(hoy);
      fechaIni.setDate(hoy.getDate() - 30);
      var anoI = fechaIni.getFullYear(),
          mesI = String(fechaIni.getMonth()+1).padStart(2,'0'),
          anoF = hoy.getFullYear(),
          mesF = String(hoy.getMonth()+1).padStart(2,'0');

      ApiService.getIndicadores().then(function(list) {
        var meta = list.find(i => i.codigo === codigo);
        $scope.titulo = meta.nombre;
        $scope.unidad = meta.unidad;
        var tipo = meta.tipo;

        // petición adecuada
        var peticion = (tipo === 'periodo')
          ? ApiService.getIndicadorPeriodoRange(codigo, anoI, mesI, anoF, mesF)
          : ApiService.getIndicadorAnio(codigo, anoF);

        peticion.then(function(res) {
          var key = Object.keys(res.data)[0];
          var arr = res.data[key];

          if (tipo === 'periodo') {
            // ordenar descendente y descartar fechas > hoy, luego slice(0,30)
            $scope.historicos = arr
              .filter(function(item) {
                return item.Fecha <= hoyStr;
              })
              .sort(function(a,b) {
                return a.Fecha < b.Fecha ? 1 : -1;
              })
              .slice(0,30);
          } else {
            // anual: filtrar por año en cadena y ordenar
            var year = String(hoy.getFullYear());
            $scope.historicos = arr
              .filter(function(item) {
                return item.Fecha.slice(0,4) === year;
              })
              .sort(function(a,b) {
                return a.Fecha < b.Fecha ? 1 : -1;
              });
          }
        })
        .catch(function() {
          $scope.error = 'No se pudieron cargar los datos de ' + codigo;
        });
      });
    }
  ]);
