<script setup lang="ts">
type BreadcrumbItem = {
  title?: string
  path: string
}

interface Props {
  breadcrumbs?: BreadcrumbItem[]
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [{ path: '/', title: 'Главная' }],
})
</script>
<template>
  <header class="bg-surface text-on-surface py-2 px-2 flex items-center justify-between rounded-lg">
    <el-breadcrumbs :breadcrumbs="breadcrumbs" />
    <slot />
  </header>
</template>
