// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 1️⃣ 引入 Naive UI
import { create, NButton, NCard, NLayout, NMenu } from 'naive-ui'

// 2️⃣ 创建 Naive UI 对象，注册你需要的组件
const naive = create({
  components: [NButton, NCard, NLayout, NMenu]
})

// 3️⃣ 创建 Vue 应用，并全局使用 router 和 Naive UI
createApp(App)
  .use(router)
  .use(naive)
  .mount('#app')
