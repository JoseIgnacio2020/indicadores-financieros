'use strict';

var app = angular.module('indicadorApp', [
  'ngRoute' // Módulo de rutas de AngularJS
]);

// Configurar las rutas
app.config(function($routeProvider) {
  $routeProvider
    .when('/indicadores', {
      templateUrl: 'app/views/list.html',
      controller: 'ListController'
    })
    .when('/indicador/:codigo', {
      templateUrl: 'app/views/detail.html',
      controller: 'DetailController'
    })
    .otherwise({
      redirectTo: '/indicadores'
    });
});