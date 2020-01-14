/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
  'use strict';
  var //variables
    result,
    helper,
    defaults = {
      root: {},
      _parent: {},
      name: '$repeat',
      fn: function() {},
    },
    cwd = process.cwd(),
    // requires
    path = require('path'),
    sinon = require('sinon'),
    handlebars = require('handlebars'),
    mustacher = require(path.join(cwd, 'src/mustacher.js')),
    Repeat = require(path.join(cwd, 'src/helpers/repeat.js'));
  describe('repeat', function() {
    beforeEach(function() {
      helper = new Repeat();
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
      it('throw no arguments', function() {
        expect(function() {
          helper.render(defaults);
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
        }).toThrow('arguments not valid');
      });
      it('call mustacher hasOptions once', function() {
        sinon.spy(mustacher, 'hasOptions');
        helper.render(3, defaults);
        expect(mustacher.hasOptions.callCount).toStrictEqual(1);
        mustacher.hasOptions.restore();
      });
      it('use context JSON.parse called once', function() {
        sinon.spy(JSON, 'parse');
        helper.render(3, '{"prop": "value"}', defaults);
        expect(JSON.parse.callCount).toStrictEqual(1);
        expect(JSON.parse.calledWith('{"prop": "value"}')).toStrictEqual(true);
        JSON.parse.restore();
      });
    });
  });
})();
