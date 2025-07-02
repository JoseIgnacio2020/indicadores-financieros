describe('MockData constant', function() {
    beforeEach(module('indicadorApp'));
    var MockData;
    beforeEach(inject(function(_MockData_) { MockData = _MockData_; }));
  
    it('tiene 5 indicadores', function() {
      expect(MockData.indicadores.length).toBe(5);
    });
  
    it('dólar tiene 30 valores', function() {
      expect(MockData.dolar.length).toBe(30);
    });
  
    it('ipc tiene 12 valores', function() {
      expect(MockData.ipc.length).toBe(12);
    });
  });
  