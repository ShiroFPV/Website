<template>
  <div class="space-y-6">

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Enable VTX (MSP + DisplayPort) in Ports
      </h2>
      <p class="text-gray-300 leading-relaxed mb-4">
        For digital OSD to work, Betaflight needs to be able to send display data to your VTX unit over MSP. This means the UART connected to your VTX needs <strong class="text-white">MSP + DisplayPort</strong> enabled under the Peripherals column in the Ports tab.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed">
        The "Configuration / MSP" toggle on the left side of that same row also needs to be <strong class="text-white">active</strong>. Both need to be on.
      </p>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">How to Fix It
      </h2>
      <ol class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">1</span>
          <span>Open Betaflight Configurator → <strong class="text-white">Ports</strong> tab.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">2</span>
          <span>Find the UART your VTX is connected to.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">3</span>
          <span>Under <strong class="text-white">Peripherals</strong>, select <strong class="text-white">VTX (MSP + DisplayPort)</strong>.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">4</span>
          <span>Also make sure <strong class="text-white">Configuration / MSP</strong> is enabled on that same UART.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(109,94,242,0.2); color: var(--accent);">5</span>
          <span>Save → Reboot → check your goggles.</span>
        </li>
      </ol>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Quick Checks
      </h2>
      <ul class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Make sure <strong class="text-white">OSD is enabled</strong> in Betaflight's OSD tab (there's a master toggle at the top).</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Check that your VTX is actually connected to the UART you think it is — easy to get confused if you have multiple wiring options.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Verify RX/TX wires are correctly crossed (FC RX → VTX TX, FC TX → VTX RX).</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>For Walksnail/Avatar specifically, make sure your goggles and camera firmware versions are compatible.</span>
        </li>
      </ul>
    </div>

  </div>

  <div class="mt-10 flex justify-between text-sm">
    <a href="#receiver-not-detected" class="text-gray-400 hover:text-white transition-colors">
      ← Receiver not detected
    </a>
    <a href="#no-osd-analog" class="hover:opacity-80 transition-opacity" style="color: var(--accent);">
      No OSD (Analog) →
    </a>
  </div>
</template>

<style scoped>
.dbg-h {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: 1.12rem; color: var(--text-primary); margin-bottom: 12px;
}
</style>
