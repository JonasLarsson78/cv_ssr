<template>
  <div class="app-shell">
    <HeaderMenu />
    <main class="container">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderMenu from './components/HeaderMenu.vue'
import Footer from './components/Footer.vue'
</script>

<style lang="scss">
.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  flex: 1;
  padding: 28px 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

@media (max-width: 640px) {
  .container {
    padding: 20px 14px 28px;
  }
}
</style>