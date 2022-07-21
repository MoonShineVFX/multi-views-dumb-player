import React, {useRef} from "react";

import {ReactComponent as IconPause} from "../icons/pause.svg";
import {ReactComponent as IconPlay} from "../icons/play_arrow.svg";
import {ReactComponent as IconVolumeOff} from "../icons/volume_off.svg";
import {ReactComponent as IconVolumeUp} from "../icons/volume_up.svg";
import {ReactComponent as IconVolumeDown} from "../icons/volume_down.svg";

import { VideoState } from "../hooks/useVideoState";
import useEventListeners from "../hooks/useEventListeners";

import styles from "./PlaybackControl.module.css";


type PlaybackControlProps = {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoState: VideoState;
}

export default function PlaybackControl(props: PlaybackControlProps): JSX.Element {
  // Defines
  const { videoState, videoRef } = props;

  // Hooks
  const timeBarRef = useRef<HTMLDivElement>(null);
  useEventListeners(timeBarRef, ['click'], event => {
    const seekRatio = (event as PointerEvent).offsetX / timeBarRef.current!.offsetWidth;
    videoRef.current!.currentTime = seekRatio * videoState.duration;
  });

  // Dynamic styles
  const dynamicStyle = {
    timeBarCore: {
      width: videoState.currentTime / videoState.duration * 100 + '%'
    }
  }

  // Play button
  const pbControlPlay = () => {
    if (videoState.isPlaying) {
      videoRef.current!.pause();
      return
    }
    videoRef.current!.play();
  }
  const PlayButton = videoState.isPlaying ? IconPause : IconPlay;

  // Volume
  let VolumeButton: React.FC<React.SVGProps<SVGSVGElement>>;
  if (videoState.muted) {
    VolumeButton = IconVolumeOff;
  } else if (videoState.volume > 0.75) {
    VolumeButton = IconVolumeUp;
  } else if (videoState.volume > 0.25) {
    VolumeButton = IconVolumeDown;
  } else {
    VolumeButton = IconVolumeOff;
  }

  return <div className={styles.playbackControl}>
    <PlayButton className={styles.icon} onClick={pbControlPlay} />
    <VolumeButton className={styles.icon} />
    <TimeStampText time={videoState.currentTime} />
    <div ref={timeBarRef} className={styles.timeBar}>
      <div className={styles.timeBarCore} style={dynamicStyle.timeBarCore} />
    </div>
    <TimeStampText time={videoState.duration} />
  </div>
}


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
