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
        handlebars = require('handlebars'),
        mustacher = require('./../mustacher'),
        isstring = require('lodash.isstring');
    IncludeHelper = function () {};
    IncludeHelper.prototype.register = function () {
        handlebars.registerHelper('$include', this.render.bind(this));
    };
    IncludeHelper.prototype.render = function (filepath, context, options) {
        var data,
            output = 'Unable to load file',
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 2 || !isstring(filepath)) {
            throw new Error('missing arguments');
        }
        if(args.length < 3){
            options = context;
            context = {};
        } else {
            context = JSON.parse(context);
            context = context || {};
        }
        // recuperation des data
        data = handlebars.createFrame(options.data || {});
        data = {
            root: data.root,
            _parent: data._parent
        };
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
            output = handlebars.compile(output);
            output = output(context, {
                data: data
            });
        }
        return new handlebars.SafeString(output.trim());
    };
    module.exports = IncludeHelper;
}());
