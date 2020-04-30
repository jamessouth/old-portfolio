const https = require('https');
const { Transform } = require('stream');


async function go(arr, pkg) {
    return new Promise(async res => {
        for (let i = 0; i < 37; i += 36) {
            let r = await getData(i, [], pkg);
            arr.push(r);
        }
        res(arr);
    });
}

async function run(arr) {
    let a = await Promise.all(arr.map(p => go([], p)));
    return a;
    // Promise.all([go([], 'terser')])
}

run(process.argv.slice(2))
.then(s => {
    console.log('gggg: ', s);
});

async function getData(i, arr, pkg) {
    return new Promise(res => {
        let cnt = 0;
        https.get(`https://www.npmjs.com/browse/depended/${pkg}?offset=${i}`, chunks =>
            chunks
            .pipe(filt())
            .pipe(filt2())
            .pipe(filt3(arr, cnt, res)));
    });
}


const filt2 = () => {
    return new Transform({
        transform(ch, _, cb) {
            let newstr;
            const str = ch.toString();
            if (/<h3.+h3>/g.test(str)) {
                newstr = str.match(/<h3.+h3>/g, '');
                // console.log('res: ', newstr);
                this.push(newstr + "\n")
            }
            cb();
        }
    });
};

const filt3 = (arr, c, r) => {
    return new Transform({
        transform(ch, _, cb) {
            let newstr;
            const str = ch.toString();
            newstr = str.match(/>.+(?=<\/h3)/g, '')[0].slice(1);
            if (newstr.startsWith("Help")) {

            } else {

                arr.push(newstr);
                // c++;
                // if (c == 36) {
                // }
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

// const wait = value => new Promise(resolve => {
//     setTimeout(() => resolve(value), 3000);
//   });
    
//   const fetchFoo = () => wait('foo');
//   const fetchBar = () => wait('bar');
//   const fetchBaz = () => wait('baz');
 
  
//   const fetchDataQuickly2 = async time => {
//     // Also good.
//     // const fooReady = fetchFoo();
//     // const barReady = fetchBar();
//     // const bazReady = fetchBaz();
  
//     // const foo = await fooReady;
//     // const bar = await barReady;
//     // const baz = await bazReady;
//     // return { foo, bar, baz, time: Date.now() - time };
//     return Promise.all([fetchFoo, fetchBar, fetchBaz].map(g => g()));
//   };
  
//   fetchDataQuickly2(Date.now())
//     .then((x) => {
//       console.log('fetched quickly:', x);
//     });