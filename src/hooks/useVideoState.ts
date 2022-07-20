import React, { useRef, useState } from 'react';
import useEventListeners from './useEventListeners';


type VideoState = {
  isPlaying: boolean;
  isWaiting: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
}


export default function useVideoState(): [React.RefObject<HTMLVideoElement>, VideoState, React.RefObject<HTMLDivElement>] {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isWaiting: false,
    currentTime: 0,
    duration: 0,
    volume: 0,
    muted: true
  });
  const timebarRef = useRef<HTMLDivElement>(null);

  useEventListeners(videoRef,
    [
      'pause', 'playing', 'waiting', 'canplay',
      'durationchange', 'timeupdate', 'volumechange'], event => {
    switch (event.type) {
      // Initial
      case 'canplay':
        setVideoState({
          ...videoState,
          isPlaying: !videoRef.current!.paused,
          currentTime: videoRef.current!.currentTime,
          volume: videoRef.current!.volume,
          muted: videoRef.current!.muted
        });
        break;
      // Duration
      case 'durationchange':
        setVideoState({
          ...videoState,
          duration: videoRef.current!.duration
        });
        break;
      // Current time
      case 'timeupdate':
        setVideoState({
          ...videoState,
          currentTime: videoRef.current!.currentTime
        });
        break;
      // Play
      case 'playing':
        setVideoState({
          ...videoState,
          isPlaying: true,
          isWaiting: false,
          currentTime: videoRef.current!.currentTime
        });
        break;
      // Pause
      case 'pause':
        setVideoState({
          ...videoState,
          isPlaying: false
        });
        break;
      // Waiting
      case 'waiting':
        setVideoState({
          ...videoState,
          isWaiting: true
        })
        break;
      // Volume
      case 'volumechange':
        setVideoState({
          ...videoState,
          volume: videoRef.current!.volume,
          muted: videoRef.current!.muted
        })
        break;
      // Bypass
      default:
        console.log(event.type)
    }
  });

  useEventListeners(timebarRef, ['click'], event => {
    const seekRatio = (event as PointerEvent).offsetX / timebarRef.current!.offsetWidth;
    videoRef.current!.currentTime = seekRatio * videoState.duration;
  });

  return [videoRef, videoState, timebarRef];
}