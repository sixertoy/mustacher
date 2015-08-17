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
        Handlebars = require('handlebars'),
        isequal = require('lodash.isequal'),
        mustacher = require('./../mustacher');

    EqualHelper = function () {};

    EqualHelper.prototype.register = function () {
        Handlebars.registerHelper('equal', this.render.bind(this));
    };

    EqualHelper.prototype.render = function (lvalue, rvalue, options) {
        var data,
            context = {},
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 3) {
            throw new Error('EqualHelper parameters is missing');
        }
        data = Handlebars.createFrame(options.data || {});
        if (!isequal(lvalue, rvalue)) {
            return options.inverse(context, { data: data });
        } else {
            return options.fn(context, { data: data });
        }
    };

    module.exports = EqualHelper;

}());
