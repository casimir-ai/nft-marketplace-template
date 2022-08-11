module.exports = {
  root: true,
  extends: [
    '@casimir/eslint-config',
    '@casimir/eslint-config/vue'
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@', './src']
        ],
        extensions: ['.js', '.vue']
      }
    }
  }
};
