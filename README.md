<a name="description"></a>
# Mustacher [![Built with Grunt][grunt-img]](http://gruntjs.com/)

[![MIT License][license-img]][license-url] [![NPM version][npm-version-img]][npm-url] [![NPM downloads][npm-downloads-img]][npm-url] [![build][travis-img]][travis-url] [![coverage][coverall-img]][coverall-url]

> Designed for fit my own needs to build HTML static pages to be incorpored inside a website based on Magento, eZPublish or Drupal templates

> It provide an easy way to **include** handlebar's partials files inside HTML template page with a minimal list of helpers like **include**, **repeat (loop)**, **or**, **and**, **livereload**...

<a name="install"></a>
## Install

```bash
npm install mustacher --save
```

<a name="exposed-helpers"></a>
## Exposed helpers

###### inline

* [$include](#include)
* [$image](#image)
* [$timestamp](#timestamp)
* [$livereload](#livereload)
* [$random](#random)
* [$ldim](#literals)
* [$rdim](#literals)
* [$css](#imports)
* [$js](#imports)

###### blocks

* [repeat](#repeat)
* [and](#and)
* [or](#or)
* [equal](#equal)

## Examples

```js
var mutacher = require('mustacher'),
    // variables at root level touched by any helper
    context = {
        'private': 'as @root.private'
    },
    // defaults options
    options = {
        cwd: process.cwd(),
        delimiter: {
            ldim: '{{',
            rdim: '}}'
        },
        partials: {
            ext: '.hbs',
            src: 'partials'
        }
    },
    str = fs.readFileSync('path/to/file', {encoding: 'utf8'});
mutacher(str, [context], [options]);
```

### inline

<a name="include"><a>
### $include

```html
<div class="part">
    {{$include 'relative/to/root/path/to/template'}}
</div>
```

<a name="imports"><a>
### $css & $js helper

```html
<head>
    ...
    {{$css 'path/to/css/file'}}
    <!-- include inline -->
    {{$css '__build__/path/to/css/file' true}}
    ...
</head>
```

```html
    <div id="main-footer">
    ...
    </div>
    {{$js 'path/to/js/file'}}
</body>
```

<a name="image"><a>
### $image (default width: 300)

```html
<div class="image">
    {{$image}}
</div>
```

```html
<div class="image">
    {{$image 300}}
</div>
```

```html
<div class="image">
    {{$image 300 200}}
</div>
```

<a name="timestamp"><a>
### $timestamp

```html
<img src="my/file.png?{{$timestamp}}" alt="" title="">
```

```html
<img src="my/file.png?{{$timestamp 20}}" alt="" title="">
```

<a name="livereload"><a>
### $livereload

```html
<div id="footer">
    {{$livereload 1337}}
</div>
```

<a name="random"><a>
### $random

```html
<span>
    <b>{{$random 1 31}}</b>
    <strong>Juanary</strong>
    <em>1970</em>
</span>
```

```html
<span>{{$random 0 1 true}}</span>
```

<a name="literals"><a>
### literal

#### $ldim
```html
{{$ldim}}toto
{{$ldim}}toto{{$rdim}}
```

#### $rdim
```html
toto{{$rdim}}
{{$ldim}}toto{{$rdim}}
```

#### $css
```html
{{$css 'path/to/file'}}
{{$css 'path/to/file.min'}}
{{$css 'path/to/file.min' '{"media":"print,projection,screen"}'}}
```

#### $js
```html
{{$js 'path/to/file'}}
{{$js 'path/to/file.min'}}
{{$js 'path/to/file.min' '{"data-main":"main.js"}'}}
```

### blocks

<a name="repeat"><a>
#### #repeat

```html
<ul>
    {{#repeat 4}}
    <li class="{{class}}">
        <a href="" alt="{{count}} of {{of}}">item </a>
        <ul>
        {{#repeat}}
            <li class="{{#if @first}}first{{/if}}">
                <span>sub item {{@../index}}/{{@index}}</span>
            </li>
        {{/repeat}}
        </ul>
    </li>
    {{/repeat}}
</ul>
```

<a name="and"><a>
### #and

```html
{{#and true false ...}}
<span>fail</span>
{{else}}
<span>success</span>
{{/and}}
```

<a name="or"><a>
### #or

```html
{{#or true false ...}}
<span>success</span>
{{else}}
<span>fail</span>
{{/or}}
```

<a name="equal"><a>
### #equal

```html
{{#equal 'toto' 'blague'}}
<span>fail</span>
{{else}}
<span>success</span>
{{/equal}}
```

<a name="issues"></a>
## Issues

**not yet implemented**

- Lorem Ipsum

<a name="dependents"></a>
## Dependents

- [gulp-mustacher](https://www.npmjs.com/package/gulp-mustacher)
- [grunt-mustacher](https://www.npmjs.com/package/grunt-mustacher)


[grunt-img]: https://cdn.gruntjs.com/builtwith.png
[license-img]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license-url]: LICENSE-MIT

[coverall-url]: https://coveralls.io/r/sixertoy/mustacher
[coverall-img]: https://img.shields.io/coveralls/sixertoy/mustacher.svg?style=flat-square

[travis-url]: https://travis-ci.org/sixertoy/mustacher
[travis-img]: http://img.shields.io/travis/sixertoy/mustacher.svg?style=flat-square

[npm-url]: https://npmjs.org/package/mustacher
[npm-version-img]: http://img.shields.io/npm/v/mustacher.svg?style=flat-square
[npm-downloads-img]: http://img.shields.io/npm/dm/mustacher.svg?style=flat-square
