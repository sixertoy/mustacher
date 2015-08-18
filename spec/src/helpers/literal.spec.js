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
        literal = require(path.join(cwd, 'src/helpers/literal.js'));
    describe('literal', function() {
        beforeEach(function() {});
        afterEach(function() {});
        describe('register', function() {
            it('call handlebars registerHelper 3 times', function() {});
        });
        describe('render', function() {
            it('throw no arguments', function() {});
            it('not throw no arguments', function() {});
            it('call mustacher hasoptions once', function() {});
            it('call handlebars createframe once', function() {});
        });
        describe('delimiters', function() {
            it('returns {{', function() {});
            it('returns }}', function() {});
            it('returns exotic user define delim [*', function() {});
            it('returns exotic user define delim *]', function() {});
        });
    });
}());