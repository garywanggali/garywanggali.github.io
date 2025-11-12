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
})

export default router
