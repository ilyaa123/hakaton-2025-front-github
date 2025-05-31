import { onMounted, ref } from 'vue'

import entities from '@/entities'

import type { Event } from '@/entities/events'

export const useMyEventView = (id: number) => {
  const isLoading = ref(false)

  const event = ref<Event | null>(null)

  const getEvent = async () => {
    event.value = await entities.events.getEvent(id)
  }

  const updateEvent = async () => {
    return entities.events.updateEvent(id, event.value!).finally(() => {
      isLoading.value = false
    })
  }

  onMounted(() => {
    getEvent()
  })

  return {
    isLoading,
    event,
    updateEvent,
  }
}
