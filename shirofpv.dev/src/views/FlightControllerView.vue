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
  { name: 'ShiroFPV Firmware Releases', url: 'https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public/releases', icon: '📦' },
  { name: 'FC Hardware Repo', url: 'https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public', icon: '🐙' },
]

const troubleshooting = [
  { q: 'FC not detected in DFU mode.', a: 'Install drivers — Zadig and ImpulseRC Driver-Fixer. Also try a different USB cable (data cable, not a charge-only one).' },
  { q: 'Betaflight Configurator shows no ports.', a: 'Make sure you\'re actually in DFU mode. Restart Configurator after entering DFU.' },
  { q: 'Flash fails partway through.', a: 'Try a different USB port. Enable full chip erase. Double-check the correct target is selected.' },
]

const highlights = [
  'Public repo with full hardware files',
  'Betaflight target support',
  '16Mb onboard blackbox logging',
]
</script>

<template>
  <div class="fc-page pt-24 pb-16">

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
            <p class="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
              Fully open-source AT32-based flight controller designed in KiCad, tuned for Betaflight, and now publicly available with files, docs, and firmware releases in one place.
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
            </div>
            <ul class="mt-6 grid gap-2 text-sm text-gray-300">
              <li v-for="item in highlights" :key="item" class="flex items-center gap-2">
                <span class="fc-highlight-icon inline-flex w-5 h-5 items-center justify-center rounded-full text-xs" aria-hidden="true">✓</span>
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="flex justify-center">
            <div class="fc-3d-shell relative w-48 sm:w-60 md:w-72 lg:w-80 h-48 sm:h-60 md:h-72 lg:h-80 rounded-3xl flex items-center justify-center">
              <div class="fc-board-3d" aria-hidden="true">
                <div class="fc-board-grid"></div>
                <div class="fc-chip fc-chip-main">AT32</div>
                <div class="fc-chip fc-chip-gyro">GYRO</div>
                <div class="fc-chip fc-chip-osd">OSD</div>
                <div class="fc-pad fc-pad-1"></div>
                <div class="fc-pad fc-pad-2"></div>
                <div class="fc-pad fc-pad-3"></div>
                <div class="fc-pad fc-pad-4"></div>
                <span class="fc-label">ShiroFPV FC v2</span>
              </div>
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
              The project started as a personal challenge and turned into something I actually want to fly. After months of PCB revisions in KiCad and a lot of debugging, the board is now stable enough for public release and community feedback.
            </p>
            <p class="text-gray-300 leading-relaxed text-sm sm:text-base">
              Everything — schematics, PCB layout, and firmware configuration — is now in the public repo. If you want to build, review, or fork it, you can.
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
            <h3 class="font-bold text-white">3D Layout Preview</h3>
          </div>
          <div
            class="rounded-xl p-4 md:p-6"
            style="background: linear-gradient(135deg, rgba(180,139,255,0.08) 0%, rgba(255,143,212,0.08) 100%); border: 1px solid rgba(180,139,255,0.22); min-height: 200px;"
          >
            <div class="grid md:grid-cols-[1fr_auto] gap-5 items-center">
              <div class="text-sm text-gray-300 leading-relaxed">
                Layered 3D board preview showing key FC component zones and layout depth.
                <a
                  href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="fc-link-accent inline-flex items-center gap-1 mt-3 text-sm font-medium transition-colors duration-200 hover:text-white"
                >
                  View KiCad files →
                </a>
              </div>
              <div class="fc-preview-mini">
                <div class="fc-board-3d fc-board-3d-mini" aria-hidden="true">
                  <div class="fc-board-grid"></div>
                  <div class="fc-chip fc-chip-main">AT32</div>
                </div>
              </div>
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
            href="https://github.com/ShiroFPV/ShiroFPV-Flight-Controller-Public"
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

