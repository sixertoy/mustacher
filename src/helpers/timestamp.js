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
/*jslint plusplus: true, indent: 4 */
/*global module, require */
(function () {

    'use strict';

    var TimestampHelper,
        Handlebars = require('handlebars'),
        mustacher = require('./../index'),
        isnumber = require('lodash.isnumber');

    TimestampHelper = function () {};

    TimestampHelper.prototype.register = function () {
        Handlebars.registerHelper('$timestamp', this.render.bind(this));
    };

    TimestampHelper.prototype.render = function (count, options) {
        var data, plus = 0,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 1) {
            throw new Error('missing arguments');
        }
        if (args.length < 2) {
            options = count;
        } else {
            count = parseFloat(count);
            if (isnumber(count)) {
                plus = Math.round(count);
            }
        }
        data = Handlebars.createFrame(options.data || {});
        data.time = ((!Date.now) ? new Date().getTime() : Date.now()) + plus;
        return data.time;
    };

    module.exports = TimestampHelper;

}());
