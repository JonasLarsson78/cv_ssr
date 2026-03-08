import { computed } from 'vue'
import getContent from './getContent'
import { currentLanguage } from './i18n'

type BrowserContentState = Window & {
  __CONTENT_INITIAL_STATE__?: Partial<LocalizedContent>
}

export default computed<Content>(() => {
  const baseContent = getContent() as LocalizedContent

  if (typeof window === 'undefined') {
    return baseContent[currentLanguage.value]
  }

  const hydratedContent = (window as BrowserContentState)
    .__CONTENT_INITIAL_STATE__

  const localizedContent = hydratedContent
    ? {
        ...baseContent,
        ...hydratedContent,
      }
    : baseContent

  return localizedContent[currentLanguage.value] ?? localizedContent.sv
})
