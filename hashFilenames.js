const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

async function hashnames(path) {
    const dir = await fs.promises.opendir(path);
    for await (const dirent of dir) {
        if (dirent.isDirectory() && dirent.name != 'icons') {
            hashnames(path + '/' + dirent.name).catch(console.error);
        }
        if (dirent.isFile() && !['index.html', 'manifest.webmanifest'].includes(dirent.name)) {
            console.log('file: ', dirent.name);

            const filename = dirent.name;
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
                    fs.renameSync(filename, name + '.' + dig + ext);
                }
            });

        }
    }
}

hashnames(process.argv[2]).catch(console.error);