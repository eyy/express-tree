var express = require('express');

var tree = function (app, routes, top) {
    Object.keys(routes).forEach(function (url) {
        var fn = routes[url],
            mw = [];
        if (Array.isArray(fn)) {
            mw = fn;
            fn = mw.pop();
        }
        switch (typeof fn) {
            case 'string':
                var view = fn;
                fn = function (req, res) {
                    res.render(view);
                };
                break;
            case 'object':
                return tree(app, fn, top + '/' + url);
        }
        var method = url.split(' ')[0].toLowerCase();
        switch (method) {
            case 'post':
                url = url.substr(5);
                break;
            case 'put':
                url = url.substr(4);
                break;
            case 'delete':
                url = url.substr(7);
                break;
            default:
                method = 'get';
        }
        app[method](top + (url || !top ? '/' + url : ''), mw, fn);
    });
};

express.application.tree = function(routes) {
    tree(this, routes, '');
};