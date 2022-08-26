import React from 'react';
import { VideoState } from "../hooks/useVideoState";
import { ThemeColors } from '../SETTINGS';
declare type PlaybackControlProps = {
    videoRef: React.RefObject<HTMLVideoElement>;
    videoState: VideoState;
    style?: React.CSSProperties;
    colors?: ThemeColors;
};
export default function PlaybackControl(props: PlaybackControlProps): JSX.Element;
export {};
