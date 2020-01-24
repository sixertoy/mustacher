let helper;
let result;
let repeat;
const defaults = {
  data: {
    _parent: {},
    root: {
      cwd: process.cwd(),
      partials: {
        ext: '',
        src: '',
      },
    },
  },
  fn() {
    return true;
  },
  inverse() {
    return false;
  },
  name: 'equal',
};
// requires
const path = require('path');
const sinon = require('sinon');
const handlebars = require('handlebars');

const mustacher = require('../../mustacher.js');
const Repeat = require('../repeat.js');
const Include = require('../include.js');

describe('equal', () => {
  beforeEach(() => {
    repeat = new Repeat();
    helper = new Include();
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
        helper.render('file');
      }).toThrow('missing arguments');
      expect(() => {
        helper.render('file', false);
      }).toThrow('missing arguments');
      expect(() => {
        helper.render(true, defaults);
      }).toThrow('missing arguments');
    });
    it('handlebars createFrame called', () => {
      sinon.spy(handlebars, 'createFrame');
      helper.register();
      helper.render('file', defaults);
      expect(handlebars.createFrame.callCount).toStrictEqual(1);
      handlebars.createFrame.restore();
    });
    it('call mustacher hasOptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      helper.register();
      helper.render('path/to/file', defaults);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });
    it('unable to load template', () => {
      const p = path.normalize('path/to/file');
      helper.register();
      result = helper.render(p, defaults);
      expect(result.toString()).toStrictEqual(
        `<!-- ${p} -->\nUnable to load file\n<!-- endof ${p} -->`
      );
    });

    it('render file with no context', () => {
      const p = path.normalize('include_low');
      defaults.data.root.partials.src = 'spec/fixtures';
      defaults.data.root.partials.ext = '.hbs';
      helper.register();
      result = helper.render(p, defaults);
      expect(result.toString()).toEqual('include a template file');
      expect(result.toString()).not.toEqual(
        `<!-- ${p} -->\nUnable to load file\n<!-- endof ${p} -->`
      );
    });

    it('render file with context', () => {
      const p = path.normalize('include_context');
      defaults.data.root.partials.src = 'spec/fixtures';
      defaults.data.root.partials.ext = '.hbs';
      repeat.register();
      helper.register();
      result = helper.render(p, '{"variable":"private"}', defaults);
      expect(result.toString()).toEqual(
        'include a template file with a private variable'
      );
    });
  });
});
