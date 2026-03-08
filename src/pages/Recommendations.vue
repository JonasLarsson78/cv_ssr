<template>
  <section class="page">
    <h2 class="page-title">{{ content.Recommendations.title }}</h2>

    <ul class="recommendations-list">
      <li v-for="recommendation in content.Recommendations.content" :key="recommendation.mail">
        <article class="card recommendation-card">
          <h3>{{ recommendation.name }}</h3>
          <p class="muted company">{{ recommendation.company }}</p>
          <div class="links">
            <a :href="`mailto:${recommendation.mail}`">
              <i class="fa fa-envelope-o" aria-hidden="true"></i>
              {{ recommendation.mail }}
            </a>
            <a :href="`tel:${recommendation.phone}`">
              <i class="fa fa-phone" aria-hidden="true"></i>
              {{ recommendation.phone }}
            </a>
          </div>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import content from '../utils/content'
</script>

<style scoped lang="scss">
.recommendations-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.recommendation-card {
  border-left: 3px solid rgba(147, 197, 253, 0.75);
}

.company {
  margin-bottom: 14px;
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;

  a {
    display: inline-flex;
    gap: 8px;
    align-items: center;
    text-decoration: none;
  }
}
</style>
