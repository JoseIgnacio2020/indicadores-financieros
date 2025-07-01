'use strict';
angular.module('indicadorApp')
  .filter('formatFecha', function() {
    return function(fechaStr) {
      var d = new Date(fechaStr);
      var dd = ('0' + d.getDate()).slice(-2);
      var mm = ('0' + (d.getMonth() + 1)).slice(-2);
      var yyyy = d.getFullYear();
      return dd + '/' + mm + '/' + yyyy;
    };
  });
