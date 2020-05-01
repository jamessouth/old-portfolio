const https = require('https');
const { Transform } = require('stream');


async function go(arr, pkg) {
    return new Promise(async res => {
        let r;
        let i = 0;
        do {
            r = await getData(i, [], pkg);
            arr.push(r);
            i += 36;
        } while (r.length > 0);
        res(arr);
    });
}

async function run(arr) {
    return await Promise.all(arr.map(p => go([], p)));
}

run(process.argv.slice(2))
.then(e => e.map(y => y.flat()))
.then(s => {
    console.log('gggg: ', red(s));
});

async function getData(i, arr, pkg) {
    return new Promise(res => {
        setTimeout(() => {
            console.log('fired off: ', pkg, Date.now());
            https.get(`https://www.npmjs.com/browse/depended/${pkg}?offset=${i}`, chunks =>
            chunks
            .pipe(filt())
            .pipe(filt2())
            .pipe(filt3(arr, res)));
        }, 3200);
    });
}


const filt2 = () => {
    return new Transform({
        transform(ch, _, cb) {
            let newstr;
            const str = ch.toString();
            if (/<h3.+h3>/g.test(str)) {
                newstr = str.match(/<h3.+h3>/g, '');
                this.push(newstr + "\n")
            }
            cb();
        }
    });
};

const filt3 = (arr, r) => {
    return new Transform({
        transform(ch, _, cb) {
            const str = ch.toString();
            const newstr = str.match(/>.+(?=<\/h3)/g, '')[0].slice(1);
            if (!newstr.startsWith("Help")) {
                arr.push(newstr);
            }
            cb();
        },
        flush(cb) {
            r(arr);
            cb();
          }
    });
};

const filt = () => {
    return new Transform({
        transform(ch, enc, cb) {
            const rows = ((this.partialRow || '') + ch.toString()).split(/<\/section>/);
            this.partialRow = rows.pop();
            for (let row of rows) {
              this.push(row + "\n");
            }
            cb();
          },
          flush(cb) {
            this.push(this.partialRow || '');
            cb();
          }
    });
};

function red(arr) {
    return arr.reduce((acc, cur) => {
        return acc.filter(e => cur.includes(e));
    });
}

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