<template>
  <section class="page">
    <h2 class="page-title">{{ content.Education.title }}</h2>

    <article v-for="education in content.Education.content" :key="education.heading" class="education-item card">
      <p class="muted time">{{ education.heading }}</p>
      <h3>{{ education.subheading }}</h3>
      <p class="description">{{ education.description }}</p>
      <a :href="education.examensbevis" target="_blank" rel="noopener noreferrer" class="certificate-link">
        <i class="fa fa-file-image-o" aria-hidden="true"></i>
        {{ uiText.education.certificate }}
      </a>
    </article>
  </section>
</template>

<script setup lang="ts">
import content from '../utils/content'
import { uiText } from '../utils/i18n'
</script>

<style scoped lang="scss">
.education-item {
  margin-bottom: 18px;
  border-left: 3px solid rgba(103, 232, 249, 0.7);
}

.time {
  margin-bottom: 10px;
  font-size: 13px;
}

.description {
  margin-bottom: 16px;
}

.certificate-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  text-decoration: none;
  font-weight: 600;
}
</style>
