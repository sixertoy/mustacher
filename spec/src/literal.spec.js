/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
  'use strict';
  var //variables
    helper,
    result,
    cwd = process.cwd(),
    defaults = {
      name: '$rdim',
      fn: function() {
        return '';
      },
      data: {
        root: {
          delimiter: {
            ldim: '{{',
            rdim: '}}',
          },
        },
      },
    },
    // requires
    path = require('path'),
    sinon = require('sinon'),
    handlebars = require('handlebars'),
    mustacher = require(path.join(cwd, 'src/mustacher.js')),
    Literal = require(path.join(cwd, 'src/helpers/literal.js'));
  describe('literal', function() {
    beforeEach(function() {
      helper = new Literal();
    });
    afterEach(function() {});
    describe('register', function() {
      it('call handlebars registerHelper 3 times', function() {
        sinon.spy(handlebars, 'registerHelper');
        helper.register();
        expect(handlebars.registerHelper.callCount).toStrictEqual(3);
        handlebars.registerHelper.restore();
      });
    });
    describe('render', function() {
      it('throw no arguments', function() {
        helper.register();
        expect(function() {
          helper.render();
        }).toThrow('missing arguments');
      });
      it('not throw no arguments $ldim', function() {
        helper.register();
        expect(function() {
          defaults.name = '$ldim';
          helper.render(defaults);
        }).not.toThrow('missing arguments');
      });
      it('not throw no arguments $rdim', function() {
        helper.register();
        expect(function() {
          defaults.name = '$rdim';
          helper.render(defaults);
        }).not.toThrow('missing arguments');
      });
      it('call mustacher hasoptions once', function() {
        sinon.spy(mustacher, 'hasOptions');
        defaults.name = '$rdim';
        helper.render(defaults);
        expect(mustacher.hasOptions.callCount).toStrictEqual(1);
        mustacher.hasOptions.restore();
      });
      it('call handlebars createframe once', function() {
        sinon.spy(handlebars, 'createFrame');
        defaults.name = '$rdim';
        helper.render(defaults);
        expect(handlebars.createFrame.callCount).toStrictEqual(1);
        handlebars.createFrame.restore();
      });
    });
    describe('delimiters', function() {
      it('returns {{', function() {
        defaults.name = '$ldim';
        result = helper.render(defaults);
        expect(result).toStrictEqual('{{');
      });
      it('returns }}', function() {
        defaults.name = '$rdim';
        result = helper.render(defaults);
        expect(result).toStrictEqual('}}');
      });
      it('returns exotic user define delim [*', function() {
        defaults.name = '$ldim';
        defaults.data.root.delimiter.ldim = '[*';
        result = helper.render(defaults);
        expect(result).toStrictEqual('[*');
      });
      it('returns exotic user define delim *]', function() {
        defaults.name = '$rdim';
        defaults.data.root.delimiter.rdim = '*]';
        result = helper.render(defaults);
        expect(result).toStrictEqual('*]');
      });
    });
    describe('raw', function() {
      it('returns exact content', function() {
        defaults.name = 'raw';
        result = helper.render(defaults);
        expect(result).toStrictEqual('');
      });
    });
  });
})();
