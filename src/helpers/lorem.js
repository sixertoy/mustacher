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
(function() {
  'use strict';

  var LoremHelper,
    lodash = require('lodash'),
    lorem = require('lorem-ipsum'),
    Utils = require('./../mustacher'),
    Handlebars = require('handlebars'),
    defaults = {
      count: 1, // Number of words, sentences, or paragraphs to generate.
      format: 'plain', // Plain text or html
      units: 'sentences', // Generate words, sentences, or paragraphs.
      sentenceLowerBound: 5, // Minimum words per sentence.
      sentenceUpperBound: 15, // Maximum words per sentence.
      paragraphLowerBound: 3, // Minimum sentences per paragraph.
      paragraphUpperBound: 7, // Maximum sentences per paragraph.
      random: Math.random, // A PRNG function. Uses Math.random by default
    };

  LoremHelper = function() {};

  LoremHelper.prototype.register = function() {
    Handlebars.registerHelper('$lorem', this.render.bind(this));
  };

  LoremHelper.prototype.render = function(type, length, options) {
    // jshint ignore:line

    var args = Utils.hasOptions(arguments);
    if (!args || args.length <= 1) {
      throw new Error('LoremHelper arguments is missing');
    }
  };

  module.exports = LoremHelper;
})();
