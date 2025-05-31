<script setup lang="ts">
import { onMounted } from 'vue'

import ProgressCircularIcon from '@/components/icons/ProgressCircularIcon.vue'
import EventCard from '@/components/cards/EventCard.vue'

import { eventBus } from '@/utils/eventBus'

import { useMyEventsListStore } from './store'

const myEventsListStore = useMyEventsListStore()

const { isLoading, events } = myEventsListStore

onMounted(() => {
  myEventsListStore.getEvents()
  eventBus.on('event:created', myEventsListStore.getEvents)
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
        <router-link :to="`/my-events/${event.id}`">
          <el-button color="secondary"> Перейти </el-button>
        </router-link>
      </template>
    </event-card>
  </div>
</template>
