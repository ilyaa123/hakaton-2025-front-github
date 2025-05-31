import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import type { NavigationGuardNext } from 'vue-router'
import type { Middleware, MiddlewareContext } from '../../route-meta'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

const nextFactory = (
  context: MiddlewareContext,
  middleware: Middleware[],
  index: number,
): NavigationGuardNext => {
  const subsequentMiddleware = middleware[index]

  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    if (parameters.length > 0) {
      return context.next(...(parameters as []))
    }

    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]

    const context: MiddlewareContext = { from, next, router, to }

    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Hakaton'
})

export default router
