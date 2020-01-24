let helper;
const defaults = {
  _parent: {},
  fn() {},
  name: '$repeat',
  root: {},
};
const sinon = require('sinon');
const handlebars = require('handlebars');
const mustacher = require('../../mustacher.js');
const Repeat = require('../repeat.js');

describe('repeat', () => {
  beforeEach(() => {
    helper = new Repeat();
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

    it('throw no arguments', () => {
      expect(() => {
        helper.render(defaults);
      }).toThrow('missing arguments');
    });

    it('throw wrong arguments', () => {
      expect(() => {
        helper.render(
          {
            prop: 'prop',
          },
          defaults
        );
      }).toThrow('arguments not valid');
    });

    it('call mustacher hasOptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      helper.render(3, defaults);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });

    it('use context JSON.parse called once', () => {
      sinon.spy(JSON, 'parse');
      helper.render(3, '{"prop": "value"}', defaults);
      expect(JSON.parse.callCount).toStrictEqual(1);
      expect(JSON.parse.calledWith('{"prop": "value"}')).toStrictEqual(true);
      JSON.parse.restore();
    });
  });
});
