module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      modules: true,
      jsx: true,
    },
  },
  env: {
    es2021: true,
    browser: true,
    node: true,
    commonjs: true,
  },
  extends: ['eslint:recommended', 'airbnb', 'plugin:prettier/recommended'],
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'prefer-const': ['error', {}],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'jsx-a11y/no-static-element-interactions': [0],
    'jsx-a11y/click-events-have-key-events': [0],
    'jsx-a11y/media-has-caption': [0],
    'class-methods-use-this': ['warn', {}],
    'no-restricted-exports': ['error', { restrictedNamedExports: ['then'] }],
    'no-underscore-dangle': [
      'warn',
      {
        allowAfterThis: true,
        allowAfterSuper: true,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
  },
  overrides: [
    {
      files: ['.settings/**/*'],
      rules: {
        'import/no-extraneous-dependencies': [
          'error',
          {
            devDependencies: true,
            optionalDependencies: false,
            peerDependencies: true,
            packageDir: ['./'],
          },
        ],
      },
    },
  ],
  ignorePatterns: ['.parcel-cache', 'node_modules', '!.settings'],
};
