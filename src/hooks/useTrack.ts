import React, { useRef, useState } from 'react';

import useEventListeners from './useEventListeners';


// Defines
const IS_TOUCHABLE = navigator.maxTouchPoints > 0;
const TRACK_SWIPE_SPEED = 0.5;
const POINTER_EVENT = {
  down: IS_TOUCHABLE ? 'touchstart' : 'mousedown',
  up: IS_TOUCHABLE ? 'touchend' : 'mouseup',
  leave: IS_TOUCHABLE ? 'touchcancel' : 'mouseleave',
  move: IS_TOUCHABLE ? 'touchmove' : 'mousemove'
}


// Functions
const getPointerEventPageX = (event: Event): number => {
  if (IS_TOUCHABLE) {
    return (event as TouchEvent).touches[0].pageX;
  }
  return (event as MouseEvent).pageX;
}


// Main
export default function useTrack(trackCount: number): [number, React.Dispatch<React.SetStateAction<number>>, React.RefObject<HTMLDivElement>] {
  const [trackIndex, setTrackIndex] = useState(0);
  const [anchor, setAnchor] = useState({active: false, movement: 0, previousPageX: 0});
  const trackBarRef = useRef<HTMLDivElement>(null);

  useEventListeners(trackBarRef, [POINTER_EVENT.up, POINTER_EVENT.down, POINTER_EVENT.leave, POINTER_EVENT.move], event => {
    if ([POINTER_EVENT.up, POINTER_EVENT.leave].includes(event.type)) {
      if (anchor.active) setAnchor({...anchor, active: false});
      console.log('> stop');
      return;
    }
    if (event.type === POINTER_EVENT.down) {
      setAnchor({active: true, movement: 0, previousPageX: getPointerEventPageX(event)});
      console.log('> start');
      return;
    }
    if (event.type === POINTER_EVENT.move) {
      if (!anchor.active) return;
      const currentPageX = getPointerEventPageX(event);
      let currentMovement = anchor.movement + currentPageX - anchor.previousPageX;
      const trackSegmentLength = trackBarRef.current!.offsetWidth / trackCount * TRACK_SWIPE_SPEED;
      if (Math.abs(currentMovement) > trackSegmentLength) {
        const sign = Math.sign(currentMovement);
        currentMovement += -sign * trackSegmentLength;
        setTrackIndex((((trackIndex + sign) % trackCount) + trackCount) % trackCount);
      }
      setAnchor({...anchor, movement: currentMovement, previousPageX: currentPageX});
    }
  }, {passive: true});

  return [trackIndex, setTrackIndex, trackBarRef];
}
