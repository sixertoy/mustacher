/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, process, __dirname, console */
(function () {

    'use strict';

    var // variables
        mustacher,
        _options = {},
        _isRegistered = false,
        _defaults = {
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
        merge = require('lodash.merge'),
        handlebars = require('handlebars'),
        isempty = require('lodash.isempty'),
        toarray = require('lodash.toarray'),
        isstring = require('lodash.isstring'),
        isplainobject = require('lodash.isplainobject');

    mustacher = function (str, context, options) {
        var template;
        if (arguments.length < 1 || !isstring(str)) {
            throw new Error('missing arguments');
        }
        if (isempty(str)) {
            return str;
        }
        if (!_isRegistered) {
            mustacher.register();
        }
        context = context || {};
        _options = merge(_defaults, options || {}, context);
        try {
            template = handlebars.compile(str);
            return template(context, {
                data: {
                    root: _options
                }
            });
        } catch (e) {
            console.log(e.stack);
            throw new Error('Handlebars compile error');
        }
    };

    mustacher.register = function (helpers) {
        var helper, HelperPrototype;
        (helpers || _helpers).forEach(function (name) {
            HelperPrototype = require(path.join(__dirname, 'helpers', name));
            helper = new HelperPrototype();
            helper.register();
        });
        _isRegistered = true;
    };

    mustacher.options = function () {
        return _options;
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