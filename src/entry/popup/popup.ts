import './assets/styles/popup.css'

import {createApp} from 'vue'

import App from './App.vue'
import {appendDarkMode} from './utils/darkMode'

appendDarkMode()

const app = createApp(App)

app.mount('#appPopup')
