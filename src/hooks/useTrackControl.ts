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
export default function useTrackControl(trackCount: number): [number, React.Dispatch<React.SetStateAction<number>>, React.RefObject<HTMLDivElement>] {
  const [trackCurrentIndex, setTrackCurrentIndex] = useState(0);
  const [mouseState, setMouseState] = useState({active: false, movement: 0, previousPageX: 0});
  const trackBarRef = useRef<HTMLDivElement>(null);

  // Detect mouse state
  useEventListeners(trackBarRef, [POINTER_EVENT.up, POINTER_EVENT.down, POINTER_EVENT.leave, POINTER_EVENT.move], event => {
    switch (event.type) {
      // Cancel
      case POINTER_EVENT.up:
      case POINTER_EVENT.leave:
        if (mouseState.active) setMouseState({...mouseState, active: false});
        break;
      // Click
      case POINTER_EVENT.down:
        setMouseState({active: true, movement: 0, previousPageX: getPointerEventPageX(event)});
        break;
      // Move
      case POINTER_EVENT.move:
        if (!mouseState.active) return;
        const currentPageX = getPointerEventPageX(event);
        let currentMovement = mouseState.movement + currentPageX - mouseState.previousPageX;
        const trackSegmentLength = trackBarRef.current!.offsetWidth / trackCount * TRACK_SWIPE_SPEED;
        if (Math.abs(currentMovement) > trackSegmentLength) {
          const sign = Math.sign(currentMovement);
          currentMovement += -sign * trackSegmentLength;
          setTrackCurrentIndex((((trackCurrentIndex + sign) % trackCount) + trackCount) % trackCount);
        }
        setMouseState({...mouseState, movement: currentMovement, previousPageX: currentPageX});
        break;
      // Bypass
      default:
    }
  }, {passive: true});
  useEventListeners(trackBarRef, ['dragstart', 'drop'], event => {
    switch (event.type) {
      case 'dragstart':
      case 'drop':
        event.preventDefault();
        break;
      default:
    }
  });

  return [trackCurrentIndex, setTrackCurrentIndex, trackBarRef];
}
