<script setup>
import FCPageLayout from '../../components/FCPageLayout.vue'

const specs = [
  { label: 'Microcontroller', value: 'AT32F435RGT7 ( 288 MHz)' },
  { label: 'Gyroscope', value: 'ICM-20602' },
  { label: 'Form Factor', value: '30.5×30.5 mm, 4× M3 mounting' },
  { label: 'Input Voltage', value: '3S–6S LiPo (9.9V–25.2V) Need to test Further' },
  { label: 'BEC Output', value: '5V / 3.3V regulated' },
  { label: 'ESC Protocol', value: 'DSHOT 150/300/600' },
  { label: 'Motor Outputs', value: '4× bidirectional' },
  { label: 'UART Ports', value: '6× UART' },
  { label: 'Barometer', value: 'BME280' },
  { label: 'Blackbox', value: 'Onboard flash' },
  { label: 'USB', value: 'USB-C (MSC / VCP)' },
]

const versions = [
  {
    version: 'v1',
    title: 'First Prototype',
    desc: 'Initial design proving the concept. Basic AT32F435RGT7 + ICM-20602 layout. Hand-assembled and tested.',
    color: '#9bb4ff',
  },
  {
    version: 'v2',
    title: 'Current Revision',
    desc: 'Refined based on v1 feedback.',
    color: '#d7b7ff',
  },
  
]
</script>

<template>
  <FCPageLayout>
    <template #header>
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full" style="background: #7dd3ff;"></span>
        Hardware
      </div>
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
        Hardware <span class="gradient-text">Specifications</span>
      </h1>
      <p class="text-sm sm:text-base text-gray-400 max-w-2xl">
        Full technical specifications, PCB layout details, and revision history for the ShiroFPV FC.
      </p>
    </template>

    <div class="space-y-8 sm:space-y-10">

      <!-- Specs table -->
      <section class="glass-card rounded-2xl overflow-hidden">
        <div class="p-4 sm:p-6 border-b" style="border-color: rgba(180,139,255,0.15);">
          <h2 class="text-lg sm:text-xl font-bold text-white flex items-center gap-3">
            <span class="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style="background: rgba(191,233,255,0.2);">🔧</span>
            Technical Specifications
          </h2>
        </div>
        <div class="divide-y" style="divide-color: rgba(255,255,255,0.04);">
          <div
            v-for="spec in specs"
            :key="spec.label"
            class="flex flex-col sm:flex-row items-start sm:items-center px-4 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-4"
          >
            <dt class="w-full sm:w-48 text-xs sm:text-sm font-semibold flex-shrink-0" style="color: #d7b7ff;">{{ spec.label }}</dt>
            <dd class="text-xs sm:text-sm text-gray-300">{{ spec.value }}</dd>
          </div>
        </div>
      </section>

      <!-- PCB image placeholder -->
      <section class="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 class="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 flex items-center gap-3">
          <span class="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style="background: rgba(180,139,255,0.2);">🖥️</span>
          PCB Layout
        </h2>
        <div
          class="rounded-xl flex items-center justify-center overflow-hidden relative"
          style="background: linear-gradient(135deg, rgba(180,139,255,0.08) 0%, rgba(255,143,212,0.08) 100%); border: 1px dashed rgba(180,139,255,0.3); min-height: 240px;"
        >
          <div class="text-center">
            <div class="text-5xl mb-3 opacity-40">🖨️</div>
            <p class="text-gray-500 text-sm">PCB render — design files available on GitHub</p>
            <a
              href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 mt-4 text-sm font-medium transition-colors duration-200"
              style="color: #d7b7ff;"
            >
              View KiCad files →
            </a>
          </div>
        </div>
        <p class="text-gray-400 text-sm mt-4 leading-relaxed">
          The PCB is designed in KiCad with a focus on signal integrity — gyro placed near the MCU to minimize
          trace length, power planes separated from signal layers, and proper decoupling capacitors on all
          critical rails.
        </p>
      </section>

      <!-- Version history -->
      <section>
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(255,143,212,0.2);">📋</span>
          Revision History
        </h2>
        <div class="grid sm:grid-cols-3 gap-6">
          <div
            v-for="v in versions"
            :key="v.version"
            class="glass-card card-hover rounded-2xl p-6"
          >
            <div
              class="inline-block px-3 py-1 rounded-full text-xs font-bold mb-3"
              :style="`background: ${v.color}22; color: ${v.color};`"
            >
              {{ v.version }}
            </div>
            <h3 class="text-lg font-bold text-white mb-2">{{ v.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </section>

    </div>
  </FCPageLayout>
</template>
