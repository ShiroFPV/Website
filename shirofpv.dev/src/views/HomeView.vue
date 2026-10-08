<script setup>
import HeroSection from '../components/HeroSection.vue'
import ProjectRow from '../components/ProjectRow.vue'
import { projects } from '../data/projects.js'
import { RouterLink } from 'vue-router'

const featured = projects.slice(0, 4)
const num = (i) => String(i + 1).padStart(2, '0')
</script>

<template>
  <div>
    <HeroSection />

    <section class="sec">
      <div class="page-shell">
        <header class="sec-head">
          <h2 class="display sec-title">Things I&rsquo;ve built</h2>
          <p class="sec-sub">Flight controllers, firmware, small tools. Whatever I got obsessed with that month. Most of it works.</p>
        </header>

        <ul class="work">
          <li v-for="(p, i) in featured" :key="p.id">
            <ProjectRow :project="p" :index="num(i)" />
          </li>
        </ul>

        <RouterLink to="/projects" class="more">All projects &rarr;</RouterLink>
      </div>
    </section>

    <section class="sec sec-who">
      <div class="page-shell who-grid">
        <h2 class="display sec-title">Who&rsquo;s Shiro?</h2>

        <div>
          <p class="who-p">
            FPV pilot turned hardware nerd. I got frustrated with what was on the shelf
            and started drawing my own boards: AT32 flight controllers, KiCad schematics,
            everything open. It escalated quickly.
          </p>

          <blockquote class="pull">
            &ldquo;A femboy who designs flight controllers. The ESCs don&rsquo;t care, and honestly neither should you.&rdquo;
          </blockquote>

          <p class="who-foot">
            <span>he/him/her</span>
            <RouterLink to="/about" class="who-link">The longer version &rarr;</RouterLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sec { padding: clamp(64px, 9vw, 120px) 20px; border-top: 1px solid var(--border-subtle); }
@media (min-width: 640px) { .sec { padding-inline: 32px; } }

.sec-head {
  display: flex; flex-direction: column; gap: 14px;
  margin-bottom: clamp(32px, 4vw, 56px);
}
@media (min-width: 900px) {
  .sec-head { flex-direction: row; align-items: flex-end; justify-content: space-between; gap: 48px; }
}
.sec-title { font-size: clamp(2rem, 4.4vw, 3.2rem); color: var(--text-primary); }
.sec-sub { max-width: 42ch; color: var(--text-secondary); line-height: 1.6; }

.work { border-top: 1px solid var(--border-subtle); }

.more {
  display: inline-block; margin-top: 32px;
  font-size: 0.95rem; color: var(--text-primary);
  text-decoration: underline; text-decoration-color: var(--border-strong); text-decoration-thickness: 1px;
}
.more:hover { text-decoration-color: var(--copper); }

.who-grid { display: grid; gap: 28px; }
@media (min-width: 900px) { .who-grid { grid-template-columns: 1fr 1.3fr; gap: 64px; } }

.who-p { color: var(--text-secondary); line-height: 1.75; font-size: 1.05rem; margin-bottom: 36px; max-width: 56ch; }

.pull {
  font-family: var(--font-display);
  font-style: italic;
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  line-height: 1.3;
  letter-spacing: -0.015em;
  color: var(--text-primary);
  margin-bottom: 36px;
  max-width: 30ch;
}

.who-foot { display: flex; flex-wrap: wrap; align-items: center; gap: 24px; font-size: 0.9rem; color: var(--text-muted); }
.who-link { color: var(--text-primary); text-decoration: underline; text-decoration-color: var(--border-strong); text-decoration-thickness: 1px; }
.who-link:hover { text-decoration-color: var(--copper); }
</style>
