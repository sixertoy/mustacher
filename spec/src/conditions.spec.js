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
    expect = require('chai').expect,
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
        expect(handlebars.registerHelper.callCount).to.equal(2);
        handlebars.registerHelper.restore();
      });
    });
    describe('render', function() {
      it('throws missing arguments', function() {
        expect(function() {
          helper.render();
        }).to.throw('missing arguments');
        expect(function() {
          helper.render(true);
        }).to.throw('missing arguments');
        expect(function() {
          helper.render(true, false);
        }).to.throw('missing arguments');
        expect(function() {
          helper.render(true, {
            name: 'or',
          });
        }).to.throw('missing arguments');
      });
      it('not throws missing arguments', function() {
        expect(function() {
          helper.render(true, false, {
            name: 'or',
          });
        }).not.to.throw('missing arguments');
      });
      it('handlebars createFrame called', function() {
        handlebarsOptions.name = 'or';
        sinon.spy(handlebars, 'createFrame');
        helper.register();
        helper.render(true, false, handlebarsOptions);
        expect(handlebars.createFrame.callCount).to.equal(1);
        handlebars.createFrame.restore();
      });
      it('call mustacher hasOptions once', function() {
        sinon.spy(mustacher, 'hasOptions');
        helper.register();
        helper.render(true, false, handlebarsOptions);
        expect(mustacher.hasOptions.callCount).to.equal(1);
        mustacher.hasOptions.restore();
      });
    });
    describe('or', function() {
      it('return true', function() {
        handlebarsOptions.name = 'or';
        helper.register();
        result = helper.render(true, false, handlebarsOptions);
        expect(result).to.equal(true);
      });
      it('return false', function() {
        handlebarsOptions.name = 'or';
        helper.register();
        result = helper.render(false, false, handlebarsOptions);
        expect(result).to.equal(false);
      });
    });
    describe('and', function() {
      it('return true', function() {
        handlebarsOptions.name = 'and';
        helper.register();
        result = helper.render(true, true, handlebarsOptions);
        expect(result).to.equal(true);
      });
      it('return false', function() {
        handlebarsOptions.name = 'and';
        helper.register();
        result = helper.render(false, true, handlebarsOptions);
        expect(result).to.equal(false);
      });
    });
  });
})();
