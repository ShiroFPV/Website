<script setup>
import SkillBadge from '../components/SkillBadge.vue'

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
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm" style="color: #d7b7ff;">
          <span class="w-2 h-2 rounded-full" style="background: #ff8fd4;"></span>
          About Me
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
          Hey, I'm <span class="gradient-text">ShiroFPV</span>
        </h1>
        <p class="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          FPV pilot, open-source hardware designer, and microcontroller enthusiast. I design flight controllers, write (questionable) firmware, and share everything — because hoarding schematics is pointless.
        </p>
      </div>

      <div class="glass-card rounded-2xl p-4 sm:p-6 md:p-8 mb-10 sm:mb-12">
        <div class="grid md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div class="flex justify-center">
            <div
              class="w-40 sm:w-48 h-40 sm:h-48 rounded-full flex items-center justify-center text-4xl sm:text-6xl"
              style="background: linear-gradient(135deg, rgba(180,139,255,0.2) 0%, rgba(255,143,212,0.2) 100%); border: 2px solid rgba(180,139,255,0.35);"
            >
              🚁
            </div>
          </div>

          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">The Story</h2>
            <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-3 sm:mb-4">
              I got into FPV drones and never looked back. What started as a hobby quickly turned into a passion for the hardware itself — understanding every chip, every trace, every millisecond of latency.
            </p>
            <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
              I design custom flight controllers using STM32 and AT32 microcontrollers, targeting Betaflight compatibility and open-source availability. The goal: high-performance hardware that every pilot can use, modify, and improve.
            </p>
          </div>
        </div>
      </div>

      <div class="mb-12 sm:mb-16">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6 text-center">
          What I <span class="gradient-text">Actually Know</span>
        </h2>
        <div class="flex flex-wrap gap-2 sm:gap-3 justify-center">
          <SkillBadge
            v-for="item in skills"
            :key="item.skill"
            :skill="item.skill"
            :icon="item.icon"
          />
        </div>
      </div>

      <div>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-10 text-center">
          The <span class="gradient-text">Journey</span>
        </h2>
        <div class="relative">
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style="background: linear-gradient(to bottom, #b48bff, #ff8fd4, #7dd3ff);"></div>

          <div class="space-y-8">
            <div
              v-for="(item, index) in timeline"
              :key="item.year"
              class="relative flex items-start gap-6"
              :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
            >
              <div class="absolute left-4 md:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10" style="background: linear-gradient(135deg, #b48bff, #ff8fd4);"></div>

              <div class="ml-10 md:ml-0 md:w-5/12" :class="index % 2 === 0 ? 'md:mr-auto md:text-right md:pr-8' : 'md:ml-auto md:text-left md:pl-8'">
                <div class="glass-card rounded-xl p-5">
                  <span class="text-sm font-bold" style="color: #d7b7ff;">{{ item.year }}</span>
                  <h3 class="text-lg font-bold text-white mt-1 mb-2">{{ item.title }}</h3>
                  <p class="text-gray-400 text-sm leading-relaxed">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
