<template>
  <HeaderMenu />
  <main class="container">
    <RouterView />
  </main>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderMenu from './components/HeaderMenu.vue'
</script>

<style lang="scss">
.container {
  padding: 28px 20px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .container {
    padding: 20px 14px 28px;
  }
}
</style>