'use strict';

angular.module('indicadorApp')
  .controller('InicioController', ['$scope', 'ApiService',
    function($scope, ApiService) {
      ApiService.getIndicadores().then(function(list) {
        $scope.indicadores = list;
      });
    }
  ]);
