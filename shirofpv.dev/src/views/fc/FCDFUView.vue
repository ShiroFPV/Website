<script setup>
import FCPageLayout from '../../components/FCPageLayout.vue'

const methods = [
  {
    icon: '🔘',
    title: 'Boot Button Method',
    steps: [
      'Unplug the flight controller from USB.',
      'Hold down the BOOT button on the FC.',
      'While holding BOOT, plug in the USB-C cable.',
      'Release the BOOT button after 2–3 seconds.',
      'The FC is now in DFU mode — open Betaflight Configurator.',
    ],
    color: '#b48bff',
    recommended: true,
  },
  {
    icon: '📌',
    title: 'Boot Pads Method',
    steps: [
      'Locate the BOOT and GND pads on the PCB (see pinout diagram in the GitHub repo).',
      'Short the BOOT pad to GND with a jumper wire or tweezer.',
      'While the pads are shorted, plug in USB-C.',
      'Remove the short — the FC is now in DFU mode.',
      'Proceed with flashing in Betaflight Configurator.',
    ],
    color: '#ff8fd4',
    recommended: false,
  },
]

const dfuSteps = [
  'In Betaflight Configurator, navigate to the <strong>Firmware Flasher</strong> tab.',
  'Select <strong>ShiroFPV</strong> (or the specific target name) from the board dropdown, or load a local .hex file.',
  'Select the <strong>latest stable firmware release</strong> from the version dropdown.',
  'Check <strong>"Full chip erase"</strong> if you are reflashing or switching firmware versions.',
  'Click <strong>"Load Firmware [Online]"</strong> and wait for it to download.',
  'Click <strong>"Flash Firmware"</strong> — the progress bar will fill as the FC is programmed.',
  'When complete, the FC will reboot automatically. You\'re done!',
]

const troubleshooting = [
  { q: 'The FC is not detected in DFU mode.', a: 'Install Drivers (Zadig and ImpulseRC Driver-Fixer). Try a different USB cable — data cables only, not charge-only.' },
  { q: 'Betaflight Configurator shows no available ports.', a: 'Make sure the FC is in DFU mode (see methods above). Restart Configurator after entering DFU.' },
  { q: 'Flash fails partway through.', a: 'Try a different USB port. Use full chip erase option. Check that the correct target is selected.' },
]
</script>

<template>
  <FCPageLayout>
    <template #header>
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 text-xs sm:text-sm" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full" style="background: #9bb4ff;"></span>
        DFU Mode
      </div>
      <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-3">
        DFU <span class="gradient-text">Mode</span>
      </h1>
      <p class="text-sm sm:text-base text-gray-400 max-w-2xl">
        Device Firmware Update — how to put your ShiroFPV FC into DFU mode for flashing or recovery.
      </p>
    </template>

    <div class="space-y-8 sm:space-y-10">

      <!-- What is DFU -->
      <section class="glass-card rounded-2xl p-4 sm:p-6 md:p-8">
        <h2 class="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3 flex items-center gap-3">
          <span class="w-7 sm:w-8 h-7 sm:h-8 rounded-lg flex items-center justify-center text-sm sm:text-base" style="background: rgba(155,180,255,0.2);;">❓</span>
          What is DFU Mode?
        </h2>
        <p class="text-sm sm:text-base text-gray-300 leading-relaxed">
          DFU (Device Firmware Update) is a special bootloader mode built into the AT32 microcontroller.
          When the FC is in DFU mode, it presents itself as a programmable device over USB, allowing you
          to flash new firmware using Betaflight Configurator or almost any IDE. You'll need DFU mode
          to flash firmware for the first time or to recover from a bad flash.
        </p>
      </section>

      <!-- Methods to enter DFU -->
      <section>
        <h2 class="text-2xl font-bold text-white mb-6">How to Enter DFU Mode</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="method in methods"
            :key="method.title"
            class="glass-card rounded-2xl p-7 relative overflow-hidden"
          >
            <div v-if="method.recommended" class="absolute top-4 right-4">
              <span class="text-xs font-bold px-2 py-1 rounded-full" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">Recommended</span>
            </div>
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              :style="`background: ${method.color}18;`"
            >
              {{ method.icon }}
            </div>
            <h3 class="text-lg font-bold text-white mb-4">{{ method.title }}</h3>
            <ol class="space-y-2">
              <li
                v-for="(step, i) in method.steps"
                :key="i"
                class="flex items-start gap-3 text-sm text-gray-400"
              >
                <span
                  class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  :style="`background: ${method.color}20; color: ${method.color};`"
                >{{ i + 1 }}</span>
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- Flashing steps -->
      <section class="glass-card rounded-2xl p-8">
        <h2 class="text-xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(180,139,255,0.2);">💾</span>
          Flashing Firmware
        </h2>
        <ol class="space-y-4">
          <li
            v-for="(step, i) in dfuSteps"
            :key="i"
            class="flex items-start gap-4"
          >
            <span class="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold mt-0.5" style="background: rgba(180,139,255,0.2); color: #d7b7ff;">{{ i + 1 }}</span>
            <p class="text-gray-300 text-sm leading-relaxed pt-1" v-html="step"></p>
          </li>
        </ol>
      </section>

      <!-- Troubleshooting -->
      <section>
        <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(255,143,212,0.2);">🔧</span>
          Troubleshooting
        </h2>
        <div class="space-y-4">
          <div
            v-for="item in troubleshooting"
            :key="item.q"
            class="glass-card rounded-xl p-6"
          >
            <h4 class="font-semibold text-white mb-2">{{ item.q }}</h4>
            <p class="text-gray-400 text-sm leading-relaxed">{{ item.a }}</p>
          </div>
        </div>
      </section>

    </div>
  </FCPageLayout>
</template>
