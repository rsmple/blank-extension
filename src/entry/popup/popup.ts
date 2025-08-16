import './assets/styles/popup.css'

import {VueQueryPlugin} from '@tanstack/vue-query'
import {createApp} from 'vue'

import App from './App.vue'
import router from './router/router'
import {appendDarkMode} from './utils/darkMode'

appendDarkMode()

const app = createApp(App)

app.use(router)
app.use(VueQueryPlugin)

app.mount('#appPopup')
