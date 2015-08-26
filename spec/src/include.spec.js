/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var //variables
        helper, result,
        cwd = process.cwd(),
        defaults = {
            inverse: function (args) {
                return false;
            },
            fn: function (args) {
                return true;
            },
            name: 'equal',
            data: {
                root: {
                    cwd: process.cwd(),
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
                    helper.render(true, defaults);
                }).to.throw('missing arguments');
            });
            it('handlebars createFrame called', function () {
                sinon.spy(handlebars, 'createFrame');
                helper.register();
                helper.render('file', defaults);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
            it('call mustacher hasOptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                helper.register();
                helper.render('path/to/file', defaults);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
            it('unable to load template', function () {
                var p = path.normalize('path/to/file');
                helper.register();
                result = helper.render(p, defaults);
                expect(result.toString()).to.equal('<!-- ' + p + ' -->\nUnable to load file\n<!-- endof ' + p + ' -->');
            });
            it('render file with no context', function () {
                var p = path.normalize('include_low');
                defaults.data.root.partials.src = 'spec/fixtures';
                defaults.data.root.partials.ext = '.hbs';
                helper.register();
                result = helper.render(p, defaults);
                expect(result.toString()).to.equal('include a template file');
            });
        });
    });

}());