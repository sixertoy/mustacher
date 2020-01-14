/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
  'use strict';
  var //variables
    helper,
    result,
    expected,
    defaults = {
      name: '$livereload',
    },
    ex_head = '<!-- livereload: use only in development environment -->',
    ex_foot = '<!-- endof livereload -->',
    cwd = process.cwd(),
    // requires
    path = require('path'),
    sinon = require('sinon'),
    expect = require('chai').expect,
    handlebars = require('handlebars'),
    mustacher = require(path.join(cwd, 'src/mustacher.js')),
    Livereload = require(path.join(cwd, 'src/helpers/livereload.js'));
  describe('livereload', function() {
    beforeEach(function() {
      helper = new Livereload();
    });
    afterEach(function() {});
    describe('register', function() {
      it('call handlebars registerHelper once', function() {
        sinon.spy(handlebars, 'registerHelper');
        helper.register();
        expect(handlebars.registerHelper.callCount).to.equal(1);
        handlebars.registerHelper.restore();
      });
    });
    describe('render', function() {
      it('throw no arguments', function() {
        expect(function() {
          helper.render();
        }).to.throw('missing arguments');
      });
      it('not throw no arguments', function() {
        expect(function() {
          helper.render(defaults);
        }).not.to.throw('missing arguments');
      });
      it('call mustacher hasOptions once', function() {
        sinon.spy(mustacher, 'hasOptions');
        helper.render(defaults);
        expect(mustacher.hasOptions.callCount).to.equal(1);
        mustacher.hasOptions.restore();
      });
    });
    describe('render with defaults', function() {
      it('returns debug true port 1337', function() {
        expected =
          ex_head +
          '<script src="http://localhost:1337/livereload.js"></script>' +
          ex_foot;
        result = helper.render(defaults);
        expect(result.toString()).to.equal(expected);
      });
    });
    describe('render with debug setted only', function() {
      it('returns debug true port 1337', function() {
        expected =
          ex_head +
          '<script src="http://localhost:1337/livereload.js"></script>' +
          ex_foot;
        result = helper.render(true, defaults);
        expect(result.toString()).to.equal(expected);
      });
      it('returns empty string debug false port 1337', function() {
        expected = '';
        result = helper.render(false, defaults);
        expect(result.toString()).to.equal(expected);
      });
    });
    describe('render with port setted only', function() {
      it('returns debug true port 53739', function() {
        expected =
          ex_head +
          '<script src="http://localhost:53739/livereload.js"></script>' +
          ex_foot;
        result = helper.render(53739, defaults);
        expect(result.toString()).to.equal(expected);
      });
    });
    describe('render with port setted and debug setted', function() {
      it('returns debug true port 53739', function() {
        expected =
          ex_head +
          '<script src="http://localhost:53739/livereload.js"></script>' +
          ex_foot;
        result = helper.render(53739, true, defaults);
        expect(result.toString()).to.equal(expected);
      });
      it('returns empty string debug false port 53739', function() {
        expected = '';
        result = helper.render(53739, false, defaults);
        expect(result).to.equal(expected);
      });
    });
  });
})();
