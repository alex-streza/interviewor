import { useEffect, useState } from 'react'

interface useTimerProps {
  reset?: string
  pause?: boolean
}

export default function useTimer({ pause, reset }: useTimerProps) {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    if (!pause) {
      const timer = setInterval(() => {
        setSeconds((seconds) => seconds + 1)
      }, 1000)

      return () => clearInterval(timer)
    } else {
      setSeconds(0)
    }
  }, [pause])

  useEffect(() => {
    setSeconds(0)
  }, [reset])

  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)

  return {
    seconds,
    time:
      (hours > 1 ? hours + 'h ' : '') +
      (minutes > 1 ? minutes - hours * 60 + 'm ' : '') +
      (seconds - minutes * 60 - hours * 60 * 60) +
      's',
  }
}
