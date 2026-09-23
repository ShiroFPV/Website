<template>
  <div class="space-y-6">

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Video Has to Pass Through the OSD Chip
      </h2>
      <p class="text-gray-300 leading-relaxed mb-4">
        On analog setups, the video signal from your camera goes <strong class="text-white">into</strong> the FC's OSD chip, which overlays the telemetry data, and then the combined signal goes <strong class="text-white">out</strong> to your VTX. If you wire the camera directly to the VTX, bypassing the OSD chip, you get video but no overlay.
      </p>
      <p class="text-gray-400 text-sm leading-relaxed mb-4">
        Your FC has dedicated pads for this. The exact labels vary by board but they'll be something like:
      </p>
      <div class="rounded-[3px] p-4" style="background: rgba(109,94,242,0.1); border: 1px solid rgba(109,94,242,0.25);">
        <div class="font-mono text-sm space-y-2">
          <div class="flex items-center gap-3">
            <span style="color: var(--accent);">Camera</span>
            <span class="text-gray-400">→</span>
            <span style="color: var(--accent);">CAM</span>
            <span class="text-gray-500 text-xs ml-2">(video in to OSD chip)</span>
          </div>
          <div class="flex items-center gap-3">
            <span style="color: var(--accent);">VTX</span>
            <span class="text-gray-400">→</span>
            <span style="color: var(--accent-light);">VTX</span>
            <span class="text-gray-500 text-xs ml-2">(video out from OSD chip)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Common Pad Label Variations
      </h2>
      <p class="text-gray-400 text-sm mb-4">Different FC manufacturers label these pads differently. All of these mean the same thing:</p>
      <div class="grid grid-cols-2 gap-3 text-sm">
        <div class="rounded-lg p-3" style="background: rgba(255,255,255,0.05);">
          <div class="text-gray-400 text-xs mb-2">Video In (camera side)</div>
          <div class="space-y-1 font-mono" style="color: var(--accent);">
            <div>CAM</div>
            <div>AVIN</div>
            <div>CAM_IN</div>
            <div>VIN</div>
          </div>
        </div>
        <div class="rounded-lg p-3" style="background: rgba(255,255,255,0.05);">
          <div class="text-gray-400 text-xs mb-2">Video Out (VTX side)</div>
          <div class="space-y-1 font-mono" style="color: var(--accent-light);">
            <div>VTX</div>
            <div>AVOUT</div>
            <div>VTX_OUT</div>
            <div>VOUT</div>
          </div>
        </div>
      </div>
    </div>

    <div class="glass-card rounded-[4px] p-6">
      <h2 class="dbg-h">Quick Checks
      </h2>
      <ul class="space-y-3 text-gray-300 text-sm">
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Make sure <strong class="text-white">OSD is enabled</strong> in Betaflight's OSD tab — there's a master toggle at the top of that page.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>If you have video but no OSD overlay, the camera is probably wired to the VTX directly — re-route it through the FC's CAM/VTX pads.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>If you have OSD overlay but no video, the output side isn't connected — check your FC's VTX/AVOUT pad to your VTX's video input.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="mt-0.5" style="color: var(--accent);">•</span>
          <span>Check the FC's wiring diagram — most manufacturers publish a pinout PDF or image.</span>
        </li>
      </ul>
    </div>

  </div>

  <div class="mt-10 flex justify-between text-sm">
    <a href="#no-osd-digital" class="text-gray-400 hover:text-white transition-colors">
      ← No OSD (Digital)
    </a>
    <a href="#drone-jumping-flipping" class="hover:opacity-80 transition-opacity" style="color: var(--accent);">
      Drone jumping/flipping →
    </a>
  </div>
</template>

<style scoped>
.dbg-h {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: 1.12rem; color: var(--text-primary); margin-bottom: 12px;
}
</style>
