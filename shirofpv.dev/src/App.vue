<script setup>
import DomainNoticeBar from './components/DomainNoticeBar.vue'
import NavBar from './components/NavBar.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col" style="background-color: var(--bg-base);">
    <DomainNoticeBar />
    <NavBar />
    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
  </div>
</template>
