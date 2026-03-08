<template>
  <section class="home page">
    <article class="card hero-card">
      <p class="chip"><i class="fa fa-terminal" aria-hidden="true"></i>{{ uiText.home.roleChip }}</p>
      <div class="status-row">
        <span class="chip status-chip"><i class="fa fa-circle" aria-hidden="true"></i>{{ content.Home.status.openToWork
        }}</span>
        <span class="chip"><i class="fa fa-map-marker" aria-hidden="true"></i>{{ content.Home.status.location }}</span>
        <span class="chip"><i class="fa fa-refresh" aria-hidden="true"></i>{{ uiText.home.lastUpdated }}: {{
          content.Home.status.lastUpdated }}</span>
      </div>
      <h2 class="page-title home-title">{{ content.Home.name }}</h2>
      <p class="role">{{ content.Home.role }}</p>
      <p class="summary">{{ content.Home.summary }}</p>

      <div class="cta-row">
        <button class="btn btn-primary" type="button" @click="downloadCv">
          <i class="fa fa-download" aria-hidden="true"></i>
          {{ uiText.home.downloadCv }}
        </button>
        <RouterLink class="btn btn-secondary" :to="content.Home.cta.contactPath">
          <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
          {{ uiText.home.contactMe }}
        </RouterLink>
      </div>

      <div class="top-skills">
        <p class="muted">{{ uiText.home.topSkills }}</p>
        <ul>
          <li v-for="skill in content.Home.topSkills" :key="skill">{{ skill }}</li>
        </ul>
      </div>

      <div class="social-links">
        <a v-for="link in content.Home.socialLinks" :key="link.url" :href="link.url" target="_blank"
          rel="noopener noreferrer">
          <i :class="link.icon" aria-hidden="true"></i>
        </a>
      </div>
    </article>
    <div class="metrics-grid">
      <article class="card metric-card">
        <p class="metric-label">{{ uiText.home.metrics.profile }}</p>
        <p class="metric-value">{{ uiText.home.metrics.profileValue }}</p>
        <p class="muted">{{ uiText.home.metrics.profileText }}</p>
      </article>
      <article class="card metric-card">
        <p class="metric-label">{{ uiText.home.metrics.focus }}</p>
        <p class="metric-value">{{ uiText.home.metrics.focusValue }}</p>
        <p class="muted">{{ uiText.home.metrics.focusText }}</p>
      </article>
      <article class="card metric-card">
        <p class="metric-label">{{ uiText.home.metrics.delivery }}</p>
        <p class="metric-value">{{ uiText.home.metrics.deliveryValue }}</p>
        <p class="muted">{{ uiText.home.metrics.deliveryText }}</p>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import content from '../utils/content'
import { currentLanguage, uiText } from '../utils/i18n'

const downloadCv = async () => {
  const pdfUrl = content.value.Home.cta.pdfUrl
  const fallbackUrl = content.value.Home.cta.cvUrl
  const downloadFilename =
    currentLanguage.value === 'en'
      ? 'Jonas-Larsson-CV-EN.pdf'
      : 'Jonas-Larsson-CV.pdf'

  if (typeof window === 'undefined') {
    return
  }

  try {
    const response = await fetch(pdfUrl, { method: 'GET' })

    if (!response.ok) {
      throw new Error('PDF not found')
    }

    const contentType = response.headers.get('content-type')?.toLowerCase() ?? ''

    if (!contentType.includes('application/pdf')) {
      throw new Error('Invalid PDF content type')
    }

    const blob = await response.blob()
    const objectUrl = URL.createObjectURL(blob)
    const link = document.createElement('a')

    link.href = objectUrl
    link.download = downloadFilename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(objectUrl)
  } catch {
    window.alert(
      currentLanguage.value === 'en'
        ? 'Could not find a valid PDF file. Opening fallback in a new tab.'
        : 'Kunde inte hitta en giltig PDF-fil. Öppnar fallback i ny flik.',
    )
    window.open(fallbackUrl, '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  gap: 16px;
}

.hero-card {
  padding: 26px;
}

.status-row {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.status-chip {
  color: #86efac;

  i {
    font-size: 9px;
  }
}

.home-title {
  display: block;
  margin-top: 14px;
}

.home-title::before,
.home-title::after {
  content: none;
}

.role {
  font-weight: 600;
  margin-bottom: 10px;
  color: #67e8f9;
}

.summary {
  margin-bottom: 16px;
  max-width: 950px;
}

.cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border-radius: 10px;
  text-decoration: none;
  border: 1px solid transparent;
  font-weight: 600;
  cursor: pointer;
}

.btn-primary {
  color: #03271d;
  background: linear-gradient(90deg, #34d399, #22d3ee);
}

.btn-secondary {
  color: #e2e8f0;
  background: rgba(15, 23, 42, 0.8);
  border-color: rgba(148, 163, 184, 0.28);
}

.top-skills {
  margin-bottom: 18px;

  p {
    margin-bottom: 8px;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    li {
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.3);
      background: rgba(2, 6, 23, 0.75);
      font-size: 13px;
      color: #cbd5e1;
    }
  }
}

.social-links {
  margin-top: 20px;
  display: flex;
  gap: 10px;

  a {
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    border: 1px solid rgba(148, 163, 184, 0.28);
    background: rgba(15, 23, 42, 0.8);
    color: #e2e8f0;
    text-decoration: none;
    font-size: 17px;

    &:hover {
      color: #67e8f9;
      border-color: rgba(103, 232, 249, 0.55);
    }
  }
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.metric-card {
  min-height: 145px;
}

.metric-label {
  margin-bottom: 4px;
  color: #94a3b8;
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 0.9px;
}

.metric-value {
  margin-bottom: 10px;
  font-size: 22px;
  font-weight: 700;
  color: #f8fafc;
}

@media (max-width: 800px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }

  .status-row {
    display: grid;
  }
}
</style>
