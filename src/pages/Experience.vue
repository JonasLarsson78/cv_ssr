<template>
  <section class="page">
    <h2 class="page-title">{{ content.Experience.title }}</h2>

    <article v-for="experience in content.Experience.content" :key="`${experience.heading}-${experience.date}`"
      class="experience-item card">
      <p class="date-badge"><i class="fa fa-calendar-o" aria-hidden="true"></i> {{ experience.date }}</p>
      <h3>{{ experience.heading }}</h3>

      <p v-for="detail in experience.details" :key="detail" class="detail">{{ detail }}</p>

      <div v-for="duty in experience.duties" :key="duty.header" class="duty-group">
        <h4 class="duty-header">{{ duty.header }}</h4>
        <ul>
          <li v-for="item in duty.items" :key="item">{{ item }}</li>
        </ul>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import content from '../utils/content'
</script>

<style scoped lang="scss">
.experience-item {
  margin-bottom: 18px;
}

.date-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 12px;
  color: #bae6fd;
  background: rgba(15, 23, 42, 0.85);
  border: 1px solid rgba(125, 211, 252, 0.3);
}

.detail {
  margin-bottom: 6px;
}

.duty-header {
  margin-top: 16px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #67e8f9;
}

ul {
  margin: 0;
  padding-left: 18px;

  li {
    margin-bottom: 6px;
  }
}
</style>
