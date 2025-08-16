/* eslint-disable no-console */
import {Plugin, ResolvedConfig, build} from 'vite'

import {mkdir, readFile, rm, writeFile} from 'fs/promises'
import {resolve} from 'path'

import packageJson from '../package.json' with { type: 'json' }

type TagData = {tag: string, attrs: Record<string, string | true>, injectTo: 'head' | 'body'}

const noCloseTagList = ['link']

const appendTag = (content: string, data: TagData): string => {
  let index: number = -1

  if (data.injectTo === 'body') {
    index = content.indexOf('</body>')
  }

  if (data.injectTo === 'head') {
    index = content.indexOf('</head>')
  }

  if (index === -1) {
    console.error(`HTML: "${ data.tag }" tag is not found`)
    return content
  }

  return content.substring(0, index) +
    `\n  <${ data.tag } ${ Object.keys(data.attrs).map(key => data.attrs[key] === true ? key : `${ key }="${ data.attrs[key] }"`).join(' ') }>${ noCloseTagList.includes(data.tag) ? '' : `</${ data.tag }>` }\n` +
    content.substring(index)
}

export function extensionBuilder({manifestPath, popupPath, outDir}: {
  manifestPath: string
  popupPath: string
  outDir: string
}): Plugin {
  let viteConfig: ResolvedConfig

  return {
    name: 'vite-plugin-extension-builder',
  
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },

    async buildStart() {
      await rm(outDir, {recursive: true, force: true})
      await mkdir(outDir, {recursive: true})

      const result = await build({
        configFile: false,
        build: {
          lib: {
            entry: resolve(manifestPath),
            formats: ['es'],
          },
          emptyOutDir: true,
          write: false,
        },
        resolve: viteConfig.resolve,
        define: viteConfig.define,
      })

      const compiledCode = Array.isArray(result)
        ? result[0].output[0].code
        : 'output' in result
          ? result.output[0].code
          :undefined

      if (!compiledCode) {
        throw new Error(`Failed to read ${ manifestPath } contents.`)
      }

      const moduleUrl = `data:text/javascript;base64,${ Buffer.from(compiledCode).toString('base64') }`
      const module = await import(moduleUrl)

      const content = {...module.default}

      content.version = packageJson.version

      const outputPath = resolve(outDir, 'manifest.json')

      await writeFile(
        outputPath,
        JSON.stringify(content, null, 2),
        'utf-8',
      )

      console.log(`✓ manifest.json generated at: ${ outputPath }`)
    },

    async closeBundle() {
      const content = await readFile(popupPath, 'utf-8')

      const tags: TagData[] = viteConfig.mode === 'development' ? [
        {tag: 'script', attrs: {type: 'module', src: '/@vite/client'}, injectTo: 'head'},
        {tag: 'script', attrs: {type: 'module', src: 'http://localhost:3221/main.ts'}, injectTo: 'body'},
      ] : [
        {tag: 'script', attrs: {type: 'module', crossorigin: true, src: 'popup/popup.js'}, injectTo: 'head'},
        {tag: 'link', attrs: {rel: 'stylesheet', crossorigin: true, href: 'popup/popup.css'}, injectTo: 'head'},
      ]

      const outputPath = resolve(outDir, 'popup.html')

      await writeFile(
        outputPath,
        tags.reduce((result, tag) => appendTag(result, tag), content),
        'utf-8',
      )

      console.log(`✓ popup.html for ${ viteConfig.mode } mode generated at: ${ outputPath }`)
    },
  }
}
