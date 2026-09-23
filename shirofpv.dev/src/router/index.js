import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import FlightControllerView from '../views/FlightControllerView.vue'
import DebuggingFCView from '../views/DebuggingFCView.vue'
import ConfigCreatorView from '../views/ConfigCreator.vue'
import NotFoundView from '../views/NotFoundView.vue'

const DEFAULT_DESCRIPTION =
  'ShiroFPV — FPV hardware designer & pilot. Open-source AT32 flight controllers, KiCad designs, firmware, and FC debugging guides.'

const routes = [
  { path: '/', component: HomeView, meta: { title: 'ShiroFPV — Home', description: DEFAULT_DESCRIPTION } },
  { path: '/about', component: AboutView, meta: { title: 'ShiroFPV — About', description: 'FPV pilot turned open-source hardware designer. The story behind ShiroFPV, the skills, and the journey from first build to custom flight controllers.' } },
  { path: '/projects', component: ProjectsView, meta: { title: 'ShiroFPV — Projects', description: 'Open-source flight controllers, firmware, and tools built by ShiroFPV.' } },
  { path: '/contact', component: ContactView, meta: { title: 'ShiroFPV — Contact', description: 'Get in touch with ShiroFPV — collaborations, hardware questions, or just to talk FPV.' } },
  { path: '/flight-controller', component: FlightControllerView, meta: { title: 'ShiroFPV — Flight Controller', description: 'The ShiroFPV flight controller: open-source AT32F435 board for Betaflight. Specs, setup guide, DFU/flashing, and troubleshooting.' } },
  { path: '/debugging/:slug', redirect: (to) => ({ path: '/debugging', hash: '#' + to.params.slug }) },
  { path: '/debugging', component: DebuggingFCView, meta: { title: 'ShiroFPV — Debugging your FC', description: 'Practical guides for debugging common flight controller problems — UART, receivers, OSD, CPU load, and more.' } },
  { path: '/config-gen', component: ConfigCreatorView, meta: { title: 'ShiroFPV — Config Generator', description: 'Generate a Betaflight 4.5+ config.h from a Support ID or build key.' } },
  { path: '/:pathMatch(.*)*', component: NotFoundView, meta: { title: 'ShiroFPV — Page Not Found', description: DEFAULT_DESCRIPTION } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (to.hash) return { el: to.hash, top: 90 }
    if (saved) return saved
    return { top: 0 }
  },
})

function setMeta(selector, attr, value) {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

router.afterEach((to) => {
  const title = to.meta.title || 'ShiroFPV'
  const description = to.meta.description || DEFAULT_DESCRIPTION
  const url = `https://shirofpv.com${to.fullPath === '/' ? '/' : to.fullPath}`

  document.title = title
  setMeta('meta[name="description"]', 'content', description)
  setMeta('meta[property="og:title"]', 'content', title)
  setMeta('meta[property="og:description"]', 'content', description)
  setMeta('meta[property="og:url"]', 'content', url)
  setMeta('meta[name="twitter:title"]', 'content', title)
  setMeta('meta[name="twitter:description"]', 'content', description)
  setMeta('link[rel="canonical"]', 'href', url)
})

export default router
