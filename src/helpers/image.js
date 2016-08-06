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

    var ImageHelper,
        Handlebars = require('handlebars'),
        isnumber = require('lodash.isnumber'),
        mustacher = require('./../mustacher');

    ImageHelper = function () {};

    ImageHelper.prototype.register = function () {
        Handlebars.registerHelper('$image', this.render.bind(this));
    };

    ImageHelper.prototype.render = function (width, height, options) {

        var result = '',
            context = options || {},
            args = mustacher.hasOptions(arguments),
            data = Handlebars.createFrame(options.data || {});

        if (!args || args.length < 1) {
            throw new Error('missing arguments');
        }
        if (args.length < 2) {
            options = width;
            height = false;
            width = false;
        } else if (args.length === 2) {
            options = height;
            height = false;
        }
        width = isnumber(width) ? width : 300;
        result = '//placehold.it/' + width;
        if (data.root.hasOwnProperty('image') && data.root.image) {
            result = (data.root.image + width);
        }
        if (isnumber(height)) {
            result += 'x' + height;
        } else {
            result += 'x' + width;
        }
        return new Handlebars.SafeString('<img src="' + result + '" alt="" title="" />');
    };

    module.exports = ImageHelper;

}());
