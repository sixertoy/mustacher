let helper;
let result;
const handlebarsOptions = {
  data: {},
  fn() {
    return true;
  },
  inverse() {
    return false;
  },
  name: '',
};
const sinon = require('sinon');
const handlebars = require('handlebars');
const mustacher = require('../../mustacher.js');
const Conditions = require('../conditions.js');

describe('conditions', () => {
  beforeEach(() => {
    helper = new Conditions();
  });

  describe('register', () => {
    it('handlebars registerHelper called twice', () => {
      sinon.spy(handlebars, 'registerHelper');
      helper.register();
      expect(handlebars.registerHelper.callCount).toStrictEqual(2);
      handlebars.registerHelper.restore();
    });
  });

  describe('render', () => {
    it('throws missing arguments', () => {
      expect(() => {
        helper.render();
      }).toThrow('missing arguments');
      expect(() => {
        helper.render(true);
      }).toThrow('missing arguments');
      expect(() => {
        helper.render(true, false);
      }).toThrow('missing arguments');
      expect(() => {
        helper.render(true, {
          name: 'or',
        });
      }).toThrow('missing arguments');
    });

    it('not throws missing arguments', () => {
      expect(() => {
        helper.render(true, false, {
          name: 'or',
        });
      }).not.toThrow('missing arguments');
    });

    it('handlebars createFrame called', () => {
      handlebarsOptions.name = 'or';
      sinon.spy(handlebars, 'createFrame');
      helper.register();
      helper.render(true, false, handlebarsOptions);
      expect(handlebars.createFrame.callCount).toStrictEqual(1);
      handlebars.createFrame.restore();
    });

    it('call mustacher hasOptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      helper.register();
      helper.render(true, false, handlebarsOptions);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });
  });

  describe('or', () => {
    it('return true', () => {
      handlebarsOptions.name = 'or';
      helper.register();
      result = helper.render(true, false, handlebarsOptions);
      expect(result).toStrictEqual(true);
    });

    it('return false', () => {
      handlebarsOptions.name = 'or';
      helper.register();
      result = helper.render(false, false, handlebarsOptions);
      expect(result).toStrictEqual(false);
    });
  });

  describe('and', () => {
    it('return true', () => {
      handlebarsOptions.name = 'and';
      helper.register();
      result = helper.render(true, true, handlebarsOptions);
      expect(result).toStrictEqual(true);
    });

    it('return false', () => {
      handlebarsOptions.name = 'and';
      helper.register();
      result = helper.render(false, true, handlebarsOptions);
      expect(result).toStrictEqual(false);
    });
  });
});
