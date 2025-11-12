import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BlogList from '../views/BlogList.vue'
import BlogArticle from '../views/BlogArticle.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Skills from '../views/Skills.vue'
import Projects from '../views/Projects.vue'
import ProjectDetail from '../views/ProjectDetail.vue'

const routes = [
  { path: '/', name:'Home',component: Home },
  { path: '/blog', name: 'BlogList', component: BlogList },
  { path: '/blog/:id', name: 'BlogArticle', component: BlogArticle, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/skills', name: 'Skills', component: Skills },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/ProjectsDetail/:id', name: 'ProjectDetail', component: ProjectDetail}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果浏览器后退/前进，保留 savedPosition
    if (savedPosition) return savedPosition

    // 如果有 hash（比如 #skills），尝试滚动到该元素（平滑）
    if (to.hash) {
      return new Promise((resolve) => {
        // 等 Vue 更新 DOM
        window.requestAnimationFrame(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            // 仍然需要返回一个位置（可返回 top ）
            resolve({ left: 0, top: el.getBoundingClientRect().top + window.scrollY })
          } else {
            // 找不到元素就滚到顶部
            window.scrollTo({ top: 0 })
            resolve({ left: 0, top: 0 })
          }
        })
      })
    }

    // 默认滚到页面顶部
    return { left: 0, top: 0 }
  }
})


export default router
