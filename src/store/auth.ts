import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import entities from '@/entities'

import type { User } from '@/entities/users'

const user = ref<User | null>(null)
const token = ref<string | null>(localStorage.getItem('token'))

let hasInitialized = false

export const useAuth = () => {
  const isAuth = computed(() => !!token.value)

  const router = useRouter()

  const setUser = (value: typeof user.value) => {
    user.value = value
  }

  const setToken = (value: string | null) => {
    token.value = value
    if (value) {
      localStorage.setItem('token', value)
    } else {
      localStorage.removeItem('token')
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    router.push('/login')
  }

  const fetchUser = async () => {
    try {
      const userData = await entities.users.getUser()
      setUser(userData)
    } catch (error) {
      logout()
    }
  }

  const restoreAuth = async () => {
    if (token.value && !user.value) {
      await fetchUser()
    }
  }

  if (!hasInitialized) {
    hasInitialized = true
    restoreAuth()
  }

  return {
    isAuth,
    user,
    token,
    logout,
    setToken,
    setUser,
    restoreAuth,
  }
}
