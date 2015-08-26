/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var //variables
        helper, result,
        cwd = process.cwd(),
        handlebarsOptions = {
            inverse: function (args) {
                return false;
            },
            fn: function (args) {
                return true;
            },
            name: 'equal',
            data: {
                root: {
                    cwd: '',
                    partials: {
                        src: '',
                        ext: ''
                    }
                }
            },
            _parent: {}
        },
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        handlebars = require('handlebars'),
        mustacher = require(path.join(cwd, 'src/mustacher.js')),
        Include = require(path.join(cwd, 'src/helpers/include.js'));

    describe('equal', function () {

        beforeEach(function () {
            helper = new Include();
        });
        afterEach(function () {});

        describe('register', function () {
            it('handlebars registerHelper called once', function () {
                sinon.spy(handlebars, 'registerHelper');
                helper.register();
                expect(handlebars.registerHelper.callCount).to.equal(1);
                handlebars.registerHelper.restore();
            });
        });

        describe('render', function () {
            it('throws missing arguments', function () {
                expect(function () {
                    helper.render();
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render('file');
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render('file', false);
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render(true, handlebarsOptions);
                }).to.throw('missing arguments');
            });
            it('handlebars createFrame called', function () {
                sinon.spy(handlebars, 'createFrame');
                helper.register();
                helper.render('file', handlebarsOptions);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
            it('call mustacher hasOptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                helper.register();
                helper.render('path/to/file', handlebarsOptions);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
        });

        describe('with context', function () {
            xit('string with context defined', function () {
                helper.register();
                result = helper.render('toto', 'toto', '{"prop": "value"}', handlebarsOptions);
                expect(result).to.equal(true);
            });
        });
    });

}());