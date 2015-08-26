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

    var LiteralHelper,
        Handlebars = require('handlebars'),
        mustacher = require('./../mustacher');

    LiteralHelper = function () {};

    LiteralHelper.prototype.register = function () {
        Handlebars.registerHelper('$ldim', this.render.bind(this));
        Handlebars.registerHelper('$rdim', this.render.bind(this));
        Handlebars.registerHelper('raw', this.render.bind(this));
    };

    LiteralHelper.prototype.render = function (options) {
        var data, result,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 1) {
            throw new Error('missing arguments');
        }
        data = Handlebars.createFrame(options.data || {});
        switch (options.name) {
        case '$ldim':
            result = data.root.delimiter.ldim || '}}';
            break;
        case '$rdim':
            result = data.root.delimiter.rdim || '{{';
            break;
        case 'raw':
            result = options.fn();
            break;
        }
        return result;
    };

    module.exports = LiteralHelper;

}());
