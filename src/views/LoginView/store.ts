import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import entities from '@/entities'

import { showAlert } from '@/hooks/showAlert'

import { useAuth } from '@/store/auth'

export const useLoginStore = () => {
  const { setToken, restoreAuth } = useAuth()
  const router = useRouter()

  const isLoading = ref(false)

  const form = reactive({
    email: '',
    password: '',
  })

  const login = async () => {
    try {
      isLoading.value = true
      const res = await entities.users.login({
        email: form.email,
        password: form.password,
      })

      setToken(res.access)
      await restoreAuth()
      router.push('/')
    } catch (error) {
      showAlert('Ошибка входа', {
        color: 'error',
      })
      console.log('🚀 ~ login ~ error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    form,
    login,
  }
}
