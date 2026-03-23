<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const subNav = [
  { name: 'Overview', path: '/flight-controller/overview' },
  { name: 'Hardware', path: '/flight-controller/hardware' },
  { name: 'Software', path: '/flight-controller/software' },
  { name: 'Setup Guide', path: '/flight-controller/setup' },
  { name: 'SFPVF435 DFU Guide', path: '/flight-controller/dfu' },
]
</script>

<template>
  <div class="pt-24 pb-16">

    <!-- Page header -->
    <div class="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10" style="background: linear-gradient(135deg, #b48bff 0%, #ff8fd4 50%, #7dd3ff 100%);"></div>
      <div class="relative z-10 max-w-6xl mx-auto">
        <RouterLink to="/flight-controller" class="inline-flex items-center gap-2 text-xs sm:text-sm mb-3 sm:mb-4 transition-colors duration-200" style="color: #d7b7ff;">
          <svg class="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
          Flight Controller
        </RouterLink>
        <slot name="header" />
      </div>
    </div>

    <!-- Sub-navigation chips -->
    <nav class="py-3 sm:py-4 px-4 sm:px-6 lg:px-8 border-b" style="border-color: rgba(180,139,255,0.15);" aria-label="Flight Controller sections">
      <div class="max-w-6xl mx-auto flex flex-wrap gap-2 sm:gap-3">
        <RouterLink
          v-for="link in subNav"
          :key="link.path"
          :to="link.path"
          class="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200"
          :class="route.path === link.path
            ? 'text-white'
            : 'glass-card text-gray-300 hover:text-white'"
          :style="route.path === link.path
            ? 'background: linear-gradient(135deg, #b48bff, #ff8fd4); box-shadow: 0 4px 15px rgba(255,143,212,0.3);'
            : ''"
        >
          {{ link.name }}
        </RouterLink>
      </div>
    </nav>

    <!-- Content -->
    <div class="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <slot />
      </div>
    </div>

  </div>
</template>
