import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import FlightControllerView from '../views/FlightControllerView.vue'
import DebuggingFCView from '../views/DebuggingFCView.vue'
import ConfigCreatorView from '../views/ConfigCreator.vue'

const routes = [
  { path: '/', component: HomeView, meta: { title: 'ShiroFPV — Home' } },
  { path: '/about', component: AboutView, meta: { title: 'ShiroFPV — About' } },
  { path: '/projects', component: ProjectsView, meta: { title: 'ShiroFPV — Projects' } },
  { path: '/contact', component: ContactView, meta: { title: 'ShiroFPV — Contact' } },
  { path: '/flight-controller', component: FlightControllerView, meta: { title: 'ShiroFPV — Flight Controller' } },
  { path: '/debugging', component: DebuggingFCView, meta: { title: 'ShiroFPV — Debugging your FC' } },
  { path: '/config-gen', component: ConfigCreatorView, meta: { title: 'ShiroFPV — Config Generator' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title || 'ShiroFPV'
})

export default router
