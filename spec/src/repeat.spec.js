/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var //variables
        result, helper,
        defaults = {
            name: '$random'
        },
        cwd = process.cwd(),
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        handlebars = require('handlebars'),
        mustacher = require(path.join(cwd, 'src/mustacher.js')),
        Repeat = require(path.join(cwd, 'src/helpers/repeat.js'));
    describe('repeat', function () {
        beforeEach(function () {
            helper = new Repeat();
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
            it('call mustacher hasOptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                helper.render(defaults);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
            it('throw no arguments', function () {
                expect(function () {
                    helper.render();
                }).to.throw('missing arguments');
            });
            it('throw no arguments', function () {
                expect(function () {
                    helper.render(defaults);
                }).to.throw('missing arguments');
            });
            it('throw wrong arguments', function () {
                expect(function () {
                    helper.render({
                        prop: 'prop'
                    }, defaults);
                }).to.throw('arguments not valid');
            });
        });
    });
}());