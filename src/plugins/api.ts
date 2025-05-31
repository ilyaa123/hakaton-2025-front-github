import ky, { type KyInstance } from 'ky'
import type { InjectionKey, Plugin } from 'vue'

import router from './router'

const APP_API_URL = import.meta.env.VITE_APP_API_URL

export const apiKey = Symbol('api') as InjectionKey<KyInstance>

export const api = ky.create({
  prefixUrl: APP_API_URL,
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  hooks: {
    beforeRequest: [
      async (req) => {
        const token = localStorage.getItem('token')
        if (!!token) {
          req.headers.set('Authorization', `Bearer ${token}`)
        }
      },
    ],
    beforeError: [
      ({ request, response }) => {
        const isUnauthorized = response.status === 401

        if (isUnauthorized) {
          router.push('/login')
        }

        return response.json()
      },
    ],
  },
})

export default {
  install(app) {
    app.config.globalProperties.api = api
    app.config.globalProperties.$api = api

    app.provide(apiKey, api)
  },
} satisfies Plugin
