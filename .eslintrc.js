module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  env: {
    node: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-unused-vars': 'warn',
    'no-undef': 'warn',
    'no-sparse-arrays': 'warn',
    'no-fallthrough': 'warn',
    'no-unsafe-finally': 'warn',
  },
};
