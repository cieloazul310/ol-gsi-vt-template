module.exports = {
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    ecmaVersion: 'latest',
  },
};
