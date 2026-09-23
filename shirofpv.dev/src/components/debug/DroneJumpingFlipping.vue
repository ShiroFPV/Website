<template>
  <div class="space-y-6">

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">What's Actually Happening
      </h2>
      <p class="text-gray-300 leading-relaxed mb-4">
        When the FC sends motor commands and the ESC doesn't properly receive or process them, you get erratic motor behavior. The two most common causes:
      </p>
      <div class="space-y-3">
        <div class="rounded-[3px] p-4" style="background: rgba(109,94,242,0.08); border: 1px solid rgba(109,94,242,0.2);">
          <div class="font-semibold text-white text-sm mb-1">Bidirectional DSHOT enabled, ESC doesn't support it</div>
          <p class="text-gray-400 text-sm">Bidirectional DSHOT lets the ESC send RPM data back to the FC (used for RPM filtering). If your ESC firmware doesn't support this feature but it's enabled in Betaflight, the communication breaks down and motors behave unpredictably.</p>
        </div>
        <div class="rounded-[3px] p-4" style="background: rgba(109,94,242,0.08); border: 1px solid rgba(109,94,242,0.2);">
          <div class="font-semibold text-white text-sm mb-1">DSHOT300 with high PID loop frequency</div>
          <p class="text-gray-400 text-sm">DSHOT300 runs at 300,000 bits/sec. At 8 kHz PID loop, the FC is sending motor updates so fast that DSHOT300 can't keep up — commands get dropped or corrupted. DSHOT600 (600,000 bits/sec) handles high loop rates without breaking a sweat.</p>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">The Fix
      </h2>
      <p class="text-gray-300 text-sm mb-4">In Betaflight Configurator → <strong class="text-white">Motors</strong> tab:</p>
      <ol class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">1</span>
          <span>Switch ESC protocol to <strong class="text-white">DSHOT600</strong>. This is the safer default for most setups.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">2</span>
          <span>If you don't know whether your ESC supports bidirectional DSHOT, <strong class="text-white">turn it off</strong>. You can always re-enable it later once you've confirmed compatibility with your ESC firmware.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">3</span>
          <span>Save → Reboot → test with props off first.</span>
        </li>
      </ol>
      <div class="mt-4 rounded-[3px] p-3 text-sm" style="background: rgba(109,94,242,0.08); border: 1px solid rgba(109,94,242,0.2);">
        <span class="font-semibold" style="color: var(--accent);">Note:</span>
        <span class="text-gray-400"> Bidirectional DSHOT requires specific ESC firmware (BLHeli_32, AM32, or BLHeli_S with JESC/BlueJay). If you're not sure, assume it's not supported.</span>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Quick Checks
      </h2>
      <ul class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span><strong class="text-white">Always test with props off</strong> after changing motor settings. Seriously.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Check motor order and spin direction in the Motors tab — a motor spinning the wrong way will absolutely cause flips.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>If you're running 8 kHz or higher PID loop frequency, DSHOT600 is basically required. DSHOT300 at 8 kHz = asking for trouble.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Make sure props are mounted the right way (A props vs B props on correct motors per your frame layout).</span>
        </li>
      </ul>
    </div>

  </div>

  <div class="mt-10 flex justify-between text-sm">
    <a href="#no-osd-analog" class="text-gray-400 hover:text-white transition-colors">
      ← No OSD (Analog)
    </a>
    <a href="#fc-high-cpu" class="hover:opacity-80 transition-opacity" style="color: var(--accent);">
      FC high CPU load →
    </a>
  </div>
</template>

<style scoped>
.dbg-h {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: 1.12rem; color: var(--text-primary); margin-bottom: 12px;
}
</style>
