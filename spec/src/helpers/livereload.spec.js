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
        livereload = require(path.join(cwd, 'src/helpers/livereload.js'));
    describe('livereload', function() {
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
        describe('render with defaults', function() {
            it('returns debug true port 1337', function() {});
        });
        describe('render with debug setted only', function() {
            it('returns debug true port 1337', function() {});
            it('returns empty string debug false port 1337', function() {});
        });
        describe('render with port setted only', function() {
            it('returns debug true port 53739', function() {});
        });
        describe('render with port setted and debug setted', function() {
            it('returns debug true port 53739', function() {});
            it('returns empty string debug false port 53739', function() {});
        });
    });
}());