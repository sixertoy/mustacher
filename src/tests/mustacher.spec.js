let result;
let expected;
const sinon = require('sinon');
const handlebars = require('handlebars');

const mustacher = require('../mustacher.js');
const conditions = require('../helpers/conditions.js');
const equal = require('../helpers/equal.js');
const image = require('../helpers/image.js');
const lorem = require('../helpers/lorem.js');
const include = require('../helpers/include.js');
const literal = require('../helpers/literal.js');
const livereload = require('../helpers/livereload.js');
const random = require('../helpers/random.js');
const repeat = require('../helpers/repeat.js');
const timestamp = require('../helpers/timestamp.js');

const defaults = {
  cwd: process.cwd(),
  delimiter: {
    ldim: '{{',
    rdim: '}}',
  },
  partials: {
    depth: 2,
    ext: '.hbs',
    src: 'partials/',
  },
};

function stubArguments(...rest) {
  return rest;
}

describe('mustacher', () => {
  describe('options', () => {
    it('return empty defaults', () => {
      expected = {};
      result = mustacher.options();
      expect(result).toStrictEqual(expected);
    });

    it('return defaults', () => {
      mustacher('a string');
      expected = defaults;
      result = mustacher.options();
      expect(result).toStrictEqual(expected);
    });

    it('return concatened context', () => {
      defaults.context = 'a global context variable';
      const opts = { context: defaults.context };
      mustacher('a string', opts);
      expected = mustacher.options();
      expect(expected).toStrictEqual(defaults);
    });

    it('return concatened context + defaults override', () => {
      defaults.partials.ext = '.tpl';
      defaults.context = 'a global context variable';
      mustacher(
        'a string',
        { context: defaults.context },
        { partials: { ext: defaults.partials.ext } }
      );
      expect(mustacher.options()).toStrictEqual(defaults);
    });
  });

  describe('hasOptions', () => {
    it('returns false if no arguments', () => {
      expect(mustacher.hasOptions()).toStrictEqual(false);
    });

    it('returns arguments is empty', () => {
      const args = stubArguments();
      expect(mustacher.hasOptions(args)).toStrictEqual(false);
    });

    it('returns false is not a plainobject', () => {
      const args = [1, 2, 3];
      const stubbed = stubArguments(args);
      result = mustacher.hasOptions(stubbed);
      expected = false;
      expect(result).toStrictEqual(expected);
    });

    it('returns options property name is not defined', () => {
      const opts = { obj: 'no name prop' };
      const stubbed = stubArguments(opts);
      result = mustacher.hasOptions(stubbed);
      expected = false;
      expect(result).toStrictEqual(expected);
    });

    it('expect to returns array of arguments', () => {
      const opts = { name: 'name prop' };
      const stubbed = stubArguments(opts);
      result = mustacher.hasOptions(stubbed);
      expected = [opts];
      expect(result).toStrictEqual(expected);
    });
  });

  describe('register', () => {
    it('call register on include helper', () => {
      const helpers = ['include'];
      const spy = sinon.stub(helpers, 'forEach');
      mustacher.register(helpers);
      expect(spy.callCount).toStrictEqual(1);
      spy.restore();
    });

    it('call register on include helper/image/repeat', () => {
      const spies = [
        sinon.stub(image.prototype, 'register'),
        sinon.stub(repeat.prototype, 'register'),
        sinon.stub(include.prototype, 'register'),
      ];
      const helpers = ['include', 'image', 'repeat'];
      mustacher.register(helpers);
      spies.forEach(spy => {
        expect(spy.callCount).toStrictEqual(1);
        spy.restore();
      });
    });

    it('call register on defaults helpers', () => {
      const spies = [
        sinon.stub(conditions.prototype, 'register'),
        sinon.stub(equal.prototype, 'register'),
        sinon.stub(image.prototype, 'register'),
        sinon.stub(include.prototype, 'register'),
        sinon.stub(lorem.prototype, 'register'),
        sinon.stub(literal.prototype, 'register'),
        sinon.stub(livereload.prototype, 'register'),
        sinon.stub(random.prototype, 'register'),
        sinon.stub(repeat.prototype, 'register'),
        sinon.stub(timestamp.prototype, 'register'),
      ];
      mustacher.register();
      spies.forEach(spy => {
        expect(spy.callCount).toStrictEqual(1);
        spy.restore();
      });
    });
  });

  describe('render', () => {
    it('throw a mustacher error at handlebar compile', () => {
      sinon.stub(handlebars, 'compile', () => {
        throw new Error('Handlebars compile error');
      });
      expect(() => {
        mustacher('{{content}}');
      }).toThrow('Handlebars compile error');
      handlebars.compile.restore();
    });

    it('throw if no argument', () => {
      expect(() => {
        mustacher();
      }).toThrow('missing arguments');
    });

    it('should return helloworld', () => {
      result = mustacher('hello world!');
      expect(result).toStrictEqual('hello world!');
    });

    it("should return '' no context", () => {
      result = mustacher('{{content}}');
      expect(result).toStrictEqual('');
    });

    it("should return '' empty context", () => {
      result = mustacher('{{content}}', {});
      expect(result).toStrictEqual('');
    });

    it('should return helloworld content', () => {
      result = mustacher('{{content}}', {
        content: 'hello world!',
      });
      expect(result).toStrictEqual('hello world!');
    });

    it('should return helloworld @root.content', () => {
      result = mustacher('{{@root.content}}', {
        content: 'hello world!',
      });
      expect(result).toStrictEqual('hello world!');
    });

    it('should return helloworld if/content', () => {
      result = mustacher('{{#if true}}{{content}}{{/if}}', {
        content: 'hello world!',
      });
      expect(result).toStrictEqual('hello world!');
    });

    it('should return helloworld if/../content', () => {
      result = mustacher('{{#if true}}{{../content}}{{/if}}', {
        content: 'hello world!',
      });
      expect(result).toStrictEqual('');
    });

    it('should return helloworld if/../../content', () => {
      result = mustacher('{{#if true}}{{../../content}}{{/if}}', {
        content: 'hello world!',
      });
      expect(result).toStrictEqual('');
    });

    it('should returns repeated string content is a local variable', () => {
      const str =
        '<html><head><title>{{title}}</title></head><body><ul>{{#repeat 3}}<li>Hello {{@index}}{{content}}</li>{{/repeat}}</ul></body></html>';
      result = mustacher(str, {
        content: 'hello',
        title: 'this is a title',
      });
      expect(result).toStrictEqual(
        '<html><head><title>this is a title</title></head><body><ul><li>Hello 0</li><li>Hello 1</li><li>Hello 2</li></ul></body></html>'
      );
    });

    it('should returns repeated string content is a global variable', () => {
      const str =
        '<html><head><title>{{title}}</title></head><body><ul>{{#repeat 3}}<li>Hello {{@index}}{{@root.content}}</li>{{/repeat}}</ul></body></html>';
      result = mustacher(str, {
        content: ' hello',
        title: 'this is a title',
      });
      expect(result).toStrictEqual(
        '<html><head><title>this is a title</title></head><body><ul><li>Hello 0 hello</li><li>Hello 1 hello</li><li>Hello 2 hello</li></ul></body></html>'
      );
    });
  });
});
