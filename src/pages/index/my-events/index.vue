<script setup lang="ts">
import { ref } from 'vue'

import DefaultLayout from '@/layouts/default.vue'

import MyEventsListView from '@/views/MyEventsListView'
import CreateMyEventView from '@/views/CreateMyEventView'

const createModalOpen = ref(false)
</script>
<template>
  <default-layout>
    <el-sheet class="flex items-center justify-end gap-2 mb-4" rounded="lg">
      <el-modal v-model="createModalOpen" max-width="420px" width="100%">
        <template #activator="{ props }">
          <el-button v-bind="props" color="secondary"> Добавить </el-button>
        </template>
        <create-my-event-view style="text-align: left" @success="createModalOpen = false" />
      </el-modal>
    </el-sheet>
    <my-events-list-view />
  </default-layout>
</template>
