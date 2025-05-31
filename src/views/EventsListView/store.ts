import { ref } from 'vue'

import type { Event } from '@/entities/events'
import entities from '@/entities'
import { showAlert } from '@/hooks/showAlert'

export const useEventsListStore = () => {
  const isLoading = ref(false),
    loadingRegister = ref<number | null>(null)

  const events = ref<Event[]>([])
  const registeredEvents = ref<Event[]>([])

  const getEvents = async () => {
    try {
      isLoading.value = true
      events.value = await entities.events.getNotOwnedEvents()
    } catch (error) {
      console.log('🚀 ~ getEvents ~ error:', error)
    } finally {
      isLoading.value = false
    }
  }
  const getRegisteredEvents = async () => {
    registeredEvents.value = await entities.events.getRegisteredEvents()
  }

  const registration = async (eventId: number) => {
    try {
      loadingRegister.value = eventId
      await entities.registrations.register(eventId)
      showAlert('Успешно!', {
        color: 'success',
      })
      getRegisteredEvents()
    } catch (error) {
      showAlert('Ошибка', {
        color: 'error',
      })
    } finally {
      loadingRegister.value = null
    }
  }

  return {
    loadingRegister,
    isLoading,
    events,
    registeredEvents,
    getEvents,
    getRegisteredEvents,
    registration,
  }
}
