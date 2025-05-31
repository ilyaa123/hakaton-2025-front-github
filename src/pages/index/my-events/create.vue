<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue'
import CreateMyEventView from '@/views/CreateMyEventView'

definePage({
  meta: {
    isAuth: true,
    title: 'Создание события',
  },
})
</script>
<template>
  <default-layout>
    <div class="flex items-center justify-center">
      <el-sheet style="max-width: 420px; width: 100%" rounded="lg">
        <create-my-event-view />
      </el-sheet>
    </div>
  </default-layout>
</template>
