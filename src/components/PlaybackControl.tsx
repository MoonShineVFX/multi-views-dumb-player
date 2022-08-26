import React, {useRef, useState} from 'react';

import { IconPause, IconVolumeMute, IconVolumeDown, IconVolumeOff, IconPlay, IconVolumeUp } from '../icons';

import { VideoState } from "../hooks/useVideoState";

import styles from "./PlaybackControl.module.css";
import SETTINGS from '../SETTINGS';
import {ThemeColors} from '../SETTINGS';


// PlaybackControl
type PlaybackControlProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoState: VideoState;
  style?: React.CSSProperties;
  colors?: ThemeColors;
}

export default function PlaybackControl(props: PlaybackControlProps): JSX.Element {
  // Defines
  const { videoState, videoRef } = props;
  
  // Hooks
  const [isVolumeHover, setIsVolumeHover] = useState(false);
  const timeBarRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  // Dynamic styles
  const dynamicStyle = {
    volumeSliderContainer: {
      display: isVolumeHover ? 'block' : 'none'
    },
    volumeSliderCore: {
      height: videoState.volume * 100 + '%',
      backgroundColor: videoState.muted ? props.colors?.sub || 'darkgray' : props.colors?.main || 'white'
    },
    timeBarCore: {
      width: videoState.currentTime / videoState.duration * 100 + '%',
      backgroundColor: props.colors?.main
    }
  }

  // Play button
  const onPlayButtonClick = () => {
    if (videoState.isPlaying) {
      videoRef.current!.pause();
      return
    }
    videoRef.current!.play();
  }

  // Volume slider
  const onVolumeSliderClick = (event: React.MouseEvent) => {
    if (videoRef.current!.muted) videoRef.current!.muted = false;
    videoRef.current!.volume = 1.0 - event.nativeEvent.offsetY / volumeSliderRef.current!.offsetHeight;
  }

  // Volume icon
  let VolumeButton: React.FC<React.SVGProps<SVGSVGElement>>;
  if (videoState.muted) {
    VolumeButton = IconVolumeOff;
  } else if (videoState.volume > 0.65) {
    VolumeButton = IconVolumeUp;
  } else if (videoState.volume > 0.35) {
    VolumeButton = IconVolumeDown;
  } else {
    VolumeButton = IconVolumeMute;
  }

  // Time bar
  const onTimeBarClick = (event: React.MouseEvent) => {
    const seekRatio = event.nativeEvent.offsetX / timeBarRef.current!.offsetWidth;
    videoRef.current!.currentTime = seekRatio * videoState.duration;
  }

  return <div className={styles.playbackControl} style={{...props.style, backgroundColor: props.colors?.base}}>
    <PlayButton colors={props.colors} isPlaying={videoState.isPlaying} onClick={onPlayButtonClick} />
    {
      !SETTINGS.IS_MOBILE() &&
      <div className={styles.volumeContainer}
           onMouseEnter={() => setIsVolumeHover(true)}
           onMouseLeave={() => setIsVolumeHover(false)}>
        <div className={styles.volumeSliderContainer} style={dynamicStyle.volumeSliderContainer}>
          <div ref={volumeSliderRef} className={styles.volumeSlider} style={{backgroundColor: props.colors?.base}} onClick={onVolumeSliderClick}>
            <div className={styles.volumeSliderCore} style={dynamicStyle.volumeSliderCore} />
          </div>
        </div>
        <ThemeButton
          Button={VolumeButton}
          colors={props.colors}
          className={styles.buttonIcon}
          onClick={() => videoRef.current!.muted = !videoRef!.current!.muted} />
      </div>
    }
    <TimeStampText time={videoState.currentTime} colors={props.colors} />
    <div ref={timeBarRef} className={styles.timeBar} style={{backgroundColor: props.colors?.sub}} onClick={onTimeBarClick}>
      <div className={styles.timeBarCore} style={dynamicStyle.timeBarCore} />
    </div>
    <TimeStampText time={videoState.duration - videoState.currentTime} colors={props.colors} />
  </div>
}


// ThemeButton
function ThemeButton(props: {Button: React.FC<React.SVGProps<SVGSVGElement>>, colors?: ThemeColors, [p:string]: any}): JSX.Element {
  const {Button, colors, ...passProps} = props;
  const [isHover, setIsHover] = useState(false);
  return <Button
    onPointerEnter={() => setIsHover(true)}
    onPointerLeave={() => setIsHover(false)}
    style={{fill: isHover ? colors?.highlight || 'aquamarine' : colors?.main || 'white'}}
    {...passProps}
  />
}


// PlayButton
function PlayButton(props: {isPlaying: boolean, onClick: () => void, colors?: ThemeColors}): JSX.Element {
  const CurrentButton = props.isPlaying ? IconPause : IconPlay;
  return <ThemeButton Button={CurrentButton} colors={props.colors} className={styles.buttonIcon} onClick={props.onClick} />
}


// TimeStampText
function TimeStampText(props: { time: number, colors?: ThemeColors }): JSX.Element {
  const hours = Math.floor(props.time / 3600);
  const minutes = Math.floor((props.time - (hours * 3600)) / 60);
  const seconds = Math.round(props.time - (hours * 3600) - (minutes * 60));

  const hoursStr = hours < 10 ? '0' + hours : hours.toString();
  const minutesStr = minutes < 10 ? '0' + minutes : minutes.toString();
  const secondsStr = seconds < 10 ? '0' + seconds : seconds.toString();

  let resultStr = '';
  if (hours > 0) {
    resultStr += hoursStr + ':';
  }
  resultStr += `${minutesStr}:${secondsStr}`

  return <p className={styles.text} style={{color: props.colors?.main}}>{resultStr}</p>
}