import React, {useRef, useState} from 'react';

import {ReactComponent as IconPause} from "../icons/pause.svg";
import {ReactComponent as IconPlay} from "../icons/play_arrow.svg";
import {ReactComponent as IconVolumeOff} from "../icons/volume_off.svg";
import {ReactComponent as IconVolumeUp} from "../icons/volume_up.svg";
import {ReactComponent as IconVolumeDown} from "../icons/volume_down.svg";
import {ReactComponent as IconVolumeMute} from "../icons/volume_mute.svg";

import { VideoState } from "../hooks/useVideoState";

import styles from "./PlaybackControl.module.css";
import SETTINGS from '../SETTINGS';


// PlaybackControl
type PlaybackControlProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoState: VideoState;
}

export default function PlaybackControl(props: PlaybackControlProps): JSX.Element {
  // Defines
  const { videoState, videoRef } = props;
  
  // Hooks
  const [volumeSliderPop, setVolumeSliderPop] = useState(false);
  const timeBarRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLDivElement>(null);

  // Dynamic styles
  const dynamicStyle = {
    volumeSliderContainer: {
      display: volumeSliderPop ? 'block' : 'none'
    },
    volumeSliderCore: {
      height: videoState.volume * 100 + '%',
      backgroundColor: videoState.muted ? 'darkgray' : 'white'
    },
    timeBarCore: {
      width: videoState.currentTime / videoState.duration * 100 + '%'
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

  return <div className={styles.playbackControl}>
    <PlayButton isPlaying={videoState.isPlaying} onClick={onPlayButtonClick} />
    {
      !SETTINGS.IS_MOBILE() &&
      <div className={styles.volumeContainer}
           onMouseEnter={() => setVolumeSliderPop(true)}
           onMouseLeave={() => setVolumeSliderPop(false)}>
        <div className={styles.volumeSliderContainer} style={dynamicStyle.volumeSliderContainer}>
          <div ref={volumeSliderRef} className={styles.volumeSlider} onClick={onVolumeSliderClick}>
            <div className={styles.volumeSliderCore} style={dynamicStyle.volumeSliderCore} />
          </div>
        </div>
        <VolumeButton
          className={styles.icon}
          onClick={() => videoRef.current!.muted = !videoRef!.current!.muted} />
      </div>
    }
    <TimeStampText time={videoState.currentTime} />
    <div ref={timeBarRef} className={styles.timeBar} onClick={onTimeBarClick}>
      <div className={styles.timeBarCore} style={dynamicStyle.timeBarCore} />
    </div>
    <TimeStampText time={videoState.duration - videoState.currentTime} />
  </div>
}


// PlayButton
function PlayButton(props: {isPlaying: boolean, onClick: () => void}): JSX.Element {
  const CurrentButton = props.isPlaying ? IconPause : IconPlay;
  return <CurrentButton className={styles.icon} onClick={props.onClick} />
}


// TimeStampText
function TimeStampText(props: { time: number }): JSX.Element {
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

  return <p className={styles.text}>{resultStr}</p>
}