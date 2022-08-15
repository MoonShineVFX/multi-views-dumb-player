import React, {useRef, useState} from 'react';
import useEventListeners from './useEventListeners';


export type VideoState = {
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
}


export default function useVideoState(): [React.RefObject<HTMLVideoElement>, VideoState] {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoState, setVideoState] = useState<VideoState>({
    isPlaying: false,
    isLoading: true,
    currentTime: 0,
    duration: 0,
    volume: 0,
    muted: true
  });

  useEventListeners(videoRef,
    [
      'pause', 'playing', 'waiting', 'canplay', 'seeking', 'seeked',
      'durationchange', 'timeupdate', 'volumechange'], event => {
    switch (event.type) {
      // Initial
      case 'canplay':
        setVideoState({
          ...videoState,
          isPlaying: !videoRef.current!.paused,
          isLoading: false,
          currentTime: videoRef.current!.currentTime,
          volume: videoRef.current!.volume,
          muted: videoRef.current!.muted,
          duration: videoRef.current!.duration
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
      case 'seeked':
      case 'playing':
        setVideoState({
          ...videoState,
          isPlaying: true,
          isLoading: false,
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
      case 'seeking':
        setVideoState({
          ...videoState,
          isLoading: true
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

  return [videoRef, videoState];
}