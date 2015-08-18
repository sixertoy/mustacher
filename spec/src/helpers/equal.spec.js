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
        equal = require(path.join(cwd, 'src/helpers/equal.js'));
    describe('equal', function() {
        beforeEach(function() {});
        afterEach(function() {});
        describe('register', function() {
            it('handlebars registerHelper called once', function() {});
        });
        describe('render', function() {
            it('throws missing arguments', function() {});
            it('not throws missing arguments', function() {});
            it('handlebars createFrame called', function() {});
        });
        describe('isequal', function() {
            it('return true', function() {});
            it('return false', function() {});
        });
    });
}());