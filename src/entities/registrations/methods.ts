import { api } from '@/plugins/api'

import type { RegisteredEvent } from './types'

const register = (eventId: number) =>
  api
    .post('registrations/registrations/', {
      json: {
        event: eventId,
      },
    })
    .json<RegisteredEvent>()

const checkRegistration = (eventId: number, userId: number) =>
  api
    .get(`registrations/registrations/${eventId}/check_registration/?user_id=${userId}`)
    .json<RegisteredEvent>()

interface UpdateRegistrationData {
  status: RegisteredEvent['status']
  check_in_time?: string
  check_out_time?: string
}

const updateRegistration = (eventId: number, data: UpdateRegistrationData) =>
  api.patch(`registrations/registrations/${eventId}/`, {
    json: data,
  })

export default {
  register,
  checkRegistration,
  updateRegistration,
}
