'use strict'

const modelCard = require('../models/card'),
    get = require('../atom/repository/get'),
    deckRepository = require('./deck-repository');

const cardRepository = {
    addInDeck: (cardId, deckId, rarity, identifier, quantity) => {
        return deckRepository.get(deckId).then(deck => {
                return cardRepository.get(cardId);
            }).then(card => {
                if (!card.deck) {
                    card.deck = [];
                }

                let deckIndex = -1;

                card.decks.every((element, index) => {
                    if (element.deck_id == deckId) {
                        deckIndex = index;
                        return false;
                    }
                    return true;
                });

                if (deckIndex >= 0) {
                    card.decks[deckIndex].quantity += quantity;
                }
                else {
                    card.decks.push({
                        deck_id: deckId,
                        rarity: rarity,
                        identifier: identifier,
                        quantity: quantity
                    });
                }
                return cardRepository.save(card);
            });
    },
    count: (query) => {
        return modelCard.count(query);
    },
    get: (options) => {
        return get(modelCard, options);
    },
    getCountsStats: () => {
        let cardsMonters = 0,
            cardsSpells = 0,
            cardsTrap = 0;

        return cardRepository.count({ type_card: 1 }).then((count) => {
            cardsMonters = count;
            return cardRepository.count({type_card: 2});
        }).then((count) => {
            cardsTrap = count;
            return cardRepository.count({ type_card: 3 });
        }).then((count) => {
            cardsSpells = count;
            return {
                monstersUnique: cardsMonters,
                spellsUnique: cardsSpells,
                trapsUnique: cardsTrap
            }
        });
    },
    save: (card) => {
        let newCard = new modelCard(card);
        return newCard.save();
    },
};

module.exports = cardRepository;