import React from 'react';

import { ReactComponent as IconPlay } from './icons/play_arrow.svg';
import { ReactComponent as IconPause } from './icons/pause.svg';
import { ReactComponent as IconVolumeUp } from './icons/volume_up.svg';
import { ReactComponent as IconVolumeDown } from './icons/volume_down.svg';
import { ReactComponent as IconVolumeOff } from './icons/volume_off.svg';
import { ReactComponent as IconVolumeMute } from './icons/volume_mute.svg';

import './MultiViewsDumbPlayer.css';
import useElementSize from './hooks/useElementSize';
import useTrackControl from './hooks/useTrackControl';
import useVideoState from './hooks/useVideoState';


type MultiViewsDumbPlayerProps = {
  width?: number;
  videoWidth: number;
  videoHeight: number;
  columnCount: number;
  rowCount: number;
  url: string;
}

function MultiViewsDumbPlayer(props: MultiViewsDumbPlayerProps): JSX.Element {
  // Defines
  const trackCount = props.columnCount * props.rowCount;

  // Hooks
  const [trackIndex, setTrackIndex, trackBarRef] = useTrackControl(trackCount);
  const [layoutRef, layoutSize] = useElementSize<HTMLDivElement>();
  const [videoRef, videoState, timebarRef] = useVideoState();

  // Styles
  const aspect = props.videoWidth / props.videoHeight;
  const displayHeight = layoutSize.width / aspect;

  const style = {
    layout: {
      maxWidth: props.width
    },
    composite: {
      width: layoutSize.width,
      height: displayHeight
    },
    video: {
      width: layoutSize.width * props.columnCount,
      height: displayHeight * props.rowCount,
      left: trackIndex % props.columnCount * -layoutSize.width,
      top: Math.floor(trackIndex / props.columnCount) * -displayHeight
    },
    spinner: {
      display: videoState.isWaiting ? 'block' : 'none'
    },
    timeBarCore: {
      width: videoState.currentTime / videoState.duration * 100 + '%'
    }
  };

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

  // Render
  return <div className='mvdp'>
    <div ref={layoutRef} className='mvdp-layout' style={style.layout}>
      <div className='mvdp-composite' style={style.composite}>
        <div className='mvdp-layer' style={style.composite}>
          <video ref={videoRef} className='mvdp-video' style={style.video}
                 autoPlay={true} playsInline={true} loop={true}>
            <source src={props.url}/>
          </video>
        </div>
        <div className='mvdp-layer mvdp-spinner-layer' style={style.spinner}>
          <div className='mvdp-spinner-container'>
            <div className='mvdp-spinner' />
          </div>
        </div>
      </div>
      <div className='mvdp-playback-control'>
        <PlayButton className='mvdp-icon' onClick={pbControlPlay} />
        <VolumeButton className='mvdp-icon' />
        <TimeStamp time={videoState.currentTime} />
        <div ref={timebarRef} className='mvdp-timebar'>
          <div className='mvdp-timebar-core' style={style.timeBarCore} />
        </div>
        <TimeStamp time={videoState.duration} />
      </div>
      <div ref={trackBarRef} className='mvdp-track-control' draggable='false'>
        {new Array(trackCount).fill('').map((_, i): JSX.Element => {
          return <TrackIndicator
            key={i} trackNumber={i} isActive={i === trackIndex}
            setTrackIndex={() => setTrackIndex(i)}
          />;
        })}
      </div>
    </div>
  </div>
}


function TimeStamp(props: {time: number}): JSX.Element {
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

  return <p className='mvdp-timestamp'>{resultStr}</p>
}


type TrackIndicatorProps = {
  trackNumber: number;
  isActive: boolean;
  setTrackIndex: () => void;
}

function TrackIndicator(props: TrackIndicatorProps): JSX.Element {
  return <div
    className={'mvdp-track-indicator' + (props.isActive ? ' mvdp-active-track' : '')}
    draggable='false'
    onClick={event => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      props.setTrackIndex();
    }}
  />
}


export default MultiViewsDumbPlayer;
