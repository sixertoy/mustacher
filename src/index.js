/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, process, __dirname */
(function () {

    'use strict';

    var // variables
        mustacher,
        _isRegistered = false,
        _defaults = { // handlebars config
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
        },
        _helpers = [
            'livereload',
            'conditions',
            'timestamp',
            'include',
            'literal',
            'repeat',
            'random',
            'image',
            'equal'
        ],
        // requires
        path = require('path'),
        handlebars = require('handlebars'),
        isempty = require('lodash.isempty'),
        toarray = require('lodash.toarray'),
        isstring = require('lodash.isstring'),
        isplainobject = require('lodash.isplainobject');

    mustacher = function (str, context) {
        if (arguments.length < 1 || !isstring(str) || isempty(str)) {
            throw new Error('missing arguments');
        }
        if (!_isRegistered) {
            mustacher.register();
        }
        context = context || {};
        return handlebars.compile(str, {
            trackIds: false
        })(context, {
            data: _defaults
        }).trim();
    };

    mustacher.register = function (helpers) {
        var helper, Proto;
        (helpers || _helpers).forEach(function (name) {
            Proto = require(path.join(__dirname, 'helpers', name));
            helper = new Proto();
            helper.register();
        });
        _isRegistered = true;
    };

    /**

     * Mustacher
     *
     */
    mustacher.hasOptions = function (args) {
        if (arguments.length < 1 || isempty(args)) {
            return false;
        }
        args = toarray(args);
        return isplainobject(args[args.length - 1]) && args[args.length - 1].hasOwnProperty('name') ? args : false;
    };

    module.exports = mustacher;

}());
