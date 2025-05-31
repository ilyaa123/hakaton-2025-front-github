<script setup lang="ts">
import Chart from '@/components/Chart.vue'
</script>
<template>
  <chart :labels="['10:00', '11:00', '12:00', '13:00']" :data="[5, 12, 8, 14]" />
</template>
