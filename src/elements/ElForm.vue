<script setup lang="ts">
import { provide, ref } from 'vue'

const emits = defineEmits(['submit'])

const errors = ref<Record<string, string | null | undefined>>({})

const validateFields = ref<Record<string, () => boolean>>({})

const formSubmit = () => {
  const res = Object.entries(validateFields.value).every((v) => v[1]())

  if (Object.values(errors.value).filter(Boolean).length == 0 && res) {
    emits('submit')
  }
}

const registerValidation = (id: string, validateFn: () => boolean) => {
  validateFields.value = {
    ...validateFields.value,
    [id]: validateFn,
  }
}

const unregisterValidation = (id: string) => {
  delete validateFields.value[id]
}

const registerError = (field: string, err: string | null | undefined) => {
  errors.value[field] = err
}

const unregisterError = (field: string) => {
  delete errors.value[field]
}

provide('registerValidation', registerValidation)
provide('unregisterValidation', unregisterValidation)
provide('registerError', registerError)
provide('unregisterError', unregisterError)
</script>
<template>
  <form @submit.prevent="formSubmit()">
    <slot :is-valid="Object.keys(errors).filter((e) => !!errors[e]).length == 0" />
  </form>
</template>
