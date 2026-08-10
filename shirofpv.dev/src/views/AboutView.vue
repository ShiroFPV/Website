<script setup>
import { RouterLink } from 'vue-router'
import SkillBadge from '../components/SkillBadge.vue'

const bio = [
  { icon: '⚡', text: 'Designs custom flight controllers on STM32 / AT32, targeting Betaflight compatibility.' },
  { icon: '🔧', text: 'PCB layout in KiCad, from schematic to finished board.' },
  { icon: '🌐', text: 'Everything open source — schematics, firmware, and tools alike.' },
  { icon: '🏳️‍⚧️', text: "Also yes, a femboy who designs flight controllers. The ESCs don't care, and honestly neither should you." },
]

const skills = [
  { skill: 'PCB Design', icon: '🔧' },
  { skill: 'STM32', icon: '⚡' },
  { skill: 'C Programming', icon: '💻' },
  { skill: 'Betaflight', icon: '🚁' },
  { skill: 'Hardware Design', icon: '🛠️' },
  { skill: '3D Modeling', icon: '📐' },
  { skill: 'KiCad', icon: '🔌' },
  { skill: 'FPV Piloting', icon: '🎮' },
  { skill: 'Open Source', icon: '🌐' },
  { skill: 'Firmware Dev', icon: '📟' },
]

const timeline = [
  {
    year: '2022',
    title: 'Started FPV',
    description: 'Discovered the world of FPV drones and immediately fell in love with the freedom of flight.',
  },
  {
    year: '2022',
    title: 'First Build',
    description: 'Built my first FPV quad from scratch — learned how every component works, every solder joint has to be done perfectly, to fix "almost" any issues.',
  },
  {
    year: '2024',
    title: 'Hardware Design Begins',
    description: 'Started learning PCB design with KiCad. Realized I wanted to build my own flight controller.',
  },
  {
    year: '2025',
    title: 'ShiroFPV FC v1',
    description: 'Designed and manufactured the first version of the ShiroFPV flight controller. Open-sourced it immediately.',
  },
  {
    year: '2026',
    title: 'Improvement',
    description: 'Currently improving the design and working on optimizing the flight controller',
  },
]
</script>

<template>
  <div class="pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="glass-card rounded-2xl overflow-hidden mb-14 sm:mb-16">
        <div class="h-24 sm:h-32" style="background: linear-gradient(135deg, rgba(109,94,242,0.4), rgba(109,94,242,0.06) 70%);"></div>

        <div class="px-5 sm:px-8 pb-6 sm:pb-8">
          <div class="-mt-10 sm:-mt-12 mb-4">
            <div
              class="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl"
              style="background: linear-gradient(135deg, rgba(109,94,242,0.3), rgba(109,94,242,0.06)); border: 4px solid var(--surface);"
            >
              🚁
            </div>
          </div>

          <div class="mb-5">
            <div class="flex items-baseline flex-wrap gap-x-2 gap-y-1">
              <h1 class="text-xl sm:text-2xl font-bold text-white">ShiroFPV</h1>
              <span class="text-sm" style="color: var(--text-muted);">@shirofpv</span>
            </div>
            <p class="text-sm mt-1" style="color: var(--text-secondary);">
              FPV pilot · Open-source hardware designer · Microcontroller enthusiast
            </p>
          </div>

          <div class="h-px mb-5" style="background: var(--border-subtle);"></div>

          <ul class="space-y-2.5 mb-5">
            <li v-for="item in bio" :key="item.text" class="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed">
              <span class="flex-shrink-0" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.text }}</span>
            </li>
          </ul>

          <div class="h-px mb-4" style="background: var(--border-subtle);"></div>

          <div class="flex items-center justify-between flex-wrap gap-3">
            <span class="text-xs" style="color: var(--text-muted);">Building FPV hardware since 2022</span>
            <div class="flex gap-2">
              <RouterLink to="/contact" class="btn-outline text-xs px-4 py-2">Get in touch</RouterLink>
              <RouterLink to="/projects" class="btn-primary text-xs px-4 py-2">See projects</RouterLink>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-14 sm:mb-16">
        <h2 class="text-xs font-bold uppercase tracking-wider mb-4" style="color: var(--text-muted);">The Story</h2>
        <div class="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
          <p>
            I got into FPV drones and never looked back. What started as a hobby quickly turned into a passion for the hardware itself — understanding every chip, every trace, every millisecond of latency.
          </p>
          <p>
            I design custom flight controllers using STM32 and AT32 microcontrollers, targeting Betaflight compatibility and open-source availability. The goal: high-performance hardware that every pilot can use, modify, and improve.
          </p>
        </div>
      </div>

      <div class="mb-14 sm:mb-16">
        <h2 class="text-xs font-bold uppercase tracking-wider mb-4" style="color: var(--text-muted);">What I Actually Know</h2>
        <div class="flex flex-wrap gap-2 sm:gap-3">
          <SkillBadge
            v-for="item in skills"
            :key="item.skill"
            :skill="item.skill"
            :icon="item.icon"
          />
        </div>
      </div>

      <div>
        <h2 class="text-xs font-bold uppercase tracking-wider mb-6" style="color: var(--text-muted);">The Journey</h2>
        <div class="relative pl-7">
          <div class="absolute left-[5px] top-1.5 bottom-1.5 w-px" style="background: var(--border-strong);"></div>

          <div class="space-y-7">
            <div v-for="item in timeline" :key="item.year" class="relative">
              <div
                class="absolute -left-7 top-1.5 w-2.5 h-2.5 rounded-full"
                style="background: var(--accent); box-shadow: 0 0 0 3px var(--bg-base);"
              ></div>
              <span class="text-xs font-mono" style="color: var(--accent-light);">{{ item.year }}</span>
              <h3 class="text-base font-bold text-white mt-1 mb-1.5">{{ item.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
