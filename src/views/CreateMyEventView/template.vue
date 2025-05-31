<script setup lang="ts">
import { showAlert } from '@/hooks/showAlert'

import EventForm from '@/components/forms/EventForm.vue'

import { eventBus } from '@/utils/eventBus'

import { useCreateMyEventView } from './store'

const emits = defineEmits(['success'])

const createMyEventView = useCreateMyEventView()

const { isLoading, form } = createMyEventView

const handleOnCreate = async () => {
  try {
    await createMyEventView.createEvent()

    showAlert('Успешно!', {
      color: 'success',
    })
    emits('success')
    eventBus.emit('event:created')
  } catch (error) {
    showAlert('Ошибка', {
      color: 'error',
    })
  }
}
</script>
<template>
  <el-sheet rounded="md">
    <el-text class="mb-4" align="center" size="xl">Добавить событие</el-text>
    <event-form v-model="form" @submit="handleOnCreate">
      <template #actions>
        <el-button :loading="isLoading" color="secondary" type="submit" block>Добавить</el-button>
      </template>
    </event-form>
  </el-sheet>
</template>
