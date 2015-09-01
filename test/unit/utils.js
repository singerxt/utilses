import utils from '../../src/utils';
import _localStorage from '../../src/components/localstorage/LS.js';

describe('utils', () => {
  describe('Greet function', () => {
    beforeEach(() => {
      spy(utils, 'greet');
      utils.greet();
    });

    it('should have been run once', () => {
      expect(utils.greet).to.have.been.calledOnce;
    });

    it('should have always returned hello', () => {
      expect(utils.greet).to.have.always.returned('hello');
    });
  });
});
