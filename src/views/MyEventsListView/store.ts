import { ref } from 'vue'

import type { Event } from '@/entities/events'
import entities from '@/entities'

export const useMyEventsListStore = () => {
  const isLoading = ref(false)

  const events = ref<Event[]>([])

  const getEvents = async () => {
    try {
      isLoading.value = true
      const eventsList = await entities.events.getEvents()
      events.value = eventsList
    } catch (error) {
      console.log('🚀 ~ getEvents ~ error:', error)
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    events,
    getEvents,
  }
}
