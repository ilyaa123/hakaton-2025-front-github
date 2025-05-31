<script setup lang="ts">
interface Props {
  message?: string
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
})

const emits = defineEmits(['click:close'])
</script>
<template>
  <div
    :class="`p-4 rounded-md bg-${color} text-on-${color} shadow-md`"
    class="w-full gap-8 flex items-center justify-between font-semibold"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    {{ message }}
  </div>
</template>
