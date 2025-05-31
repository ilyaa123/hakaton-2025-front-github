import { api } from '@/plugins/api'

import type { User } from './types'

const usersApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/users`,
}))

const login = (data: { email: string; password: string }) =>
  usersApi
    .post('login/', {
      json: data,
    })
    .json<{ access: string; refresh: string }>()

interface RegisterData {
  email: string
  password: string
  first_name: string
  last_name: string
}
const register = (data: RegisterData) =>
  usersApi
    .post('register/', {
      json: data,
    })
    .json<User>()

const getUser = () => usersApi.get('me/').json<User>()

export default {
  login,
  register,
  getUser,
}
