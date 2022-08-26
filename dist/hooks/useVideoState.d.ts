import React from 'react';
export declare type VideoState = {
    isPlaying: boolean;
    isLoading: boolean;
    currentTime: number;
    duration: number;
    volume: number;
    muted: boolean;
};
export default function useVideoState(): [React.RefObject<HTMLVideoElement>, VideoState];
