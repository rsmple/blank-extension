/* eslint-disable no-console */
import {Plugin, ResolvedConfig, build} from 'vite'

import {mkdir, rm, writeFile} from 'fs/promises'
import {resolve} from 'path'

import packageJson from '../package.json' with { type: 'json' }

export function extensionBuilder({manifestPath}: {
  manifestPath: string
}): Plugin {
  let viteConfig: ResolvedConfig

  return {
    name: 'vite-plugin-extension-builder',
  
    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },

    async buildStart() {
      await rm(viteConfig.build.outDir, {recursive: true, force: true})
      await mkdir(viteConfig.build.outDir, {recursive: true})

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

      const outputPath = resolve(viteConfig.build.outDir, 'manifest.json')

      await writeFile(
        outputPath,
        JSON.stringify(content, null, 2),
        'utf-8',
      )

      console.log(`✓ manifest.json generated at: ${ outputPath }`)
    },
  }
}
