let helper;
let result;
let now;
const defaults = {
  data: {},
  name: '$timestamp',
};
// requires
const sinon = require('sinon');
const handlebars = require('handlebars');
const mustacher = require('../../mustacher.js');
const Timestamp = require('../timestamp.js');

describe('timestamp', () => {
  beforeEach(() => {
    helper = new Timestamp();
  });

  describe('register', () => {
    it('call handlebars registerHelper once', () => {
      sinon.spy(handlebars, 'registerHelper');
      helper.register();
      expect(handlebars.registerHelper.callCount).toStrictEqual(1);
      handlebars.registerHelper.restore();
    });
  });

  describe('render', () => {
    it('throw no arguments', () => {
      expect(() => {
        helper.render();
      }).toThrow('missing arguments');
    });

    it('not throw no arguments', () => {
      expect(() => {
        helper.render(defaults);
      }).not.toThrow('missing arguments');
    });

    it('call mustacher hasOptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      helper.render(defaults);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });

    it('call handlebars createFrame once', () => {
      sinon.spy(handlebars, 'createFrame');
      helper.render(defaults);
      expect(handlebars.createFrame.callCount).toStrictEqual(1);
      handlebars.createFrame.restore();
    });
  });

  describe('returns number', () => {
    it('length 13', () => {
      result = helper.render(defaults);
      expect(`${result}`.length).toStrictEqual(13);
    });

    it('sup a now', () => {
      now = Date.now();
      result = helper.render(defaults);
      expect(result >= now).toStrictEqual(true);
    });

    it('sup a now + 1000', () => {
      now = Date.now() + 1000;
      result = helper.render(1000, defaults);
      expect(result >= now).toStrictEqual(true);
    });

    it('inf a now + 2000', () => {
      now = Date.now() + 1999;
      result = helper.render(2000, defaults);
      expect(result >= now).toStrictEqual(true);
    });
  });
});
