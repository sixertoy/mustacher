/* eslint-disable import/no-extraneous-dependencies, no-console */
const path = require('path');
const http = require('http');
const handler = require('serve-handler');
const livereload = require('livereload');

const output = path.join(__dirname, 'public');
const server = http.createServer(async (request, response) => {
  await handler(request, response, { public: output });
});

server.listen(3000, () => {
  console.log('Running at http://localhost:3000');
});

const opts = { port: 35729 };
const lrserver = livereload.createServer(opts);
lrserver.watch(output);
