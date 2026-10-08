<script setup>
import { RouterLink } from 'vue-router'

const facts = [
  { k: 'designs',  v: 'Custom flight controllers on STM32 / AT32, targeting Betaflight.' },
  { k: 'routes',   v: 'PCB layout in KiCad — schematic through to a finished, manufactured board.' },
  { k: 'publishes', v: 'Everything open source. Schematics, firmware, and tools alike.' },
]

const skills = [
  'PCB Design', 'STM32', 'C', 'Betaflight', 'Hardware Design',
  '3D Modeling', 'KiCad', 'FPV Piloting', 'Open Source', 'Firmware Dev',
]

const timeline = [
  { year: '2022', title: 'Started FPV', description: 'Discovered FPV drones and immediately fell in love with the freedom of flight.' },
  { year: '2022', title: 'First build', description: 'Built my first quad from scratch — learned how every component works, and that every solder joint has to be right.' },
  { year: '2024', title: 'Hardware design begins', description: 'Started learning PCB design in KiCad. Realised I wanted to build my own flight controller.' },
  { year: '2025', title: 'ShiroFPV FC v1', description: 'Designed and manufactured the first ShiroFPV flight controller. Open-sourced it immediately.' },
  { year: '2026', title: 'Improvement', description: 'Currently refining the design and optimising the board.' },
]
</script>

<template>
  <div class="pg">
    <div class="page-shell-narrow">

      <!-- ── identity ─────────────────────────────── -->
      <section class="id">
        <div class="id-meta">
          <span class="idx">02</span>
          <span class="rule id-rule"></span>
          <span class="label">Profile</span>
        </div>

        <h1 class="display id-name">Shiro<span class="grad-text">FPV</span></h1>

        <div class="id-line">
          <span class="handle">@shirofpv</span>
          <span class="chip">he/him/her</span>
        </div>

        <p class="id-role">
          FPV pilot · open-source hardware designer · microcontroller enthusiast
        </p>

        <dl class="facts">
          <div v-for="f in facts" :key="f.k" class="fact">
            <dt class="fact-k">{{ f.k }}</dt>
            <dd class="fact-v">{{ f.v }}</dd>
          </div>
        </dl>

        <blockquote class="pull">
          A femboy who designs flight controllers.
          <span class="pull-dim">The ESCs don&rsquo;t care, and honestly neither should you.</span>
        </blockquote>

        <div class="id-cta">
          <RouterLink to="/projects" class="btn-primary">See the work</RouterLink>
          <RouterLink to="/contact" class="btn-outline">Get in touch</RouterLink>
        </div>
      </section>

      <!-- ── story ────────────────────────────────── -->
      <section class="sec">
        <div class="sec-meta"><span class="label">The story</span><span class="rule"></span></div>
        <div class="prose">
          <p>
            I got into FPV drones and never looked back. What started as a hobby turned into a
            fixation on the hardware itself — every chip, every trace, every millisecond of latency.
          </p>
          <p>
            Now I design flight controllers around STM32 and AT32 microcontrollers, targeting
            Betaflight and releasing all of it openly. The goal is simple: high-performance hardware
            that anyone can use, modify, and improve.
          </p>
        </div>
      </section>

      <!-- ── skills ───────────────────────────────── -->
      <section class="sec">
        <div class="sec-meta"><span class="label">What I actually know</span><span class="rule"></span></div>
        <ul class="skills">
          <li v-for="s in skills" :key="s">{{ s }}</li>
        </ul>
      </section>

      <!-- ── timeline ─────────────────────────────── -->
      <section class="sec">
        <div class="sec-meta"><span class="label">How it went</span><span class="rule"></span></div>
        <ol class="tl">
          <li v-for="(t, i) in timeline" :key="i" class="tl-item">
            <span class="tl-year">{{ t.year }}</span>
            <span class="tl-body">
              <span class="tl-title">{{ t.title }}</span>
              <span class="tl-desc">{{ t.description }}</span>
            </span>
          </li>
        </ol>
      </section>

    </div>
  </div>
