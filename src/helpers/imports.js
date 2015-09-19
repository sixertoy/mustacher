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
/*jslint indent: 4, nomen: true */
/*global module, require */
(function () {

    'use strict';

    var ImportsHelper,
        Handlebars = require('handlebars'),
        mustacher = require('./../mustacher');

    ImportsHelper = function () {};

    ImportsHelper.prototype.register = function () {
        Handlebars.registerHelper('$js', this.render.bind(this));
        Handlebars.registerHelper('$css', this.render.bind(this));
    };

    ImportsHelper.prototype.render = function (file, metas, options) {
        var data, result, parsed, k,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 2) {
            throw new Error('missing arguments');
        }
        if (args.length < 3) {
            options = metas;
            metas = '';
        }
        if (metas !== '') {
            try {
                parsed = JSON.parse(metas);
                metas = '';
                for (k in parsed) {
                    if (parsed.hasOwnProperty(k)) {
                        metas = k + '="' + parsed[k] + '"';
                    }
                }
            } catch (e) {
                throw new Error('unable to parse metas');
            }
        }
        switch (options.name) {
            case '$js':
                result = '<script type="text/javascript" src="' + file + '.js ' + metas + ' "></script>';
                break;
            case '$css':
                result = '<link rel="stylesheet" type="text/css" href="' + file + '.css" ' + metas + ' />';
                break;
        }
        return new Handlebars.SafeString(result);
    };

    module.exports = ImportsHelper;

}());
