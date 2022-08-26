import React, {useEffect, useState} from 'react';
import styles from './MultiViewsDumbPlayer.module.css';

import {IconPlay, IconPause} from './icons';

import useTrackControl from './hooks/useTrackControl';
import useVideoState from './hooks/useVideoState';
import { ThemeColors } from './SETTINGS';

import TrackControl from "./components/TrackControl";
import PlaybackControl from "./components/PlaybackControl";
import MultiVisionPlayer from 'multi-vision-player';


export enum MultiViewsDumbPlayerCore {
  TILES,
  MEDIA_SOURCE_EXTENSION
}


type MultiViewsDumbPlayerStyles = {
  main?: React.CSSProperties;
  playback?: React.CSSProperties;
  trackControl?: React.CSSProperties;
}

type MultiViewsDumbPlayerProps = {
  width?: number;
  columnCount?: number;
  rowCount?: number;
  url: string;
  core?: MultiViewsDumbPlayerCore;
  styles?: MultiViewsDumbPlayerStyles;
  colors?: ThemeColors;
}

export function MultiViewsDumbPlayer(props: MultiViewsDumbPlayerProps): JSX.Element {
  // Defines
  const isMSE = props.core === MultiViewsDumbPlayerCore.MEDIA_SOURCE_EXTENSION;

  // Hooks
  const [trackCount, setTrackCount] = useState(isMSE ? 1 : props.columnCount! * props.rowCount!);
  const [trackCurrentIndex, setTrackCurrentIndex, trackControlRef] = useTrackControl(trackCount);
  const [videoRef, videoState] = useVideoState();
  const [msePlayer, setMsePlayer] = useState<MultiVisionPlayer | null>(null);

  // MSE Video addons
  useEffect(() => {
    if (isMSE && videoRef.current && !msePlayer) {
      console.log('initial: ', videoRef.current);
      setMsePlayer(new MultiVisionPlayer(
        videoRef.current, props.url,
        {
          streamHost: `${window.location.protocol}//${window.location.host}`
        },
        true,
        metadata => setTrackCount(metadata.cameraCount)
      ));
    }
  }, [isMSE, videoRef.current]);
  useEffect(() => {
    if (msePlayer) {
      msePlayer.requestChangeCameraByIndex(trackCurrentIndex + 1);
    }
  }, [trackCurrentIndex]);

  // Motify Icons
  const [NotifyIcons, setNotifyIcons] = useState<(React.FC<React.SVGProps<SVGSVGElement>> | null)[]>([null]);
  useEffect(() => setNotifyIcons([null]), [videoState.isLoading]);

  // Dynamic styles
  const dynamicStyle = {
    videoTiles: {
      position: 'relative' as 'relative',
      width: props.columnCount! * 100 + '%',
      maxWidth: props.columnCount! * 100 + '%',
      height: props.rowCount! * 100 + '%',
      maxHeight: props.rowCount! * 100 + '%',
      left: trackCurrentIndex % props.columnCount! * -100 + '%',
      top: Math.floor(trackCurrentIndex / props.columnCount!) * -100 + '%'
    },
    overlay: {
      backgroundColor: videoState.isLoading ? 'rgba(0, 0, 0, 0.5)' : 'transparent'
    }
  };

  // Video play/pause notify
  const onVideoClick = () => {
    if (videoState.isLoading) return;

    let NotifyIcon: React.FC<React.SVGProps<SVGSVGElement>>;
    if (videoState.isPlaying) {
      videoRef.current!.pause();
      NotifyIcon = IconPause;
    } else {
      videoRef.current!.play();
      NotifyIcon = IconPlay;
    }

    if (NotifyIcons.length < 2) {
      setNotifyIcons([null, NotifyIcon]);
    } else {
      setNotifyIcons([NotifyIcon])
    }
  };

  // Render
  return  <div className={styles.layout} style={props.styles?.main}>
    <div className={styles.composite}>
      <Layer className={styles.videoLayer}>
        <div className={styles.videoContainerH}>
          <div className={styles.videoContainerV}>
            <div className={styles.videoContainerAbs}>
              <video ref={videoRef} className={styles.video} style={isMSE ? {} : dynamicStyle.videoTiles}
                     autoPlay={true} playsInline={true} loop={true}
                     onClick={onVideoClick}
                     onContextMenu={event => event.preventDefault()}>
                {!isMSE && <source src={props.url}/>}
              </video>
            </div>
          </div>
        </div>
      </Layer>
      <Layer className={styles.overlayLayer} style={dynamicStyle.overlay}>
        <div className={styles.overlayContainer}>
          {
            NotifyIcons.map<JSX.Element | undefined>((NotifyIcon, index) => {
              if (!NotifyIcon) return undefined;
              return <NotifyIcon className={styles.notifyIcon} key={index}/>
            })
          }
          { videoState.isLoading && <div className={styles.loadingIcon} /> }
        </div>
      </Layer>
    </div>

    <PlaybackControl
      videoRef={videoRef}
      videoState={videoState}
      style={props.styles?.playback}
      colors={props.colors}
    />

    <TrackControl
      ref={trackControlRef}
      trackCount={trackCount} trackCurrentIndex={trackCurrentIndex}
      onIndicatorClick={trackNumber => setTrackCurrentIndex(trackNumber)}
      style={props.styles?.trackControl}
      colors={props.colors}
    />

  </div>
}


function Layer(props: {className?: string, style?: React.CSSProperties, children?: React.ReactNode}): JSX.Element {
  let className = styles.layer;
  if (props.className) className += ' ' + props.className;
  return <div className={className} style={props.style}>
    {props.children}
  </div>
}
