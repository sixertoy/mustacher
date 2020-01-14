#!/bin/sh

# create public folder if not exist
mkdir -p ./public

# copy fonts to public folder
cp -R ./src/font ./public

# copy JS libraries to public folder
cp -R ./src/libs ./public

# build JS files
yarn build:js

# build SASS files
yarn build:sass

# build mustacher files
yarn build:html
