const fs = require('fs');
const { Transform } = require('stream');
const { StringDecoder } = require('string_decoder');
const decoder = new StringDecoder('utf8');
const fixpath = new Transform({
    transform(ch, enc, cb) {
        const chk = decoder.write(ch);
        const str = chk.toString();
        console.log('str: ', str);
        console.log();
        const newstr = str.replace(/src\//g, '');
        this.push(newstr);
        cb();
    }
});
const fixpath2 = new Transform({
    transform(ch, enc, cb) {
        const chk = decoder.write(ch);
        const str = chk.toString();
        console.log('str: ', str);
        console.log();
        const newstr = str.replace(/src\//g, '');
        this.push(newstr);
        cb();
    }
});



const file = fs.createReadStream(process.argv.slice(2)[0]);
const newfile = fs.createWriteStream(process.argv.slice(2)[0].replace(/(s|x)(?=\.)/, '$&2'));
file.pipe(fixpath).pipe(newfile);

const file2 = fs.createReadStream(process.argv.slice(2)[1]);
const newfile2 = fs.createWriteStream(process.argv.slice(2)[1].replace(/(s|x)(?=\.)/, '$&2'));
file2.pipe(fixpath2).pipe(newfile2);

// const file3 = fs.createReadStream(process.argv.slice(2)[2]);
// const newfile3 = fs.createWriteStream(process.argv.slice(2)[2].replace(/(s|x)(?=\.)/, '$&2'));
// file3.pipe(fixpath).pipe(newfile3);

// const file4 = fs.createReadStream(process.argv.slice(2)[3]);
// const newfile4 = fs.createWriteStream(process.argv.slice(2)[3].replace(/(s|x)(?=\.)/, '$&2'));
// file4.pipe(fixpath).pipe(newfile4);
    



