<script setup lang="ts">
import { onMounted, ref } from 'vue'

// @ts-ignore
import QRCode from 'qrcode'

interface Props {
  id: string | number
}

const props = defineProps<Props>()

const qrCodeData = ref<string>('')

const generateQr = async () => {
  qrCodeData.value = await QRCode.toDataURL(String(props.id))
}

onMounted(() => {
  generateQr()
})
</script>
<template>
  <div class="flex justify-center items-center p-4">
    <img
      v-if="qrCodeData"
      :src="qrCodeData"
      alt="QR Code"
      class="max-w-full h-auto rounded-md"
      width="210"
    />
  </div>
</template>
