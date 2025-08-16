
import {EXTENSION_NAME} from '@/models/models'
import pkg from '../../../package.json' assert { type: 'json' }

const manifest: chrome.runtime.ManifestV3 = {
  manifest_version: 3,
  name: EXTENSION_NAME,
  version: pkg.version,
  action: {
    default_popup: 'popup.html',
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['content.js'],
    },
  ],
  permissions: ['storage'],
  host_permissions: ['<all_urls>'],
  icons: {
    128: 'logo128.png',
  },
}

export default manifest