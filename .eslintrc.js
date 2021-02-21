module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'semi': 2,
    'linebreak-style': ['error', 'unix'],
    'import/prefer-default-export': 'off',
    'no-plusplus': 'off',
  },
  overrides: [
    {
      'files': ['src/components/MonsterBlock/Monsters/SVG/*.vue'],
      'rules': {
        'max-len': 'off',
        'vue/max-attributes-per-line': 'off',
        'vue/html-closing-bracket-spacing': 'off',
      },
    },
  ],
};
