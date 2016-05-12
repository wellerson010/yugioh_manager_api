'use strict'
module.exports = (model, object) => {
    let newObject = new model(object);
    if (object._id) {
        newObject.isNew = false;
    }
    return newObject.save();
}