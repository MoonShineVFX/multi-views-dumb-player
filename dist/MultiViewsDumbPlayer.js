"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiViewsDumbPlayer = exports.MultiViewsDumbPlayerCore = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var MultiViewsDumbPlayer_module_css_1 = __importDefault(require("./MultiViewsDumbPlayer.module.css"));
var icons_1 = require("./icons");
var useTrackControl_1 = __importDefault(require("./hooks/useTrackControl"));
var useVideoState_1 = __importDefault(require("./hooks/useVideoState"));
var TrackControl_1 = __importDefault(require("./components/TrackControl"));
var PlaybackControl_1 = __importDefault(require("./components/PlaybackControl"));
var multi_vision_player_1 = __importDefault(require("multi-vision-player"));
var MultiViewsDumbPlayerCore;
(function (MultiViewsDumbPlayerCore) {
    MultiViewsDumbPlayerCore[MultiViewsDumbPlayerCore["TILES"] = 0] = "TILES";
    MultiViewsDumbPlayerCore[MultiViewsDumbPlayerCore["MEDIA_SOURCE_EXTENSION"] = 1] = "MEDIA_SOURCE_EXTENSION";
})(MultiViewsDumbPlayerCore = exports.MultiViewsDumbPlayerCore || (exports.MultiViewsDumbPlayerCore = {}));
function MultiViewsDumbPlayer(props) {
    var _a, _b, _c;
    // Defines
    var isMSE = props.core === MultiViewsDumbPlayerCore.MEDIA_SOURCE_EXTENSION;
    // Hooks
    var _d = (0, react_1.useState)(isMSE ? 1 : props.columnCount * props.rowCount), trackCount = _d[0], setTrackCount = _d[1];
    var _e = (0, useTrackControl_1.default)(trackCount), trackCurrentIndex = _e[0], setTrackCurrentIndex = _e[1], trackControlRef = _e[2];
    var _f = (0, useVideoState_1.default)(), videoRef = _f[0], videoState = _f[1];
    var _g = (0, react_1.useState)(null), msePlayer = _g[0], setMsePlayer = _g[1];
    // MSE Video addons
    (0, react_1.useEffect)(function () {
        if (isMSE && videoRef.current && !msePlayer) {
            console.log('initial: ', videoRef.current);
            setMsePlayer(new multi_vision_player_1.default(videoRef.current, props.url, {
                streamHost: props.host || "".concat(window.location.protocol, "//").concat(window.location.host)
            }, true, function (metadata) { return setTrackCount(metadata.cameraCount); }));
        }
    }, [isMSE, videoRef.current]);
    (0, react_1.useEffect)(function () {
        if (msePlayer) {
            msePlayer.requestChangeCameraByIndex(trackCurrentIndex + 1);
        }
    }, [trackCurrentIndex]);
    // Motify Icons
    var _h = (0, react_1.useState)([null]), NotifyIcons = _h[0], setNotifyIcons = _h[1];
    (0, react_1.useEffect)(function () { return setNotifyIcons([null]); }, [videoState.isLoading]);
    // Dynamic styles
    var dynamicStyle = {
        videoTiles: {
            position: 'relative',
            width: props.columnCount * 100 + '%',
            maxWidth: props.columnCount * 100 + '%',
            height: props.rowCount * 100 + '%',
            maxHeight: props.rowCount * 100 + '%',
            left: trackCurrentIndex % props.columnCount * -100 + '%',
            top: Math.floor(trackCurrentIndex / props.columnCount) * -100 + '%'
        },
        overlay: {
            backgroundColor: videoState.isLoading ? 'rgba(0, 0, 0, 0.5)' : 'transparent'
        }
    };
    // Video play/pause notify
    var onVideoClick = function () {
        if (videoState.isLoading)
            return;
        var NotifyIcon;
        if (videoState.isPlaying) {
            videoRef.current.pause();
            NotifyIcon = icons_1.IconPause;
        }
        else {
            videoRef.current.play();
            NotifyIcon = icons_1.IconPlay;
        }
        if (NotifyIcons.length < 2) {
            setNotifyIcons([null, NotifyIcon]);
        }
        else {
            setNotifyIcons([NotifyIcon]);
        }
    };
    // Render
    return (0, jsx_runtime_1.jsxs)("div", __assign({ className: MultiViewsDumbPlayer_module_css_1.default.layout, style: (_a = props.styles) === null || _a === void 0 ? void 0 : _a.main }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: MultiViewsDumbPlayer_module_css_1.default.composite }, { children: [(0, jsx_runtime_1.jsx)(Layer, __assign({ className: MultiViewsDumbPlayer_module_css_1.default.videoLayer }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: MultiViewsDumbPlayer_module_css_1.default.videoContainerH }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: MultiViewsDumbPlayer_module_css_1.default.videoContainerV }, { children: (0, jsx_runtime_1.jsx)("div", __assign({ className: MultiViewsDumbPlayer_module_css_1.default.videoContainerAbs }, { children: (0, jsx_runtime_1.jsx)("video", __assign({ ref: videoRef, className: MultiViewsDumbPlayer_module_css_1.default.video, style: isMSE ? {} : dynamicStyle.videoTiles, autoPlay: true, playsInline: true, loop: true, onClick: onVideoClick, onContextMenu: function (event) { return event.preventDefault(); } }, { children: !isMSE && (0, jsx_runtime_1.jsx)("source", { src: props.url }) })) })) })) })) })), (0, jsx_runtime_1.jsx)(Layer, __assign({ className: MultiViewsDumbPlayer_module_css_1.default.overlayLayer, style: dynamicStyle.overlay }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: MultiViewsDumbPlayer_module_css_1.default.overlayContainer }, { children: [NotifyIcons.map(function (NotifyIcon, index) {
                                    if (!NotifyIcon)
                                        return undefined;
                                    return (0, jsx_runtime_1.jsx)(NotifyIcon, { className: MultiViewsDumbPlayer_module_css_1.default.notifyIcon }, index);
                                }), videoState.isLoading && (0, jsx_runtime_1.jsx)("div", { className: MultiViewsDumbPlayer_module_css_1.default.loadingIcon })] })) }))] })), (0, jsx_runtime_1.jsx)(PlaybackControl_1.default, { videoRef: videoRef, videoState: videoState, style: (_b = props.styles) === null || _b === void 0 ? void 0 : _b.playback, colors: props.colors }), (0, jsx_runtime_1.jsx)(TrackControl_1.default, { ref: trackControlRef, trackCount: trackCount, trackCurrentIndex: trackCurrentIndex, onIndicatorClick: function (trackNumber) { return setTrackCurrentIndex(trackNumber); }, style: (_c = props.styles) === null || _c === void 0 ? void 0 : _c.trackControl, colors: props.colors })] }));
}
exports.MultiViewsDumbPlayer = MultiViewsDumbPlayer;
function Layer(props) {
    var className = MultiViewsDumbPlayer_module_css_1.default.layer;
    if (props.className)
        className += ' ' + props.className;
    return (0, jsx_runtime_1.jsx)("div", __assign({ className: className, style: props.style }, { children: props.children }));
}
