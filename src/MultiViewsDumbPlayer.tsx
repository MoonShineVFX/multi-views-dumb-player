import React, { useRef } from 'react';

import { ReactComponent as IconPlay } from './icons/play_arrow.svg';
import { ReactComponent as IconVolumeUp } from './icons/volume_up.svg';

import './MultiViewsDumbPlayer.css';
import useElementSize from './hooks/useElementSize';
import useEventListeners from './hooks/useEventListeners';
import useTrack from './hooks/useTrack';


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
  const [trackIndex, setTrackIndex, trackBarRef] = useTrack(trackCount);
  const [frameRef, frameSize] = useElementSize<HTMLDivElement>();
  const videoRef = useRef<HTMLVideoElement>(null);
  useEventListeners(videoRef, ['play', 'pause', 'waiting'], event => {
    console.log(event.type)
  });

  // Styles
  const aspect = props.videoWidth / props.videoHeight;
  const displayHeight = frameSize.width / aspect;

  const style = {
    frame: {
      maxWidth: props.width
    },
    crop: {
      height: displayHeight
    },
    video: {
      width: frameSize.width * props.columnCount,
      height: displayHeight * props.rowCount,
      left: trackIndex % props.columnCount * -frameSize.width,
      top: Math.floor(trackIndex / props.columnCount) * -displayHeight
    }
  };

  // Render
  return <div className='mvdp'>
    <div ref={frameRef} className='mvdp-frame' style={style.frame}>
      <div className='mvdp-crop' style={style.crop}>
        <video ref={videoRef} className='mvdp-video' style={style.video}
               autoPlay={true} playsInline={true} muted={true} loop={true} controls={true}>
          <source src={props.url}/>
        </video>
      </div>
      <div className='mvdp-playbar'>
        <IconPlay className='mvdp-icon' />
        <IconVolumeUp className='mvdp-icon' />
        <p>1:23:06</p>
      </div>
      <div ref={trackBarRef} className='mvdp-trackbar'>
        {new Array(trackCount).fill('').map((_, i): JSX.Element => {
          return <MultiViewTrackIndicator
            key={i} trackNumber={i} isActive={i === trackIndex}
            setTrackIndex={() => setTrackIndex(i)}
          />;
        })}
      </div>
    </div>
  </div>
}


type MultiViewTrackIndicatorProps = {
  trackNumber: number;
  isActive: boolean;
  setTrackIndex: () => void;
}

function MultiViewTrackIndicator(props: MultiViewTrackIndicatorProps): JSX.Element {
  return <div
    className={'mvdp-track-indicator' + (props.isActive ? ' mvdp-active-track' : '')}
    onClick={event => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      props.setTrackIndex();
    }}
  />
}


export default MultiViewsDumbPlayer;
