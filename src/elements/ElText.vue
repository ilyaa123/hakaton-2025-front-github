<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  tag?: string
  size?:
    | 'xs'
    | 'sm'
    | 'md'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl'
  align?: 'center' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  tag: 'p',
  align: 'left',
})

const alignClasses = computed(() => `text-${props.align}`)

const sizeClasses = computed(() => `text-${props.size}`)
</script>
<template>
  <component :is="tag" :class="`${sizeClasses} ${alignClasses}`">
    <slot />
  </component>
</template>
