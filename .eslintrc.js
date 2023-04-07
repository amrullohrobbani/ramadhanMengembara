module.exports = {
  root: true,
  env: {
    'shared-node-browser': true,
    es2022: true
  },
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@babel/eslint-parser',
    sourceType: 'module'
  },
  extends: [
    '@nuxt',
    '@nuxt/eslint-config',
    'eslint:recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier', 'nuxt'],
  rules: {}
}
