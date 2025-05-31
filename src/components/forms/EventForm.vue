<script setup lang="ts">
import vMask from '@/directives/mask'

const emits = defineEmits(['submit'])

const form = defineModel<{ title: string; description: string; date: string; location: string }>({
  default: {
    title: '',
    description: '',
    date: '',
    location: '',
  },
})
</script>
<template>
  <el-form @submit="emits('submit')">
    <el-text-field
      v-model="form.title"
      :rules="[(e) => !!e || 'Это поле обязательное']"
      class="mb-4"
      label="Название"
    />
    <el-textarea
      v-model="form.description"
      :rules="[(e) => !!e || 'Это поле обязательное']"
      class="mb-4"
      label="Описание"
    />
    <el-text-field
      v-model="form.date"
      v-mask="'##.##.####'"
      :rules="[(e) => !!e || 'Это поле обязательное']"
      class="mb-4"
      label="Дата"
    />
    <el-text-field
      v-model="form.location"
      :rules="[(e) => !!e || 'Это поле обязательное']"
      class="mb-4"
      label="Место проведения"
    />
    <slot name="actions" />
  </el-form>
</template>
