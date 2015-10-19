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
        mustacher = require('./../mustacher'),
        isnumber = require('lodash.isnumber'),
        isboolean = require('lodash.isboolean');

    TimestampHelper = function () {};

    TimestampHelper.prototype.register = function () {
        Handlebars.registerHelper('$timestamp', this.render.bind(this));
    };

    TimestampHelper.prototype.render = function (count, todate, options) {
        var data,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 1) {
            throw new Error('missing arguments');
        }
        if (args.length < 2) {
            options = count;
            count = 0;
            todate = false;
        } else if (args.length < 3) {
            options = todate;
            todate = isboolean(count) ? count : false;
            count = isnumber(count) ? count : 0;
        }
        data = Handlebars.createFrame(options.data || {});
        if (todate) {
            data.time = ((!Date.now) ? new Date().getTime() : Date.now()) + Math.round(count);
        } else {
            data.time = ((!Date.now) ? new Date().getTime() : Date.now()) + Math.round(count);
        }
        return data.time;
    };

    module.exports = TimestampHelper;

}());