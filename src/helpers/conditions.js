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

    var ConditionsHelper,
        Handlebars = require('handlebars'),
        compact = require('lodash.compact'),
        mustacher = require('./../mustacher');

    ConditionsHelper = function () {};

    ConditionsHelper.prototype.register = function () {
        Handlebars.registerHelper('or', this.render.bind(this));
        Handlebars.registerHelper('and', this.render.bind(this));
    };

    ConditionsHelper.prototype.render = function (options) {
        var result, data,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 3) {
            throw new Error('Conditions helper parameters is missing');
        }
        options = args[args.length - 1];
        data = Handlebars.createFrame(options.data || {});
        args = args.slice(0, args.length - 1);
        result = options.name === 'or' ? 1 : args.length;
        if (compact(args).length >= result) {
            return options.fn(args, {
                data: data
            });
        } else {
            return options.inverse(args, {
                data: data
            });
        }

    };

    module.exports = ConditionsHelper;

}());
