import React, { CSSProperties } from 'react';


type MultiViewsDumbPlayerProps = {
  displayWidth: number;
  displayHeight: number;
  videoWidth: number;
  videoHeight: number;
  columnCount: number;
  rowCount: number;
  url: string;
  trackIndex: number;
}


function MultiViewsDumbPlayer(props: MultiViewsDumbPlayerProps) {
  const divStyle: CSSProperties = {
    width: props.displayWidth,
    height: props.displayHeight,
    overflow: 'hidden'
  };

  const videoStyle: CSSProperties = {
    width: props.displayWidth * props.columnCount,
    height: props.displayHeight * props.rowCount,
    position: 'relative',
    left: props.trackIndex % props.columnCount * -props.displayWidth,
    top: Math.floor(props.trackIndex / props.columnCount) * -props.displayHeight
  };

  return <div>
    <div style={divStyle}>
      <video style={videoStyle} autoPlay={true} muted={true} loop={true}>
        <source src={props.url}/>
      </video>
    </div>
  </div>
}


export default MultiViewsDumbPlayer;
