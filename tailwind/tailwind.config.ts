import type {Config} from 'tailwindcss'

import tailwindBase from 'eco-vue-js/tailwind-base'

export default {
  mode: 'jit',
  content: [
    './src/entry/popup/**/*{vue,ts}',
    ...tailwindBase.content,
  ],
  presets: [
    tailwindBase,
  ],
  theme: {
    extend: {
      colors: {
        'default-dark': '#22262E',
        'primary-light': '#f8fbff',
        primary: '#6892FD',
        'primary-dark': '#6892FD',
        'primary-darkest': '#0E1016',
      },
    },
  },
} satisfies Config
