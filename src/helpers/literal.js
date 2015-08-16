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
        Utils = require('./../mustacher-utils'),
        Handlebars = require('handlebars');

    LiteralHelper = function () {};

    LiteralHelper.prototype.register = function () {
        Handlebars.registerHelper('$ldim', this.render.bind(this));
        Handlebars.registerHelper('$rdim', this.render.bind(this));
        Handlebars.registerHelper('raw', this.render.bind(this));
    };

    LiteralHelper.prototype.render = function (options) {

        var data,
            root,
            args = Utils.hasOptions(arguments);

        if (!args || args.length < 1) {
            throw new Error('Literal Helper arguments is missing');
        }

        data = Handlebars.createFrame(options.data || {});
        root = data.root;

        switch (options.name) {
        case '$ldim':
            return root.delimiter.ldim;
        case '$rdim':
            return root.delimiter.rdim;
        case 'raw':
            return options.fn();
        }

    };

    module.exports = LiteralHelper;

}());
