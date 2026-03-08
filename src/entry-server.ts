import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import getContent from './utils/getContent'

export async function render(url: string) {
  const { app, pinia, router } = createApp()

  await router.push(url)
  await router.isReady()

  const appHtml = await renderToString(app)
  const contentState = getContent()

  const state = pinia.state.value

  return { appHtml, state, contentState }
}
