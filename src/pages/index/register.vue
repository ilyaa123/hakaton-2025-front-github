<script setup lang="ts">
import RegisterView from '@/views/RegisterView'

definePage({
  meta: {
    isAuth: false,
    title: 'Регистрация',
  },
})
</script>
<template>
  <div class="min-h-dvh flex items-center justify-center">
    <register-view style="max-width: 420px; width: 100%" />
  </div>
</template>
