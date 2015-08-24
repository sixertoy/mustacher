/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module, process, __dirname, console */
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
                },
                context: {}
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
        assign = require('lodash.assign'),
        handlebars = require('handlebars'),
        isempty = require('lodash.isempty'),
        toarray = require('lodash.toarray'),
        isstring = require('lodash.isstring'),
        isplainobject = require('lodash.isplainobject');

    mustacher = function (str, context, data) {
        var template;
        if (arguments.length < 1 || !isstring(str) || isempty(str)) {
            throw new Error('missing arguments');
        }
        if (!_isRegistered) {
            mustacher.register();
        }
        context = context || {};
        _defaults.root.context = context;
        data = data ? assign(_defaults, data) : _defaults;
        try {
            template = handlebars.compile(str, {
                trackIds: false
            });
            return template(context, {
                data: data
            }).trim();
        } catch (e) {
            console.log(e.stack);
            throw new Error('Mustacher error');
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
