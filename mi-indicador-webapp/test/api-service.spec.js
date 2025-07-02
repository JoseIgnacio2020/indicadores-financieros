describe('ApiService with MockData', function() {
    beforeEach(module('indicadorApp'));
    var ApiService, MockData, $rootScope;
    beforeEach(inject(function(_ApiService_, _MockData_, _$rootScope_) {
      ApiService = _ApiService_;
      MockData = _MockData_;
      $rootScope = _$rootScope_;
    }));
  
    it('getIndicadores devuelve lista mock', function(done) {
      ApiService.getIndicadores().then(list => {
        expect(list).toEqual(MockData.indicadores);
        done();
      });
      $rootScope.$apply();
    });
  
    it('getIndicadorPeriodoRange devuelve datos mock', function(done) {
      ApiService.getIndicadorPeriodoRange('dolar','06','06','2025','07')
        .then(res => {
          expect(res.data.Dolares).toEqual(MockData.dolar);
          done();
        });
      $rootScope.$apply();
    });
  
    it('getIndicadorAnio devuelve datos mock para IPC', function(done) {
      ApiService.getIndicadorAnio('ipc','2025')
        .then(res => {
          expect(res.data.IPCs).toEqual(MockData.ipc);
          done();
        });
      $rootScope.$apply();
    });
  });
  