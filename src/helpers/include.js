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
        fs = require('fs'),
        path = require('path'),
        exists = require('path-exists'),
        Handlebars = require('handlebars'),
        mustacher = require('./../mustacher'),
        isstring = require('lodash.isstring');
    IncludeHelper = function () {};
    IncludeHelper.prototype.register = function () {
        Handlebars.registerHelper('$include', this.render.bind(this));
    };
    IncludeHelper.prototype.render = function (filepath, options) {
        var data,
            output = 'Unable to load file',
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 2 || !isstring(filepath)) {
            throw new Error('missing arguments');
        }
        // recuperation des data
        data = Handlebars.createFrame(options.data || {});
        // transformation du filepath en absolut
        filepath = path.join(data.root.cwd, data.root.partials.src, filepath);
        filepath += data.root.partials.ext;
        // test si le fichier existe
        if (!exists.sync(filepath)) {
            filepath = path.relative(data.root.cwd, filepath);
            output = '<!-- ' + filepath + ' -->' + LF + output + LF + '<!-- endof ' + filepath + ' -->';
        } else {
            output = fs.readFileSync(filepath, {
                encoding: 'utf8'
            }).trim();
            output = Handlebars.compile(output);
            output = output({}, {
                data: data
            });
        }
        return new Handlebars.SafeString(output.trim());
    };
    module.exports = IncludeHelper;
}());
