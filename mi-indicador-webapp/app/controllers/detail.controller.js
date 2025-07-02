'use strict';

angular.module('indicadorApp')
  .controller('ChartController', [
    '$scope', '$routeParams', 'ApiService', 'formatFechaFilter',
    function($scope, $routeParams, ApiService, formatFechaFilter) {
      var codigo = $routeParams.codigo;
      $scope.codigo = codigo;

      // 1) Calcula hoy en formato local YYYY-MM-DD
      var hoy = new Date();
      var dd = ('0' + hoy.getDate()).slice(-2);
      var mm = ('0' + (hoy.getMonth() + 1)).slice(-2);
      var yyyy = hoy.getFullYear();
      var hoyStr = yyyy + '-' + mm + '-' + dd;

      ApiService.getIndicadores().then(function(list) {
        var meta = list.find(i => i.codigo === codigo);
        $scope.titulo = meta.nombre;
        $scope.unidad = meta.unidad;
        var tipo = meta.tipo;

        if (tipo === 'periodo') {
          // 2) Define rango de 10 días atrás
          var fechaIniDate = new Date(hoy);
          fechaIniDate.setDate(hoy.getDate() - 10);
          var di = ('0' + fechaIniDate.getDate()).slice(-2);
          var mi = ('0' + (fechaIniDate.getMonth() + 1)).slice(-2);
          var yi = fechaIniDate.getFullYear();
          var fechaIniStr = yi + '-' + mi + '-' + di;

          // 3) Llama al endpoint de período mes-año
          var yyyyF = yyyy, mmF = mm,
              yyyyI = yi, mmI = mi;

          ApiService.getIndicadorPeriodoRange(codigo, yyyyI, mmI, yyyyF, mmF)
            .then(function(res) {
              var key = Object.keys(res.data)[0];
              var arr = res.data[key];

              // 4) Filtra entre fechaIniStr y hoyStr (ambos inclusive)
              var filtered = arr.filter(function(item) {
                var dateOnly = item.Fecha.split('T')[0];
                return dateOnly >= fechaIniStr && dateOnly <= hoyStr;
              });

              // 5) Ordena descendente por cadena YYYY-MM-DD
              var sortedDesc = filtered.sort(function(a, b) {
                return a.Fecha < b.Fecha ? 1 : -1;
              });

              // 6) Toma los primeros 10 registros (más recientes)
              var sliceDesc = sortedDesc.slice(0, 10);

              // 7) Asigna valor y fecha actual
              var current = sliceDesc[0];
              $scope.valorActual = formatValor(current.Valor, codigo);
              $scope.fechaActual = formatFechaFilter(current.Fecha);

              // 8) Prepara datos para gráfico en orden ascendente
              var sliceAsc = sliceDesc.slice().reverse();
              var labels = sliceAsc.map(d => formatFechaFilter(d.Fecha));
              var values = sliceAsc.map(d => 
                parseFloat(d.Valor.replace(/\./g, '').replace(',', '.'))
              );

              // 9) Dibuja gráfico de línea
              var ctx = document.getElementById('barChart').getContext('2d');
              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [{
                    label: $scope.titulo,
                    data: values,
                    fill: false,
                    tension: 0.1
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { ticks: { maxRotation: 0 } },
                    y: { beginAtZero: false }
                  },
                  plugins: { legend: { display: false } }
                }
              });
            })
            .catch(function() {
              $scope.error = 'No se pudieron cargar los datos del gráfico.';
            });

        } else {
          // 10) IPC/UTM anual
          ApiService.getIndicadorAnio(codigo, String(yyyy))
            .then(function(res) {
              var key = Object.keys(res.data)[0];
              var arr = res.data[key]
                .filter(item => item.Fecha.slice(0,4) === String(yyyy))
                .sort((a,b) => a.Fecha < b.Fecha ? 1 : -1);

              var sliceDesc = arr.slice(0, 12);
              var current = sliceDesc[0];
              $scope.valorActual = formatValor(current.Valor, codigo);
              $scope.fechaActual = formatFechaFilter(current.Fecha);

              var sliceAsc = sliceDesc.slice().reverse();
              var labels = sliceAsc.map(d => formatFechaFilter(d.Fecha));
              var values = sliceAsc.map(d =>
                parseFloat(d.Valor.replace(/\./g, '').replace(',', '.'))
              );

              var ctx = document.getElementById('barChart').getContext('2d');
              new Chart(ctx, {
                type: 'line',
                data: {
                  labels: labels,
                  datasets: [{
                    label: $scope.titulo,
                    data: values,
                    fill: false,
                    tension: 0.1
                  }]
                },
                options: {
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    x: { ticks: { maxRotation: 0 } },
                    y: { beginAtZero: false }
                  },
                  plugins: { legend: { display: false } }
                }
              });
            })
            .catch(function() {
              $scope.error = 'No se pudieron cargar los datos del gráfico.';
            });
        }
      });

      // Helper para formatear valor con símbolo
      function formatValor(v, codigo) {
        switch(codigo) {
          case 'dolar': return '$ ' + v;
          case 'euro':  return '€ ' + v;
          case 'uf':    return v + ' UF';
          case 'ipc':   return v + ' %';
          case 'utm':   return '$ ' + v;
          default:      return v;
        }
      }
    }
  ]);
