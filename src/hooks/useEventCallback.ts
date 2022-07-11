import React, {useCallback, useEffect} from 'react';


export default function useEventCallback(ref: React.RefObject<HTMLElement>, eventNames: string[], callback: (event: Event) => void): void {
  const handleCallback = useCallback(callback, [ref]);
  useEffect(() => {
    eventNames.map(eventName => ref.current!.addEventListener(eventName, handleCallback));
    return () => {
      eventNames.map(eventName => ref.current!.removeEventListener(eventName, handleCallback));
    };
  }, [handleCallback])
}
