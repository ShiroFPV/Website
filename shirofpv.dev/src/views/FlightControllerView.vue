<script setup>
const specs = [
  { label: 'Microcontroller', value: 'AT32F435RGT7 (288 MHz)' },
  { label: 'Gyroscope', value: 'ICM-20602' },
  { label: 'Form Factor', value: '30.5×30.5 mm, 4× M3 mounting' },
  { label: 'Input Voltage', value: '3S–6S LiPo (9.9V–25.2V) — need to test further' },
  { label: 'BEC Output', value: '5V / 3.3V regulated' },
  { label: 'ESC Protocol', value: 'DSHOT 150/300/600' },
  { label: 'Motor Outputs', value: '4× bidirectional' },
  { label: 'UART Ports', value: '6× UART' },
  { label: 'Barometer', value: 'BME280' },
  { label: 'Blackbox', value: 'Onboard flash (16Mb)' },
  { label: 'USB', value: 'USB-C (MSC / VCP)' },
  { label: 'Current Version', value: 'v2' },
]

const setupSteps = [
  {
    num: '01',
    title: 'Get Betaflight Configurator',
    desc: 'Grab the latest version from the web app.',
    link: { text: 'Open Configurator', url: 'https://app.betaflight.com/#' },
    color: '#b48bff',
  },
  {
    num: '02',
    title: 'Flash the Firmware',
    desc: 'Connect via USB-C while holding the boot button (or use the DFU method below). In Betaflight Configurator go to Firmware Flasher, select the ShiroFPV target — right now you need to load a local .hex which is available on the GitHub repo — and flash.',
    link: null,
    color: '#ff8fd4',
  },
  {
    num: '03',
    title: 'Configure Ports',
    desc: 'Ports tab. Enable the UART connected to your receiver (e.g. UART1 for ELRS, UART2 for VTX SmartAudio). Save and reboot.',
    link: null,
    color: '#7dd3ff',
  },
  {
    num: '04',
    title: 'Set Up Your Receiver',
    desc: 'In the Configuration tab pick your RC protocol (CRSF, SBUS, iBus, etc.) and verify your channels are moving correctly in the Receiver tab.',
    link: null,
    color: '#d7b7ff',
  },
  {
    num: '05',
    title: 'Motor Direction & Order',
    desc: 'In the Motors tab check spin direction with props off. Use BLHeli / BL32 / AM32 Configurator to set the correct direction for your prop config. Pick your DSHOT protocol here too, and decide whether you want bidirectional DSHOT.',
    link: null,
    color: '#ff8fd4',
  },
  {
    num: '06',
    title: 'Calibrate & Tune PIDs',
    desc: 'Run accelerometer calibration in the Setup tab. Start with the default PID tune and go from there.',
    link: null,
    color: '#b48bff',
  },
]

const dfuMethods = [
  {
    icon: '🔘',
    title: 'Boot Button',
    recommended: true,
    color: '#b48bff',
    steps: [
      'Unplug the FC from USB.',
      'Hold down the BOOT button.',
      'While holding BOOT, plug in the USB-C cable.',
      'Release the BOOT button after 2–3 seconds.',
      'FC is now in DFU mode — open Betaflight Configurator.',
    ],
  },
  {
    icon: '📌',
    title: 'Boot Pads',
    recommended: false,
    color: '#ff8fd4',
    steps: [
      'Find the BOOT and GND pads on the PCB (pinout is on the GitHub repo).',
      'Short BOOT to GND with a jumper wire or tweezer.',
      'While shorted, plug in USB-C.',
      'Remove the short — you\'re in DFU mode.',
      'Flash in Betaflight Configurator.',
    ],
  },
]

const firmwareLinks = [
  { name: 'Betaflight Configurator', url: 'https://app.betaflight.com/#', icon: '🛠️' },
  { name: 'Betaflight Firmware (ShiroFPV build)', url: 'https://github.com/ShiroFPV/ShiroFPV_Flight_Controller_Collection/tree/main/V1_30x30_SFVPF435/Release', icon: '📦' },
  { name: 'FC Hardware Repo', url: 'https://github.com/ShiroFPV/ShiroFPV_Flight_Controller_Collection'},
]

