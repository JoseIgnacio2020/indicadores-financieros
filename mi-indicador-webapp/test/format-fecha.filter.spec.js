describe('filter formatFecha', function() {
    beforeEach(module('indicadorApp'));
    var filter;
    beforeEach(inject(function($filter) { filter = $filter('formatFecha'); }));
  
    it('convierte ISO a dd/mm/yyyy', function() {
      expect(filter('2025-07-01')).toBe('01/07/2025');
    });
  });
  