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
        timestamp = require(path.join(cwd, 'src/helpers/timestamp.js'));
    describe('timestamp', function() {
        beforeEach(function() {});
        afterEach(function() {});
        describe('register', function() {
            it('call handlebars registerHelper once', function() {});
        });
        describe('render', function() {
            it('throw no arguments', function() {});
            it('not throw no arguments', function() {});
            it('call mustacher hasoptions once', function() {});
            it('call handlebars createframe once', function() {});
        });
        describe('returns number', function() {
            it('length 13', function() {});
            it('sup a now', function() {});
            it('sup a now + 1000', function() {});
            it('inf a now + 2000', function() {});
        });
    });
}());