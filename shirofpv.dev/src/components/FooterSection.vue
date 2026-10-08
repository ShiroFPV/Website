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
    <div class="page-shell ft-inner">
      <p><strong>ShiroFPV</strong> FPV hardware, open source. © {{ year }}</p>
      <nav class="ft-links">
        <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank" rel="noopener noreferrer">{{ s.name }}</a>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.ft { margin-top: auto; border-top: 1px solid var(--border-subtle); }
.ft-inner {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 16px;
  padding: 32px 20px 40px;
  font-size: 0.85rem; color: var(--text-muted);
}
@media (min-width: 640px) { .ft-inner { padding-inline: 32px; } }
.ft-inner strong { color: var(--text-primary); font-weight: 500; margin-right: 6px; }
.ft-links { display: flex; gap: 22px; }
.ft-links a { transition: color 0.2s; }
.ft-links a:hover { color: var(--text-primary); }
</style>
