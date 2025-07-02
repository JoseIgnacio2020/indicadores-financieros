describe('ListValuesController', function() {
    beforeEach(module('indicadorApp'));
    var $controller, $rootScope, ApiService, scope;
  
    beforeEach(inject(function(_$controller_, _$rootScope_, _ApiService_) {
      $controller = _$controller_;
      $rootScope = _$rootScope_;
      ApiService = _ApiService_;
      scope = $rootScope.$new();
      spyOn(ApiService, 'getIndicadores').and.returnValue(Promise.resolve(MockData.indicadores));
      spyOn(ApiService, 'getIndicadorPeriodoRange').and.callThrough();
      $controller('ListValuesController', { $scope: scope, $routeParams: {codigo:'dolar'}, ApiService: ApiService });
    }));
  
    it('inicializa historicos en mock de 30', function(done) {
      // espera a promesas
      setTimeout(function() {
        expect(scope.historicos.length).toBe(30);
        expect(scope.historicos[0].Fecha).toBe('2025-07-01');
        done();
      }, 0);
    });
  });
  