const https = require('https');
const { Transform } = require('stream');

const breakIntoSections = () => new Transform({
  transform(ch, _, cb) {
    const rows = ((this.partialRow || '') + ch.toString()).split(/<\/section>/);
    this.partialRow = rows.pop(); // eslint-disable-next-line no-restricted-syntax
    for (const row of rows) {
      this.push(`${row}\n`);
    }
    cb();
  },
  flush(cb) {
    this.push(this.partialRow || '');
    cb();
  },
});

const getH3s = () => new Transform({
  transform(ch, _, cb) {
    const str = ch.toString();
    if (/<h3.+h3>/g.test(str)) {
      const newstr = str.match(/<h3.+h3>/g, '');
      this.push(`${newstr}\n`);
    }
    cb();
  },
});

const getPackageNames = (arr, resolve) => new Transform({
  transform(ch, _, cb) {
    const str = ch.toString();
    const newstr = str.match(/>.+(?=<\/h3)/g, '')[0].slice(1);
    if (!newstr.startsWith('Help')) {
      arr.push(newstr);
    }
    cb();
  },
  flush(cb) {
    resolve(arr);
    cb();
  },
});

async function getData(offset, arr, pkg) {
  return new Promise((resolve) => {
    setTimeout(() => {
      https.get(`https://www.npmjs.com/browse/depended/${pkg}?offset=${offset}`, (chunks) => chunks
        .pipe(breakIntoSections())
        .pipe(getH3s())
        .pipe(getPackageNames(arr, resolve)));
    }, process.argv.slice(2).length * 1000);
  });
}

async function getDepArray(arr, pkg) { // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve) => {
    let data;
    let offset = 0;
    do { // eslint-disable-next-line no-await-in-loop
      data = await getData(offset, [], pkg);
      arr.push(data);
      offset += 36;
    } while (data.length > 0);
    resolve(arr);
  });
}

async function main(arr) {
  return Promise.all(arr.map((pkg) => getDepArray([], pkg)));
}

function getSharedDeps(arr) {
  return arr.reduce((acc, cur) => acc.filter((e) => cur.includes(e)));
}

main(process.argv.slice(2))
  .then((arr) => arr.map((subArr) => subArr.flat()))
  .then((results) => console.log('results: ', getSharedDeps(results)));


// deps common to terser, html-minifier, postcss:

// [
//     'assetgraph',
//     'vue-compment',
//     'vue-compment',
//     '@adaptcharm/render',
//     'miniprogram-ci',
//     'flexi-site-gen',
//     '@catalyst-elements/dev-utils',
//     '@astronomersiva/lego',
//     'gladejs',
//     '@amoutonbrady/sbg',
//     '@l1nyanm1ng/react-picture-viewer',
//     '@cannery/hoist'
//   ]
