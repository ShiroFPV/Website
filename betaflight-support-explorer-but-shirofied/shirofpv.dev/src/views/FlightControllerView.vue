<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()

const subNav = [
  { name: 'Overview', path: '/flight-controller/overview' },
  { name: 'Hardware', path: '/flight-controller/hardware' },
  { name: 'Software', path: '/flight-controller/software' },
  { name: 'Setup Guide', path: '/flight-controller/setup' },
  { name: 'DFU', path: '/flight-controller/dfu' },
]

const features = [
  {
    icon: '⚡',
    title: 'High Performance',
    description:
      'Powered by an AT32 microcontroller running at up to 288 MHz, delivering precise flight characteristics.',
    color: '#ff8fd4',
  },
  {
    icon: '🌐',
    title: 'Open Source',
    description:
      'Fully open-source hardware and firmware. Every schematic, PCB layout, and line of code is available on GitHub — free to use, modify, and improve.',
    color: '#d7b7ff',
  },
  {
    icon: '🚁',
    title: 'Betaflight Compatible',
    description:
      'Designed from the ground up for Betaflight compatibility. Flash it, configure it, and fly — it should work with all the tools and configurators you already know.',
    color: '#bfe9ff',
  },
]
</script>

<template>
  <div class="pt-24 pb-16">

    <!-- Hero section -->
    <section class="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <!-- Background gradient -->
      <div
        class="absolute inset-0 opacity-20"
        style="background: linear-gradient(135deg, #b48bff 0%, #ff8fd4 50%, #7dd3ff 100%);"
      ></div>
      <div class="orb orb-purple w-72 h-72 absolute" style="top: -40px; right: 5%; opacity: 0.12;"></div>
      <div class="orb orb-pink w-56 h-56 absolute" style="bottom: -20px; left: 10%; opacity: 0.1;"></div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <!-- Text -->
          <div>
            <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm font-medium" style="color: #d7b7ff;">
              <span class="w-2 h-2 rounded-full animate-pulse" style="background: #ff8fd4;"></span>
              Open-Source Hardware
            </div>
            <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              ShiroFPV <span class="gradient-text">Flight Controller -- Currently not Public due to Issues in the Design</span>
            </h1>
            <p class="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
              A high-performance, open-source flight controller built for every FPV pilot.
              Designed with precision engineering and community-driven development, it delivers
              smooth, responsive flight while remaining fully accessible and modifiable.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-white text-sm sm:text-base text-center"
              >
                View on GitHub →
              </a>
              <RouterLink to="/flight-controller/overview" class="btn-outline text-sm sm:text-base text-center">
                Documentation
              </RouterLink>
            </div>
          </div>

          <!-- Logo image -->
          <div class="flex justify-center">
            <div
              class="relative w-48 sm:w-60 md:w-72 lg:w-80 h-48 sm:h-60 md:h-72 lg:h-80 rounded-3xl flex items-center justify-center"
              style="background: linear-gradient(135deg, rgba(180,139,255,0.1) 0%, rgba(255,143,212,0.1) 100%); border: 1px solid rgba(180,139,255,0.2);"
            >
              <div class="absolute inset-0 rounded-3xl" style="background: radial-gradient(circle at 50% 50%, rgba(180,139,255,0.15), transparent 70%);"></div>
              <img
                src="/assets/ShiroFPV_Logo.svg"
                alt="ShiroFPV Logo"
                class="relative z-10 w-32 sm:w-44 md:w-56 lg:w-60 h-32 sm:h-44 md:h-56 lg:h-60 object-contain animate-float"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sub-navigation chips -->
    <nav class="py-6 px-4 sm:px-6 lg:px-8 border-b" style="border-color: rgba(180,139,255,0.15);" aria-label="Flight Controller sections">
      <div class="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
        <RouterLink
          v-for="link in subNav"
          :key="link.path"
          :to="link.path"
          class="px-5 py-2 rounded-full text-sm font-medium transition-all duration-200"
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

    <!-- Features grid -->
    <section class="py-16 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
            Why Choose <span class="gradient-text">ShiroFPV FC</span>?
          </h2>
          <p class="text-gray-400 max-w-xl mx-auto">
            Built for performance, designed for the community — everything you need in a flight controller.
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="feat in features"
            :key="feat.title"
            class="glass-card card-hover rounded-2xl p-7 flex flex-col gap-4"
          >
            <div
              class="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
              :style="`background: ${feat.color}18;`"
            >
              {{ feat.icon }}
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">{{ feat.title }}</h3>
              <p class="text-gray-400 text-sm leading-relaxed">{{ feat.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA strip -->
    <section class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <div
          class="glass-card rounded-2xl p-8 text-center relative overflow-hidden"
        >
          <div class="absolute inset-0 opacity-10" style="background: linear-gradient(135deg, #b48bff, #ff8fd4, #7dd3ff); background-size: 300% 300%; animation: gradientShift 8s ease infinite;"></div>
          <div class="relative z-10">
            <h2 class="text-2xl sm:text-3xl font-bold text-white mb-3">
              Ready to <span class="gradient-text">Take Flight?</span>
            </h2>
            <p class="text-gray-400 mb-6">Explore the full documentation or grab the design files from GitHub.</p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <RouterLink to="/flight-controller/overview" class="btn-primary text-white text-sm text-center">
                Read the Docs
              </RouterLink>
              <a
                href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-outline text-sm text-center"
              >
                GitHub Repo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
