import { ref } from 'vue'

import entities from '@/entities'

import { showAlert } from '@/hooks/showAlert'
import type { RegisteredEvent } from '@/entities/registrations'

export const useCheckQrCodeStore = (id: number) => {
  const confirmLoading = ref(false),
    resetLoading = ref(false)

  const registeredUser = ref<RegisteredEvent | null>()

  const checkRegistration = async (userId: number) => {
    try {
      const findedUser = await entities.registrations.checkRegistration(id, userId)

      registeredUser.value = findedUser
    } catch (error) {
      showAlert('Пользователь не зарегистрирован на это событие', {
        color: 'error',
      })
    }
  }

  const confirmRegistration = async () => {
    try {
      confirmLoading.value = true
      const now = new Date().toISOString().split('.')[0] + 'Z'
      await entities.registrations.updateRegistration(registeredUser.value?.id!, {
        status: 'present',
        check_in_time: now,
      })
      showAlert('Успешно', {
        color: 'success',
      })
    } catch (error) {
      showAlert('Ошибка', {
        color: 'error',
      })
    } finally {
      confirmLoading.value = false
    }
  }

  const resetRegistration = async () => {
    try {
      resetLoading.value = true
      const now = new Date().toISOString().split('.')[0] + 'Z'
      await entities.registrations.updateRegistration(registeredUser.value?.id!, {
        status: 'attended',
        check_out_time: now,
      })
      showAlert('Успешно', {
        color: 'success',
      })
    } catch (error) {
      showAlert('Ошибка', {
        color: 'error',
      })
    } finally {
      resetLoading.value = false
    }
  }

  return {
    registeredUser,
    checkRegistration,
    confirmRegistration,
    resetRegistration,
  }
}
