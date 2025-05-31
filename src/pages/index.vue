<script setup lang="ts">
import authMiddleware from '@/middlewares/auth'

definePage({
  meta: {
    middleware: [authMiddleware],
    title: 'Главная',
  },
})
</script>
<template>
  <router-view />
</template>
