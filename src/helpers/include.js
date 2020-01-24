const LF = '\n';
const path = require('path');
const fs = require('fs-extra');
const handlebars = require('handlebars');
const isstring = require('lodash.isstring');
const mustacher = require('./../mustacher');

const IncludeHelper = function() {};

IncludeHelper.prototype.register = function IncludeHelperRegister() {
  handlebars.registerHelper('$include', this.render.bind(this));
};

IncludeHelper.prototype.render = function IncludeHelperRender(
  filepath,
  context,
  options
) {
  let data;
  let output = 'Unable to load file';
  const args = mustacher.hasOptions(arguments);
  if (!args || args.length < 2 || !isstring(filepath)) {
    throw new Error('missing arguments');
  }
  if (args.length < 3) {
    options = context;
    context = {};
  } else {
    context = JSON.parse(context);
    context = context || {};
  }
  // recuperation des data
  data = handlebars.createFrame(options.data || {});
  data = {
    _parent: data._parent,
    root: data.root,
  };
  // transformation du filepath en absolut
  filepath = path.join(data.root.cwd, data.root.partials.src, filepath);
  filepath += data.root.partials.ext;
  // test si le fichier existe
  const exists = fs.pathExistsSync(filepath);
  if (!exists) {
    filepath = path.relative(data.root.cwd, filepath);
    output = `<!-- ${filepath} -->${LF}${output}${LF}<!-- endof ${filepath} -->`;
  } else {
    const opts = { encoding: 'utf8' };
    output = fs.readFileSync(filepath, opts).trim();
    output = handlebars.compile(output);
    output = output(context, { data });
  }
  return new handlebars.SafeString(output.trim());
};
module.exports = IncludeHelper;
