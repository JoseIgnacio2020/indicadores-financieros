// app/controllers/list.controller.js
'use strict';

angular.module('indicadorApp')
  .controller('ListValuesController', ['$scope', '$routeParams', 'ApiService',
    function($scope, $routeParams, ApiService) {
      var codigo = $routeParams.codigo;
      $scope.codigo = codigo;
      ApiService.getIndicadores().then(function(list) {
        var meta = list.find(i => i.codigo === codigo);
        $scope.titulo = meta.nombre;
        $scope.unidad = meta.unidad;
        var tipo = meta.tipo;

        var hoy = new Date(),
            yyyy = hoy.getFullYear(),
            mm   = String(hoy.getMonth()+1).padStart(2,'0');

        var prom = (tipo === 'periodo')
          ? ApiService.getIndicadorPeriodo(codigo, mm, yyyy)
          : ApiService.getIndicadorAnio(codigo, yyyy);

        prom.then(function(res) {
          var key = Object.keys(res.data)[0];
          $scope.historicos = res.data[key];
        }).catch(function() {
          $scope.error = 'No se pudieron cargar los datos de ' + codigo;
        });
      });
    }
  ]);
