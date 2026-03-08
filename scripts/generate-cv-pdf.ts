import fs from 'node:fs'
import path from 'node:path'

import localizedContent from '../src/content'

const normalizeText = (value: string) =>
  value
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2026/g, '...')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const escapePdfText = (value: string) =>
  normalizeText(value)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')

type RenderLine = {
  text: string
  size: number
  x: number
  y: number
}

const languageArg = process.argv.find((arg) => arg.startsWith('--lang='))
const selectedLanguage = languageArg?.split('=')[1] === 'en' ? 'en' : 'sv'

const content = localizedContent[selectedLanguage]
const { Home, Contact, Experience, Education, Skills, Recommendations } =
  content

const labels =
  selectedLanguage === 'en'
    ? {
        status: 'Status',
        location: 'Location',
        updated: 'Last updated',
        summary: 'Summary',
        contact: 'Contact',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        recommendations: 'Recommendations',
        level: 'Level',
        mail: 'Email',
        phone: 'Phone',
        page: 'Page',
        of: 'of',
      }
    : {
        status: 'Status',
        location: 'Plats',
        updated: 'Senast uppdaterad',
        summary: 'Sammanfattning',
        contact: 'Kontakt',
        experience: 'Erfarenhet',
        education: 'Utbildning',
        skills: 'Färdigheter',
        recommendations: 'Rekommendationer',
        level: 'Nivå',
        mail: 'Mail',
        phone: 'Telefon',
        page: 'Sida',
        of: 'av',
      }

const PAGE_WIDTH = 595
const PAGE_HEIGHT = 842
const MARGIN_LEFT = 48
const MARGIN_RIGHT = 48
const MARGIN_TOP = 60
const BOTTOM_MARGIN = 58
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT

const pages: RenderLine[][] = []
let currentPage: RenderLine[] = []
let y = PAGE_HEIGHT - MARGIN_TOP

const pushNewPage = () => {
  if (currentPage.length > 0) {
    pages.push(currentPage)
  }
  currentPage = []
  y = PAGE_HEIGHT - MARGIN_TOP
}

const lineHeight = (size: number) => size + 4

const ensureSpace = (height: number) => {
  if (y - height < BOTTOM_MARGIN) {
    pushNewPage()
  }
}

const approxCharsPerLine = (fontSize: number, indent = 0) =>
  Math.max(25, Math.floor((CONTENT_WIDTH - indent) / (fontSize * 0.54)))

const wrapText = (text: string, maxChars: number) => {
  const source = normalizeText(text)
  if (!source) {
    return ['']
  }

  const words = source.split(' ')
  const rows: string[] = []
  let row = ''

  for (const word of words) {
    const candidate = row ? `${row} ${word}` : word

    if (candidate.length <= maxChars) {
      row = candidate
      continue
    }

    if (row) {
      rows.push(row)
      row = word
    } else {
      rows.push(word)
      row = ''
    }
  }

  if (row) {
    rows.push(row)
  }

  return rows
}

const addLines = (
  rows: string[],
  fontSize: number,
  indent = 0,
  gapAfter = 0
) => {
  for (const row of rows) {
    const h = lineHeight(fontSize)
    ensureSpace(h)
    currentPage.push({
      text: row,
      size: fontSize,
      x: MARGIN_LEFT + indent,
      y,
    })
    y -= h
  }

  y -= gapAfter
}

const addParagraph = (
  text: string,
  fontSize: number,
  indent = 0,
  gapAfter = 0
) => {
  const rows = wrapText(text, approxCharsPerLine(fontSize, indent))
  addLines(rows, fontSize, indent, gapAfter)
}

const addSection = (title: string) => {
  ensureSpace(30)
  addLines([title.toUpperCase()], 14, 0, 6)
}

const addBullet = (text: string, fontSize = 11, indent = 16, gapAfter = 1) => {
  const rows = wrapText(text, approxCharsPerLine(fontSize, indent + 12))
  if (rows.length === 0) {
    return
  }

  addLines([`• ${rows[0]}`], fontSize, indent, 0)
  if (rows.length > 1) {
    addLines(rows.slice(1), fontSize, indent + 12, 0)
  }
  y -= gapAfter
}

addLines([Home.name], 24, 0, 2)
addLines([Home.role], 13, 0, 8)
addLines(
  [
    `${labels.status}: ${Home.status.openToWork}  |  ${labels.location}: ${Home.status.location}`,
  ],
  11,
  0,
  0
)
addLines([`${labels.updated}: ${Home.status.lastUpdated}`], 11, 0, 10)

addSection(labels.summary)
addParagraph(Home.summary, 11, 0, 12)

addSection(labels.contact)
for (const item of Contact.content) {
  addBullet(item.text, 11, 8, 1)
}
y -= 8

addSection(labels.experience)
for (const experience of Experience.content) {
  addParagraph(`${experience.heading}  |  ${experience.date}`, 12, 0, 0)
  for (const detail of experience.details) {
    addParagraph(detail, 11, 10, 0)
  }

  for (const duty of experience.duties) {
    addParagraph(duty.header, 11, 10, 0)
    for (const item of duty.items) {
      addBullet(item, 11, 24, 0)
    }
  }
  y -= 8
}

