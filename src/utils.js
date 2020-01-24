const isundefined = require('lodash.isundefined');

const toArguments = (...rest) => {
  const args = rest.reduce((acc, val, ind) => {
    if (isundefined(val)) return acc;
    return { ...acc, [`${ind}`]: val };
  }, {});
  return args;
};

module.exports = { toArguments };
