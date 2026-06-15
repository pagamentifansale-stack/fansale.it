import { create } from 'zustand'
import { User } from '@/types'

interface ProfileState {
  profile: User | null
  setProfile: (profile: User | null) => void
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
}))
