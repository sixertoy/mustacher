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

    var LivereloadHelper,
        Handlebars = require('handlebars'),
        mustacher = require('./../mustacher'),
        isplainobject = require('lodash.isplainobject');

    LivereloadHelper = function () {};

    LivereloadHelper.prototype.register = function () {
        Handlebars.registerHelper('$livereload', this.render.bind(this));
    };

    LivereloadHelper.prototype.render = function (port, options) {
        var result, args = mustacher.hasOptions(arguments);
        if (!args || args.length < 1) {
            throw new Error('Livereload Helper arguments is missing');
        }

        if (isplainobject(port) && args.length < 2) {
            options = port;
            port = 1337;
        }
        port = parseFloat(port);

        // if(Grunt.option('debug')){
        result = '<script src="http://localhost:' + port + '/livereload.js"></script>';
        // }
        return new Handlebars.SafeString(result);

    };

    module.exports = LivereloadHelper;

}());
