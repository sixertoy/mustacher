/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
  'use strict';
  var //variables
    result,
    helper,
    defaults = {
      name: '$random',
    },
    cwd = process.cwd(),
    // requires
    path = require('path'),
    sinon = require('sinon'),
    handlebars = require('handlebars'),
    mustacher = require(path.join(cwd, 'src/mustacher.js')),
    Random = require(path.join(cwd, 'src/helpers/random.js'));

  describe('random', function() {
    beforeEach(function() {
      helper = new Random();
    });

    afterEach(function() {});

    describe('register', function() {
      it('call handlebars registerHelper once', function() {
        sinon.spy(handlebars, 'registerHelper');
        helper.register();
        expect(handlebars.registerHelper.callCount).toStrictEqual(1);
        handlebars.registerHelper.restore();
      });
    });

    describe('render', function() {
      it('throw no arguments', function() {
        expect(function() {
          helper.render();
        }).toThrow('missing arguments');
      });

      it('throw wrong arguments', function() {
        expect(function() {
          helper.render(
            {
              prop: 'prop',
            },
            defaults
          );
        }).toThrow('missing arguments');
      });

      it('throw wrong arguments', function() {
        expect(function() {
          helper.render(
            123,
            {
              prop: 'prop',
            },
            defaults
          );
        }).toThrow('missing arguments');
      });

      it('throw wrong arguments', function() {
        expect(function() {
          helper.render(
            123,
            123,
            {
              prop: 'prop',
            },
            defaults
          );
        }).toThrow('missing arguments');
      });

      it('not throw no arguments', function() {
        expect(function() {
          helper.render(defaults);
        }).not.toThrow('missing arguments');
      });

      it('call mustacher hasOptions once', function() {
        sinon.spy(mustacher, 'hasOptions');
        helper.render(defaults);
        expect(mustacher.hasOptions.callCount).toStrictEqual(1);
        mustacher.hasOptions.restore();
      });
    });
    describe('render with arguments', function() {
      it('returns a number between 0 and 1 by default', function() {
        result = helper.render(defaults);
        expect(result >= 0 && result <= 1).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 0 and 2', function() {
        result = helper.render(2, defaults);
        expect(result >= 0 && result <= 2).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 1 and 2', function() {
        result = helper.render(1, 2, defaults);
        expect(result >= 1 && result <= 2).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 100 and 200', function() {
        result = helper.render(100, 200, defaults);
        expect(result >= 100 && result <= 200).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 0 and 1 rounded', function() {
        result = helper.render(true, defaults);
        expect(result >= 0 && result <= 1).toStrictEqual(true);
        expect(('' + result).indexOf('.')).toStrictEqual(-1);
      });

      it('returns a number between 0 and 2 rounded', function() {
        result = helper.render(2, defaults);
        expect(result >= 0 && result <= 2).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 1 and 2 rounded', function() {
        result = helper.render(1, 2, defaults);
        expect(result >= 1 && result <= 2).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 100 and 200 rounded', function() {
        result = helper.render(100, 200, defaults);
        expect(result >= 100 && result <= 200).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 100 and 200 not rounded', function() {
        result = helper.render(100, 200, false, defaults);
        expect(result >= 100 && result <= 200).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns a number between 100 and 200 rounded', function() {
        result = helper.render(100, 200, true, defaults);
        expect(result >= 100 && result <= 200).toStrictEqual(true);
        expect(('' + result).indexOf('.')).toStrictEqual(-1);
      });

      it('returns a number between 100 and 200 rounded inversed', function() {
        result = helper.render(200, 100, true, defaults);
        expect(result >= 100 && result <= 200).toStrictEqual(true);
        expect(('' + result).indexOf('.')).toStrictEqual(-1);
      });

      it('returns a number between 100 and 200 rounded inversed', function() {
        result = helper.render(200, 100, false, defaults);
        expect(result >= 100 && result <= 200).toStrictEqual(true);
        expect(('' + result).indexOf('.')).not.toStrictEqual(-1);
      });

      it('returns 123 same min/max not rounded', function() {
        result = helper.render(123, 123, false, defaults);
        expect(result).toStrictEqual(123);
        expect(('' + result).indexOf('.')).toStrictEqual(-1);
      });

      it('returns 123 same min/max rounded', function() {
        result = helper.render(123, 123, true, defaults);
        expect(result).toStrictEqual(123);
        expect(('' + result).indexOf('.')).toStrictEqual(-1);
      });
    });
  });
})();
