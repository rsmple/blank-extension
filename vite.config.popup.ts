import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import {defineConfig} from 'vite'

import {resolve} from 'path'
import {fileURLToPath} from 'url'

export default defineConfig({
  root: resolve(__dirname, 'src/entry/popup'),
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [postcssImport(), tailwindcss({config: './tailwind/tailwind.config.ts'}), autoprefixer()],
    },
  },
  build: {
    outDir: resolve(__dirname, 'dist/popup'),
    emptyOutDir: true,
    rollupOptions: {
      input: resolve(__dirname, 'src/entry/popup/popup.ts'),
      output: {
        entryFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.names.includes('popup.css')) return 'popup.css'
          return '[name][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@popup': fileURLToPath(new URL('./src/entry/popup', import.meta.url)),
    },
  },
  server: {
    port: 3221,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    },
  },
})