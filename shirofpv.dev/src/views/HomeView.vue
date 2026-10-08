<script setup>
import { RouterLink } from 'vue-router'
import { projects } from '../data/projects.js'

const others = projects.slice(1)

const timeline = [
  { year: '2022', text: 'Started flying FPV. Built my first quad from scratch.' },
  { year: '2024', text: 'Opened KiCad and started learning PCB design.' },
  { year: '2025', text: 'ShiroFPV FC v1 designed, manufactured and open-sourced.' },
  { year: '2026', text: 'Refining the board and optimising the design.' },
]

const tiles = [
  { tag: 'Guide', title: 'FC debugging', text: 'No OSD, receiver not detected, inverted sticks, flips on arm. Fixes that actually work.', go: 'Open guide', to: '/debugging' },
  { tag: 'Help',  title: 'Support', text: 'Questions about the board or your build.', go: 'Get help', href: 'https://support.shirofpv.com' },
]
</script>

<template>
  <div class="home">
    <section class="intro">
      <p class="eyebrow">Shiro &middot; he/him/her</p>
      <h1 class="title">FPV pilot and open-source hardware designer.</h1>
      <p class="lead">
        I got into FPV drones and never looked back. What started as a hobby turned into a fixation on the
        hardware itself: every chip, every trace, every millisecond of latency. Now I design flight controllers
        around AT32 and STM32, target Betaflight, and release all of it openly.
      </p>
      <div class="actions">
        <RouterLink to="/contact" class="btn-primary">Get in touch</RouterLink>
        <a href="https://github.com/ShiroFPV" target="_blank" rel="noopener noreferrer" class="btn-outline">GitHub</a>
        <RouterLink to="/about" class="btn-outline">More about me</RouterLink>
      </div>
    </section>

    <section class="block">
      <h2 class="block-title">Work</h2>

      <RouterLink to="/flight-controller" class="feature">
        <div class="feature-model">
          <model-viewer
            src="/assets/fc.glb"
            alt="3D model of the ShiroFPV flight controller"
            auto-rotate
            auto-rotate-delay="0"
            rotation-per-second="14deg"
            camera-orbit="30deg 60deg auto"
            shadow-intensity="0.5"
            exposure="1.05"
            disable-zoom
            interaction-prompt="none"
          ></model-viewer>
        </div>
        <div class="feature-body">
          <small>Hardware &middot; 2025</small>
          <h3>ShiroFPV flight controller</h3>
          <p>A 30.5 mm board around the AT32F435 at 288 MHz with 16 Mb blackbox flash. My own Betaflight target, schematics you can actually read.</p>
          <span class="go">Pinout &amp; details &rarr;</span>
        </div>
      </RouterLink>

      <ul class="list">
        <li v-for="p in others" :key="p.id">
          <a :href="p.link" target="_blank" rel="noopener noreferrer">
            <span>{{ p.title }}</span><span>{{ p.tags.slice(0, 2).join(' · ') }}</span>
          </a>
        </li>
      </ul>
    </section>

    <section class="block split">
      <h2 class="block-title">So far</h2>
      <ol class="timeline">
        <li v-for="t in timeline" :key="t.text"><span>{{ t.year }}</span><p>{{ t.text }}</p></li>
      </ol>
    </section>

    <section class="block">
      <h2 class="block-title">For other pilots</h2>
      <div class="tiles">
        <component
          v-for="t in tiles" :key="t.title"
          :is="t.to ? RouterLink : 'a'"
          v-bind="t.to ? { to: t.to } : { href: t.href }"
          class="tile"
        >
          <div><small>{{ t.tag }}</small><h3>{{ t.title }}</h3><p>{{ t.text }}</p></div>
          <span class="go">{{ t.go }} &rarr;</span>
        </component>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home { max-width: 820px; margin: 0 auto; padding: 0 24px 40px; }

.intro { padding: 88px 0 72px; }
.eyebrow { font-size: 0.88rem; color: var(--text-muted); margin-bottom: 16px; }
.title { font-size: clamp(1.9rem, 4.2vw, 2.9rem); font-weight: 500; letter-spacing: -0.03em; line-height: 1.1; max-width: 18ch; margin-bottom: 20px; }
.lead { font-size: 1.02rem; line-height: 1.7; color: var(--text-secondary); max-width: 60ch; margin-bottom: 28px; }
.actions { display: flex; flex-wrap: wrap; gap: 10px; }

.block { padding: 56px 0; border-top: 1px solid var(--border-subtle); }
.block-title { font-size: 0.88rem; font-weight: 500; color: var(--text-muted); letter-spacing: 0; margin-bottom: 24px; }

.feature { display: grid; border: 1px solid var(--border-subtle); border-radius: 12px; overflow: hidden; transition: background 0.2s; }
@media (min-width: 720px) { .feature { grid-template-columns: 1fr 1fr; } }
.feature:hover { background: var(--surface); }
.feature-model { height: 240px; background: var(--surface); }
model-viewer { width: 100%; height: 100%; --poster-color: transparent; pointer-events: none; }
.feature-body { padding: 24px; display: flex; flex-direction: column; justify-content: center; }
.feature small, .tile small { font-size: 0.8rem; color: var(--text-muted); }
.feature h3 { font-size: 1.15rem; margin: 6px 0 8px; }
.feature p { font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 18px; }
.go { font-size: 0.85rem; font-weight: 500; color: var(--text-secondary); }

.list { margin-top: 12px; }
.list a { display: flex; justify-content: space-between; gap: 20px; padding: 16px 0; border-bottom: 1px solid var(--border-subtle); }
.list a:hover span:first-child { text-decoration: underline; text-decoration-color: var(--border-strong); }
.list a span:last-child { font-size: 0.85rem; color: var(--text-muted); text-align: right; }

@media (min-width: 720px) { .split { display: grid; grid-template-columns: 180px 1fr; } .split .block-title { margin: 0; } }
.timeline li { display: grid; grid-template-columns: 56px 1fr; gap: 12px; padding: 0 0 16px; }
.timeline span { font-size: 0.88rem; color: var(--text-muted); font-variant-numeric: tabular-nums; }
.timeline p { font-size: 0.95rem; color: var(--text-secondary); }

.tiles { display: grid; gap: 12px; }
@media (min-width: 720px) { .tiles { grid-template-columns: 1fr 1fr; } }
.tile { display: flex; flex-direction: column; justify-content: space-between; min-height: 160px; padding: 22px; border: 1px solid var(--border-subtle); border-radius: 12px; transition: background 0.2s; }
.tile:hover { background: var(--surface); }
.tile h3 { font-size: 1.05rem; margin: 6px 0; }
.tile p { font-size: 0.88rem; color: var(--text-secondary); }
.tile .go { margin-top: 18px; }
</style>
