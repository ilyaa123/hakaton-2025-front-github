<script setup lang="ts">
import { ref, computed, onMounted, provide } from 'vue'

interface Props {
  direction?: 'horizontal' | 'vertical'
  blockItems?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
})

const containerRef = ref<HTMLElement | null>(null)
const isScrollable = ref(false)
const atStart = ref(true)
const atEnd = ref(false)

const selectedValue = defineModel<unknown>({
  default: null,
})

const isHorizontal = computed(() => props.direction === 'horizontal')

const checkScrollable = () => {
  if (!containerRef.value) return

  const containerSize = isHorizontal.value
    ? containerRef.value.clientWidth
    : containerRef.value.clientHeight
  const contentSize = isHorizontal.value
    ? containerRef.value.scrollWidth
    : containerRef.value.scrollHeight

  isScrollable.value = contentSize > containerSize
  updateArrows()
}

const updateArrows = () => {
  if (!containerRef.value) return

  const scrollPos = isHorizontal.value
    ? containerRef.value.scrollLeft
    : containerRef.value.scrollTop
  const maxScroll = isHorizontal.value
    ? containerRef.value.scrollWidth - containerRef.value.clientWidth
    : containerRef.value.scrollHeight - containerRef.value.clientHeight

  atStart.value = scrollPos <= 1
  atEnd.value = scrollPos >= maxScroll - 1
}

const scrollToItem = async (item: HTMLElement) => {
  if (!containerRef.value || !item) return

  const container = containerRef.value
  const itemRect = item.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  const offset =
    itemRect.left - containerRect.left - container.clientWidth / 2 + item.clientWidth / 2

  container.scrollBy({
    left: isHorizontal.value ? offset : 0,
    top: isHorizontal.value ? 0 : offset,
    behavior: 'smooth',
  })
}

const scrollNext = () => {
  if (!containerRef.value) return
  const scrollAmount = isHorizontal.value
    ? containerRef.value.clientWidth * 0.8
    : containerRef.value.clientHeight * 0.8
  containerRef.value.scrollBy({
    left: isHorizontal.value ? scrollAmount : 0,
    top: isHorizontal.value ? 0 : scrollAmount,
    behavior: 'smooth',
  })
}

const scrollPrev = () => {
  if (!containerRef.value) return
  const scrollAmount = isHorizontal.value
    ? containerRef.value.clientWidth * 0.8
    : containerRef.value.clientHeight * 0.8
  containerRef.value.scrollBy({
    left: isHorizontal.value ? -scrollAmount : 0,
    top: isHorizontal.value ? 0 : -scrollAmount,
    behavior: 'smooth',
  })
}

provide('slide-group', {
  getSelectedValue: () => selectedValue.value,
  scrollToItem: scrollToItem,
  select: (value: unknown) => (selectedValue.value = value),
})

onMounted(() => {
  checkScrollable()

  if (containerRef.value) {
    containerRef.value.addEventListener('scroll', updateArrows)
    window.addEventListener('resize', checkScrollable)
  }
})
</script>
<template>
  <div class="relative">
    <div
      ref="containerRef"
      class="gap-2 overflow-x-auto scroll-smooth hide-scrollbar"
      :class="{
        'flex-row': isHorizontal,
        'flex-col h-full': !isHorizontal,
        'grid grid-flow-col md:auto-cols-fr': blockItems,
        flex: !blockItems,
      }"
    >
      <slot
        :next="scrollNext"
        :prev="scrollPrev"
        :select="(v: unknown) => (selectedValue = v)"
        :is-selected="(v: unknown) => selectedValue == v"
      />
    </div>
  </div>
</template>
<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
