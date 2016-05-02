'use strict'

const mongoose = require('mongoose'),
    config = require('./config');

mongoose.connect(config.db.uri);

mongoose.connection.on('connected', () => console.log('Conectado em ' + config.db.uri));

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
});