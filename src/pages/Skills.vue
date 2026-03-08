<template>
  <section class="page">
    <h2 class="page-title">{{ content.Skills.title }}</h2>

    <div v-for="category in categories" :key="category.category" class="skills-category card">
      <h3>{{ category.category }}</h3>

      <ul class="skills-list">
        <li v-for="item in category.items" :key="`${category.category}-${item.text}`">
          <img :src="item.image" :alt="item.text" width="30" height="30" />
          <div>
            <p class="skill-title">{{ item.text }}</p>
            <p class="muted description">{{ item.description }}</p>
            <div class="grade" :aria-label="uiText.skills.level(item.grade)">
              <i v-for="star in 5" :key="`${item.text}-star-${star}`"
                :class="star <= item.grade ? 'fa fa-star' : 'fa fa-star-o'" aria-hidden="true"></i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import content from '../utils/content'
import { uiText } from '../utils/i18n'

const categories = computed(() =>
  content.value.Skills.content.map((category) => ({
    ...category,
    items: [...category.items].sort((a, b) => a.order - b.order),
  })),
)
</script>

<style scoped lang="scss">
.skills-category {
  margin-bottom: 16px;
}

.skills-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;

  li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.2);
    background: rgba(2, 6, 23, 0.45);

    img {
      margin-top: 3px;
    }
  }
}

.skill-title {
  font-weight: 600;
  margin: 0 0 4px;
}

.description {
  margin-bottom: 8px;
}

.grade {
  display: flex;
  gap: 4px;
  color: #facc15;
}
</style>
