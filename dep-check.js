const https = require('https');
const { Transform } = require('stream');


async function go(arr, pkg) {
    return new Promise(async res => {
        for (let i = 0; i < 73; i+=36) {
            let r = await getData(i, [], pkg);
            arr.push(r);
        }
        res(arr);
    });
}

go([], 'terser').then(s => {
    let g = [];
    for (let a of s) {
        g.push(...a);
    }
    console.log('gggg: ', g.length);
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

                arr.push(newstr)
                c++;
                if (c == 36) {
                    r(arr);
                }
            }
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
