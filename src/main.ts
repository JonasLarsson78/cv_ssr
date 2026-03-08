import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './main.scss'
import { createRouter } from './router/router'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  const router = createRouter()

  app.use(pinia)
  app.use(router)

  return { app, pinia, router }
}
