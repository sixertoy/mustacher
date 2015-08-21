/*jshint unused: false */
/*jslint indent: 4, nomen: true */
/*global __dirname, jasmine, process, require, define, describe, xdescribe, it, xit, expect, beforeEach, afterEach, afterLast, console */
(function () {
    'use strict';
    var result,
        cwd = process.cwd(),
        path = require('path'),
        noop = require('noop'),
        sinon = require('sinon'),
        expect = require('chai').expect,
        mustacher = require(path.join(cwd, 'src/index.js')),
        // helpers
        conditions = require(path.join(cwd, 'src/helpers/conditions.js')),
        equal = require(path.join(cwd, 'src/helpers/equal.js')),
        image = require(path.join(cwd, 'src/helpers/image.js')),
        include = require(path.join(cwd, 'src/helpers/include.js')),
        literal = require(path.join(cwd, 'src/helpers/literal.js')),
        livereload = require(path.join(cwd, 'src/helpers/livereload.js')),
        // lorem = require(path.join(cwd, 'src/helpers/lorem.js')),
        random = require(path.join(cwd, 'src/helpers/random.js')),
        repeat = require(path.join(cwd, 'src/helpers/repeat.js')),
        timestamp = require(path.join(cwd, 'src/helpers/timestamp.js'));

    function stubArguments() {
        return arguments;
    }

    describe('mustacher', function () {

        beforeEach(function () {});
        afterEach(function () {});

        describe('render', function () {
            it('throw if no argument', function () {
                expect(function () {
                    mustacher();
                }).to.throw('missing arguments');
            });
            it('should return helloworld', function () {
                result = mustacher('hello world!');
                expect(result).to.equal('hello world!');
            });
            it('should return \'\' no context', function () {
                result = mustacher('{{content}}');
                expect(result).to.equal('');
            });
            it('should return \'\' empty context', function () {
                result = mustacher('{{content}}', {});
                expect(result).to.equal('');
            });
            it('should return helloworld', function () {
                result = mustacher('{{content}}', {
                    content: 'hello world!'
                });
                expect(result).to.equal('hello world!');
            });
            it('should return <h1>helloworld</h1>', function () {
                result = mustacher('<h1>{{content}}</h1>', {
                    content: 'hello world!'
                });
                expect(result).to.equal('<h1>hello world!</h1>');
            });
        });

        describe('hasOptions', function () {
            it('returns false if no arguments', function () {
                expect(mustacher.hasOptions()).to.equal(false);
            });
            it('returns arguments is empty', function () {
                expect(mustacher.hasOptions(stubArguments())).to.equal(false);
            });
            it('returns false is not a plainobject', function () {
                expect(mustacher.hasOptions(stubArguments([1, 2, 3]))).to.equal(false);
            });
            it('returns options property name is not defined', function () {
                expect(mustacher.hasOptions(stubArguments({
                    obj: 'no name prop'
                }))).to.equal(false);
            });
            it('expect to returns array of arguments', function () {
                expect(mustacher.hasOptions(stubArguments({
                    name: 'name prop'
                }))).to.deep.equal([{
                    name: 'name prop'
                }]);
            });
        });

        describe('register', function () {
            it('call register on include helper', function () {
                var helpers = ['include'],
                    spy = sinon.stub(helpers, 'forEach');
                mustacher.register(helpers);
                expect(spy.callCount).to.equal(1);
                spy.restore();
            });
            it('call register on include helper/image/repeat', function () {
                var spies = [
                        sinon.stub(image.prototype, 'register'),
                        sinon.stub(repeat.prototype, 'register'),
                        sinon.stub(include.prototype, 'register')
                    ],
                    helpers = ['include', 'image', 'repeat'];
                mustacher.register(helpers);
                spies.forEach(function (spy) {
                    expect(spy.callCount).to.equal(1);
                    spy.restore();
                });
            });
            it('call register on defaults helpers', function () {
                var spies = [
                    sinon.stub(conditions.prototype, 'register'),
                    sinon.stub(equal.prototype, 'register'),
                    sinon.stub(image.prototype, 'register'),
                    sinon.stub(include.prototype, 'register'),
                    sinon.stub(literal.prototype, 'register'),
                    sinon.stub(livereload.prototype, 'register'),
                    sinon.stub(random.prototype, 'register'),
                    sinon.stub(repeat.prototype, 'register'),
                    sinon.stub(timestamp.prototype, 'register')
                ];
                mustacher.register();
                spies.forEach(function (spy) {
                    expect(spy.callCount).to.equal(1);
                    spy.restore();
                });
            });
        });

    });

}());
