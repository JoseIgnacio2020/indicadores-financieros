app.controller('ListController', function($scope, ApiService) {
    $scope.indicadores = [];
    ApiService.getIndicadores().then(function(response) {
        // La API agrupa los indicadores en un objeto, hay que convertirlo a array
        var data = response.data;
        for (var key in data) {
            if (data.hasOwnProperty(key) && typeof data[key] === 'object') {
                $scope.indicadores.push(data[key]);
            }
        }
    });
});