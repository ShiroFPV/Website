<script setup>
import PageHeader from '../components/PageHeader.vue'
import { RouterLink } from 'vue-router'

const issues = [
  {
    slug: 'uart-no-signal',
    icon: '🔄',
    tag: 'UART / Wiring',
    title: 'No signal from a UART device',
    desc: "Wired up your receiver, VTX, or GPS and nothing's coming through? RX/TX being crossed the wrong way is the usual suspect.",
    color: '#6d5ef2',
  },
  {
    slug: 'receiver-not-detected',
    icon: '📡',
    tag: 'Receiver',
    title: 'Receiver not being detected',
    desc: 'Receiver is bound, wired correctly, but Betaflight shows nothing moving. MSP and Serial RX on the same UART will kill your signal.',
    color: '#6d5ef2',
  },
  {
    slug: 'no-osd-digital',
    icon: '🖥️',
    tag: 'OSD / Digital',
    title: 'No OSD (Digital)',
    desc: "Got video in your digital goggles but no OSD overlay? VTX MSP + DisplayPort needs to be enabled in the Ports tab.",
    color: '#8f7ff5',
  },
  {
    slug: 'no-osd-analog',
    icon: '📹',
    tag: 'OSD / Analog',
    title: 'No OSD (Analog)',
    desc: "Analog video is fine but no overlay, or the OSD chip isn't getting the feed at all. Your camera and VTX need to be routed through the FC's OSD pads.",
    color: '#8f7ff5',
  },
  {
    slug: 'drone-jumping-flipping',
    icon: '⚡',
    tag: 'Motors / ESC',
    title: 'Drone jumping / flipping on arming',
    desc: "Arms and immediately lunges or flips. Usually DSHOT300 being too slow for your PID loop frequency, or bidirectional DSHOT enabled on an ESC that doesn't support it.",
    color: '#6d5ef2',
  },
  {
    slug: 'fc-high-cpu',
    icon: '💻',
    tag: 'Performance',
    title: 'FC slow + CPU load extremely high',
    desc: 'CPU sitting near 100%, FC feels sluggish, flight performance is off. Lower the PID loop frequency or switch to DSHOT300 + bidirectional DSHOT if your ESC supports it.',
    color: '#8f7ff5',
  },
  {
    slug: 'sticks-inverted',
    icon: '🎮',
    tag: 'Receiver / Channel Map',
    title: 'Sticks inverted / channel mapping wrong',
    desc: 'Push throttle and pitch moves. Roll and yaw are swapped. Classic channel map mismatch — switching between TAER and AETR usually sorts it.',
    color: '#6d5ef2',
  },
]
</script>

<template>
  <div class="pg-pad">
    <div class="page-shell">

      <PageHeader
        index="05"
        label="Betaflight Debugging"
        title="Debugging Your "
        accent="Flight Controller"
        sub="Over time I've run into a lot of weird Betaflight issues and figured out how to fix most of them. This is where I'm documenting all of that — specific problems, what causes them, and how to actually solve them."
      />

      <ul class="issues">
        <li v-for="(issue, i) in issues" :key="issue.slug">
          <RouterLink :to="`/debugging/${issue.slug}`" class="irow">
            <span class="irow-i idx">{{ String(i + 1).padStart(2, '0') }}</span>
            <span class="irow-body">
              <span class="irow-tag">{{ issue.tag }}</span>
              <span class="irow-title">{{ issue.title }}</span>
              <span class="irow-desc">{{ issue.desc }}</span>
            </span>
            <span class="irow-arrow" aria-hidden="true">→</span>
          </RouterLink>
        </li>
      </ul>

    </div>
  </div>
</template>

<style scoped>
.issues { border-top: 1px solid var(--border-subtle); }
.irow {
  position: relative; display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto; gap: 18px; align-items: center;
  padding: 22px 14px 22px 4px; border-bottom: 1px solid var(--border-subtle);
  transition: background 0.25s ease, padding-left 0.25s ease;
}
.irow::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg, var(--violet-light), var(--pink));
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.irow:hover { background: rgba(255,255,255,0.022); padding-left: 16px; }
.irow:hover::before { transform: scaleY(1); }
.irow-i { align-self: start; padding-top: 5px; transition: color 0.25s; }
.irow:hover .irow-i { color: var(--pink); }
.irow-body { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.irow-tag {
  font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--violet-light);
}
.irow-title {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: clamp(1.02rem, 1.9vw, 1.3rem); color: var(--text-primary);
}
.irow-desc { font-size: 0.87rem; line-height: 1.55; color: var(--text-muted); max-width: 74ch; }
.irow-arrow { font-family: var(--font-mono); color: var(--text-muted); transition: transform 0.25s, color 0.25s; }
.irow:hover .irow-arrow { color: var(--pink); transform: translateX(4px); }
</style>
