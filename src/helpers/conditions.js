let ConditionsHelper;
const handlebars = require('handlebars');
const compact = require('lodash.compact');
const mustacher = require('./../mustacher');

ConditionsHelper = function() {};

ConditionsHelper.prototype.register = function() {
  handlebars.registerHelper('or', this.render.bind(this));
  handlebars.registerHelper('and', this.render.bind(this));
};

/**
 *
 * @TODO use context params
 *
 */
ConditionsHelper.prototype.render = function(options) {
  let result;
  let data;
  let args = mustacher.hasOptions(arguments);
  if (!args || args.length < 3) {
    throw new Error('missing arguments');
  }
  options = args[args.length - 1];
  data = handlebars.createFrame(options.data || {});
  data = {
    _parent: data._parent,
    root: data.root,
  };
  args = args.slice(0, args.length - 1);
  result = options.name === 'or' ? 1 : args.length;
  if (compact(args).length >= result) {
    return options.fn(args, {
      data,
    });
  }
  return options.inverse(args, {
    data,
  });
};

module.exports = ConditionsHelper;
