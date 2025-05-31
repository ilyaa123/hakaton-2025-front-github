<script setup lang="ts">
type Position =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | `${'top' | 'bottom'} ${'left' | 'right'}`
  | `${'left' | 'right'} ${'top' | 'bottom'}`

interface Props {
  position?: Position
}

withDefaults(defineProps<Props>(), {
  position: 'bottom',
})
</script>

<template>
  <div
    class="fixed w-max"
    :class="{
      'top-10 right-10': position === 'top right',
      'top-10 left-10': position === 'top left',
      'bottom-10 right-10': position === 'bottom right',
      'bottom-10 left-10': position === 'bottom left',
      'top-10 left-1/2 transform -translate-x-1/2': position === 'top',
      'bottom-10 left-1/2 transform -translate-x-1/2': position === 'bottom',
      'top-1/2 left-10 transform -translate-y-1/2': position === 'left',
      'top-1/2 right-10 transform -translate-y-1/2': position === 'right',
    }"
    style="z-index: 101; max-height: 50dvh; overflow: hidden; max-width: 100%; padding: 0 10px"
    role="region"
  >
    <transition-group
      name="alert"
      tag="div"
      class="flex flex-col-reverse items-center gap-4 w-full"
      style="max-height: 100%"
      aria-live="polite"
      aria-relevant="additions"
    >
      <slot />
    </transition-group>
  </div>
</template>

<style>
.alert-enter-active,
.alert-leave-active {
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}
.alert-enter-from {
  transform: translateY(20px);
  opacity: 0;
}
.alert-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.alert-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.alert-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
