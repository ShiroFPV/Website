<script setup>
import SiteNav from './components/SiteNav.vue'
import FooterSection from './components/FooterSection.vue'
import DomainNoticeBar from './components/DomainNoticeBar.vue'
</script>

<template>
  <DomainNoticeBar />
  <SiteNav />
  <div class="shell">
    <main class="flex-1 relative z-10">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-base);
  padding-top: var(--nav-h);
}
</style>
