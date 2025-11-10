import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import BlogList from '../views/BlogList.vue'
import BlogArticle from '../views/BlogArticle.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/blog', name: 'BlogList', component: BlogList },
  { path: '/blog/:id', name: 'BlogArticle', component: BlogArticle, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
