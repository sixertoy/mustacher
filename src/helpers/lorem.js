// const lorem = require('lorem-ipsum');
const Handlebars = require('handlebars');
const Utils = require('./../mustacher');

const defaults = {
  count: 1, // Number of words, sentences, or paragraphs to generate.
  format: 'plain', // Plain text or html
  paragraphLowerBound: 3, // Generate words, sentences, or paragraphs.
  paragraphUpperBound: 7, // Minimum words per sentence.
  random: Math.random, // Maximum words per sentence.
  sentenceLowerBound: 5, // Minimum sentences per paragraph.
  sentenceUpperBound: 15, // Maximum sentences per paragraph.
  units: 'sentences', // A PRNG function. Uses Math.random by default
};

const LoremHelper = () => {};

LoremHelper.prototype.register = () => {
  Handlebars.registerHelper('$lorem', this.render.bind(this));
};

LoremHelper.prototype.render = (type, length, options) => {
  const args = Utils.hasOptions(arguments);
  if (!args || args.length <= 1) {
    throw new Error('LoremHelper arguments is missing');
  }
};

export default LoremHelper;
