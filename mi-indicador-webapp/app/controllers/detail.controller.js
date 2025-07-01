'use strict';

angular.module('indicadorApp')
  .controller('ChartController', ['$scope', '$routeParams', 'ApiService',
    function($scope, $routeParams, ApiService) {
      var codigo = $routeParams.codigo;
      $scope.codigo = codigo;

      ApiService.getIndicadores().then(function(list) {
        var meta = list.find(i => i.codigo === codigo);
        $scope.titulo = meta.nombre;
        $scope.unidad = meta.unidad;
        var tipo      = meta.tipo;

        var hoy      = new Date(),
            fechaFin = hoy,
            fechaIni = new Date(hoy);

        // definimos rango según tipo
        if (tipo === 'periodo') {
          // últimos 10 días
          fechaIni.setDate(hoy.getDate() - 10);
          var anoI = fechaIni.getFullYear(),
              mesI = ('0' + (fechaIni.getMonth()+1)).slice(-2),
              anoF = fechaFin.getFullYear(),
              mesF = ('0' + (fechaFin.getMonth()+1)).slice(-2);

          ApiService.getIndicadorPeriodoRange(codigo, anoI, mesI, anoF, mesF)
            .then(res => procesarGrafico(res.data[Object.keys(res.data)[0]], fechaIni, tipo))
            .catch(err => $scope.error = 'No se pudieron cargar los datos');
        } else {
          // últimos 12 meses → usamos todo el año y luego tomamos 12
          var anio = hoy.getFullYear();
          ApiService.getIndicadorAnio(codigo, anio)
            .then(res => procesarGrafico(res.data[Object.keys(res.data)[0]], null, tipo))
            .catch(err => $scope.error = 'No se pudieron cargar los datos');
        }
      });

      function procesarGrafico(arr, fechaIni, tipo) {
        if (tipo === 'periodo') {
          arr = arr.filter(item => {
            var f = new Date(item.Fecha);
            return f >= fechaIni && f <= new Date();
          });
        } else {
          arr = arr.filter(item => new Date(item.Fecha).getFullYear() === (new Date()).getFullYear());
        }
      
        var sortedDesc = arr.sort((a,b) => new Date(b.Fecha) - new Date(a.Fecha));
        var count = (tipo==='periodo' ? 10 : 12);
        var slice = sortedDesc.slice(0, count).reverse();
      
        var labels = slice.map(d => {
          var f = new Date(d.Fecha);
          return ('0'+f.getDate()).slice(-2) + '/' + ('0'+(f.getMonth()+1)).slice(-2) + '/' + f.getFullYear();
        });
      
        var values = slice.map(d => parseFloat(d.Valor.replace(',','.')));
        $scope.historicos = sortedDesc;
        $scope.valorActual = slice[slice.length-1].Valor;
      
        var ctx = document.getElementById('barChart').getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: { labels, datasets:[{ label: $scope.titulo, data: values }] },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: { ticks:{ maxRotation:0 } },
              y: { beginAtZero:false }
            },
            plugins: { legend:{ display:false } }
          }
        });
      }      
    }
  ]);
