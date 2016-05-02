'use strict'

const express = require('express'),
    router = express.Router(),
    errorRequest = require('../common/error-request'),
    cardRepository = require('../repository/card-repository');

router.get('/', (req, res) => {
    let id = req.query.id;
    cardRepository.get(id).then((card) => {
        let cardObject = card.toObject();
        cardObject.attr = 'aa';
        res.send(cardObject);
    }, errorRequest.bind(null, res));
});

router.get('/all', (req, res) => {
    let options = {
        fields: ['type_card', 'name', 'decks.quantity']
    };
    cardRepository.get(options).then((cards) => {
        let cardsObject = [];
        for (let i = 0; i < cards.length; i++) {
            let quantity = 0,
                decks = cards[i].decks;
            if (decks && decks.length > 0) {
                for (let j = 0; j < decks.length; j++) {
                    quantity += decks[j].quantity;
                }
            }
            let cardObject = cards[i].toObject();
            cardObject.quantity = quantity;
            delete cardObject.decks;
            cardsObject.push(cardObject);
        }

        res.send(cardsObject);
    }, errorRequest.bind(null, res));
});

router.get('/status', (req, res) => {
    cardRepository.getCountsStats().then((obj) => {
        res.send(obj);
    }, errorRequest.bind(null, res));
});

router.post('/save', (req, res) => {
    let card = req.body;
    cardRepository.save(card).then((obj) => {
        res.send({
            msg: 'Carta criada com sucesso!',
            obj: obj
        });
    }, errorRequest.bind(null, res));
});

router.post('/addInDeck', (req, res) => {
    let cardId = req.body.cardId,
        deckId = req.body.deckId,
        rarity = req.body.rarity,
        identifier = req.body.identifier,
        quantity = req.body.quantity;

    if (!cardId) {
        errorRequest(res, 'O card id não pode ser vazio!');
    }
    if (!deckId) {
        errorRequest(res, 'O deck id não pode ser vazio!');
    }

    cardRepository.addInDeck(cardId, deckId, rarity, identifier, quantity).then(() => {
        res.send({
            msg: 'Carta adicionada no deck!'
        });
    }, errorRequest.bind(null, res));
});

module.exports = router;