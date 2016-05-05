const fs = require('fs');

module.exports = {
    rename: (oldPath, newPath) => {
        return new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, (err) => {
                (err) ? reject(err) : resolve();
            });
        });
    },
    delete: (path) => {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                (err) ? reject(err) : resolve();
            });
        });
    }
}