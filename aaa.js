const replace = require('replace-in-file');



module.exports = {
    aaa: async function(list) {
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
        // const options2 = {
        //     files: [
        //         'docs/index.html',
        //         'docs/css/*',
        //         'docs/js/*',
        //     ],
        //     from: /src\//g,
        //     to: '',
        //   };

        try {
            results = await replace(options);
            // results2 = await replace(options2);
        } catch (err) {
            console.error('replacement error: ', err);
        }
        return results;
    }
}
