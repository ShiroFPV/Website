<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="nf">
    <div class="nf-inner">
      <div class="nf-meta">
        <span class="idx">!!</span>
        <span class="rule nf-rule"></span>
        <span class="label">signal lost</span>
      </div>

      <p class="display nf-code grad-text">404</p>

      <p class="nf-lead">This page flew out of range.</p>
      <p class="nf-sub">Failsafe engaged — let&rsquo;s get you back to solid ground.</p>

      <div class="nf-cta">
        <RouterLink to="/" class="btn-primary">Back home</RouterLink>
        <RouterLink to="/debugging" class="btn-outline">Debug your FC</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.nf { display: flex; align-items: center; min-height: 72vh; padding: 64px 20px; }
@media (min-width: 640px) { .nf { padding-inline: 32px; } }
.nf-inner { width: 100%; max-width: 640px; margin-inline: auto; }
.nf-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.nf-rule { flex: 0 0 44px; }
.nf-code { font-size: clamp(4.5rem, 16vw, 9rem); line-height: 0.86; margin-bottom: 20px; }
.nf-lead { font-size: 1.1rem; color: var(--text-primary); margin-bottom: 6px; }
.nf-sub { font-size: 0.92rem; color: var(--text-muted); margin-bottom: 30px; }
.nf-cta { display: flex; flex-wrap: wrap; gap: 12px; }
</style>
