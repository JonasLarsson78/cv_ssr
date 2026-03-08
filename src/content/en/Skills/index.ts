import svSkills from '../../sv/Skills'

const descriptionMap: Record<string, string> = {
  'Semantisk HTML och tillgänglighet.': 'Semantic HTML and accessibility.',
  'Responsiva layouter med Flexbox och Grid.':
    'Responsive layouts with Flexbox and Grid.',
  'Modulär och underhållbar CSS.': 'Modular and maintainable CSS.',
  'Modern JS (ES6+) för interaktivitet.': 'Modern JS (ES6+) for interactivity.',
  'Typning och bättre utvecklarupplevelse.':
    'Type safety and improved developer experience.',
  'Vue 3, Composition API och ekosystemet.':
    'Vue 3, Composition API and ecosystem.',
  'State management (Vue 2/legacy).': 'State management (Vue 2/legacy).',
  'State management för Vue 3.': 'State management for Vue 3.',
  'Erfarenhet av React-projekt.': 'Experience from React projects.',
  'Snabba dev- och byggverktyg.': 'Fast dev and build tooling.',
  'Snabb UI-prototypning och komponenter.':
    'Rapid UI prototyping and component usage.',
  'Server-sida och API:er med Node.js.':
    'Server-side development and APIs with Node.js.',
  'Design och integration av GraphQL-API:er.':
    'Design and integration of GraphQL APIs.',
  'Grundläggande erfarenhet av Go.': 'Basic hands-on experience with Go.',
  'Snabbt och minimalistiskt Node.js-ramverk för API:er.':
    'Fast and minimalist Node.js framework for APIs.',
  'Containerisering och lokala miljöer.':
    'Containerization and local development environments.',
  'Paket- och script-hantering.': 'Package and script management.',
  'Versionshantering och PR-flöden.': 'Version control and PR workflows.',
  'API-testning och dokumentation.': 'API testing and documentation.',
  'Plattform för distribution och hosting.':
    'Platform for deployment and hosting.',
  'Traditionell bundler och konfiguration.':
    'Traditional bundler and configuration.',
  'CI/CD pipelines och automation.': 'CI/CD pipelines and automation.',
  'Molntjänster och distribution (S3, Lambda etc).':
    'Cloud services and deployment (S3, Lambda etc).',
  'UI/UX-design och prototyper.': 'UI/UX design and prototyping.',
  'Databasschema och frågor.': 'Database schema design and querying.',
  'NoSQL-databas för flexibla datamodeller.':
    'NoSQL database for flexible data models.',
  'Lättviktsdatabas för lokal utveckling och prototyper.':
    'Lightweight database for local development and prototypes.',
  'Enhetstester och snapshot-testing.': 'Unit testing and snapshot testing.',
  'Snabb testkörning för Vite-projekt.':
    'Fast test execution for Vite projects.',
  'Autentisering och auktorisering av API:er.':
    'API authentication and authorization.',
  'Token-baserad autentisering och sessionshantering.':
    'Token-based authentication and session handling.',
}

const categoryMap: Record<string, string> = {
  Databaser: 'Databases',
}

export default {
  title: 'Skills',
  content: svSkills.content.map((group) => ({
    ...group,
    category: categoryMap[group.category] ?? group.category,
    items: group.items.map((item) => ({
      ...item,
      description: descriptionMap[item.description] ?? item.description,
    })),
  })),
}
