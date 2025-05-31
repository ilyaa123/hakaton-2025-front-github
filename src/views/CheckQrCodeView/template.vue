<script setup lang="ts">
import QrScanner from '@/components/QrScanner.vue'

import { useCheckQrCodeStore } from './store'

interface Props {
  eventId: number
}

const props = defineProps<Props>()

const checkQrCodeStore = useCheckQrCodeStore(props.eventId)

const { registeredUser } = checkQrCodeStore
</script>
<template>
  <div>
    <qr-scanner @scanned="(val) => checkQrCodeStore.checkRegistration(val as number)" />
    <div v-if="registeredUser" class="py-4 flex items-center justify-center">
      <div style="max-width: 420px">
        <el-text class="mb-2" align="center"
          >Пользователь: {{ registeredUser.user_info.first_name }}
          {{ registeredUser.user_info.last_name }}</el-text
        >
        <div class="flex items-center justify-between gap-2">
          <el-button color="success" @click="checkQrCodeStore.confirmRegistration"
            >Подтвердить вход</el-button
          >
          <el-button color="error" @click="checkQrCodeStore.resetRegistration"
            >Подтвердить выход</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
