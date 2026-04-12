import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ProjectsView from '../views/ProjectsView.vue'
import ContactView from '../views/ContactView.vue'
import FlightControllerView from '../views/FlightControllerView.vue'
import DebuggingFCView from '../views/DebuggingFCView.vue'
import ConfigCreatorView from '../views/ConfigCreator.vue'
import UartNoSignalView from '../views/debugging/UartNoSignalView.vue'
import ReceiverNotDetectedView from '../views/debugging/ReceiverNotDetectedView.vue'
import NoOsdDigitalView from '../views/debugging/NoOsdDigitalView.vue'
import NoOsdAnalogView from '../views/debugging/NoOsdAnalogView.vue'
import DroneJumpingFlippingView from '../views/debugging/DroneJumpingFlippingView.vue'
import FcHighCpuView from '../views/debugging/FcHighCpuView.vue'
import SticksInvertedView from '../views/debugging/SticksInvertedView.vue'

const routes = [
  { path: '/', component: HomeView, meta: { title: 'ShiroFPV — Home' } },
  { path: '/about', component: AboutView, meta: { title: 'ShiroFPV — About' } },
  { path: '/projects', component: ProjectsView, meta: { title: 'ShiroFPV — Projects' } },
  { path: '/contact', component: ContactView, meta: { title: 'ShiroFPV — Contact' } },
  { path: '/flight-controller', component: FlightControllerView, meta: { title: 'ShiroFPV — Flight Controller' } },
  { path: '/debugging', component: DebuggingFCView, meta: { title: 'ShiroFPV — Debugging your FC' } },
  { path: '/debugging/uart-no-signal', component: UartNoSignalView, meta: { title: 'ShiroFPV — No Signal from UART Device' } },
  { path: '/debugging/receiver-not-detected', component: ReceiverNotDetectedView, meta: { title: 'ShiroFPV — Receiver Not Detected' } },
  { path: '/debugging/no-osd-digital', component: NoOsdDigitalView, meta: { title: 'ShiroFPV — No OSD (Digital)' } },
  { path: '/debugging/no-osd-analog', component: NoOsdAnalogView, meta: { title: 'ShiroFPV — No OSD (Analog)' } },
  { path: '/debugging/drone-jumping-flipping', component: DroneJumpingFlippingView, meta: { title: 'ShiroFPV — Drone Jumping/Flipping on Arming' } },
  { path: '/debugging/fc-high-cpu', component: FcHighCpuView, meta: { title: 'ShiroFPV — FC High CPU Load' } },
  { path: '/debugging/sticks-inverted', component: SticksInvertedView, meta: { title: 'ShiroFPV — Sticks Inverted / Channel Map' } },
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
