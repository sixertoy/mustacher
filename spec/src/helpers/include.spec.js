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
        include = require(path.join(cwd, 'src/helpers/include.js'));
    describe('include', function() {
        beforeEach(function() {});
        afterEach(function() {});
    });
}());