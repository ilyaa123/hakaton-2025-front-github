<script setup lang="ts">
interface Props {
  title: string
  description: string
  date: string
  location: string
}

defineProps<Props>()
</script>
<template>
  <div class="bg-surface text-on-surface rounded-2xl p-4 shadow-md flex flex-col gap-2">
    <div class="flex justify-between items-start">
      <div>
        <h2 class="text-lg font-semibold">{{ title }}</h2>
        <p class="text-sm text-on-surface/80">{{ description }}</p>
      </div>

      <slot name="actions" />
    </div>

    <div class="flex justify-between text-sm mt-2 text-on-surface/70">
      <span> {{ location }}</span>
      <span> {{ date.split('-').reverse().join('.') }}</span>
    </div>
  </div>
</template>
