import {EXTENSION_NAME} from './models'

import pkg from '../package.json' assert { type: 'json' }

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: EXTENSION_NAME,
  version: pkg.version,
  action: {
    default_popup: 'popup.html',
  },
  content_scripts: [
    {
      matches: ['https://**/*'],
      js: ['content.js'],
      css: ['content.css'],
    },
  ],
  permissions: ['storage'],
  host_permissions: ['https://**/*'],
  icons: {
    128: 'logo128.png',
  },
}

export default manifest