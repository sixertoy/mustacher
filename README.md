# mustacher [![Built with Grunt][grunt-img]](http://gruntjs.com/)

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![build][travis-img]][travis-url] [![coverage][coverall-img]][coverall-url]

* Render templates with Handlebars

## Install

```bash
npm install mustacher --save
```

## Usage

```javascript
var str = '<html><head><title>{{title}}</title></head><body><ul>{{#repeat 3}}<li>Hello {{@index}}</li>{{/repeat}}</ul></body></html>';
result = mustacher(str, {title: 'this is a title'});
```

**output**

```html
<html>
    <head>
        <title>this is a title</title>
    </head>
    <body>
        <ul>
            <li>Hello 0</li>
            <li>Hello 1</li>
            <li>Hello 2</li>
        </ul>
    </body>
</html>
```

## History

- v0.1.1 exported from [grunt-mustacher](https://www.npmjs.com/package/grunt-mustacher)

[grunt-img]: https://cdn.gruntjs.com/builtwith.png
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/mustacher
[coverall-img]: https://img.shields.io/coveralls/sixertoy/mustacher.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/mustacher
[travis-img]: http://img.shields.io/travis/sixertoy/mustacher.svg?style=flat-square

[npm-url]: https://npmjs.org/package/generator-gruntproject
[npm-version-img]: http://img.shields.io/npm/v/mustacher.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/mustacher.svg?style=flat-square
