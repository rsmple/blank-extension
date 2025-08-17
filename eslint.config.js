import plugin from 'eco-vue-js/eslint/plugin'

export default [
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,js,mts,tsx,vue,json,svg}'],
  },

  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/node_modules/**'],
  },

  ...plugin.configs.recommended({
    tsConfig: [
      './tsconfig.json',
      './tsconfig.node.json',
      './tsconfig.src.json',
      './tsconfig.vue.json',
    ],
  }),
]