addSection(labels.education)
for (const education of Education.content) {
  addParagraph(education.subheading, 12, 0, 0)
  addParagraph(education.heading, 11, 10, 0)
  addParagraph(education.description, 11, 10, 8)
}

addSection(labels.skills)
for (const category of Skills.content) {
  addParagraph(category.category, 12, 0, 0)
  for (const item of category.items.sort((a, b) => a.order - b.order)) {
    addBullet(
      `${item.text} (${labels.level} ${item.grade}/5) - ${item.description}`,
      11,
      16,
      0
    )
  }
  y -= 6
}

addSection(labels.recommendations)
for (const recommendation of Recommendations.content) {
  addParagraph(`${recommendation.name} - ${recommendation.company}`, 12, 0, 0)
  addParagraph(`${labels.mail}: ${recommendation.mail}`, 11, 10, 0)
  addParagraph(`${labels.phone}: ${recommendation.phone}`, 11, 10, 6)
}

if (currentPage.length > 0) {
  pages.push(currentPage)
}

for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
  const footer = `${labels.page} ${pageIndex + 1} ${labels.of} ${pages.length}`
  pages[pageIndex].push({
    text: footer,
    size: 10,
    x: PAGE_WIDTH - MARGIN_RIGHT - 72,
    y: 28,
  })
}

const objects: Buffer[] = []

const fontObjectId = 3 + pages.length * 2

const pageObjectIds: number[] = []
for (let index = 0; index < pages.length; index += 1) {
  pageObjectIds.push(3 + index * 2)
}

const kidsRefs = pageObjectIds.map((id) => `${id} 0 R`).join(' ')

objects.push(
  Buffer.from('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n', 'latin1')
)
objects.push(
  Buffer.from(
    `2 0 obj\n<< /Type /Pages /Kids [${kidsRefs}] /Count ${pages.length} >>\nendobj\n`,
    'latin1'
  )
)

for (let pageIndex = 0; pageIndex < pages.length; pageIndex += 1) {
  const pageObjectId = 3 + pageIndex * 2
  const contentObjectId = 4 + pageIndex * 2

  objects.push(
    Buffer.from(
      `${pageObjectId} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontObjectId} 0 R >> >> /Contents ${contentObjectId} 0 R >>\nendobj\n`,
      'latin1'
    )
  )

  const streamRows: string[] = ['BT']

  for (const line of pages[pageIndex]) {
    streamRows.push(`/F1 ${line.size} Tf`)
    streamRows.push(
      `1 0 0 1 ${line.x} ${line.y} Tm (${escapePdfText(line.text)}) Tj`
    )
  }

  streamRows.push('ET')

  const streamBody = Buffer.from(streamRows.join('\n'), 'latin1')
  const contentHeader = Buffer.from(
    `${contentObjectId} 0 obj\n<< /Length ${streamBody.length} >>\nstream\n`,
    'latin1'
  )
  const contentFooter = Buffer.from('\nendstream\nendobj\n', 'latin1')

  objects.push(Buffer.concat([contentHeader, streamBody, contentFooter]))
}

objects.push(
  Buffer.from(
    `${fontObjectId} 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`,
    'latin1'
  )
)

const pdfParts: Buffer[] = [Buffer.from('%PDF-1.4\n%1234\n', 'latin1')]
const offsets: number[] = [0]

for (const objectBuffer of objects) {
  offsets.push(Buffer.concat(pdfParts).length)
  pdfParts.push(objectBuffer)
}

const bodyBuffer = Buffer.concat(pdfParts)
const xrefStart = bodyBuffer.length

const xrefRows: string[] = []
xrefRows.push(`xref\n0 ${objects.length + 1}`)
xrefRows.push('0000000000 65535 f ')
for (let index = 1; index < offsets.length; index += 1) {
  xrefRows.push(`${offsets[index].toString().padStart(10, '0')} 00000 n `)
}

const xrefBuffer = Buffer.from(`${xrefRows.join('\n')}\n`, 'latin1')
const trailerBuffer = Buffer.from(
  `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`,
  'latin1'
)

const outputBuffer = Buffer.concat([bodyBuffer, xrefBuffer, trailerBuffer])

const outputFilename =
  selectedLanguage === 'en' ? 'jonas-larsson-cv-en.pdf' : 'jonas-larsson-cv.pdf'
const outputPath = path.resolve(process.cwd(), `public/cv/${outputFilename}`)
fs.mkdirSync(path.dirname(outputPath), { recursive: true })
fs.writeFileSync(outputPath, outputBuffer)

console.log(`Generated PDF: ${outputPath}`)
console.log(`Language: ${selectedLanguage}`)
console.log(`Pages: ${pages.length}`)
console.log(
  `Render lines: ${pages.reduce((acc, page) => acc + page.length, 0)}`
)
