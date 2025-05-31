type EventHandler<T = any> = (payload: T) => void

class EventBus {
  private listeners = new Map<string, Set<EventHandler>>()

  on<T = any>(event: string, handler: EventHandler<T>) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set())
    }
    this.listeners.get(event)!.add(handler as EventHandler)
  }

  off<T = any>(event: string, handler: EventHandler<T>) {
    this.listeners.get(event)?.delete(handler as EventHandler)
  }

  emit<T = any>(event: string, payload?: T) {
    this.listeners.get(event)?.forEach((handler) => {
      handler(payload)
    })
  }

  clear(event: string) {
    this.listeners.delete(event)
  }
}

export const eventBus = new EventBus()
