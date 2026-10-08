<script setup>
import { RouterLink } from 'vue-router'

const facts = [
  { k: 'MCU',          v: 'AT32F435RGT7, 288 MHz' },
  { k: 'Blackbox',     v: '16 Mb onboard flash' },
  { k: 'Firmware',     v: 'Betaflight, own target' },
  { k: 'Mounting',     v: '30.5 × 30.5 mm' },
  { k: 'Flying since', v: '2022' },
  { k: 'Licence',      v: 'Open hardware, all of it' },
]
</script>

<template>
  <section class="hero">
    <div class="page-shell hero-inner">
      <div class="lede">
        <p class="kicker">ShiroFPV &mdash; FPV hardware &amp; pilot</p>

        <h1 class="display headline">
          I design flight controllers, <em>then I crash them.</em>
        </h1>

        <p class="sub">
          AT32 boards, Betaflight targets and the odd bit of C, all open source.
          I don&rsquo;t ship anything I haven&rsquo;t flown myself, and hoarding schematics is cringe.
        </p>

        <div class="cta">
          <RouterLink to="/flight-controller" class="btn-primary">See the board</RouterLink>
          <RouterLink to="/projects" class="cta-link">Everything else &rarr;</RouterLink>
        </div>
      </div>

      <aside class="sheet">
        <p class="sheet-title">Spec sheet, rev&nbsp;1</p>
        <dl>
          <div v-for="f in facts" :key="f.k" class="fact">
            <dt>{{ f.k }}</dt>
            <dd>{{ f.v }}</dd>
          </div>
        </dl>
        <p class="sheet-note">Currently fighting an AT32 bug that refuses to die.</p>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero { padding: clamp(64px, 11vw, 140px) 20px clamp(56px, 8vw, 104px); }
@media (min-width: 640px) { .hero { padding-inline: 32px; } }

.hero-inner { display: grid; gap: 56px; }
@media (min-width: 1000px) {
  .hero-inner { grid-template-columns: minmax(0, 1.5fr) minmax(300px, 0.8fr); align-items: end; gap: 80px; }
}

.kicker { font-size: 0.9rem; color: var(--text-muted); margin-bottom: 28px; }

.headline {
  font-size: clamp(2.6rem, 6.6vw, 5.4rem);
  line-height: 1;
  letter-spacing: -0.035em;
  font-variation-settings: "opsz" 144, "SOFT" 50;
  color: var(--text-primary);
  margin-bottom: 32px;
  max-width: 14ch;
}
.headline em { font-style: italic; color: var(--copper-light); }

.sub {
  max-width: 46ch;
  font-size: 1.08rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 36px;
}

.cta { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; }
.cta-link {
  font-size: 0.95rem; color: var(--text-primary);
  text-decoration: underline; text-decoration-color: var(--border-strong);
  text-decoration-thickness: 1px; transition: text-decoration-color 0.2s;
}
.cta-link:hover { text-decoration-color: var(--copper); }

.sheet { border-top: 1px solid var(--text-primary); padding-top: 14px; }
.sheet-title {
  font-family: var(--font-display); font-style: italic;
  font-size: 1.05rem; color: var(--text-primary); margin-bottom: 10px;
}
.fact {
  display: flex; justify-content: space-between; gap: 16px;
  padding: 11px 0; border-bottom: 1px solid var(--border-subtle);
  font-size: 0.88rem;
}
.fact dt { color: var(--text-muted); }
.fact dd { color: var(--text-primary); text-align: right; font-variant-numeric: tabular-nums; }
.sheet-note { margin-top: 14px; font-size: 0.82rem; line-height: 1.5; color: var(--text-muted); }
</style>
