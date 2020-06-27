const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const walk = require('walkdir');

let tree = [];

async function hashFile(filepath) {
  const file = fs.createReadStream(filepath);
  const hash = crypto.createHash('md5');
  const { dir, name, ext } = path.parse(filepath);
  return new Promise((res) => {
    file.on('readable', () => {
      const data = file.read();
      if (data) {
        hash.update(data);
      } else {
        const dig = hash.digest('hex');
        const newname = `${name}.${dig}${ext}`;
        const newpath = path.resolve(dir, newname);
        fs.renameSync(filepath, newpath);
        res(newname);
      }
    });
  });
}

async function* generateNewName(arr) {
  for (let i = 0; i < arr.length; i += 1) {
    let newname;
    const { base, ext } = path.parse(arr[i]);
    const match = tree.find((e) => e.includes(base));
    if (['.png', '.jpg', '.pdf'].includes(ext)) {
      newname = await hashFile(match);
    } else {
      newname = await makeNewFile(match);
    }
    yield [base, newname];
  }
}

async function updateHashedPaths(data) {
  let file = data.replace(/src\//g, '');
  const paths = file.match(/\.\.?\/(\w+\/)?[\w-]+\.(css|m?js|png|jpg|pdf)/g);
  if (paths) {
    const uniquePaths = [...new Set([...paths.filter((p) => !p.includes('service-worker', 'manifest.webmanifest'))])];
    for await (const p of generateNewName(uniquePaths)) {
      file = file.replace(new RegExp(p[0], 'g'), p[1]);
    }
    return file;
  }
  return data;
}

async function makeNewFile(file) {
  console.log('file: ', file);
  const resolvedFile = path.resolve(file);
  const data = await fs.promises.readFile(resolvedFile, 'utf8');
  const newFile = await updateHashedPaths(data);
  await fs.promises.writeFile(resolvedFile, newFile, 'utf8');
  const newname = resolvedFile.endsWith('html') ? resolvedFile : await hashFile(resolvedFile);
  return newname;
}

async function getFileTree(file) {
  const dirs = [];
  const filetree = await walk.async(path.dirname(file), {
    filter: (dir, files) => {
      dirs.push(dir);
      return files.filter((f) => !['icons', 'index.html', 'manifest.webmanifest'].includes(f));
    },
  });
  return [file, filetree.filter((f) => !dirs.includes(f))];
}

function sepArray([file, arr]) {
  tree = tree.concat(arr);
  return file;
}

getFileTree(process.argv[2])
  .then(sepArray)
  .then(makeNewFile)
  .catch((e) => console.error(e));
