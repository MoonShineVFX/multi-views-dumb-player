import React, {useState} from 'react';
import styles from './TrackControl.module.css';
import {ThemeColors} from '../SETTINGS';


type indicatorClickCallback = (trackNumber: number) => void;

type TrackControlProps = {
  onIndicatorClick: indicatorClickCallback;
  trackCount: number;
  trackCurrentIndex: number;
  style?: React.CSSProperties;
  colors?: ThemeColors;
}

function TrackControl(props: TrackControlProps, ref: React.LegacyRef<HTMLDivElement>): JSX.Element {
  return <div
    ref={ref} className={styles.control} draggable='false'
    style={{
      ...props.style,
      backgroundColor: props.colors?.base,
      borderTop: '1px solid ' + props.colors?.sub || 'darkgray'
    }}
  >
    {new Array(props.trackCount).fill('').map((_, i): JSX.Element => {
      return <TrackIndicator
        key={i} trackNumber={i}
        isActive={i === props.trackCurrentIndex}
        onClick={props.onIndicatorClick}
        colors={props.colors}
      />;
    })}
  </div>
}
export default React.forwardRef<HTMLDivElement, TrackControlProps>(TrackControl);


type TrackIndicatorProps = {
  trackNumber: number;
  isActive: boolean;
  onClick: indicatorClickCallback;
  colors?: ThemeColors;
}

function TrackIndicator(props: TrackIndicatorProps): JSX.Element {
  const [isHover, setIsHover] = useState(false);
  let backgroundColor = props.isActive ? props.colors?.main || 'white' : props.colors?.sub;
  if (isHover) backgroundColor = props.colors?.highlight || 'aquamarine';

  return <div
    className={styles.indicator}
    style={{backgroundColor: backgroundColor}}
    draggable='false'
    onPointerEnter={() => setIsHover(true)}
    onPointerLeave={() => setIsHover(false)}
    onClick={event => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      props.onClick(props.trackNumber);
    }}
  />
}
