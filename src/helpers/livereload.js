/**
 * Grunt Mustacher
 * https://github.com/malas34/grunt-mustacher
 *
 * Copyright (c) 2014 Matthieu Lassalvy
 * Licensed under the MIT license.
 *
 * HANDLEBARS
 * @see http://handlebarsjs.com/
 *
 */
/*jslint indent: 4 */
/*global module, require */
(function () {

    'use strict';

    var // variables
        LivereloadHelper,
        defaults = {
            port: 1337,
            debug: true
        },
        // lodash
        isnumber = require('lodash.isnumber'),
        isboolean = require('lodash.isboolean'),
        // requires
        Handlebars = require('handlebars'),
        mustacher = require('./../index'),
        isplainobject = require('lodash.isplainobject');

    LivereloadHelper = function () {};

    LivereloadHelper.prototype.register = function () {
        Handlebars.registerHelper('$livereload', this.render.bind(this));
    };

    LivereloadHelper.prototype.render = function (port, debug, options) {
        var result,
            args = mustacher.hasOptions(arguments);

        if (!args || args.length < 1) {
            throw new Error('missing arguments');
        }
        // parse args
        if (args.length < 2) {
            options = port;
            port = defaults.port;
            debug = defaults.debug;
        }
        if (args.length < 3) {
            options = debug;
        }
        if (args.length < 3 && isboolean(port)) {
            debug = port;
            port = defaults.port;
        } else if (args.length < 3 && isnumber(port)) {
            debug = defaults.debug;
        }
        // execute
        result = '';
        port = parseFloat(port);
        if (debug) {
            result += '<!-- livereload: use only in development environment -->';
            result += '<script src="http://localhost:' + port + '/livereload.js"></script>';
            result += '<!-- endof livereload -->';
            result = new Handlebars.SafeString(result);
        }
        return result;
    };

    module.exports = LivereloadHelper;

}());
