<template>
  <header class="header">
    <h1 class="brand">{{ content.HeaderMenu.brand }}</h1>
    <div class="nav-wrapper">
      <nav class="nav">
        <RouterLink v-for="value in routes" :key="value.path" :to="value.path">{{ routeLabel(value.path) }}</RouterLink>
      </nav>
      <p class="active-view">
        <span class="label">{{ uiText.active }}</span>
        <span class="value">{{ activeRouteName }}</span>
      </p>
      <div class="language-switch" role="group" aria-label="Language switcher">
        <button type="button" :class="{ active: currentLanguage === 'sv' }" @click="setLanguage('sv')">
          SV
        </button>
        <button type="button" :class="{ active: currentLanguage === 'en' }" @click="setLanguage('en')">
          EN
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import routes from '../router/routes'
import content from '../utils/content'
import { currentLanguage, setLanguage, uiText } from '../utils/i18n'

const route = useRoute()

const routeLabel = (path: string) =>
  uiText.value.nav[path as keyof typeof uiText.value.nav] ?? path

const activeRouteName = computed(() => {
  const activeRoute = routes.find((item) => item.path === route.path)?.path ?? '/'
  return routeLabel(activeRoute)
})

</script>

<style lang="scss" scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 40px;
  background: rgba(2, 6, 23, 0.82);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(148, 163, 184, 0.28);

  .brand {
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-size: 14px;
    color: #f8fafc;
    display: inline-flex;
    align-items: center;
    gap: 8px;

    &::before {
      content: '</>';
      color: #22d3ee;
      font-size: 12px;
      font-weight: 800;
    }
  }

  .nav {
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: flex-end;

    a {
      position: relative;
      color: #cbd5e1;
      font-size: 14px;
      text-decoration: none;
      padding: 6px 0;
      transition: color 0.2s ease;

      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(90deg, #22d3ee, #34d399);
        border-radius: 999px;
        transition: width 0.2s ease;
      }

      &:hover {
        color: #ecfeff;

        &::after {
          width: 100%;
        }
      }

      &.router-link-active {
        color: #67e8f9;

        &::after {
          width: 100%;
        }
      }
    }
  }

  .nav-wrapper {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .active-view {
    margin: 0;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(148, 163, 184, 0.35);
    background: rgba(15, 23, 42, 0.85);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    .label {
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.7px;
    }

    .value {
      color: #67e8f9;
      font-weight: 700;
    }
  }

  .language-switch {
    display: inline-flex;
    border: 1px solid rgba(148, 163, 184, 0.35);
    border-radius: 8px;
    overflow: hidden;

    button {
      border: 0;
      margin: 0;
      padding: 6px 9px;
      min-width: 38px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.7px;
      color: #94a3b8;
      background: rgba(15, 23, 42, 0.85);
      cursor: pointer;

      &.active {
        color: #0f172a;
        background: linear-gradient(90deg, #22d3ee, #34d399);
      }
    }
  }
}

@media (max-width: 640px) {
  .header {
    padding: 12px 16px;
    gap: 10px;

    .brand {
      font-size: 11px;
    }

    .nav {
      gap: 10px 14px;
    }

    .nav-wrapper {
      gap: 10px;
      flex-direction: column;
      align-items: flex-end;
    }

    .active-view {
      font-size: 11px;
      padding: 3px 8px;
    }
  }
}
</style>