'use strict';

angular.module('indicadorApp')
  .controller('ChartController', ['$scope', '$routeParams', 'ApiService',
    function ($scope, $routeParams, ApiService) {
      var codigo = $routeParams.codigo;
      ApiService.getIndicadores().then(function (list) {
        var meta = list.find(i => i.codigo === codigo);
        $scope.titulo = meta.nombre;
        $scope.unidad = meta.unidad;
        $scope.codigo = codigo;
        var tipo = meta.tipo;

        var hoy = new Date(),
          yyyy = hoy.getFullYear(),
          mm = String(hoy.getMonth() + 1).padStart(2, '0');

        var prom = (tipo === 'periodo')
          ? ApiService.getIndicadorPeriodo(codigo, mm, yyyy)
          : ApiService.getIndicadorAnio(codigo, yyyy);

        prom.then(function (res) {
          var key = Object.keys(res.data)[0];
          $scope.historicos = res.data[key];
          buildChart($scope.historicos, tipo);
        }).catch(function () {
          $scope.error = 'No se pudieron cargar los datos de ' + codigo;
        });
      });

      // en buildChart dentro de app/controllers/detail.controller.js
      function buildChart(data, tipo) {
        var count = (tipo === 'periodo' ? 10 : 12),
          sorted = data.slice().sort((a, b) => new Date(a.Fecha) - new Date(b.Fecha)),
          slice = sorted.slice(-count);

        // etiquetas = día del mes
        var labels = slice.map(d => new Date(d.Fecha).getDate().toString());
        var values = slice.map(d => parseFloat(d.Valor.replace(',', '.')));

        new Chart(document.getElementById('barChart').getContext('2d'), {
          type: 'bar',
          data: { labels, datasets: [{ label: $scope.titulo, data: values }] },
          options: {
            scales: {
              x: { ticks: { maxRotation: 0 } },
              y: { beginAtZero: false }
            },
            plugins: { legend: { display: false } }
          }
        });
      }

    }
  ]);
