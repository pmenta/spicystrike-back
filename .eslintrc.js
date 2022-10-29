module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'no-promise-executor-return': 'off',
    camelcase: 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-param-reassign': 'off',
    'array-callback-return': 'off',
  },
  settings: {
    'import/resolver': {
      'import/resolver': {
        typescript: {},
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
