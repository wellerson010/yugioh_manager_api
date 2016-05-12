'use strict'

const config = require('../config/config'),
    express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    errorRequest = require('../common/error-request'),
    cardRepository = require('../repository/card-repository');

const upload = multer({ dest: config.pathImageCard  })

//atom
const atomRouterGet = require('../atom/router/get');
const atomRouterGetAll = require('../atom/router/getAll');

router.get('/', atomRouterGet.bind(this, cardRepository));

router.get('/all', (req, res) => {
    let options = {
        fields: ['type_card', 'name', 'decks.quantity']
    };

    atomRouterGetAll(cardRepository, options, req, res);
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