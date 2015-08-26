/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        sinon = require('sinon'),
        conditions = require(path.join(cwd, 'src/helpers/conditions.js'));

    describe('conditions', function () {

        beforeEach(function () {});
        afterEach(function () {});
        describe('register', function () {
            it('handlebars registerHelper called twice', function () {});
        });

        describe('render', function () {
            it('throws missing arguments', function () {});
            it('not throws missing arguments', function () {});
            it('handlebars createFrame called', function () {});
        });

        describe('or', function () {
            it('return true', function () {});
            it('return false', function () {});
        });

        describe('and', function () {
            it('return true', function () {});
            it('return false', function () {});
        });

    });

}());