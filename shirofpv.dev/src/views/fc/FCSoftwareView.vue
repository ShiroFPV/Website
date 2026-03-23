<script setup>
import FCPageLayout from '../../components/FCPageLayout.vue'

const firmwareFeatures = [

  {
    icon: '📡',
    title: 'RC Protocols',
    desc: 'SBUS, CRSF (Crossfire), ELRS (ExpressLRS) — works with all modern receiver protocols.',
    color: '#d7b7ff',
  },
  {
    icon: '⚡',
    title: 'ESC Communication',
    desc: 'DSHOT 150/300/600 and bidirectional DSHOT for RPM telemetry and advanced filtering.',
    color: '#bfe9ff',
  },
  {
    icon: '📊',
    title: 'Blackbox Logging',
    desc: 'Onboard flash logging for flight data analysis. Review your PIDs, gyro data, and inputs after every flight. 16Mb onboard flash.',
    color: '#9bb4ff',
  },
  {
    icon: '🌐',
    title: 'OSD',
    desc: 'Full OSD (On Screen Display) support for overlaying flight data on your FPV feed in real time. Analog and Digital',
    color: '#d7b7ff',
  },
]

const toolLinks = [
  { name: 'Betaflight Configurator', url: 'https://app.betaflight.com/#', icon: '🛠️' },
  { name: 'Betaflight Firmware', url: 'https://github.com/ShiroFPV/Shiro-FPV-Private-Repo/tree/main/ShiroFPV_Code', icon: '📦' },
  { name: 'GitHub Repo', url: 'https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public', icon: '🐙' },
]
</script>

<template>
  <FCPageLayout>
    <template #header>
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full" style="background: #ff8fd4;"></span>
        Software
      </div>
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
        Software &amp; <span class="gradient-text">Firmware</span>
      </h1>
    </template>

    <div class="space-y-8 sm:space-y-10">

      <!-- Betaflight intro -->
      <section class="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
        <div class="flex items-start gap-4 sm:gap-6">
          <div
            class="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
            style="background: linear-gradient(135deg, rgba(180,139,255,0.2), rgba(255,143,212,0.2));"
          >
            🚁
          </div>
          <div>
            <h2 class="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">Betaflight Firmware</h2>
            <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-4">
              Betaflight is the gold standard for FPV flight controller firmware. It provides a rich
              feature set, an intuitive configurator, and an active development community. The ShiroFPV FC
              ships as a registered Betaflight target, meaning you flash it just like any other supported board.
            </p>
            <a
              href="https://betaflight.com"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              style="color: #ff8fd4;"
            >
              Visit betaflight.com →
            </a>
          </div>
        </div>
      </section>

      <!-- Firmware features grid -->
      <section>
        <h2 class="text-2xl font-bold text-white mb-6">Firmware Features</h2>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="feat in firmwareFeatures"
            :key="feat.title"
            class="glass-card card-hover rounded-2xl p-6"
          >
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
              :style="`background: ${feat.color}18;`"
            >
              {{ feat.icon }}
            </div>
            <h3 class="font-bold text-white mb-2">{{ feat.title }}</h3>
            <p class="text-gray-400 text-sm leading-relaxed">{{ feat.desc }}</p>
          </div>
        </div>
      </section>

      <!-- Tools -->
      <section class="glass-card rounded-2xl p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(191,233,255,0.2);">🔗</span>
          Required Tools &amp; Downloads
        </h2>
        <div class="grid sm:grid-cols-2 gap-4">
          <a
            v-for="tool in toolLinks"
            :key="tool.name"
            :href="tool.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:text-white"
            style="background: rgba(255,255,255,0.04); border: 1px solid rgba(180,139,255,0.15); color: #d7b7ff;"
          >
            <span class="text-2xl">{{ tool.icon }}</span>
            <span class="font-medium text-sm">{{ tool.name }}</span>
          </a>
        </div>
      </section>

    </div>
  </FCPageLayout>
</template>
