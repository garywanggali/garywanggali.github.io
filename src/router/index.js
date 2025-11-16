import { createRouter, createWebHashHistory } from 'vue-router' // 改成 Hash
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
  { path: '/blog', redirect: { path: '/', hash: '#bloglist' } },
  { path: '/blog/:id', name: 'BlogArticle', component: BlogArticle, props: true },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', redirect: { path: '/', hash: '#contact' } },
  { path: '/skills', name: 'Skills', component: Skills },
  { path: '/projects', redirect: { path: '/', hash: '#projects' } },
  { path: '/ProjectsDetail/:id', name: 'ProjectDetail', component: ProjectDetail }
]

const router = createRouter({
  history: createWebHashHistory(), // 改这里
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition

    if (to.hash) {
      return new Promise((resolve) => {
        window.requestAnimationFrame(() => {
          const el = document.querySelector(to.hash)
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            resolve({ left: 0, top: el.getBoundingClientRect().top + window.scrollY })
          } else {
            window.scrollTo({ top: 0 })
            resolve({ left: 0, top: 0 })
          }
        })
      })
    }

    return { left: 0, top: 0 }
  }
})

export default router
