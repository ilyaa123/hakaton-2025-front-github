<script setup lang="ts">
import { onMounted } from 'vue'

import ProgressCircularIcon from '@/components/icons/ProgressCircularIcon.vue'
import EventCard from '@/components/cards/EventCard.vue'

import { useEventsListStore } from './store'

const eventsListStore = useEventsListStore()

const { isLoading, loadingRegister, events, registeredEvents } = eventsListStore

onMounted(() => {
  eventsListStore.getEvents()
  eventsListStore.getRegisteredEvents()
})
</script>
<template>
  <div class="flex flex-col gap-2">
    <div v-if="isLoading" class="py-4 relative">
      <progress-circular-icon class="absolute inset-0 m-auto h-5 w-5" />
    </div>
    <div v-if="!isLoading && events.length == 0">
      <el-text align="center" size="2xl">Ничего не найдено</el-text>
    </div>
    <event-card
      v-for="event in events"
      :key="event.id"
      :title="event.title"
      :description="event.description"
      :date="event.date"
      :location="event.location"
    >
      <template #actions>
        <el-button
          :disabled="!!registeredEvents.find((item) => item.id == event.id)"
          :color="registeredEvents.find((item) => item.id == event.id) ? 'primary' : 'secondary'"
          :loading="loadingRegister == event.id"
          @click="eventsListStore.registration(event.id)"
          >{{
            registeredEvents.find((item) => item.id == event.id) ? 'Уже записаны' : 'Записаться'
          }}</el-button
        >
      </template>
    </event-card>
  </div>
</template>
