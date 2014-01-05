express-views-dom-layouts
==========================

Layouts support for [express-views-dom], the DOM view engine for [Express][express].

Lets you define and override blocks by extending other views as layouts.

[![NPM version](https://badge.fury.io/js/express-views-dom-layouts.png)](http://badge.fury.io/js/express-views-dom-layouts)
[![Dependency Status](https://david-dm.org/AndersDJohnson/express-views-dom-layouts.png)](https://david-dm.org/AndersDJohnson/express-views-dom-layouts)

## Installation

via npm:

```bash
$ npm install --save express-views-dom-layouts
```

## Use

First setup [express-views-dom] - see its README.

Then use as in the following example:

"views/home.html":
```html
<extends from="layout-default">
  <block for="title">Home Page</block>
  <block for="content">
    Welcome home!
  </block>
</extends>
```

"views/layout-default.html":
```html
<!doctype html>
<html>
  <head>
    <title><block name="title">Default Title</block></title>
  </head>
  <body>
    <block name="content">
      Default content.
    </block>
  </body>
</html>
```

JavaScript:
```javascript
// assumes already setup express-views-dom

var domLayouts = require('express-views-dom-layouts');

app.get('/', function (req, res) {
  res.render('home', {
    render: function (window, done, params) {
      domLayouts(window, done, params, function () {
        // we now have the fully stitched HTML
        // and could do more DOM work if desired

        done();
      });
    }
  });
});
```

Results in:
```html
<!doctype html>
<html>
  <head>
    <title>Home Page</title>
  </head>
  <body>
    Welcome home!
  </body>
</html>
```

[express]: http://expressjs.com/
[express-views-dom]: https://github.com/AndersDJohnson/express-views-dom
