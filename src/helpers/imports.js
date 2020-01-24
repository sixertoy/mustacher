let ImportsHelper;
const JS_EXTENSION = '.js';
const CSS_EXTENSION = '.css';
const fs = require('fs');
const uglify = require('uglify-js');
const CleanCSS = require('clean-css');
const Handlebars = require('handlebars');
const isboolean = require('lodash.isboolean');
const mustacher = require('./../mustacher');

ImportsHelper = function() {};

/**
 *
 *
 *
 */
ImportsHelper.prototype.getInlineContent = function(file, iscss, compress) {
  let content;
  try {
    content = fs.readFileSync(file, 'utf8');
    if (!compress) {
      return content;
    }
    if (iscss) {
      return new CleanCSS().minify(content).styles;
    }
    return uglify.minify(content, {
      fromString: true,
    }).code;
  } catch (e) {
    console.log(`unable to load file ${file}`);
    return `/* unable to load file ${file} */`;
  }
};

/**
 *
 *
 *
 */
ImportsHelper.prototype.injectJS = function(file, inline, compress) {
  let result;
  if (!inline) {
    result = `<script type="text/javascript" src="${file}${JS_EXTENSION}"></script>`;
  } else {
    result = '<script type="text/javascript">';
    result += '//<![CDATA[\n';
    result += this.getInlineContent(file + JS_EXTENSION, false, compress);
    result += '\n//]]>';
    result += '</script>';
  }
  return result;
};

ImportsHelper.prototype.injectCSS = function(file, inline, compress) {
  let result;
  if (!inline) {
    result = `<link rel="stylesheet" type="text/css" href="${file}`;
    result += `${CSS_EXTENSION}" />`;
  } else {
    result = '<style type="text/css">';
    result += `/* inline file ${file}${CSS_EXTENSION}*/`;
    result += this.getInlineContent(file + CSS_EXTENSION, true, compress);
    result += '</style>';
  }
  return result;
};

/**
 *
 *
 *
 */
ImportsHelper.prototype.render = function(file, inline, minify, opts) {
  let valid;
  let result;
  let useinline = false;
  let useminify = false;
  const options = opts || {};
  const args = mustacher.hasOptions(arguments);

  if (!args || args.length < 4) {
    throw new Error('missing arguments');
  }

  useinline = inline;
  /*
        valid = !isboolean(inline);
        if (!valid) {
            useminify = false;
            useinline = false;
            options = inline || {};
        }
        */

  useminify = minify;
  /*
        valid = !isboolean(minify);
        if (!valid) {
            useminify = false;
            options = minify || {};
        }
        */

  switch (options.name) {
    case '$js':
      result = this.injectJS(file, useinline, useminify);
      break;
    case '$css':
      result = this.injectCSS(file, useinline, useminify);
      break;
  }
  return new Handlebars.SafeString(result);
};

/**
 *
 *
 *
 */
ImportsHelper.prototype.register = function() {
  Handlebars.registerHelper('$js', this.render.bind(this));
  Handlebars.registerHelper('$css', this.render.bind(this));
};

module.exports = ImportsHelper;
