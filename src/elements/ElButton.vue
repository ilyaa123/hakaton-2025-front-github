<script setup lang="ts">
import { computed } from 'vue'

import ProgressCircularIcon from '@/components/icons/ProgressCircularIcon.vue'

interface Props {
  title?: string
  color?: string
  block?: boolean
  type?: HTMLButtonElement['type']
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
  type: 'button',
  block: false,
  loading: false,
})

const defaultClasses = computed(() => {
  const classes = {
    'block w-full': !!props.block,
  }

  return Object.keys(classes)
    .filter((i) => !!classes[i as keyof typeof classes])
    .join(' ')
})

const colorClasses = computed(() => `bg-${props.color} text-on-${props.color}`)
</script>
<template>
  <button
    :class="`relative px-4 py-2 rounded cursor-pointer ${colorClasses} ${defaultClasses}`"
    :type="type"
    :disabled="loading || disabled"
  >
    <span :class="{ 'opacity-0': loading }" class="inline-block w-full text-center">
      <slot>
        {{ title }}
      </slot>
    </span>

    <progress-circular-icon
      v-if="loading"
      class="absolute inset-0 m-auto h-5 w-5"
      :class="`text-on-${props.color}`"
    />
  </button>
</template>
