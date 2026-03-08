import type { StateTree } from 'pinia'
import { createApp } from './main'
import getContent from './utils/getContent'

declare global {
  interface Window {
    __PINIA_INITIAL_STATE__?: StateTree
    __CONTENT_INITIAL_STATE__?: Record<string, unknown>
  }
}

const { app, pinia, router } = createApp()
if (window.__PINIA_INITIAL_STATE__) {
  pinia.state.value = window.__PINIA_INITIAL_STATE__
}

if (window.__CONTENT_INITIAL_STATE__) {
  Object.assign(getContent(), window.__CONTENT_INITIAL_STATE__)
}

router.isReady().then(() => {
  app.mount('#app')
})
