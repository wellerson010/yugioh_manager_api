'use strict';

module.exports = (model, query, update, putSetInQuery) => {
    if (typeof putSetInQuery == 'undefined') {
        putSetInQuery = true;
    }

    if (putSetInQuery && !update['$set']) {
        update = { $set: update };
    }
    let newDeck = new model();
    return model.update(query, update, { multi: true });
}