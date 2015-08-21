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
    var IncludeHelper,
        LF = '\n',
        path = require('path'),
        Handlebars = require('handlebars'),
        mustacher = require('./../index'),
        isstring = require('lodash.isstring');

    IncludeHelper = function () {};


    IncludeHelper.prototype.register = function () {
        Handlebars.registerHelper('$include', this.render.bind(this));
    };

    IncludeHelper.prototype.render = function (filepath, options) {

        var data, root, content, // .hbs content
            absolute, // absolute .hbs path form system root
            relative, // relative path from cwd to .hbs
            output = 'Unable to load file',
            args = mustacher.hasOptions(arguments);

        if (!args || args.length < 2 || !isstring(filepath)) {
            throw new Error('IncludeHelper missing arguments');
        }

        data = Handlebars.createFrame(options.data || {});
        root = data.root;

        // @TODO to test file path
        absolute = path.join(root.cwd, root.partials.src, filepath);
        absolute = path.normalize(absolute + root.partials.ext);
        relative = path.relative(root.cwd, absolute);

        /*
        if (!Grunt.file.exists(relative)) {
            output = output + ' ' + relative;
            Grunt.log.error(output);
        } else {
            content = Grunt.file.read(relative);
            output = Handlebars.compile(content)(relative, {
                data: data
            }).trim();
        }
        */

        output = '<!-- ' + relative + ' -->' + LF + output + LF + '<!-- endof ' + relative + ' -->';

        return new Handlebars.SafeString(output.trim());

    };

    module.exports = IncludeHelper;

}());
