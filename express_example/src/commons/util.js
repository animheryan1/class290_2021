const fs = require('fs');

const ADMIN = 'admin';
const CUSTOMER = 'customer';
const DEFAULT_ROLE = CUSTOMER;

module.exports = {
    writeInFile(content) {
        return new Promise((resolve) => {
            fs.writeFile('content.txt', content, {encoding: 'utf-8'}, () => {
                resolve();
            });
        })
    },

    readFromFile() {
        return new Promise((resolve, reject) => {
            fs.readFile('content.txt', (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            });
        });
    },
    ADMIN,
    CUSTOMER,
    DEFAULT_ROLE
}