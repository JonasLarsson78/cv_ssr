import svHome from '../../sv/Home'

export default {
  name: 'Jonas Larsson',
  role: 'Software Developer',
  summary:
    "Hi! I'm Jonas — a frontend-focused software developer with 5+ years of professional experience building modern, scalable and user-friendly web applications. I specialize in Vue 3, TypeScript, JavaScript, Node.js and modern frontend architecture, and I have hands-on experience with React, cloud pipelines (AWS), MySQL, API integrations and tools that improve development workflows. During my years at Zmarta, I built and improved interfaces in financial and comparison services with focus on performance, accessibility, UX and code quality. I enjoy solving real problems, simplifying complex flows and continuously growing in modern web development.",
  status: {
    openToWork: 'Open to work',
    location: 'Helsingborg, Sweden',
    lastUpdated: 'March 2026',
  },
  topSkills: ['Vue 3', 'TypeScript', 'Node.js', 'SSR', 'GraphQL', 'AWS'],
  cta: {
    cvUrl: 'https://cv-v2-sage.vercel.app',
    pdfUrl: '/cv/jonas-larsson-cv-en.pdf',
    contactPath: '/contact',
  },
  socialLinks: svHome.socialLinks,
}
