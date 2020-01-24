let helper;
let result;
const sinon = require('sinon');
const handlebars = require('handlebars');

const mustacher = require('../../mustacher.js');
const Image = require('../image.js');

describe('image', () => {
  beforeEach(() => {
    helper = new Image();
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
      helper.register();
      result = () => helper.render();
      expect(result).toThrow('missing arguments');
    });

    it('not throws missing arguments', () => {
      helper.register();
      const opts = { name: '$image' };
      result = () => helper.render(opts);
      expect(result).not.toThrow('missing arguments');
    });

    it('call mustacher hasOptions once', () => {
      sinon.spy(mustacher, 'hasOptions');
      helper.register();
      const opts = { name: '$image' };
      helper.render(opts);
      expect(mustacher.hasOptions.callCount).toStrictEqual(1);
      mustacher.hasOptions.restore();
    });
  });

  describe('returns an image of 300x300', () => {
    it('no width no height (300 default)', () => {
      helper.register();
      result = helper.render({
        name: '$image',
      });
      expect(result.toString()).toStrictEqual(
        '<img src="//placehold.it/300x300" alt="" title="" />'
      );
    });

    it('width 300 no height (300 default)', () => {
      helper.register();
      result = helper.render(300, {
        name: '$image',
      });
      expect(result.toString()).toStrictEqual(
        '<img src="//placehold.it/300x300" alt="" title="" />'
      );
    });
  });

  describe('returns an image of 400x400', () => {
    it('width 400 no height (same as width)', () => {
      helper.register();
      result = helper.render(400, {
        name: '$image',
      });
      expect(result.toString()).toStrictEqual(
        '<img src="//placehold.it/400x400" alt="" title="" />'
      );
    });
  });

  describe('returns an image of 500x220', () => {
    it('width 500 height 220', () => {
      helper.register();
      result = helper.render(500, 220, {
        name: '$image',
      });
      expect(result.toString()).toStrictEqual(
        '<img src="//placehold.it/500x220" alt="" title="" />'
      );
    });
  });

  describe('returns an image of 500x220', () => {
    it('width 500 height 220', () => {
      helper.register();
      result = helper.render(500, 220, {
        data: {
          _parent: {},
          root: {
            cwd: process.cwd(),
            image: '//localhost:9999/',
            partials: {
              ext: '',
              src: '',
            },
          },
        },
        name: '$image',
      });
      expect(result.toString()).toStrictEqual(
        '<img src="//localhost:9999/500x220" alt="" title="" />'
      );
    });
  });
});
