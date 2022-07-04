import React, {useCallback, useState, useRef, useEffect} from 'react';


interface Size {
  width: number,
  height: number
}


export default function useElementSize<T extends HTMLElement>(): [
  React.RefObject<T>, Size
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({width: 0, height: 0});

  // get size
  const handleSize = useCallback(() => {
    setSize({
      width: ref.current?.offsetWidth || 0,
      height: ref.current?.offsetHeight || 0
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.offsetWidth, ref.current?.offsetHeight]);

  // resize event
  useEffect(() => {
    window.addEventListener('resize', handleSize);
    return () => {
      window.removeEventListener('resize', handleSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  // fire once at first
  useEffect(() => {
    handleSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return [ref, size];
}
