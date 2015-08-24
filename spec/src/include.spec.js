/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var result, helper,
        cwd = process.cwd(),
        path = require('path'),
        expect = require('chai').expect,
        sinon = require('sinon'),
        handlebars = require('handlebars'),
        isstring = require('lodash.isstring'),
        mustacher = require(path.join(cwd, 'src/index.js')),
        Include = require(path.join(cwd, 'src/helpers/include.js')),
        handlebarsOptions = {
            name: '$include',
            data: {
                root: {
                    cwd: process.cwd(),
                    delimiter: {
                        ldim: '{{',
                        rdim: '}}'
                    },
                    partials: {
                        depth: 2,
                        ext: '.hbs',
                        src: 'partials/'
                    }
                }
            }
        };

    describe('include', function () {

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
                    helper.render('filepath.js', handlebarsOptions);
                }).not.to.throw('missing arguments');
            });
            it('call mustacher hasOptions once', function () {
                sinon.spy(mustacher, 'hasOptions');
                helper.register();
                helper.render('filepath', handlebarsOptions);
                expect(mustacher.hasOptions.callCount).to.equal(1);
                mustacher.hasOptions.restore();
            });
            it('handlebars createFrame called', function () {
                sinon.spy(handlebars, 'createFrame');
                helper.register();
                helper.render('filepath.js', handlebarsOptions);
                expect(handlebars.createFrame.callCount).to.equal(1);
                handlebars.createFrame.restore();
            });
        });

        describe('include file', function () {
            it('returns file not exists tag', function () {
                var head = path.join(handlebarsOptions.data.root.partials.src, 'filepath.js' + handlebarsOptions.data.root.partials.ext);
                result = helper.render('filepath.js', handlebarsOptions);
                expect(result.toString()).to.equal('<!-- ' + head + ' -->\nUnable to load file\n<!-- endof ' + head + ' -->');
            });
            it('returns a string', function () {
                var head = path.join(handlebarsOptions.data.root.partials.src, 'head' + handlebarsOptions.data.root.partials.ext);
                result = helper.render('head', handlebarsOptions);
                expect(isstring(result.toString())).to.equal(true);
                expect(result.toString()).not.to.equal('<!-- ' + head + ' -->\nUnable to load file\n<!-- endof ' + head + ' -->');
            });
            it('returns an equal content', function () {
                handlebarsOptions.data.root.context = {
                    file: 'head'
                };
                result = helper.render('head', handlebarsOptions);
                expect(result.toString()).to.equal('<!-- file is included -->head');
            });
            it('returns an equal content', function () {
                handlebarsOptions.data.root.context = {
                    file: 'head'
                };
                result = helper.render('sub_include', handlebarsOptions);
                expect(result.toString()).to.equal('<!-- sub file is included --><!-- file is included -->head');
            });
            it('include in a loop', function () {
                var expected = '<p><!-- file is included -->head</p><p><!-- file is included -->head</p>';
                result = mustacher('{{#repeat 2}}<p>{{$include \'head\'}}</p>{{/repeat}}', {
                    file: 'head'
                }, handlebarsOptions);
                expect(result.toString()).to.equal(expected);
            });
            it('include in a loop local variable', function () {
                var expected = '<p><!-- loop -->0</p><p><!-- loop -->1</p>';
                result = mustacher('{{#repeat 2}}<p>{{$include \'include_in_loop\'}}</p>{{/repeat}}', {
                    file: 'head'
                }, handlebarsOptions);
                expect(result.toString()).to.equal(expected);
            });
        });

    });

}());
