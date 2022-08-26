import React from 'react';
import { ThemeColors } from './SETTINGS';
export declare enum MultiViewsDumbPlayerCore {
    TILES = 0,
    MEDIA_SOURCE_EXTENSION = 1
}
declare type MultiViewsDumbPlayerStyles = {
    main?: React.CSSProperties;
    playback?: React.CSSProperties;
    trackControl?: React.CSSProperties;
};
declare type MultiViewsDumbPlayerProps = {
    width?: number;
    columnCount?: number;
    rowCount?: number;
    url: string;
    core?: MultiViewsDumbPlayerCore;
    styles?: MultiViewsDumbPlayerStyles;
    colors?: ThemeColors;
};
export declare function MultiViewsDumbPlayer(props: MultiViewsDumbPlayerProps): JSX.Element;
export {};
