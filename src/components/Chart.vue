<script setup lang="ts">
import { Chart, registerables } from 'chart.js'
import { Line } from 'vue-chartjs'

Chart.register(...registerables)

interface Props {
  labels: string[]
  data: number[]
}

const props = defineProps<Props>()

const chartData = {
  labels: props.labels,
  datasets: [
    {
      label: 'Посетителей за час',
      data: props.data,
      borderColor: '#ffffff',
      backgroundColor: 'rgba(255,255,255,0.1)',
      pointBackgroundColor: '#ffffff',
      pointRadius: 4,
      borderWidth: 3,
      fill: true,
      tension: 0.3,
    },
  ],
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#ffffff',
      },
    },
  },
  scales: {
    x: {
      ticks: { color: '#ffffff' },
      title: {
        display: true,
        text: 'Время (по часам)',
        color: '#ffffff',
      },
      grid: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
    y: {
      ticks: { color: '#ffffff' },
      title: {
        display: true,
        text: 'Кол-во человек',
        color: '#ffffff',
      },
      grid: {
        color: 'rgba(255,255,255,0.1)',
      },
    },
  },
}
</script>

<template>
  <div class="w-full h-80">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
