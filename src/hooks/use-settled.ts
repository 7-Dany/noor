import { useEffect, useState } from "react"

export function useSettled<T>(value: T, ms = 150) {
  const [shown, setShown] = useState(value)

  useEffect(() => {
    if (value === shown) return
    const timer = window.setTimeout(() => setShown(value), ms)
    return () => window.clearTimeout(timer)
  }, [value, shown, ms])

  return { shown, swapping: value !== shown }
}
