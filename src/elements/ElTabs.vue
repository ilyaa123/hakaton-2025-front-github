<script setup lang="ts">
import { computed } from 'vue'

type Tab = {
  title: string
  key: string | number
}

interface Props {
  tabs: Tab[]
  color?: string
  vertical?: boolean
  block?: boolean
  contentNoGutter?: boolean
  spacing?: string | number
  maxWidth?: string | number
  showArrows?: boolean
  hideTabs?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  color: 'secondary',
  vertical: false,
  size: 'base',
  rounded: 'sm',
  spacing: 5,
  showArrows: true,
})

const active = defineModel<string | number | null>({ default: null })

const computedActive = computed(() => (active.value ? active.value : props.tabs[0]?.key))
</script>
<template>
  <div
    :class="vertical ? 'grid grid-rows-1' : 'flex flex-col '"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
    class="gap-4"
    style="grid-template-columns: 280px 1fr"
  >
    <el-slide-group
      v-if="!hideTabs"
      :model-value="computedActive"
      :direction="vertical ? 'vertical' : 'horizontal'"
      :block-items="block"
      @update:model-value="(value) => (active = value as string | number | null)"
    >
      <el-slide-group-item v-if="!!$slots['prepend-innder-tab']" value="prepend-innder-tab">
        <slot name="prepend-innder-tab" />
      </el-slide-group-item>
      <el-slide-group-item v-for="tab in tabs" :key="tab.key" :value="tab.key">
        <template #default="{ isSelected }">
          <el-button
            class="h-full"
            :color="isSelected ? color : 'primary'"
            :active="isSelected"
            :aria-selected="isSelected"
            variant="flat"
            block
            role="tab"
          >
            {{ tab.title }}
          </el-button>
        </template>
      </el-slide-group-item>
      <el-slide-group-item v-if="!!$slots['append-innder-tab']" value="append-innder-tab">
        <slot name="append-innder-tab" />
      </el-slide-group-item>
    </el-slide-group>

    <div v-if="Object.keys($slots).length > 0" class="w-full">
      <template v-for="tab in tabs" :key="tab.key">
        <el-sheet
          v-if="tab.key == computedActive"
          :class="contentNoGutter ? '' : 'p-2 md:p-5'"
          class="w-full"
        >
          <slot :name="tab.key" />
        </el-sheet>
      </template>
    </div>
  </div>
</template>
