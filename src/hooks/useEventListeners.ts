import React, {useCallback, useEffect} from 'react';


export default function useEventListeners(
  ref: React.RefObject<HTMLElement>,
  eventNames: string[],
  callback: (event: Event) => void,
  options: AddEventListenerOptions = {}
): void {
  const handleCallback = useCallback(callback, [callback]);
  const refElement = ref.current;

  useEffect(() => {
    eventNames.map(eventName => {
      if (!refElement) return null;
      return refElement.addEventListener(eventName, handleCallback, options);
    });
    return () => {
      eventNames.map(eventName => {
        if (!refElement) return null;
        return refElement.removeEventListener(eventName, handleCallback);
      });
    };
  })
}
