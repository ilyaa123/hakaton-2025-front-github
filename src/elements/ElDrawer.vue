<script setup lang="ts">
import { computed } from 'vue'

import ElSheet from './ElSheet.vue'

interface Props {
  location?: 'left' | 'right'
  width?: string
  fullWidth?: boolean
  overlay?: boolean
  sticky?: boolean
  color?: string
  elevation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  location: 'left',
  overlay: true,
  width: '16rem',
  elevation: true,
})

const value = defineModel<boolean>({
  default: false,
})

const drawerStyles = computed<Record<string, string>>(() => {
  const baseStyles = {
    position: props.sticky ? 'sticky' : 'fixed',
    top: '0',
    bottom: '0',
    transition: 'transform 0.3s ease-in-out',
  }

  const transformStyle =
    value.value && props.location === 'left'
      ? 'translateX(0)'
      : props.location === 'left'
        ? 'translateX(-100%)'
        : 'translateX(100%)'

  return {
    ...baseStyles,
    transform: transformStyle,
    [props.location!]: '0',
  }
})

const drawerSizeStyles = computed<Record<string, string>>(() => ({
  width: props.fullWidth ? '100%' : props.width,
  'min-height': '100dvh',
}))
</script>

<template>
  <div
    v-if="value && overlay"
    class="fixed inset-0 z-10 bg-black bg-opacity-50"
    role="presentation"
    aria-hidden="true"
    style="background-color: rgb(0 0 0 / 0.5)"
    @click="value = false"
  ></div>
  <div
    v-bind="$attrs"
    :style="{ ...drawerStyles, ...drawerSizeStyles }"
    :class="elevation ? 'shadow-lg' : ''"
    class="z-50 h-full bg-background text-on-background"
    role="dialog"
    aria-modal="true"
  >
    <el-sheet :style="drawerSizeStyles" :color="color">
      <slot />
    </el-sheet>
  </div>
</template>
