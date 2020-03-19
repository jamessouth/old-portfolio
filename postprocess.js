const fs = require('fs');
const { Transform } = require('stream');
const fixpath = () => {
    return new Transform({
        transform(ch, _, cb) {
            const str = ch.toString();
            const newstr = str.replace(/src\//g, '');
            this.push(newstr);
            cb();
        }
    });
};

for (const path of process.argv.slice(2)) {
    const file = fs.createReadStream(path);
    const newfile = fs.createWriteStream(path.replace(/\d/, ''));
    file.pipe(fixpath()).pipe(newfile);
}