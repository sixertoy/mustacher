/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
  'use strict';
  var result,
    cwd = process.cwd(),
    path = require('path'),
    sinon = require('sinon'),
    noop = require('noop').noop,
    handlebars = require('handlebars'),
    mustacher = require(path.join(cwd, 'src/mustacher.js')),
    // helpers
    conditions = require(path.join(cwd, 'src/helpers/conditions.js')),
    equal = require(path.join(cwd, 'src/helpers/equal.js')),
    image = require(path.join(cwd, 'src/helpers/image.js')),
    include = require(path.join(cwd, 'src/helpers/include.js')),
    literal = require(path.join(cwd, 'src/helpers/literal.js')),
    livereload = require(path.join(cwd, 'src/helpers/livereload.js')),
    // lorem = require(path.join(cwd, 'src/helpers/lorem.js')),
    random = require(path.join(cwd, 'src/helpers/random.js')),
    repeat = require(path.join(cwd, 'src/helpers/repeat.js')),
    timestamp = require(path.join(cwd, 'src/helpers/timestamp.js')),
    defaults = {
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

  function stubArguments() {
    return arguments;
  }

  describe('mustacher', function() {
    beforeEach(function() {});

    afterEach(function() {});

    describe('options', function() {
      it('return empty defaults', function() {
        expect(mustacher.options()).toStrictEqual({});
      });
      it('return defaults', function() {
        mustacher('a string');
        expect(mustacher.options()).toStrictEqual(defaults);
      });
      it('return concatened context', function() {
        defaults.context = 'a global context variable';
        mustacher('a string', {
          context: defaults.context,
        });
        expect(mustacher.options()).toStrictEqual(defaults);
      });
      it('return concatened context + defaults override', function() {
        defaults.partials.ext = '.tpl';
        defaults.context = 'a global context variable';
        mustacher(
          'a string',
          {
            context: defaults.context,
          },
          {
            partials: {
              ext: defaults.partials.ext,
            },
          }
        );
        expect(mustacher.options()).toStrictEqual(defaults);
      });
    });

    describe('hasOptions', function() {
      it('returns false if no arguments', function() {
        expect(mustacher.hasOptions()).toStrictEqual(false);
      });
      it('returns arguments is empty', function() {
        expect(mustacher.hasOptions(stubArguments())).toStrictEqual(false);
      });
      it('returns false is not a plainobject', function() {
        expect(mustacher.hasOptions(stubArguments([1, 2, 3]))).toStrictEqual(false);
      });
      it('returns options property name is not defined', function() {
        expect(
          mustacher.hasOptions(
            stubArguments({
              obj: 'no name prop',
            })
          )
        ).toStrictEqual(false);
      });
      it('expect to returns array of arguments', function() {
        expect(
          mustacher.hasOptions(
            stubArguments({
              name: 'name prop',
            })
          )
        ).toStrictEqual([
          {
            name: 'name prop',
          },
        ]);
      });
    });

    describe('register', function() {
      it('call register on include helper', function() {
        var helpers = ['include'],
          spy = sinon.stub(helpers, 'forEach');
        mustacher.register(helpers);
        expect(spy.callCount).toStrictEqual(1);
        spy.restore();
      });
      it('call register on include helper/image/repeat', function() {
        var spies = [
            sinon.stub(image.prototype, 'register'),
            sinon.stub(repeat.prototype, 'register'),
            sinon.stub(include.prototype, 'register'),
          ],
          helpers = ['include', 'image', 'repeat'];
        mustacher.register(helpers);
        spies.forEach(function(spy) {
          expect(spy.callCount).toStrictEqual(1);
          spy.restore();
        });
      });
      it('call register on defaults helpers', function() {
        var spies = [
          sinon.stub(conditions.prototype, 'register'),
          sinon.stub(equal.prototype, 'register'),
          sinon.stub(image.prototype, 'register'),
          sinon.stub(include.prototype, 'register'),
          sinon.stub(literal.prototype, 'register'),
          sinon.stub(livereload.prototype, 'register'),
          sinon.stub(random.prototype, 'register'),
          sinon.stub(repeat.prototype, 'register'),
          sinon.stub(timestamp.prototype, 'register'),
        ];
        mustacher.register();
        spies.forEach(function(spy) {
          expect(spy.callCount).toStrictEqual(1);
          spy.restore();
        });
      });
    });

    describe('render', function() {
      it('throw a mustacher error at handlebar compile', function() {
        sinon.stub(handlebars, 'compile', function() {
          throw new Error('Handlebars compile error');
        });
        expect(function() {
          mustacher('{{content}}');
        }).toThrow('Handlebars compile error');
        handlebars.compile.restore();
      });
      it('throw if no argument', function() {
        expect(function() {
          mustacher();
        }).toThrow('missing arguments');
      });
      it('should return helloworld', function() {
        result = mustacher('hello world!');
        expect(result).toStrictEqual('hello world!');
      });
      it("should return '' no context", function() {
        result = mustacher('{{content}}');
        expect(result).toStrictEqual('');
      });
      it("should return '' empty context", function() {
        result = mustacher('{{content}}', {});
        expect(result).toStrictEqual('');
      });
      it('should return helloworld content', function() {
        result = mustacher('{{content}}', {
          content: 'hello world!',
        });
        expect(result).toStrictEqual('hello world!');
      });
      it('should return helloworld @root.content', function() {
        result = mustacher('{{@root.content}}', {
          content: 'hello world!',
        });
        expect(result).toStrictEqual('hello world!');
      });
      it('should return helloworld if/content', function() {
        result = mustacher('{{#if true}}{{content}}{{/if}}', {
          content: 'hello world!',
        });
        expect(result).toStrictEqual('hello world!');
      });
      it('should return helloworld if/../content', function() {
        result = mustacher('{{#if true}}{{../content}}{{/if}}', {
          content: 'hello world!',
        });
        expect(result).toStrictEqual('hello world!');
      });
      it('should return helloworld if/../../content', function() {
        result = mustacher('{{#if true}}{{../../content}}{{/if}}', {
          content: 'hello world!',
        });
        expect(result).toStrictEqual('');
      });
      it('should returns repeated string content is a local variable', function() {
        var str =
          '<html><head><title>{{title}}</title></head><body><ul>{{#repeat 3}}<li>Hello {{@index}}{{content}}</li>{{/repeat}}</ul></body></html>';
        result = mustacher(str, {
          content: 'hello',
          title: 'this is a title',
        });
        expect(result).toStrictEqual(
          '<html><head><title>this is a title</title></head><body><ul><li>Hello 0</li><li>Hello 1</li><li>Hello 2</li></ul></body></html>'
        );
      });
      it('should returns repeated string content is a global variable', function() {
        var str =
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
})();
