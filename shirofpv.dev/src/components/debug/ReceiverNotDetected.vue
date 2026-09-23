<template>
  <div class="space-y-6">

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">MSP and Serial RX on the Same UART
      </h2>
      <p class="text-gray-300 leading-relaxed mb-4">
        If you have both <strong class="text-white">Configuration / MSP</strong> and <strong class="text-white">Serial RX</strong> enabled on the same UART, they'll conflict and your receiver signal gets killed. MSP needs to be <strong class="text-white">disabled</strong> on the UART you're using for your receiver.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed">
        Betaflight won't warn you about this — it'll just silently not work, which is great for your sanity (it's not).
      </p>
      <div class="mt-4 rounded-[3px] p-4 space-y-3" style="background: rgba(109,94,242,0.08); border: 1px solid rgba(109,94,242,0.2);">
        <div class="flex items-center gap-3 text-sm">
          <span class="text-red-400 font-bold">✗</span>
          <span class="text-gray-300">UART1: <span class="text-red-400">MSP ON</span> + Serial RX ON → receiver won't work</span>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span style="color: var(--accent-light);" class="font-bold">✓</span>
          <span class="text-gray-300">UART1: <span style="color: var(--accent-light);">MSP OFF</span> + Serial RX ON → works fine</span>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">How to Fix It
      </h2>
      <ol class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">1</span>
          <span>Go to Betaflight Configurator → <strong class="text-white">Ports</strong> tab.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">2</span>
          <span>Find the UART where Serial RX is enabled.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">3</span>
          <span>Make sure <strong class="text-white">Configuration / MSP is turned off</strong> on that same UART. It can be on other UARTs — just not this one.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">4</span>
          <span>Save → Reboot.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">5</span>
          <span>Go to the Receiver tab and check if your sticks are moving.</span>
        </li>
      </ol>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Quick Checks
      </h2>
      <ul class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Make sure the receiver is actually <strong class="text-white">bound</strong> to your radio — solid LED usually means bound, flashing means it's searching.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Confirm the correct RC protocol is selected in the <strong class="text-white">Configuration</strong> tab (CRSF, SBUS, iBus, etc.).</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Check your RX/TX wiring too — see the <a href="#uart-no-signal" class="underline hover:opacity-80" style="color: var(--accent);">UART wiring page</a> if needed.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>If using ELRS, make sure the receiver firmware matches your TX module version. Version mismatch = no bind.</span>
        </li>
      </ul>
    </div>

  </div>

  <div class="mt-10 flex justify-between text-sm">
    <a href="#uart-no-signal" class="text-gray-400 hover:text-white transition-colors">
      ← UART no signal
    </a>
    <a href="#no-osd-digital" class="hover:opacity-80 transition-opacity" style="color: var(--accent);">
      No OSD (Digital) →
    </a>
  </div>
</template>

<style scoped>
.dbg-h {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: 1.12rem; color: var(--text-primary); margin-bottom: 12px;
}
</style>
