import {defineConfig} from 'vite'

import {resolve} from 'path'
import {fileURLToPath} from 'url'

import {extensionBuilder} from './build/vite-plugin-extension-builder'

export default defineConfig(({mode}) => ({
  plugins: [
    extensionBuilder({
      manifestPath: './src/entry/extension/manifest.ts',
      popupPath: './src/entry/popup/popup.html',
      outDir: 'dist',
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/entry/extension/main.ts'),
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
  define: {
    'process.env.NODE_ENV': JSON.stringify(mode),
  },
}))