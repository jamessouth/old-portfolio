const replace = require('replace-in-file');

module.exports = {
    fixPaths: async function(list) {
        let results;
        const options = {
            files: [
                'docs/index.html',
                'docs/css/*',
                'docs/js/*',
            ],
            from: [/src\//g, ...list[0]],
            to: ['', ...list[1]],
          };

        try {
            results = await replace(options);
        } catch (err) {
            console.error('replacement error: ', err);
        }
        return results;
    }
}
