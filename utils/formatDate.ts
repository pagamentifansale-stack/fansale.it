import { format, formatDistanceToNow, isAfter } from 'date-fns'

export function formatEventDate(date: string): string {
  return format(new Date(date), 'EEEE, d MMMM yyyy')
}

export function formatEventTime(date: string): string {
  return format(new Date(date), 'HH:mm')
}

export function formatRelativeTime(date: string): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

export function isEventUpcoming(date: string): boolean {
  return isAfter(new Date(date), new Date())
}
