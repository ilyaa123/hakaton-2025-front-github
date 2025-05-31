<script setup lang="ts">
type Breadcrumb = {
  title?: string
  path: string
}

interface Props {
  breadcrumbs: Breadcrumb[]
  color?: string
}

withDefaults(defineProps<Props>(), {
  color: 'primary',
})
</script>
<template>
  <nav aria-label="breadcrumb" itemscope itemtype="https://schema.org/BreadcrumbList">
    <ol class="mos__breadcrumbs flex flex-wrap" role="list">
      <li
        v-for="(crumb, index) in breadcrumbs"
        :key="index"
        class="mos__breadcrumbs-item"
        role="listitem"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <router-link :to="crumb.path">
          <span itemprop="name">{{ crumb.title }}</span>
          <meta itemprop="position" :content="(index + 1).toString()" />
        </router-link>
      </li>
    </ol>
  </nav>
</template>
<style scoped>
.mos__breadcrumbs {
  list-style: none;
  padding: 0;
}

.mos__breadcrumbs-item + .mos__breadcrumbs-item::before {
  content: ' / ';
  padding: 0 4px 0 7px;
}
</style>
