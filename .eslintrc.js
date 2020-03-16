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
      'camelcase': ['error', { allow: [ 'art_paint_one', 'art_paint_two' ] }],
      'no-unused-expressions': ['error', { 'allowShortCircuit': true }],
      'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    },
};
