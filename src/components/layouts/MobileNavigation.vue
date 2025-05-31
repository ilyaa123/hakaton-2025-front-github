<script setup lang="ts">
type MenuItem = {
  title: string
  to: string
}

interface Props {
  menu?: MenuItem[]
}

withDefaults(defineProps<Props>(), {
  menu: () => [],
})
</script>

<template>
  <div class="flex flex-col justify-between min-h-[90dvh] p-4">
    <nav class="flex flex-col gap-4">
      <ul class="space-y-2">
        <li v-for="item in menu" :key="item.to">
          <router-link :to="item.to" class="block text-on-surface hover:underline text-base">
            {{ item.title }}
          </router-link>
        </li>
      </ul>
    </nav>

    <div>
      <slot name="bottom" />
    </div>
  </div>
</template>
