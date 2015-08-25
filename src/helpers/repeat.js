/*jslint plusplus: true, indent: 4, nomen: true */
/*global require, module */
(function () {
    'use strict';

    var RepeatHelper,
        isnan = require('lodash.isnan'),
        handlebars = require('handlebars'),
        mustacher = require('./../mustacher');

    RepeatHelper = function () {};

    RepeatHelper.prototype.register = function () {
        handlebars.registerHelper('repeat', this.render.bind(this));
    };

    /**
     *
     *
     */
    RepeatHelper.prototype.render = function (count, context, options) {
        var i, data, local,
            output = '',
            args = mustacher.hasOptions(arguments);
        if (!args || args.length <= 1) {
            throw new Error('missing arguments');
        }
        count = parseFloat(count);
        if (isnan(count)) {
            throw new Error('arguments not valid');
        }
        if (arguments.length < 3) {
            options = context;
            context = {};
        } else {
            context = JSON.parse(context);
            context = context || {};
        }
        data = handlebars.createFrame(options.data || {});
        data = {
            root: data.root,
            _parent: data._parent
        };
        context = {
            of: count
        };
        for (i = 0; i < count; i++) {
            data.index = i;
            data.first = (i === 0);
            data.last = (i === (count - 1));
            // context
            context.count = (i + 1);
            context.even = (i % 2) > 0; // pair
            context.odd = !context.odd; // impair
            context.class = (context.odd ? 'odd' : 'even') + (data.last ? ' last' : '') + (data.first ? ' first' : '');
            // output
            output += options.fn(context, {
                data: data
            });
        }
        return output;
    };

    module.exports = RepeatHelper;

}());
