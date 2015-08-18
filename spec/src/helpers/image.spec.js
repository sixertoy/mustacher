/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function() {
    'use strict';
    var //variables
        cwd = process.cwd(),
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        image = require(path.join(cwd, 'src/helpers/image.js'));
    describe('image', function() {
        beforeEach(function() {});
        afterEach(function() {});
        describe('register', function() {
            it('handlebars registerHelper called once', function() {});
        });
        describe('render', function() {
            it('throws missing arguments', function() {});
            it('not throws missing arguments', function() {});
        });
        describe('returns an image of 300x300', function() {
            it('no width no height (300 default)', function() {});
            it('width 300 no height (300 default)', function() {});
        });
        describe('returns an image of 400x400', function() {
            it('width 400 no height (same as width)', function() {});
        });
        describe('returns an image of 500x220', function() {
            it('width 500 height 220', function() {});
        });
    });
}());