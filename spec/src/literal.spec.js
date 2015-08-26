/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var //variables
        helper, result,
        cwd = process.cwd(),
        defaults = {
            name: '$rdim',
            fn: function () {},
            data: {
                root: {
                    delimiter: {
                        ldim: '{{',
                        rdim: '}}'
                    }
                }
            }
        },
        // requires
        path = require('path'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        handlebars = require('handlebars'),
        mustacher = require(path.join(cwd, 'src/mustacher.js')),
        Literal = require(path.join(cwd, 'src/helpers/literal.js'));
    describe('literal', function () {
        beforeEach(function () {
            helper = new Literal();
        });
        afterEach(function () {});
        describe('register', function () {
            it('call handlebars registerHelper 3 times', function () {
                sinon.spy(handlebars, 'registerHelper');
                helper.register();
                expect(handlebars.registerHelper.callCount).to.equal(3);
                handlebars.registerHelper.restore();
            });
        });
        describe('render', function () {
            it('throw no arguments', function () {
                helper.register();
                expect(function () {
                    helper.render();
                }).to.throw('missing arguments');
            });
            it('not throw no arguments $ldim', function () {
                helper.register();
                expect(function () {
                    defaults.name = '$ldim';
                    helper.render(defaults);
                }).not.to.throw('missing arguments');
            });
            it('not throw no arguments $rdim', function () {
                helper.register();
                expect(function () {
                    defaults.name = '$rdim';
                    helper.render(defaults);
                }).not.to.throw('missing arguments');
            });
            it('call mustacher hasoptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                defaults.name = '$rdim';
                helper.render(defaults);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
            it('call handlebars createframe once', function () {
                sinon.spy(handlebars, 'createFrame');
                defaults.name = '$rdim';
                helper.render(defaults);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
        });
        describe('delimiters', function () {
            it('returns {{', function () {
                defaults.name = '$ldim';
                result = helper.render(defaults);
                expect(result).to.equal('{{');
            });
            it('returns }}', function () {
                defaults.name = '$rdim';
                result = helper.render(defaults);
                expect(result).to.equal('}}');
            });
            it('returns exotic user define delim [*', function () {
                defaults.name = '$ldim';
                defaults.data.root.delimiter.ldim = '[*';
                result = helper.render(defaults);
                expect(result).to.equal('[*');
            });
            it('returns exotic user define delim *]', function () {
                defaults.name = '$rdim';
                defaults.data.root.delimiter.rdim = '*]';
                result = helper.render(defaults);
                expect(result).to.equal('*]');
            });
        });
    });
}());