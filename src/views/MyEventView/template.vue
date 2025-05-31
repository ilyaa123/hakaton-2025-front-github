<script setup lang="ts">
import { showAlert } from '@/hooks/showAlert'

import EventForm from '@/components/forms/EventForm.vue'

import { useMyEventView } from './store'

interface Props {
  eventId: number
}

const emits = defineEmits(['success'])

const props = defineProps<Props>()

const myEventView = useMyEventView(props.eventId)

const { isLoading, event } = myEventView

const handleOnUpdateEvent = async () => {
  try {
    await myEventView.updateEvent()
    showAlert('Успешно!', {
      color: 'success',
    })
  } catch (error) {
    showAlert('Ошибка', {
      color: 'error',
    })
  }
}
</script>
<template>
  <event-form v-if="event" v-model="event" @submit="handleOnUpdateEvent">
    <template #actions>
      <el-button :loading="isLoading" color="secondary" type="submit" block>Обновить</el-button>
    </template>
  </event-form>
</template>
