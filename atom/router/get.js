'use strict'

// let cardObject = card.toObject();

const errorRequest = require('../../common/error-request');

module.exports = (repository, req, res) => {
    let id = req.query.id;
    repository.get({ id: id }).then((object) => {
        res.send(object);
    }, errorRequest.bind(null, res));
}