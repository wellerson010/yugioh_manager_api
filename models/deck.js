'use strict'

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const deckSchema = new schema({
    name: String,
    type: Number,
    price: Number,
    purchase_date: Date,
    picture: String
});

module.exports = mongoose.model('Deck', deckSchema);

/*
Type:

1 - Deck
2 - Booster
*/