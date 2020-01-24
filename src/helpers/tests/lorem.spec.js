let helper;
let result;
const sinon = require('sinon');
const handlebars = require('handlebars');

const LoremHelper = require('../lorem.js');

describe('lorem helper', () => {
  beforeEach(() => {
    helper = new LoremHelper();
  });

  describe('register', () => {
    it('handlebars registerHelper called once', () => {
      sinon.spy(handlebars, 'registerHelper');
      helper.register();
      expect(handlebars.registerHelper.callCount).toStrictEqual(1);
      handlebars.registerHelper.restore();
    });
  });

  describe('generate lorem ipsum', () => {
    it('should return a string', () => {
      const opts = { name: '$lorem' };
      result = helper.render(opts).toString();
      expect(typeof result).toBe('string');
    });
  });
});
