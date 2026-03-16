import { computed, ref, watch } from 'vue'

export type Language = 'sv' | 'en'

const STORAGE_KEY = 'cv-language'

const language = ref<Language>('sv')

if (typeof window !== 'undefined') {
  // Synkronisera språk från SSR
  const ssrLanguage = (window as any).__CONTENT_INITIAL_STATE__?.language
  if (ssrLanguage) {
    language.value = ssrLanguage
  } else {
    const storedLanguage = window.localStorage.getItem(STORAGE_KEY)
    const browserLanguage = window.navigator.language
      .toLowerCase()
      .startsWith('sv')
      ? 'sv'
      : 'en'
    const initialLanguage: Language =
      storedLanguage === 'en' ? 'en' : browserLanguage
    setTimeout(() => {
      language.value = initialLanguage
    }, 0)
  }

  watch(
    language,
    (value) => {
      window.localStorage.setItem(STORAGE_KEY, value)
      document.documentElement.lang = value
    },
    { immediate: true }
  )
}

export const currentLanguage = computed(() => language.value)

export const setLanguage = (value: Language) => {
  language.value = value
}

export const uiText = computed(() => {
  if (language.value === 'en') {
    return {
      active: 'Active',
      nav: {
        '/': 'Home',
        '/experience': 'Experience',
        '/education': 'Education',
        '/skills': 'Skills',
        '/recommendations': 'Recommendations',
        '/contact': 'Contact',
      },
      home: {
        roleChip: 'Frontend / Software Developer',
        lastUpdated: 'Last updated',
        downloadCv: 'Download CV',
        contactMe: 'Contact me',
        topSkills: 'Top skills',
        metrics: {
          profile: 'Profile',
          profileValue: '5+ years',
          profileText: 'Professional experience building modern web stacks.',
          focus: 'Focus',
          focusValue: 'Vue + TS',
          focusText: 'Scalable interfaces, performance and DX.',
          delivery: 'Delivery',
          deliveryValue: 'SSR-ready',
          deliveryText: 'Builds robust flows from UI to API.',
        },
      },
      education: {
        certificate: 'View certificate',
      },
      skills: {
        level: (grade: number) => `Level ${grade} of 5`,
      },
    }
  }

  return {
    active: 'Aktiv',
    nav: {
      '/': 'Hem',
      '/experience': 'Erfarenhet',
      '/education': 'Utbildning',
      '/skills': 'Färdigheter',
      '/recommendations': 'Rekommendationer',
      '/contact': 'Kontakt',
    },
    home: {
      roleChip: 'Frontend/Systemutvecklare',
      lastUpdated: 'Senast uppdaterad',
      downloadCv: 'Ladda ner CV',
      contactMe: 'Kontakta mig',
      topSkills: 'Top skills',
      metrics: {
        profile: 'Profil',
        profileValue: '5+ år',
        profileText: 'Professionell erfarenhet i moderna webbstackar.',
        focus: 'Fokus',
        focusValue: 'Vue + TS',
        focusText: 'Skalbara gränssnitt, prestanda och DX.',
        delivery: 'Leverans',
        deliveryValue: 'SSR-ready',
        deliveryText: 'Bygger robusta flöden från UI till API.',
      },
    },
    education: {
      certificate: 'Visa examensbevis',
    },
    skills: {
      level: (grade: number) => `Nivå ${grade} av 5`,
    },
  }
})
