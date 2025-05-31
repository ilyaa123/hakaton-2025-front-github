import { h, render, reactive, watch } from 'vue'
import ElAlertContainer from '@/elements/ElAlert/ElAlertContainer.vue'
import ElAlertItem from '@/elements/ElAlert/ElAlertItem.vue'

interface AlertOptions {
  color?: string
  position?: InstanceType<typeof ElAlertContainer>['$props']['position']
  timeout?: number
  closeIcon?: string
}

interface Alert {
  id: string
  message: string
  options?: AlertOptions
}

const alerts = reactive<Alert[]>([])
let containerMounted = false

const removeAlert = (id: string) => {
  const index = alerts.findIndex((alert) => alert.id === id)
  if (index !== -1) alerts.splice(index, 1)
}

export const showAlert = (message: string, options?: AlertOptions) => {
  const alertRoot = document.getElementById('alerts')

  if (!alertRoot) return

  if (!containerMounted) {
    const containerNode = h(ElAlertContainer, { position: options?.position || 'bottom' }, () =>
      alerts.map((alert) =>
        h(ElAlertItem, {
          key: alert.id,
          message: alert.message,
          color: alert.options?.color,
          'onClick:close': () => removeAlert(alert.id),
        }),
      ),
    )

    render(containerNode, alertRoot)
    containerMounted = true

    watch(
      () => alerts.length,
      (newLength) => {
        if (newLength === 0) {
          render(null, alertRoot)
          containerMounted = false
        }
      },
    )
  }

  const id = `${Date.now()}-${Math.random()}`
  alerts.push({ id, message, options })

  setTimeout(() => {
    removeAlert(id)
  }, options?.timeout || 5000)
}
