import React from 'react';
import { ThemeColors } from '../SETTINGS';
declare type indicatorClickCallback = (trackNumber: number) => void;
declare type TrackControlProps = {
    onIndicatorClick: indicatorClickCallback;
    trackCount: number;
    trackCurrentIndex: number;
    style?: React.CSSProperties;
    colors?: ThemeColors;
};
declare const _default: React.ForwardRefExoticComponent<TrackControlProps & React.RefAttributes<HTMLDivElement>>;
export default _default;
//# sourceMappingURL=TrackControl.d.ts.map