const troubleshooting = [
  { q: 'FC not detected in DFU mode.', a: 'Install drivers — Zadig and ImpulseRC Driver-Fixer. Also try a different USB cable (data cable, not a charge-only one).' },
  { q: 'Betaflight Configurator shows no ports.', a: 'Make sure you\'re actually in DFU mode. Restart Configurator after entering DFU.' },
  { q: 'Flash fails partway through.', a: 'Try a different USB port. Enable full chip erase. Double-check the correct target is selected.' },
]
</script>

<template>
  <div class="pt-24 pb-16">

    <section class="relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div
        class="absolute inset-0 opacity-20"
        style="background: linear-gradient(135deg, #b48bff 0%, #ff8fd4 50%, #7dd3ff 100%);"
      ></div>

      <div class="relative z-10 max-w-6xl mx-auto">
        <div class="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm font-medium" style="color: #d7b7ff;">
              <span class="w-2 h-2 rounded-full animate-pulse" style="background: #ff8fd4;"></span>
              Open-Source Hardware
            </div>
            <h1 class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight">
              ShiroFPV <span class="gradient-text">Flight Controller</span>
            </h1>
            <p class="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-3">
              My own fully open-source flight controller built around the AT32F435RGT7. Designed in KiCad, targeted at Betaflight, and open for anyone to use or improve.
            </p>
            <p class="text-sm text-yellow-300/80 mb-6 sm:mb-8">
              ⚠️ Currently not public due to issues in the design — hopefully fixed soon lol
            </p>
            <div class="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="https://github.com/ShiroFPV/ShiroFPV_Flight_Controller_Collection"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-white text-sm sm:text-base text-center"
              >
                View on GitHub →
              </a>
            </div>
          </div>

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

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

      <section>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(180,139,255,0.2);">🚁</span>
          What's this thing?
        </h2>
        <p class="text-gray-400 text-sm mb-6">The short version of the overview.</p>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="glass-card rounded-2xl p-6">
            <p class="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              I wanted to build my own flight controller from scratch. Not use someone else's design — actually design the PCB, pick the components, route the traces, and get it manufactured. So I did.
            </p>
            <p class="text-gray-300 leading-relaxed text-sm sm:text-base">
              It's built around the AT32F435RGT7 (an STM32-compatible chip that runs at up to 288 MHz), uses an ICM-20602 gyro, has a BME280 barometer, onboard blackbox flash, USB-C, and targets Betaflight. It's on a standard 30.5×30.5mm stack mount so it drops into pretty much any build.
            </p>
          </div>
          <div class="glass-card rounded-2xl p-6">
            <p class="text-gray-300 leading-relaxed mb-4 text-sm sm:text-base">
              The project started as a personal challenge and turned into something I actually want to fly. After months of PCB revisions in KiCad and a lot of debugging, it still doesn't work perfectly — but it should work soon hopefully.
            </p>
            <p class="text-gray-300 leading-relaxed text-sm sm:text-base">
              Everything — schematics, PCB layout, firmware config — is on GitHub. I'm not keeping any of it private (well, except right now while the design issues get sorted).
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(191,233,255,0.2);">🔧</span>
          Hardware Specs
        </h2>
        <p class="text-gray-400 text-sm mb-6">Full specs for the current v2 revision.</p>
        <div class="glass-card rounded-2xl overflow-hidden">
          <div class="divide-y" style="border-color: rgba(255,255,255,0.04);">
            <div
              v-for="spec in specs"
              :key="spec.label"
              class="flex flex-col sm:flex-row items-start sm:items-center px-5 py-3.5 gap-2 sm:gap-4"
            >
              <dt class="w-full sm:w-52 text-xs sm:text-sm font-semibold flex-shrink-0" style="color: #d7b7ff;">{{ spec.label }}</dt>
              <dd class="text-xs sm:text-sm text-gray-300">{{ spec.value }}</dd>
            </div>
          </div>
        </div>

        <div class="mt-6 glass-card rounded-2xl p-6">
          <div class="flex items-center gap-3 mb-4">
            <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(180,139,255,0.2);">🖥️</span>
            <h3 class="font-bold text-white">PCB Layout</h3>
          </div>
          <div
            class="rounded-xl flex items-center justify-center"
            style="background: linear-gradient(135deg, rgba(180,139,255,0.08) 0%, rgba(255,143,212,0.08) 100%); border: 1px dashed rgba(180,139,255,0.3); min-height: 200px;"
          >
            <div class="text-center">
              <div class="text-4xl mb-3 opacity-40">🖨️</div>
              <p class="text-gray-500 text-sm">PCB render — design files on GitHub</p>
              <a
                href="https://github.com/ShiroFPV/ShiroFPV_Flight_Controller_Collection"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-1 mt-3 text-sm font-medium transition-colors duration-200 hover:text-white"
                style="color: #d7b7ff;"
              >
                View KiCad files →
              </a>
            </div>
          </div>
          <p class="text-gray-400 text-sm mt-4 leading-relaxed">
            Designed in KiCad. Gyro is placed close to the MCU to keep trace lengths short, power planes are separated from signal layers, and there are decoupling caps on all the important rails.
          </p>
        </div>
      </section>

      <section>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(255,143,212,0.2);">🚁</span>
          Firmware & Software
        </h2>
        <p class="text-gray-400 text-sm mb-6">It runs Betaflight. Here's what that gets you.</p>

        <div class="glass-card rounded-2xl p-6 mb-6">
          <div class="flex items-start gap-4 sm:gap-6">
            <div
              class="w-14 sm:w-16 h-14 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl flex-shrink-0"
              style="background: linear-gradient(135deg, rgba(180,139,255,0.2), rgba(255,143,212,0.2));"
            >
              🚁
            </div>
            <div>
              <h3 class="text-xl font-bold text-white mb-2">Betaflight</h3>
              <p class="text-sm sm:text-base text-gray-300 leading-relaxed mb-3">
                The ShiroFPV FC is registered as a Betaflight target, so you flash it just like any other supported board. SBUS, CRSF, ELRS — all the modern receiver protocols work. DSHOT 150/300/600 and bidirectional DSHOT for RPM telemetry. Full OSD support (analog and digital). Onboard 16Mb flash for blackbox logging.
              </p>
              <a
                href="https://betaflight.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-white"
                style="color: #ff8fd4;"
              >
                betaflight.com →
              </a>
            </div>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-4">
          <a
            v-for="link in firmwareLinks"
            :key="link.name"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 hover:text-white"
            style="background: rgba(255,255,255,0.04); border: 1px solid rgba(180,139,255,0.15); color: #d7b7ff;"
          >
            <span class="text-xl">{{ link.icon }}</span>
            <span class="font-medium text-sm">{{ link.name }}</span>
          </a>
        </div>
      </section>

      <section>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(191,233,255,0.2);">📋</span>
          Setup Guide
        </h2>
        <p class="text-gray-400 text-sm mb-6">Step by step, getting the FC configured and ready to fly.</p>

        <div class="grid lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2 space-y-4">
            <div
              v-for="step in setupSteps"
              :key="step.num"
              class="glass-card rounded-2xl p-5 flex gap-4"
            >
              <div
                class="w-11 h-11 rounded-xl flex items-center justify-center text-base font-black flex-shrink-0"
                :style="`background: ${step.color}20; color: ${step.color};`"
              >
                {{ step.num }}
              </div>
              <div>
                <h3 class="text-base font-bold text-white mb-1.5">{{ step.title }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ step.desc }}</p>
                <a
                  v-if="step.link"
                  :href="step.link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1 mt-3 text-sm font-semibold transition-colors duration-200 hover:text-white"
                  style="color: #ff8fd4;"
                >
                  {{ step.link.text }} →
                </a>
              </div>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-6 h-fit">
            <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
              <span>💡</span> Quick tips
            </h3>
            <ul class="space-y-3">
              <li class="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                <span class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">1</span>
                Remove props before connecting USB or testing motors. Always.
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                <span class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">2</span>
                Use DSHOT600 for best ESC communication.
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                <span class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">3</span>
                Enable bidirectional DSHOT for RPM filtering — it helps a lot with propwash.
              </li>
              <li class="flex items-start gap-2 text-sm text-gray-400 leading-relaxed">
                <span class="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">4</span>
                Save a diff backup after each successful tune. You'll thank yourself later.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section>
        <h2 class="text-2xl sm:text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <span class="w-8 h-8 rounded-lg flex items-center justify-center text-base" style="background: rgba(155,180,255,0.2);">💾</span>
          DFU Mode
        </h2>
        <p class="text-gray-400 text-sm mb-6">
          DFU (Device Firmware Update) is the bootloader mode built into the AT32. You need it to flash firmware for the first time or to recover from a bad flash.
        </p>

        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div
            v-for="method in dfuMethods"
            :key="method.title"
            class="glass-card rounded-2xl p-6 relative overflow-hidden"
          >
            <div v-if="method.recommended" class="absolute top-4 right-4">
              <span class="text-xs font-bold px-2 py-1 rounded-full" style="background: rgba(255,143,212,0.2); color: #ff8fd4;">Recommended</span>
            </div>
            <div
              class="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-4"
              :style="`background: ${method.color}18;`"
            >
              {{ method.icon }}
            </div>
            <h3 class="text-base font-bold text-white mb-3">{{ method.title }}</h3>
            <ol class="space-y-2">
              <li
                v-for="(step, i) in method.steps"
                :key="i"
                class="flex items-start gap-2.5 text-sm text-gray-400"
              >
                <span
                  class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5"
                  :style="`background: ${method.color}20; color: ${method.color};`"
                >{{ i + 1 }}</span>
                {{ step }}
              </li>
            </ol>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-6 mb-6">
          <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background: rgba(180,139,255,0.2);">🔥</span>
            Flashing in Betaflight Configurator
          </h3>
          <ol class="space-y-3">
            <li class="flex items-start gap-3 text-sm text-gray-300">
              <span class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5" style="background: rgba(180,139,255,0.2); color: #d7b7ff;">1</span>
              Go to the <strong>Firmware Flasher</strong> tab.
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-300">
              <span class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5" style="background: rgba(180,139,255,0.2); color: #d7b7ff;">2</span>
              Select <strong>ShiroFPV</strong> from the board dropdown, or load the local .hex.
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-300">
              <span class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5" style="background: rgba(180,139,255,0.2); color: #d7b7ff;">3</span>
              Check <strong>Full chip erase</strong> if you're reflashing or switching versions.
            </li>
            <li class="flex items-start gap-3 text-sm text-gray-300">
              <span class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5" style="background: rgba(180,139,255,0.2); color: #d7b7ff;">4</span>
              Click <strong>Flash Firmware</strong> and wait for the progress bar. FC will reboot when done.
            </li>
          </ol>
        </div>

        <div class="space-y-3">
          <h3 class="text-base font-bold text-white flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background: rgba(255,143,212,0.2);">🔧</span>
            Troubleshooting
          </h3>
          <div
            v-for="item in troubleshooting"
            :key="item.q"
            class="glass-card rounded-xl p-5"
          >
            <h4 class="font-semibold text-white mb-1.5 text-sm">{{ item.q }}</h4>
            <p class="text-gray-400 text-sm leading-relaxed">{{ item.a }}</p>
          </div>
        </div>
      </section>

      <section class="glass-card rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        <div class="absolute inset-0 opacity-10" style="background: linear-gradient(135deg, #b48bff, #ff8fd4, #7dd3ff); background-size: 300% 300%; animation: gradientShift 8s ease infinite;"></div>
        <div class="relative z-10">
          <h2 class="text-xl sm:text-2xl font-bold text-white mb-2">
            Want to dig into the design?
          </h2>
          <p class="text-gray-400 mb-6 text-sm">Schematics, KiCad files, and firmware are all on GitHub — go wild.</p>
          <a
            href="https://github.com/ShiroFPV/ShiroFPV_Flight_Controller_Collection"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary text-white text-sm inline-flex"
          >
            GitHub Repo →
          </a>
        </div>
      </section>

    </div>
  </div>
</template>
