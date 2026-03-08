import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'

export function createRouter() {
  const history = import.meta.env.SSR
    ? createMemoryHistory()
    : createWebHistory()

  return _createRouter({
    history,
    routes,
  })
}
