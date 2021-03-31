const { NODE_ENV } = require('dotenv').config().parsed

const config = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/@typescript-eslint',
    'prettier/react',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.eslint.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['.eslintrc.js', 'index.d.ts'],
  rules: {
    'no-console': [NODE_ENV === 'dev' ? 'off' : 'error'],
    'import/newline-after-import': 'error',
    quotes: ['error', 'single'],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    semi: 'off',
    '@typescript-eslint/semi': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    '@typescript-eslint/comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    '@typescript-eslint/no-var-requires': ['off'],
    'import/order': 'error',
    'import/first': 'error',
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    'no-alert': 'off',
  },
}

module.exports = config
