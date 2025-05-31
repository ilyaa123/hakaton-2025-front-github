<script setup lang="ts">
import { useRoute } from 'vue-router'

import DefaultLayout from '@/layouts/default.vue'

import MyEventView from '@/views/MyEventView'
import CheckQrCodeView from '@/views/CheckQrCodeView'
import MyEventStatisticView from '@/views/MyEventStatisticView'

const route = useRoute()

const eventId = (route.params as { id: number })?.id

definePage({
  meta: {
    isAuth: true,
    title: 'Событие',
  },
})
</script>
<template>
  <default-layout>
    <el-sheet rounded="md">
      <el-text class="mb-4" size="xl">Событие</el-text>
      <el-tabs
        :tabs="[
          { key: 'base', title: 'Основное' },
          { key: 'registered', title: 'Управление пользователями' },
          { key: 'statistic', title: 'Статистика' },
        ]"
        content-no-gutter
      >
        <template #base>
          <my-event-view v-if="eventId" :event-id="eventId" />
        </template>
        <template #registered>
          <check-qr-code-view v-if="eventId" :event-id="eventId" />
        </template>
        <template #statistic>
          <my-event-statistic-view />
        </template>
      </el-tabs>
    </el-sheet>
  </default-layout>
</template>
