<template>
  <section>
    <h2>Test av Pinia + SSR</h2>
    <p>Värde från getter: {{ store.getCount }}</p>
  </section>
</template>

<script setup lang="ts">
import { onServerPrefetch } from 'vue'
import { useStore } from '../pinia/store'

const store = useStore()
// Körs bara på servern innan SSR, ändrar state en gång.
onServerPrefetch(async () => {
  await store.setCount(100)
})
</script>