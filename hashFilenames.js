// // const aaa = require('./aaa.js');


// const fileMap = {};
// // const fileList = [];

// async function getFiles(inputDir, fileList) {
//     const dir = await fs.promises.opendir(inputDir);
//     for await (const dirent of dir) {
//         const filename = inputDir + '/' + dirent.name;
//         if (dirent.isDirectory() && dirent.name != 'icons') {
//             getFiles(filename, fileList).catch(console.error);
//         }
//         if (dirent.isFile() && !['index.html', 'manifest.webmanifest'].includes(dirent.name)) {
//             console.log('fn: ', filename);
//             fileList.push(filename);
//         }
//     }
//     return fileList;
// }

// async function hashnames(inputDir) {
    
//     for await (const dirent of dir) {
        
//         const refname = filename.replace('docs/', '');

//         if (dirent.isFile() && !['index.html', 'manifest.webmanifest'].includes(dirent.name)) {


            




//         }
//     }
    
//     // aaa.aaa('helllllllloooooooooooooooooooooooooooooooooooo');
// }

// getFiles(process.argv[2], []).then(x => console.log('jjj: ', x)).catch(console.error);


const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

// adapted from https://stackoverflow.com/a/45130990
async function* getFiles(inputDir) {
  const dir = await fs.promises.readdir(inputDir, { withFileTypes: true });
  for (const dirent of dir) {
    const filepath = path.resolve(inputDir, dirent.name);
    if (dirent.isDirectory() && dirent.name != 'icons') {
      yield* getFiles(filepath);
    }
    if (dirent.isFile() && !['index.html', 'manifest.webmanifest'].includes(dirent.name)) {
        const file = fs.createReadStream(filepath);
        const {name, ext} = path.parse(filepath);
        const hash = crypto.createHash('md4');
        // let dig, newname;
        const newname = await hashFile(hash, file, name, ext, inputDir, filepath);

        yield [filepath, newname];
    }
  }
}

async function hashFile(hash, file, name, ext, inputDir, filepath) {
    return new Promise((res) => {
        file.on('readable', () => {
            const data = file.read();
            if (data) {
                hash.update(data);
            } else {
                const dig = hash.digest('hex');
                const newname = path.resolve(inputDir, name + '.' + dig + ext);
                // console.log('file: ', newname, inputDir, name + '.' + dig + ext);
                fs.renameSync(filepath, newname);
                // fileMap[refname] = newname;
                // console.log('map: ', fileMap);
                res(newname);
            }
        });
    });
}

async function createMap(dir, list) {
  for await (const f of getFiles(dir)) {
    list[f[0]] = f[1];
  }
  return list;
}

createMap(process.argv[2], {}).then(x => console.log('jjj: ', x)).catch(console.error);