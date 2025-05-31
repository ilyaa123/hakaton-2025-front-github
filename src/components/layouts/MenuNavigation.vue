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
  <el-sheet color="surface" class="rounded-xl" style="padding: 10px">
    <ul class="space-y-2">
      <li
        v-for="item in menu"
        :key="item.to"
        class="bg-primary text-on-primary px-4 py-2 rounded-lg hover:bg-secondary hover:text-on-secondary transition-colors duration-200"
      >
        <router-link :to="item.to" class="block w-full">
          {{ item.title }}
        </router-link>
      </li>
    </ul>
  </el-sheet>
</template>
