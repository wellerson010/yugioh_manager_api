const fs = require('fs');

module.exports = {
    delete: (path) => {
        return new Promise((resolve, reject) => {
            fs.unlink(path, (err) => {
                if (err && err.code == 'ENOENT') {
                    err = null;
                }
                (err) ? reject(err) : resolve();
            });
        });
    },
    rename: (oldPath, newPath) => {
        return new Promise((resolve, reject) => {
            fs.rename(oldPath, newPath, (err) => {
                (err) ? reject(err) : resolve();
            });
        });
    }
}