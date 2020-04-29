const https = require('https');
const fs = require('fs');
const file = fs.createWriteStream('./depdata');
const { Transform } = require('stream');



https.get('https://www.npmjs.com/browse/depended/terser?offset=0', chunks => chunks.pipe(filt()).pipe(filt2()).pipe(filt3()).pipe(file));



const filt2 = () => {
    return new Transform({
        transform(ch, _, cb) {
            let newstr;
            const str = ch.toString();
            if (/<h3.+h3>/g.test(str)) {
                newstr = str.match(/<h3.+h3>/g, '');
                this.push(newstr + "\n")
                // console.log('mmmmm: ', newstr);
            }
            cb();
        }
    });
};

const filt3 = () => {
    return new Transform({
        transform(ch, _, cb) {
            let newstr;
            const str = ch.toString();
            newstr = str.match(/>.+(?=<\/h3)/g, '')[0].slice(1);
            if (newstr.startsWith("Help")) {

            } else {

                this.push(newstr + "\n")
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

// for (const path of process.argv.slice(2)) {
//     const file = fs.createReadStream(path);
//     const newfile = fs.createWriteStream(path.replace(/\d/, ''));
//     file.pipe(fixpath()).pipe(newfile);
// }