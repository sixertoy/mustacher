/*jslint indent: 4, nomen: true */
/*global module, require */
(function () {

    'use strict';

    var ConditionsHelper,
        handlebars = require('handlebars'),
        compact = require('lodash.compact'),
        mustacher = require('./../mustacher');

    ConditionsHelper = function () {};

    ConditionsHelper.prototype.register = function () {
        handlebars.registerHelper('or', this.render.bind(this));
        handlebars.registerHelper('and', this.render.bind(this));
    };

    /**
     *
     * @TODO use context params
     *
     */
    ConditionsHelper.prototype.render = function (options) {
        var result, data,
            args = mustacher.hasOptions(arguments);
        if (!args || args.length < 3) {
            throw new Error('missing arguments');
        }
        options = args[args.length - 1];
        data = handlebars.createFrame(options.data || {});
        data = {
            root: data.root,
            _parent: data._parent
        };
        args = args.slice(0, args.length - 1);
        result = options.name === 'or' ? 1 : args.length;
        if (compact(args).length >= result) {
            return options.fn(args, {
                data: data
            });
        } else {
            return options.inverse(args, {
                data: data
            });
        }
    };

    module.exports = ConditionsHelper;

}());
