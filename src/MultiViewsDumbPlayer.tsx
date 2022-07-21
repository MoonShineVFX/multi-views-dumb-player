import React from 'react';

import './MultiViewsDumbPlayer.css';

import useElementSize from './hooks/useElementSize';
import useTrackControl from './hooks/useTrackControl';
import useVideoState from './hooks/useVideoState';

import TrackControl from "./components/TrackControl";
import PlaybackControl from "./components/PlaybackControl";


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
  const [trackCurrentIndex, setTrackCurrentIndex, trackControlRef] = useTrackControl(trackCount);
  const [layoutRef, layoutSize] = useElementSize<HTMLDivElement>();
  const [videoRef, videoState] = useVideoState();

  // Dynamic styles
  const aspect = props.videoWidth / props.videoHeight;
  const displayHeight = layoutSize.width / aspect;

  const dynamicStyle = {
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
      left: trackCurrentIndex % props.columnCount * -layoutSize.width,
      top: Math.floor(trackCurrentIndex / props.columnCount) * -displayHeight
    },
    spinner: {
      display: videoState.isWaiting ? 'block' : 'none'
    }
  };

  // Render
  return <div className='mvdp'>
    <div ref={layoutRef} className='mvdp-layout' style={dynamicStyle.layout}>
      <div className='mvdp-composite' style={dynamicStyle.composite}>
        <div className='mvdp-layer' style={dynamicStyle.composite}>
          <video ref={videoRef} className='mvdp-video' style={dynamicStyle.video}
                 autoPlay={true} playsInline={true} loop={true}>
            <source src={props.url}/>
          </video>
        </div>
        <div className='mvdp-layer mvdp-spinner-layer' style={dynamicStyle.spinner}>
          <div className='mvdp-spinner-container'>
            <div className='mvdp-spinner' />
          </div>
        </div>
      </div>
      <PlaybackControl
       videoRef={videoRef}
       videoState={videoState}
      />
      <TrackControl
        ref={trackControlRef}
        trackCount={trackCount} trackCurrentIndex={trackCurrentIndex}
        onIndicatorClick={trackNumber => setTrackCurrentIndex(trackNumber)}
      />
    </div>
  </div>
}


export default MultiViewsDumbPlayer;
