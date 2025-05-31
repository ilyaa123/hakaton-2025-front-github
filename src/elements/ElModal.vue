<script setup lang="ts">
import { onMounted, onUnmounted, ref, useId } from 'vue'

interface Props {
  maxWidth?: string | number
  width?: string | number
  maxHeight?: string | number
  height?: string | number
  closeOnContentClick?: boolean
  closable?: boolean
  closeIcon?: string
  position?: 'top' | 'center' | 'bottom'
}

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(defineProps<Props>(), {
  closeOnContentClick: true,
  closeIcon: 'close',
  position: 'center',
})

const showing = defineModel({
  type: Boolean,
  default: false,
})

const id = useId()

const isMounted = ref(false)

const modalOverlay = ref<HTMLDivElement>()

const handleOnClickOverlay = () => {
  if (props.closeOnContentClick) {
    showing.value = false
  }
}

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    showing.value = false
  }
}

onMounted(() => {
  isMounted.value = true

  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>
<template>
  <slot
    name="activator"
    :props="{
      onClick: () => (showing = !showing),
      style: { cursor: 'pointer' },
      'aria-haspopup': <'dialog'>'dialog',
      'aria-expanded': showing,
      'aria-controls': `modal-${id}`,
    }"
  />
  <teleport v-if="isMounted" to="#modal">
    <transition name="modal">
      <div
        v-if="showing"
        ref="modalOverlay"
        :style="{ display: showing ? 'block' : 'none' }"
        class="modal-overlay"
        @click="handleOnClickOverlay"
      >
        <dialog
          v-bind="$attrs"
          :id="`modal-${id}`"
          class="modal__content mos-shadow-xl"
          :class="position"
          :open="showing"
          :style="{
            maxWidth: typeof maxWidth === 'number' ? maxWidth + 'px' : maxWidth,
            width: typeof width === 'number' ? width + 'px' : width,
            maxHeight: typeof maxHeight === 'number' ? maxHeight + 'px' : maxHeight,
            height: typeof height === 'number' ? height + 'px' : height,
          }"
          @click.stop
        >
          <slot />
        </dialog>
      </div>
    </transition>
  </teleport>
</template>
<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-overlay {
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  display: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.modal__content {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  margin: 0;
  background-color: transparent;
}

.modal__content.top {
  top: 4rem;
}

.modal__content.center {
  top: 50%;
  transform: translate(-50%, -50%);
}

.modal__content.bottom {
  bottom: 4rem;
}
.modal__controls {
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
}
</style>
