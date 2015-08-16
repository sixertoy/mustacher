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
        lodash = require('lodash'),
        Utils = require('./../mustacher-utils'),
        Handlebars = require('handlebars');

    LivereloadHelper = function () {};

    LivereloadHelper.prototype.register = function () {
        Handlebars.registerHelper('$livereload', this.render.bind(this));
    };

    LivereloadHelper.prototype.render = function (port, options) {
        var result, args = Utils.hasOptions(arguments);
        if (!args || args.length < 1) {
            throw new Error('Livereload Helper arguments is missing');
        }

        if (lodash.isObject(port) && args.length < 2) {
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
