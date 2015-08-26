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
            data: {}
        },
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        handlebars = require('handlebars'),
        mustacher = require(path.join(cwd, 'src/mustacher.js')),
        Equal = require(path.join(cwd, 'src/helpers/equal.js'));

    describe('equal', function () {

        beforeEach(function () {
            helper = new Equal();
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
                    helper.render(true);
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render(true, false);
                }).to.throw('missing arguments');
                expect(function () {
                    helper.render(true, handlebarsOptions);
                }).to.throw('missing arguments');
            });
            it('not throws missing arguments', function () {
                expect(function () {
                    helper.render(true, false, handlebarsOptions);
                }).not.to.throw('missing arguments');
            });
            it('handlebars createFrame called', function () {
                sinon.spy(handlebars, 'createFrame');
                helper.register();
                helper.render(true, false, handlebarsOptions);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
            it('call mustacher hasOptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                helper.register();
                helper.render(true, false, handlebarsOptions);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
        });

        describe('with context', function () {
            it('string with context defined', function () {
                helper.register();
                result = helper.render('toto', 'toto', '{"prop": "value"}', handlebarsOptions);
                expect(result).to.equal(true);
            });
        });

        describe('isequal', function () {
            it('return true', function () {
                helper.register();
                result = helper.render('toto', 'toto', handlebarsOptions);
                expect(result).to.equal(true);
                result = helper.render(123, 123, handlebarsOptions);
                expect(result).to.equal(true);
                result = helper.render({}, {}, handlebarsOptions);
                expect(result).to.equal(true);
            });
            it('return false', function () {
                helper.register();
                result = helper.render('tata', 'toto', handlebarsOptions);
                expect(result).to.equal(false);
                result = helper.render(1234, 123, handlebarsOptions);
                expect(result).to.equal(false);
                result = helper.render({name: 'noequal'}, {}, handlebarsOptions);
                expect(result).to.equal(false);
            });
        });

    });

}());
