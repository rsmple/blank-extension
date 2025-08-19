import {Theme} from 'eco-vue-js/dist/utils/utils'

export const STORAGE_KEY_THEME = 'theme'

export const getIsDark = async () => {
  return (await chrome.storage.local.get(STORAGE_KEY_THEME))[STORAGE_KEY_THEME] !== Theme.LIGHT
}

export const appendDarkMode = async () => {
  if (await getIsDark()) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
