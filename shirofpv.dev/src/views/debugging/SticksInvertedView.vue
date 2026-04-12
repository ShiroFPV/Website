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
          Receiver / Channel Map
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          Sticks Inverted / <span class="gradient-text">Channel Mapping Messed Up</span>
        </h1>
        <p class="text-gray-400 leading-relaxed">
          You push the throttle and something else moves. Roll is acting like pitch. Everything's reversed or scrambled. This is a channel mapping issue — Betaflight and your radio are just speaking slightly different languages and it's an easy fix.
        </p>
      </div>

      <div class="space-y-6">

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🎮</span> What's Channel Mapping?
          </h2>
          <p class="text-gray-300 leading-relaxed mb-3">
            Different radio manufacturers send channels in different orders. Betaflight needs to know which channel number corresponds to which stick axis. The mapping is usually described as a 4-letter string like <strong class="text-white">TAER</strong> or <strong class="text-white">AERT</strong> — each letter represents Throttle, Aileron (Roll), Elevator (Pitch), Rudder (Yaw) in the order they come in.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed">
            FrSky/ELRS radios typically use <strong class="text-white">AETR</strong>. Spektrum tends to use <strong class="text-white">TAER</strong>. If the wrong map is set, your sticks will control the wrong axes.
          </p>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🔧</span> How to Fix It
          </h2>
          <div class="space-y-4 text-sm">
            <div>
              <div class="font-semibold text-white mb-2">Quick fix — swap the channel map preset</div>
              <ol class="space-y-2 text-gray-300">
                <li class="flex items-start gap-3">
                  <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">1</span>
                  <span>Go to Betaflight Configurator → <strong class="text-white">Receiver</strong> tab.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">2</span>
                  <span>Look for the <strong class="text-white">Channel Map</strong> dropdown — try switching between <strong class="text-white">TAER</strong> and <strong class="text-white">AETR</strong> (or whichever options are listed).</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">3</span>
                  <span>Move your sticks after each change — you should see them map correctly in the channel preview below.</span>
                </li>
                <li class="flex items-start gap-3">
                  <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">4</span>
                  <span>Save when sticks move correctly.</span>
                </li>
              </ol>
            </div>

            <div class="rounded-xl p-4" style="background: rgba(255,143,212,0.08); border: 1px solid rgba(255,143,212,0.2);">
              <div class="font-semibold text-white text-sm mb-2">If the presets don't work — manual mapping</div>
              <p class="text-gray-400 text-sm leading-relaxed">
                The channel map field in the Receiver tab is editable. You can type in a custom order (e.g. <span class="font-mono" style="color: #b48bff;">AERT1234</span>) to manually match whatever order your radio sends channels in. Just look at which channel bar moves when you move each stick, and arrange the letters accordingly.
              </p>
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
              <span>Use the channel bars in the Receiver tab to verify each axis moves when you expect it to — do this <strong class="text-white">before</strong> trying to fly.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>An individual axis being inverted (e.g. throttle goes down when you push up) is usually a separate thing — check your radio's channel reverse settings for that specific channel.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Common presets: FrSky/ELRS/Crossfire = <strong class="text-white">AETR</strong>. Spektrum/Futaba = <strong class="text-white">TAER</strong>.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>If everything seems mapped correctly in the Receiver tab but the drone still behaves wrong in the air — check motor order and spin direction too.</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-10 flex justify-between text-sm">
        <RouterLink to="/debugging/fc-high-cpu" class="text-gray-400 hover:text-white transition-colors">
          ← FC high CPU load
        </RouterLink>
        <RouterLink to="/debugging" class="text-gray-400 hover:text-white transition-colors">
          All issues →
        </RouterLink>
      </div>

    </div>
  </div>
</template>
