'use strict'
const express = require('express'),
    app = express(),
    middleware = require('./config/middleware'),
    cardRouter = require('./routes/card-router'),
    deckRouter = require('./routes/deck-router');

require('./config/database');

middleware(app, __dirname);
app.use('/card', cardRouter);
app.use('/deck', deckRouter);

app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
 // res.status(err.status || 500);
  res.send( {
    message: err.message,
    error: {}
  });
});

module.exports = app;