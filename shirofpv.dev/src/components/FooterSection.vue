<script setup>
const year = new Date().getFullYear()

const socials = [
  { name: 'GitHub', url: 'https://github.com/ShiroFPV' },
  { name: 'Discord', url: 'https://discord.gg/PaRHFSmX' },
  { name: 'Support', url: 'https://support.shirofpv.com' },
]
</script>

<template>
  <footer class="ft">
    <div class="ft-edge" aria-hidden="true"></div>
    <div class="page-shell ft-inner">
      <div class="ft-mark">
        <span class="ft-word">Shiro<span class="grad-text">FPV</span></span>
        <span class="label ft-tag">open-source FPV hardware</span>
      </div>

      <nav class="ft-links">
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener noreferrer">
          {{ s.name }} <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <p class="ft-note">© {{ year }} — built with Vue + stubbornness</p>
    </div>
  </footer>
</template>

<style scoped>
.ft { position: relative; margin-top: auto; background: var(--bg-deep); }

.ft-edge {
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--violet) 30%, var(--pink) 68%, transparent);
  opacity: 0.6;
}

.ft-inner {
  display: flex; flex-direction: column; gap: 18px;
  padding: 30px 20px;
}
@media (min-width: 640px) { .ft-inner { padding-inline: 32px; } }
@media (min-width: 860px) {
  .ft-inner { flex-direction: row; align-items: center; justify-content: space-between; gap: 24px; }
}

.ft-mark { display: flex; flex-direction: column; gap: 3px; }
.ft-word { font-family: var(--font-display); font-weight: 800; font-size: 1.05rem; color: var(--text-primary); }
.ft-tag { text-transform: uppercase; }

.ft-links { display: flex; flex-wrap: wrap; gap: 18px; }
.ft-links a {
  font-family: var(--font-mono); font-size: 0.7rem; letter-spacing: 0.09em;
  text-transform: uppercase; color: var(--text-secondary);
  transition: color 0.2s ease;
}
.ft-links a:hover { color: var(--pink); }

.ft-note { font-family: var(--font-mono); font-size: 0.65rem; letter-spacing: 0.06em; color: var(--text-muted); }
</style>
