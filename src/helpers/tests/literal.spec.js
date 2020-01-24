let helper;
let result;
const defaults = {
  data: {
    root: {
      delimiter: {
        ldim: '{{',
        rdim: '}}',
      },
    },
  },
  fn() {
    return '';
  },
  name: '$rdim',
};
const sinon = require('sinon');
const handlebars = require('handlebars');

const mustacher = require('../../mustacher.js');
const Literal = require('../literal.js');

describe('literal', () => {
  beforeEach(() => {
    helper = new Literal();
  });

  describe('register', () => {
    it('call handlebars registerHelper 3 times', () => {
      sinon.spy(handlebars, 'registerHelper');
      helper.register();
      expect(handlebars.registerHelper.callCount).toStrictEqual(3);
      handlebars.registerHelper.restore();
    });
  });

  describe('render', () => {
    it('throw no arguments', () => {
      helper.register();
      expect(() => {
        helper.render();
      }).toThrow('missing arguments');
    });

    it('not throw no arguments $ldim', () => {
      helper.register();
      expect(() => {
        defaults.name = '$ldim';
        helper.render(defaults);
      }).not.toThrow('missing arguments');
    });

    it('not throw no arguments $rdim', () => {
      helper.register();
      expect(() => {
        defaults.name = '$rdim';
        helper.render(defaults);
      }).not.toThrow('missing arguments');
    });

    it('call mustacher hasoptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      defaults.name = '$rdim';
      helper.render(defaults);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });

    it('call handlebars createframe once', () => {
      sinon.spy(handlebars, 'createFrame');
      defaults.name = '$rdim';
      helper.render(defaults);
      expect(handlebars.createFrame.callCount).toStrictEqual(1);
      handlebars.createFrame.restore();
    });
  });

  describe('delimiters', () => {
    it('returns {{', () => {
      defaults.name = '$ldim';
      result = helper.render(defaults);
      expect(result).toStrictEqual('{{');
    });

    it('returns }}', () => {
      defaults.name = '$rdim';
      result = helper.render(defaults);
      expect(result).toStrictEqual('}}');
    });

    it('returns exotic user define delim [*', () => {
      defaults.name = '$ldim';
      defaults.data.root.delimiter.ldim = '[*';
      result = helper.render(defaults);
      expect(result).toStrictEqual('[*');
    });

    it('returns exotic user define delim *]', () => {
      defaults.name = '$rdim';
      defaults.data.root.delimiter.rdim = '*]';
      result = helper.render(defaults);
      expect(result).toStrictEqual('*]');
    });
  });

  describe('raw', () => {
    it('returns exact content', () => {
      defaults.name = 'raw';
      result = helper.render(defaults);
      expect(result).toStrictEqual('');
    });
  });
});
