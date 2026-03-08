type Language = 'sv' | 'en'

interface Content {
  HeaderMenu: {
    brand: string
  }
  Home: {
    name: string
    role: string
    summary: string
    status: {
      openToWork: string
      location: string
      lastUpdated: string
    }
    topSkills: string[]
    cta: {
      cvUrl: string
      pdfUrl: string
      contactPath: string
    }
    socialLinks: {
      icon: string
      url: string
    }[]
  }
  Contact: {
    title: string
    content: {
      icon: string
      text: string
      url: string
      tag?: string
    }[]
  }
  Education: {
    title: string
    content: {
      heading: string
      subheading: string
      examensbevis: string
      description: string
    }[]
  }
  Experience: {
    title: string
    content: {
      heading: string
      date: string
      details: string[]
      duties: {
        header: string
        items: string[]
      }[]
    }[]
  }
  Recommendations: {
    title: string
    content: {
      name: string
      company: string
      mail: string
      phone: string
    }[]
  }
  Skills: {
    title: string
    content: {
      category: string
      items: {
        image: string
        text: string
        grade: number
        order: number
        description: string
      }[]
    }[]
  }
}

type LocalizedContent = {
  sv: Content
  en: Content
}
