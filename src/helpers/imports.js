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
/*global module, require, console */
(function () {

    'use strict';

    var ImportsHelper,
        js_ext = '.js',
        css_ext = '.css',
        fs = require('fs'),
        Handlebars = require('handlebars'),
        mustacher = require('./../mustacher');

    ImportsHelper = function () {};

    /**
     * 
     * 
     * 
     */
    ImportsHelper.prototype.getInlineContent = function (file) {
        try {
            return fs.readFileSync(file, 'utf8');
        } catch (e) {
            console.log('unable to load file ' + file);
            return '/* unable to load file ' + file + ' */';
        }
    };

    /**
     * 
     * 
     * 
     */
    ImportsHelper.prototype.injectJS = function (file, inline) {
        var result;
        if (!inline) {
            result = '<script type="text/javascript" src="' + file + js_ext + '"></script>';
        } else {
            result = '<script type="text/javascript">';
            result += '<![CDATA[';
            result += this.getInlineContent(file + js_ext);
            result += ']]>';
            result += '</script>';
        }
        return result;
    };

    ImportsHelper.prototype.injectCSS = function (file, inline) {
        var result;
        if (!inline) {
            result = '<link rel="stylesheet" type="text/css" href="' + file + css_ext + '" />';
        } else {
            result = '<style type="text/css">';
            result += '/* inline file ' + file + css_ext + '*/';
            result += this.getInlineContent(file + css_ext);
            result += '</style>';
        }
        return result;
    };

    /**
     * 
     * 
     * 
     */
    ImportsHelper.prototype.render = function (file, inline, options) {
        var data, result,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 2) {
            throw new Error('missing arguments');
        }
        if (args.length < 3) {
            options = inline;
            inline = false;
        }
        inline = inline || false;
        switch (options.name) {
        case '$js':
            result = this.injectJS(file, inline);
            break;
        case '$css':
            result = this.injectCSS(file, inline);
            break;
        }
        return new Handlebars.SafeString(result);
    };

    /**
     * 
     * 
     * 
     */
    ImportsHelper.prototype.register = function () {
        Handlebars.registerHelper('$js', this.render.bind(this));
        Handlebars.registerHelper('$css', this.render.bind(this));
    };

    module.exports = ImportsHelper;

}());