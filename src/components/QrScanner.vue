<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from 'vue'
import { BrowserQRCodeReader } from '@zxing/browser'

const emits = defineEmits<{
  (e: 'scanned', value: number | string): void
}>()

const videoRef = ref<HTMLVideoElement | null>(null)
const isCameraReady = ref(false)
const isCameraActive = ref(false)

const codeReader = new BrowserQRCodeReader()
let stopScan: (() => void) | null = null

const startCamera = async () => {
  stopCamera()

  isCameraActive.value = true
  isCameraReady.value = false

  await nextTick()
  await new Promise((resolve) => setTimeout(resolve, 200))

  try {
    const controls = await codeReader.decodeFromConstraints(
      {
        video: {
          facingMode: { ideal: 'environment' },
        },
      },
      videoRef.value!,
      (result, error, controls) => {
        if (result) {
          emits('scanned', result.getText())
          controls.stop()
          stopScan = null
          isCameraActive.value = false
          isCameraReady.value = false
        }
      },
    )

    stopScan = () => controls.stop()

    await videoRef.value?.play()

    isCameraReady.value = true
  } catch (err) {
    console.error('Ошибка при запуске камеры:', err)
    isCameraActive.value = false
    isCameraReady.value = false
  }
}

const stopCamera = () => {
  stopScan?.()
  stopScan = null
  isCameraActive.value = false
  isCameraReady.value = false
}

const toggleCamera = () => {
  isCameraActive.value ? stopCamera() : startCamera()
}

onBeforeUnmount(() => {
  stopCamera()
})
</script>

<template>
  <div class="relative w-full max-w-md mx-auto flex flex-col items-center gap-4">
    <div
      v-if="!isCameraReady && isCameraActive"
      class="absolute inset-0 z-10 flex items-center justify-center bg-black/80 text-white rounded"
    >
      Загружаем камеру...
    </div>

    <div
      class="relative w-full aspect-square border-4 border-primary rounded overflow-hidden cursor-pointer"
      @click="toggleCamera"
    >
      <video
        v-show="isCameraActive"
        ref="videoRef"
        autoplay
        playsinline
        muted
        class="w-full h-full object-cover"
      />

      <div
        v-if="isCameraReady"
        class="absolute top-0 left-0 w-full h-0.5 bg-green-400 animate-scan z-10"
      ></div>

      <div
        v-if="!isCameraActive"
        class="absolute inset-0 flex items-center text-center justify-center text-white bg-black/60 z-10 text-lg font-semibold"
      >
        Нажмите для включения камеры
      </div>
    </div>
  </div>
</template>
<style scoped>
@keyframes scan {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}
.animate-scan {
  animation: scan 2s linear infinite;
}
</style>
