'use strict'

const modelDeck = require('../models/deck'),
     get = require('../atom/repository/get');

const deckRepository = {
    delete: (id) => {
        return modelDeck.remove(id);
    },
    get: (options) => {
        return get(modelDeck, options);
    },
    save: (deck) => {
        let newDeck = new modelDeck(deck);
        return newDeck.save();
    },
};

module.exports = deckRepository;