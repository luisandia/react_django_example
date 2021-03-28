const ERROR = 'error';
const WARN = 'warn';
const OFF = 'off';

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'import'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': ERROR,
    'no-console': [WARN, { allow: ['info', 'warn', 'error'] }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [OFF],
    'no-debugger': ['off'],
    'import/prefer-default-export': OFF,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'jsx-a11y/click-events-have-key-events': [OFF],
    'jsx-a11y/no-noninteractive-element-interactions': [OFF],
    'jsx-a11y/label-has-associated-control': [OFF],
    'no-unused-vars': [OFF],
    '@typescript-eslint/no-unused-vars': [OFF],
    'react/require-default-props': [OFF],
    'react/prop-types': [OFF],
    camelcase: [ERROR, { ignoreDestructuring: true, properties: 'never' }],
    'global-require': [OFF],
    'import/no-extraneous-dependencies': [ERROR, { devDependencies: true }],
  },
};
