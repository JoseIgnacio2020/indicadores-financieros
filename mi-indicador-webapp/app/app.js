angular.module('indicadorApp', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/views/inicio.html',
        controller: 'InicioController'
      })
      .when('/valores/:codigo', {
        templateUrl: 'app/views/list.html',
        controller: 'ListValuesController'
      })
      .when('/detalle/:codigo', {
        templateUrl: 'app/views/detail.html',
        controller: 'ChartController'
      })
      .otherwise({ redirectTo: '/' });
  }]);
