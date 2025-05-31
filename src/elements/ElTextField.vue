<script setup lang="ts">
import { inject, onMounted, onUnmounted, useId, watch } from 'vue'

type RuleFn = (e: string) => boolean | string

interface Props {
  label?: string
  type?: HTMLInputElement['type']
  required?: boolean
  rules?: RuleFn[]
}

const props = defineProps<Props>()

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
  if (registerError) {
    registerError(`text-field-${id}`, errorMessage.value)
  }
})

onMounted(() => {
  if (registerValidation) registerValidation(`text-field-${id}`, validate)
})

onUnmounted(() => {
  if (unregisterValidation) unregisterValidation(`text-field-${id}`)
  if (unregisterError) {
    unregisterError(`text-field-${id}`)
  }
})
</script>
<template>
  <div>
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-on-surface">{{
      label
    }}</label>
    <div
      class="flex w-full gap-2 items-center justify-start bg-surface border border-on-surface text-on-surface text-sm rounded-lg px-2.5 py-1"
    >
      <slot name="prependInner" />
      <input
        v-model="value"
        :id="id"
        :type="type"
        :placeholder="label"
        :required="required"
        class="outline-none block w-full"
        style="min-height: 30px"
      />
      <slot name="appendInner" />
    </div>

    <p v-if="errorMessage" class="mt-2 text-sm text-error font-medium">
      {{ errorMessage }}
    </p>
  </div>
</template>
