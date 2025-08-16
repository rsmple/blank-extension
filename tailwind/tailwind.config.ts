import type {Config} from 'tailwindcss'

import tailwindBase from 'eco-vue-js/tailwind-base'

export default {
  mode: 'jit',
  content: [
    './entry/popup/**/*',
    ...tailwindBase.content,
  ],
  presets: [
    tailwindBase,
  ],
} satisfies Config
