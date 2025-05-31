<script setup lang="ts">
import DefaultLayout from '@/layouts/default.vue'

import QrCode from '@/components/QrCode.vue'

import { useAuth } from '@/store/auth'

definePage({
  meta: {
    isAuth: true,
    title: 'Мой QR-код',
  },
})

const { user } = useAuth()
</script>
<template>
  <default-layout>
    <qr-code v-if="user?.id" :id="user.id" />
  </default-layout>
</template>
