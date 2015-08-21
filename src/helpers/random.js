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

    var RandomHelper,
        defaults = {
            min: 0,
            max: 1,
            rounded: false
        },
        Handlebars = require('handlebars'),
        random = require('lodash.random'),
        isnumber = require('lodash.isnumber'),
        mustacher = require('./../index'),
        isboolean = require('lodash.isboolean');

    RandomHelper = function () {};

    RandomHelper.prototype.register = function () {
        Handlebars.registerHelper('$random', this.render.bind(this));
    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RandomHelper.prototype.render = function (min, max, rounded, options) { // jshint ignore:line
        var tmp,
            args = mustacher.hasOptions(arguments);
        if (!args) {
            throw new Error('missing arguments');
        }
        if (args.length < 2) {
            options = min;
            min = defaults.min;
            max = defaults.max;
            rounded = defaults.rounded;
        } else if (args.length < 3 && isboolean(min)) {
            options = max;
            rounded = min;
            min = defaults.min;
            max = defaults.max;
        } else if (args.length < 3 && isnumber(min)) {
            options = max;
            max = defaults.max;
            rounded = defaults.rounded;
        } else if (args.length < 4) {
            options = rounded;
            rounded = defaults.rounded;
        }
        if (!isnumber(min) || !isnumber(max) || !isboolean(rounded)) {
            throw new Error('missing arguments');
        }
        //
        // inversion si max inferieur a min
        if (isnumber(min) && isnumber(max) && (min >= max)) {
            tmp = min;
            min = max;
            max = tmp;
        }
        return random(min, max, !rounded);
    };

    module.exports = RandomHelper;

}());
