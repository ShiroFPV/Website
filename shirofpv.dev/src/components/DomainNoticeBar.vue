<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

const NEW_DOMAIN = 'shirofpv.com'
const NEW_URL = 'https://shirofpv.com'
// Old domain stays reachable until this date, then it only redirects.
const CUTOFF = new Date('2027-03-11T00:00:00Z')
const STORAGE_KEY = 'shirofpv:domain-notice-dismissed'

const bar = ref(null)
const dismissed = ref(false)
const now = ref(CUTOFF)

const daysLeft = computed(() =>
  Math.max(0, Math.ceil((CUTOFF.getTime() - now.value.getTime()) / 86400000)),
)

// The navbar is fixed, so nothing in the flow reserves space for this bar.
// Publish its measured height and let main.css offset the nav and the page.
function publishHeight() {
  const h = dismissed.value ? 0 : (bar.value?.offsetHeight ?? 0)
  document.documentElement.style.setProperty('--domain-notice-h', `${h}px`)
  document.documentElement.classList.toggle('has-domain-notice', !dismissed.value)
}

let observer

onMounted(() => {
  now.value = new Date()
  try {
    dismissed.value = localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    // localStorage unavailable (private mode) — just show the bar
  }
  observer = new ResizeObserver(publishHeight)
  if (bar.value) observer.observe(bar.value)
  publishHeight()
})

onBeforeUnmount(() => {
  observer?.disconnect()
  document.documentElement.style.removeProperty('--domain-notice-h')
  document.documentElement.classList.remove('has-domain-notice')
})

watch(dismissed, publishHeight)

function dismiss() {
  dismissed.value = true
  try {
    localStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // non-fatal: the bar reappears next visit
  }
}
</script>

<template>
  <div
    v-if="!dismissed"
    ref="bar"
    role="region"
    aria-label="Domain change notice"
    class="domain-notice fixed top-0 left-0 right-0 z-[60]"
  >
    <div class="page-shell px-3 sm:px-4 md:px-6 lg:px-8">
      <div class="flex items-center gap-2 sm:gap-3 py-2 text-xs sm:text-sm">
        <span class="notice-dot shrink-0" aria-hidden="true"></span>

        <p class="flex-1 leading-snug" style="color: var(--text-secondary);">
          <span class="hidden sm:inline">
            ShiroFPV is moving to
            <a :href="NEW_URL" class="notice-link">{{ NEW_DOMAIN }}</a
            >. This address keeps working until
            <strong style="color: var(--text-primary);">11 March 2027</strong>
            <span v-if="daysLeft > 0" style="color: var(--text-muted);">
              ({{ daysLeft }} days left)</span
            >.
          </span>
          <span class="sm:hidden">
            Moving to
            <a :href="NEW_URL" class="notice-link">{{ NEW_DOMAIN }}</a>
            — this domain ends 11 Mar 2027.
          </span>
        </p>

        <a :href="NEW_URL" class="notice-cta hidden md:inline-flex shrink-0">
          Go to {{ NEW_DOMAIN }}
          <span aria-hidden="true">&rarr;</span>
        </a>

        <button
          type="button"
          class="notice-close shrink-0"
          aria-label="Dismiss domain change notice"
          @click="dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
            <path
              d="M1 1l12 12M13 1L1 13"
              stroke="currentColor"
              stroke-width="1.6"
              stroke-linecap="round"
              fill="none"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.domain-notice {
  background: linear-gradient(
    90deg,
    var(--accent-soft) 0%,
    var(--bg-elevated) 55%,
    var(--bg-elevated) 100%
  );
  border-bottom: 1px solid var(--accent-border);
}

.notice-dot {
  width: 7px;
  height: 7px;
  border-radius: 999px;
  background: var(--accent-light);
  box-shadow: 0 0 0 3px var(--accent-soft);
}

.notice-link {
  color: var(--accent-light);
  font-weight: 600;
  text-underline-offset: 2px;
}

.notice-link:hover {
  text-decoration: underline;
}

.notice-cta {
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.7rem;
  border-radius: 0.4rem;
  font-weight: 600;
  color: var(--text-primary);
  border: 1px solid var(--accent-border);
  background: var(--accent-soft);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.notice-cta:hover {
  background: var(--accent);
  border-color: var(--accent);
}

.notice-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 0.375rem;
  color: var(--text-muted);
  transition: color 0.2s ease, background 0.2s ease;
}

.notice-close:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.06);
}

@media (prefers-reduced-motion: reduce) {
  .notice-cta,
  .notice-close {
    transition: none;
  }
}
</style>
