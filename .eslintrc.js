module.exports = {
    root: true,
    parserOptions: {
      "ecmaVersion": 6,
    },
    env: {
      browser: true,
      es6: true,
      worker: true,
    },
    "extends": "airbnb-base",
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      "indent": ["error", 2],
      'linebreak-style': ['error', 'windows'],
      'camelcase': ['error', { allow: [ 'art_one', 'art_two' ] }],
      'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    },
};
