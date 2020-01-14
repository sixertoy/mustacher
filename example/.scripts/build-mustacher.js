const fs = require('fs');
const path = require('path');
const mustacher = require('mustacher');

const parent = path.join(__dirname, '..');
const context = {};
const config = {
  cwd: path.join(parent, 'src'),
  delimiter: {
    ldim: '{{',
    rdim: '}}',
  },
  partials: {
    ext: '.hbs',
    src: 'partials',
  },
};

const opts = { encoding: 'utf8' };
const inputFile = path.join(parent, 'src', 'index.html');
const outputfile = path.join(parent, 'public', 'index.html');
const content = fs.readFileSync(inputFile, opts);
const output = mustacher(content, context, config);
fs.writeFileSync(outputfile, output, { encoding: 'utf8' });
