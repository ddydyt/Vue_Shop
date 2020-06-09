module.exports = {
  root: true,

  env: {
    node: true
  },

  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],

  parserOptions: {
    parser: 'babel-eslint'
  },

  rules: {
    'no-console': 'off',
    'no-debugger': 'off',
    'no-multiple-empty-lines' : [0,{max:100}],
    semi: 0
  },

  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ]
}
