'use strict'

const modelDeck = require('../models/deck'),
     get = require('../atom/repository/get'),
     update = require('../atom/repository/update');

const deckRepository = {
    delete: (id) => {
        return modelDeck.remove({ _id: id });
    },
    get: (options) => {
        return get(modelDeck, options);
    },
    save: (deck) => {
        let newDeck = new modelDeck(deck);
        return newDeck.save();
    },
    update: (query, fieldUpdate, putSetInQuery) => {
        return update(modelDeck, query, fieldUpdate, putSetInQuery);
    }
};

module.exports = deckRepository;