// const aaa = require('./aaa.js');

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const fileMap = {};

async function hashnames(inputDir) {
    const dir = await fs.promises.opendir(inputDir);
    for await (const dirent of dir) {
        const filename = inputDir + '/' + dirent.name;
        const refname = filename.replace('docs/', '');
        if (dirent.isDirectory() && dirent.name != 'icons') {
            hashnames(filename).catch(console.error);
        }
        if (dirent.isFile() && !['index.html', 'manifest.webmanifest'].includes(dirent.name)) {


            


            const file = fs.createReadStream(filename);
            const {name, ext} = path.parse(filename);
            const hash = crypto.createHash('md4');
            let dig;
            file.on('readable', () => {
                const data = file.read();
                if (data) {
                    hash.update(data);
                } else {
                    dig = hash.digest('hex');
                    const newname = inputDir + '/' + name + '.' + dig + ext;
                    // console.log('file: ', refname, newname);
                    fs.renameSync(filename, newname);
                    fileMap[refname] = newname;
                    console.log('map: ', fileMap);
                }
            });

        }
    }
    
    // aaa.aaa('helllllllloooooooooooooooooooooooooooooooooooo');
}

hashnames(process.argv[2]).catch(console.error);