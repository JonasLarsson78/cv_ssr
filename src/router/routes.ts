import Home from '../pages/Home.vue'
import Contact from '../pages/Contact.vue'
import Education from '../pages/Education.vue'
import Experience from '../pages/Experience.vue'
import Recommendations from '../pages/Recommendations.vue'
import Skills from '../pages/Skills.vue'

export default [
  { name: 'Hem', path: '/', component: Home },
  { name: 'Erfarenhet', path: '/experience', component: Experience },
  { name: 'Utbildning', path: '/education', component: Education },
  { name: 'Färdigheter', path: '/skills', component: Skills },
  {
    name: 'Rekommendationer',
    path: '/recommendations',
    component: Recommendations,
  },
  { name: 'Kontakt', path: '/contact', component: Contact },
]
