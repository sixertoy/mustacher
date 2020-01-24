let RandomHelper;
const defaults = {
  max: 1,
  min: 0,
  rounded: false,
};
const Handlebars = require('handlebars');
const random = require('lodash.random');
const isnumber = require('lodash.isnumber');
const isboolean = require('lodash.isboolean');
const mustacher = require('./../mustacher');

RandomHelper = function() {};

RandomHelper.prototype.register = function() {
  Handlebars.registerHelper('$random', this.render.bind(this));
};

/**
 * @TODO ajout d'un string comme arg pour parametrage custom
 * @see htt://placehold.it
 */
RandomHelper.prototype.render = function(min, max, rounded, options) {
  // jshint ignore:line
  let tmp;
  const args = mustacher.hasOptions(arguments);
  if (!args) {
    throw new Error('missing arguments');
  }
  if (args.length < 2) {
    options = min;
    min = defaults.min;
    max = defaults.max;
    rounded = defaults.rounded;
  } else if (args.length < 3 && isboolean(min)) {
    options = max;
    rounded = min;
    min = defaults.min;
    max = defaults.max;
  } else if (args.length < 3 && isnumber(min)) {
    options = max;
    max = defaults.max;
    rounded = defaults.rounded;
  } else if (args.length < 4) {
    options = rounded;
    rounded = defaults.rounded;
  }
  if (!isnumber(min) || !isnumber(max) || !isboolean(rounded)) {
    throw new Error('missing arguments');
  }
  //
  // inversion si max inferieur a min
  if (isnumber(min) && isnumber(max) && min >= max) {
    tmp = min;
    min = max;
    max = tmp;
  }
  return random(min, max, !rounded);
};

module.exports = RandomHelper;
