<script setup lang="ts">
import ElAlertContainer from './ElAlertContainer.vue'

import ElAlertItem from './ElAlertItem.vue'

interface Props {
  position?: InstanceType<typeof ElAlertContainer>['$props']['position']
  message?: string
  color?: string
}

const emits = defineEmits(['click:close'])

withDefaults(defineProps<Props>(), {
  position: 'bottom',
})
</script>
<template>
  <el-alert-container :position="position">
    <el-alert-item :message="message" :color="color" @click:close="emits('click:close')" />
  </el-alert-container>
</template>
