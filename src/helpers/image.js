const has = require('lodash.has');
const Handlebars = require('handlebars');
const isNumber = require('lodash.isnumber');
const mustacher = require('./../mustacher');
const { toArguments } = require('./../utils');

const DEFAULT_IMG_SIZE = 300;
const DEFAULT_IMG_BASEURL = '//placehold.it/';

function ImageHelper() {}

ImageHelper.prototype.register = function register() {
  Handlebars.registerHelper('$image', this.render.bind(this));
};

ImageHelper.prototype.render = function render(width, height, options) {
  // const context = options || {};
  const argmts = toArguments(width, height, options);
  const args = mustacher.hasOptions(argmts);
  if (!args || args.length < 1) {
    throw new Error('missing arguments');
  }

  let imgWidth = width;
  let imgHeight = height;
  let nextOptions = options;

  if (args.length < 2) {
    nextOptions = width;
    imgHeight = false;
    imgWidth = false;
  } else if (args.length === 2) {
    nextOptions = imgHeight;
    imgHeight = false;
  }

  imgWidth = isNumber(imgWidth) ? imgWidth : DEFAULT_IMG_SIZE;

  const data = Handlebars.createFrame(nextOptions.data || {});

  const hasHeightDefined = isNumber(imgHeight);
  const hasImageDefined = has(data, 'root.image') && data.root.image;
  const size = `${imgWidth}x${hasHeightDefined ? imgHeight : imgWidth}`;
  const baseURL = hasImageDefined ? data.root.image : DEFAULT_IMG_BASEURL;
  const str = `<img src="${baseURL}${size}" alt="" title="" />`;
  return new Handlebars.SafeString(str);
};

module.exports = ImageHelper;
