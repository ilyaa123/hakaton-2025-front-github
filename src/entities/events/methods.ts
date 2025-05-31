import { api } from '@/plugins/api'

import type { Event } from './types'

const eventsApi = api.extend((options) => ({
  prefixUrl: `${options.prefixUrl}/events`,
}))

const getEvents = () => eventsApi.get('user/owned/').json<Event[]>()

interface CreateEventData {
  title: string
  description: string
  date: string
  location: string
}
const createEvent = (data: CreateEventData) =>
  eventsApi
    .post('events/', {
      json: data,
    })
    .json()

const getEvent = (id: number) => eventsApi.get(`events/${id}/`).json<Event>()

const updateEvent = (id: number, data: Partial<CreateEventData>) =>
  eventsApi
    .patch(`events/${id}/`, {
      json: data,
    })
    .json()

const deleteEvent = (id: number) => eventsApi.delete(`events/${id}`).json()

const getNotOwnedEvents = () => api.get('events/explore/not_owned/').json<Event[]>()

const getRegisteredEvents = () => eventsApi.get(`user/registered/`).json<Event[]>()

export default {
  getEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getNotOwnedEvents,
  getRegisteredEvents,
}
