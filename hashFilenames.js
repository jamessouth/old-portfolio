const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const walk = require('walkdir');

// paths in html are fine if src replaced with docs and resolved
// paths in css are rel
// index.mjs has both rel to js folder and rel to src
// links and projs just need src/ removed

let tree = [];

const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

async function inner(data) {
  let file = data.replace(/src\//g, '');
  const paths = file.match(/\.\.?\/(\w+\/)?\w+\.(css|m?js|png|jpg|pdf)/g);

  if (paths) {
    console.log('ppppppppppppp: ', paths);
    for await (const p of new Set([...paths])) {
      // await wait(1000);
      const {dir, base, ext} = path.parse(p);
      console.log('p: ', p, dir, base, ext);
      const match = tree.find(e => e.includes(base));
      console.log('match: ', match);
      if (['.png', '.jpg', '.pdf'].includes(ext)) {
      
        const newname = await hashFile(match);
        console.log('newname: ', newname, p);

        // replace file names here
        console.log('here replace: ', );
        file = file.replace(new RegExp(base, 'g'), newname);


      } else {
        await hash(match);
        console.log('file: ', p, dir);

      }
      
    }
    // hash file here
    console.log('here hash: ', file.slice(0, 20));
    return file;

  } else {
    return data;
  }
  
}


async function hash(file) {
  const resolvedFile = path.resolve(file);
  console.log('hash func resolved file: ', resolvedFile);

  fs.readFile(resolvedFile, 'utf8', async (err, data) => {
    if (err) throw err;
    const newFile = await inner(data);
    fs.writeFile(resolvedFile, newFile, 'utf8', err => {
      if (err) throw err;
      // hash here
      console.log(': ', );
      console.log('wwrite: ', resolvedFile);
      console.log(': ', );

    });
    
  });
  
}

async function getFileTree(file) {
  const dirs = [];
  const tree = await walk.async(path.dirname(file), {
    filter: (dir, files) => {
      dirs.push(dir);
      return files.filter((file) => !['icons', 'index.html', 'manifest.webmanifest'].includes(file));
    }
  });

  return [file, tree.filter(f => !dirs.includes(f))];
}

function sepArray([file, arr]) {
  tree = tree.concat(arr);
  return file;
}

getFileTree(process.argv[2]).then(sepArray).then(hash);



async function hashFile(filepath) {
  // wait(1000);
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

