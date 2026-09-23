<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'

const visible = ref(false)
onMounted(() => { requestAnimationFrame(() => { visible.value = true }) })

// reads like an instrument panel, but it's just honest metadata
const readout = [
  { k: 'callsign',  v: 'shiro',            note: 'he/him/her' },
  { k: 'board',     v: 'AT32F435RGT7',     note: 'rev 1' },
  { k: 'target',    v: 'Betaflight',       note: '30.5×30.5' },
  { k: 'status',    v: 'it flies',         note: 'mostly' },
]

const specs = [
  { n: '288', u: 'MHz' },
  { n: '16', u: 'Mb blackbox' },
  { n: '2022', u: 'flying since' },
  { n: '100', u: '% open source' },
]
</script>

<template>
  <section class="hero" :class="{ show: visible }">
    <div class="page-shell hero-inner">

      <!-- left column -->
      <div class="lede">
        <div class="meta">
          <span class="idx">01</span>
          <span class="rule meta-rule"></span>
          <span class="label">Open-source FPV hardware</span>
        </div>

        <h1 class="display headline">Shiro<span class="grad-text">FPV</span></h1>

        <p class="sub">
          AT32 flight controllers, Betaflight targets, firmware in C —
          and a stubborn refusal to ship anything I wouldn't fly myself.
          <span class="sub-dim">Open-source, because hoarding schematics is cringe.</span>
        </p>

        <div class="cta">
          <RouterLink to="/flight-controller" class="btn-primary">The board →</RouterLink>
          <RouterLink to="/projects" class="btn-outline">Everything else</RouterLink>
        </div>

      </div>

      <!-- right column: readout panel -->
      <aside class="panel ticked readout">
        <header class="readout-top">
          <span class="label">status.log</span>
          <span class="live"><i></i>live</span>
        </header>

        <dl class="rows">
          <div v-for="r in readout" :key="r.k" class="row">
            <dt class="row-k">{{ r.k }}</dt>
            <dd class="row-v">
              {{ r.v }}
              <span class="row-note">{{ r.note }}</span>
            </dd>
          </div>
        </dl>

        <footer class="readout-foot">
          <span class="tickstrip" aria-hidden="true">
            <i v-for="i in 28" :key="i"></i>
          </span>
          <span class="label foot-note">currently · fighting an AT32 bug that refuses to die</span>
        </footer>
      </aside>

      <ul class="specs">
        <li v-for="s in specs" :key="s.u">
          <span class="spec-n">{{ s.n }}</span>
          <span class="spec-u">{{ s.u }}</span>
        </li>
      </ul>

    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  padding: clamp(56px, 10vw, 118px) 20px clamp(34px, 4vw, 52px);
}
@media (min-width: 640px) { .hero { padding-inline: 32px; } }

.hero-inner {
  display: grid;
  gap: clamp(32px, 4vw, 52px);
  grid-template-columns: 1fr;
  align-items: start;
}
@media (min-width: 1000px) {
  .hero-inner { grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.85fr); }
  .specs { grid-column: 1 / -1; }
}

/* entrance */
.lede, .readout, .specs {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity 0.6s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}
.show .lede { opacity: 1; transform: none; }
.show .readout { opacity: 1; transform: none; transition-delay: 0.12s; }
.show .specs { opacity: 1; transform: none; transition-delay: 0.2s; }

.meta { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }
.meta-rule { flex: 0 0 44px; }

.headline {
  font-size: clamp(2.5rem, 7vw, 5.98rem);
  line-height: 0.86;
  letter-spacing: -0.055em;
  color: var(--text-primary);
  margin-bottom: 26px;
}

.sub {
  max-width: 48ch;
  font-size: clamp(0.98rem, 1.5vw, 1.1rem);
  line-height: 1.66;
  color: var(--text-secondary);
  margin-bottom: 32px;
}
.sub-dim { display: block; margin-top: 8px; color: var(--text-muted); }

.cta { display: flex; flex-wrap: wrap; gap: 12px; }

/* spec strip with tick separators */
.specs {
  display: flex; flex-wrap: wrap; gap: 0;
  border-top: 1px solid var(--border-subtle);
  padding-top: 18px;
}
.specs li {
  display: flex; flex-direction: column; gap: 3px;
  padding-right: clamp(20px, 3.4vw, 40px);
  margin-right: clamp(20px, 3.4vw, 40px);
  border-right: 1px solid var(--border-subtle);
}
.specs li:last-child { border-right: 0; margin-right: 0; padding-right: 0; }
.spec-n {
  font-family: var(--font-display); font-weight: 800; font-size: 1.32rem;
  color: var(--text-primary); line-height: 1;
}
.spec-u {
  font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.13em;
  text-transform: uppercase; color: var(--text-muted);
}

/* ── readout panel ── */
.readout { padding: 18px 18px 14px; }

.readout-top {
  display: flex; align-items: center; justify-content: space-between;
  padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);
}
.live {
  display: inline-flex; align-items: center; gap: 6px;
  font-family: var(--font-mono); font-size: 0.6rem; letter-spacing: 0.14em;
  text-transform: uppercase; color: var(--pink);
}
.live i {
  width: 5px; height: 5px; border-radius: 999px; background: var(--pink);
  box-shadow: 0 0 0 3px var(--pink-soft);
  animation: pulse 2.2s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }

.rows { padding: 4px 0; }
.row {
  display: grid; grid-template-columns: 72px 1fr; gap: 10px; align-items: baseline;
  padding: 9px 0; border-bottom: 1px dashed var(--border-subtle);
}
.row:last-child { border-bottom: 0; }
.row-k {
  font-family: var(--font-mono); font-size: 0.64rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-muted);
}
.row-v {
  font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-primary);
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 8px;
}
.row-note { font-size: 0.64rem; letter-spacing: 0.06em; color: var(--pink); }

.readout-foot { padding-top: 12px; }
.tickstrip { display: flex; gap: 3px; margin-bottom: 10px; }
.tickstrip i {
  flex: 1; height: 6px; border-radius: 1px;
  background: var(--border-subtle);
}
.tickstrip i:nth-child(-n + 19) { background: linear-gradient(180deg, var(--violet), var(--pink)); opacity: 0.75; }
.foot-note { display: block; text-transform: none; letter-spacing: 0.04em; line-height: 1.5; }
</style>
