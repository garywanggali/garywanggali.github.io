// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1️⃣ 引入 Naive UI
import naive from 'naive-ui'

// 2️⃣ 引入 vue-i18n
import i18n from './i18n'

// 3️⃣ 创建 Vue 应用，并注册 Router、Naive UI、i18n
const app = createApp(App)
app.use(router)
app.use(naive)
app.use(i18n)
app.mount('#app')
