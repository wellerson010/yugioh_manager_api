'use strict'

module.exports = (model, options) => {
    /*
    Options:
    O options pode ser um id ou um objeto de configuração de fato

    Configuração:
    id -> Id do elemento que se quer buscar
    fields - Campos que se deseja buscar, um array de text
    */
    if (!options) {
        options = {};
    }

    let id = (typeof options == 'string') ? options : options.id;
    if (id){
        return model.findOne({ _id: id });
    }
    else {
        let fields = {};

        if (options.fields) {
            for (let i = 0; i < options.fields.length; i++) {
                fields[options.fields[i]] = 1;
            }
        }

        return model.find({}, fields);
    }
}