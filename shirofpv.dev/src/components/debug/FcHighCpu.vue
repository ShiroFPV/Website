<template>
  <div class="space-y-6">

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Why CPU Load Gets This High
      </h2>
      <p class="text-gray-300 leading-relaxed mb-3">
        The PID loop frequency determines how often Betaflight runs its control loop — 8 kHz means 8,000 iterations per second. That's a lot of math per second and the FC processor has to keep up. Stack on RPM filtering, a bunch of enabled features, and a slower processor, and you're running into a ceiling.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed">
        On some FCs (especially older ones or budget options), running 8 kHz PID + DSHOT600 + bidirectional DSHOT + all the filters active at once is just asking too much.
      </p>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">How to Fix It
      </h2>
      <p class="text-gray-400 text-sm mb-4">You've got two main options — pick whichever fits your setup:</p>

      <div class="space-y-4">
        <div class="rounded-[3px] p-4" style="background: rgba(109,94,242,0.08); border: 1px solid rgba(109,94,242,0.2);">
          <div class="font-semibold text-white text-sm mb-2">Option 1 — Lower the PID loop frequency</div>
          <p class="text-gray-400 text-sm leading-relaxed">Go to Configuration tab → PID Loop Frequency and drop it from 8 kHz to 4 kHz (or even 2 kHz on older hardware). Less iterations per second = less CPU usage. For most builds you won't notice a real difference in flight feel going from 8k to 4k.</p>
        </div>

        <div class="rounded-[3px] p-4" style="background: rgba(109,94,242,0.08); border: 1px solid rgba(109,94,242,0.2);">
          <div class="font-semibold text-white text-sm mb-2">Option 2 — Switch to DSHOT300 + enable bidirectional DSHOT</div>
          <p class="text-gray-400 text-sm leading-relaxed">
            If your ESC supports bidirectional DSHOT (BLHeli_32, AM32, BlueJay), you can actually save CPU resources by switching to DSHOT300 <em>with</em> bidirectional DSHOT enabled. You're halving the bits-per-second on the DSHOT line, which frees up FC processing overhead. Counterintuitive but it works — the bidirectional protocol is more efficient per transmission than one-way DSHOT600.
          </p>
          <p class="text-gray-400 text-sm mt-2">Motors tab → ESC Protocol: DSHOT300 → enable Bidirectional DSHOT.</p>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Quick Checks
      </h2>
      <ul class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Check the CPU load in the <strong class="text-white">Setup</strong> tab of Betaflight Configurator — anything above 25–30% warrants attention.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Disable features you're not using — Barometer, Compass, unnecessary filters all add up.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>If running RPM filtering, it's CPU-intensive but often worth it — just make sure bidirectional DSHOT is actually working correctly first.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>High CPU in flight can cause motor stutters, inconsistent PID response, and weird oscillations that look like a tune issue but aren't.</span>
        </li>
      </ul>
    </div>

  </div>

  <div class="mt-10 flex justify-between text-sm">
    <a href="#drone-jumping-flipping" class="text-gray-400 hover:text-white transition-colors">
      ← Drone jumping/flipping
    </a>
    <a href="#sticks-inverted" class="hover:opacity-80 transition-opacity" style="color: var(--accent);">
      Sticks inverted →
    </a>
  </div>
</template>

<style scoped>
.dbg-h {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: 1.12rem; color: var(--text-primary); margin-bottom: 12px;
}
</style>
