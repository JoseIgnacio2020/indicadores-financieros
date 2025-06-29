app.factory('ApiService', function($http) {
    var apiKey = '';
    var apiUrl = 'https://api.cmfchile.cl/api/v1';

    return {
        getIndicadores: function() {
            return $http.get(apiUrl + '/indicadores?apikey=' + apiKey + '&formato=json');
        },
        getIndicadorHistorico: function(codigo) {
            // Lógica para obtener los datos históricos según el 'codigo'
            var anioActual = new Date().getFullYear();
            return $http.get(apiUrl + '/indicadores/' + codigo + '/periodo/' + (anioActual - 1) + '/' + anioActual + '?apikey=' + apiKey + '&formato=json');
        }
    };
});