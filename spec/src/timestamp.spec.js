/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console, Date */
(function () {
    'use strict';
    var //variables
        helper, result, now,
        cwd = process.cwd(),
        defaults = {
            data: {},
            name: '$timestamp'
        },
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        handlebars = require('handlebars'),
        mustacher = require(path.join(cwd, 'src/mustacher.js')),
        Timestamp = require(path.join(cwd, 'src/helpers/timestamp.js'));
    describe('timestamp', function () {
        beforeEach(function () {
            helper = new Timestamp();
        });
        afterEach(function () {});
        describe('register', function () {
            it('call handlebars registerHelper once', function () {
                sinon.spy(handlebars, 'registerHelper');
                helper.register();
                expect(handlebars.registerHelper.callCount).to.equal(1);
                handlebars.registerHelper.restore();
            });
        });
        describe('render', function () {
            it('throw no arguments', function () {
                expect(function () {
                    helper.render();
                }).to.throw('missing arguments');
            });
            it('not throw no arguments', function () {
                expect(function () {
                    helper.render(defaults);
                }).not.to.throw('missing arguments');
            });
            it('call mustacher hasOptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                helper.render(defaults);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
            it('call handlebars createFrame once', function () {
                sinon.spy(handlebars, 'createFrame');
                helper.render(defaults);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
        });
        describe('returns number', function () {
            it('length 13', function () {
                result = helper.render(defaults);
                expect(('' + result).length).to.equal(13);
            });
            it('sup a now', function () {
                now = Date.now();
                result = helper.render(defaults);
                expect(result >= now).to.equal(true);
            });
            it('sup a now + 1000', function () {
                now = Date.now() + 1000;
                result = helper.render(1000, defaults);
                expect(result >= now).to.equal(true);
            });
            it('inf a now + 2000', function () {
                now = Date.now() + 1999;
                result = helper.render(2000, defaults);
                expect(result >= now).to.equal(true);
            });
        });
    });
}());