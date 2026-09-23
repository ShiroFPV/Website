<template>
  <div class="space-y-6">

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">RX and TX Are Crossed — On Purpose
      </h2>
      <p class="text-gray-300 leading-relaxed mb-4">
        This trips everyone up at least once. The FC's <strong class="text-white">RX pin needs to connect to the device's TX pin</strong>, and the FC's <strong class="text-white">TX pin goes to the device's RX pin</strong>. You're crossing them, not matching them.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed">
        Think of it like a conversation — one end talks (TX), the other listens (RX). If both ends are trying to talk on the same wire, nobody hears anything.
      </p>
      <div class="mt-4 rounded-[3px] p-4" style="background: rgba(109,94,242,0.1); border: 1px solid rgba(109,94,242,0.25);">
        <div class="font-mono text-sm text-center space-y-1">
          <div><span style="color: var(--accent);">FC RX</span> <span class="text-gray-400">→</span> <span style="color: var(--accent);">Device TX</span></div>
          <div><span style="color: var(--accent);">FC TX</span> <span class="text-gray-400">→</span> <span style="color: var(--accent);">Device RX</span></div>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Quick Checks
      </h2>
      <ul class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Double-check the silkscreen on both the FC and the device — labels can be tiny and easy to misread.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Make sure the correct UART is enabled in Betaflight's Ports tab for whatever protocol you're using (Serial RX, SmartAudio, MSP, etc.).</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Always <strong class="text-white">save and reboot</strong> after changing anything in the Ports tab — changes don't take effect until you do.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Try a different cable if possible. Broken wires in JST connectors are more common than you'd think.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Verify the device is actually getting power — check 5V/3.3V pads depending on what it needs.</span>
        </li>
      </ul>
    </div>

    <div class="glass-card rounded-[4px] p-6" style="border-color: rgba(109,94,242,0.2);">
      <h2 class="dbg-h">Still nothing?
      </h2>
      <p class="text-gray-400 text-sm leading-relaxed">
        If you've crossed the wires correctly, the port is enabled, and you've rebooted — consider that the device itself might be fried or that you're on the wrong UART entirely. Try a different UART port on the FC and see if that changes anything.
      </p>
    </div>

  </div>

  <div class="mt-10 flex justify-between text-sm">
    <a href="#top" class="text-gray-400 hover:text-white transition-colors">
      ← All issues
    </a>
    <a href="#receiver-not-detected" class="hover:opacity-80 transition-opacity" style="color: var(--accent);">
      Receiver not detected →
    </a>
  </div>
</template>

<style scoped>
.dbg-h {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: 1.12rem; color: var(--text-primary); margin-bottom: 12px;
}
</style>
