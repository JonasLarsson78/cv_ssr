import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import logger from './middleware/logger'
import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import { createServer as createViteServer } from 'vite'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function start() {
  const app = express()

  app.use(logger)

  app.get('/favicon.ico', (_req: Request, res: Response) => {
    res.status(204).end()
  })

  const vite = await createViteServer({
    server: {
      middlewareMode: 'ssr' as any,
    },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const url = req.originalUrl

      const templatePath = path.resolve(__dirname, 'index.html')
      let template = fs.readFileSync(templatePath, 'utf-8')
      template = await vite.transformIndexHtml(url, template)

      const { render } = await vite.ssrLoadModule('/src/entry-server.ts')
      const { appHtml, state, contentState } = await render(url)

      const stateScript = `<script>window.__PINIA_INITIAL_STATE__ = ${JSON.stringify(
        state
      )};<\/script>`
      const contentStateScript = `<script>window.__CONTENT_INITIAL_STATE__ = ${JSON.stringify(
        contentState
      ).replace(/</g, '\\u003c')};<\/script>`

      let htmlResult = template.replace('<!--app-html-->', appHtml)
      htmlResult = htmlResult.replace('<!--pinia-state-->', stateScript)
      htmlResult = htmlResult.replace(
        '<!--content-state-->',
        contentStateScript
      )

      res.status(200).set({ 'Content-Type': 'text/html' }).end(htmlResult)
    } catch (err) {
      if (err instanceof Error) {
        vite.ssrFixStacktrace(err)
      }
      next(err)
    }
  })

  const port = 4173
  app.listen(port, () => {
    console.log(`⚡ - SSR dev server running at http://localhost:${port}`)
  })
}

start().catch((err) => {
  console.error(err)
  process.exit(1)
})
