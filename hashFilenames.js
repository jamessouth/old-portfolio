const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const walk = require('walkdir');

// paths in html are fine if src replaced with docs and resolved
// paths in css are rel
// index.mjs has both rel to js folder and rel to src
// links and projs just need src/ removed



const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

async function inner(data) {
  const file = data.replace(/src\//, '');
  const paths = file.match(/\.\.?\/(\w+\/)?\w+\.(css|m?js|png|jpg|pdf)/g);
  if (paths) {

    for await (const p of new Set([...paths])) {
      // await wait(1000);
      const {dir, base, ext} = path.parse(p);
      console.log('p: ', p, dir, base, ext);
      if (['.png', '.jpg', '.pdf'].includes(ext)) {
        // let fileToHash = ;
        // if (directory != 'docs') {

        //   fileToHash = path.resolve(path.join(__dirname, 'docs'), p.replace('src'));
        // } else {
        //   fileToHash = path.resolve(__dirname, p.replace('src'));

        // }
        // console.log('image: ', fileToHash);
        // const newname = await hashFile(fileToHash);
        // console.log('newname: ', newname);

      } else {
        console.log('file: ', p, dir);
        // if (dir == '.') {
        //   console.log('first: ', dir, base);
        //   await hash(path.join(__dirname, 'docs', p.replace('src', 'docs')));
        // } else {
          // console.log('2nd: ', dir, base);
          await hash(p);
        // }
      }
      
    }
  }
  





  

  

}


async function hash(file) {
  const resolvedFile = path.resolve(file);
  const {dir, base, ext} = path.parse(resolvedFile);
  console.log('hash func resolved file: ', resolvedFile, dir, base, ext);



  fs.readFile(resolvedFile, 'utf8', async (err, data) => {
    if (err) throw err;
    await inner(data);

  });
}

async function getFileTree(file) {
  const tree = await walk.async(path.dirname(file), {
    filter: (dir, files) => files.filter((file) => !['icons', 'index.html', 'manifest.webmanifest'].includes(file))
  });

  return tree;
}


// hash(process.argv[2]);
getFileTree(process.argv[2]).then(x => console.log('tree: ', x));





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
  wait(1000);
    // const file = fs.createReadStream(filepath);
    // const hash = crypto.createHash('md5');
    // const {dir, name, ext} = path.parse(filepath);
    // return new Promise(res => {
    //     file.on('readable', () => {
    //         const data = file.read();
    //         if (data) {
    //             hash.update(data);
    //         } else {
    //             const dig = hash.digest('hex');
    //             const newname = name + '.' + dig + ext;
    //             const newpath = path.resolve(dir, newname);
    //             fs.renameSync(filepath, newpath);
    //             res(newname);
    //         }
    //     });
    // });
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