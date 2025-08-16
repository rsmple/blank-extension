import './assets/styles/popup.css'

import {createApp} from 'vue'

import App from './App.vue'
import router from './router/router'
import {appendDarkMode} from './utils/darkMode'

appendDarkMode()

const app = createApp(App)

app.use(router)

app.mount('#appPopup')
