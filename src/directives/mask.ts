import type { Directive, DirectiveBinding } from 'vue'

type MaskChar = '#' | 'A' | 'N' | 'X' | string

interface MaskBinding extends DirectiveBinding {
  value: string
}

interface HTMLInputElementWithMask extends HTMLInputElement {
  _vMaskCleanup?: () => void
}

const applyMask = (value: string, mask: string): string => {
  if (!value) return ''
  let maskedValue = ''
  let maskIndex = 0
  let valueIndex = 0

  while (maskIndex < mask.length && valueIndex < value.length) {
    const maskChar: MaskChar = mask[maskIndex] as MaskChar
    const valueChar: string = value[valueIndex]

    switch (maskChar) {
      case '#':
        if (/\d/.test(valueChar)) {
          maskedValue += valueChar
          valueIndex++
        }
        break
      case 'A':
        if (/[a-zA-Zа-яА-Я]/.test(valueChar)) {
          maskedValue += valueChar
          valueIndex++
        }
        break
      case 'N':
        if (/[a-zA-Zа-яА-Я0-9]/.test(valueChar)) {
          maskedValue += valueChar
          valueIndex++
        }
        break
      case 'X':
        maskedValue += valueChar
        valueIndex++
        break
      default:
        maskedValue += maskChar
        if (valueChar === maskChar) {
          valueIndex++
        }
        break
    }

    maskIndex++
  }

  return maskedValue
}

const vMask: Directive = {
  beforeMount(el: HTMLInputElementWithMask, binding: MaskBinding) {
    const mask: string = binding.value

    if (!mask) {
      return
    }

    let isInternalUpdate = false

    const handleInput = (event: Event): void => {
      const input = event.target as HTMLInputElement

      if (isInternalUpdate) return

      const unmaskedValue = input.value.replace(/[^a-zA-Zа-яА-Я0-9]/g, '')
      const maskedValue = applyMask(unmaskedValue, mask)

      if (maskedValue !== input.value) {
        setTimeout(() => {
          isInternalUpdate = true

          input.value = maskedValue
          input.dispatchEvent(new Event('input'))
          isInternalUpdate = false
        }, 0)
      }
    }

    el.addEventListener('input', handleInput)

    el._vMaskCleanup = (): void => {
      el.removeEventListener('input', handleInput)
    }
  },
  unmounted(el: HTMLInputElementWithMask) {
    if (el._vMaskCleanup) {
      el._vMaskCleanup()
      delete el._vMaskCleanup
    }
  },
}

export default vMask
