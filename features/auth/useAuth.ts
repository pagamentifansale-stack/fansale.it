import { useAuthStore } from './authStore'
import { supabase } from '@/lib/supabase'

export function useAuth() {
  const { user, loading, setUser, setLoading, logout } = useAuthStore()

  const signOut = async () => {
    await supabase.auth.signOut()
    logout()
  }

  return { user, loading, setUser, setLoading, signOut }
}
