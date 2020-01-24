const path = require('path');
const merge = require('lodash.merge');
const handlebars = require('handlebars');
const isempty = require('lodash.isempty');
const toarray = require('lodash.toarray');
const isstring = require('lodash.isstring');
const isplainobject = require('lodash.isplainobject');

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

let OPTIONS = {};
let IS_REGISTERED = false;

function mustacher(str, context, options) {
  if (!str || !isstring(str)) {
    throw new Error('missing arguments');
  }
  if (isempty(str)) return str;
  if (!IS_REGISTERED) mustacher.register();
  const nextContext = context || {};
  OPTIONS = merge(DEFAULTS, options || {}, nextContext);
  try {
    const template = handlebars.compile(str);
    const opts = { data: { root: OPTIONS } };
    const output = template(nextContext, opts);
    return output;
  } catch (e) {
    // console.log(e.stack);
    throw new Error('Handlebars compile error');
  }
}

mustacher.register = helpers => {
  (helpers || HELPERS).forEach(name => {
    const helperPath = path.join(__dirname, 'helpers', name);
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const HelperPrototype = require(helperPath);
    const helper = new HelperPrototype();
    helper.register();
  });
  IS_REGISTERED = true;
};

mustacher.options = () => OPTIONS;

mustacher.hasOptions = args => {
  if (!args || isempty(args)) return false;
  const arrArgs = toarray(args);
  const optionArgument = arrArgs[arrArgs.length - 1];
  const isObject = isplainobject(optionArgument);
  const hasPropertyName = Boolean(isObject && optionArgument.name);
  return hasPropertyName ? arrArgs : false;
};

module.exports = mustacher;
