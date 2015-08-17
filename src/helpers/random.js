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
        Handlebars = require('handlebars'),
        random = require('lodash.random'),
        isnumber = require('lodash.isnumber'),
        mustacher = require('./../mustacher'),
        isboolean = require('lodash.isboolean');

    RandomHelper = function () {};

    RandomHelper.prototype.register = function () {
        Handlebars.registerHelper('$random', this.render.bind(this));
    };

    /**
     * @TODO ajout d'un string comme arg pour parametrage custom
     * @see htt://placehold.it
     */
    RandomHelper.prototype.render = function (min, max, round, options) { // jshint ignore:line
        var args = mustacher.hasOptions(arguments);
        if (!args) {
            throw new Error('RandomHelper arguments is missing');
        }

        if (args.length < 2) {
            return random(0, 1, false);
        }

        if (args.length < 3) {
            if (isnumber(min)) {
                return random(0, min, false);
            } else if (isboolean(min)) {
                return random(0, 1, min);
            } else {
                throw new Error('Random helper unknow arguments');
            }
        }

        if (args.length < 4) {
            if (isnumber(max)) {
                return random(min, max, false);
            } else if (isboolean(max)) {
                return random(0, min, max);
            } else {
                throw new Error('Random helper unknow arguments');
            }
        }

        return random(min, max, round);
    };

    module.exports = RandomHelper;

}());
