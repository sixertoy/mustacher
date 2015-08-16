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

    var EqualHelper,
        lodash = require('lodash'),
        Utils = require('./../mustacher-utils'),
        Handlebars = require('handlebars');

    EqualHelper = function () {};

    EqualHelper.prototype.register = function () {
        Handlebars.registerHelper('equal', this.render.bind(this));
    };

    EqualHelper.prototype.render = function (lvalue, rvalue, options) {
        var data,
            context = {},
            args = Utils.hasOptions(arguments);
        if (!args || args.length < 3) {
            throw new Error('EqualHelper parameters is missing');
        }
        data = Handlebars.createFrame(options.data || {});
        if (!lodash.isEqual(lvalue, rvalue)) {
            return options.inverse(context, { data: data });
        } else {
            return options.fn(context, { data: data });
        }
    };

    module.exports = EqualHelper;

}());
