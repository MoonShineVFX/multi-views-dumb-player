declare type RGB = `rgb(${number}, ${number}, ${number})`;
declare type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
declare type HEX = `#${string}`;
declare type Color = RGB | RGBA | HEX | string;
export declare type ThemeColors = {
    highlight: Color;
    main: Color;
    sub: Color;
    base: Color;
};
declare const SETTINGS: {
    IS_MOBILE: () => boolean;
    TRACK_SWIPE_SPEED: number;
};
export default SETTINGS;
//# sourceMappingURL=SETTINGS.d.ts.map