<style scoped>
.fc-page {
  --fc-purple: rgba(180, 139, 255, 1);
  --fc-purple-light: #d7b7ff;
  --fc-purple-glow: rgba(180, 139, 255, 0.18);
  --fc-purple-soft: rgba(180, 139, 255, 0.08);
  --fc-purple-mid: rgba(180, 139, 255, 0.24);
  --fc-pink-soft: rgba(255, 143, 212, 0.08);
  --fc-pink-mid: rgba(255, 143, 212, 0.22);
  --fc-cyan: #7dd3ff;
  --fc-cyan-soft: rgba(125, 211, 255, 0.2);
  --fc-board-size: 78%;
  --fc-rotate-x: 18deg;
  --fc-rotate-z: -18deg;
  --fc-grid-size: 16px;
}

.fc-3d-shell {
  background: radial-gradient(circle at 50% 30%, var(--fc-purple-glow), transparent 72%), linear-gradient(135deg, var(--fc-purple-soft), var(--fc-pink-soft));
  border: 1px solid var(--fc-purple-mid);
}

.fc-board-3d {
  position: relative;
  width: min(var(--fc-board-size), 320px); /* tuned so board remains fully visible at Tailwind sm/md/lg viewport breakpoints (640/768/1024) */
  aspect-ratio: 1;
  border-radius: 20px;
  background: linear-gradient(145deg, rgba(19, 21, 34, 0.95), rgba(11, 11, 22, 0.95));
  border: 1px solid rgba(125, 211, 255, 0.35);
  transform-style: preserve-3d;
  transform: rotateX(var(--fc-rotate-x)) rotateZ(var(--fc-rotate-z));
  box-shadow: 0 30px 45px rgba(2, 3, 10, 0.55), inset 0 0 0 1px var(--fc-pink-mid);
  animation: fcTilt 7s ease-in-out infinite;
}

.fc-board-grid {
  position: absolute;
  inset: 12%;
  background-image: linear-gradient(rgba(125, 211, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(125, 211, 255, 0.12) 1px, transparent 1px);
  background-size: var(--fc-grid-size) var(--fc-grid-size);
  transform: translateZ(2px);
}

.fc-chip {
  position: absolute;
  border-radius: 10px;
  padding: 4px 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #d8f3ff;
  border: 1px solid rgba(125, 211, 255, 0.3);
  background: rgba(9, 19, 30, 0.85);
  box-shadow: 0 10px 16px rgba(0, 0, 0, 0.35);
}

.fc-chip-main {
  top: 32%;
  left: 32%;
  transform: translateZ(28px);
}

.fc-chip-gyro {
  top: 16%;
  right: 17%;
  transform: translateZ(16px);
}

.fc-chip-osd {
  bottom: 20%;
  left: 18%;
  transform: translateZ(12px);
}

.fc-pad {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  border: 2px solid rgba(255, 143, 212, 0.7);
  box-shadow: inset 0 0 0 1px rgba(255, 200, 235, 0.4);
}

.fc-pad-1 { top: 10%; left: 10%; transform: translateZ(7px); }
.fc-pad-2 { top: 10%; right: 10%; transform: translateZ(7px); }
.fc-pad-3 { bottom: 10%; left: 10%; transform: translateZ(7px); }
.fc-pad-4 { bottom: 10%; right: 10%; transform: translateZ(7px); }

.fc-label {
  position: absolute;
  right: 12%;
  bottom: 12%;
  transform: translateZ(20px);
  font-size: 11px;
  font-weight: 700;
  color: #ff9ed7;
}

.fc-preview-mini {
  display: flex;
  justify-content: center;
}

.fc-highlight-icon {
  background: var(--fc-cyan-soft);
  color: var(--fc-cyan);
}

.fc-link-accent {
  color: var(--fc-purple-light);
}

.fc-board-3d-mini {
  width: 150px;
  transform: rotateX(22deg) rotateZ(-15deg);
}

.fc-board-3d-mini .fc-chip,
.fc-board-3d-mini .fc-label,
.fc-board-3d-mini .fc-pad {
  display: none;
}

@keyframes fcTilt {
  0%, 100% { transform: rotateX(var(--fc-rotate-x)) rotateZ(var(--fc-rotate-z)) translateY(0); }
  50% { transform: rotateX(calc(var(--fc-rotate-x) + 2deg)) rotateZ(calc(var(--fc-rotate-z) + 4deg)) translateY(-6px); }
}
</style>
