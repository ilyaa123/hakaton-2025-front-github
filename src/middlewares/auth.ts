import { useAuth } from '@/store/auth'

import type { MiddlewareContext } from '../../route-meta'

export default function authMiddleware({ to, next }: MiddlewareContext) {
  const { isAuth } = useAuth()

  if (typeof to.meta.isAuth === 'boolean') {
    if (to.meta.isAuth) {
      if (!isAuth.value) {
        return next('/login')
      }
      return next()
    } else {
      if (!isAuth.value) {
        return next()
      }
      return next('/')
    }
  }

  return next()
}
