const replace = require('replace-in-file');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function inner(data, direc) {
  const paths = data.match(/\.\.?\/(\w+\/)?\w+\.(css|m?js|png|jpg|pdf)/g);
  // console.log(`paths for ${file}: `, paths);
  
  paths && paths.forEach(async p => {
    const {dir, base, ext} = path.parse(p);
    if (['.png', '.jpg', '.pdf'].includes(ext)) {
      const fileToHash = path.resolve('docs', direc, p);
      console.log('image: ', fileToHash);
      await hashFile(fileToHash).then(x => console.log('newname: ', x));
    } else {
      console.log('file: ', p, dir, direc);
      if (dir == '.') {
        console.log('first: ', direc, base);
        hash(direc, base);
      } else {
        console.log('2nd: ', dir, base);
        hash(dir, base);
      }
    }
  });

}

function hash(direc, file) {
  console.log('filepath: ', path.resolve('docs', direc, file));
  const data = fs.readFileSync(path.resolve('docs', direc, file), {encoding: 'utf8'});
  
  


  inner(data, direc);

}




hash(process.argv[2], process.argv[3]);





// async function fixPaths(list) {
//   let results;
//   const options = {
//       files: [
//           'docs/index.html',
//           'docs/css/*',
//           'docs/js/*',
//       ],
//       from: [/src\//g, ...list[0]],
//       to: ['', ...list[1]],
//     };

//   try {
//       results = await replace(options);
//   } catch (err) {
//       console.error('replacement error: ', err);
//   }
//   return results;
// }

// getFiles function adapted from https://stackoverflow.com/a/45130990
// async function* getFiles(inputDir) {
//   const dir = await fs.promises.readdir(inputDir, { withFileTypes: true });
//   for (const dirent of dir) {
//     const filepath = path.resolve(inputDir, dirent.name);
//     if (dirent.isDirectory() && dirent.name != 'icons') {
//       yield* getFiles(filepath);
//     }
//     if (dirent.isFile() && !['index.html', 'manifest.webmanifest'].includes(dirent.name)) {
        
        
        
//         const newname = await hashFile(hash, file, name, ext, inputDir, filepath);
//         const oldname = name + ext;
//         yield [new RegExp(oldname, 'g'), newname];
//     }
//   }
// }

async function hashFile(filepath) {
    const file = fs.createReadStream(filepath);
    const hash = crypto.createHash('md5');
    const {dir, name, ext} = path.parse(filepath);
    return new Promise(res => {
        file.on('readable', () => {
            const data = file.read();
            if (data) {
                hash.update(data);
            } else {
                const dig = hash.digest('hex');
                const newname = name + '.' + dig + ext;
                const newpath = path.resolve(dir, newname);
                fs.renameSync(filepath, newpath);
                res(newname);
            }
        });
    });
}

// async function createLists(dir, list) {
//   // for await (const f of getFiles(dir)) {
//   //   list[0].push(f[0]);
//   //   list[1].push(f[1]);
//   // }
//   return list;
// }

// createLists(process.argv[2], [[], []])
//     .then(list => fixPaths(list))
//     .then(res => console.log('results: ', res))
//     .catch(console.error);