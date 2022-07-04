import React, {useState} from 'react';

import { ReactComponent as IconPlay } from './icons/play_arrow.svg';
import { ReactComponent as IconVolumeUp } from './icons/volume_up.svg';

import './MultiViewsDumbPlayer.css';
import useElementSize from './hooks/useElementSize';


type MultiViewsDumbPlayerProps = {
  width?: number;
  videoWidth: number;
  videoHeight: number;
  columnCount: number;
  rowCount: number;
  url: string;
}


function MultiViewsDumbPlayer(props: MultiViewsDumbPlayerProps) {
  // Hooks
  const [trackIndex, setTrackIndex] = useState(0);
  const [frameRef, frameSize] = useElementSize<HTMLDivElement>();

  const aspect = props.videoWidth / props.videoHeight;
  const displayHeight = frameSize.width / aspect;

  // Styles
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
    },
    bar: {
      top: displayHeight
    }
  };

  // Functions
  const changeTrackIndex = (offset: number) => {
    const trackCount = props.columnCount * props.rowCount;
    setTrackIndex((((trackIndex + offset) % trackCount) + trackCount) % trackCount);
  }

  // Render
  return <div className='mvdp'>
    <div ref={frameRef} className='mvdp-frame' style={style.frame}>
      <div className='mvdp-playbar' style={style.bar}>
        <IconPlay className='mvdp-icon' />
        <IconVolumeUp className='mvdp-icon' />
        <p>1:23:06</p>
      </div>
      <div className='mvdp-crop' style={style.crop}>
        <video className='mvdp-video' style={style.video}
               autoPlay={true} playsInline={true} muted={true} loop={true}>
          <source src={props.url}/>
        </video>
      </div>
    </div>
    <IconPlay fill='red' />
  </div>
}


export default MultiViewsDumbPlayer;
