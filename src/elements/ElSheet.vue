<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  color?: string
  rounded?: 'none' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
}

const props = withDefaults(defineProps<Props>(), {
  color: 'surface',
  rounded: 'none',
})

const defaultClasses = computed(() => `rounded-${props.rounded}`)

const colorClasses = computed(() => `bg-${props.color} text-on-${props.color}`)
</script>
<template>
  <div :class="`${colorClasses} ${defaultClasses}`" class="p-4 md:p-2">
    <slot />
  </div>
</template>
