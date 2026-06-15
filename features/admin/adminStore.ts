import { create } from 'zustand'
import { Order, User } from '@/types'

interface AdminState {
  flaggedOrders: Order[]
  flaggedUsers: User[]
  loading: boolean
  setFlaggedOrders: (orders: Order[]) => void
  setFlaggedUsers: (users: User[]) => void
  setLoading: (loading: boolean) => void
}

export const useAdminStore = create<AdminState>((set) => ({
  flaggedOrders: [],
  flaggedUsers: [],
  loading: false,
  setFlaggedOrders: (orders) => set({ flaggedOrders: orders }),
  setFlaggedUsers: (users) => set({ flaggedUsers: users }),
  setLoading: (loading) => set({ loading }),
}))
