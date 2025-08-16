import {Plugin, ResolvedConfig} from 'vite'

import {readFile, writeFile} from 'fs/promises'
import {resolve} from 'path'

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
    // eslint-disable-next-line no-console
    console.error(`HTML: "${ data.tag }" tag is not found`)
    return content
  }

  return content.substring(0, index) +
    `\n  <${ data.tag } ${ Object.keys(data.attrs).map(key => data.attrs[key] === true ? key : `${ key }="${ data.attrs[key] }"`).join(' ') }>${ noCloseTagList.includes(data.tag) ? '' : `</${ data.tag }>` }\n` +
    content.substring(index)
}

export const popupBuilder = (): Plugin => {
  let viteConfig: ResolvedConfig

  return {
    name: 'vite-plugin-popup-builder',
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },
    async buildStart() {
      const content = await readFile(resolve(viteConfig.root, 'popup.html'), 'utf-8')
      
      const tags: TagData[] = viteConfig.mode === 'development' ? [
        {tag: 'script', attrs: {type: 'module', src: '/@vite/client'}, injectTo: 'head'},
        {tag: 'script', attrs: {type: 'module', src: `http://localhost:${ viteConfig.server.port }/popup.ts`}, injectTo: 'body'},
      ] : [
        {tag: 'script', attrs: {type: 'module', crossorigin: true, src: 'popup/popup.js'}, injectTo: 'head'},
        {tag: 'link', attrs: {rel: 'stylesheet', crossorigin: true, href: 'popup/popup.css'}, injectTo: 'head'},
      ]
      
      const outputPath = resolve('dist', 'popup.html')
      
      await writeFile(
        outputPath,
        tags.reduce((result, tag) => appendTag(result, tag), content),
        'utf-8',
      )

      // eslint-disable-next-line no-console
      console.log(`✓ popup.html for ${ viteConfig.mode } mode generated at: ${ outputPath }`)
    },
  }
}