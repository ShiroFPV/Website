<script setup>
const year = new Date().getFullYear()

const socials = [
  { name: 'GitHub', url: 'https://github.com/ShiroFPV', icon: 'github' },
  { name: 'Discord', url: 'https://discord.gg/PaRHFSmX', icon: 'discord' },
]
</script>

<template>
  <footer class="relative mt-16">
    <!-- Gradient top border -->
    <div class="h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50"></div>
    <div class="h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-30 -mt-px"></div>

    <div style="background-color: rgba(15,10,26,0.9);" class="py-6 sm:py-8">
      <div class="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">
          <!-- Brand -->
          <div class="flex items-center space-x-2">
            <span class="font-bold gradient-text text-base sm:text-lg">ShiroFPV</span>
          </div>

          <!-- Social links -->
          <div class="flex items-center space-x-4 sm:space-x-6">
            <a
              v-for="social in socials"
              :key="social.name"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-purple-400 transition-colors duration-200 text-xs sm:text-sm min-h-[44px] flex items-center"
            >
              {{ social.name }}
            </a>
          </div>

          <!-- Copyright -->
          <p class="text-gray-500 text-xs sm:text-sm">
            © {{ year }} ShiroFPV. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
