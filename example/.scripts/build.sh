#!/bin/sh

mkdir -p ./public

# copy fonts to public folder
cp -R ./src/font ./public

# copy JS libraries to public folder
cp -R ./src/libs ./public

# build JS files
$(yarn bin)/babel ./src/js/index.js -o ./public/script.js

# build SASS files
$(yarn bin)/node-sass --importer ./node_modules/node-sass-package-importer/dist/cli.js -o ./public ./src/index.scss

# build mustacher files
node ./.scripts/build-mustacher
