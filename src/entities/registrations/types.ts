export type RegisteredEvent = {
  check_in_time: string | null
  check_out_time: string | null
  id: number | null
  registered_at: string
  status: 'expect' | 'registered' | 'present' | 'cancelled' | 'attended'
  user_info: {
    id: 2
    first_name: string
    last_name: string
    email: string
  }
}
