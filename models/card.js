'use strict'

const mongoose = require('mongoose'),
    schema = mongoose.Schema;

const cardSchema = new schema({
    name: String,
    attribute: Number,
    type_card: Number,
    types: [Number],
    level: Number,
    atk: String,
    def: String,
    description: String,
    card_number: String,
    decks: [{
        deck_id: {
            type: schema.Types.ObjectId,
            ref: 'Deck'
        },
        rarity: Number,
        identifier: String,
        quantity: Number
    }]
});

module.exports = mongoose.model('Card', cardSchema);

/*
Attribute:
1 - Dark
2 - Divine
3 - Earth
4 - Fire
5 - Light
6 - Water
7 - Wind

Type Card:
1 - Monster
2 - Trap
3 - Spell

Types:
1 - Normal Monster
2 - Effect Monster
3 - Ritual Monster
4 - Fusion Monster
5 - Synchro Monster
6 - Xyz Monster

Rarity
1 - Common
*/