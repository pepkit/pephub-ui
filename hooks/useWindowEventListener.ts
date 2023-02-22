/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useEffect } from 'react'

export const useWindowEventListener = (
  eventName: string,
  handler: (e: Event) => void
) => {
  // Create a ref that stores handler
  const savedHandler = useRef(null)

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    // @ts-ignore
    savedHandler.current = handler
  }, [handler])

  useEffect(
    () => {
      // Create event listener that calls handler function stored in ref
      // @ts-ignore
      const eventListener = (event: Event) => savedHandler.current(event)

      // Add event listener
      window.addEventListener(eventName, eventListener)

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener(eventName, eventListener)
      }
    },
    [eventName] // Re-run if eventName or element changes
  )
}
