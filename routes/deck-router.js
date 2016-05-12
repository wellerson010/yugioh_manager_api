'use strict'

const config = require('../config/config'),
    express = require('express'),
    path = require('path'),
    fileSystem = require('../common/file-system'),
    multer = require('multer'),
    router = express.Router(),
    errorRequest = require('../common/error-request'),
    deckRepository = require('../repository/deck-repository');

//atom
const atomRouterGet = require('../atom/router/get');
const atomRouterGetAll = require('../atom/router/getAll');

const upload = multer({ dest: config.pathImageDeck })

router.get('/', atomRouterGet.bind(this, deckRepository));

router.get('/all', atomRouterGetAll.bind(this, deckRepository, null));

router.delete('/delete', (req, res) => {
    let id = req.query.id;
    deckRepository.get({ id: id }).then((deck) => {
        if (deck.picture) {
            fileSystem.delete(config.pathImageDeck + deck.picture);
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
        newPath = config.pathImageDeck + newName,
        query = { id: id },
        update = { picture: newName };
    deckRepository.update(query, update).then(() => {
        return fileSystem.delete(newPath);
    }).then(() => {
        return fileSystem.rename(oldPath, newPath)
    }).then(() => {
        res.send({ picture: newName });
    }, errorRequest.bind(null, res));
});

router.delete('/deleteImage', (req, res) => {
    let id = req.query.id,
        query = { id: id },
        update = { picture: null };
    deckRepository.get(query).then((deck) => {
        let picture = deck.picture;
        return fileSystem.delete(config.pathImageDeck + picture);
    }).then(() => {
        return deckRepository.update(query, update);
    }).then(() => {
        res.send({ok: true});
    }).catch(errorRequest.bind(null, res));
});


module.exports = router;