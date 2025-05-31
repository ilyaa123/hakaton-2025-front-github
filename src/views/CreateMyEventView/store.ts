import { reactive, ref } from 'vue'

import entities from '@/entities'

export const useCreateMyEventView = () => {
  const isLoading = ref(false)

  const form = reactive({
    title: '',
    description: '',
    date: '',
    location: '',
  })

  const createEvent = async () => {
    isLoading.value = true
    const formattedDate = form.date.split('.').reverse().join('-')
    return entities.events
      .createEvent({
        title: form.title,
        description: form.description,
        date: formattedDate,
        location: form.location,
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  return {
    isLoading,
    form,
    createEvent,
  }
}
