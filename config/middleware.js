'use strict'
const bodyParser = require('body-parser'),
    cors = require('cors'),
    express = require('express'),
    logger = require('morgan'),
    path = require('path');


//var favicon = require('serve-favicon');

module.exports = (app, dirname) => {
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    //app.use(cookieParser());
    app.use(express.static(path.join(dirname, 'public')));
    console.log(path.join(dirname, 'public'));
}