import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import tailwindcss from 'tailwindcss'
import {CSSOptions, defineConfig} from 'vite'

import {resolve} from 'path'
import {fileURLToPath} from 'url'

import {extensionBuilder} from './build/vite-plugin-extension-builder'

export default defineConfig({
  plugins: [
    extensionBuilder({
      manifestPath: './src/entry/extension/manifest.ts',
      publicDir: 'public',
      outDir: 'dist',
    }),
  ],
  css: {
    postcss: {
      plugins: [
        postcssImport(),
        tailwindcss({config: './tailwind.config.ts'}),
        autoprefixer(),
      ] as CSSOptions['postcss'] extends {plugins: infer P} ? P : never,
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'src/entry/popup/popup.html'),
        content: resolve(__dirname, 'src/entry/content/content.ts'),
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})