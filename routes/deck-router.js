'use strict'

const config = require('../config/config'),
    express = require('express'),
    path = require('path'),
    fileSystem = require('../common/file-system'),
    multer = require('multer'),
    router = express.Router(),
    errorRequest = require('../common/error-request'),
    deckRepository = require('../repository/deck-repository');

const upload = multer({dest: 'public/card_images'})

router.get('/', (req, res) => {
    let id = req.query.id;

    deckRepository.get({id: id}).then((deck) => {
        res.send(deck);
    }, errorRequest.bind(null, res));
});

router.get('/all', (req, res) => {
    deckRepository.get().then((decks) => {
        res.send(decks);
    }, errorRequest.bind(null, res));
});

router.delete('/delete', (req, res) => {
    let id = req.query.id;
    deckRepository.get({ id: id }).then((deck) => {
        if (deck.picture) {
            fileSystem.delete(config.picturePath + deck.picture);
        }
        return deckRepository.delete(id);
    }).then(() => {
        let query = { _id: id };
        return deckRepository.update(query, { picture: null });
    }).then(() => {
        res.send({ ok: true });
    }).catch(errorRequest.bind(null, res));
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
        oldPath = req.file.path,
        extension = path.extname(req.file.originalname),
        newName = id + extension,
        newPath = config.picturePath + newName,
        query = { _id: id },
        update = { picture: newName };

    deckRepository.update(query, update).then(() => {
        return fileSystem.rename(oldPath, newPath)
    }).then(() => {
        res.send({ picture: newName });
    }, errorRequest.bind(null, res));
});


module.exports = router;