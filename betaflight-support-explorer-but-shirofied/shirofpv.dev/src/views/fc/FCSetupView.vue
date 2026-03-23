<script setup>
import FCPageLayout from '../../components/FCPageLayout.vue'

const steps = [
  {
    num: '01',
    title: 'Betaflight Configurator',
    desc: 'Get the latest release of Betaflight Configurator.',
    link: { text: 'Open Configurator', url: 'https://app.betaflight.com/#' },
    color: '#b48bff',
  },
  {
    num: '02',
    title: 'Flash the Firmware',
    desc: 'Connect the FC via USB-C while holding the boot button (or use the DFU method — see the DFU page). In Betaflight Configurator, go to Firmware Flasher, select the ShiroFPV target, to this current time you need to get a local hex wich is available on the Github repo, and flash.',
    link: null,
    color: '#ff8fd4',
  },
  {
    num: '03',
    title: 'Configure Ports',
    desc: 'Go to the Ports tab. Enable the UART connected to your receiver (e.g., UART1 for ELRS, UART2 for VTX SmartAudio). Save and reboot.',
    link: null,
    color: '#7dd3ff',
  },
  {
    num: '04',
    title: 'Set Up Your Receiver',
    desc: 'In the Configuration tab, select your RC protocol (CRSF, SBUS, iBus, etc.) and verify RC channels are moving correctly in the Receiver tab.',
    link: null,
    color: '#d7b7ff',
  },
  {
    num: '05',
    title: 'Motor Direction &amp; Order',
    desc: 'In the Motors tab, check motor spinning direction with props off. Use BLHeli Configurator or BL32 or the AM32 Configurator to set the correct spin direction for your prop configuration, you may also want to select your Dshot Protocol and if you want to have Bidirection Dshot or not.',
    link: null,
    color: '#ff8fd4',
  },
  {
    num: '06',
    title: 'Calibrate &amp; Tune PIDs',
    desc: 'Run accelerometer calibration in the Setup tab. Start with the default PID tune and adjust to your style using Betaflight PID tuning guides.',
    link: null,
    color: '#b48bff',
  },
]

const tips = [
  'Always remove props before connecting USB or testing motors.',
  'Use DSHOT600 for best ESC communication performance.',
  'Enable bidirectional DSHOT for RPM filtering — it significantly reduces propwash.',
  'Set a filter presets profile before first flight to protect motors during initial tuning.',
  'Save your configuration as a diff backup after each successful tune.',
]
</script>

<template>
  <FCPageLayout>
    <template #header>
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full" style="background: #d7b7ff;"></span>
        Setup Guide
      </div>
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
        Setup <span class="gradient-text">Guide</span>
      </h1>
      <p class="text-sm sm:text-base text-gray-400 max-w-2xl">
        Step-by-step instructions to get your ShiroFPV FC configured and ready to fly.
      </p>
    </template>

    <div class="grid lg:grid-cols-3 gap-6 sm:gap-8">

      <!-- Steps -->
      <div class="lg:col-span-2 space-y-4 sm:space-y-6">
        <div
          v-for="step in steps"
          :key="step.num"
          class="glass-card rounded-2xl p-4 sm:p-6 flex gap-4 sm:gap-5"
        >
          <div
            class="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0"
            :style="`background: ${step.color}20; color: ${step.color};`"
          >
            {{ step.num }}
          </div>
          <div>
            <h3 class="text-lg font-bold text-white mb-2" v-html="step.title"></h3>
            <p class="text-gray-400 text-sm leading-relaxed" v-html="step.desc"></p>
            <a
              v-if="step.link"
              :href="step.link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 mt-3 text-sm font-semibold transition-colors duration-200"
              style="color: #ff8fd4;"
            >
              {{ step.link.text }} →
            </a>
          </div>
        </div>
      </div>

      <!-- Sidebar tips -->
      <div class="space-y-6">
        <div class="glass-card rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>💡</span> Pro Tips
          </h3>
          <ul class="space-y-3">
            <li
              v-for="(tip, i) in tips"
              :key="i"
              class="flex items-start gap-2 text-sm text-gray-400 leading-relaxed"
            >
              <span class="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">{{ i + 1 }}</span>
              {{ tip }}
            </li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h3 class="text-lg font-bold text-white mb-4">Need More Help?</h3>
          <p class="text-gray-400 text-sm mb-4 leading-relaxed">
            Check the GitHub repo for pinout diagrams, wiring guides, and community issues.
          </p>
          <a
            href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary text-white text-sm text-center block"
          >
            GitHub Repo
          </a>
        </div>
      </div>

    </div>
  </FCPageLayout>
</template>
