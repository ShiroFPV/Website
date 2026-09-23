<script setup>
import { ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()
const open = ref(false)

const links = [
  { n: '01', short: 'Home',   full: 'Home',              path: '/' },
  { n: '02', short: 'About',  full: 'About',             path: '/about' },
  { n: '03', short: 'Work',   full: 'Projects',          path: '/projects' },
  { n: '04', short: 'Board',  full: 'Flight Controller', path: '/flight-controller' },
  { n: '05', short: 'Debug',  full: 'Debugging',         path: '/debugging' },
  { n: '06', short: 'Config', full: 'Config',            path: '/config-gen' },
  { n: '07', short: 'Say hi', full: 'Contact',           path: '/contact' },
]

const isActive = (p) => route.path === p || (p !== '/' && route.path.startsWith(p))
watch(() => route.path, () => { open.value = false })
</script>

<template>
  <!-- desktop: fixed vertical rail -->
  <nav class="rail" aria-label="Main">
    <RouterLink to="/" class="rail-mark" aria-label="ShiroFPV home">
      <span class="rail-mark-a">SHIRO</span>
      <span class="rail-mark-b">FPV</span>
    </RouterLink>

    <ul class="rail-list">
      <li v-for="l in links" :key="l.path">
        <RouterLink :to="l.path" class="rail-item" :class="{ 'is-active': isActive(l.path) }">
          <span class="rail-n">{{ l.n }}</span>
          <span class="rail-label">{{ l.short }}</span>
        </RouterLink>
      </li>
    </ul>

    <div class="rail-foot">
      <a href="https://support.shirofpv.com" class="rail-ext" title="Support explorer">SUP</a>
      <span class="rail-dot" aria-hidden="true"></span>
    </div>
  </nav>

  <!-- mobile: slim top strip -->
  <div class="mbar">
    <RouterLink to="/" class="mbar-mark">Shiro<span class="grad-text">FPV</span></RouterLink>
    <button class="mbar-btn" :aria-expanded="open" aria-label="Menu" @click="open = !open">
      <span :class="{ x1: open }"></span><span :class="{ x2: open }"></span>
    </button>
  </div>

  <Transition name="sheet">
    <div v-if="open" class="sheet">
      <RouterLink v-for="l in links" :key="l.path" :to="l.path"
                  class="sheet-item" :class="{ 'is-active': isActive(l.path) }">
        <span class="idx">{{ l.n }}</span>
        <span>{{ l.full }}</span>
      </RouterLink>
      <a href="https://support.shirofpv.com" class="sheet-item">
        <span class="idx">↗</span><span>Support</span>
      </a>
    </div>
  </Transition>
</template>

<style scoped>
/* ── desktop rail ─────────────────────────────── */
.rail { display: none; }

@media (min-width: 1024px) {
  .rail {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: var(--rail-w);
    z-index: 50;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 22px 0 18px;
    background: linear-gradient(180deg, var(--bg-elevated), var(--bg-deep));
    border-right: 1px solid var(--border-subtle);
  }
  /* lit edge, violet fading to pink down the rail */
  .rail::after {
    content: "";
    position: absolute; top: 0; right: -1px; bottom: 0; width: 1px;
    background: linear-gradient(180deg, transparent, var(--violet) 28%, var(--pink) 72%, transparent);
    opacity: 0.55;
  }
}

.rail-mark { display: flex; flex-direction: column; align-items: center; line-height: 1; margin-bottom: 30px; }
.rail-mark-a { font-family: var(--font-display); font-weight: 800; font-size: 0.86rem; letter-spacing: 0.02em; color: var(--text-primary); }
.rail-mark-b {
  font-family: var(--font-display); font-weight: 800; font-size: 0.86rem; letter-spacing: 0.02em;
  background: linear-gradient(100deg, var(--violet-light), var(--pink));
  -webkit-background-clip: text; background-clip: text; color: transparent;
}

.rail-list { display: flex; flex-direction: column; gap: 2px; width: 100%; }

.rail-item {
  position: relative;
  display: flex; flex-direction: column; align-items: center; gap: 3px;
  padding: 11px 4px;
  transition: background 0.2s ease;
}
.rail-item:hover { background: rgba(255, 255, 255, 0.035); }

.rail-n {
  font-family: var(--font-mono); font-size: 0.58rem; font-weight: 700;
  letter-spacing: 0.08em; color: var(--text-muted); transition: color 0.2s;
}
.rail-label {
  font-family: var(--font-mono); font-size: 0.6rem; font-weight: 500;
  letter-spacing: 0.06em; text-transform: uppercase;
  color: var(--text-secondary); transition: color 0.2s;
}
.rail-item:hover .rail-n { color: var(--pink); }
.rail-item:hover .rail-label { color: var(--text-primary); }

.rail-item.is-active::before {
  content: ""; position: absolute; left: 0; top: 8px; bottom: 8px; width: 2px;
  background: linear-gradient(180deg, var(--violet-light), var(--pink));
}
.rail-item.is-active .rail-label { color: var(--text-primary); }
.rail-item.is-active .rail-n { color: var(--violet-light); }

.rail-foot { margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.rail-ext {
  font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.1em;
  color: var(--text-muted); transition: color 0.2s;
}
.rail-ext:hover { color: var(--pink); }
.rail-dot {
  width: 5px; height: 5px; border-radius: 999px; background: var(--pink);
  box-shadow: 0 0 0 3px var(--pink-soft);
}

/* ── mobile bar ───────────────────────────────── */
.mbar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  display: flex; align-items: center; justify-content: space-between;
  height: 56px; padding: 0 16px;
  background: color-mix(in srgb, var(--bg-elevated) 88%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-subtle);
}
@media (min-width: 1024px) { .mbar { display: none; } }

.mbar-mark { font-family: var(--font-display); font-weight: 800; font-size: 1.02rem; color: var(--text-primary); }

.mbar-btn {
  width: 40px; height: 40px; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 5px;
}
.mbar-btn span {
  display: block; width: 19px; height: 1.5px; background: var(--text-secondary);
  transition: transform 0.25s ease, opacity 0.2s ease;
}
.mbar-btn .x1 { transform: translateY(3.25px) rotate(45deg); background: var(--pink); }
.mbar-btn .x2 { transform: translateY(-3.25px) rotate(-45deg); background: var(--pink); }

.sheet {
  position: fixed; top: 56px; left: 0; right: 0; z-index: 49;
  background: var(--bg-elevated);
  border-bottom: 1px solid var(--border-subtle);
  padding: 8px 12px 14px;
}
@media (min-width: 1024px) { .sheet { display: none; } }

.sheet-item {
  display: flex; align-items: center; gap: 12px;
  padding: 12px 10px; min-height: 46px;
  font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.04em;
  color: var(--text-secondary);
  border-bottom: 1px solid var(--border-subtle);
}
.sheet-item:last-child { border-bottom: 0; }
.sheet-item.is-active { color: var(--text-primary); background: var(--violet-soft); }

.sheet-enter-active, .sheet-leave-active { transition: opacity 0.2s ease, transform 0.2s ease; }
.sheet-enter-from, .sheet-leave-to { opacity: 0; transform: translateY(-8px); }
</style>
