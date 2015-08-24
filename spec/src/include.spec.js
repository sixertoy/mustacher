/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
    'use strict';
    var result, helper,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        sinon = require('sinon'),
        handlebars = require('handlebars'),
        mustacher = require(path.join(cwd, 'src/index.js')),
        Include = require(path.join(cwd, 'src/helpers/include.js')),
        handlebarsOptions = {
            name: '$include',
            data: {}
        };

    describe('include', function() {

        beforeEach(function () {
            helper = new Include();
        });
        afterEach(function () {});

        describe('register', function () {
            it('handlebars registerHelper called once', function () {
                sinon.spy(handlebars, 'registerHelper');
                helper.register();
                expect(handlebars.registerHelper.callCount).to.equal(1);
                handlebars.registerHelper.restore();
            });
        });

        describe('render', function() {
            it('throws missing arguments', function () {
                expect(function () {
                    helper.render();
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render(true);
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render(true, false);
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render(true, handlebarsOptions);
                }).to.throw('missing arguments');
            });
            it('not throws missing arguments', function () {
                expect(function () {
                    helper.render('filepath.js', handlebarsOptions);
                }).not.to.throw('missing arguments');
            });
            it('call mustacher hasOptions once', function(){
                sinon.spy(mustacher, 'hasOptions');
                helper.register();
                helper.render('filepath.js', handlebarsOptions);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
            it('handlebars createFrame called', function () {
                sinon.spy(handlebars, 'createFrame');
                helper.register();
                helper.render('filepath.js', handlebarsOptions);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
        });

    });

}());
