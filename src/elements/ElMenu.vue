<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch, nextTick, useId, onUnmounted } from 'vue'

interface Props {
  location?: 'top' | 'right' | 'bottom' | 'left'
  width?: string | number
  height?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  location: 'bottom',
  width: 'max-content',
  height: 'auto',
})

const isActive = defineModel({
  type: Boolean,
  default: false,
})

const id = useId()

const menuWrapperRef = ref<HTMLDivElement>()
const menuContentRef = ref<HTMLDivElement>()

const menuStyle = ref<Record<string, string>>()

const handleClickOutside = (e: MouseEvent) => {
  if (
    menuWrapperRef.value &&
    !menuWrapperRef.value.contains(e.target as HTMLElement) &&
    isActive.value
  ) {
    isActive.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    isActive.value = false
  }
}

const handleMenuPosition = () => {
  const style: Record<string, string> = {}

  if (!menuContentRef.value || !menuWrapperRef.value) return

  const rect = menuContentRef.value.getBoundingClientRect()

  if (rect.right >= window.innerWidth) {
    style.left = `${window.innerWidth - rect.right - 20}px`
  }
  if (rect.bottom >= window.innerHeight) {
    style.top = `${window.innerHeight - rect.bottom - 20}px`
  }
  if (rect.left <= 0) {
    style.left = `0px`
  }
  if (rect.top <= 0) {
    style.top = `0px`
  }

  return style
}

const calculateMenuStyle = () => {
  const style: Record<string, string> = { position: 'absolute' }

  style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  style.height = typeof props.height === 'number' ? `${props.height}px` : props.height

  switch (props.location) {
    case 'top':
      style.bottom = `${menuWrapperRef.value?.offsetHeight || 0}px`
      style.left = '0px'
      break
    case 'right':
      style.top = '0px'
      style.left = `${menuWrapperRef.value?.offsetWidth || 0}px`
      break
    case 'bottom':
      style.top = `${menuWrapperRef.value?.offsetHeight || 0}px`
      style.left = '0px'
      break
    case 'left':
      style.top = '0px'
      style.right = `${menuWrapperRef.value?.offsetWidth || 0}px`
      break
  }

  menuStyle.value = style

  nextTick(() => {
    const positionStyle = handleMenuPosition()
    menuStyle.value = { ...style, ...positionStyle }
  })
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(isActive, async () => {
  if (isActive.value) {
    await nextTick()
    calculateMenuStyle()
  }
})
</script>
<template>
  <div ref="menuWrapperRef" class="menu__wrapper w-max">
    <slot
      name="activator"
      :props="{
        onClick: () => (isActive = !isActive),
        style: { cursor: 'pointer' },
        'aria-haspopup': 'menu',
        'aria-expanded': isActive,
        'aria-controls': `menu-${id}`,
      }"
    />
    <transition name="menu">
      <div
        v-show="isActive"
        :id="`menu-${id}`"
        ref="menuContentRef"
        :style="menuStyle"
        class="menu__content shadow-md"
        role="menu"
        tabindex="-1"
      >
        <slot />
      </div>
    </transition>
  </div>
</template>
<style scoped>
.menu__wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.menu__content {
  position: absolute;
  right: 0;
  z-index: 12;
  min-width: 100%;
}
.menu__content-active {
  display: block;
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.2s ease;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>
