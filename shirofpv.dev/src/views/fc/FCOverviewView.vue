<script setup>
import FCPageLayout from '../../components/FCPageLayout.vue'

const highlights = [
  { label: 'AT32 Core', text: 'High-speed microcontroller for precision control' },
  { label: 'Betaflight', text: 'Full compatibility with the most popular flight control firmware' },
  { label: 'Open Source', text: 'Hardware and firmware licensed openly for anyone to use and improve' },
  { label: 'Community Driven', text: 'Every revision shaped by real pilot feedback and testing' },
]

const quickFacts = [
  { label: 'MCU', value: 'AT32F435RGT7' },
  { label: 'Firmware', value: 'Betaflight' },
  { label: 'Form Factor', value: '30×30 mm' },
  { label: 'License', value: 'Open Source' },
  { label: 'Current Version', value: 'v2' },
]
</script>

<template>
  <FCPageLayout>
    <template #header>
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full" style="background: #b48bff;"></span>
        Overview
      </div>
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
        Project <span class="gradient-text">Overview</span>
      </h1>
      <p class="text-sm sm:text-base text-gray-400 max-w-2xl">
        An introduction to the ShiroFPV Flight Controller — what it is, what makes it special, and how it came to be.
      </p>
    </template>

    <div class="grid lg:grid-cols-3 gap-6 sm:gap-8">

      <!-- Main content -->
      <div class="lg:col-span-2 space-y-6 sm:space-y-8">

        <section class="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
            <span class="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style="background: rgba(180,139,255,0.2);">🚁</span>
            What Is It?
          </h2>
          <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
            The ShiroFPV Flight Controller is a fully open-source flight controller designed specifically
            for FPV (First Person View) racing and freestyle drones. Built around the AT32F435RGT7 microcontroller,
            it targets Betaflight compatibility while pushing the boundaries of what
            community-driven hardware can achieve.
          </p>
          <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
            Every design decision — from component selection to PCB layout — is made with both
            performance and accessibility in mind. Whether you're a racer chasing milliseconds
            or a builder wanting to understand every component on the board, the ShiroFPV FC
            is designed for you hopefully lol.
          </p>
        </section>

        <section class="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
            <span class="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style="background: rgba(255,143,212,0.2);">✨</span>
            Key Highlights
          </h2>
          <ul class="space-y-3 sm:space-y-4">
            <li v-for="item in highlights" :key="item.label" class="flex items-start gap-3">
              <span class="mt-0.5 sm:mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs" style="background: rgba(180,139,255,0.2); color: #d7b7ff;">✓</span>
              <div>
                <span class="font-semibold text-white text-sm sm:text-base">{{ item.label }}</span>
                <span class="text-gray-400 text-sm"> — {{ item.text }}</span>
              </div>
            </li>
          </ul>
        </section>

        <section class="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
            <span class="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style="background: rgba(191,233,255,0.2);">📜</span>
            The Story
          </h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            The project started as a personal challenge: could a single hobbyist design a flight controller
            that rivals commercially available boards? After months of PCB design iterations in KiCad,
            countless hours debugging AT32 firmware, it still does not work perfectly but it should work soon hopefully.            
          </p>
        </section>

      </div>

      <!-- Sidebar -->
      <div class="space-y-6">

        <div class="glass-card rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">Quick Facts</h3>
          <dl class="space-y-3">
            <div v-for="fact in quickFacts" :key="fact.label" class="flex flex-col gap-0.5">
              <dt class="text-xs font-semibold uppercase tracking-wider" style="color: #d7b7ff;">{{ fact.label }}</dt>
              <dd class="text-sm text-gray-300">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">Links</h3>
          <div class="space-y-3">
            <a
              href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white"
              style="color: #d7b7ff;"
            >
              <span>🐙</span> GitHub Repository
            </a>
            <a
              href="https://betaflight.com"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 text-sm transition-colors duration-200 hover:text-white"
              style="color: #d7b7ff;"
            >
              <span>🚁</span> Betaflight
            </a>
          </div>
        </div>

      </div>
    </div>
  </FCPageLayout>
</template>
