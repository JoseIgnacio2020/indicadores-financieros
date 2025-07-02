'use strict';
angular.module('indicadorApp')
  .filter('formatFecha', function() {
    return function(fechaStr) {
      if (!fechaStr) return '';
      // fechaStr es "YYYY-MM-DD" o "YYYY-MM-DDThh:mm:ss"
      var s = fechaStr.split('T')[0];   // elimina hora si la hubiera
      var parts = s.split('-');         // ["YYYY","MM","DD"]
      return parts[2] + '/' + parts[1] + '/' + parts[0];
    };
  });
