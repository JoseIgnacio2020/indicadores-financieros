describe('filter formatValor', function() {
    beforeEach(module('indicadorApp'));
    var filter;
    beforeEach(inject(function($filter) { filter = $filter('formatValor'); }));
  
    it('aplica $ a dolar', function() {
      expect(filter('100,00','dolar')).toBe('$ 100,00');
    });
    it('aplica € a euro', function() {
      expect(filter('100,00','euro')).toBe('€ 100,00');
    });
    it('aplica UF al final en UF', function() {
      expect(filter('100,00','uf')).toBe('100,00 UF');
    });
    it('aplica % a ipc', function() {
      expect(filter('0,5','ipc')).toBe('0,5 %');
    });
    it('aplica $ a utm', function() {
      expect(filter('65000,00','utm')).toBe('$ 65000,00');
    });
  });
  