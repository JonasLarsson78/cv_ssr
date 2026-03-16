<template>
  <footer class="footer">
    <p>{{ copyrightText }}</p>
    <p>{{ content.Footer.text }}</p>
    <p>
      {{ content.Footer.cv.text }}
      <a :href="content.Footer.cv.url" target="_blank" rel="noopener noreferrer">
        {{ content.Footer.cv.text2 }}
      </a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import content from '../utils/content'

const copyrightText = computed(() =>
  content.value.Footer.copyright.replace('{{year}}', content.value.Footer.year?.toString() ?? '2026'),
)
</script>

<style scoped lang="scss">
.footer {
  width: 100%;
  text-align: center;
  color: #94a3b8;
  font-size: 13px;
  padding: 20px 14px 28px;
  border-top: 1px solid rgba(148, 163, 184, 0.2);

  p {
    margin: 0 0 6px;
  }

  a {
    color: #67e8f9;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>