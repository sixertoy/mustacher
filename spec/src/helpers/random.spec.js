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
        random = require(path.join(cwd, 'src/helpers/random.js'));
    describe('random', function() {
        beforeEach(function() {});
        afterEach(function() {});
        describe('register', function() {
            it('call handlebars registerHelper once', function() {});
        });
        describe('render', function() {
            it('throw no arguments', function() {});
            it('not throw no arguments', function() {});
            it('call mustacher hasoptions once', function() {});
        });
        describe('render with arguments', function() {
            it('returns a number between 0 and 1', function() {});
            it('returns a number between 0 and 2', function() {});
            it('returns a number between 1 and 2', function() {});
            it('returns a number between 100 and 200', function() {});
            it('returns a number between 0 and 1 rounded', function() {});
            it('returns a number between 0 and 2 rounded', function() {});
            it('returns a number between 1 and 2 rounded', function() {});
            it('returns a number between 100 and 200 rounded', function() {});
        });
    });
}());