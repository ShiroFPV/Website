<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const open = ref(false)

const links = [
  { label: 'About',             path: '/about' },
  { label: 'Projects',          path: '/projects' },
  { label: 'Flight controller', path: '/flight-controller' },
  { label: 'Debugging',         path: '/debugging' },
  { label: 'Config',            path: '/config-gen' },
]

const isActive = (p) => route.path === p || route.path.startsWith(p + '/')
watch(() => route.path, () => { open.value = false })
</script>

<template>
  <header class="nav">
    <div class="page-shell nav-inner">
      <RouterLink to="/" class="mark" aria-label="ShiroFPV home">Shiro<em>FPV</em></RouterLink>

      <nav class="links" aria-label="Main">
        <RouterLink v-for="l in links" :key="l.path" :to="l.path"
                    class="link" :class="{ 'is-active': isActive(l.path) }">{{ l.label }}</RouterLink>
        <RouterLink to="/contact" class="say-hi">Say hi</RouterLink>
      </nav>

      <button class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open">
        <span :class="{ x1: open }"></span><span :class="{ x2: open }"></span>
      </button>
    </div>
  </header>

  <Transition name="sheet">
    <nav v-if="open" class="sheet" aria-label="Mobile">
      <RouterLink to="/" class="sheet-item" :class="{ 'is-active': route.path === '/' }">Home</RouterLink>
      <RouterLink v-for="l in links" :key="l.path" :to="l.path"
                  class="sheet-item" :class="{ 'is-active': isActive(l.path) }">{{ l.label }}</RouterLink>
      <RouterLink to="/contact" class="sheet-item" :class="{ 'is-active': isActive('/contact') }">Contact</RouterLink>
      <a href="https://support.shirofpv.com" class="sheet-item">Support ↗</a>
    </nav>
  </Transition>
</template>

<style scoped>
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  height: var(--nav-h);
  background: color-mix(in srgb, var(--bg-base) 86%, transparent);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-subtle);
}
.nav-inner {
  height: 100%;
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 20px;
}
@media (min-width: 640px) { .nav-inner { padding: 0 32px; } }

.mark {
  font-family: var(--font-display);
  font-size: 1.3rem;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}
.mark em { font-style: italic; color: var(--copper-light); }

.links { display: none; }
@media (min-width: 960px) {
  .links { display: flex; align-items: center; gap: 28px; }
}

.link {
  position: relative;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: color 0.2s ease;
}
.link:hover, .link.is-active { color: var(--text-primary); }
.link.is-active::after {
  content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 1px;
  background: var(--copper);
}

.say-hi {
  font-size: 0.88rem; font-weight: 500;
  padding: 7px 16px;
  border: 1px solid var(--border-strong);
  border-radius: 999px;
  color: var(--text-primary);
  transition: border-color 0.2s, background 0.2s;
}
.say-hi:hover { border-color: var(--text-secondary); background: rgba(237, 232, 223, 0.04); }

.burger {
  width: 40px; height: 40px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 6px;
}
@media (min-width: 960px) { .burger { display: none; } }
.burger span {
  display: block; width: 20px; height: 1.5px; background: var(--text-primary);
  transition: transform 0.25s ease;
}
.burger .x1 { transform: translateY(3.75px) rotate(45deg); }
.burger .x2 { transform: translateY(-3.75px) rotate(-45deg); }

.sheet {
  position: fixed; top: var(--nav-h); left: 0; right: 0; z-index: 49;
  background: var(--bg-base);
  border-bottom: 1px solid var(--border-subtle);
  padding: 8px 20px 20px;
}
@media (min-width: 960px) { .sheet { display: none; } }

.sheet-item {
  display: block;
  padding: 14px 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
}
.sheet-item:last-child { border-bottom: 0; }
.sheet-item.is-active { color: var(--text-primary); font-style: italic; }

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; transform: translateY(-6px); }
</style>
