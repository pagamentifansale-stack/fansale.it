import { useState, useEffect } from 'react'

export function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState<{
    minutes: number
    seconds: number
    expired: boolean
  }>({ minutes: 0, seconds: 0, expired: false })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const diff = target - now

      if (diff <= 0) {
        setTimeLeft({ minutes: 0, seconds: 0, expired: true })
        clearInterval(interval)
        return
      }

      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setTimeLeft({ minutes, seconds, expired: false })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return timeLeft
}
