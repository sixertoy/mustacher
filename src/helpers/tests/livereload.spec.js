let helper;
let result;
let expected;
const defaults = {
  name: '$livereload',
};
const exHead = '<!-- livereload: use only in development environment -->';
const exFoot = '<!-- endof livereload -->';
const sinon = require('sinon');
const handlebars = require('handlebars');

const mustacher = require('../../mustacher.js');
const Livereload = require('../livereload.js');

describe('livereload', () => {
  beforeEach(() => {
    helper = new Livereload();
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
  });

  describe('render with defaults', () => {
    it('returns debug true port 1337', () => {
      expected = `${exHead}<script src="http://localhost:1337/livereload.js"></script>${exFoot}`;
      result = helper.render(defaults);
      expect(result.toString()).toStrictEqual(expected);
    });
  });

  describe('render with debug setted only', () => {
    it('returns debug true port 1337', () => {
      expected = `${exHead}<script src="http://localhost:1337/livereload.js"></script>${exFoot}`;
      result = helper.render(true, defaults);
      expect(result.toString()).toStrictEqual(expected);
    });

    it('returns empty string debug false port 1337', () => {
      expected = '';
      result = helper.render(false, defaults);
      expect(result.toString()).toStrictEqual(expected);
    });
  });

  describe('render with port setted only', () => {
    it('returns debug true port 53739', () => {
      expected = `${exHead}<script src="http://localhost:53739/livereload.js"></script>${exFoot}`;
      result = helper.render(53739, defaults);
      expect(result.toString()).toStrictEqual(expected);
    });
  });

  describe('render with port setted and debug setted', () => {
    it('returns debug true port 53739', () => {
      expected = `${exHead}<script src="http://localhost:53739/livereload.js"></script>${exFoot}`;
      result = helper.render(53739, true, defaults);
      expect(result.toString()).toStrictEqual(expected);
    });

    it('returns empty string debug false port 53739', () => {
      expected = '';
      result = helper.render(53739, false, defaults);
      expect(result).toStrictEqual(expected);
    });
  });
});
