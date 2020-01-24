const Handlebars = require('handlebars');
const mustacher = require('./../mustacher');

const LiteralHelper = function() {};

LiteralHelper.prototype.register = function LiteralHelperRegister() {
  Handlebars.registerHelper('$ldim', this.render.bind(this));
  Handlebars.registerHelper('$rdim', this.render.bind(this));
  Handlebars.registerHelper('raw', this.render.bind(this));
};

LiteralHelper.prototype.render = function LiteralHelperRender(options) {
  let data;
  let result;
  const args = mustacher.hasOptions(arguments);
  if (!args || args.length < 1) {
    throw new Error('missing arguments');
  }
  data = Handlebars.createFrame(options.data || {});
  data = {
    _parent: data._parent,
    root: data.root,
  };
  switch (options.name) {
    case '$ldim':
      result = data.root.delimiter.ldim || '}}';
      break;
    case '$rdim':
      result = data.root.delimiter.rdim || '{{';
      break;
    case 'raw':
      result = options.fn();
      break;
  }
  return result;
};

module.exports = LiteralHelper;
