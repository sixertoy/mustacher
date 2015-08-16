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
        lodash = require('lodash'),
        Utils = require('./../mustacher-utils'),
        Handlebars = require('handlebars');

    TimestampHelper = function () {};

    TimestampHelper.prototype.register = function () {
        Handlebars.registerHelper('$timestamp', this.render.bind(this));
    };

    TimestampHelper.prototype.render = function (count, options) {
        var data, plus = 0,
            args = Utils.hasOptions(arguments);
        if (!args || args.length < 1) {
            throw new Error('Timestamp helper missing arguments');
        }
        if (args.length < 2) {
            options = count;
        } else {
            count = parseFloat(count);
            if (lodash.isNumber(count)) {
                plus = Math.round(count);
            }
        }
        if(options.data){
            data = Handlebars.createFrame(options.data);
            data.time = ((!Date.now) ? new Date().getTime() : Date.now()) + plus;
        }
        return data.time;
    };

    module.exports = TimestampHelper;

}());
