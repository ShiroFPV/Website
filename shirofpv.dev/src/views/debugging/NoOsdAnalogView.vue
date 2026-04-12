<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-8">
        <RouterLink to="/debugging" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <span>←</span> Back to Debugging
        </RouterLink>
      </div>

      <div class="mb-10">
        <div class="inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full mb-4 text-xs" style="color: #d7b7ff;">
          <span class="w-2 h-2 rounded-full" style="background: #ff8fd4;"></span>
          OSD / Analog Video
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          No OSD <span class="gradient-text">(Analog)</span>
        </h1>
        <p class="text-gray-400 leading-relaxed">
          Analog setup, video coming through, but no OSD overlay at all — or the OSD is there but the actual video feed isn't passing through to your VTX. This is a soldering/wiring issue rather than a Betaflight config issue.
        </p>
      </div>

      <div class="space-y-6">

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>📹</span> Video Has to Pass Through the OSD Chip
          </h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            On analog setups, the video signal from your camera goes <strong class="text-white">into</strong> the FC's OSD chip, which overlays the telemetry data, and then the combined signal goes <strong class="text-white">out</strong> to your VTX. If you wire the camera directly to the VTX, bypassing the OSD chip, you get video but no overlay.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed mb-4">
            Your FC has dedicated pads for this. The exact labels vary by board but they'll be something like:
          </p>
          <div class="rounded-xl p-4" style="background: rgba(180,139,255,0.1); border: 1px solid rgba(180,139,255,0.25);">
            <div class="font-mono text-sm space-y-2">
              <div class="flex items-center gap-3">
                <span style="color: #ff8fd4;">Camera</span>
                <span class="text-gray-400">→</span>
                <span style="color: #b48bff;">CAM</span>
                <span class="text-gray-500 text-xs ml-2">(video in to OSD chip)</span>
              </div>
              <div class="flex items-center gap-3">
                <span style="color: #b48bff;">VTX</span>
                <span class="text-gray-400">→</span>
                <span style="color: #7dd3ff;">VTX</span>
                <span class="text-gray-500 text-xs ml-2">(video out from OSD chip)</span>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🏷️</span> Common Pad Label Variations
          </h2>
          <p class="text-gray-400 text-sm mb-4">Different FC manufacturers label these pads differently. All of these mean the same thing:</p>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-lg p-3" style="background: rgba(255,255,255,0.05);">
              <div class="text-gray-400 text-xs mb-2">Video In (camera side)</div>
              <div class="space-y-1 font-mono" style="color: #ff8fd4;">
                <div>CAM</div>
                <div>AVIN</div>
                <div>CAM_IN</div>
                <div>VIN</div>
              </div>
            </div>
            <div class="rounded-lg p-3" style="background: rgba(255,255,255,0.05);">
              <div class="text-gray-400 text-xs mb-2">Video Out (VTX side)</div>
              <div class="space-y-1 font-mono" style="color: #7dd3ff;">
                <div>VTX</div>
                <div>AVOUT</div>
                <div>VTX_OUT</div>
                <div>VOUT</div>
              </div>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>✅</span> Quick Checks
          </h2>
          <ul class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Make sure <strong class="text-white">OSD is enabled</strong> in Betaflight's OSD tab — there's a master toggle at the top of that page.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>If you have video but no OSD overlay, the camera is probably wired to the VTX directly — re-route it through the FC's CAM/VTX pads.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>If you have OSD overlay but no video, the output side isn't connected — check your FC's VTX/AVOUT pad to your VTX's video input.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Check the FC's wiring diagram — most manufacturers publish a pinout PDF or image.</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-10 flex justify-between text-sm">
        <RouterLink to="/debugging/no-osd-digital" class="text-gray-400 hover:text-white transition-colors">
          ← No OSD (Digital)
        </RouterLink>
        <RouterLink to="/debugging/drone-jumping-flipping" class="hover:opacity-80 transition-opacity" style="color: #b48bff;">
          Drone jumping/flipping →
        </RouterLink>
      </div>

    </div>
  </div>
</template>
