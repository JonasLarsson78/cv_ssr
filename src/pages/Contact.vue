<template>
  <section class="page">
    <h2 class="page-title">{{ content.Contact.title }}</h2>

    <ul class="contact-list">
      <li v-for="item in content.Contact.content" :key="item.url">
        <article class="card">
          <a :href="item.url" target="_blank" rel="noopener noreferrer">
            <span class="icon-wrap">
              <i :class="item.icon" aria-hidden="true"></i>
            </span>
            <span>{{ item.text }}</span>
            <span v-if="item.tag" class="tag">{{ item.tag }}</span>
          </a>
        </article>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import content from '../utils/content'
</script>

<style scoped lang="scss">
.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;

  li {
    margin: 0;
  }

  a {
    display: flex;
    gap: 12px;
    align-items: center;
    text-decoration: none;
    color: #e2e8f0;

    &:hover {
      color: #67e8f9;
    }
  }
}

.icon-wrap {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  border: 1px solid rgba(148, 163, 184, 0.3);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #67e8f9;
  background: rgba(2, 6, 23, 0.8);
}

.tag {
  font-size: 11px;
  margin-left: auto;
  padding: 3px 8px;
  border-radius: 999px;
  color: #022c22;
  border: 1px solid rgba(134, 239, 172, 0.6);
  background: rgba(134, 239, 172, 0.9);
}
</style>
