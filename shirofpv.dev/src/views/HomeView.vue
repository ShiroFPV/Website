<script setup>
import HeroSection from '../components/HeroSection.vue'
import { projects } from '../data/projects.js'
import { RouterLink } from 'vue-router'

const featured = projects.slice(0, 4)
const num = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div>
    <HeroSection />

    <!-- ── 02 selected work ─────────────────────────── -->
    <section class="sec">
      <div class="page-shell">
        <header class="sec-head">
          <div class="meta">
            <span class="idx">02</span>
            <span class="rule meta-rule"></span>
            <span class="label">Selected work</span>
          </div>
          <h2 class="display sec-title">Things I&rsquo;ve built</h2>
          <p class="sec-sub">FCs, firmware, tools — whatever I got obsessed with. Most of it actually works.</p>
        </header>

        <ul class="work">
          <li v-for="(p, i) in featured" :key="p.id">
            <a :href="p.link" target="_blank" rel="noopener noreferrer" class="row">
              <span class="row-i idx">{{ num(i) }}</span>
              <span class="row-body">
                <span class="row-title">{{ p.title }}</span>
                <span class="row-desc">{{ p.description }}</span>
              </span>
              <span class="row-tags">
                <span v-for="t in p.tags.slice(0, 3)" :key="t" class="tag">{{ t }}</span>
              </span>
              <span class="row-arrow" aria-hidden="true">→</span>
            </a>
          </li>
        </ul>

        <div class="sec-foot">
          <RouterLink to="/projects" class="btn-outline">See everything</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── 03 who ───────────────────────────────────── -->
    <section class="sec sec-who">
      <div class="page-shell who-grid">
        <div class="who-left">
          <div class="meta">
            <span class="idx">03</span>
            <span class="rule meta-rule"></span>
            <span class="label">Who</span>
          </div>
          <h2 class="display sec-title">Who even<br />is Shiro?</h2>
        </div>

        <div class="who-right">
          <p class="who-p">
            FPV pilot turned hardware nerd. Got frustrated with what was out there,
            started making my own. AT32 flight controllers, KiCad schematics,
            open-source everything — it escalated quickly.
          </p>

          <blockquote class="pull">
            A femboy who designs flight controllers.
            <span class="pull-dim">The ESCs don&rsquo;t care, and honestly neither should you.</span>
          </blockquote>

          <div class="who-foot">
            <span class="chip">he/him/her</span>
            <RouterLink to="/about" class="who-link">The full story →</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sec { padding: clamp(56px, 8vw, 104px) 20px; }
@media (min-width: 640px) { .sec { padding-inline: 32px; } }

.meta { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.meta-rule { flex: 0 0 44px; }

.sec-head { margin-bottom: clamp(30px, 4vw, 48px); }
.sec-title {
  font-size: clamp(1.9rem, 4.2vw, 3rem);
  color: var(--text-primary);
  margin-bottom: 12px;
}
.sec-sub { max-width: 52ch; color: var(--text-secondary); line-height: 1.65; font-size: 0.97rem; }

/* ── work rows (not cards) ── */
.work { border-top: 1px solid var(--border-subtle); }

.row {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "i body arrow" ". tags tags";
  gap: 4px 18px;
  align-items: center;
  padding: 22px 14px 22px 4px;
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.25s ease, padding-left 0.25s ease;
}
@media (min-width: 860px) {
  .row {
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    grid-template-areas: "i body tags arrow";
    gap: 26px;
  }
}
.row::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg, var(--violet-light), var(--pink));
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.row:hover { background: rgba(255, 255, 255, 0.022); padding-left: 16px; }
.row:hover::before { transform: scaleY(1); }

.row-i { grid-area: i; align-self: start; padding-top: 4px; transition: color 0.25s; }
.row:hover .row-i { color: var(--pink); }

.row-body { grid-area: body; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.row-title {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: clamp(1.08rem, 2vw, 1.4rem); color: var(--text-primary);
}
.row-desc {
  font-size: 0.87rem; line-height: 1.55; color: var(--text-muted);
  max-width: 62ch;
}

.row-tags { grid-area: tags; display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-secondary);
  border: 1px solid var(--border-subtle); border-radius: 2px;
  padding: 3px 7px; white-space: nowrap;
}

.row-arrow {
  grid-area: arrow; display: none;
  font-family: var(--font-mono); color: var(--text-muted);
  transition: transform 0.25s ease, color 0.25s ease;
}
@media (min-width: 860px) { .row-arrow { display: block; } }
.row:hover .row-arrow { color: var(--pink); transform: translateX(4px); }

.sec-foot { margin-top: 30px; }

/* ── who ── */
.sec-who { border-top: 1px solid var(--border-subtle); }
.who-grid { display: grid; gap: clamp(26px, 4vw, 60px); grid-template-columns: 1fr; }
@media (min-width: 900px) { .who-grid { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); } }

.who-p { color: var(--text-secondary); line-height: 1.72; font-size: 1rem; margin-bottom: 26px; max-width: 58ch; }

.pull {
  position: relative;
  padding: 16px 0 16px 20px;
  border-left: 2px solid var(--pink);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: clamp(1.05rem, 2vw, 1.3rem);
  letter-spacing: -0.02em;
  line-height: 1.38;
  color: var(--text-primary);
  margin-bottom: 26px;
}
.pull-dim { display: block; margin-top: 7px; font-family: var(--font-body); font-weight: 400; font-size: 0.9rem; line-height: 1.6; color: var(--text-muted); letter-spacing: 0; }

.who-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
.chip {
  font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--pink);
  background: var(--pink-soft);
  border: 1px solid var(--border-hot);
  border-radius: 2px;
  padding: 5px 9px;
}
.who-link {
  font-family: var(--font-mono); font-size: 0.74rem; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--text-secondary);
  border-bottom: 1px solid var(--border-strong);
  padding-bottom: 2px;
  transition: color 0.2s, border-color 0.2s;
}
.who-link:hover { color: var(--text-primary); border-color: var(--pink); }
</style>
