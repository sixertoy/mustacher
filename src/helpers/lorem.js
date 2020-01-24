const Handlebars = require('handlebars');
const { loremIpsum } = require('lorem-ipsum');
const isNumber = require('lodash.isnumber');
const isUndefined = require('lodash.isundefined');

const mustacher = require('./../mustacher');
const { toArguments } = require('./../utils');

const DEFAULT_OPTIONS = {
  count: 1,
  format: 'plain',
  units: 'paragraph',
};

function LoremHelper() {}

LoremHelper.prototype.register = function LoremHelperRegister() {
  Handlebars.registerHelper('$lorem', this.render.bind(this));
};

LoremHelper.prototype.render = function LoremHelperRender(
  count,
  units,
  format,
  options
) {
  const argmts = toArguments(count, units, format, options);
  const args = mustacher.hasOptions(argmts);
  if (args.length < 1) {
    throw new Error('missing arguments');
  }

  const opts = { count, format, units };
  const cleaned = Object.keys(opts).reduce((acc, key) => {
    const value = opts[key];
    if (key === 'count' && isNumber(value)) {
      return { ...acc, count };
    }
    if (key === 'units' && typeof value === 'string') {
      return { ...acc, units };
    }
    if (key === 'format' && typeof value === 'string') {
      return { ...acc, format };
    }
    return acc;
  }, {});

  const lorem = loremIpsum({ ...DEFAULT_OPTIONS, ...cleaned });
  return new Handlebars.SafeString(lorem);
};

module.exports = LoremHelper;
