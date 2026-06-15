import { useCheckoutStore } from './checkoutStore'

export function useCheckout() {
  const store = useCheckoutStore()
  return store
}
