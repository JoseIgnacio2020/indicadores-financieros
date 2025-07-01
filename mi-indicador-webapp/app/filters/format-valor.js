'use strict';
angular.module('indicadorApp')
  .filter('formatValor', function() {
    return function(valor, codigo) {
      var v = valor;
      switch(codigo) {
        case 'dolar': return '$ ' + v;
        case 'euro':  return '€ ' + v;
        case 'uf':    return v + ' UF';
        case 'ipc':   return v + ' %';
        case 'utm':   return '$ ' + v;
        default:      return v;
      }      
    };
  });
