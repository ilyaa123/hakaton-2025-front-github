<script setup lang="ts">
import { inject, ref, watch, computed, onMounted } from 'vue'

interface Props {
  value?: unknown
}

const props = defineProps<Props>()
const itemRef = ref<HTMLElement | null>(null)

const slideGroup = inject<{
  getSelectedValue: () => unknown
  scrollToItem: (item: HTMLElement) => void
  select: (id: unknown) => void
}>('slide-group')

const isSelected = computed(() => slideGroup?.getSelectedValue() == props.value)

watch(isSelected, (selected) => {
  if (selected && itemRef.value) {
    slideGroup?.scrollToItem(itemRef.value)
  }
})

onMounted(() => {
  if (isSelected.value && itemRef.value) {
    slideGroup?.scrollToItem(itemRef.value)
  }
})
</script>

<template>
  <div ref="itemRef" class="flex-shrink-0 max-w-full" @click="slideGroup?.select(value)">
    <slot :is-selected="isSelected" :select="() => slideGroup?.select(props.value)" />
  </div>
</template>
