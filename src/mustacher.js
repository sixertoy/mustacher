let OPTIONS = {};
let IS_REGISTERED = false;
const DEFAULTS = {
  cwd: process.cwd(),
  delimiter: {
    ldim: '{{',
    rdim: '}}',
  },
  partials: {
    depth: 2,
    ext: '.hbs',
    src: 'partials/',
  },
};
const HELPERS = [
  'livereload',
  'conditions',
  'timestamp',
  'include',
  'literal',
  'imports',
  'repeat',
  'random',
  'image',
  'equal',
];
// requires
const path = require('path');
const merge = require('lodash.merge');
const handlebars = require('handlebars');
const isempty = require('lodash.isempty');
const toarray = require('lodash.toarray');
const isstring = require('lodash.isstring');
const isplainobject = require('lodash.isplainobject');

const mustacher = (...args) => {
  const [str, context, options] = args;
  if (args.length < 1 || !isstring(str)) {
    throw new Error('missing arguments');
  }
  if (isempty(str)) return str;
  if (!IS_REGISTERED) mustacher.register();
  const nextContext = context || {};
  OPTIONS = merge(DEFAULTS, options || {}, nextContext);
  try {
    const template = handlebars.compile(str);
    const output = template(nextContext, { data: { root: OPTIONS } });
    return output;
  } catch (e) {
    // console.log(e.stack);
    throw new Error('Handlebars compile error');
  }
};

mustacher.register = helpers => {
  (helpers || HELPERS).forEach(name => {
    const helperPath = path.join(__dirname, 'helpers', name);
    // eslint-disable-next-line import/no-dynamic-require
    const HelperPrototype = require(helperPath);
    const helper = new HelperPrototype();
    helper.register();
  });
  IS_REGISTERED = true;
};

mustacher.options = () => {
  return OPTIONS;
};

/**
 * Mustacher
 *
 */
mustacher.hasOptions = args => {
  if (arguments.length < 1 || isempty(args)) {
    return false;
  }
  args = toarray(args);
  const optionArgument = args[args.length - 1];
  const isObject = isplainobject(optionArgument);
  const hasPropertyName = Boolean(isObject && optionArgument.name);
  return hasPropertyName ? args : false;
};

module.exports = mustacher;
