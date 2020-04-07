const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');
const walk = require('walkdir');



let tree = [];

const wait = ms => new Promise((resolve) => setTimeout(resolve, ms));

async function inner(data) {
  let file = data.replace(/src\//g, '');
  const paths = file.match(/\.\.?\/(\w+\/)?\w+\.(css|m?js|png|jpg|pdf)/g);
  if (paths) {
    const uniquePaths = new Set([...paths]);
    let pathCount = uniquePaths.size;
    console.log('ppppppppppppp: ', paths);
    for await (const p of uniquePaths) {
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
        pathCount -= 1;

      } else {
        await hash(match);
        console.log('file: ', match);

      }
      
    }
    // hash file here
    console.log('here hash: ', file.slice(0, 20), pathCount);
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
// come back with path count store in map
    fs.writeFile(resolvedFile, newFile, 'utf8', async (err) => {
      if (err) throw err;
      const newname = resolvedFile.endsWith('html') ? resolvedFile : await hashFile(resolvedFile);
      // hash here
      console.log(': ', );
      console.log('wwrite: ', newname);
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

