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
  name: 'equal',
};
const sinon = require('sinon');
const handlebars = require('handlebars');

const mustacher = require('../../mustacher.js');
const Equal = require('../equal.js');

describe('equal', () => {
  beforeEach(() => {
    helper = new Equal();
  });

  describe('register', () => {
    it('handlebars registerHelper called once', () => {
      sinon.spy(handlebars, 'registerHelper');
      helper.register();
      expect(handlebars.registerHelper.callCount).toStrictEqual(1);
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
        helper.render(true, handlebarsOptions);
      }).toThrow('missing arguments');
    });

    it('not throws missing arguments', () => {
      expect(() => {
        helper.render(true, false, handlebarsOptions);
      }).not.toThrow('missing arguments');
    });

    it('handlebars createFrame called', () => {
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

  describe('with context', () => {
    it('string with context defined', () => {
      helper.register();
      result = helper.render(
        'toto',
        'toto',
        '{"prop": "value"}',
        handlebarsOptions
      );
      expect(result).toStrictEqual(true);
    });
  });

  describe('isequal', () => {
    it('return true', () => {
      helper.register();
      result = helper.render('toto', 'toto', handlebarsOptions);
      expect(result).toStrictEqual(true);
      result = helper.render(123, 123, handlebarsOptions);
      expect(result).toStrictEqual(true);
      result = helper.render({}, {}, handlebarsOptions);
      expect(result).toStrictEqual(true);
    });

    it('return false', () => {
      helper.register();
      result = helper.render('tata', 'toto', handlebarsOptions);
      expect(result).toStrictEqual(false);
      result = helper.render(1234, 123, handlebarsOptions);
      expect(result).toStrictEqual(false);
      result = helper.render({ name: 'noequal' }, {}, handlebarsOptions);
      expect(result).toStrictEqual(false);
    });
  });
});
