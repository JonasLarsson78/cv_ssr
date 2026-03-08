import morgan from 'morgan'

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  cyan: '\x1b[36m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
}

const statusStyle = (status: number) => {
  if (status >= 500) return { color: colors.red, emoji: '💥' }
  if (status >= 400) return { color: colors.yellow, emoji: '⚠️' }
  if (status >= 300) return { color: colors.cyan, emoji: '🚀' }
  if (status >= 200) return { color: colors.green, emoji: '✅' }
  return { color: colors.reset, emoji: 'ℹ️' }
}

morgan.token('colored-status-emoji', (req: any, res: any) => {
  const status = res.statusCode
  const { color, emoji } = statusStyle(status)
  return `${emoji} ${color}${status}${colors.reset}`
})

const format =
  ':method :url :colored-status-emoji :res[content-length] - :response-time ms'

export default morgan(format)
