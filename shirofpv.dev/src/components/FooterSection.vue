<script setup>
import { RouterLink } from 'vue-router'

const year = new Date().getFullYear()

const socials = [
  { name: 'GitHub', url: 'https://github.com/ShiroFPV' },
  { name: 'Discord', url: 'https://discord.gg/PaRHFSmX' },
  { name: 'Support', url: 'https://support.shirofpv.com' },
]
</script>

<template>
  <footer class="ft">
    <div class="page-shell ft-inner">
      <div class="ft-top">
        <p class="ft-line">
          Building something that flies?
          <RouterLink to="/contact" class="ft-cta">Let&rsquo;s talk.</RouterLink>
        </p>
        <nav class="ft-links">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener noreferrer">{{ s.name }}</a>
        </nav>
      </div>
      <div class="ft-bottom">
        <span>© {{ year }} ShiroFPV</span>
        <span>Schematics are open. Use them, fly them.</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft { margin-top: auto; border-top: 1px solid var(--border-subtle); }

.ft-inner { padding: 56px 20px 28px; }
@media (min-width: 640px) { .ft-inner { padding-inline: 32px; } }

.ft-top {
  display: flex; flex-direction: column; gap: 28px;
  padding-bottom: 40px;
}
@media (min-width: 860px) {
  .ft-top { flex-direction: row; align-items: flex-end; justify-content: space-between; }
}

.ft-line {
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 3.4vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  max-width: 20ch;
}
.ft-cta { font-style: italic; color: var(--copper-light); text-decoration: underline; text-decoration-thickness: 1px; }
.ft-cta:hover { color: var(--text-primary); }

.ft-links { display: flex; gap: 24px; }
.ft-links a { font-size: 0.92rem; color: var(--text-secondary); transition: color 0.2s; }
.ft-links a:hover { color: var(--text-primary); }

.ft-bottom {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 8px;
  padding-top: 22px;
  border-top: 1px solid var(--border-subtle);
  font-size: 0.8rem; color: var(--text-muted);
}
</style>
