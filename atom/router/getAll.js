'use strict'

const errorRequest = require('../../common/error-request');

module.exports = (repository, optionsGet, req, res) => {
    repository.get(optionsGet).then((decks) => {
        res.send(decks);
    }, errorRequest.bind(null, res));
}