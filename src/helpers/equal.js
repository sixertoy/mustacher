/*jslint indent: 4, nomen: true */
/*global module, require */
(function () {

    'use strict';

    var EqualHelper,
        Handlebars = require('handlebars'),
        isequal = require('lodash.isequal'),
        mustacher = require('./../mustacher');

    EqualHelper = function () {};

    EqualHelper.prototype.register = function () {
        Handlebars.registerHelper('equal', this.render.bind(this));
    };

    EqualHelper.prototype.render = function (lvalue, rvalue, context, options) {
        var data,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 3) {
            throw new Error('missing arguments');
        }
        if (arguments.length < 4) {
            options = context;
            context = {};
        } else {
            context = JSON.parse(context);
            context = context || {};
        }
        data = Handlebars.createFrame(options.data || {});
        data = {
            root: data.root,
            _parent: data._parent,
            isequal: (lvalue === rvalue)
        };
        if (!isequal(lvalue, rvalue)) {
            return options.inverse(context, { data: data });
        } else {
            return options.fn(context, { data: data });
        }
    };

    module.exports = EqualHelper;

}());
