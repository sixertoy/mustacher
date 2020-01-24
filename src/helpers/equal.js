let EqualHelper;
const Handlebars = require('handlebars');
const isequal = require('lodash.isequal');
const mustacher = require('./../mustacher');

EqualHelper = function() {};

EqualHelper.prototype.register = function() {
  Handlebars.registerHelper('equal', this.render.bind(this));
};

EqualHelper.prototype.render = function(lvalue, rvalue, context, options) {
  let data;
  const args = mustacher.hasOptions(arguments);
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
    _parent: data._parent,
    isequal: lvalue === rvalue,
    root: data.root,
  };
  if (!isequal(lvalue, rvalue)) {
    return options.inverse(context, { data });
  }
  return options.fn(context, { data });
};

module.exports = EqualHelper;
