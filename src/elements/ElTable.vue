<script setup lang="ts">
type HeaderItem = {
  title: string
  key: string
}

interface Props {
  headers?: HeaderItem[]
  items?: any[]
}

withDefaults(defineProps<Props>(), {
  headers: () => [],
  items: () => [],
})
</script>
<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left">
      <thead class="text-xs uppercase bg-primary text-on-primary">
        <tr>
          <th v-for="item in headers" :key="item.key" scope="col" class="px-6 py-3">
            {{ item.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <th
            v-for="header_item in headers"
            :key="header_item.key"
            class="px-6 py-4 font-medium whitespace-nowrap"
          >
            <slot :name="`item-${header_item.key}`" :item="item">
              {{ item[header_item.key] }}
            </slot>
          </th>
        </tr>
      </tbody>
      <tbody v-if="items.length == 0">
        <tr>
          <th :colspan="headers.length">
            <div class="p-6 text-center">Тут пока ничего не найдено</div>
          </th>
        </tr>
      </tbody>
    </table>
  </div>
</template>
