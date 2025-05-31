<script setup lang="ts">
import { inject, onMounted, onUnmounted, useId, watch } from 'vue'

type RuleFn = (e: string) => boolean | string

interface Props {
  label?: string
  required?: boolean
  rows?: number
  rules?: RuleFn[]
}

const props = withDefaults(defineProps<Props>(), {
  rows: 4,
})

const value = defineModel<string>({
  default: '',
})

const id = useId()

const errorMessage = defineModel<string | null>('error', {
  default: null,
})

const validate = () => {
  if (props.rules) {
    for (const rule of props.rules) {
      const result = rule(value.value)
      if (typeof result === 'string') {
        errorMessage.value = result
        return false
      }
    }
  }
  errorMessage.value = null
  return true
}

const registerValidation = inject('registerValidation', () => {}) as (
  id: string,
  fn: () => boolean,
) => void

const unregisterValidation = inject('unregisterValidation', () => {}) as (id: string) => void

const registerError = inject('registerError', () => {}) as (
  field: string,
  err: string | null | undefined,
) => void

const unregisterError = inject('unregisterError', () => {}) as (field: string) => void

watch(value, () => {
  validate()
})

watch(errorMessage, () => {
  registerError?.(`textarea-field-${id}`, errorMessage.value)
})

onMounted(() => {
  registerValidation?.(`textarea-field-${id}`, validate)
})

onUnmounted(() => {
  unregisterValidation?.(`textarea-field-${id}`)
  unregisterError?.(`textarea-field-${id}`)
})
</script>

<template>
  <div>
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-on-surface">
      {{ label }}
    </label>

    <textarea
      v-model="value"
      :id="id"
      :placeholder="label"
      :required="required"
      :rows="rows"
      class="outline-none block w-full resize-none bg-surface border border-on-surface text-on-surface text-sm rounded-lg px-2.5 py-1"
      style="min-height: 80px"
    />

    <p v-if="errorMessage" class="mt-2 text-sm text-error font-medium">
      {{ errorMessage }}
    </p>
  </div>
</template>
