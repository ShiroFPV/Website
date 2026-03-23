import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import FlightControllerView from '../views/FlightControllerView.vue'
import FCOverviewView from '../views/fc/FCOverviewView.vue'
import FCHardwareView from '../views/fc/FCHardwareView.vue'
import FCSoftwareView from '../views/fc/FCSoftwareView.vue'
import FCSetupView from '../views/fc/FCSetupView.vue'
import FCDFUView from '../views/fc/FCDFUView.vue'
import ConfigCreatorView from '../views/ConfigCreator.vue'

const routes = [
  { path: '/', component: HomeView, meta: { title: 'ShiroFPV — Home' } },
  { path: '/about', component: AboutView, meta: { title: 'ShiroFPV — About' } },
  { path: '/projects', component: ProjectsView, meta: { title: 'ShiroFPV — Projects' } },
  { path: '/contact', component: ContactView, meta: { title: 'ShiroFPV — Contact' } },
  { path: '/flight-controller', component: FlightControllerView, meta: { title: 'ShiroFPV — Flight Controller' } },
  { path: '/flight-controller/overview', component: FCOverviewView, meta: { title: 'ShiroFPV FC — Overview' } },
  { path: '/flight-controller/hardware', component: FCHardwareView, meta: { title: 'ShiroFPV FC — Hardware' } },
  { path: '/flight-controller/software', component: FCSoftwareView, meta: { title: 'ShiroFPV FC — Software' } },
  { path: '/flight-controller/setup', component: FCSetupView, meta: { title: 'ShiroFPV FC — Setup Guide' } },
  { path: '/flight-controller/dfu', component: FCDFUView, meta: { title: 'ShiroFPV FC — DFU Mode' } },
  { path: '/config-gen', component: ConfigCreatorView, meta: { title: 'ShiroFPV — Config Generator' } }
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
