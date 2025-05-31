<script setup lang="ts">
import entities from '@/entities'
import DefaultLayout from '@/layouts/default.vue'
import { onMounted, ref } from 'vue'
definePage({
  meta: {
    isAuth: true,
  },
})

const eventsOwnedCount = ref(0),
  registeredEvents = ref(0)

onMounted(async () => {
  try {
    eventsOwnedCount.value = (await entities.events.getEvents()).length || 0
    registeredEvents.value = (await entities.events.getRegisteredEvents()).length || 0
  } catch (error) {}
})
</script>
<template>
  <default-layout>
    <div class="grid grid-cols-2 gap-2">
      <router-link to="/my-events">
        <el-sheet rounded="lg">
          <el-text align="center">Создано событий</el-text>
          <el-text size="lg" align="center">{{ eventsOwnedCount }}</el-text>
        </el-sheet>
      </router-link>

      <router-link to="/events">
        <el-sheet rounded="lg">
          <el-text align="center">Зарегистрировано на мероприятия</el-text>
          <el-text size="lg" align="center">{{ registeredEvents }}</el-text>
        </el-sheet>
      </router-link>
    </div>
  </default-layout>
</template>
