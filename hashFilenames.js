const crypto = require('crypto');
const fs = require('fs');
const path = require('path');




const filename = './yyy.txt';
const {name, ext} = path.parse(filename);
const hash = crypto.createHash('md4');
let dig;
file.on('readable', () => {
    const data = file.read();
    if (data) {
        hash.update(data);
    } else {
        dig = hash.digest('hex');
        console.log('dig: ', dig + ' ' + 'yyy.txt');
        fs.renameSync(filename, name + '.' + dig + ext);
    }
});