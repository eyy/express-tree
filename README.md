express-tree
============

> Hierarchical (almost-declarative) **routing** for express.js

Plant
-------
`npm i express-tree --save`
```js
var express = require('express');
require('express-tree');

var app = express();
```

Pluck
---
```js
app.tree({
    '': function(req, res) {          // => app.get('/', ...)
        res.send('hello forest.')
    },
    login: 'login',                   // => res.render('login');
    account: {
        '': 'account/index',          // => /account
        register: 'account/register', // => /account/register
        settings: [ logged, 'account/settings' ],  // middleware works too!
    },
    'POST login': passport.authenticate('local', { // POST, PUT, and DELETE works like this. Not recommended, though.
        successRedirect: '/',
        failureRedirect: '/login',
        failureMessage: true,
        badRequestMessage: ''
    })
});
```
