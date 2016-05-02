'use strict'

const express = require('express'),
    path = require('path'),
    fileSystem = require('../common/file-system'),
    multer = require('multer'),
    router = express.Router(),
    errorRequest = require('../common/error-request'),
    deckRepository = require('../repository/deck-repository');

const upload = multer({dest: 'public/card_images'})

router.get('/all', (req, res) => {
    deckRepository.get().then((decks) => {
        res.send(decks);
    }, errorRequest.bind(null, res));
});

router.delete('/delete', (req, res) => {
    let id = req.body.id;
    deckRepository.delete().then((decks) => {
        res.send({ok: true});
    }, errorRequest.bind(null, res));
});

router.post('/save' , (req, res) => {
    let deck = req.body;
    deckRepository.save(deck).then((obj) => {
        res.send({
            id: obj._id
        });
    }, errorRequest.bind(null, res));
});

router.post('/uploadImage', upload.single('picture'), (req, res) => {
    let id = req.body.id,
        oldName = req.file.path,
        newName = 'public/card_images/' + id + path.extname(req.file.originalname);
    fileSystem.rename(oldName, newName).then(() => {
        res.send({ ok: true });
    }, errorRequest.bind(null, res));
   
});


module.exports = router;