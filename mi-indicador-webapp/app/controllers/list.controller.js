'use strict';

angular.module('indicadorApp')
  .controller('ListValuesController', ['$scope', '$routeParams', 'ApiService',
    function($scope, $routeParams, ApiService) {
      var codigo = $routeParams.codigo;
      $scope.codigo = codigo;
      var hoy = new Date();

      ApiService.getIndicadores().then(function(list) {
        var meta = list.find(i => i.codigo === codigo);
        $scope.titulo = meta.nombre;
        $scope.unidad = meta.unidad;
        var tipo = meta.tipo;
        var anoF = hoy.getFullYear();
        var mesF = ('0' + (hoy.getMonth() + 1)).slice(-2);
        var fechaIni = new Date(hoy);
        fechaIni.setMonth(fechaIni.getMonth() - 1);
        var anoI = fechaIni.getFullYear();
        var mesI = ('0' + (fechaIni.getMonth() + 1)).slice(-2);

        var prom = (tipo === 'periodo')
          ? ApiService.getIndicadorPeriodoRange(codigo, anoI, mesI, anoF, mesF)
          : ApiService.getIndicadorAnio(codigo, hoy.getFullYear());

        prom.then(function(res) {
          var key = Object.keys(res.data)[0];
          var arr = res.data[key];

          if (tipo === 'periodo') {
            $scope.historicos = arr
              .sort((a,b) => new Date(b.Fecha) - new Date(a.Fecha))
              .slice(0,30);
          } else {
            $scope.historicos = arr
              .filter(item => new Date(item.Fecha).getFullYear() === hoy.getFullYear())
              .sort((a,b) => new Date(b.Fecha) - new Date(a.Fecha));
          }
        })
        .catch(function() {
          $scope.error = 'No se pudieron cargar los datos de ' + codigo;
        });
      });
    }
  ]);
