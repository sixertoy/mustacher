let RepeatHelper;
const isnan = require('lodash.isnan');
const handlebars = require('handlebars');
const mustacher = require('./../mustacher');

RepeatHelper = function() {};

RepeatHelper.prototype.register = function() {
  handlebars.registerHelper('repeat', this.render.bind(this));
};

/**
 *
 *
 */
RepeatHelper.prototype.render = function(count, context, options) {
  let i;
  let data;
  let local;
  let output = '';
  const args = mustacher.hasOptions(arguments);
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
    _parent: data._parent,
    root: data.root,
  };
  context = {
    of: count,
  };
  for (i = 0; i < count; i++) {
    data.index = i;
    data.first = i === 0;
    data.last = i === count - 1;
    // context
    context.count = i + 1;
    context.even = i % 2 > 0; // pair
    context.odd = !context.odd; // impair
    context.class =
      (context.odd ? 'odd' : 'even') +
      (data.last ? ' last' : '') +
      (data.first ? ' first' : '');
    // output
    output += options.fn(context, {
      data,
    });
  }
  return output;
};

module.exports = RepeatHelper;
