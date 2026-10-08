<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import PageHeader from '../components/PageHeader.vue'

import UartNoSignal from '../components/debug/UartNoSignal.vue'
import ReceiverNotDetected from '../components/debug/ReceiverNotDetected.vue'
import NoOsdDigital from '../components/debug/NoOsdDigital.vue'
import NoOsdAnalog from '../components/debug/NoOsdAnalog.vue'
import DroneJumpingFlipping from '../components/debug/DroneJumpingFlipping.vue'
import FcHighCpu from '../components/debug/FcHighCpu.vue'
import SticksInverted from '../components/debug/SticksInverted.vue'

const issues = [
  { slug: 'uart-no-signal', tag: 'UART / Wiring', title: 'No signal from a UART device',
    desc: "Wired up your receiver, VTX, or GPS and nothing's coming through? RX/TX being crossed the wrong way is the usual suspect.",
    component: UartNoSignal },
  { slug: 'receiver-not-detected', tag: 'Receiver', title: 'Receiver not being detected',
    desc: 'Bound and wired correctly, but Betaflight shows nothing moving. MSP and Serial RX on the same UART will kill your signal.',
    component: ReceiverNotDetected },
  { slug: 'no-osd-digital', tag: 'OSD / Digital', title: 'No OSD (Digital)',
    desc: 'Video in your digital goggles but no OSD overlay? VTX MSP + DisplayPort needs enabling in the Ports tab.',
    component: NoOsdDigital },
  { slug: 'no-osd-analog', tag: 'OSD / Analog', title: 'No OSD (Analog)',
    desc: "Analog video is fine but no overlay, or the OSD chip isn't getting the feed. Camera and VTX need routing through the FC's OSD pads.",
    component: NoOsdAnalog },
  { slug: 'drone-jumping-flipping', tag: 'Motors / ESC', title: 'Drone jumping / flipping on arming',
    desc: "Arms and immediately lunges or flips. Usually DSHOT300 too slow for your PID loop, or bidirectional DSHOT on an ESC that doesn't support it.",
    component: DroneJumpingFlipping },
  { slug: 'fc-high-cpu', tag: 'Performance', title: 'FC slow + CPU load extremely high',
    desc: 'CPU near 100%, FC sluggish, flight performance off. Lower the PID loop frequency or move to DSHOT300 + bidirectional DSHOT.',
    component: FcHighCpu },
  { slug: 'sticks-inverted', tag: 'Receiver / Channel Map', title: 'Sticks inverted / channel mapping wrong',
    desc: 'Push throttle and pitch moves. Roll and yaw swapped. Channel map mismatch — TAER vs AETR usually sorts it.',
    component: SticksInverted },
]

const num = (i) => String(i + 1).padStart(2, '0')
const active = ref(issues[0].slug)
let observer

onMounted(async () => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) active.value = e.target.id
      }
    },
    // fire when a section reaches the upper third of the viewport
    { rootMargin: '-15% 0px -70% 0px', threshold: 0 },
  )
  await nextTick()
  issues.forEach((i) => {
    const el = document.getElementById(i.slug)
    if (el) observer.observe(el)
  })

})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <div class="pg-pad" id="top">
    <div class="page-shell">
      <PageHeader
        index="05"
        label="Betaflight debugging"
        title="Debugging your "
        accent="flight controller"
        sub="Every weird Betaflight problem I've hit and how I actually fixed it. One page — scroll it, or jump straight to your symptom."
      />

      <div class="dbg">
        <!-- shortcuts -->
        <nav class="toc" aria-label="Jump to issue">
          <span class="label toc-h">Jump to</span>
          <ol class="toc-list">
            <li v-for="(iss, i) in issues" :key="iss.slug">
              <a :href="`#${iss.slug}`" class="toc-a" :class="{ on: active === iss.slug }">
                <span class="toc-n">{{ num(i) }}</span>
                <span class="toc-t">{{ iss.title }}</span>
              </a>
            </li>
          </ol>
        </nav>

        <!-- all the guides, stacked -->
        <div class="guides">
          <section v-for="(iss, i) in issues" :key="iss.slug" :id="iss.slug" class="guide">
            <header class="g-head">
              <div class="g-meta">
                <span class="idx">{{ num(i) }}</span>
                <span class="rule g-rule"></span>
                <span class="label">{{ iss.tag }}</span>
              </div>
              <h2 class="display g-title">{{ iss.title }}</h2>
              <p class="g-desc">{{ iss.desc }}</p>
            </header>

            <component :is="iss.component" />

            <a href="#top" class="g-top">↑ back to top</a>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dbg { display: grid; grid-template-columns: 1fr; gap: 32px; }
@media (min-width: 1080px) {
  .dbg { grid-template-columns: 210px minmax(0, 1fr); gap: 52px; align-items: start; }
}

/* ── shortcuts ── */
.toc {
  position: sticky; top: 68px; z-index: 20;
  background: var(--bg-base);
  padding: 10px 0;
  border-bottom: 1px solid var(--border-subtle);
}
@media (min-width: 1080px) {
  .toc { top: 28px; border-bottom: 0; padding: 0; }
}
.toc-h { display: block; margin-bottom: 10px; }

.toc-list { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; }
.toc-list::-webkit-scrollbar { display: none; }
@media (min-width: 1080px) {
  .toc-list { flex-direction: column; gap: 1px; overflow: visible; }
}

.toc-a {
  display: flex; align-items: baseline; gap: 8px;
  padding: 7px 9px; border-radius: 2px; white-space: nowrap;
  border-left: 2px solid transparent;
  transition: color 0.2s, background 0.2s, border-color 0.2s;
}
@media (min-width: 1080px) { .toc-a { white-space: normal; } }
.toc-a:hover { background: rgba(255, 255, 255, 0.03); }

.toc-n { font-family: var(--font-mono); font-size: 0.58rem; font-weight: 700; color: var(--text-muted); }
.toc-t { font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.04em; color: var(--text-secondary); line-height: 1.4; }

.toc-a.on { border-left-color: var(--pink); background: var(--violet-soft); }
.toc-a.on .toc-n { color: var(--pink); }
.toc-a.on .toc-t { color: var(--text-primary); }

/* ── guides ── */
.guides { min-width: 0; }
.guide { padding-bottom: clamp(44px, 6vw, 76px); scroll-margin-top: 90px; }
.guide + .guide { border-top: 1px solid var(--border-subtle); padding-top: clamp(40px, 5vw, 64px); }

.g-head { margin-bottom: 24px; }
.g-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; }
.g-rule { flex: 0 0 34px; }
.g-title { font-size: clamp(1.5rem, 3.2vw, 2.15rem); color: var(--text-primary); margin-bottom: 10px; }
.g-desc { color: var(--text-secondary); line-height: 1.65; font-size: 0.95rem; max-width: 62ch; }

.g-top {
  display: inline-block; margin-top: 22px;
  font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-muted);
  transition: color 0.2s;
}
.g-top:hover { color: var(--pink); }
</style>
