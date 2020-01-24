const Handlebars = require('handlebars');
const { loremIpsum } = require('lorem-ipsum');

const DEFAULT_OPTIONS = {
  count: 1,
  format: 'plain',
  units: 'paragraph',
};

function LoremHelper() {}

LoremHelper.prototype.register = function register() {
  Handlebars.registerHelper('$lorem', this.render.bind(this));
};

LoremHelper.prototype.render = function render(count = null, units = null) {
  const textCount = count || 1;
  const textUnits = units || 'paragraph';
  const lorem = loremIpsum({
    ...DEFAULT_OPTIONS,
    count: textCount,
    units: textUnits,
  });
  const str = `<div class="lorem-ipsum-text">${lorem}</div>`;
  return new Handlebars.SafeString(str);
};

module.exports = LoremHelper;
