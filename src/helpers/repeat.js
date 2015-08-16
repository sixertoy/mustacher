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
/*global require, module */
(function () {
    'use strict';

    var RepeatHelper,
        isnan = require('lodash.isnan'),
        Handlebars = require('handlebars'),
        mustacher = require('./../mustacher');

    RepeatHelper = function () {};

    RepeatHelper.prototype.register = function () {
        Handlebars.registerHelper('repeat', this.render.bind(this));
    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RepeatHelper.prototype.render = function (count, options) {
        var i, data, context,
            output = '',
            args = mustacher.hasOptions(arguments);
        if (!args || args.length <= 1) {
            throw new Error('Repeat arguments is missing');
        }
        count = parseFloat(count);
        if (isnan(count)) {
            throw new Error('Repeat arguments is not valid');
        }
        for (i = 0; i < count; i++) {
            if (options.data) {
                data = Handlebars.createFrame(options.data || {});
                data.index = i;
                data.first = (i === 0);
                data.last = (i === (count - 1));
                data.odd = ((i % 2) ? false : true); // pair
                data.even = ((i % 2) ? true : false); // impair
            }
            context = {
                of: count,
                count: (i + 1),
                class: (data.odd ? 'odd' : 'even') + (data.last ? ' last' : '') + (data.first ? ' first' : '')
            };
            output += options.fn(context, {
                data: data
            });
        }
        return output;
    };

    module.exports = RepeatHelper;

}());
