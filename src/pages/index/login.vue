<script setup lang="ts">
import LoginView from '@/views/LoginView'

definePage({
  meta: {
    isAuth: false,
    title: 'Вход',
  },
})
</script>
<template>
  <div class="min-h-dvh flex items-center justify-center">
    <login-view style="max-width: 420px; width: 100%" />
  </div>
</template>
