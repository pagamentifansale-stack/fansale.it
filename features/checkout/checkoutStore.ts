import { create } from 'zustand'
import { Ticket, CheckoutStep, AttendeeInfo } from '@/types'

interface CheckoutState {
  ticket: Ticket | null
  currentStep: number
  steps: CheckoutStep[]
  buyerInfo: {
    fullName: string
    email: string
    phone: string
    address: string
  } | null
  attendees: AttendeeInfo[]
  deliveryMethod: string | null
  paymentIntentId: string | null
  setTicket: (ticket: Ticket) => void
  setCurrentStep: (step: number) => void
  setBuyerInfo: (info: CheckoutState['buyerInfo']) => void
  setAttendees: (attendees: AttendeeInfo[]) => void
  setDeliveryMethod: (method: string) => void
  setPaymentIntentId: (id: string) => void
  reset: () => void
}

const defaultSteps: CheckoutStep[] = [
  { id: 'account', label: 'Account', completed: false, active: true },
  { id: 'details', label: 'Details', completed: false, active: false },
  { id: 'delivery', label: 'Delivery', completed: false, active: false },
  { id: 'payment', label: 'Payment', completed: false, active: false },
  { id: 'confirmation', label: 'Confirmed', completed: false, active: false },
]

export const useCheckoutStore = create<CheckoutState>((set) => ({
  ticket: null,
  currentStep: 0,
  steps: defaultSteps,
  buyerInfo: null,
  attendees: [],
  deliveryMethod: null,
  paymentIntentId: null,
  setTicket: (ticket) => set({ ticket }),
  setCurrentStep: (step) => set((state) => ({
    currentStep: step,
    steps: state.steps.map((s, i) => ({
      ...s,
      active: i === step,
      completed: i < step,
    })),
  })),
  setBuyerInfo: (info) => set({ buyerInfo: info }),
  setAttendees: (attendees) => set({ attendees }),
  setDeliveryMethod: (method) => set({ deliveryMethod: method }),
  setPaymentIntentId: (id) => set({ paymentIntentId: id }),
  reset: () => set({ ticket: null, currentStep: 0, steps: defaultSteps, buyerInfo: null, attendees: [], deliveryMethod: null, paymentIntentId: null }),
}))