</template>

<style scoped>
.pg { padding: clamp(48px, 7vw, 92px) 20px clamp(56px, 7vw, 92px); }
@media (min-width: 640px) { .pg { padding-inline: 32px; } }

/* ── identity ── */
.id-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.id-rule { flex: 0 0 44px; }

.id-name { font-size: clamp(2.3rem, 6vw, 4rem); line-height: 0.9; margin-bottom: 16px; color: var(--text-primary); }

.id-line { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; margin-bottom: 12px; }
.handle { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-muted); }
.chip {
  font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase;
  color: var(--pink); background: var(--pink-soft);
  border: 1px solid var(--border-hot); border-radius: 2px; padding: 5px 9px;
}

.id-role { color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 30px; }

.facts { border-top: 1px solid var(--border-subtle); margin-bottom: 28px; }
.fact {
  display: grid; grid-template-columns: 1fr; gap: 2px;
  padding: 13px 0; border-bottom: 1px solid var(--border-subtle);
}
@media (min-width: 640px) { .fact { grid-template-columns: 110px 1fr; gap: 18px; align-items: baseline; } }
.fact-k {
  font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--violet-light);
}
.fact-v { color: var(--text-secondary); font-size: 0.94rem; line-height: 1.6; }

.pull {
  padding: 16px 0 16px 20px;
  border-left: 2px solid var(--pink);
  font-family: var(--font-display); font-weight: 600;
  font-size: clamp(1.05rem, 2.1vw, 1.35rem);
  letter-spacing: -0.02em; line-height: 1.38;
  color: var(--text-primary);
  margin-bottom: 30px;
}
.pull-dim {
  display: block; margin-top: 7px;
  font-family: var(--font-body); font-weight: 400; font-size: 0.9rem;
  line-height: 1.6; letter-spacing: 0; color: var(--text-muted);
}

.id-cta { display: flex; flex-wrap: wrap; gap: 12px; }

/* ── sections ── */
.sec { margin-top: clamp(44px, 6vw, 72px); }
.sec-meta { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; }
.sec-meta .rule { flex: 1; }

.prose p { color: var(--text-secondary); line-height: 1.75; font-size: 0.99rem; }
.prose p + p { margin-top: 14px; }

.skills { display: flex; flex-wrap: wrap; gap: 7px; }
.skills li {
  font-family: var(--font-mono); font-size: 0.66rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-secondary);
  border: 1px solid var(--border-subtle); border-radius: 2px;
  padding: 7px 10px;
  transition: color 0.2s, border-color 0.2s;
}
.skills li:hover { color: var(--text-primary); border-color: var(--border-hot); }

/* ── timeline ── */
.tl { position: relative; padding-left: 20px; }
.tl::before {
  content: ""; position: absolute; left: 3px; top: 6px; bottom: 6px; width: 1px;
  background: linear-gradient(180deg, var(--violet), var(--pink), transparent);
}
.tl-item { position: relative; display: grid; gap: 3px; padding: 0 0 26px; }
@media (min-width: 640px) { .tl-item { grid-template-columns: 62px 1fr; gap: 18px; } }
.tl-item::before {
  content: ""; position: absolute; left: -20px; top: 7px;
  width: 7px; height: 7px; border-radius: 999px;
  background: var(--bg-base); border: 1.5px solid var(--violet-light);
}
.tl-item:hover::before { border-color: var(--pink); background: var(--pink-soft); }
.tl-year { font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.1em; color: var(--violet-light); padding-top: 2px; }
.tl-body { display: flex; flex-direction: column; gap: 4px; }
.tl-title { font-family: var(--font-display); font-weight: 600; font-size: 1.02rem; color: var(--text-primary); letter-spacing: -0.015em; }
.tl-desc { font-size: 0.89rem; line-height: 1.6; color: var(--text-muted); }
</style>
