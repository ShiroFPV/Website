<script setup>
import { RouterLink } from 'vue-router'

const issues = [
  {
    slug: 'uart-no-signal',
    icon: '🔄',
    tag: 'UART / Wiring',
    title: 'No signal from a UART device',
    desc: "Wired up your receiver, VTX, or GPS and nothing's coming through? RX/TX being crossed the wrong way is the usual suspect.",
    color: '#b48bff',
  },
  {
    slug: 'receiver-not-detected',
    icon: '📡',
    tag: 'Receiver',
    title: 'Receiver not being detected',
    desc: 'Receiver is bound, wired correctly, but Betaflight shows nothing moving. MSP and Serial RX on the same UART will kill your signal.',
    color: '#ff8fd4',
  },
  {
    slug: 'no-osd-digital',
    icon: '🖥️',
    tag: 'OSD / Digital',
    title: 'No OSD (Digital)',
    desc: "Got video in your digital goggles but no OSD overlay? VTX MSP + DisplayPort needs to be enabled in the Ports tab.",
    color: '#7dd3ff',
  },
  {
    slug: 'no-osd-analog',
    icon: '📹',
    tag: 'OSD / Analog',
    title: 'No OSD (Analog)',
    desc: "Analog video is fine but no overlay, or the OSD chip isn't getting the feed at all. Your camera and VTX need to be routed through the FC's OSD pads.",
    color: '#d7b7ff',
  },
  {
    slug: 'drone-jumping-flipping',
    icon: '⚡',
    tag: 'Motors / ESC',
    title: 'Drone jumping / flipping on arming',
    desc: "Arms and immediately lunges or flips. Usually DSHOT300 being too slow for your PID loop frequency, or bidirectional DSHOT enabled on an ESC that doesn't support it.",
    color: '#ff8fd4',
  },
  {
    slug: 'fc-high-cpu',
    icon: '💻',
    tag: 'Performance',
    title: 'FC slow + CPU load extremely high',
    desc: 'CPU sitting near 100%, FC feels sluggish, flight performance is off. Lower the PID loop frequency or switch to DSHOT300 + bidirectional DSHOT if your ESC supports it.',
    color: '#7dd3ff',
  },
  {
    slug: 'sticks-inverted',
    icon: '🎮',
    tag: 'Receiver / Channel Map',
    title: 'Sticks inverted / channel mapping wrong',
    desc: 'Push throttle and pitch moves. Roll and yaw are swapped. Classic channel map mismatch — switching between TAER and AETR usually sorts it.',
    color: '#b48bff',
  },
]
</script>

<template>
  <div class="pt-24 pb-16">
    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="text-center mb-12 sm:mb-16">
        <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm" style="color: #d7b7ff;">
          <span class="w-2 h-2 rounded-full" style="background: #ff8fd4;"></span>
          Betaflight Debugging
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 sm:mb-4">
          Debugging Your <span class="gradient-text">Flight Controller</span>
        </h1>
        <p class="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Over time I've run into a lot of weird Betaflight issues and figured out how to fix most of them. This is where I'm documenting all of that — specific problems, what causes them, and how to actually solve them.
        </p>
      </div>

      <div class="grid gap-4 sm:gap-5">
        <RouterLink
          v-for="issue in issues"
          :key="issue.slug"
          :to="`/debugging/${issue.slug}`"
          class="glass-card rounded-2xl p-5 sm:p-6 card-hover flex items-start gap-4 sm:gap-5 group"
        >
          <div class="text-2xl sm:text-3xl flex-shrink-0 mt-0.5">{{ issue.icon }}</div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span class="text-xs px-2 py-0.5 rounded-full font-medium" :style="`background: ${issue.color}20; color: ${issue.color};`">{{ issue.tag }}</span>
            </div>
            <h2 class="text-base sm:text-lg font-bold text-white mb-1.5 group-hover:opacity-80 transition-opacity">{{ issue.title }}</h2>
            <p class="text-gray-400 text-sm leading-relaxed">{{ issue.desc }}</p>
          </div>
          <div class="flex-shrink-0 self-center text-gray-600 group-hover:text-gray-300 transition-colors text-lg">→</div>
        </RouterLink>
      </div>

    </div>
  </div>
</template>
