<script setup>
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const menuOpen = ref(false)

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Flight Controller', path: '/flight-controller' },
  { name: 'Debugging', path: '/debugging' },
  { name: 'Config', path: '/config-gen' },
  { name: 'Contact', path: '/contact' },
]

function isActive(path) {
  return route.path === path || (path !== '/' && route.path.startsWith(path))
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function closeMenu() {
  menuOpen.value = false
}
</script>

<template>
  <nav class="glass-nav fixed top-0 left-0 right-0 z-50">
    <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex items-center justify-between h-14 sm:h-16">
        <RouterLink to="/" class="flex items-center space-x-2 group" @click="closeMenu">
          <span class="text-lg sm:text-xl font-bold gradient-text">ShiroFPV</span>
        </RouterLink>

        <div class="hidden md:flex items-center space-x-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-colors duration-200 min-h-[44px] flex items-center"
            :class="isActive(link.path)
              ? 'text-white gradient-border'
              : 'text-gray-400 hover:text-white'"
          >
            {{ link.name }}
          </RouterLink>
        </div>

        <button
          class="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          @click="toggleMenu"
          aria-label="Toggle menu"
        >
          <span
            class="w-6 h-0.5 bg-gray-300 transition-all duration-300"
            :class="menuOpen ? 'rotate-45 translate-y-2' : ''"
          ></span>
          <span
            class="w-6 h-0.5 bg-gray-300 transition-all duration-300"
            :class="menuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="w-6 h-0.5 bg-gray-300 transition-all duration-300"
            :class="menuOpen ? '-rotate-45 -translate-y-2' : ''"
          ></span>
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
       <div v-if="menuOpen" class="md:hidden glass-nav border-t border-purple-500/20">
        <div class="px-3 sm:px-4 py-2 space-y-1">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="block px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-colors duration-200 min-h-[44px] flex items-center"
            :class="isActive(link.path)
              ? 'text-white bg-purple-500/20'
              : 'text-gray-400 hover:text-white hover:bg-white/5'"
            @click="closeMenu"
          >
            {{ link.name }}
          </RouterLink>
          <a
            href="https://support.shirofpv.dev"
            target="_blank"
            rel="noopener noreferrer"
            class="block px-3 py-2.5 rounded-lg text-xs sm:text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200 min-h-[44px] flex items-center"
            @click="closeMenu"
          >
            Support
          </a>
        </div>
      </div>
    </Transition>
  </nav>
</template>