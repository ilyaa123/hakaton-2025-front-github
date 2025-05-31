<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue'
import EventsListView from '@/views/EventsListView'

definePage({
  meta: {
    isAuth: true,
    title: 'События',
  },
})
</script>
<template>
  <default-layout>
    <events-list-view />
  </default-layout>
</template>
