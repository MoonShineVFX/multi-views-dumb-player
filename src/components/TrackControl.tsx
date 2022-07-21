import React from "react";
import styles from './TrackControl.module.css';


type indicatorClickCallback = (trackNumber: number) => void;

type TrackControlProps = {
  onIndicatorClick: indicatorClickCallback;
  trackCount: number;
  trackCurrentIndex: number;
}

function TrackControl(props: TrackControlProps, ref: React.LegacyRef<HTMLDivElement>): JSX.Element {
  return <div ref={ref} className={styles.control} draggable='false'>
    {new Array(props.trackCount).fill('').map((_, i): JSX.Element => {
      return <TrackIndicator
        key={i} trackNumber={i}
        isActive={i === props.trackCurrentIndex}
        onClick={props.onIndicatorClick}
      />;
    })}
  </div>
}
export default React.forwardRef<HTMLDivElement, TrackControlProps>(TrackControl);


type TrackIndicatorProps = {
  trackNumber: number;
  isActive: boolean;
  onClick: indicatorClickCallback;
}

function TrackIndicator(props: TrackIndicatorProps): JSX.Element {
  return <div
    className={styles.indicator + (props.isActive ? ` ${styles.active}` : '')}
    draggable='false'
    onClick={event => {
      event.preventDefault();
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      props.onClick(props.trackNumber);
    }}
  />
}
