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
    });
}());