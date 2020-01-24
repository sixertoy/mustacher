let TimestampHelper;
const Handlebars = require('handlebars');
const isnumber = require('lodash.isnumber');
const isboolean = require('lodash.isboolean');
const mustacher = require('./../mustacher');

TimestampHelper = function() {};

TimestampHelper.prototype.register = function() {
  Handlebars.registerHelper('$timestamp', this.render.bind(this));
};

TimestampHelper.prototype.render = function(count, todate, options) {
  let data;
  const args = mustacher.hasOptions(arguments);
  if (!args || args.length < 1) {
    throw new Error('missing arguments');
  }
  if (args.length < 2) {
    options = count;
    count = 0;
    todate = false;
  } else if (args.length < 3) {
    options = todate;
    todate = isboolean(count) ? count : false;
    count = isnumber(count) ? count : 0;
  }
  data = Handlebars.createFrame(options.data || {});
  if (todate) {
    data.time =
      (!Date.now ? new Date().getTime() : Date.now()) + Math.round(count);
  } else {
    data.time =
      (!Date.now ? new Date().getTime() : Date.now()) + Math.round(count);
  }
  return data.time;
};

module.exports = TimestampHelper;
