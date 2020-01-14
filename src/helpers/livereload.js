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
/*global module, require, console */
(function() {
  'use strict';

  var // variables
    LivereloadHelper,
    defaults = {
      port: 1337,
      debug: true,
    },
    // lodash
    isstring = require('lodash.isstring'),
    isnumber = require('lodash.isnumber'),
    isboolean = require('lodash.isboolean'),
    isplainobject = require('lodash.isplainobject'),
    // requires
    Handlebars = require('handlebars'),
    mustacher = require('./../mustacher');

  LivereloadHelper = function() {};

  /**
   *
   * Registering handlebars helper
   *
   */
  LivereloadHelper.prototype.register = function() {
    Handlebars.registerHelper('$livereload', this.render.bind(this));
  };

  /**
   *
   * Render view
   *
   * @param port [number] Livereload port
   * @param debug [boolean] Debug mode
   * @param options [Object] Handlebars options
   *
   * @return String
   *
   */
  LivereloadHelper.prototype.render = function(port, debug, options) {
    var result,
      args = mustacher.hasOptions(arguments);

    if (!args || args.length < 1) {
      throw new Error('missing arguments');
    }
    // parse args
    if (args.length < 2) {
      options = port;
      port = defaults.port;
      debug = defaults.debug;
    } else if (args.length < 3) {
      options = debug;
      debug = isboolean(port) ? port : defaults.debug;
      port = isboolean(port) ? defaults.port : port;
    }
    if (isstring(port)) {
      port = parseFloat(port);
    }
    // execute
    result = '';
    if (debug) {
      result += '<!-- livereload: use only in development environment -->';
      result +=
        '<script src="http://localhost:' + port + '/livereload.js"></script>';
      result += '<!-- endof livereload -->';
      result = new Handlebars.SafeString(result);
    }
    return result;
  };

  module.exports = LivereloadHelper;
})();
