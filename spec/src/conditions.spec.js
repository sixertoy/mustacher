/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
  'use strict';
  var //variables
    helper,
    result,
    cwd = process.cwd(),
    handlebarsOptions = {
      inverse: function(args) {
        return false;
      },
      fn: function(args) {
        return true;
      },
      name: '',
      data: {},
    },
    // requires
    path = require('path'),
    sinon = require('sinon'),
    handlebars = require('handlebars'),
    mustacher = require(path.join(cwd, 'src/mustacher.js')),
    Conditions = require(path.join(cwd, 'src/helpers/conditions.js'));

  describe('conditions', function() {
    beforeEach(function() {
      helper = new Conditions();
    });

    afterEach(function() {});

    describe('register', function() {
      it('handlebars registerHelper called twice', function() {
        sinon.spy(handlebars, 'registerHelper');
        helper.register();
        expect(handlebars.registerHelper.callCount).toStrictEqual(2);
        handlebars.registerHelper.restore();
      });
    });
    describe('render', function() {
      it('throws missing arguments', function() {
        expect(function() {
          helper.render();
        }).toThrow('missing arguments');
        expect(function() {
          helper.render(true);
        }).toThrow('missing arguments');
        expect(function() {
          helper.render(true, false);
        }).toThrow('missing arguments');
        expect(function() {
          helper.render(true, {
            name: 'or',
          });
        }).toThrow('missing arguments');
      });
      it('not throws missing arguments', function() {
        expect(function() {
          helper.render(true, false, {
            name: 'or',
          });
        }).not.toThrow('missing arguments');
      });
      it('handlebars createFrame called', function() {
        handlebarsOptions.name = 'or';
        sinon.spy(handlebars, 'createFrame');
        helper.register();
        helper.render(true, false, handlebarsOptions);
        expect(handlebars.createFrame.callCount).toStrictEqual(1);
        handlebars.createFrame.restore();
      });
      it('call mustacher hasOptions once', function() {
        sinon.spy(mustacher, 'hasOptions');
        helper.register();
        helper.render(true, false, handlebarsOptions);
        expect(mustacher.hasOptions.callCount).toStrictEqual(1);
        mustacher.hasOptions.restore();
      });
    });
    describe('or', function() {
      it('return true', function() {
        handlebarsOptions.name = 'or';
        helper.register();
        result = helper.render(true, false, handlebarsOptions);
        expect(result).toStrictEqual(true);
      });
      it('return false', function() {
        handlebarsOptions.name = 'or';
        helper.register();
        result = helper.render(false, false, handlebarsOptions);
        expect(result).toStrictEqual(false);
      });
    });
    describe('and', function() {
      it('return true', function() {
        handlebarsOptions.name = 'and';
        helper.register();
        result = helper.render(true, true, handlebarsOptions);
        expect(result).toStrictEqual(true);
      });
      it('return false', function() {
        handlebarsOptions.name = 'and';
        helper.register();
        result = helper.render(false, true, handlebarsOptions);
        expect(result).toStrictEqual(false);
      });
    });
  });
})();
