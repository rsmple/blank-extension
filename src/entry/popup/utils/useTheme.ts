import {computed, ref} from 'vue'

import {Theme} from 'eco-vue-js/dist/utils/utils'

import {STORAGE_KEY_THEME, appendDarkMode} from './darkMode'

const themeValue = ref<Theme>((await chrome.storage.local.get(STORAGE_KEY_THEME))[STORAGE_KEY_THEME])

export const useTheme = () => {
  const theme = computed<Theme>({
    get: () => themeValue.value ?? Theme.DARK,
    set: (value: Theme): void => {
      chrome.storage.local.set({[STORAGE_KEY_THEME]: value})
    
      themeValue.value = value
    
      appendDarkMode()
    },
  })

  return theme
}