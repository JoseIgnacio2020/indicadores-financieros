describe('ChartController', function() {
    beforeEach(module('indicadorApp'));
    var $controller, $rootScope, ApiService, scope;
  
    beforeEach(inject(function(_$controller_, _$rootScope_, _ApiService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      ApiService = _ApiService_;
      scope = $rootScope.$new();
      spyOn(ApiService, 'getIndicadores').and.returnValue(Promise.resolve(MockData.indicadores));
      spyOn(ApiService, 'getIndicadorPeriodoRange').and.callThrough();
      $controller('ChartController', { $scope: scope, $routeParams:{codigo:'dolar'}, ApiService: ApiService });
    }));
  
    it('construye historicos y valorActual', function(done) {
      setTimeout(function() {
        expect(scope.valorActual).toBe(MockData.dolar[MockData.dolar.length-1].Valor);
        expect(scope.historicos.length).toBe(30);
        done();
      }, 0);
    });
  });
  