import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import { showAlert } from '@/hooks/showAlert'

import entities from '@/entities'

export const useRegisterStore = () => {
  const router = useRouter()

  const isLoading = ref(false)

  const form = reactive({
    surname: '',
    name: '',
    email: '',
    password: '',
  })

  const register = async () => {
    isLoading.value = true
    try {
      await entities.users.register({
        email: form.email,
        password: form.password,
        first_name: form.surname,
        last_name: form.name,
      })
      showAlert('Успешно', {
        color: 'success',
      })

      router.push('/login')
    } catch (error) {
      showAlert('Ошибка регистрации', {
        color: 'error',
      })
      console.log('🚀 ~ register ~ error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    form,
    register,
  }
}
