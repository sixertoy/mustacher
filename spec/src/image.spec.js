/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
    'use strict';
    var //variables
        helper, result,
        cwd = process.cwd(),
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        handlebars = require('handlebars'),
        Image = require(path.join(cwd, 'src/helpers/image.js'));
    describe('image', function() {
        beforeEach(function() {
            helper = new Image();
        });
        afterEach(function() {});
        describe('register', function() {
            it('handlebars registerHelper called once', function() {
                sinon.spy(handlebars, 'registerHelper');
                helper.register();
                expect(handlebars.registerHelper.callCount).to.equal(1);
                handlebars.registerHelper.restore();
            });
        });
        describe('render', function() {
            it('throws missing arguments', function() {
                helper.register();
                expect(function(){
                    helper.render();
                }).to.throw('missing arguments');
            });
            it('not throws missing arguments', function() {
                helper.register();
                expect(function(){
                    helper.render({name: '$image'});
                }).not.to.throw('missing arguments');
            });
        });
        describe('returns an image of 300x300', function() {
            it('no width no height (300 default)', function() {
                helper.register();
                result = helper.render({name: '$image'});
                expect(result.toString()).to.equal('<img src="//placehold.it/300x300" alt="" title="" />');
            });
            it('width 300 no height (300 default)', function() {
                helper.register();
                result = helper.render(300, {name: '$image'});
                expect(result.toString()).to.equal('<img src="//placehold.it/300x300" alt="" title="" />');
            });
        });
        describe('returns an image of 400x400', function() {
            it('width 400 no height (same as width)', function() {
                helper.register();
                result = helper.render(400, {name: '$image'});
                expect(result.toString()).to.equal('<img src="//placehold.it/400x400" alt="" title="" />');
            });
        });
        describe('returns an image of 500x220', function() {
            it('width 500 height 220', function() {
                helper.register();
                result = helper.render(500, 220, {name: '$image'});
                expect(result.toString()).to.equal('<img src="//placehold.it/500x220" alt="" title="" />');
            });
        });
    });
}());
