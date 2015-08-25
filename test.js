/*jslint indent: 4, nomen: true, plusplus: true */
/*globals require, module */
(function () {

    'use strict';

    var // variables
        // requires
        fs = require('fs'),
        path = require('path'),
        mustacher = require('./index'),
        handlebars = require('handlebars');

    /**
     * {
     *      name: '$another',
     *      hash: {},
     *      data: {
     *          root: {
     *              super: 'yo'
     *          }
     *      }
     * }
     */

    function register() {

        handlebars.registerHelper('equal', function (lvalue, rvalue, context, options) {

            if (arguments.length < 4) {
                options = context;
                context = {};
            } else {
                context = JSON.parse(context);
                context = context || {};
            }            
            var data = handlebars.createFrame(options.data || {});  
            data = {
                root: data.root,
                _parent: data._parent,
                isequal: (lvalue === rvalue)
            };
            return options.fn(context, {data: data});
        });

        handlebars.registerHelper('$include', function (filename, context, options) {
            if (arguments.length < 3) {
                options = context;
                context = {};
            } else {
                context = JSON.parse(context);
                context = context || {};
            }
            var stream, output, template, filepath, ext,
                output = '',
                filepath = path.join(options.data.root.cwd, options.data.root.partials.src, filename + options.data.root.partials.ext),
                data = handlebars.createFrame(options.data || {});  
            data = {
                root: data.root,
                _parent: data._parent
            };
            stream = fs.readFileSync(path.normalize(filepath), {
                encoding: 'utf8'
            });
            template = handlebars.compile(stream);
            output = template(context, {
                data: data
            });
            return output;
        });
    }

    function debug() {
        register();
        var context = {
                super: 'yo',
                list: ['toto', 'titi'],
                cwd: process.cwd(),
                partials: {
                    src: 'spec/fixtures',
                    ext: '.hbs'
                }
            },
            stream = fs.readFileSync('./spec/fixtures/debug.hbs', {
                encoding: 'utf8'
            }),
            template = handlebars.compile(stream),
            output = template(context);
        console.log(output);
    }

    debug();

}());