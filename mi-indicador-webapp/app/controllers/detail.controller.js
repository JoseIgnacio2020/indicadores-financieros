app.controller('DetailController', function($scope, $routeParams, ApiService) {
    var codigo = $routeParams.codigo;
    $scope.codigoIndicador = codigo;

    ApiService.getIndicadorHistorico(codigo).then(function(response) {
        $scope.historicos = response.data.Valor; 
        
    });
});